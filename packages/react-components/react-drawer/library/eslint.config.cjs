// @ts-check

const rootConfig = require('../../../../eslint.config.js');

module.exports = [
  ...rootConfig,
  {
    files: ['./src/e2e/*.tsx'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
      'react/jsx-no-bind': 'off',
    },
  },
];
