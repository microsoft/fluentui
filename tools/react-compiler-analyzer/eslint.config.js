// @ts-check
const fluentPlugin = require('@fluentui/eslint-plugin');

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  ...fluentPlugin.configs['flat/node'],
  {
    ignores: ['src/__tests__/**'],
  },
  {
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  },
];
