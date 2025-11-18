// @ts-check

const fluentPlugin = require('@fluentui/eslint-plugin');

module.exports = [
  ...fluentPlugin.configs['flat/react'],
  {
    rules: {
      '@griffel/styles-file': 'off',
      '@nx/workspace-no-restricted-globals': 'off',
      '@nx/workspace-enforce-use-client': 'off',
      'prefer-exponentiation-operator': 'off',
    },
  },
];
