// @ts-check
const fluentPlugin = require('@fluentui/eslint-plugin');

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  ...fluentPlugin.configs['flat/react-legacy'],
  {
    // cypress e2e specs are bundled by cypress at runtime and not part of the library tsconfig program
    ignores: ['**/*.e2e.{ts,tsx}'],
  },
  {
    rules: {
      'import/no-webpack-loader-syntax': 'off',
      'no-alert': 'off',
      'no-restricted-globals': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-deprecated': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
  {
    files: ['**/*.Example.{ts,tsx}'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  },
];
