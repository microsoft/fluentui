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
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [...configHelpers.devDependenciesFiles, 'src/common/{shallowUntilTarget,testUtilities}.ts'],
      },
    ],
  },
  overrides: [
    {
      files: '**/*.Example.tsx',
      rules: {
        // Our examples depend on @uifabric/example-data which is intentionally not in dependencies
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
