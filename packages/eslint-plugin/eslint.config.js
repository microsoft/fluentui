// @ts-check
const fluentPlugin = require('@fluentui/eslint-plugin');

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  ...fluentPlugin.configs['flat/node'],
  {
    files: ['src/rules/*.js'],
    rules: {
      // too many false positives on node types
      '@typescript-eslint/naming-convention': 'off',
    },
  },
  {
    files: ['src/rules/**/fixtures/**/*.{js,ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: false,
      },
    },
    rules: {
      'import/no-extraneous-dependencies': 'off',
      '@typescript-eslint/no-deprecated': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
  {
    files: ['src/**/*.{test,spec}.{js,ts}'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  },
];
