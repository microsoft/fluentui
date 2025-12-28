// @ts-check
const tseslint = require('typescript-eslint');
const globals = require('globals');
const configHelpers = require('../utils/configHelpers');
const importPlugin = require('eslint-plugin-import');
const rnxPlugin = require('@rnx-kit/eslint-plugin');
const jestPlugin = require('eslint-plugin-jest');
const jsDocPlugin = require('eslint-plugin-jsdoc');
const prettierConfig = require('eslint-config-prettier/flat');
const { __internal } = require('../internal-flat');
const { globalIgnores } = require('eslint/config');
const airbnbConfig = require('eslint-config-airbnb-extended/legacy');
const rules = require('../rules');
const { defineConfig } = require('eslint/config');

const IGNORES = [
  '**/coverage',
  '**/dist',
  '**/dist-storybook',
  '**/etc',
  '**/lib',
  '**/lib-amd',
  '**/lib-commonjs',
  '**/temp',
  '**/bundle-size',
  '**/__snapshots__',
  '**/*.scss.ts',
];

/** @type {import('eslint').Linter.RulesRecord} */
const coreRules = {
  curly: ['error', 'all'],
  'dot-notation': 'error',
  eqeqeq: ['error', 'always'],
  'guard-for-in': 'error',
  'no-alert': 'error',
  'no-bitwise': 'error',
  'no-caller': 'error',
  'no-console': 'error',
  'no-constant-condition': 'error',
  'no-debugger': 'error',
  'no-duplicate-case': 'error',
  'no-empty': 'error',
  'no-eval': 'error',
  'no-new-wrappers': 'error',
  'no-restricted-globals': [
    'error',
    ...['blur', 'close', 'focus', 'length', 'name', 'parent', 'self', 'stop'].map(name => ({
      name,
      message: `"${name}" refers to a DOM global. Did you mean to reference a local value instead?`,
    })),
  ],
  'no-restricted-properties': [
    'error',
    { object: 'describe', property: 'only', message: 'describe.only should only be used during test development' },
    { object: 'it', property: 'only', message: 'it.only should only be used during test development' },
    {
      object: 'React',
      property: 'useLayoutEffect',
      message: '`useLayoutEffect` causes a warning in SSR. Use `useIsomorphicLayoutEffect`',
    },
  ],
  'no-shadow': ['error', { hoist: 'all' }],
  'no-var': 'error',
  'prefer-const': 'error',
  'prefer-arrow-callback': 'error',
  radix: ['error', 'always'],
};

/** @type {import('eslint').Linter.RulesRecord} */
const disabledRules = {
  'lines-between-class-members': 'off',
  'max-classes-per-file': 'off',
  'no-case-declarations': 'off',
  'no-cond-assign': 'off',
  'no-continue': 'off',
  'no-control-regex': 'off',
  'no-else-return': 'off',
  'no-lonely-if': 'off',
  'no-loop-func': 'off',
  'no-multi-assign': 'off',
  'no-nested-ternary': 'off',
  'no-param-reassign': 'off',
  'no-plusplus': 'off',
  'no-prototype-builtins': 'off',
  'no-return-assign': 'off',
  'no-template-curly-in-string': 'off',
  'no-undef-init': 'off',
  'no-underscore-dangle': 'off',
  'no-unneeded-ternary': 'off',
  'no-unused-expressions': 'off',
  'no-use-before-define': 'off',
  'no-useless-computed-key': 'off',
  'no-useless-concat': 'off',
  'no-useless-constructor': 'off',
  'no-useless-escape': 'off',
  'no-useless-rename': 'off',
  'no-useless-return': 'off',
  'object-shorthand': 'warn',
  'operator-assignment': 'off',
  'prefer-destructuring': 'off',
  'prefer-template': 'off',
  'arrow-body-style': 'off',
  'class-methods-use-this': 'off',
  'consistent-return': 'off',
  'default-case': 'off',
  'func-names': 'off',
  'global-require': 'off',
  'spaced-comment': 'off',
  'no-restricted-syntax': 'off',
  'no-await-in-loop': 'off',
  'max-len': 'off',
  'no-empty-character-class': 'off',
  'default-param-last': 'off',
};

/** @type {import('eslint').Linter.RulesRecord} */
const fluentRules = {
  '@fluentui/ban-imports': [
    'error',
    {
      path: 'react',
      names: ['useLayoutEffect'],
      message: '`useLayoutEffect` causes a warning in SSR. Use `useIsomorphicLayoutEffect`',
    },
  ],
  '@fluentui/no-global-react': 'error',
  '@fluentui/max-len': [
    'error',
    {
      ignorePatterns: [
        'require(<.*?>)?\\(',
        'https?:\\/\\/',
        '^(import|export) ',
        '^\\s+(<path )?d=',
        '!raw-loader',
        '\\bdata:image/',
      ],
      max: 120,
    },
  ],
  '@fluentui/no-tslint-comments': 'error',
};

/** @type {import('eslint').Linter.RulesRecord} */
const jsDocRules = {
  'jsdoc/check-tag-names': [
    'error',
    {
      definedTags: ['remarks', 'defaultValue'],
    },
  ],
};

/** @type {import('eslint').Linter.RulesRecord} */
const typescriptRules = {
  '@typescript-eslint/no-empty-function': 'error',
  '@typescript-eslint/no-explicit-any': 'error',
  '@typescript-eslint/prefer-namespace-keyword': 'error',
};

/** @type {import('eslint').Linter.RulesRecord} */
const rnxRules = {
  '@rnx-kit/no-export-all': ['error', { expand: 'external-only' }],
};

/** @type {import('eslint').Linter.RulesRecord} */
const importRules = {
  'import/no-extraneous-dependencies': ['error', { devDependencies: false }],
  'import/no-duplicates': 'off',
  'import/first': 'off',
  'import/order': 'off',
  'import/extensions': 'off',
  'import/newline-after-import': 'off',
  'import/no-dynamic-require': 'off',
  'import/no-mutable-exports': 'off',
  'import/no-unresolved': 'off',
  'import/no-useless-path-segments': 'off',
  'import/prefer-default-export': 'off',
  'import/no-cycle': 'off',
  'import/no-deprecated': 'off',
  'import/no-named-as-default': 'off',
  'import/no-unused-modules': 'off',
  'import/default': 'off',
  'import/namespace': 'off',
  'import/no-named-as-default-member': 'off',
  'import/export': 'off',
};

/** @type {import("eslint").Linter.RulesRecord} */
const typeAwareRules = {
  /**
   * plugin: https://github.com/gund/eslint-plugin-deprecation
   */
  '@typescript-eslint/no-deprecated': 'error',
};

/** @type { import("eslint").Linter.Config } */
module.exports = defineConfig(
  globalIgnores(IGNORES),
  ...airbnbConfig.configs.base.legacy,
  importPlugin.flatConfigs.typescript,
  prettierConfig,
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      '@fluentui': {
        rules,
      },
      '@rnx-kit': rnxPlugin,
      import: importPlugin,
      jsdoc: /** @type {import('eslint').ESLint.Plugin} */ (jsDocPlugin),
      ...__internal.plugins,
    },
    settings: {
      jsdoc: {
        ignoreInternal: true,
        tagNamePreference: {
          default: 'default',
          defaultvalue: 'defaultvalue',
          defaultValue: 'defaultValue',
          return: 'return',
          returns: 'returns',
        },
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: !configHelpers.isLintStaged,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
      },
    },
    rules: {
      ...coreRules,
      ...disabledRules,
      ...typescriptRules,
      ...rnxRules,
      ...fluentRules,
      ...jsDocRules,
      ...importRules,
    },
  },
  {
    ...tseslint.configs.eslintRecommended,
    languageOptions: {
      parser: tseslint.parser,
    },
    rules: {
      /**
       * `@typescript-eslint`plugin eslint rules
       * @see https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin
       */
      ...tseslint.configs.eslintRecommended.rules,
      ...configHelpers.getNamingConventionRule(),
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        { accessibility: 'explicit', overrides: { constructors: 'off' } },
      ],
      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: [
            'public-static-field',
            'protected-static-field',
            'private-static-field',
            'public-instance-field',
            'protected-instance-field',
            'private-instance-field',
            'public-static-method',
            'protected-static-method',
            'private-static-method',
            'public-constructor',
            'public-instance-method',
            'protected-constructor',
            'protected-instance-method',
            'private-constructor',
            'private-instance-method',
          ],
        },
      ],
      '@typescript-eslint/no-shadow': 'error',
      camelcase: 'off',
      'no-empty-function': 'off',
      'no-shadow': 'off',
      'no-unused-vars': 'off',
    },
    settings: {
      'import/resolver': {
        // @see https://github.com/alexgorbatchev/eslint-import-resolver-typescript#configuration
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      ...typeAwareRules,
    },
  },
  {
    files: [...configHelpers.testFiles],
    plugins: {
      jest: jestPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: ['src/**/*.deprecated.test.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-deprecated': 'off',
    },
  },
  {
    files: ['**/*.{Example,stories}.tsx'],
    rules: {
      'no-alert': 'off',
      'no-console': 'off',
    },
  },
  {
    files: [...configHelpers.docsFiles],
    rules: {
      'import/no-webpack-loader-syntax': 'off',
    },
  },
  {
    files: [...configHelpers.configFiles],
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: [...configHelpers.devDependenciesFiles],
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  },
);
