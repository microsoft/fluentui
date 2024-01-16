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
    return {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'TSTypeAliasDeclaration[id.name=/.*Props$/] TSTypeLiteral': function ( /** @type {import('@typescript-eslint/experimental-utils').TSESTree.TSTypeLiteral}*/ node) {
        node.members.forEach(member => {
          if (
            member.type === 'TSPropertySignature' &&
            member.key.type === AST_NODE_TYPES.Identifier &&
            member.key.name.startsWith('on')
          ) {
            const typeAnnotation = member.typeAnnotation?.typeAnnotation;
            // Check if typeAnnotation is of type EventHandler
            if (
              !(
                typeAnnotation &&
                typeAnnotation.type === 'TSTypeReference' &&
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
      },
    };
  },
});
