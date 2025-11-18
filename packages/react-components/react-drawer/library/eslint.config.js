// @ts-check

const fluentPlugin = require('@fluentui/eslint-plugin');

module.exports = [
  ...fluentPlugin.configs['flat/react'],
  {
    files: ['./src/e2e/*.tsx'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
      'react/jsx-no-bind': 'off',
    },
  },
];
