/**
 * This file sets you up with structure needed for an ESLint rule.
 *
 * It leverages utilities from @typescript-eslint to allow TypeScript to
 * provide autocompletions etc for the configuration.
 *
 * Your rule's custom logic will live within the create() method below
 * and you can learn more about writing ESLint rules on the official guide:
 *
 * https://eslint.org/docs/developer-guide/working-with-rules
 *
 * You can also view many examples of existing rules here:
 *
 * https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/src/rules
 */

import { ESLintUtils, AST_NODE_TYPES, AST_TOKEN_TYPES, ASTUtils, TSESTree } from '@typescript-eslint/utils';

// NOTE: The rule will be available in ESLint configs as "@nx/workspace-no-missing-jsx-pragma"
export const RULE_NAME = 'no-missing-jsx-pragma';

export const rule = ESLintUtils.RuleCreator(() => __filename)({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce properly configured of @jsx or @jsxImportSource pragma for files using Fluent slot API',
      recommended: 'recommended',
    },
    schema: [],
    messages: {
      missingPragma: `File uses JSX slots API but doesn't specify custom jsx transforms. To fix this add /** @jsxImportSource @fluentui/react-jsx-runtime */`,
      missingCreateElementFactoryImport: `File uses JSX slots API, has defined /** jsx createElement */ pragma, but is missing 'createElement' factory function import. To fix this add "import {createElement} from '@fluentui/react-jsx-runtime'"`,
    },
  },
  defaultOptions: [],
  create(context) {
    let hasCreateElementImport = false;
    let hasAssertSlots = false;
    let hasSlotJsxExpression = false;
    let hasJsxImportSourcePragma = false;
    let hasJsxPragma = false;
    let specifiedJsxRuntimePragma: 'automatic' | 'classic' | null = null;

    return {
      Program(node) {
        if (!node.comments) {
          return;
        }

        // Check comments in the program
        node.comments.forEach(checkJsxPragmas);
      },
      'ImportDeclaration ImportSpecifier[local.name=createElement]'(node: TSESTree.ImportSpecifier) {
        hasCreateElementImport = true;
      },
      'JSXElement JSXMemberExpression[object.name=state]'(node: TSESTree.JSXMemberExpression) {
        hasSlotJsxExpression = true;
      },
      CallExpression(node) {
        if (node.callee.type === AST_NODE_TYPES.Identifier && node.callee.name === 'assertSlots') {
          hasAssertSlots = true;
        }
      },
      'Program:exit'() {
        if (!(hasSlotJsxExpression && hasAssertSlots)) {
          return;
        }

        const hasRequiredPragma = hasJsxImportSourcePragma || hasJsxPragma;

        if (!hasRequiredPragma) {
          context.report({
            messageId: 'missingPragma',
            // Adjust location if needed
            loc: { line: 1, column: 1 },
          });

          return;
        }

        if (hasJsxPragma && !hasCreateElementImport) {
          context.report({
            messageId: 'missingCreateElementFactoryImport',
            // Adjust location if needed
            loc: { line: 1, column: 1 },
          });
          return;
        }
      },
    };

    function checkJsxPragmas(node: TSESTree.Comment) {
      if (node.type !== AST_TOKEN_TYPES.Block) {
        return;
      }

      if (node.value.includes('@jsxImportSource @fluentui/react-jsx-runtime')) {
        hasJsxImportSourcePragma = true;
      }
      if (node.value.includes('@jsx createElement')) {
        hasJsxPragma = true;
      }

      const runtimeRegex = /jsxRuntime\s+(classic|automatic)\s+/;
      const parsedRuntimeDefinition = runtimeRegex.exec(node.value);

      if (parsedRuntimeDefinition) {
        specifiedJsxRuntimePragma = parsedRuntimeDefinition[1] as 'automatic' | 'classic';
      }
    }
  },
});
