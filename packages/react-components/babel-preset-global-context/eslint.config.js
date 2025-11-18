// @ts-check

const fluentPlugin = require('@fluentui/eslint-plugin');

module.exports = [
  ...fluentPlugin.configs['flat/node'],
  {
    rules: {
      '@nx/workspace-enforce-use-client': 'off',
    },
  },
];
