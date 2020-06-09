// @ts-check
const { getNodePackageRules } = require('@uifabric/build/eslint/ruleHelpers');

const fixturesPath = 'fixtures/**/*.{ts,tsx}';

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['../../scripts/eslint/v7'],
  root: true,
  rules: {
    ...getNodePackageRules(),
  },
  overrides: [
    {
      // These files are not actually compiled and therefore don't need correct deps and such
      // (they just have to be syntactically valid)
      files: [fixturesPath],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
