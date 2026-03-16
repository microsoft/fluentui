// @ts-check
const fluentPlugin = require('@fluentui/eslint-plugin');

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  ...fluentPlugin.configs['flat/react-legacy'],
  {
    rules: {
      'no-restricted-globals': 'off',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      // The components in this package are all deprecated
      '@typescript-eslint/no-deprecated': 'off',
    },
  },
];
