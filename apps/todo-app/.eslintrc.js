// @ts-check

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['../../scripts/eslint/v7'],
  root: true,
  rules: {
    'deprecation/deprecation': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prefer-const': 'off',
  },
};
