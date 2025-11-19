// @ts-check

const fluentPlugin = require('@fluentui/eslint-plugin');

module.exports = [
  ...fluentPlugin.configs['flat/react'],
  {
    rules: {
      '@fluentui/react-components/enforce-use-client': 'off',
    },
  },
];
