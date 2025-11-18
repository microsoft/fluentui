// @ts-check

const { defineConfig } = require('eslint/config');
const fluentPlugin = require('@fluentui/eslint-plugin');

module.exports = defineConfig([
  ...fluentPlugin.configs['flat/react'],
  {
    rules: {
      'import/no-extraneous-dependencies': [
        'error',
        {
          packageDir: ['.', '../../../../'],
        },
      ],
    },
  },
]);
