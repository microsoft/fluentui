// @ts-check
const fluentPlugin = require('@fluentui/eslint-plugin');

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  ...fluentPlugin.configs['flat/react-legacy'],
  {
    rules: {
      'no-restricted-globals': 'off',
      'no-unsafe-optional-chaining': 'off',
    },
  },
];
