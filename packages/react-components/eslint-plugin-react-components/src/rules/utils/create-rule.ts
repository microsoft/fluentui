import { ESLintUtils } from '@typescript-eslint/utils';

/**
 * Creates an ESLint rule with a pre-configured URL pointing to the rule's documentation.
 */
export const createRule = ESLintUtils.RuleCreator(
  name =>
    `https://github.com/microsoft/fluentui/blob/master/packages/react-components/eslint-plugin-react-components/README.md#${name}`,
);
