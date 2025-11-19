// @ts-check

const { defineConfig } = require('eslint/config');
const fluentPlugin = require('@fluentui/eslint-plugin');

module.exports = defineConfig([
  ...fluentPlugin.configs['flat/node'],
  {
    rules: {
      '@fluentui/enforce-use-client': 'off',
    },
  },
]);
