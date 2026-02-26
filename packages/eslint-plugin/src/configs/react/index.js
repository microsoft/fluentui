// @ts-check
const configHelpers = require('../../utils/configHelpers');
const baseConfig = require('../base/index');
const reactConfig = require('./config');
const reactCompilerPlugin = require('eslint-plugin-react-compiler');
const { __internal } = require('../../internal');
const { createReactCrossVersionRules } = require('../../shared/react-cross-version-rules');
const { defineConfig } = require('eslint/config');
const { testFiles } = require('../../utils/configHelpers');

/** @type {import("eslint").Linter.RulesRecord} */
const typeAwareRules = {
  '@fluentui/ban-context-export': ['error', { exclude: ['**/react-shared-contexts/**'] }],
};

const root = configHelpers.findGitRoot();
const unstableV9Packages = configHelpers.getV9UnstablePackages(root);
const v9PackageDeps = Object.keys(configHelpers.getPackageJson({ root, name: 'react-components' }).dependencies).filter(
  pkg => !unstableV9Packages.has(pkg),
);

/** @type { import("eslint").Linter.Config } */
module.exports = defineConfig(
  baseConfig,
  reactConfig,
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
      '@fluentui/react-components/enforce-use-client': ['error'],
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
      '@fluentui/react-components/enforce-use-client': 'off',
    },
  },
  {
    files: ['**/*.cy.{ts,tsx,js}', 'isConformant.{ts,tsx,js}'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
      'react/jsx-no-bind': 'off',
      'react-compiler/react-compiler': 'off',
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@cypress/react'],
              importNames: ['mount'],
              message: "Use 'mount' from @fluentui/scripts-cypress instead.",
            },
          ],
        },
      ],
      '@fluentui/react-components/enforce-use-client': 'off',
    },
  },

  {
    files: [...testFiles],
    rules: {
      'react-compiler/react-compiler': 'off',
      '@fluentui/react-components/enforce-use-client': 'off',
    },
  },
  __internal.overrides.react,
);
