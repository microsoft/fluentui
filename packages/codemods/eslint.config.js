// @ts-check
const fluentPlugin = require('@fluentui/eslint-plugin');

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  ...fluentPlugin.configs['flat/node'],
  ...fluentPlugin.configs['flat/react-legacy'],
  {
    files: ['./src/**/*.{ts,tsx,js}'],
    rules: {
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
  {
    files: ['./src/codeMods/tests/mock/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/naming-convention': 'off',
      'import/no-extraneous-dependencies': 'off',
      '@typescript-eslint/no-deprecated': 'off',
    },
  },
];
