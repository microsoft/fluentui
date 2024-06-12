// @ts-check
const { AST_NODE_TYPES } = require('@typescript-eslint/utils');
const createRule = require('../utils/createRule');

module.exports = createRule({
  name: 'no-global-react',
  meta: {
    type: 'problem',
    docs: {
      description: 'Prevent accidental references to the global React namespace',
      recommended: 'error',
    },
    messages: {
      missingImport: 'You must explicitly import React to reference it',
    },
    schema: [],
  },
  defaultOptions: [],
  create: context => {
    let hasReactImport = false;

    return {
      ImportDeclaration: imprt => {
        if (
          imprt.source &&
          imprt.source.type === AST_NODE_TYPES.Literal &&
          imprt.source.value === 'react' &&
          imprt.specifiers.some(spec => spec.local.name === 'React')
        ) {
          hasReactImport = true;
        }
      },
      Identifier: identifier => {
        if (
          identifier.name === 'React' &&
          !hasReactImport &&
          // This one ensures we don't flag the import of React
          !(identifier.parent && /^Import(.*?)Specifier$/.test(identifier.parent.type))
        ) {
          context.report({
            node: identifier,
            messageId: 'missingImport',
          });
        }
      },
    };
  },
});
