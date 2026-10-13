// @ts-check

const fluentPlugin = require('@fluentui/eslint-plugin');

module.exports = [
  ...fluentPlugin.configs['flat/react'],
  {
    // Core holds behaviour only: it may import foundation packages, never a component package.
    files: ['**/src/**/*.{ts,tsx}'],
    ignores: ['**/*.{test,cy,stories}.{ts,tsx}', '**/src/testing/**'],
    rules: {
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@fluentui/react-*',
                '!@fluentui/react-jsx-runtime',
                '!@fluentui/react-shared-contexts',
                '!@fluentui/react-context-selector',
                '!@fluentui/react-utilities',
                '!@fluentui/react-aria',
                '!@fluentui/react-tabster',
              ],
              message: 'react-core-preview may only import foundation packages. See the headless-first RFC.',
            },
          ],
        },
      ],
    },
  },
];
