// @ts-check

const path = require('path');

const { getNamingConventionRule } = require('../utils/configHelpers');
const configHelpers = require('../utils/configHelpers');

/** @type {import("eslint").Linter.RulesRecord} */
const typeAwareRules = {
  '@typescript-eslint/consistent-type-exports': ['error', { fixMixedExportsWithInlineTypeSpecifier: false }],
};

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
    // Enable rules requiring type info only for appropriate files/circumstances
    ...configHelpers.getTypeInfoRuleOverrides(typeAwareRules),
    {
      files: '**/src/**/*.{ts,tsx}',
      rules: {
        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            prefer: 'type-imports',
            disallowTypeAnnotations: false,
            fixStyle: 'separate-type-imports',
          },
        ],
      },
    },
    {
      files: '**/src/**/*.{ts,tsx,js}',
      rules: {
        '@rnx-kit/no-export-all': ['error', { expand: 'all' }],
      },
    },
  ],
};
