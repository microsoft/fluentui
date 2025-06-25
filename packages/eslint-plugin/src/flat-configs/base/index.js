// @ts-check
const core = require('../core');
const compat = require('eslint-plugin-compat');
const { defineConfig } = require('eslint/config');

const { getNamingConventionRule, testFiles, storyFiles } = require('../../utils/configHelpers');

/** @type {import('eslint').Linter.Config[]} */
module.exports = defineConfig([
  {
    extends: [core],
    rules: {
      /**
       * `@typescript-eslint`plugin eslint rules
       * @see https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin
       */
      ...getNamingConventionRule(),
      '@fluentui/max-len': 'off',
      '@typescript-eslint/triple-slash-reference': ['error', { lib: 'always', path: 'never', types: 'never' }],
    },
  },
  {
    files: ['**/src/**/*.{ts,tsx,js}'],
    rules: {
      '@rnx-kit/no-export-all': ['error', { expand: 'all' }],
    },
  },
  {
    files: ['**/src/**/*.{ts,tsx,js}'],
    ignores: [...testFiles, ...storyFiles],
    extends: [compat.configs['flat/recommended']],
    settings: {
      /**
       * Browser matrix support
       * @see https://react.fluentui.dev/?path=/docs/concepts-developer-browser-support-matrix--docs#partial-browser-support-matrix
       **/
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
  },
]);
