import { ESLintUtils, AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils';

// NOTE: The rule will be available in ESLint configs as "@nx/workspace-consistent-callback-type"
export const RULE_NAME = 'consistent-callback-type';

export const rule = ESLintUtils.RuleCreator(() => __filename)({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce callback props to be typed with `EventHandler`',
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
      'TSTypeAliasDeclaration[id.name=/.*Props$/] TSTypeLiteral': () => {
        isTypeLiteralDirectChild = true;
      },

      'TSTypeAliasDeclaration[id.name=/.*Props$/] TSTypeLiteral:exit': (node: TSESTree.TSTypeLiteral) => {
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

      'TSTypeAliasDeclaration[id.name=/.*Props$/] TSTypeLiteral TSTypeLiteral': () => {
        isTypeLiteralDirectChild = false;
      },

      'TSTypeAliasDeclaration[id.name=/.*Props$/] TSTypeLiteral TSTypeLiteral:exit': () => {
        isTypeLiteralDirectChild = true;
      },
    };
  },
});
