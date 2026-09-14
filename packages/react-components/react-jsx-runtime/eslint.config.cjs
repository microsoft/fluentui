// @ts-check

const rootConfig = require('../../../eslint.config.js');

module.exports = [
  ...rootConfig,
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
