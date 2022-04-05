// @ts-check

const path = require('path');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [path.join(__dirname, 'react')],
  rules: {
    'no-console': 'off',
  },
};
