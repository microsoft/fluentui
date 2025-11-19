// @ts-check

const fluentPlugin = require('@fluentui/eslint-plugin');

module.exports = [
  ...fluentPlugin.configs['flat/react'],
  {
    rules: {
      '@fluentui/enforce-use-client': 'off',
    },
  },
];
