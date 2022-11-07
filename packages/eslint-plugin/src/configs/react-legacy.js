// @ts-check

const path = require('path');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [path.join(__dirname, 'base-legacy'), path.join(__dirname, 'react-config')],

  rules: {
    'jsdoc/check-tag-names': 'off',
    '@griffel/no-shorthands': 'off',
  },
  overrides: [
    {
      files: '**/src/index.{ts,tsx,js}',
      rules: {
        // TODO: propagate to `error` once all packages barrel files have been fixed
        '@rnx-kit/no-export-all': ['warn', { expand: 'all' }],
      },
    },
  ],
};
