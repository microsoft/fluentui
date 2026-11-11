// @ts-check
/* eslint-disable no-bitwise -- TypeScript exposes symbol, type and node flags as bit sets */
const fs = require('fs');
const path = require('path');

const ts = require('typescript');

/**
 * @typedef {{ kind: 'literal'; values: Array<string | number | boolean> } | { kind: 'open'; values: [] } | { kind: 'presence' } | { kind: 'unresolved' }} Domain
 * @typedef {ReturnType<typeof createSourceAnalysis>} SourceAnalysis
 */

// TODO: attributes written by Fluent infrastructure outside the component walk
// (react-aria data-activedescendant*, tabster data-fui-focus-within) are not
// discovered. Resolve their exported constants or allowlist them as presence.
const DATA_ATTRIBUTE_HELPERS = new Set(['stringifyDataAttribute', 'toDataAttributeValue']);

const NON_RUNTIME_FILE = /\.(stories|test|spec)\.[cm]?[jt]sx?$/;

/**
 * TypeScript program over workspace sources, resolved through the `paths` of `tsConfigPath`.
 *
 * The program is rooted lazily at the modules stories import from, so a Storybook build only parses
 * the packages its stories document.
 *
 * @param {{ tsConfigPath: string }} options
 */
function createSourceAnalysis({ tsConfigPath }) {
  /** @type {Set<string>} */
  const dependencies = new Set();

  /** @param {string} filename */
  const readFile = filename => {
    const text = ts.sys.readFile(filename);
    if (text !== undefined) {
      dependencies.add(path.resolve(filename));
    }
    return text;
  };

  /** @param {readonly import('typescript').Diagnostic[]} errors */
  function checkConfig(errors) {
    // TS18002/18003: no inputs. Roots are added lazily, so an empty file list is expected.
    const relevant = errors.filter(error => error.code !== 18002 && error.code !== 18003);
    if (relevant.length) {
      throw new Error(relevant.map(error => ts.flattenDiagnosticMessageText(error.messageText, '\n')).join('\n'));
    }
  }

  const config = ts.readConfigFile(tsConfigPath, readFile);
  checkConfig(config.error ? [config.error] : []);

  const parsed = ts.parseJsonConfigFileContent(
    { ...config.config, files: [], include: [] },
    { ...ts.sys, readFile },
    path.dirname(tsConfigPath),
    undefined,
    tsConfigPath,
  );
  checkConfig(parsed.errors);

  /** @type {import('typescript').CompilerOptions} */
  const options = {
    ...parsed.options,
    // Base configs leave `jsx` to package configs; without it `.tsx` modules do not resolve.
    jsx: parsed.options.jsx ?? ts.JsxEmit.ReactJSX,
    noEmit: true,
    skipLibCheck: true,
  };
  const host = ts.createCompilerHost(options, true);
  host.readFile = readFile;

  /** @type {Set<string>} */
  const roots = new Set();
  let program = ts.createProgram({ rootNames: [], options, host });
  let checker = program.getTypeChecker();

  /**
   * Resolves a module specifier as imported from `containingFile` and adds it to the program.
   *
   * @param {string} specifier
   * @param {string} containingFile
   * @returns {import('typescript').SourceFile | undefined}
   */
  function resolveModule(specifier, containingFile) {
    const resolved = ts.resolveModuleName(specifier, containingFile, options, host).resolvedModule;
    if (!resolved) {
      return undefined;
    }

    const filename = path.resolve(resolved.resolvedFileName);
    if (!program.getSourceFile(filename)) {
      // Each rebuild discards the checker's caches, so root all entries of a wildcard mapping at once.
      for (const entry of [filename, ...wildcardEntries(specifier)]) {
        roots.add(entry);
      }
      program = ts.createProgram({ rootNames: [...roots], options, host, oldProgram: program });
      checker = program.getTypeChecker();
    }

    return program.getSourceFile(filename);
  }

  const pathsBase = /** @type {string} */ (options.pathsBasePath ?? options.baseUrl ?? path.dirname(tsConfigPath));

  /**
   * Files covered by the `paths` wildcard mapping a specifier matches, e.g. every
   * `library/src/*.ts` for `@fluentui/react-headless-components-preview/*`.
   *
   * @param {string} specifier
   * @returns {string[]}
   */
  function wildcardEntries(specifier) {
    for (const [pattern, targets] of Object.entries(options.paths ?? {})) {
      const [prefix, suffix, ...rest] = pattern.split('*');
      if (suffix === undefined || rest.length || !specifier.startsWith(prefix) || !specifier.endsWith(suffix)) {
        continue;
      }

      return targets.flatMap(target => {
        const absolute = path.resolve(pathsBase, target);
        const [filePrefix, fileSuffix, ...more] = path.basename(absolute).split('*');
        if (fileSuffix === undefined || more.length || path.dirname(absolute).includes('*')) {
          return [];
        }
        const directory = path.dirname(absolute);
        return fs.existsSync(directory)
          ? fs
              .readdirSync(directory)
              .filter(name => name.startsWith(filePrefix) && name.endsWith(fileSuffix))
              .map(name => path.join(directory, name))
          : [];
      });
    }

    return [];
  }

  /** @type {Map<string, string | undefined>} */
  const packageRoots = new Map();

  /**
   * Nearest directory containing a package.json.
   *
   * @param {string} filename
   * @returns {string | undefined}
   */
  function packageRootOf(filename) {
    const directory = path.dirname(path.resolve(filename));
    if (packageRoots.has(directory)) {
      return packageRoots.get(directory);
    }

    const root = fs.existsSync(path.join(directory, 'package.json'))
      ? directory
      : path.dirname(directory) === directory
      ? undefined
      : packageRootOf(directory);
    packageRoots.set(directory, root);
    return root;
  }

  /** @param {import('typescript').SourceFile} file */
  const isRuntime = file =>
    !file.isDeclarationFile && !NON_RUNTIME_FILE.test(file.fileName) && !/[\\/]node_modules[\\/]/.test(file.fileName);

  /**
   * @param {any} node
   * @returns {any}
   */
  function unwrap(node) {
    while (
      node &&
      (ts.isAsExpression(node) ||
        ts.isSatisfiesExpression(node) ||
        ts.isParenthesizedExpression(node) ||
        ts.isNonNullExpression(node))
    ) {
      node = node.expression;
    }

    return node;
  }

  /**
   * @param {import('typescript').Symbol | undefined} symbol
   * @returns {import('typescript').Symbol | undefined}
   */
  function unalias(symbol) {
    const seen = new Set();

    while (symbol && symbol.flags & ts.SymbolFlags.Alias && !seen.has(symbol)) {
      seen.add(symbol);
      symbol = checker.getAliasedSymbol(symbol);
    }

    return symbol;
  }

  /**
   * @param {import('typescript').Node | undefined} node
   * @returns {import('typescript').Symbol | undefined}
   */
  const symbolAt = node => (node ? unalias(checker.getSymbolAtLocation(node)) : undefined);

  /**
   * @param {import('typescript').SourceFile | undefined} file
   * @param {string} name
   */
  function moduleExport(file, name) {
    const symbol = file && checker.getSymbolAtLocation(file);

    return symbol && unalias(checker.getExportsOfModule(symbol).find(item => item.name === name));
  }

  /** @param {import('typescript').Symbol | undefined} symbol */
  const symbolType = symbol =>
    symbol &&
    checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration ?? /** @type {any} */ (symbol.declarations)[0]);

  /** @param {import('typescript').Symbol | undefined} symbol */
  const signatureOf = symbol => symbolType(symbol)?.getCallSignatures()[0];

  /**
   * @param {import('typescript').Type | undefined} type
   * @param {string} name
   * @param {import('typescript').Node} node
   */
  function propertyType(type, name, node) {
    const property = type && checker.getNonNullableType(type).getProperty(name);

    return property && checker.getTypeOfSymbolAtLocation(property, node);
  }

  /**
   * @param {any} node
   * @param {Set<import('typescript').Node>} seen
   * @returns {import('typescript').Type | undefined}
   */
  function declaredType(node, seen = new Set()) {
    node = unwrap(node);
    if (!node || seen.has(node)) {
      return undefined;
    }

    seen = new Set(seen).add(node);

    if (ts.isPropertyAccessExpression(node)) {
      const type = propertyType(declaredType(node.expression, seen), node.name.text, node);
      if (type) {
        return type;
      }
    }

    if (ts.isCallExpression(node)) {
      const signature = signatureOf(symbolAt(node.expression));

      if (signature) {
        // Selector hooks return the selected property rather than the context.
        const selector = node.arguments[0];
        if (selector && ts.isArrowFunction(selector) && ts.isPropertyAccessExpression(selector.body)) {
          const callback = signatureOf(signature.parameters[0]);
          const contextType = symbolType(callback?.parameters[0]);
          const selected = contextType?.getProperty(selector.body.name.text);
          if (selected) {
            return checker.getTypeOfSymbolAtLocation(selected, selector.body);
          }
        }

        return checker.getReturnTypeOfSignature(signature);
      }
    }

    for (const declaration of /** @type {any[]} */ (symbolAt(node)?.declarations ?? [])) {
      if (ts.isBindingElement(declaration) && ts.isObjectBindingPattern(declaration.parent)) {
        const owner = /** @type {any} */ (declaration.parent.parent);
        const type = owner.initializer ? declaredType(owner.initializer, seen) : checker.getTypeAtLocation(owner);
        const name = propertyName(declaration.propertyName ?? declaration.name);
        const result = name === undefined ? undefined : propertyType(type, String(name), declaration);
        if (result) {
          return result;
        }
      }

      if (ts.isParameter(declaration)) {
        return checker.getTypeAtLocation(declaration);
      }

      if (declaration.initializer && !ts.isBindingElement(declaration)) {
        const result = declaredType(declaration.initializer, seen);
        if (result) {
          return result;
        }
      }
    }

    return checker.getTypeAtLocation(node);
  }

  /**
   * @param {any} node
   * @returns {string | number | boolean | undefined}
   */
  function propertyName(node) {
    if (!node) {
      return undefined;
    }

    if (ts.isIdentifier(node) || ts.isStringLiteralLike(node) || ts.isNumericLiteral(node)) {
      return node.text;
    }
    if (ts.isComputedPropertyName(node)) {
      return literal(node.expression);
    }

    return undefined;
  }

  /**
   * Statically evaluates a literal-valued expression.
   *
   * @param {any} node
   * @param {Set<import('typescript').Symbol>} seen
   * @returns {string | number | boolean | undefined}
   */
  function literal(node, seen = new Set()) {
    node = unwrap(node);
    if (!node) {
      return undefined;
    }

    if (ts.isStringLiteralLike(node)) {
      return node.text;
    }
    if (ts.isNumericLiteral(node)) {
      return Number(node.text);
    }
    if (node.kind === ts.SyntaxKind.TrueKeyword) {
      return true;
    }
    if (node.kind === ts.SyntaxKind.FalseKeyword) {
      return false;
    }

    if (ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) {
      const owner = symbolAt(/** @type {any} */ (node).expression);
      const key = ts.isPropertyAccessExpression(node) ? node.name.text : literal(node.argumentExpression, seen);
      if (owner && !seen.has(owner)) {
        const nextSeen = new Set(seen).add(owner);
        for (const declaration of /** @type {any[]} */ (owner.declarations ?? [])) {
          const object = unwrap(declaration.initializer);
          if (!object || !ts.isObjectLiteralExpression(object)) {
            continue;
          }
          const property = object.properties.find(
            item => ts.isPropertyAssignment(item) && propertyName(item.name) === key,
          );
          if (property) {
            return literal(/** @type {any} */ (property).initializer, nextSeen);
          }
        }
      }
    }

    if (ts.isPrefixUnaryExpression(node) && node.operator === ts.SyntaxKind.MinusToken) {
      const value = literal(node.operand, seen);
      return typeof value === 'number' ? -value : undefined;
    }

    const symbol = symbolAt(node);

    if (symbol && !seen.has(symbol)) {
      seen = new Set(seen).add(symbol);
      for (const declaration of /** @type {any[]} */ (symbol.declarations ?? [])) {
        if (declaration.initializer) {
          const value = literal(declaration.initializer, seen);
          if (value !== undefined) {
            return value;
          }
        }
      }
    }

    const type = checker.getTypeAtLocation(node);
    if (type.isStringLiteral() || type.isNumberLiteral()) {
      return type.value;
    }

    return undefined;
  }

  /**
   * Evaluates `const map = { key: 'literal', ...otherMap }` to a string record.
   *
   * @param {any} declaration
   * @param {Set<import('typescript').Node>} seen
   * @returns {Record<string, string> | undefined}
   */
  function flatMap(declaration, seen = new Set()) {
    const object = unwrap(declaration?.initializer);
    if (!object || !ts.isObjectLiteralExpression(object) || seen.has(declaration)) {
      return undefined;
    }

    seen = new Set(seen).add(declaration);

    /** @type {Record<string, string>} */
    const entries = {};

    for (const property of object.properties) {
      if (ts.isSpreadAssignment(property)) {
        const spread = symbolAt(unwrap(property.expression))?.valueDeclaration;
        const inherited = spread && flatMap(spread, seen);
        if (!inherited) {
          return undefined;
        }
        Object.assign(entries, inherited);
        continue;
      }

      if (!ts.isPropertyAssignment(property)) {
        return undefined;
      }

      const key = propertyName(property.name);
      const value = literal(property.initializer);
      if (typeof key !== 'string' || typeof value !== 'string') {
        return undefined;
      }

      entries[key] = value;
    }

    return Object.keys(entries).length ? entries : undefined;
  }

  /**
   * @param {import('typescript').Type} type
   * @returns {Domain}
   */
  function typeDomain(type) {
    /** @type {Array<string | number | boolean>} */
    const values = [];
    let open = false;

    for (const member of type.isUnion() ? type.types : [type]) {
      if (member.flags & (ts.TypeFlags.Undefined | ts.TypeFlags.Null | ts.TypeFlags.Never)) {
        continue;
      }

      if (member.isStringLiteral() || member.isNumberLiteral()) {
        values.push(member.value);
      } else if (member.flags & ts.TypeFlags.BooleanLiteral) {
        values.push(/** @type {any} */ (member).intrinsicName === 'true');
      } else if (member.flags & (ts.TypeFlags.String | ts.TypeFlags.Number)) {
        open = true;
      } else {
        return { kind: 'unresolved' };
      }
    }

    if (open) {
      return { kind: 'open', values: [] };
    }

    return values.length ? { kind: 'literal', values: [...new Set(values)] } : { kind: 'unresolved' };
  }

  /**
   * Expression that supplies `name` on an object-valued expression.
   *
   * @param {any} expression
   * @param {string} name
   * @param {Set<import('typescript').Node>} seen
   * @returns {import('typescript').Expression | undefined}
   */
  function propertyExpression(expression, name, seen = new Set()) {
    expression = unwrap(expression);
    if (!expression || seen.has(expression)) {
      return undefined;
    }

    seen = new Set(seen).add(expression);

    if (ts.isObjectLiteralExpression(expression)) {
      for (const property of [...expression.properties].reverse()) {
        if (propertyName(/** @type {any} */ (property).name) === name) {
          if (ts.isPropertyAssignment(property)) {
            return property.initializer;
          }
          if (ts.isShorthandPropertyAssignment(property)) {
            return /** @type {any} */ (checker.getShorthandAssignmentValueSymbol(property)?.valueDeclaration)?.name;
          }
        }

        if (ts.isSpreadAssignment(property)) {
          const inherited = propertyExpression(property.expression, name, seen);
          if (inherited) {
            return inherited;
          }
        }
      }
    }

    if (ts.isCallExpression(expression)) {
      const symbol = symbolAt(/** @type {any} */ (expression).expression);
      for (const declaration of /** @type {any[]} */ (symbol?.declarations ?? [])) {
        const fn = unwrap(declaration.initializer) ?? declaration;
        if (!ts.isFunctionLike(fn) || !(/** @type {any} */ (fn).body)) {
          continue;
        }
        const body = /** @type {any} */ (fn).body;
        if (!ts.isBlock(body)) {
          return propertyExpression(body, name, seen);
        }
        const returned = body.statements.filter(ts.isReturnStatement);
        if (returned.length === 1) {
          return propertyExpression(returned[0].expression, name, seen);
        }
      }
    }

    for (const declaration of /** @type {any[]} */ (symbolAt(expression)?.declarations ?? [])) {
      if (declaration.initializer && !ts.isBindingElement(declaration)) {
        const result = propertyExpression(declaration.initializer, name, seen);
        if (result) {
          return result;
        }
      }
    }

    return undefined;
  }

  /**
   * Infers the values an expression can serialize to as a data attribute.
   *
   * @param {any} expression
   * @param {Set<import('typescript').Node>} seen
   * @param {Map<import('typescript').Symbol | undefined, Map<unknown, import('typescript').Expression>>} inputs
   * @returns {Domain}
   */
  function expressionDomain(expression, seen = new Set(), inputs = new Map()) {
    expression = unwrap(expression);
    if (!expression || seen.has(expression)) {
      return { kind: 'unresolved' };
    }

    seen = new Set(seen).add(expression);
    /** @param {any} node */
    const infer = node => expressionDomain(node, seen, inputs);

    if (ts.isCallExpression(expression)) {
      const call = /** @type {import('typescript').CallExpression} */ (expression);
      // Headless serializes booleans to attribute presence (`toDataAttributeValue`).
      const helperName = symbolAt(call.expression)?.name;
      const helper = helperName !== undefined && DATA_ATTRIBUTE_HELPERS.has(helperName);

      if (helper && call.arguments.length === 1) {
        const input = infer(call.arguments[0]);

        if (input.kind === 'literal') {
          const values = input.values.filter(value => !['true', 'false'].includes(String(value))).map(String);

          if (values.length && input.values.some(value => value === true || value === 'true')) {
            values.unshift('');
          }

          return values.length ? { kind: 'literal', values: [...new Set(values)] } : { kind: 'presence' };
        }

        // A generic helper's string return does not prove an open input domain.
        return { kind: 'unresolved' };
      }

      // `String(size)` serializes a numeric union; keep the literal domain
      // instead of falling through to the widened `string` return type.
      if (
        ts.isIdentifier(call.expression) &&
        call.expression.text === 'String' &&
        call.arguments.length === 1 &&
        (symbolAt(call.expression)?.declarations ?? []).every(
          declaration => declaration.getSourceFile().isDeclarationFile,
        )
      ) {
        const input = infer(call.arguments[0]);
        return input.kind === 'literal' ? { kind: 'literal', values: [...new Set(input.values.map(String))] } : input;
      }
    }

    if (ts.isPropertyAccessExpression(expression)) {
      const access = /** @type {import('typescript').PropertyAccessExpression} */ (expression);
      const supplied = inputs.get(symbolAt(access.expression))?.get(access.name.text);
      if (supplied) {
        return infer(supplied);
      }

      const value = propertyExpression(access.expression, access.name.text);
      if (value && value !== expression) {
        const inferred = infer(value);
        if (inferred.kind !== 'unresolved') {
          return inferred;
        }
      }
    }

    for (const declaration of /** @type {any[]} */ (symbolAt(expression)?.declarations ?? [])) {
      if (
        ts.isBindingElement(declaration) &&
        ts.isArrayBindingPattern(declaration.parent) &&
        declaration.parent.elements.indexOf(declaration) === 0
      ) {
        const call = unwrap(/** @type {any} */ (declaration.parent.parent).initializer);
        if (call && ts.isCallExpression(call) && symbolAt(call.expression)?.name === 'useControllableState') {
          const candidates = ['state', 'defaultState', 'initialState']
            .map(name => propertyExpression(call.arguments[0], name))
            .filter(Boolean);
          const domains = candidates.map(infer);
          if (
            domains.length &&
            domains.every(entry => entry.kind === 'literal' && entry.values.every(value => typeof value === 'boolean'))
          ) {
            return { kind: 'literal', values: [false, true] };
          }
        }
      }

      if (ts.isBindingElement(declaration) && ts.isObjectBindingPattern(declaration.parent)) {
        const owner = /** @type {any} */ (declaration.parent.parent);
        const name = propertyName(declaration.propertyName ?? declaration.name);
        const supplied = inputs.get(symbolAt(owner.name))?.get(name);
        if (supplied) {
          return infer(supplied);
        }

        const value = owner.initializer && typeof name === 'string' && propertyExpression(owner.initializer, name);
        if (value) {
          return infer(value);
        }
      }
    }

    if (ts.isConditionalExpression(expression)) {
      const conditional = /** @type {import('typescript').ConditionalExpression} */ (expression);
      const condition = infer(conditional.condition);
      if (condition.kind === 'literal' && condition.values.length === 1 && typeof condition.values[0] === 'boolean') {
        return infer(condition.values[0] ? conditional.whenTrue : conditional.whenFalse);
      }

      let comparison = unwrap(conditional.condition);
      const conditionDeclaration = symbolAt(comparison)?.valueDeclaration;
      if (conditionDeclaration && ts.isVariableDeclaration(conditionDeclaration)) {
        comparison = unwrap(conditionDeclaration.initializer);
      }

      if (
        comparison &&
        ts.isBinaryExpression(comparison) &&
        comparison.operatorToken.kind === ts.SyntaxKind.EqualsEqualsEqualsToken
      ) {
        const compared = literal(comparison.right);
        const whenTrue = infer(conditional.whenTrue);
        const whenFalse = infer(conditional.whenFalse);
        if (
          compared !== undefined &&
          symbolAt(conditional.whenFalse) === symbolAt(comparison.left) &&
          whenTrue.kind === 'literal' &&
          whenFalse.kind === 'literal'
        ) {
          return {
            kind: 'literal',
            values: [...new Set([...whenTrue.values, ...whenFalse.values.filter(value => value !== compared)])],
          };
        }
      }
    }

    // Evaluate conditional initializers before widened type fallbacks.
    const valueDeclaration = symbolAt(expression)?.valueDeclaration;
    if (valueDeclaration && ts.isVariableDeclaration(valueDeclaration) && valueDeclaration.initializer) {
      const initializer = unwrap(valueDeclaration.initializer);
      if (ts.isConditionalExpression(initializer)) {
        const inferred = infer(initializer);
        if (inferred.kind !== 'unresolved') {
          return inferred;
        }
      }
    }

    let domain = typeDomain(declaredType(expression) ?? checker.getTypeAtLocation(expression));

    if (domain.kind === 'open' || domain.kind === 'unresolved') {
      for (const item of /** @type {any[]} */ (symbolAt(expression)?.declarations ?? [])) {
        if (item.initializer && !ts.isBindingElement(item)) {
          const inferred = infer(item.initializer);
          if (inferred.kind !== 'unresolved') {
            domain = inferred;
          }
        }
      }

      if (ts.isConditionalExpression(expression)) {
        const conditional = /** @type {import('typescript').ConditionalExpression} */ (expression);
        const branches = [conditional.whenTrue, conditional.whenFalse].map(infer);
        if (branches.every(branch => branch.kind === 'literal')) {
          domain = {
            kind: 'literal',
            values: [...new Set(branches.flatMap(branch => (branch.kind === 'literal' ? branch.values : [])))],
          };
        }
      }
    }

    const type = checker.getTypeAtLocation(expression);
    const canBeAbsent = (type.isUnion() ? type.types : [type]).some(
      member => member.flags & (ts.TypeFlags.Undefined | ts.TypeFlags.Null),
    );

    if (
      domain.kind === 'literal' &&
      domain.values.length === 1 &&
      domain.values[0] === '' &&
      canBeAbsent &&
      ts.isConditionalExpression(expression)
    ) {
      return { kind: 'presence' };
    }

    return domain;
  }

  return {
    ts,
    get checker() {
      return checker;
    },
    isRuntime,
    packageRootOf,
    resolveModule,
    unwrap,
    symbolAt,
    moduleExport,
    flatMap,
    literal,
    propertyName,
    typeDomain,
    expressionDomain,
    getDependencies: () => [...dependencies],
  };
}

module.exports = { createSourceAnalysis };
