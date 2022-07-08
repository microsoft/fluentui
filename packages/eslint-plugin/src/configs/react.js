// @ts-check

const path = require('path');
const configHelpers = require('../utils/configHelpers');

/** @type {import("eslint").Linter.RulesRecord} */
const typeAwareRules = {
  '@fluentui/ban-context-export': ['error', { exclude: ['**/react-shared-contexts/**'] }],
};

const root = configHelpers.findGitRoot();
const v9PackageDeps = Object.keys(
  configHelpers.getPackageJson({ root, name: '@fluentui/react-components' }).dependencies,
);

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [path.join(__dirname, 'base'), path.join(__dirname, 'react-config')],
  rules: {},
  overrides: [
    // Enable rules requiring type info only for appropriate files/circumstances
    ...configHelpers.getTypeInfoRuleOverrides(typeAwareRules),
    {
      files: '**/*.stories.tsx',
      rules: {
        '@fluentui/no-restricted-imports': [
          'warn',
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
