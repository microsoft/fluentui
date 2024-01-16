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
    'jsdoc/check-tag-names': [
      'error',
      {
        jsxTags: true,
      },
    ],
    '@fluentui/ban-instanceof-html-element': ['error'],
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
    {
      files: ['**/*.cy.{ts,tsx,js}', 'isConformant.{ts,tsx,js}'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'react/jsx-no-bind': 'off',
      },
    },
    {
      files: ['**/src/**/*.{ts,tsx}'],
      rules: {
        '@fluentui/consistent-callback-type': 'error',
      },
    },
  ],
};
