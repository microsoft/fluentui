// @ts-check
const fluentPlugin = require('@fluentui/eslint-plugin');

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  ...fluentPlugin.configs['flat/react-legacy'],
  {
    rules: {
      'import/no-webpack-loader-syntax': 'off', // ok in this project
      'no-restricted-globals': 'off',
      'react-hooks/rules-of-hooks': 'warn',
    },
  },
];
