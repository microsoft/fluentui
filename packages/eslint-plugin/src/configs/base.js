// @ts-check

const path = require('path');
const configHelpers = require('../utils/configHelpers');

const { getNamingConventionRule } = require('../utils/configHelpers');

/** @type {import("eslint").Linter.RulesRecord} */
const typeAwareRules = {
  '@fluentui/ban-context-export': ['error', { exclude: ['**/react-shared-contexts/**'] }],
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
  },
  overrides: [
    // Enable rules requiring type info only for appropriate files/circumstances
    ...configHelpers.getTypeInfoRuleOverrides(typeAwareRules),
    {
      files: '**/src/index.{ts,tsx,js}',
      rules: {
        // TODO: propagate to `error` once all packages barrel files have been fixed
        '@rnx-kit/no-export-all': ['warn', { expand: 'all' }],
      },
    },
  ],
};
