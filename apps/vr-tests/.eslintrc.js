// @ts-check

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['../../scripts/eslint/v7'],
  root: true,
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/jsx-no-bind': 'off',
    'react/forbid-component-props': 'off',
    'deprecation/deprecation': 'off',
  },
};
