// @ts-check
const fluentPlugin = require('@fluentui/eslint-plugin');

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  ...fluentPlugin.configs['flat/node'],
  ...fluentPlugin.configs['flat/imports'],
  {
    rules: {
      'import/no-extraneous-dependencies': [
        'error',
        {
          packageDir: ['.', '../../'],
        },
      ],
    },
  },
];
