// @ts-check

const path = require('path');

const { getNamingConventionRule } = require('../utils/configHelpers');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [path.join(__dirname, 'core')],
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
  ],
};
