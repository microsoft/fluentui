// @ts-check
const { getNamingConventionConfig } = require('@uifabric/build/eslint/namingConvention');
const { getNodePackageRules } = require('@uifabric/build/eslint/nodePackage');

module.exports = {
  extends: ['../../scripts/eslint/v7'],
  root: true,
  rules: {
    ...getNodePackageRules(),
    '@typescript-eslint/naming-convention': getNamingConventionConfig(false /* prefixWithI */),
  },
};
