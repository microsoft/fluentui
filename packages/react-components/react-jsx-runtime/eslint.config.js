// @ts-check

const fluentPlugin = require('@fluentui/eslint-plugin');

module.exports = [
  ...fluentPlugin.configs['flat/react'],
  {
    files: ['**/*.{test,spec}.tsx'],
    rules: {
      '@nx/workspace-no-missing-jsx-pragma': ['error', { runtime: 'classic' }],
    },
  },
  {
    files: ['**/jsx-runtime.test.tsx'],
    rules: {
      '@nx/workspace-no-missing-jsx-pragma': 'off',
    },
  },
];
