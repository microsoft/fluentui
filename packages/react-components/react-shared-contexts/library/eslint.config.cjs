// @ts-check

const rootConfig = require('../../../../eslint.config.js');

module.exports = [
  ...rootConfig,
  {
    rules: {
      'prefer-const': 'off',
    },
  },
];
