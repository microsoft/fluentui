// @ts-check
const fluentPlugin = require('@fluentui/eslint-plugin');

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  ...fluentPlugin.configs['flat/node'],
  ...fluentPlugin.configs['flat/imports'],
  {
    rules: {
      '@fluentui/max-len': 'off',
      'import/no-extraneous-dependencies': [
        'error',
        {
          packageDir: ['.', '../../'],
        },
      ],
    },
  },
  {
    files: ['src/index.d.ts'],
    rules: {
      'import/no-self-import': 'off',
    },
  },
];
