// @ts-check

const fluentPlugin = require('@fluentui/eslint-plugin');

module.exports = [
  ...fluentPlugin.configs['flat/node'],
  {
    rules: {
      '@fluentui/react-components/enforce-use-client': 'off',
    },
  },
];
