// @ts-check

const rootConfig = require('../../../../eslint.config.js');

module.exports = [
  ...rootConfig,
  {
    files: ['**/src/**/*.{ts,tsx}'],
    ignores: ['**/*.{test,cy,stories}.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@fluentui/react-core-preview/*'],
              message:
                'Import core from its root entry. A subpath ends up in the published .d.ts and breaks consumers that resolve with moduleResolution node.',
            },
          ],
        },
      ],
    },
  },
];
