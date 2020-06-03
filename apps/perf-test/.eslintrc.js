// @ts-check

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['../../scripts/eslint/v7'],
  root: true,
  rules: {
    'no-console': 'off',
    'react/forbid-component-props': 'off',
  },
};
