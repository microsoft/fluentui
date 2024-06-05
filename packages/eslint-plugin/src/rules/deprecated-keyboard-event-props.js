// @ts-check
const createRule = require('../utils/createRule');
const { ESLintUtils } = require('@typescript-eslint/utils');

module.exports = createRule({
  name: 'deprecated-keyboard-event-props',
  meta: {
    type: 'problem',
    docs: {
      description: 'Forbid use of deprecated KeyboardEvent props "which" and "keyCode".',
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
    // delay require to speed up load time
    const ts = require('typescript');

    const { program, esTreeNodeToTSNodeMap } = ESLintUtils.getParserServices(context);
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
