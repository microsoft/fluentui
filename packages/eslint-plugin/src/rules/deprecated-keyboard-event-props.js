// @ts-check
const createRule = require('../utils/createRule');
const ts = require('typescript');

module.exports = createRule({
  name: 'deprecated-keyboard-event-props',
  meta: {
    type: 'problem',
    docs: {
      description: 'Forbid use of deprecated KeyboardEvent props "which" and "keyCode".',
      category: 'Best Practices',
      recommended: 'error',
      requiresTypeChecking: true,
    },
    messages: {
      deprecatedProp: 'KeyboardEvent prop "{{name}}" is deprecated (consider using @fluentui/keyboard-key instead)',
    },
    schema: [],
  },
  defaultOptions: [],
  create: context => {
    if (!(context.parserServices && context.parserServices.program && context.parserServices.esTreeNodeToTSNodeMap)) {
      return {};
    }
    const { program, esTreeNodeToTSNodeMap } = context.parserServices;
    /** @type {import("typescript").TypeChecker | undefined} */
    let typeChecker;

    return {
      Identifier: identifier => {
        const tsNode = esTreeNodeToTSNodeMap.get(identifier);
        if (
          tsNode.parent.kind === ts.SyntaxKind.PropertyAccessExpression &&
          (identifier.name === 'which' || identifier.name === 'keyCode')
        ) {
          if (!typeChecker) {
            // only get type checker if/when needed, to avoid the perf hit if unnecessary
            typeChecker = program.getTypeChecker();
          }
          const symbol = typeChecker.getSymbolAtLocation(tsNode);
          // Unexposed parent property has the exact info we need (not sure how to get it via public API)
          const parentName = symbol && /** @type {*} */ (symbol).parent.getEscapedName().toString();
          if (parentName && /Event\b/.test(parentName)) {
            context.report({
              node: identifier,
              messageId: 'deprecatedProp',
              data: { name: identifier.name },
            });
          }
        }
      },
    };
  },
});
