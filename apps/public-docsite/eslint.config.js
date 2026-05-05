// @ts-check
const fluentPlugin = require('@fluentui/eslint-plugin');

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  ...fluentPlugin.configs['flat/react-legacy'],
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'import/no-webpack-loader-syntax': 'off', // ok in this project
      'prefer-const': 'off',
      'react/jsx-no-bind': 'off',
      'no-restricted-globals': 'off',
      '@typescript-eslint/no-deprecated': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
];
