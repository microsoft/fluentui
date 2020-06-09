// @ts-check
const { devDependenciesFiles, exampleFiles } = require('@uifabric/build/eslint/constants');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['../../scripts/eslint/v7'],
  root: true,
  rules: {
    'react/forbid-component-props': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [...devDependenciesFiles, 'src/common/{shallowUntilTarget,testUtilities}.ts'],
      },
    ],
    // "import-blacklist": [true, { "../../Styling": ["FontSizes"] }]
  },
  overrides: [
    {
      files: [...exampleFiles],
      rules: {
        // Our examples depend on @uifabric/example-data which is intentionally not in dependencies
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
