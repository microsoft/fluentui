// @ts-check

const { defineConfig } = require('eslint/config');
const fluentPlugin = require('@fluentui/eslint-plugin');

module.exports = defineConfig([
  ...fluentPlugin.configs['flat/react'],
  {
    rules: {
      '@fluentui/react-components/enforce-use-client': 'off',
    },
  },
  {
    // The Storybook decorator manipulates the docs DOM directly.
    files: ['src/decorators/**/*.ts'],
    rules: {
      '@nx/workspace-no-restricted-globals': 'off',
    },
  },
]);
