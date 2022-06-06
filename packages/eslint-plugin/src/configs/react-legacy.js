// @ts-check

const path = require('path');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [path.join(__dirname, 'base-legacy'), path.join(__dirname, 'react-config')],

  rules: {
    'jsdoc/check-tag-names': 'off',
    '@griffel/no-shorthands': 'off',
  },
};
