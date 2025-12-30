// @ts-check
const fluentPlugin = require('@fluentui/eslint-plugin');

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  ...fluentPlugin.configs['flat/react-legacy'],
  {
    rules: {
      '@fluentui/ban-imports': ['error', { pathRegex: '^(\\.\\./)+Styling$', names: ['FontSizes'] }],
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: [
      '**/common/testUtilities.ts',
      '**/common/shallowUntilTarget.ts',
      '**/*.test.{ts,tsx,js,jsx}',
      '**/*.spec.{ts,tsx,js,jsx}',
      '**/__tests__/**',
      '**/__mocks__/**',
      '**/jest.config.{js,ts}',
      '**/webpack.config.{js,ts}',
      '**/.storybook/**',
    ],
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  },
];
