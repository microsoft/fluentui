// @ts-check
const configHelpers = require('../../utils/configHelpers');
const baseConfig = require('../base/index');
const tseslint = require('typescript-eslint');
const reactConfig = require('./config');
const reactCompilerPlugin = require('eslint-plugin-react-compiler');
const { __internal } = require('../../internal-flat');
const { createReactCrossVersionRules } = require('../../shared/react-cross-version-rules');

/** @type {import("eslint").Linter.RulesRecord} */
const typeAwareRules = {
  '@fluentui/ban-context-export': ['error', { exclude: ['**/react-shared-contexts/**'] }],
};

const root = configHelpers.findGitRoot();
const unstableV9Packages = configHelpers.getV9UnstablePackages(root);
const v9PackageDeps = Object.keys(configHelpers.getPackageJson({ root, name: 'react-components' }).dependencies).filter(
  pkg => !unstableV9Packages.has(pkg),
);

/** @type {import('typescript-eslint').ConfigArray} */
module.exports = tseslint.config(
  ...baseConfig,
  ...reactConfig,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    plugins: {
      'react-compiler': reactCompilerPlugin,
    },
    rules: {
      'jsdoc/check-tag-names': [
        'error',
        {
          // Allow TSDoc tags
          definedTags: ['remarks'],
          jsxTags: true,
        },
      ],
      '@fluentui/ban-instanceof-html-element': ['error'],
      '@fluentui/no-context-default-value': [
        'error',
        {
          // nx-ignore-next-line - this is a valid use case to ignore workspace packages. keeping  them part of the project dependencies would be wrong assumption
          imports: ['react', '@fluentui/react-context-selector', '@fluentui/global-context'],
        },
      ],
      'react-compiler/react-compiler': ['error'],
      ...createReactCrossVersionRules({
        crossCompatTypePackage: '@fluentui/react-utilities',
        extraTypeRestrictions: {
          'React.RefAttributes': {
            message:
              '`React.RefAttributes` is leaking string starting @types/react@18.2.61 creating invalid type contracts. Use `RefAttributes` from @fluentui/react-utilities instead',
            fixWith: 'RefAttributes',
          },
        },
      }),
      ...typeAwareRules,
    },
  },
  {
    files: ['**/*.stories.tsx'],
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
    files: ['**/*.cy.{ts,tsx,js}', '**/isConformant.{ts,tsx,js}'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
      'react/jsx-no-bind': 'off',
      'react-compiler/react-compiler': 'off',
    },
  },
  {
    files: ['**/*.test.{ts,tsx}'],
    rules: {
      'react-compiler/react-compiler': 'off',
    },
  },
  __internal.overrides.react,
);
