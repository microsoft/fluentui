// @ts-check

const path = require('path');
const configHelpers = require('../utils/configHelpers');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [path.join(__dirname, 'react')],
  rules: {
    ...configHelpers.getNamingConventionRule(true /* prefixWithI */),
  },
};
