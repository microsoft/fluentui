// @ts-check

const rootConfig = require('../../../eslint.config.js');

module.exports = [
  ...rootConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@griffel/styles-file': 'off',
      '@fluentui/react-components/enforce-use-client': 'off',
    },
  },
];
