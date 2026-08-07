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
  const sourceRootPrefix = normalizedSourceRoot + path.sep;

  /**
   * @param {string} filePath
   */
  function isInSourceRoot(filePath) {
    const resolved = path.resolve(filePath);
    return resolved.startsWith(sourceRootPrefix) || resolved === normalizedSourceRoot;
  }

  /**
   * @param {string} filePath
   */
  function isTestOrDeclarationFile(filePath) {
    return filePath.endsWith('.d.ts') || /\.(spec|test)\.[jt]s$/.test(filePath);
  }

  const filteredSourceFiles = parsedCommandLine.fileNames.filter(f => isInSourceRoot(f) && !isTestOrDeclarationFile(f));

  // ── create TS program ─────────────────────────────────────────────────────────

  const program = ts.createProgram(filteredSourceFiles, parsedCommandLine.options);

  // only check diagnostics on our source files, not library declarations
  const programDiagnostics = program
    .getSourceFiles()
    .filter(sf => isInSourceRoot(sf.fileName) && !sf.isDeclarationFile && !isTestOrDeclarationFile(sf.fileName))
    .flatMap(sf => [...program.getSemanticDiagnostics(sf)])
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
    if (!isInSourceRoot(sourceFile.fileName)) {
      continue;
    }
    if (sourceFile.isDeclarationFile || isTestOrDeclarationFile(sourceFile.fileName)) {
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

      // skip if we already processed this underlying symbol (de-dup re-exports)
      if (seenSymbols.has(resolvedSymbol)) {
        continue;
      }
      seenSymbols.add(resolvedSymbol);

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

    const typeString =
      nonUndefinedTypes && nonUndefinedTypes.length > 0
        ? nonUndefinedTypes.map(t => checker.typeToString(t)).join(' | ')
        : checker.typeToString(propType);

    const description = ts.displayPartsToString(prop.getDocumentationComment(checker)).trim();

    attrs.push({ name: /** @type {`data-${string}`} */ (propName), type: typeString, description });
  }

  return attrs;
}

module.exports = { getStateDataAttributes };
