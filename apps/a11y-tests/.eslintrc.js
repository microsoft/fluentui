// @ts-check

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['../../scripts/eslint/v7'],
  root: true,
  rules: {
    'react/jsx-no-bind': 'off',
  },
  ignorePatterns: ['src/axe-sarif-converter/**'],
};
