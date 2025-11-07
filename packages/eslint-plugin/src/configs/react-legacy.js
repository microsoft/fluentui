// @ts-check
const path = require('path');

const configHelpers = require('../utils/configHelpers');
const { reactLegacy: restrictedGlobals } = require('../shared/restricted-globals');
const { createReactCrossVersionRules } = require('../shared/react-cross-version-rules');

/** @type {import("eslint").Linter.LegacyConfig} */
module.exports = {
  extends: [path.join(__dirname, 'base-legacy'), path.join(__dirname, 'react-config')],

  rules: {
    'jsdoc/check-tag-names': 'off',
    '@griffel/no-shorthands': 'off',
    'no-restricted-globals': restrictedGlobals,
    ...createReactCrossVersionRules({
      crossCompatTypePackage: '@fluentui/utilities',
    }),
  },
  overrides: [
    {
      // Test overrides
      files: [...configHelpers.testFiles, '**/*.stories.tsx'],
      rules: {
        'no-restricted-globals': 'off',
        'react/jsx-no-bind': 'off',
        '@typescript-eslint/no-deprecated': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
    {
      files: ['**/*.e2e.{ts,tsx,js}', '**/*.cy.{ts,tsx,js}', 'isConformant.{ts,tsx,js}'],
      rules: {
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
      },
    },
  ],
};
