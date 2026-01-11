// @ts-check

const rootConfig = require('../../../eslint.config.js');

module.exports = [
  ...rootConfig,
  {
    rules: {
      '@griffel/styles-file': 'off',
      '@nx/workspace-no-restricted-globals': 'off',
      '@fluentui/react-components/enforce-use-client': 'off',
      'prefer-exponentiation-operator': 'off',
    },
  },
];
