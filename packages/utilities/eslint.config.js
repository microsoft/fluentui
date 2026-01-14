// @ts-check
const fluentPlugin = require('@fluentui/eslint-plugin');

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  ...fluentPlugin.configs['flat/react-legacy'],
  {
    rules: {
      '@rnx-kit/no-export-all': ['error', { expand: 'all' }],
      'prefer-const': 'off',
    },
  },
];
