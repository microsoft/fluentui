// @ts-check

const rootConfig = require('../../../eslint.config.js');

module.exports = [
  ...rootConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@griffel/styles-file': 'off',
      '@nx/workspace-enforce-use-client': 'off',
    },
  },
];
