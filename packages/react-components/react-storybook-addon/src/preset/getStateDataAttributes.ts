import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';

import { Parser } from 'react-docgen-typescript';
import type { StrictArgTypes } from 'storybook/internal/types';

import type { StateDataAttributesConfig } from '../public-types';
import { getExportedTypeEntryPoints } from './getExportedTypeEntryPoints';

/** Options for extracting `data-*` ArgTypes from a package's exported component state declarations. */
export type GetStateDataAttributesOptions = StateDataAttributesConfig;

const DEFAULT_COMPILER_OPTIONS: ts.CompilerOptions = {
  target: ts.ScriptTarget.ES2019,
  module: ts.ModuleKind.CommonJS,
  moduleResolution: ts.ModuleResolutionKind.Node10,
  skipLibCheck: false,
  types: [],
  noEmit: true,
};

/**
 * Upper bound on state property nesting depth walked by {@link collectStateDataAttributeRows}. Generous
 * enough for any real component state shape (deepest known real-world states nest a handful of levels),
 * while still catching pathological/mistaken type shapes (e.g. an accidentally-recursive alias that
 * escapes cycle detection due to differing type arguments at every level) with an actionable error
 * instead of silently truncating output or hanging.
 */
const MAX_STATE_TRAVERSAL_DEPTH = 10;

/**
 * Upper bound on the number of `data-*` rows a single state may emit. Generous enough for any real
 * component (the largest known real states emit a few dozen rows), while still catching combinatorial
 * blow-ups from fan-out type shapes with an actionable error instead of silently truncating output.
 */
const MAX_STATE_DATA_ATTRIBUTE_ROWS = 1000;

/**
 * Upper bound on the number of traversal-node visits performed while walking a single exported state
 * (every recursive {@link collectStateDataAttributeRows} visit call counts, including zero-row types).
 * Depth and emitted-row limits alone do not bound a same-package type graph with wide fan-out and zero
 * `data-*` leaves: such a graph can visit exponentially many nodes without ever exceeding the depth limit
 * (its levels stay shallow) or the row limit (it emits nothing). This generous, independent budget is
 * scoped per exported state traversal and catches that case with an actionable error instead of silently
 * truncating output or running away.
 */
const MAX_STATE_TRAVERSAL_NODES = 50_000;

function getPreservedCompilerOptions(options: ts.CompilerOptions): ts.CompilerOptions {
  const preserved: ts.CompilerOptions = {};

  ['target', 'module', 'moduleResolution', 'lib'].forEach(option => {
    if (options[option] !== undefined) {
      preserved[option] = options[option];
    }
  });

  return preserved;
}

function hasSymbolFlag(symbol: ts.Symbol, flag: ts.SymbolFlags) {
  // eslint-disable-next-line no-bitwise
  return (symbol.flags & flag) !== 0;
}

function getLocallyExportedNames(sourceFile: ts.SourceFile): { exported: Set<string>; nonExported: Set<string> } {
  const exported = new Set<string>();
  const nonExported = new Set<string>();

  for (const statement of sourceFile.statements) {
    if (ts.isExportDeclaration(statement)) {
      if (statement.exportClause && ts.isNamedExports(statement.exportClause)) {
        for (const specifier of statement.exportClause.elements) {
          exported.add(specifier.name.text);
        }
      }
      continue;
    }

    if (
      !ts.isTypeAliasDeclaration(statement) &&
      !ts.isInterfaceDeclaration(statement) &&
      !ts.isClassDeclaration(statement) &&
      !ts.isFunctionDeclaration(statement) &&
      !ts.isEnumDeclaration(statement) &&
      !ts.isModuleDeclaration(statement)
    ) {
      continue;
    }

    if (!statement.name || !ts.isIdentifier(statement.name)) {
      continue;
    }

    const isExported = ts.canHaveModifiers(statement) && hasExportModifier(statement);
    (isExported ? exported : nonExported).add(statement.name.text);
  }

  return { exported, nonExported };
}

function hasExportModifier(node: ts.HasModifiers): boolean {
  return ts.getModifiers(node)?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword) ?? false;
}

function resolveCompilerOptions(packageRoot: string): ts.CompilerOptions {
  const candidateConfigPaths = [path.join(packageRoot, 'tsconfig.lib.json'), path.join(packageRoot, 'tsconfig.json')];
  const configPath = candidateConfigPaths.find(candidate => fs.existsSync(candidate));

  if (!configPath) {
    return { ...DEFAULT_COMPILER_OPTIONS };
  }

  const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
  if (configFile.error) {
    throw new Error(
      `getStateDataAttributes: failed to read tsconfig "${configPath}": ${ts.flattenDiagnosticMessageText(
        configFile.error.messageText,
        '\n',
      )}`,
    );
  }

  const parsedConfig = ts.parseJsonConfigFileContent(configFile.config, ts.sys, path.dirname(configPath));
  if (parsedConfig.errors.length > 0) {
    const messages = parsedConfig.errors
      .map(error => ts.flattenDiagnosticMessageText(error.messageText, '\n'))
      .join('\n');
    throw new Error(`getStateDataAttributes: failed to parse tsconfig "${configPath}": ${messages}`);
  }

  return { ...DEFAULT_COMPILER_OPTIONS, ...getPreservedCompilerOptions(parsedConfig.options) };
}

function formatDiagnostic(diagnostic: ts.Diagnostic): string {
  const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');

  if (diagnostic.file && diagnostic.start !== undefined) {
    const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
    return `${diagnostic.file.fileName}:${line + 1}:${character + 1} - ${message}`;
  }

  return message;
}

function serializeArgTypes(argTypes: StrictArgTypes): string {
  return JSON.stringify(Object.fromEntries(Object.entries(argTypes).sort(([a], [b]) => a.localeCompare(b))));
}

/** Absolute directory containing the nearest `package.json` walking up from a given file, if any. */
function findPackageRootForFile(fileName: string, cache: Map<string, string | undefined>): string | undefined {
  const resolvedFileName = path.resolve(fileName);
  if (cache.has(resolvedFileName)) {
    return cache.get(resolvedFileName);
  }

  let dir = path.dirname(resolvedFileName);
  for (;;) {
    if (fs.existsSync(path.join(dir, 'package.json'))) {
      cache.set(resolvedFileName, dir);
      return dir;
    }

    const parentDir = path.dirname(dir);
    if (parentDir === dir) {
      cache.set(resolvedFileName, undefined);
      return undefined;
    }

    dir = parentDir;
  }
}

/**
 * Finds the package that owns a resolved `*State` declaration: traversal of that state's own type is
 * bounded to this package so dependency-declared properties can't leak in, while dependency-reexported
 * states (whose resolved declaration legitimately lives in a dependency) still work end-to-end.
 */
function findStatePackageRoot(
  resolvedSymbol: ts.Symbol,
  fallbackPackageRoot: string,
  cache: Map<string, string | undefined>,
): string {
  const declaration = resolvedSymbol.declarations?.[0];
  if (!declaration) {
    return fallbackPackageRoot;
  }

  return findPackageRootForFile(declaration.getSourceFile().fileName, cache) ?? fallbackPackageRoot;
}

/** True if at least one declaration of `symbol` lives inside `statePackageRoot`. */
function isOwnedByStatePackageRoot(
  symbol: ts.Symbol,
  statePackageRoot: string,
  cache: Map<string, string | undefined>,
): boolean {
  const declarations =
    symbol.declarations && symbol.declarations.length > 0
      ? symbol.declarations
      : symbol.valueDeclaration
      ? [symbol.valueDeclaration]
      : [];

  return declarations.some(
    declaration => findPackageRootForFile(declaration.getSourceFile().fileName, cache) === statePackageRoot,
  );
}

/**
 * Identifies a `ts.Type` for path-local cycle detection: prefers the alias declaration (so, e.g.,
 * `Node<T>` and `Node<[T]>` are recognized as the same recursive alias despite differing type
 * arguments), then falls back to the type's own symbol declaration, then the `ts.Type` instance itself
 * for anonymous/intersection types without a stable declaration.
 */
function getTypeIdentity(type: ts.Type): unknown {
  const aliasDeclaration = type.aliasSymbol?.declarations?.[0];
  if (aliasDeclaration) {
    return aliasDeclaration;
  }

  const symbolDeclaration = type.getSymbol()?.declarations?.[0];
  if (symbolDeclaration) {
    return symbolDeclaration;
  }

  return type;
}

type StorybookDataAttributeRow = StrictArgTypes[string];

type PendingRow = {
  priority: number;
  row: StorybookDataAttributeRow;
};

type DataAttributeWalkContext = {
  checker: ts.TypeChecker;
  parser: Parser;
  statePackageRoot: string;
  packageRootCache: Map<string, string | undefined>;
  fallbackLocation: ts.Node;
  /** Name of the exported `*State` declaration being walked, used only for actionable error messages. */
  stateName: string;
};

/** Builds the Storybook ArgTypes row for a single `data-*` property. */
function buildDataAttributeRow(
  property: ts.Symbol,
  propertyType: ts.Type,
  category: string,
  ctx: DataAttributeWalkContext,
): StorybookDataAttributeRow {
  const isRequired = !hasSymbolFlag(property, ts.SymbolFlags.Optional);
  const typeName = ctx.parser.getDocgenType(propertyType, isRequired).name;

  return {
    name: property.name,
    description: ctx.parser.findDocComment(property).description.trim(),
    type: { name: 'other', value: typeName, required: false },
    table: {
      category,
      type: { summary: typeName },
    },
    control: false,
  };
}

/**
 * Registers a `data-*` row under its normalized key/category, resolving root-vs-non-root key collisions
 * by explicit priority (root wins) rather than by traversal/declaration order.
 */
function addDataAttributeRow(
  propertyPath: string[],
  property: ts.Symbol,
  propertyType: ts.Type,
  ctx: DataAttributeWalkContext,
  rows: Map<string, PendingRow>,
): void {
  const isRootLeading = propertyPath[0] === 'root';
  const effectivePath = isRootLeading ? propertyPath.slice(1) : propertyPath;
  const priority = isRootLeading ? 2 : 1;
  const key = effectivePath.length > 0 ? `${effectivePath.join('.')}.${property.name}` : property.name;
  const category = effectivePath.length > 0 ? `Data attributes · ${effectivePath.join('.')}` : 'Data attributes';

  const existing = rows.get(key);
  if (existing && existing.priority >= priority) {
    return;
  }

  rows.set(key, { priority, row: buildDataAttributeRow(property, propertyType, category, ctx) });
}

/**
 * True if any *direct* (non-recursive) property of `containerType` is owned by `statePackageRoot`. Used
 * to detect an immediate state property (e.g. `root`) whose type is wholly declared in a dependency, so
 * its own direct `data-*` properties can still be emitted (see {@link collectStateDataAttributeRows}).
 */
function containerHasAnyOwnedProperty(
  containerType: ts.Type,
  statePackageRoot: string,
  cache: Map<string, string | undefined>,
): boolean {
  return containerType.getProperties().some(property => isOwnedByStatePackageRoot(property, statePackageRoot, cache));
}

/**
 * Recursively walks a `*State` type, collecting `data-*` properties from every reachable slot/nested
 * object. Traversal is bounded to the package owning the resolved `*State` declaration: every immediate
 * (depth 0) property may be entered to preserve existing slot extraction, and its own type (depth 1) may
 * emit direct `data-*` rows unfiltered by ownership when that type has no state-package-owned properties
 * at all (e.g. a `root: SharedSlot` immediate slot whose type is wholly declared in a dependency) — this
 * preserves pre-ownership-filtering slot extraction. As soon as a depth-1 type mixes in even one
 * state-package-owned property, it is treated as local and every property (data or not) is filtered by
 * ownership as usual. Beyond depth 1, only property symbols declared within the state's package root are
 * recursed into or read as `data-*` rows — this keeps dependency-declared properties (including ones
 * merged in via intersection) from leaking in, while still supporting states that are wholly re-exported
 * from a dependency. Path-local cycle detection (keyed by alias declaration, then symbol declaration, then
 * `ts.Type`) prevents infinite recursion from self-referencing types while still allowing the same
 * reusable type under separate sibling branches. Traversal depth, emitted row count, and total visited
 * node count (including zero-row visits) are all bounded (see {@link MAX_STATE_TRAVERSAL_DEPTH},
 * {@link MAX_STATE_DATA_ATTRIBUTE_ROWS}, {@link MAX_STATE_TRAVERSAL_NODES}) so a pathological or mistaken
 * type shape fails loudly instead of hanging or silently truncating output — the node-count budget in
 * particular is what stops a same-package type graph with wide fan-out and zero `data-*` leaves, which
 * the depth and row limits alone do not bound.
 */
function collectStateDataAttributeRows(stateType: ts.Type, ctx: DataAttributeWalkContext): Map<string, PendingRow> {
  const rows = new Map<string, PendingRow>();
  const visiting = new Set<unknown>();
  let visitedNodeCount = 0;

  function visit(containerType: ts.Type, propertyPath: string[], depth: number): void {
    if (depth > MAX_STATE_TRAVERSAL_DEPTH) {
      throw new Error(
        `getStateDataAttributes: state "${ctx.stateName}" exceeded the maximum traversal depth ` +
          `(${MAX_STATE_TRAVERSAL_DEPTH}) at path "${propertyPath.join('.') || '<root>'}"`,
      );
    }

    visitedNodeCount++;
    if (visitedNodeCount > MAX_STATE_TRAVERSAL_NODES) {
      const declarationPath = containerType.getSymbol()?.declarations?.[0]?.getSourceFile().fileName;
      const declarationSuffix = declarationPath ? ` (declared at "${declarationPath}")` : '';
      throw new Error(
        `getStateDataAttributes: state "${ctx.stateName}" exceeded the maximum number of visited traversal ` +
          `nodes (${MAX_STATE_TRAVERSAL_NODES}) at path "${propertyPath.join('.') || '<root>'}"${declarationSuffix}`,
      );
    }

    const allowUnownedDataAtThisLevel =
      depth === 1 && !containerHasAnyOwnedProperty(containerType, ctx.statePackageRoot, ctx.packageRootCache);

    for (const property of containerType.getProperties()) {
      const isDataProperty = property.name.startsWith('data-');

      if (isDataProperty) {
        if (
          !allowUnownedDataAtThisLevel &&
          !isOwnedByStatePackageRoot(property, ctx.statePackageRoot, ctx.packageRootCache)
        ) {
          continue;
        }

        const propertyLocation = property.valueDeclaration ?? property.declarations?.[0] ?? ctx.fallbackLocation;
        const rawPropertyType = ctx.checker.getTypeOfSymbolAtLocation(property, propertyLocation);
        addDataAttributeRow(propertyPath, property, rawPropertyType, ctx, rows);

        if (rows.size > MAX_STATE_DATA_ATTRIBUTE_ROWS) {
          throw new Error(
            `getStateDataAttributes: state "${ctx.stateName}" exceeded the maximum number of data attribute ` +
              `rows (${MAX_STATE_DATA_ATTRIBUTE_ROWS}) at path "${propertyPath.join('.') || '<root>'}"`,
          );
        }
        continue;
      }

      if (depth > 0 && !isOwnedByStatePackageRoot(property, ctx.statePackageRoot, ctx.packageRootCache)) {
        continue;
      }

      const propertyLocation = property.valueDeclaration ?? property.declarations?.[0] ?? ctx.fallbackLocation;
      const rawPropertyType = ctx.checker.getTypeOfSymbolAtLocation(property, propertyLocation);
      const nonNullablePropertyType = ctx.checker.getNonNullableType(rawPropertyType);
      const identity = getTypeIdentity(nonNullablePropertyType);

      if (visiting.has(identity)) {
        continue;
      }

      visiting.add(identity);
      visit(nonNullablePropertyType, [...propertyPath, property.name], depth + 1);
      visiting.delete(identity);
    }
  }

  visit(stateType, [], 0);

  return rows;
}

/**
 * Compiles exported declarations and converts slot `data-*` properties from exported `*State` types into
 * Storybook ArgTypes.
 */
export function getStateDataAttributes(options: GetStateDataAttributesOptions): Record<string, StrictArgTypes> {
  const rawPackageRoot = options.packageRoot;

  if (!path.isAbsolute(rawPackageRoot)) {
    throw new Error(`getStateDataAttributes: packageRoot must be an absolute path, received "${rawPackageRoot}"`);
  }

  if (!fs.existsSync(rawPackageRoot)) {
    throw new Error(`getStateDataAttributes: packageRoot does not exist: "${rawPackageRoot}"`);
  }

  // Normalized so trailing slashes/`.`/`..` segments compare consistently against paths produced by
  // `path.resolve` elsewhere (e.g. `findPackageRootForFile`'s fallback-ownership comparisons).
  const packageRoot = path.resolve(rawPackageRoot);

  const rootFiles = getExportedTypeEntryPoints(packageRoot);
  const compilerOptions = resolveCompilerOptions(packageRoot);
  const program = ts.createProgram(rootFiles, compilerOptions);
  const checker = program.getTypeChecker();
  const parser = new Parser(program, { shouldRemoveUndefinedFromOptional: true });
  const rootFileSet = new Set(rootFiles.map(fileName => path.resolve(fileName)));

  const programDiagnostics = [...program.getOptionsDiagnostics(), ...program.getGlobalDiagnostics()].filter(
    diagnostic => diagnostic.category === ts.DiagnosticCategory.Error,
  );

  if (programDiagnostics.length > 0) {
    throw new Error(
      `getStateDataAttributes: invalid compiler options for "${packageRoot}":\n${programDiagnostics
        .map(formatDiagnostic)
        .join('\n')}`,
    );
  }

  const rootDiagnostics: string[] = [];
  for (const rootFile of rootFiles) {
    const sourceFile = program.getSourceFile(rootFile);
    if (!sourceFile) {
      rootDiagnostics.push(`${rootFile} - source file could not be loaded into the program`);
      continue;
    }

    const diagnostics = [...program.getSyntacticDiagnostics(sourceFile), ...program.getSemanticDiagnostics(sourceFile)];
    for (const diagnostic of diagnostics) {
      if (diagnostic.category === ts.DiagnosticCategory.Error) {
        rootDiagnostics.push(formatDiagnostic(diagnostic));
      }
    }
  }

  if (rootDiagnostics.length > 0) {
    throw new Error(`getStateDataAttributes: failed to compile exported declarations:\n${rootDiagnostics.join('\n')}`);
  }

  const results = new Map<string, { argTypes: StrictArgTypes; declarationPath: string }>();
  const packageRootCache = new Map<string, string | undefined>();

  for (const sourceFile of program.getSourceFiles()) {
    const resolvedFileName = path.resolve(sourceFile.fileName);
    if (!rootFileSet.has(resolvedFileName)) {
      continue;
    }

    const moduleSymbol = checker.getSymbolAtLocation(sourceFile);
    if (!moduleSymbol) {
      continue;
    }

    const { exported: locallyExportedNames, nonExported: locallyNonExportedNames } =
      getLocallyExportedNames(sourceFile);

    for (const exportSymbol of checker.getExportsOfModule(moduleSymbol)) {
      const exportName = exportSymbol.getName();
      if (!exportName.endsWith('State')) {
        continue;
      }

      if (locallyNonExportedNames.has(exportName) && !locallyExportedNames.has(exportName)) {
        continue;
      }

      const componentKey = exportName.slice(0, -'State'.length);
      const resolvedSymbol = hasSymbolFlag(exportSymbol, ts.SymbolFlags.Alias)
        ? checker.getAliasedSymbol(exportSymbol)
        : exportSymbol;

      const stateType = checker.getDeclaredTypeOfSymbol(resolvedSymbol);
      const statePackageRoot = findStatePackageRoot(resolvedSymbol, packageRoot, packageRootCache);
      const rows = collectStateDataAttributeRows(stateType, {
        checker,
        parser,
        statePackageRoot,
        packageRootCache,
        fallbackLocation: sourceFile,
        stateName: exportName,
      });

      if (rows.size === 0) {
        continue;
      }

      const argTypes: StrictArgTypes = {};
      for (const [key, { row }] of rows) {
        argTypes[key] = row;
      }

      const sortedArgTypes = Object.fromEntries(Object.entries(argTypes).sort(([a], [b]) => a.localeCompare(b)));
      const existing = results.get(componentKey);

      if (existing) {
        if (serializeArgTypes(existing.argTypes) === serializeArgTypes(sortedArgTypes)) {
          continue;
        }

        throw new Error(
          `getStateDataAttributes: conflicting component metadata for key "${componentKey}" between "${existing.declarationPath}" and "${resolvedFileName}"`,
        );
      }

      results.set(componentKey, { argTypes: sortedArgTypes, declarationPath: resolvedFileName });
    }
  }

  const output: Record<string, StrictArgTypes> = {};
  for (const [componentKey, { argTypes }] of [...results.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    output[componentKey] = argTypes;
  }

  return output;
}
