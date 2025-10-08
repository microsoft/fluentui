// @ts-check
const baseLegacyConfig = require('../base/legacy');
const reactConfig = require('../react/config');
const configHelpers = require('../../utils/configHelpers');
const tseslint = require('typescript-eslint');
const { reactLegacy: restrictedGlobals } = require('../../shared/restricted-globals');
const { createReactCrossVersionRules } = require('../../shared/react-cross-version-rules');

/** @type {import('typescript-eslint').ConfigArray} */
module.exports = tseslint.config(
  {
    extends: [baseLegacyConfig, reactConfig],
    rules: {
      'jsdoc/check-tag-names': 'off',
      '@griffel/no-shorthands': 'off',
      'no-restricted-globals': restrictedGlobals,
      ...createReactCrossVersionRules({
        crossCompatTypePackage: '@fluentui/utilities',
      }),
    },
  },
  {
    // Test overrides
    files: [...configHelpers.testFiles, '**/*.stories.tsx'],
    rules: {
      'no-restricted-globals': 'off',
      'react/jsx-no-bind': 'off',
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
);
