// @ts-check
const configHelpers = require('@fluentui/eslint-plugin/src/utils/configHelpers');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['plugin:@fluentui/eslint-plugin/react--legacy'],
  plugins: ['@fluentui'],
  root: true,
  rules: {
    '@fluentui/ban-imports': ['error', { pathRegex: '^(\\.\\./)+Styling$', names: ['FontSizes'] }],
    '@typescript-eslint/no-explicit-any': 'off',
  },
  overrides: [
    {
      files: [...configHelpers.devDependenciesFiles, 'src/common/{shallowUntilTarget,testUtilities}.ts'],
      rules: {
        'import/no-extraneous-dependencies': ['error', { packageDir: ['.', configHelpers.findGitRoot()] }],
      },
    },
  ],
};
