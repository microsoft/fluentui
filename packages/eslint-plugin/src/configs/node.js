// @ts-check

const path = require('path');

/** @type {import("eslint").Linter.LegacyConfig} */
module.exports = {
  extends: [path.join(__dirname, 'base')],
  rules: {
    'no-console': 'off',
  },
};
