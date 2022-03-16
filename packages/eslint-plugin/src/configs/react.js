// @ts-check
const configHelpers = require('../utils/configHelpers');

/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  extends: [
    // Provides both rules and some parser options and other settings
    'airbnb',
    // add typescript support for import plugin - https://github.com/import-js/eslint-plugin-import/blob/main/config/typescript.js
    'plugin:import/typescript',
    // Extended configs are applied in order, so these configs that turn other rules off should come last
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    'import',
    '@fluentui',
    '@rnx-kit',
    '@typescript-eslint',
    'deprecation',
    'jest',
    'jsdoc',
    'jsx-a11y',
    'react',
    'react-hooks',
  ],
  settings: {
    'import/resolver': {
      // @see https://github.com/alexgorbatchev/eslint-import-resolver-typescript#configuration
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
    jsdoc: {
      ignoreInternal: true,
      tagNamePreference: {
        // Allow any of @default, @defaultvalue, @defaultValue until we settle on a preferred one
        default: 'default',
        defaultvalue: 'defaultvalue',
        defaultValue: 'defaultValue',
        // Allow either @return or @returns until we settle on a preferred one
        return: 'return',
        returns: 'returns',
      },
    },
  },
  env: {
    browser: true,
    'jest/globals': true,
  },
  // We have to disable this when running lint-staged, or it will incorrectly flag eslint-disable
  // directives for rules which are disabled only in that context.
  reportUnusedDisableDirectives: !configHelpers.isLintStaged,
  // matched relative to cwd
  ignorePatterns: [
    'coverage',
    'dist',
    'dist-storybook',
    'etc',
    'lib',
    'lib-amd',
    'lib-commonjs',
    'node_modules',
    'temp',
    '**/__snapshots__',
    '**/*.scss.ts',
  ],
  rules: {
    '@rnx-kit/no-export-all': ['error', { expand: 'external-only' }],
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

    // tslint: function-name, variable-name
    ...configHelpers.getNamingConventionRule(false /* prefixWithI */),

    '@typescript-eslint/no-empty-function': 'error',
    '@typescript-eslint/no-explicit-any': 'error', // tslint: no-any
    '@typescript-eslint/prefer-namespace-keyword': 'error',

    curly: ['error', 'all'],
    'dot-notation': 'error',
    eqeqeq: ['error', 'always'],
    'guard-for-in': 'error',
    'jsx-a11y/tabindex-no-positive': 'error',
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
    '@fluentui/ban-imports': [
      'error',
      {
        path: 'react',
        names: ['useLayoutEffect'],
        message: '`useLayoutEffect` causes a warning in SSR. Use `useIsomorphicLayoutEffect`',
      },
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
    'prefer-arrow-callback': 'error', // tslint: no-function-expression
    radix: ['error', 'always'],
    'react/jsx-key': 'error',
    'react/jsx-no-bind': [
      'error',
      {
        allowArrowFunctions: false, // tslint: jsx-no-lambda
        allowFunctions: false,
        allowBind: false,
        ignoreDOMComponents: true,
        ignoreRefs: true,
      },
    ],
    'react/no-string-refs': 'error',
    'react/self-closing-comp': 'error',
    'react-hooks/exhaustive-deps': [
      'error',
      {
        additionalHooks: 'useIsomorphicLayoutEffect',
      },
    ],
    'react-hooks/rules-of-hooks': 'error',

    // airbnb or other config overrides (some temporary)
    // TODO: determine which rules we want to enable, and make needed changes (separate PR)
    'arrow-body-style': 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'default-case': 'off',
    'func-names': 'off',
    'global-require': 'off',

    'jsx-a11y/alt-text': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/aria-activedescendant-has-tabindex': 'off',
    'jsx-a11y/aria-role': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'jsx-a11y/role-has-required-aria-props': 'off',
    'jsx-a11y/interactive-supports-focus': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'jsx-a11y/mouse-events-have-key-events': 'off',
    'jsx-a11y/no-interactive-element-to-noninteractive-role': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/no-noninteractive-tabindex': 'off',
    'jsx-a11y/no-redundant-roles': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/role-supports-aria-props': 'off',
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
    'object-shorthand': 'off',
    'operator-assignment': 'off',
    'prefer-destructuring': 'off',
    'prefer-template': 'off',
    'react/button-has-type': 'off',
    'react/destructuring-assignment': 'off',
    'react/forbid-prop-types': 'off',
    'react/jsx-boolean-value': 'off',
    'react/jsx-curly-brace-presence': 'off',
    'react/jsx-no-target-blank': 'off',
    'react/jsx-pascal-case': 'off', // Doesn't handle lowercase slot names
    'react/no-access-state-in-setstate': 'off',
    'react/no-array-index-key': 'off',
    'react/no-did-update-set-state': 'off',
    'react/no-find-dom-node': 'off',
    'react/no-render-return-value': 'off',
    'react/no-unescaped-entities': 'off',
    'react/no-will-update-set-state': 'off',
    'react/prefer-stateless-function': 'off',
    'react/sort-comp': 'off',
    'react/state-in-constructor': 'off',
    'react/static-property-placement': 'off',
    'react/require-default-props': 'off',
    'spaced-comment': 'off',

    // airbnb options ban for-of which is unnecessary for TS and modern node (https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/style.js#L334)
    // but this is a very powerful rule we may want to use in other ways
    'no-restricted-syntax': 'off',

    // permanently disable because we disagree with these rules
    'no-await-in-loop': 'off', // contrary to rule docs, awaited things often are NOT parallelizable
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',

    // permanently disable due to performance issues (using custom rule `@fluentui/max-len` instead)
    'max-len': 'off',

    // permanently disable due to perf problems and limited benefit
    // see here for perf testing (note that you must run eslint directly)
    // https://eslint.org/docs/developer-guide/working-with-rules#per-rule-performance
    'no-empty-character-class': 'off',
    'react/no-unknown-property': 'off', // expensive, limited benefit with TS
    // these ones have minor negative perf impact and are unnecessary
    'react/default-props-match-prop-types': 'off',
    'react/no-unused-prop-types': 'off',
    'react/prefer-es6-class': 'off',

    'jsdoc/check-tag-names': [
      'error',
      {
        // Allow TSDoc tags @remarks and @defaultValue
        definedTags: ['remarks', 'defaultValue'],
      },
    ],

    /**
     *
     * import plugin rules
     * @see https://github.com/import-js/eslint-plugin-import
     */
    'import/no-extraneous-dependencies': ['error', { devDependencies: false }],
    'import/extensions': 'off',
    'import/first': 'off',
    'import/newline-after-import': 'off',
    'import/no-duplicates': 'off', // mostly redundant with no-duplicate-imports
    'import/no-dynamic-require': 'off',
    'import/no-mutable-exports': 'off',
    'import/no-unresolved': 'off',
    'import/no-useless-path-segments': 'off',
    'import/order': 'off',
    'import/prefer-default-export': 'off',
    // may cause perf problems per https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/FAQ.md#eslint-plugin-import
    'import/no-cycle': 'off',
    'import/no-deprecated': 'off',
    'import/no-named-as-default': 'off',
    'import/no-unused-modules': 'off',
    // these ones aren't needed for TS and may cause perf problems
    'import/default': 'off',
    'import/namespace': 'off',
    'import/no-named-as-default-member': 'off',
    'import/export': 'off',
  },
};

/** @type {import("eslint").Linter.RulesRecord} */
const typeAwareRules = {
  /**
   * plugin: https://github.com/gund/eslint-plugin-deprecation
   */
  'deprecation/deprecation': 'error',
};

/**
 * Override definitions for `config`. See explanation at bottom of file for why/how this function is used.
 * @returns {import("eslint").Linter.ConfigOverride[]}
 */
const getOverrides = () => [
  // Enable rules requiring type info only for appropriate files/circumstances
  ...configHelpers.getTypeInfoRuleOverrides(typeAwareRules),
  {
    files: '**/src/index.{ts,tsx,js}',
    rules: {
      // TODO: propagate to `error` once all packages barrel files have been fixed
      '@rnx-kit/no-export-all': ['warn', { expand: 'all' }],
    },
  },
  {
    files: '**/*.{ts,tsx}',
    // This turns off a few rules that don't work or are unnecessary for TS, and enables a few
    // that make sense for TS: no-var, prefer-const, prefer-rest-params, prefer-spread
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/src/configs/eslint-recommended.ts
    extends: ['plugin:@typescript-eslint/eslint-recommended'],
    // and manually enable rules that only work on TS
    rules: {
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: { constructors: 'off' },
        },
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

      // permanently disable due to using other rules which do the same thing
      camelcase: 'off', // redundant with @typescript-eslint/naming-convention

      // permanently disable due to improper TS handling or unnecessary for TS
      // (and not covered by plugin:@typescript-eslint/eslint-recommended)
      'no-empty-function': 'off',
      'no-shadow': 'off',
      'no-unused-vars': 'off',
      'react/jsx-filename-extension': 'off',
    },
  },
  {
    // Test overrides
    files: [...configHelpers.testFiles],
    rules: {
      'no-console': 'off',
      'react/jsx-no-bind': 'off',
    },
  },
  {
    files: 'src/**/*.deprecated.test.{ts,tsx}',
    rules: {
      'deprecation/deprecation': 'off', // the purpose of these tests
    },
  },
  {
    // Example overrides
    files: '**/*.{Example,stories}.tsx',
    rules: {
      'no-alert': 'off',
      'no-console': 'off',
    },
  },
  {
    files: '**/*.stories.tsx',
    rules: {
      // allow arrow functions in stories for now (may want to change this later since using
      // constantly-mutating functions can be an anti-pattern which we may not want to demonstrate
      // in our converged components docs; it happened to be allowed starting out because .stories
      // files were being linted as tests)
      'react/jsx-no-bind': 'off',
    },
  },
  {
    // Docs overrides (excluding examples)
    files: [...configHelpers.docsFiles],
    rules: {
      'import/no-webpack-loader-syntax': 'off', // this is ok in docs
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
      // TODO: https://github.com/microsoft/fluentui/issues/21999
      'import/no-extraneous-dependencies': 'off',
    },
  },
];

// Why use `defineProperty` for `overrides`?
//
// By default, any logic in this file will be run every time the plugin is loaded (even if this
// config is not used) due to it being included by necessity in the package index file.
// These overrides include some more complex logic which should only run when requested, since it's
// more costly and can cause build errors if run in a package it wasn't designed for.
// If ESLint supported exporting a function from a config file, that would be an easy solution.
// Since that's not supported, we work around it by defining overrides as a property with getter.
// @ts-ignore -- `overrides?` is declared in `eslint.Linter.Config` but our `config` object doesn't define it until now
Object.defineProperty(config, 'overrides', {
  enumerable: true,
  get: getOverrides,
});

module.exports = config;
