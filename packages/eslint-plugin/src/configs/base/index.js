// @ts-check
const core = require('../core');
const compat = require('eslint-plugin-compat');
const { defineConfig } = require('eslint/config');

const { testFiles, storyFiles } = require('../../utils/configHelpers');

/** @type { import("eslint").Linter.Config } */
module.exports = defineConfig(
  core,
  {
    rules: {
      '@fluentui/max-len': 'off',
      '@typescript-eslint/triple-slash-reference': ['error', { lib: 'always', path: 'never', types: 'never' }],
    },
  },
  {
    files: ['**/src/**/*.{ts,tsx,js}'],
    ignores: [...testFiles, ...storyFiles],
    ...compat.configs['flat/recommended'],
    rules: {
      ...compat.configs['flat/recommended'].rules,
      '@rnx-kit/no-export-all': ['error', { expand: 'all' }],
    },
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
);
