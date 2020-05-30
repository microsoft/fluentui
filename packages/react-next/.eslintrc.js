const constants = require('@uifabric/build/eslint/constants');

module.exports = {
  extends: ['../../scripts/eslint/v7'],
  root: true,
  rules: {
    'react/forbid-component-props': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [...constants.devDependenciesFiles, 'src/common/{shallowUntilTarget,testUtilities}.ts'],
      },
    ],
    // "import-blacklist": [true, { "../../Styling": ["FontSizes"] }]
  },
  overrides: [
    {
      files: '**/*.Example.tsx',
      rules: {
        // This override is also in the main v7 config, but for some reason to prevent false errors
        // from showing in the editor, it had to be added here too.
        'import/no-extraneous-dependencies': 'off', // false positive for self-imports
      },
    },
  ],
};
