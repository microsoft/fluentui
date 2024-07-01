// @ts-check

const path = require('path');
const configHelpers = require('../utils/configHelpers');
const { __internal } = require('../internal');

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
  plugins: ['react-compiler'],
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
    'react-compiler/react-compiler': ['error'],
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
        'react-compiler/react-compiler': 'off',
      },
    },
    {
      files: ['**/*.cy.{ts,tsx,js}', 'isConformant.{ts,tsx,js}'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'react/jsx-no-bind': 'off',
        'react-compiler/react-compiler': 'off',
      },
    },
    {
      files: '**/*.test.{ts,tsx}',
      rules: {
        'react-compiler/react-compiler': 'off',
      },
    },
    __internal.overrides.react,
  ].filter(Boolean),
};
