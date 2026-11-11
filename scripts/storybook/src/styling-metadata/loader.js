// @ts-check
const path = require('path');

const ts = require('typescript');

/**
 * @typedef {import('./extractor').StylingMetadataExtractor} StylingMetadataExtractor
 * @typedef {import('./extractor').Diagnostic} Diagnostic
 * @typedef {import('./extractor').ComponentStylingMetadata} ComponentStylingMetadata
 * @typedef {{ tsConfigPath: string; classNames?: boolean; dataAttributes?: boolean }} StylingMetadataLoaderOptions
 */

// TODO: styling tables are derived by static analysis because components ship no metadata files yet.
// Once they do, read those files in the extractor and keep this loader only as the injector. See README.md.

/** @type {WeakMap<object, { extractor: StylingMetadataExtractor; reported: Set<string> }>} */
const compilationExtractors = new WeakMap();

/**
 * @param {any} node
 * @returns {any}
 */
function unwrap(node) {
  while (ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isParenthesizedExpression(node)) {
    node = node.expression;
  }
  return node;
}

/**
 * @param {import('typescript').ObjectLiteralExpression} object
 * @param {string} name
 * @returns {import('typescript').PropertyAssignment | undefined}
 */
function property(object, name) {
  return /** @type {import('typescript').PropertyAssignment | undefined} */ (
    object.properties.find(
      node =>
        ts.isPropertyAssignment(node) &&
        (ts.isIdentifier(node.name) || ts.isStringLiteral(node.name)) &&
        node.name.text === name,
    )
  );
}

/**
 * Injects `parameters.__generatedStylingMetadata` into a story file's default export (meta).
 *
 * Reads `component` and `subcomponents`, resolves each through its import, and asks the extractor for
 * its styling metadata. Authored `parameters` are preserved and take precedence at render time.
 *
 * @param {{
 *   source: string;
 *   filename: string;
 *   extractor: Pick<StylingMetadataExtractor, 'extractComponent'> & Partial<Pick<StylingMetadataExtractor, 'getDiagnosticsFor'>>;
 *   onDiagnostics?: (diagnostics: Diagnostic[]) => void;
 * }} options
 * @returns {string}
 */
function transformStory({ source, filename, extractor, onDiagnostics = () => undefined }) {
  const file = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

  const exported = file.statements.find(ts.isExportAssignment);
  if (!exported || exported.isExportEquals) {
    return source;
  }
  let meta = unwrap(exported.expression);

  /** @returns {import('typescript').VariableDeclaration[]} */
  const localDeclarations = () =>
    file.statements.filter(ts.isVariableStatement).flatMap(statement => [...statement.declarationList.declarations]);

  if (ts.isIdentifier(meta)) {
    const name = meta.text;
    const declaration = localDeclarations().find(node => ts.isIdentifier(node.name) && node.name.text === name);
    if (!declaration?.initializer) {
      return source;
    }
    meta = unwrap(declaration.initializer);
  }

  if (!ts.isObjectLiteralExpression(meta)) {
    return source;
  }
  const metaObject = /** @type {import('typescript').ObjectLiteralExpression} */ (meta);
  const component = property(metaObject, 'component');

  if (!component || !ts.isIdentifier(component.initializer)) {
    return source;
  }

  /** @type {Map<string, { specifier: string; name: string }>} */
  const imports = new Map();

  for (const statement of file.statements) {
    if (
      !ts.isImportDeclaration(statement) ||
      statement.importClause?.isTypeOnly ||
      !statement.importClause?.namedBindings ||
      !ts.isNamedImports(statement.importClause.namedBindings)
    ) {
      continue;
    }
    const specifier = /** @type {import('typescript').StringLiteral} */ (statement.moduleSpecifier).text;

    for (const binding of statement.importClause.namedBindings.elements) {
      imports.set(binding.name.text, { specifier, name: (binding.propertyName ?? binding.name).text });
    }
  }

  const primary = imports.get(component.initializer.text);

  if (!primary) {
    return source;
  }

  const parameters = property(metaObject, 'parameters');

  /**
   * Resolve local constants and object spreads only for the static opt-out.
   * Authored expressions themselves are preserved and evaluated by Storybook.
   *
   * @param {any} node
   * @param {Set<string>} seen
   * @returns {any}
   */
  function resolveLocal(node, seen = new Set()) {
    if (!node) {
      return undefined;
    }
    node = unwrap(node);
    if (!ts.isIdentifier(node) || seen.has(node.text)) {
      return node;
    }
    seen = new Set(seen).add(node.text);
    const declaration = localDeclarations().find(entry => ts.isIdentifier(entry.name) && entry.name.text === node.text);
    return declaration?.initializer ? resolveLocal(declaration.initializer, seen) : node;
  }

  /**
   * @param {any} node
   * @param {string} name
   * @param {Set<import('typescript').Node>} seen
   * @returns {any}
   */
  function effectiveProperty(node, name, seen = new Set()) {
    node = resolveLocal(node);
    if (!node || !ts.isObjectLiteralExpression(node) || seen.has(node)) {
      return undefined;
    }
    seen = new Set(seen).add(node);
    for (const entry of [...node.properties].reverse()) {
      if (ts.isSpreadAssignment(entry)) {
        const spread = resolveLocal(entry.expression);
        // An opaque spread may overwrite an earlier value; do not guess false.
        if (!spread || !ts.isObjectLiteralExpression(spread)) {
          return undefined;
        }
        const value = effectiveProperty(spread, name, seen);
        if (value) {
          return value;
        }
      } else if (
        (ts.isPropertyAssignment(entry) || ts.isShorthandPropertyAssignment(entry)) &&
        entry.name.getText(file).replace(/^["']|["']$/g, '') === name
      ) {
        return ts.isPropertyAssignment(entry) ? entry.initializer : entry.name;
      }
    }
    return undefined;
  }

  let docs = parameters?.initializer;

  for (const name of ['reactStorybookAddon', 'docs']) {
    docs = effectiveProperty(docs, name);
  }

  if (resolveLocal(docs)?.kind === ts.SyntaxKind.FalseKeyword) {
    return source;
  }

  /** @type {Map<string, { specifier: string; name: string }>} */
  const members = new Map([[primary.name, primary]]);
  const subcomponents = property(metaObject, 'subcomponents');
  const subcomponentsValue = subcomponents && unwrap(subcomponents.initializer);

  if (subcomponentsValue && ts.isObjectLiteralExpression(subcomponentsValue)) {
    for (const node of /** @type {import('typescript').ObjectLiteralExpression} */ (subcomponentsValue).properties) {
      const local = ts.isShorthandPropertyAssignment(node)
        ? node.name
        : ts.isPropertyAssignment(node)
        ? node.initializer
        : undefined;
      const imported = local && ts.isIdentifier(local) ? imports.get(local.text) : undefined;
      if (imported) {
        members.set(imported.name, imported);
      }
    }
  }

  /** @type {Map<string, ComponentStylingMetadata | undefined>} */
  const definitions = new Map();

  for (const [name, { specifier }] of members) {
    definitions.set(name, extractor.extractComponent(specifier, filename, name));
    onDiagnostics(extractor.getDiagnosticsFor?.(specifier, name) ?? []);
  }

  /** @type {Record<string, unknown>} */
  const generated = {};

  for (const section of /** @type {const} */ (['dataAttributes', 'classNames'])) {
    const entries = [...members.keys()].flatMap(name => {
      const result = definitions.get(name)?.[section];
      return result ? [[name, result]] : [];
    });

    if (!entries.length) {
      continue;
    }

    generated[section] = members.size > 1 ? { components: Object.fromEntries(entries) } : entries[0][1];
  }

  if (!Object.keys(generated).length) {
    return source;
  }

  // Keep generated defaults outside authored docs: Storybook deep-merges
  // parameters, which would otherwise combine incompatible family/direct shapes.
  const authored = parameters?.initializer.getText(file) ?? '{}';
  const merged = `{ ...(${authored}), __generatedStylingMetadata: ${JSON.stringify(generated)} }`;

  if (parameters) {
    return source.slice(0, parameters.initializer.getStart(file)) + merged + source.slice(parameters.initializer.end);
  }

  return (
    source.slice(0, metaObject.getStart(file) + 1) +
    ` parameters: ${merged}, ` +
    source.slice(metaObject.getStart(file) + 1)
  );
}

/**
 * Webpack loader. Register it with {@link import('./index').registerStylingMetadataRule}.
 *
 * @this {import('webpack').LoaderContext<StylingMetadataLoaderOptions>}
 * @param {string} source
 * @param {any} sourceMap
 */
function stylingMetadataLoader(source, sourceMap) {
  this.cacheable(true);
  const options = this.getOptions();

  // TODO: `_compilation` is deprecated loader API; find another per-build key.
  const compilation = /** @type {object} */ (this._compilation);

  let entry = compilationExtractors.get(compilation);

  if (!entry) {
    const { createStylingMetadataExtractor } = require('./extractor');
    entry = { extractor: createStylingMetadataExtractor(options), reported: new Set() };
    compilationExtractors.set(compilation, entry);
  }

  const { extractor, reported } = entry;

  /** @type {string} */
  let code = source;
  /** @type {Diagnostic[]} */
  const storyDiagnostics = [];

  try {
    code = transformStory({
      source,
      filename: this.resourcePath,
      extractor,
      onDiagnostics: diagnostics => storyDiagnostics.push(...diagnostics),
    });
  } catch (error) {
    // Docs metadata must never break a Storybook build: render without the tables instead.
    this.emitWarning(new Error(`[styling metadata] ${this.resourcePath}: ${/** @type {Error} */ (error).message}`));
  } finally {
    // Register workspace sources only: files under node_modules do not change during a build.
    for (const dependency of extractor.getDependencies()) {
      if (!/[\\/]node_modules[\\/]/.test(dependency)) {
        this.addDependency(dependency);
      }
    }
  }

  for (const diagnostic of storyDiagnostics) {
    if (diagnostic.resolved || diagnostic.code === 'open-domain') {
      continue;
    }

    const key = JSON.stringify(diagnostic);
    if (reported.has(key)) {
      continue;
    }
    reported.add(key);

    const location = diagnostic.file ? ` (${path.relative(process.cwd(), diagnostic.file)})` : '';
    this.emitWarning(new Error(`[styling metadata: ${diagnostic.component}] ${diagnostic.message}${location}`));
  }

  this.callback(null, code, code === source ? sourceMap : undefined);
}

module.exports = stylingMetadataLoader;
module.exports.transformStory = transformStory;
