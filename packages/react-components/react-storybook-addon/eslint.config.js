// @ts-check

const fluentPlugin = require('@fluentui/eslint-plugin');

module.exports = [
  ...fluentPlugin.configs['flat/react'],
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@griffel/styles-file': 'off',
      '@fluentui/enforce-use-client': 'off',
    },
  },
];
