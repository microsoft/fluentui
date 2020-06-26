// @ts-check

const path = require('path');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [path.join(__dirname, 'react')],
  rules: {
    // Require leading I for interfaces (this will only change the rule for the 'interface'
    // selector, not override the whole rule config)
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        prefix: ['I'],
      },
    ],
  },
};
