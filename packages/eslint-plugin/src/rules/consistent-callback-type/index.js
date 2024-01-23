// @ts-check
const { AST_NODE_TYPES } = require('@typescript-eslint/experimental-utils');
const createRule = require('../../utils/createRule');

module.exports = createRule({
  name: 'consistent-callback-type',
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce callback props to be typed with `EventHandler`',
      category: 'Best Practices',
      recommended: 'error',
    },
    messages: {
      invalidType: 'callback props should be typed with @fluentui/react-utilities#EventHandler<T>',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    let isTypeLiteralDirectChild = false; // captures `*.Props` TSTypeAliasDeclaration node and tracks direct child TSTypeLiteral node within

    return {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'TSTypeAliasDeclaration[id.name=/.*Props$/] TSTypeLiteral': () => {
        isTypeLiteralDirectChild = true;
      },

      // eslint-disable-next-line @typescript-eslint/naming-convention
      'TSTypeAliasDeclaration[id.name=/.*Props$/] TSTypeLiteral:exit': (
        /** @type {import('@typescript-eslint/experimental-utils').TSESTree.TSTypeLiteral}*/ node,
      ) => {
        if (isTypeLiteralDirectChild) {
          node.members.forEach(member => {
            if (
              member.type === AST_NODE_TYPES.TSPropertySignature &&
              member.key.type === AST_NODE_TYPES.Identifier &&
              /^on[A-Z]/.test(member.key.name)
            ) {
              const typeAnnotation = member.typeAnnotation?.typeAnnotation;
              // Check if typeAnnotation is of type EventHandler
              if (
                !(
                  typeAnnotation &&
                  typeAnnotation.type === AST_NODE_TYPES.TSTypeReference &&
                  typeAnnotation.typeName.type === AST_NODE_TYPES.Identifier &&
                  typeAnnotation.typeName.name === 'EventHandler' &&
                  typeAnnotation.typeParameters
                )
              ) {
                context.report({
                  node: member,
                  messageId: 'invalidType',
                });
              }
            }
          });
        }
      },

      // eslint-disable-next-line @typescript-eslint/naming-convention
      'TSTypeAliasDeclaration[id.name=/.*Props$/] TSTypeLiteral TSTypeLiteral': () => {
        isTypeLiteralDirectChild = false;
      },

      // eslint-disable-next-line @typescript-eslint/naming-convention
      'TSTypeAliasDeclaration[id.name=/.*Props$/] TSTypeLiteral TSTypeLiteral:exit': () => {
        isTypeLiteralDirectChild = true;
      },
    };
  },
});
