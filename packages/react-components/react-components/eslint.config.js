// @ts-check

const { defineConfig } = require('eslint/config');
const fluentPlugin = require('@fluentui/eslint-plugin');

module.exports = defineConfig([
  ...fluentPlugin.configs['flat/react'],
  {
    files: ['src/index.ts'],
    rules: {
      'no-restricted-imports': 'off',
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              regex: '@fluentui/react-(infobutton|alert|virtualizer)',
              message: 'Alpha/Beta packages cannot be exposed as part of stable api of @fluentui/react-components',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/index.ts'],
    rules: {
      '@rnx-kit/no-export-all': [
        'error',
        {
          expand: 'all',
        },
      ],
      '@fluentui/ban-imports': [
        'error',
        {
          pathRegex: '.*',
          names: [
            {
              regex: 'Commons$',
            },
          ],
          message: 'Commons types should not be exported from @fluentui/react-components',
        },
      ],
    },
  },
]);
