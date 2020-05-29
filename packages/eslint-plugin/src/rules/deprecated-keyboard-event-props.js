// @ts-check
const createRule = require('../utils/createRule');
const ts = require('typescript');

// Nasty syntax required for type imports until https://github.com/microsoft/TypeScript/issues/22160 is implemented.
// For some reason just importing TSESTree and accessing properties off that doesn't work.
/**
 * @typedef {import("@typescript-eslint/typescript-estree").TSESTree.Identifier} TSESTreeIdentifier
 */

module.exports = createRule({
  name: 'deprecated-keyboard-event-props',
  meta: {
    type: 'problem',
    docs: {
      description: 'Warns when deprecated KeyboardEvent props "which" and "keyCode" are used.',
      category: 'Best Practices',
      recommended: 'error',
      requiresTypeChecking: true,
    },
    messages: {
      deprecatedProp:
        'The use of deprecated KeyboardEvent prop "{{name}}" is prohibited. ' +
        'Consider using the @fluentui/keyboard-key library instead.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    if (!(context.parserServices && context.parserServices.program && context.parserServices.esTreeNodeToTSNodeMap)) {
      return {};
    }
    const { program, esTreeNodeToTSNodeMap } = context.parserServices;
    const tc = program.getTypeChecker();

    /**
     * @param {TSESTreeIdentifier} identifier
     */
    function checkIdentifier(identifier) {
      const tsNode = esTreeNodeToTSNodeMap.get(identifier);
      if (
        tsNode.parent.kind === ts.SyntaxKind.PropertyAccessExpression &&
        (identifier.name === 'which' || identifier.name === 'keyCode')
      ) {
        const symbol = tc.getSymbolAtLocation(tsNode);
        // Unexposed parent property has the exact info we need (not sure how to get it via public API)
        const parentName = symbol && /** @type {*} */ (symbol).parent.getEscapedName().toString();
        if (parentName && /Event\b/.test(parentName)) {
          context.report({
            node: identifier,
            messageId: 'deprecatedProp',
            data: {
              name: identifier.name,
            },
          });
        }
      }
    }

    return {
      Identifier: checkIdentifier,
    };
  },
});
