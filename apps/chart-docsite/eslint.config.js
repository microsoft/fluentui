// @ts-check
const fluentPlugin = require('@fluentui/eslint-plugin');

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  ...fluentPlugin.configs['flat/react'],
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/jsx-no-bind': 'off',
      '@typescript-eslint/no-deprecated': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'import/no-extraneous-dependencies': ['error', { packageDir: ['.', '../..'] }],
    },
  },
];
