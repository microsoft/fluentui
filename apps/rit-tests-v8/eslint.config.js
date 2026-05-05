// @ts-check
const fluentPlugin = require('@fluentui/eslint-plugin');

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  {
    ignores: ['src/react-19/**/*', 'src/react-17/**/*'],
  },
  ...fluentPlugin.configs['flat/react-legacy'],
  {
    rules: {
      '@nx/workspace-no-restricted-globals': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'import/no-extraneous-dependencies': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-restricted-types': 'off',
      'no-console': 'off',
    },
  },
];
