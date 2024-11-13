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

import { Reference } from '@typescript-eslint/scope-manager';
import { ESLintUtils, AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils';
// NOTE: The rule will be available in ESLint configs as "@nx/workspace-no-restricted-globals"
export const RULE_NAME = 'no-restricted-globals';

type MessageIds = 'defaultMessage' | 'customMessage';

type Options = Array<{ name: string; message?: string } | string>;

export const rule = ESLintUtils.RuleCreator(() => __filename)<Options, MessageIds>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: ``,
    },
    schema: {
      type: 'array',
      items: {
        oneOf: [
          {
            type: 'string',
          },
          {
            type: 'object',
            properties: {
              name: { type: 'string' },
              message: { type: 'string' },
            },
            required: ['name'],
            additionalProperties: false,
          },
        ],
      },
      uniqueItems: true,
      minItems: 0,
    },

    messages: {
      defaultMessage: "Unexpected use of '{{name}}'.",
      customMessage: "Unexpected use of '{{name}}'. {{customMessage}}",
    },
  },
  defaultOptions: [],
  create(context) {
    const sourceCode = context.sourceCode;

    // If no globals are restricted, we don't need to do anything
    if (context.options.length === 0) {
      return {};
    }

    const restrictedGlobalMessages = context.options.reduce<Record<string, string | null>>((acc, option) => {
      if (typeof option === 'string') {
        acc[option] = null;
        return acc;
      }

      acc[option.name] = option.message ?? null;

      return acc;
    }, {});

    /**
     * Report a variable to be used as a restricted global.
     * @param reference the variable reference
     * @returns
     * @private
     */
    function reportReference(reference: Reference) {
      const name = reference.identifier.name;
      const customMessage = restrictedGlobalMessages[name];
      const messageId = customMessage ? 'customMessage' : 'defaultMessage';

      context.report({
        node: reference.identifier,
        messageId,
        data: {
          name,
          customMessage,
        },
      });
    }

    /**
     * Check if the given name is a restricted global name.
     * @param  name name of a variable
     * @returns whether the variable is a restricted global or not
     */
    function isRestricted(name: string): boolean {
      return Object.hasOwn(restrictedGlobalMessages, name);
    }

    /**
     * Determines if global reference is a TypeScript type ( which is ignored as it doesn't have any impact on runtime)
     * @param reference
     * @returns
     */
    function isTypeReference(reference: Reference) {
      if (reference.isTypeReference) {
        return true;
      }
      // eg `let id: typeof setTimeout` --> `typeof setTimeout === TSTypeQuery`
      if (reference.identifier.parent.type === AST_NODE_TYPES.TSTypeQuery) {
        return true;
      }
      // eg `useRef<ResizeObserver>()` --> `ResizeObserver === TSTypeReference`
      if (reference.identifier.parent.type === AST_NODE_TYPES.TSTypeReference) {
        return true;
      }

      return false;
    }

    return {
      Program(node) {
        const scope = sourceCode.getScope(node);

        // Report variables declared elsewhere (ex: variables defined as "global" by eslint)
        scope.variables.forEach(variable => {
          if (!variable.defs.length && isRestricted(variable.name)) {
            variable.references.forEach(reference => {
              if (isTypeReference(reference)) {
                return;
              }

              return reportReference(reference);
            });
          }
        });

        // Report variables not declared at all
        scope.through.forEach(reference => {
          if (isTypeReference(reference)) {
            return;
          }

          if (isRestricted(reference.identifier.name)) {
            return reportReference(reference);
          }
        });
      },
    };
  },
});
