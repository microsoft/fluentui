// @ts-check

const fluentPlugin = require('@fluentui/eslint-plugin');

module.exports = [
  ...fluentPlugin.configs['flat/react'],
  {
    // Build-time verification tooling - not shipped, runs on Node, reports via stdout.
    files: ['scripts/**/*.js'],
    rules: {
      'no-console': 'off',
      'import/no-extraneous-dependencies': 'off',
    },
  },
  {
    files: ['**/src/**/*.{ts,tsx}'],
    ignores: ['**/*.{test,cy,stories}.{ts,tsx}'],
    rules: {
      '@nx/workspace-prefer-direct-reexport': 'error',
    },
  },
];
