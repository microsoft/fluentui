// @ts-check

const rootConfig = require('../../../../eslint.config.js');

module.exports = [
  ...rootConfig,
  {
    rules: {
      '@typescript-eslint/no-deprecated': 'off',
    },
  },
];
