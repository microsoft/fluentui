// @ts-check
const fluentPlugin = require('@fluentui/eslint-plugin');

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  ...fluentPlugin.configs['flat/react'],
  {
    rules: {
      '@griffel/styles-file': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'no-console': 'off',
      '@nx/workspace-no-restricted-globals': 'off',
      '@nx/workspace-enforce-use-client': 'off',
    },
  },
];
