// @ts-check

const fluentPlugin = require('@fluentui/eslint-plugin');

module.exports = [
  ...fluentPlugin.configs['flat/react'],
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@griffel/styles-file': 'off',
      '@nx/workspace-enforce-use-client': 'off',
    },
  },
];
