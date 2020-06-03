// @ts-check

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['../../scripts/eslint/v7'],
  root: true,
  overrides: [
    {
      files: '**/stories/**',
      rules: {
        'no-alert': 'off',
      },
    },
  ],
};
