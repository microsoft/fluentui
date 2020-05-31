// @ts-check
const { getNodePackageRules } = require('@uifabric/build/eslint/nodePackage');

module.exports = {
  extends: ['../../scripts/eslint/v7'],
  root: true,
  rules: getNodePackageRules(),
};
