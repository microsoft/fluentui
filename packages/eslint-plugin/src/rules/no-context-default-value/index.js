// @ts-check
const { AST_NODE_TYPES } = require('@typescript-eslint/utils');
const createRule = require('../../utils/createRule');

/**
 *
 * @typedef {{
 *   imports: string[]
 * }} Options
 *
 */

module.exports = createRule({
  name: 'no-context-default-value',
  meta: {
    type: 'problem',
    docs: {
      description: 'Restricts usage of default values on React context creation',
      recommended: false,
    },
    messages: {
      invalidDefaultValue: 'Invalid default value for context declaration, default value should be undefined',
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          imports: {
            type: 'array',
            minItems: 1,
          },
        },
      },
    ],
  },
  defaultOptions: /** @type {Options[]} */ ([]),
  create: context => {
    const options = context.options;
    const { imports } = options[0];
    /** @type {string[]} */
    const createContextIdentifiers = [];
    /** @type {string[]} */
    const createContextParentIdentifiers = [];

    /**
     * @param {import("@typescript-eslint/utils").TSESTree.LeftHandSideExpression} callee
     */
    function isCalleeCreateContext(callee) {
      if (
        callee.type === AST_NODE_TYPES.MemberExpression &&
        callee.object.type === AST_NODE_TYPES.Identifier &&
        createContextParentIdentifiers.includes(callee.object.name) &&
        callee.property.type === AST_NODE_TYPES.Identifier &&
        callee.property.name === 'createContext'
      ) {
        return true;
      }
      if (callee.type === AST_NODE_TYPES.Identifier && createContextIdentifiers.includes(callee.name)) {
        return true;
      }
      return false;
    }

    return {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      ImportDeclaration(importDeclaration) {
        if (typeof importDeclaration.source.value !== 'string' || !imports.includes(importDeclaration.source.value)) {
          return;
        }
        for (const specifier of importDeclaration.specifiers) {
          if (
            specifier.type === AST_NODE_TYPES.ImportNamespaceSpecifier ||
            // I'm assuming here that the default import is just an accumulation of named imports
            specifier.type === AST_NODE_TYPES.ImportDefaultSpecifier
          ) {
            createContextParentIdentifiers.push(specifier.local.name);
            continue;
          }
          if (specifier.type === AST_NODE_TYPES.ImportSpecifier && specifier.imported.name === 'createContext') {
            createContextIdentifiers.push(specifier.local.name);
            continue;
          }
        }
      },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      CallExpression(callExpression) {
        const firstArgument = callExpression.arguments[0];
        if (isCalleeCreateContext(callExpression.callee) && firstArgument && isArgumentNotUndefined(firstArgument)) {
          context.report({
            node: firstArgument,
            messageId: 'invalidDefaultValue',
          });
        }
      },
    };
  },
});

/**
 * @param {import("@typescript-eslint/utils").TSESTree.CallExpressionArgument} expression
 * @returns {expression is import("@typescript-eslint/utils").TSESTree.Identifier}
 */
function isArgumentNotUndefined(expression) {
  return expression.type !== AST_NODE_TYPES.Identifier || expression.name !== 'undefined';
}
