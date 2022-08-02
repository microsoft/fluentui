// @ts-check

const path = require('path');
const configHelpers = require('../utils/configHelpers');

/** @type {import("eslint").Linter.RulesRecord} */
const typeAwareRules = {
  '@fluentui/ban-context-export': ['error', { exclude: ['**/react-shared-contexts/**'] }],
};

const root = configHelpers.findGitRoot();
const unstableV9Packages = configHelpers.getV9UnstablePackages(root);
const v9PackageDeps = Object.keys(
  configHelpers.getPackageJson({ root, name: '@fluentui/react-components' }).dependencies,
).filter(pkg => !unstableV9Packages.has(pkg));

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [path.join(__dirname, 'base'), path.join(__dirname, 'react-config')],
  rules: {
    '@fluentui/no-context-default-value': [
      'error',
      {
        imports: ['react', '@fluentui/react-context-selector', '@fluentui/global-context'],
      },
    ],
  },
  overrides: [
    // Enable rules requiring type info only for appropriate files/circumstances
    ...configHelpers.getTypeInfoRuleOverrides(typeAwareRules),
    {
      files: '**/*.stories.tsx',
      rules: {
        '@fluentui/no-restricted-imports': [
          'error',
          {
            paths: [
              {
                forbidden: v9PackageDeps,
                preferred: '@fluentui/react-components',
              },
            ],
          },
        ],
      },
    },
  ],
};
