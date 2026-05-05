// @ts-check

const rootConfig = require('../../../eslint.config.js');

module.exports = [
  ...rootConfig,
  {
    rules: {
      '@fluentui/react-components/enforce-use-client': 'off',
    },
  },
];
