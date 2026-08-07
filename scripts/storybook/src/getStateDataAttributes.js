// @ts-check

const fs = require('fs');
const path = require('path');

const ts = require('typescript');

/**
 * @typedef {{
 *   name: `data-${string}`;
 *   type: string;
 *   description: string;
 * }} StateDataAttribute
 *
 * @typedef {Record<string, StateDataAttribute[]>} StateDataAttributes
 */

/**
 * @param {import('typescript').Symbol} symbol
 * @param {number} flag
 */
function hasSymbolFlag(symbol, flag) {
  // eslint-disable-next-line no-bitwise
  return (symbol.flags & flag) !== 0;
}

/**
 * @param {import('typescript').Type} type
 * @param {number} flag
 */
function hasTypeFlag(type, flag) {
  // eslint-disable-next-line no-bitwise
  return (type.flags & flag) !== 0;
}

/**
 * Extracts documented public `data-*` attributes from exported `*State` types'
 * `root` properties across all TypeScript source files under `sourceRoot`.
 *
 * @param {{ tsconfigPath: string; sourceRoot: string }} options
 * @returns {StateDataAttributes}
 */
function getStateDataAttributes(options) {
  const { tsconfigPath, sourceRoot } = options;

  // ── validate inputs ───────────────────────────────────────────────────────────

  if (!fs.existsSync(sourceRoot)) {
    throw new Error(
      `getStateDataAttributes: sourceRoot does not exist: "${sourceRoot}". ` +
        'Make sure the path points to the library source directory.',
    );
  }

  if (!fs.existsSync(tsconfigPath)) {
    throw new Error(
      `getStateDataAttributes: tsconfig file not found: "${tsconfigPath}". ` +
        'Provide an absolute path to a valid tsconfig.json.',
    );
  }

  // ── parse tsconfig ────────────────────────────────────────────────────────────

  const configFile = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
  if (configFile.error) {
    throw new Error(
      `getStateDataAttributes: failed to read tsconfig at "${tsconfigPath}": ` +
        ts.flattenDiagnosticMessageText(configFile.error.messageText, '\n'),
    );
  }

  const parsedCommandLine = ts.parseJsonConfigFileContent(configFile.config, ts.sys, path.dirname(tsconfigPath));

  if (parsedCommandLine.errors.length > 0) {
    const messages = parsedCommandLine.errors.map(d => ts.flattenDiagnosticMessageText(d.messageText, '\n')).join('\n');
    throw new Error(`getStateDataAttributes: tsconfig parse errors in "${tsconfigPath}":\n${messages}`);
  }

  // ── restrict source files to sourceRoot, excluding .d.ts and test files ───────

  const normalizedSourceRoot = path.resolve(sourceRoot);

  /**
   * Returns true when `filePath` is inside (or equal to) `normalizedSourceRoot`.
   * Uses `path.relative` so the check is robust across case-insensitive file
   * systems and avoids false positives from path-prefix string matching.
   *
   * @param {string} filePath
   */
  function isInSourceRoot(filePath) {
    const resolved = path.resolve(filePath);
    if (resolved === normalizedSourceRoot) {
      return true;
    }
    const rel = path.relative(normalizedSourceRoot, resolved);
    // path.relative returns a path starting with '..' when resolved is outside root
    return rel !== '' && !rel.startsWith('..') && !path.isAbsolute(rel);
  }

  /**
   * @param {string} filePath
   */
  function isTestOrDeclarationFile(filePath) {
    return filePath.endsWith('.d.ts') || /\.(spec|test|cy)\.[jt]sx?$/.test(filePath);
  }

  // Only process .ts (not .tsx) files: *State types always live in plain TypeScript
  // files (.types.ts or similar). Excluding .tsx files keeps the TS program free of
  // JSX that requires a full React setup not guaranteed by tsconfig.base.json.
  const filteredSourceFiles = parsedCommandLine.fileNames.filter(
    f => isInSourceRoot(f) && f.endsWith('.ts') && !isTestOrDeclarationFile(f),
  );

  // ── create TS program ─────────────────────────────────────────────────────────

  // Force JSX support so .tsx source files parse correctly regardless of the
  // tsconfig used (e.g. tsconfig.base.json which omits the `jsx` compiler option).
  const compilerOptions = {
    ...parsedCommandLine.options,
    jsx: parsedCommandLine.options.jsx ?? ts.JsxEmit.ReactJSX,
  };

  const program = ts.createProgram(filteredSourceFiles, compilerOptions);

  // check syntactic and semantic diagnostics on the explicit non-test .ts (not .tsx) files only.
  // Transitive imports (e.g. render*.tsx pulled in via imports) are excluded because they
  // live outside the non-test .ts source set and may contain JSX that requires a full
  // React setup not guaranteed by tsconfig.base.json.
  const filteredSourceFileSet = new Set(filteredSourceFiles.map(f => path.resolve(f)));
  const programDiagnostics = program
    .getSourceFiles()
    .filter(sf => filteredSourceFileSet.has(path.resolve(sf.fileName)))
    .flatMap(sf => [...program.getSyntacticDiagnostics(sf), ...program.getSemanticDiagnostics(sf)])
    .filter(d => d.category === ts.DiagnosticCategory.Error);

  if (programDiagnostics.length > 0) {
    const messages = programDiagnostics.map(d => ts.flattenDiagnosticMessageText(d.messageText, '\n')).join('\n');
    throw new Error(`getStateDataAttributes: TypeScript program errors in "${tsconfigPath}":\n${messages}`);
  }

  const checker = program.getTypeChecker();

  // ── collect *State exports across all source files ────────────────────────────

  /** @type {Map<string, StateDataAttribute[]>} */
  const resultMap = new Map();
  /** @type {Set<import('typescript').Symbol>} */
  const seenSymbols = new Set();

  for (const sourceFile of program.getSourceFiles()) {
    // Only process the explicit filtered .ts source set; skip .tsx files and any
    // transitively imported files that are not in filteredSourceFileSet.
    if (!filteredSourceFileSet.has(path.resolve(sourceFile.fileName))) {
      continue;
    }

    const moduleSymbol = checker.getSymbolAtLocation(sourceFile);
    if (!moduleSymbol) {
      continue;
    }

    for (const exportSymbol of checker.getExportsOfModule(moduleSymbol)) {
      const exportName = exportSymbol.getName();
      if (!exportName.endsWith('State')) {
        continue;
      }

      const componentKey = exportName.slice(0, -'State'.length);

      // resolve through aliases (import/export re-exports)
      const resolvedSymbol = hasSymbolFlag(exportSymbol, ts.SymbolFlags.Alias)
        ? checker.getAliasedSymbol(exportSymbol)
        : exportSymbol;

      // get the declared type and look for a 'root' property
      const type = checker.getDeclaredTypeOfSymbol(resolvedSymbol);
      const rootProp = type.getProperty('root');
      if (!rootProp) {
        continue;
      }

      const rootType = checker.getTypeOfSymbolAtLocation(rootProp, sourceFile);
      const dataAttrs = collectDataAttributes(rootType, checker, sourceFile);

      if (dataAttrs.length === 0) {
        continue;
      }

      // De-dup: if the same underlying symbol was already processed under a
      // *different* public *State alias, we still want to emit it under this
      // componentKey too (both are legitimate public API names).  Only skip
      // entirely when this exact componentKey has already been registered.
      if (seenSymbols.has(resolvedSymbol) && resultMap.has(componentKey)) {
        // Exact same key from the exact same underlying type — skip duplicate.
        continue;
      }
      seenSymbols.add(resolvedSymbol);

      // check for duplicate component keys
      if (resultMap.has(componentKey)) {
        throw new Error(
          `getStateDataAttributes: duplicate component key "${componentKey}" found. ` +
            `Multiple exports resolve to the key "${componentKey}" after stripping the "State" suffix. ` +
            'Rename one of the conflicting state types.',
        );
      }

      resultMap.set(
        componentKey,
        dataAttrs.sort((a, b) => a.name.localeCompare(b.name)),
      );
    }
  }

  // ── return stable, sorted result ──────────────────────────────────────────────

  /** @type {StateDataAttributes} */
  const sortedResult = {};
  for (const key of [...resultMap.keys()].sort()) {
    sortedResult[key] = resultMap.get(key) ?? [];
  }

  return sortedResult;
}

/**
 * Collects all `data-*` properties from a type (handling intersection types).
 *
 * @param {import('typescript').Type} type
 * @param {import('typescript').TypeChecker} checker
 * @param {import('typescript').Node} location
 * @returns {StateDataAttribute[]}
 */
function collectDataAttributes(type, checker, location) {
  /** @type {StateDataAttribute[]} */
  const attrs = [];
  const seen = new Set();

  for (const prop of type.getProperties()) {
    const propName = prop.getName();
    if (!propName.startsWith('data-') || seen.has(propName)) {
      continue;
    }
    seen.add(propName);

    const propType = checker.getTypeOfSymbolAtLocation(prop, location);

    // strip `undefined` from optional property types
    const nonUndefinedTypes = propType.isUnion()
      ? propType.types.filter(t => !hasTypeFlag(t, ts.TypeFlags.Undefined))
      : null;

    let typeString;
    if (nonUndefinedTypes && nonUndefinedTypes.length > 0) {
      typeString = formatTypeList(nonUndefinedTypes, checker);
    } else {
      typeString = checker.typeToString(propType);
    }

    const description = ts.displayPartsToString(prop.getDocumentationComment(checker)).trim();

    attrs.push({ name: /** @type {`data-${string}`} */ (propName), type: typeString, description });
  }

  return attrs;
}

/**
 * Formats a list of TypeScript types as a `|`-joined string, collapsing
 * paired `false`/`true` BooleanLiteral members to the canonical `boolean`
 * keyword so that `false | true` renders as `boolean` and
 * `false | true | "mixed"` renders as `boolean | "mixed"`.
 * A lone `false` or `true` (without its counterpart) is preserved as-is.
 *
 * @param {import('typescript').Type[]} types
 * @param {import('typescript').TypeChecker} checker
 * @returns {string}
 */
function formatTypeList(types, checker) {
  const hasFalseLiteral = types.some(
    t => hasTypeFlag(t, ts.TypeFlags.BooleanLiteral) && checker.typeToString(t) === 'false',
  );
  const hasTrueLiteral = types.some(
    t => hasTypeFlag(t, ts.TypeFlags.BooleanLiteral) && checker.typeToString(t) === 'true',
  );
  const collapseToBooleanKeyword = hasFalseLiteral && hasTrueLiteral;

  /** @type {string[]} */
  const parts = [];
  let booleanEmitted = false;

  for (const t of types) {
    if (hasTypeFlag(t, ts.TypeFlags.BooleanLiteral)) {
      if (collapseToBooleanKeyword) {
        if (!booleanEmitted) {
          parts.push('boolean');
          booleanEmitted = true;
        }
        // skip the individual false/true — already covered by 'boolean'
      } else {
        parts.push(checker.typeToString(t));
      }
    } else {
      parts.push(checker.typeToString(t));
    }
  }

  return parts.join(' | ');
}

module.exports = { getStateDataAttributes };
