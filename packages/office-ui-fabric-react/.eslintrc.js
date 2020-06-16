// @ts-check
const { configHelpers } = require('@fluentui/eslint-plugin');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['plugin:@fluentui/eslint-plugin/react--legacy'],
  root: true,
  rules: {
    'react/forbid-component-props': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [...configHelpers.devDependenciesFiles, 'src/common/{shallowUntilTarget,testUtilities}.ts'],
      },
    ],
    // "import-blacklist": [true, { "../../Styling": ["FontSizes"] }]
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
