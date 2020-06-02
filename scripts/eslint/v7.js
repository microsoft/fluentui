// @ts-check
const path = require('path');
const { getNamingConventionConfig } = require('./namingConvention');
const constants = require('./constants');

module.exports = {
  extends: [
    // Provides both rules and some parser options and other settings
    'airbnb',
    // Extended configs are applied in order, so these configs that turn other rules off should come last
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
    'plugin:@typescript-eslint/eslint-recommended', // disable some rules not needed for TS
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: path.join(process.cwd(), 'tsconfig.json'),
  },
  plugins: ['@typescript-eslint', 'deprecation', 'import', 'jest', 'jsx-a11y', 'react', 'react-hooks'],
  settings: {
    // Some config suggestions copied from https://github.com/alexgorbatchev/eslint-import-resolver-typescript#configuration
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory
        directory: process.cwd(),
      },
    },
  },
  env: {
    browser: true,
    'jest/globals': true,
  },
  globals: {
    // Promise: 'off'
  },
  reportUnusedDisableDirectives: true,
  // matched relative to cwd
  ignorePatterns: ['coverage', 'dist', 'etc', 'lib', 'lib-amd', 'lib-commonjs', 'node_modules', 'temp', '**/*.scss.ts'],
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
    '@typescript-eslint/naming-convention': getNamingConventionConfig(true /* prefixWithI */),
    '@typescript-eslint/no-empty-function': 'error',
    '@typescript-eslint/no-explicit-any': 'error', // no-any
    '@typescript-eslint/prefer-namespace-keyword': 'error',
    curly: ['error', 'all'],
    'deprecation/deprecation': 'error',
    'dot-notation': 'error',
    eqeqeq: ['error', 'always'],
    'guard-for-in': 'error',
    'import/no-extraneous-dependencies': ['error', { devDependencies: constants.devDependenciesFiles }],
    'jsx-a11y/tabindex-no-positive': 'error',
    'max-len': [
      'error',
      {
        ignorePattern: [
          'require(<.*?>)?\\(',
          'https?:\\/\\/',
          '^(import|export) \\{ \\w+( as \\w+)? \\} from',
          '^import \\* as',
          '^\\s+(<path )?d=',
          '!raw-loader!',
          '\\bdata:image/',
        ].join('|'),
        code: 120,
      },
    ],
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
    'no-restricted-properties': [
      'error',
      { object: 'describe', property: 'only', message: 'describe.only should only be used during test development' },
      { object: 'it', property: 'only', message: 'it.only should only be used during test development' },
    ],
    'no-shadow': ['error', { hoist: 'all' }],
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-arrow-callback': 'error', // no-function-expression
    radix: ['error', 'always'],
    // Use className and provide css rules instead of using inline styles.
    // TODO: this doesn't forbid style on built-in elements--do we care?
    'react/forbid-component-props': ['error', { forbid: ['style'] }], // jsx-ban-props
    'react/jsx-key': 'error',
    'react/jsx-no-bind': [
      'error',
      {
        allowArrowFunctions: false, // jsx-no-lambda
        allowFunctions: false,
        allowBind: false,
      },
    ],
    'react/no-string-refs': 'error',
    'react/self-closing-comp': 'error',

    // TODO: find equivalents to these tslint rules
    // used in certain packages:
    // "import-blacklist": [true, { "../../Styling": ["FontSizes"] }]

    // airbnb or other config overrides (some temporary)
    // TODO: determine which rules we want to enable, and make needed changes (separate PR)
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'default-case': 'off',
    'func-names': 'off',
    'global-require': 'off',
    'import/export': 'off',
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
    'prefer-spread': 'off',
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
    'spaced-comment': 'off',

    // Enable ASAP (not done in this PR to make resulting changes reviewable)
    'react-hooks/exhaustive-deps': 'off',
    'react-hooks/rules-of-hooks': 'off',

    // airbnb options don't handle TS properly https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/style.js#L334
    // but this is a very powerful rule we may want to use in other ways
    'no-restricted-syntax': 'off',

    // permanently disable due to using other rules which do the same thing
    camelcase: 'off', // redundant with @typescript-eslint/naming-convention

    // permanently disable because we disagree with these rules
    'no-restricted-globals': 'off', // airbnb bans isNaN in favor of Number.isNaN which is unavailable in IE 11
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',

    // permanently disable due to improper TS handling or unnecessary for TS
    // (and not covered by plugin:@typescript-eslint/eslint-recommended)
    'no-unused-vars': 'off',
    'react/jsx-filename-extension': 'off',

    // permanently disable due to perf problems and limited benefit
    // see here for perf testing (note that you must run eslint directly)
    // https://eslint.org/docs/developer-guide/working-with-rules#per-rule-performance
    'no-empty-character-class': 'off',
    'react/no-unknown-property': 'off', // expensive, limited benefit with TS
    // these ones have minor negative perf impact and are unnecessary
    'react/default-props-match-prop-types': 'off',
    'react/no-unused-prop-types': 'off',
    'react/prefer-es6-class': 'off',

    // may cause perf problems per https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/FAQ.md#eslint-plugin-import
    'import/no-cycle': 'off',
    'import/no-deprecated': 'off',
    'import/no-named-as-default': 'off',
    'import/no-unused-modules': 'off',
    // these ones aren't needed for TS and may cause perf problems
    'import/default': 'off',
    'import/named': 'off',
    'import/namespace': 'off',
    'import/no-named-as-default-member': 'off',
  },
  overrides: [
    {
      // Test overrides
      files: constants.testFiles,
      rules: {
        'no-console': 'off',
        'react/jsx-no-bind': [
          'error',
          {
            allowArrowFunctions: true, // inline lambdas ok in tests
            allowFunctions: false,
            allowBind: false,
          },
        ],
      },
    },
    {
      files: '**/*.deprecated.test.ts*',
      rules: {
        'deprecation/deprecation': 'off', // the purpose of these tests
      },
    },
    {
      // Example overrides
      files: '**/*.Example.tsx',
      rules: {
        'no-alert': 'off',
        'no-console': 'off',
        'import/no-extraneous-dependencies': 'off', // false positive for self-imports
        // 'import/no-relative-parent-imports': 'error',
      },
    },
    {
      // Docs overrides (excluding examples)
      files: constants.docsFiles,
      rules: {
        'import/no-webpack-loader-syntax': 'off', // this is ok in docs
        // 'import/no-extraneous-dependencies': 'off', // false positive for self-imports
        // docs are generally only for dev purposes
        // 'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
