// @ts-check
const { getNamingConventionConfig } = require('@uifabric/build/eslint/namingConvention');

module.exports = {
  extends: ['../../scripts/eslint/v7'],
  root: true,
  rules: {
    '@typescript-eslint/naming-convention': getNamingConventionConfig(false /* prefixWithI */),
  },
};
