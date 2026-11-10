// @ts-check

const fluentPlugin = require('@fluentui/eslint-plugin');

module.exports = [
  ...fluentPlugin.configs['flat/node'],
  {
    ignores: ['src/__fixtures__/**'],
  },
];
