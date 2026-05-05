// @ts-check
const fluentPlugin = require('@fluentui/eslint-plugin');

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  {
    ignores: ['**/__fixtures__/**'],
  },
  ...fluentPlugin.configs['flat/node'],
  {
    files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
    rules: {
      'import/no-extraneous-dependencies': [
        'error',
        {
          packageDir: ['.', '../../'],
        },
      ],
    },
  },
  {
    files: ['**/__tests__/**/*.{ts,tsx,js,jsx}'],
    rules: {
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-shadow': 'off',
      'dot-notation': 'off',
    },
  },
];
