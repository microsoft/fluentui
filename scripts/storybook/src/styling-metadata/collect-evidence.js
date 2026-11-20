// @ts-check
/* eslint-disable no-bitwise -- TypeScript exposes node flags as bit sets */

/**
 * @typedef {import('./source-analysis').SourceAnalysis} SourceAnalysis
 * @typedef {import('./source-analysis').Domain} Domain
 * @typedef {(code: string, message: string, node?: import('typescript').Node, context?: Record<string, unknown>) => void} Report
 * @typedef {{
 *   name: string;
 *   slot: string | undefined;
 *   expression: any;
 *   node: import('typescript').Node;
 *   target?: string;
 *   imperative?: boolean;
 *   removal?: boolean;
 *   domain?: Domain;
 * }} AttributeWrite
 * @typedef {{
 *   maps: Map<import('typescript').Symbol, { map: Record<string, string>; declaration: any }>;
 *   writes: AttributeWrite[];
 *   states: Array<{ type: import('typescript').Type; node: import('typescript').Node }>;
 *   inputs: Map<import('typescript').Symbol | undefined, Map<unknown, any>>;
 *   compositions: Map<string, { priority: number; symbols: Set<import('typescript').Symbol> }>;
 * }} Evidence
 */

const COMPOSE_FACTORIES = ['composeComponent', 'composeComponentWithoutRef', 'composeTypography'];

/**
 * Walks a component (its factory callbacks, hooks and renderers) for `data-*` writes, data
 * attribute maps, slot state types and components composed into its slots.
 *
 * @param {import('typescript').Symbol} component
 * @param {SourceAnalysis} analysis
 * @param {Report} report
 * @param {(file: import('typescript').SourceFile) => boolean} isLocal - files of the documented package
 * @returns {Evidence}
 */
function collectEvidence(component, analysis, report, isLocal) {
  const { ts, checker, unwrap, symbolAt, isRuntime, flatMap, literal, propertyName } = analysis;

  /** @type {Set<import('typescript').Symbol>} */
  const visited = new Set();
  /** @type {Evidence['maps']} */
  const maps = new Map();
  /** @type {AttributeWrite[]} */
  const writes = [];
  /** @type {Evidence['states']} */
  const states = [];
  /** @type {Evidence['inputs']} */
  const inputs = new Map();
  /** @type {Evidence['compositions']} */
  const compositions = new Map();

  /**
   * A matching property name alone does not establish a component slot.
   * @param {import('typescript').Node | undefined} expression
   * @returns {string | undefined}
   */
  function stateSlot(expression) {
    if (!expression || !ts.isPropertyAccessExpression(expression)) {
      return undefined;
    }
    const type = checker.getNonNullableType(checker.getTypeAtLocation(expression.expression));
    const components = type.getProperty('components');
    return components && checker.getTypeOfSymbolAtLocation(components, expression).getProperty(expression.name.text)
      ? expression.name.text
      : undefined;
  }

  /** @param {any} declaration */
  const isFunctionDeclaration = declaration =>
    ts.isFunctionDeclaration(declaration) ||
    (declaration.initializer && ts.isFunctionLike(unwrap(declaration.initializer)));

  /**
   * @param {any} expression
   * @param {string} slot
   * @param {import('typescript').Node} node
   * @param {Set<import('typescript').Node>} seen
   */
  function inherit(expression, slot, node, seen = new Set()) {
    expression = unwrap(expression);
    if (!expression || seen.has(expression)) {
      return;
    }

    seen = new Set(seen).add(expression);

    if (ts.isConditionalExpression(expression)) {
      inherit(expression.whenTrue, slot, node, seen);
      inherit(expression.whenFalse, slot, node, seen);
      return;
    }

    const symbol = symbolAt(expression);

    if (
      !symbol ||
      symbol === component ||
      !symbol.declarations?.some(declaration => isRuntime(declaration.getSourceFile()))
    ) {
      return;
    }

    for (const declaration of /** @type {any[]} */ (symbol.declarations ?? [])) {
      const initializer = unwrap(declaration.initializer);
      if (initializer && (ts.isConditionalExpression(initializer) || ts.isIdentifier(initializer))) {
        inherit(initializer, slot, node, seen);
        return;
      }
    }

    const priority = isLocal(node.getSourceFile()) ? 1 : 0;
    const previous = compositions.get(slot);

    if (!previous || priority > previous.priority) {
      compositions.set(slot, { priority, symbols: new Set([symbol]) });
    } else if (priority === previous.priority) {
      previous.symbols.add(symbol);
    }
  }

  /**
   * @param {import('typescript').Node} node
   * @returns {string | undefined}
   */
  function attributeOwner(node) {
    let ancestor = /** @type {any} */ (node.parent);

    while (ancestor && !ts.isFunctionLike(ancestor)) {
      if (ts.isCallExpression(ancestor)) {
        const callee = symbolAt(ancestor.expression)?.name;
        if (
          (callee && ['jsx', 'jsxs', 'createElement'].includes(callee)) ||
          /^(?:_jsx|_jsxs)$/.test(ancestor.expression.getText())
        ) {
          const element = ancestor.arguments[0];
          if (element && ts.isPropertyAccessExpression(element)) {
            return stateSlot(element);
          }
          if (element && ts.isStringLiteralLike(element)) {
            return `element:${element.text}`;
          }
        }
      }

      if (ts.isPropertyAssignment(ancestor)) {
        const candidate = propertyName(ancestor.name);
        const object = ancestor.parent;
        const type = ts.isObjectLiteralExpression(object)
          ? checker.getContextualType(object) ?? checker.getTypeAtLocation(object)
          : undefined;
        const components = type?.getProperty('components');
        if (
          typeof candidate === 'string' &&
          components &&
          checker.getTypeOfSymbolAtLocation(components, ancestor).getProperty(candidate)
        ) {
          return candidate;
        }
      }

      if (ts.isVariableDeclaration(ancestor)) {
        const init = unwrap(ancestor.initializer);
        if (
          init &&
          ts.isCallExpression(init) &&
          ts.isPropertyAccessExpression(init.expression) &&
          init.expression.expression.getText() === 'slot'
        ) {
          // A local slot variable may have a different name from the state slot.
          return undefined;
        }
        break;
      }

      ancestor = ancestor.parent;
    }

    return undefined;
  }

  /**
   * @param {any} expression
   * @param {Set<import('typescript').Node>} seen
   * @returns {string | undefined}
   */
  function targetExpression(expression, seen = new Set()) {
    expression = unwrap(expression);
    if (!expression || seen.has(expression)) {
      return undefined;
    }

    seen = new Set(seen).add(expression);

    if (ts.isPropertyAccessExpression(expression)) {
      const owner = targetExpression(expression.expression, seen);
      return owner && `${owner}.${expression.name.text}`;
    }

    if (!ts.isIdentifier(expression)) {
      return undefined;
    }

    const declaration = /** @type {any} */ (symbolAt(expression)?.valueDeclaration);
    if (!declaration) {
      return undefined;
    }
    if (ts.isParameter(declaration) || ts.isBindingElement(declaration)) {
      return expression.text;
    }

    if (!ts.isVariableDeclaration(declaration) || !(declaration.parent.flags & ts.NodeFlags.Const)) {
      return undefined;
    }

    const initializer = unwrap(declaration.initializer);
    const factory =
      initializer && ts.isCallExpression(initializer) ? symbolAt(initializer.expression)?.name : undefined;

    if (factory === 'useRef' || factory === 'createRef') {
      return expression.text;
    }

    return targetExpression(initializer, seen);
  }

  /**
   * @param {any} expression
   * @param {import('typescript').Node} node
   */
  function targetLabel(expression, node) {
    const target = targetExpression(expression);

    if (!target) {
      return undefined;
    }

    for (let ancestor = /** @type {any} */ (node.parent); ancestor; ancestor = ancestor.parent) {
      if (!ts.isFunctionLike(ancestor)) {
        continue;
      }
      if (ancestor.name && ts.isIdentifier(ancestor.name)) {
        return `${ancestor.name.text}(${target})`;
      }

      let owner = ancestor.parent;

      if (ts.isCallExpression(owner)) {
        owner = owner.parent;
      }
      if (ts.isVariableDeclaration(owner) && ts.isIdentifier(owner.name)) {
        return `${owner.name.text}(${target})`;
      }
    }

    return undefined;
  }

  /** @param {import('typescript').Symbol | undefined} symbol */
  function visitSymbol(symbol) {
    if (!symbol || visited.has(symbol)) {
      return;
    }

    visited.add(symbol);

    for (const declaration of /** @type {any[]} */ (symbol.declarations ?? [])) {
      if (!isRuntime(declaration.getSourceFile())) {
        continue;
      }

      if (ts.isVariableDeclaration(declaration)) {
        const map = flatMap(declaration);

        if (map && Object.values(map).every(value => value.startsWith('data-'))) {
          maps.set(symbol, { map, declaration });
          continue;
        }

        const initializer = unwrap(declaration.initializer);

        if (
          !map &&
          initializer &&
          ts.isObjectLiteralExpression(initializer) &&
          (symbol.name.endsWith('DataAttributes') ||
            initializer.properties.some(
              property =>
                ts.isPropertyAssignment(property) && String(literal(property.initializer)).startsWith('data-'),
            ))
        ) {
          report(
            'unresolved-map',
            `Cannot statically evaluate ${symbol.name}; expected flat maps of literals or constant references`,
            declaration,
          );
        }
      }

      walk(declaration);
    }
  }

  /** @param {import('typescript').CallExpression} node */
  function collectCall(node) {
    const symbol = symbolAt(node.expression);

    if (symbol && COMPOSE_FACTORIES.includes(symbol.name)) {
      for (const argument of node.arguments.slice(1)) {
        visitSymbol(symbolAt(unwrap(argument)));
      }
      return;
    }

    for (const argument of node.arguments) {
      const callback = symbolAt(unwrap(argument));
      if (callback?.declarations?.some(isFunctionDeclaration)) {
        visitSymbol(callback);
      }
    }

    for (const declaration of /** @type {any[]} */ (symbol?.declarations ?? [])) {
      const fn = unwrap(declaration.initializer) ?? declaration;
      if (!ts.isFunctionLike(fn)) {
        continue;
      }

      node.arguments.forEach((input, index) => {
        const argument = unwrap(input);
        const parameter = fn.parameters[index];
        if (!parameter) {
          return;
        }

        /** @type {Map<unknown, any>} */
        const values = new Map();

        for (const property of ts.isObjectLiteralExpression(argument) ? argument.properties : []) {
          if (ts.isSpreadAssignment(property)) {
            values.clear();
          }
          if (ts.isPropertyAssignment(property) && literal(property.initializer) !== undefined) {
            values.set(propertyName(property.name), property.initializer);
          }
        }

        const key = symbolAt(parameter.name);
        const previous = inputs.get(key);

        if (!previous) {
          inputs.set(key, values);
        } else {
          for (const [name, value] of previous) {
            if (!values.has(name) || literal(values.get(name)) !== literal(value)) {
              previous.delete(name);
            }
          }
        }
      });
    }

    visitSymbol(symbol);
  }

  /** @param {import('typescript').PropertyAssignment} node */
  function collectProperty(node) {
    const name = propertyName(node.name);

    // Controller callbacks can own writes without a direct call in the hook.
    const callback = symbolAt(node.initializer);
    if (callback?.declarations?.some(isFunctionDeclaration)) {
      visitSymbol(callback);
    }

    if (name === 'components' && ts.isObjectLiteralExpression(node.initializer)) {
      for (const member of node.initializer.properties) {
        const slot = propertyName(member.name);
        if (ts.isPropertyAssignment(member) && typeof slot === 'string') {
          inherit(member.initializer, slot, member);
        }
      }
    }

    if (name === 'elementType') {
      const owner = attributeOwner(node);
      if (owner) {
        inherit(node.initializer, owner, node);
      }
    }

    if (typeof name === 'string' && name.startsWith('data-')) {
      writes.push({ name, slot: attributeOwner(node), expression: node.initializer, node });
    }
  }

  /** @param {import('typescript').CallExpression} node */
  function collectImperativeWrite(node) {
    const method = ts.isPropertyAccessExpression(node.expression) ? node.expression.name.text : '';
    const name = ['setAttribute', 'toggleAttribute', 'removeAttribute'].includes(method)
      ? literal(node.arguments[0])
      : undefined;
    if (typeof name !== 'string' || !name.startsWith('data-')) {
      return;
    }

    writes.push({
      name,
      slot: undefined,
      target: targetLabel(
        /** @type {import('typescript').PropertyAccessExpression} */ (node.expression).expression,
        node,
      ),
      imperative: true,
      removal: method === 'removeAttribute',
      expression: node.arguments[1],
      node,
      domain: method === 'toggleAttribute' ? { kind: 'presence' } : undefined,
    });
  }

  /** @param {import('typescript').BinaryExpression} node */
  function collectAssignment(node) {
    const lhs = unwrap(node.left);

    // TODO: only `state.<slot>["data-x"]` is attributed. Writes on a local slot
    // variable (`root["data-type"] = type` in useNavDrawer) surface as
    // unresolved-slot; resolve the identifier through its slot.*() declaration.
    if (ts.isElementAccessExpression(lhs)) {
      const name = literal(lhs.argumentExpression);
      if (typeof name === 'string' && name.startsWith('data-')) {
        const owner = unwrap(lhs.expression);

        writes.push({
          name,
          slot: stateSlot(owner),
          expression: node.right,
          node,
        });
      }
    }
  }

  /** @param {import('typescript').JsxOpeningElement | import('typescript').JsxSelfClosingElement} node */
  function isReturnedJsx(node) {
    let rendered = /** @type {import('typescript').Node} */ (ts.isJsxOpeningElement(node) ? node.parent : node);
    while (
      ts.isParenthesizedExpression(rendered.parent) ||
      ts.isAsExpression(rendered.parent) ||
      ts.isSatisfiesExpression(rendered.parent)
    ) {
      rendered = rendered.parent;
    }
    return (
      ts.isReturnStatement(rendered.parent) ||
      (ts.isArrowFunction(rendered.parent) && rendered.parent.body === rendered)
    );
  }

  /** @param {import('typescript').JsxOpeningElement | import('typescript').JsxSelfClosingElement} node */
  function collectJsx(node) {
    let owner = /** @type {import('typescript').Node | undefined} */ (node.parent);
    while (owner && !ts.isFunctionLike(owner)) {
      owner = owner.parent;
    }
    const parameter = owner?.parameters?.[0];
    const stateRenderer = parameter && checker.getTypeAtLocation(parameter).getProperty('components');
    const ownerDeclaration = owner && ts.isCallExpression(owner.parent) ? owner.parent.parent : owner?.parent;
    const componentFunction =
      (owner && ts.isFunctionDeclaration(owner) && owner.name && symbolAt(owner.name) === component) ||
      (ownerDeclaration && ts.isVariableDeclaration(ownerDeclaration) && symbolAt(ownerDeclaration.name) === component);
    const returned = isReturnedJsx(node) && (stateRenderer || componentFunction);
    const intrinsic = ts.isIdentifier(node.tagName) && /^[a-z]/.test(node.tagName.text);
    if (returned && !intrinsic) {
      inherit(node.tagName, 'root', node);
    }

    const slot =
      stateSlot(node.tagName) ?? (returned ? 'root' : intrinsic ? `element:${node.tagName.getText()}` : undefined);

    for (const attribute of node.attributes.properties) {
      if (!ts.isJsxAttribute(attribute)) {
        continue;
      }
      const name = propertyName(attribute.name);
      if (typeof name !== 'string' || !name.startsWith('data-')) {
        continue;
      }
      const initializer = attribute.initializer;
      writes.push({
        name,
        slot,
        node: attribute,
        expression: initializer && ts.isJsxExpression(initializer) ? initializer.expression : initializer,
        // JSX shorthand passes boolean true, not presence serialization.
        domain: initializer ? undefined : { kind: 'literal', values: [true] },
      });
    }
  }

  /** @param {import('typescript').Node} node */
  function walk(node) {
    if (ts.isCallExpression(node)) {
      collectCall(node);
      collectImperativeWrite(node);
    }

    if (ts.isIdentifier(node)) {
      const symbol = symbolAt(node);
      if (symbol?.declarations?.some(declaration => ts.isVariableDeclaration(declaration) && flatMap(declaration))) {
        visitSymbol(symbol);
      }
    }

    if (ts.isVariableDeclaration(node)) {
      const type = checker.getTypeAtLocation(node.name);
      if (type.getProperty('components')) {
        states.push({ type, node: node.name });
      }
    }

    if (ts.isPropertyAccessExpression(node)) {
      visitSymbol(symbolAt(node.expression));
    }
    if (ts.isPropertyAssignment(node)) {
      collectProperty(node);
    }
    if (ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) {
      collectJsx(node);
    }
    if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
      collectAssignment(node);
    }

    ts.forEachChild(node, walk);
  }

  visitSymbol(component);

  return { maps, writes, states, inputs, compositions };
}

module.exports = { collectEvidence };
