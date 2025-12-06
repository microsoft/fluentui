// @ts-check
const fluentPlugin = require('@fluentui/eslint-plugin');

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  ...fluentPlugin.configs['flat/node'],
  {
    rules: {
      'import/no-extraneous-dependencies': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['*.ts', '*.tsx'],
    rules: {
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
    },
  },
  {
    files: ['./package.json', './generators.json', './executors.json'],
    languageOptions: {
      parser: require('jsonc-eslint-parser'),
    },
    rules: {
      '@nx/nx-plugin-checks': 'error',
    },
  },
];
