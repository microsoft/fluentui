// @ts-check
const { getNodePackageRules } = require('@uifabric/build/eslint/nodePackage');

module.exports = {
  extends: ['../../scripts/eslint/v7'],
  root: true,
  rules: {
    ...getNodePackageRules(),
    'deprecation/deprecation': 'off',
    'prefer-arrow-callback': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
