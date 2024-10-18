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

import { ESLintUtils, AST_NODE_TYPES, AST_TOKEN_TYPES, TSESTree } from '@typescript-eslint/utils';

// NOTE: The rule will be available in ESLint configs as "@nx/workspace-no-missing-jsx-pragma"
export const RULE_NAME = 'no-missing-jsx-pragma';

type Options = Array<{ runtime: 'automatic' | 'classic' }>;
type MessageIds =
  | 'missingJsxImportSource'
  | 'missingJsxPragma'
  | 'missingCreateElementFactoryImport'
  | 'invalidJSXPragmaForAutomatic'
  | 'invalidJSXPragmaForClassic'
  | 'redundantPragma';

export const rule = ESLintUtils.RuleCreator(() => __filename)<Options, MessageIds>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce properly configured of @jsx or @jsxImportSource pragma for files using Fluent slot API',
    },
    schema: [
      {
        type: 'object',
        properties: {
          runtime: {
            type: 'string',
            enum: ['automatic', 'classic'],
          },
        },
      },
    ],
    messages: {
      missingJsxImportSource: `File uses JSX slots API but doesn't specify custom jsx transforms. To fix this add /** @jsxImportSource @fluentui/react-jsx-runtime */`,
      missingJsxPragma: `File uses JSX slots API but doesn't specify custom jsx transforms. To fix this add /** @jsx createElement */`,
      missingCreateElementFactoryImport: `File uses JSX slots API, has defined /** jsx createElement */ pragma, but is missing 'createElement' factory function import. To fix this add "import {createElement} from '@fluentui/react-jsx-runtime'"`,
      invalidJSXPragmaForAutomatic:
        'Found @jsx pragma which is not allowed. Please use /** @jsxImportSource @fluentui/react-jsx-runtime */',
      invalidJSXPragmaForClassic:
        'Found @jsxImportSource pragma which is not allowed. Please use /** @jsx createElement */',
      redundantPragma: 'Unused JSX pragma found. Needs to be removed as there is no Slot api used within jsx template',
    },
  },
  defaultOptions: [],
  create(context) {
    // track variables assigned from slot.*() apis
    const slotVariables = new Set<string>();

    let hasCreateElementImport = false;
    let hasAssertSlots = false;
    let hasSlotJsxExpression = false;
    let hasSlotJsxElement = false;
    let hasJsxImportSource = false;
    let hasJsxPragma = false;
    // @TODO - implement valid /* @jsxRuntime */ docblock specification in future - which shouldn't be used as pragma/import-source infers the runtime.
    let specifiedJsxRuntimePragma: string;

    const { runtime } = context.options[0];

    if (!runtime) {
      throw new Error('missing runtime configuration. Please use on of ["automatic", "classic"]');
    }

    return {
      Program(node) {
        if (!node.comments) {
          return;
        }
        if (node.comments.length === 0) {
          return;
        }

        // Check comments in the program
        node.comments.forEach(node => checkJsxPragmas(node));
      },
      // Capture variable declarations that are assigned via slot.*() call expression`
      VariableDeclarator(node: TSESTree.VariableDeclarator) {
        if (!node.init) {
          return;
        }

        if (
          node.init.type === 'CallExpression' &&
          node.init.callee.type === 'MemberExpression' &&
          node.init.callee.object.type === 'Identifier' &&
          node.init.callee.object.name === 'slot' &&
          node.init.callee.property.type === 'Identifier' &&
          (node.init.callee.property.name === 'always' || node.init.callee.property.name === 'optional') &&
          node.id.type === 'Identifier'
        ) {
          slotVariables.add(node.id.name); // Track the variable name assigned to slot.always()
        }
      },
      // Capture JSX elements like: `<RootSlot />`
      JSXOpeningElement(node: TSESTree.JSXOpeningElement) {
        if (node.name.type !== 'JSXIdentifier') {
          return;
        }

        const elementName = node.name.name;
        if (slotVariables.has(elementName)) {
          hasSlotJsxElement = true;
        }
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
        const usesSlotApi = (hasSlotJsxExpression && hasAssertSlots) || hasSlotJsxElement;
        const hasAnyPragma = hasJsxImportSource || hasJsxPragma;

        if (!usesSlotApi && hasAnyPragma) {
          context.report({
            messageId: 'redundantPragma',
            // Adjust location if needed
            loc: { line: 1, column: 1 },
          });
          return;
        }

        if (!usesSlotApi) {
          return;
        }

        if (runtime === 'automatic') {
          if (hasJsxPragma) {
            context.report({
              messageId: 'invalidJSXPragmaForAutomatic',
              // Adjust location if needed
              loc: { line: 1, column: 1 },
            });
            return;
          }

          if (!hasJsxImportSource) {
            context.report({
              messageId: 'missingJsxImportSource',
              // Adjust location if needed
              loc: { line: 1, column: 1 },
            });
            return;
          }
        }

        if (runtime === 'classic') {
          if (hasJsxImportSource) {
            context.report({
              messageId: 'invalidJSXPragmaForClassic',
              // Adjust location if needed
              loc: { line: 1, column: 1 },
            });
            return;
          }

          if (!hasJsxPragma) {
            context.report({
              messageId: 'missingJsxPragma',
              // Adjust location if needed
              loc: { line: 1, column: 1 },
            });
            return;
          }

          if (!hasCreateElementImport) {
            context.report({
              messageId: 'missingCreateElementFactoryImport',
              // Adjust location if needed
              loc: { line: 1, column: 1 },
            });
            return;
          }
        }
      },
    };

    function checkJsxPragmas(node: TSESTree.Comment) {
      // ignore non block comments
      if (node.type !== AST_TOKEN_TYPES.Block) {
        return;
      }

      if (node.value.includes('@jsxImportSource @fluentui/react-jsx-runtime')) {
        hasJsxImportSource = true;
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
