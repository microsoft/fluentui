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
    /**
     * @type {{
     *   node: import('@typescript-eslint/experimental-utils').TSESTree.TSTypeAliasDeclaration,
     *   hasInnerTypeLiteral: boolean
     * }[]}
     */
    const typeAliasStack = []; // use a stack to match the first TSTypeLiteral node within TSTypeAliasDeclaration node

    return {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'TSTypeAliasDeclaration[id.name=/.*Props$/]': function (node) {
        typeAliasStack.push({ node, hasInnerTypeLiteral: false });
      },

      // eslint-disable-next-line @typescript-eslint/naming-convention
      TSTypeLiteral: (/** @type {import('@typescript-eslint/experimental-utils').TSESTree.TSTypeLiteral}*/ node) => {
        if (typeAliasStack.length > 0) {
          const top = typeAliasStack[typeAliasStack.length - 1];
          if (!top.hasInnerTypeLiteral) {
            /**
             * This is the first TSTypeLiteral node within the current TSTypeAliasDeclaration
             * For this example:
             * `type SomeProps3 = SomeArgBag & { someFunction?: (args: SomeArgBag) => void; };`
             * it matches                     `{ someFunction?: (args: SomeArgBag) => void; }`
             */
            top.hasInnerTypeLiteral = true;

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
        }
      },

      // eslint-disable-next-line @typescript-eslint/naming-convention
      'TSTypeAliasDeclaration:exit': function () {
        typeAliasStack.pop();
      },
    };
  },
});
