// @ts-check

const path = require('path');

const { getNamingConventionRule, testFiles, storyFiles } = require('../utils/configHelpers');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    path.join(__dirname, 'core'),
    // Browser compatibility linter rules
    'plugin:compat/recommended',
  ],
  plugins: ['compat'],
  rules: {
    /**
     * `@typescript-eslint`plugin eslint rules
     * @see https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin
     */
    ...getNamingConventionRule(),
    '@fluentui/max-len': 'off',
    // @typescript-eslint rules
    '@typescript-eslint/triple-slash-reference': ['error', { lib: 'always', path: 'never', types: 'never' }],
  },
  overrides: [
    {
      files: '**/src/**/*.{ts,tsx,js}',
      rules: {
        '@rnx-kit/no-export-all': ['error', { expand: 'all' }],
      },
    },
    {
      files: [...testFiles, ...storyFiles],
      rules: {
        'compat/compat': 'off',
      },
    },
  ],
  settings: {
    // Browser matrix support - https://react.fluentui.dev/?path=/docs/concepts-developer-browser-support-matrix--docs#partial-browser-support-matrix
    targets: [
      // Desktop browsers
      'edge >= 79',
      'firefox >= 69',
      'chrome >= 79',
      'safari >= 13.1',
      'opera >= 64',
      'not ie <= 11',
      // Mobile browsers
      'ios_saf >= 13.4',
      'android >= 79',
      'samsung >= 14',
      'not op_mini all',
    ],
  },
};
