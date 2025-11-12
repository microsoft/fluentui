// @ts-check

const fluentPlugin = require('@fluentui/eslint-plugin');

module.exports = [
  ...fluentPlugin.configs['flat/react'],
  {
    files: ['**/*.stories.{tsx,ts}'],
    rules: {
      'no-restricted-imports': ['error', { patterns: ['src/'] }],
    },
  },
];
