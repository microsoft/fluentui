// @ts-check
const fluentPlugin = require('@fluentui/eslint-plugin');

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  ...fluentPlugin.configs['flat/react'],
  {
    rules: {
      '@griffel/styles-file': 'off',
      '@fluentui/no-restricted-imports': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/jsx-no-bind': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'import/no-extraneous-dependencies': ['error', { packageDir: ['.', '../..'] }],
      '@nx/workspace-no-restricted-globals': 'off',
      '@typescript-eslint/no-deprecated': 'off',
      '@nx/workspace-enforce-use-client': 'off',
    },
  },
];
