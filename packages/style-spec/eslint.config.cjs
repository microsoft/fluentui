// @ts-check
const fluentPlugin = require('@fluentui/eslint-plugin');

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  ...fluentPlugin.configs['flat/node'],
  {
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: ['react', 'react-dom'],
        },
      ],
    },
  },
];
