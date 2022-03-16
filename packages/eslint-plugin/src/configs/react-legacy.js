// @ts-check

const path = require('path');
const configHelpers = require('../utils/configHelpers');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [path.join(__dirname, 'core'), path.join(__dirname, 'react-config')],

  rules: {
    ...configHelpers.getNamingConventionRule(true),
    'jsdoc/check-tag-names': 'off',
  },
};
