// @ts-check

const { defineConfig } = require('eslint/config');
const fluentPlugin = require('@fluentui/eslint-plugin');

module.exports = defineConfig([
  ...fluentPlugin.configs['flat/node'],
  {
    rules: {
      '@fluentui/react-components/enforce-use-client': 'off',
    },
  },
]);
