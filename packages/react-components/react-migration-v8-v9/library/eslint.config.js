// @ts-check

const rootConfig = require('../../../../eslint.config.js');

module.exports = [
  ...rootConfig,
  {
    files: ['**/*.stories.{tsx,ts}'],
    rules: {
      'no-restricted-imports': ['error', { patterns: ['src/'] }],
    },
  },
];
