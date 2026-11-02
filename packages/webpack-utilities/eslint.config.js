// @ts-check
const fluentPlugin = require('@fluentui/eslint-plugin');

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  ...fluentPlugin.configs['flat/node-legacy'],
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'prefer-arrow-callback': 'off',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-deprecated': 'off',
    },
  },
];
