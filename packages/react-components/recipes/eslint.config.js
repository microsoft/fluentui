// @ts-check

const rootConfig = require('../../../eslint.config.js');

module.exports = [
  ...rootConfig,
  {
    rules: {
      '@nx/workspace-enforce-use-client': 'off',
    },
  },
];
