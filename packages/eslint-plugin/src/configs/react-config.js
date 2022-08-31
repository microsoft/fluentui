const configHelpers = require('../utils/configHelpers');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  plugins: ['jsx-a11y', 'react', 'react-hooks', '@griffel'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
    // copied from https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb/rules/react.js#L575
    propWrapperFunctions: [
      'forbidExtraProps', // https://www.npmjs.com/package/airbnb-prop-types
      'exact', // https://www.npmjs.com/package/prop-types-exact
      'Object.freeze', // https://tc39.github.io/ecma262/#sec-object.freeze
    ],
  },
  rules: {
    /**
     * griffel eslint rules
     * @see https://github.com/microsoft/griffel/tree/main/packages/eslint-plugin
     */
    '@griffel/no-shorthands': 'error',
    /**
     * react eslint rules
     * @see https://github.com/yannickcr/eslint-plugin-react
     */
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
    'react/no-danger': 'warn',
    // NOTE: following rules has been turned off to override `airbnb/rules/react`, which we don't use anymore
    // TODO: needs to be checked against core react eslint plugin if we need those turn off explicitly
    // @see https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb/rules/react.js
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
    'react/no-unknown-property': 'off', // expensive, limited benefit with TS
    // these ones have minor negative perf impact and are unnecessary
    'react/default-props-match-prop-types': 'off',
    'react/no-unused-prop-types': 'off',
    'react/prefer-es6-class': 'off',
    // permanently disable because we disagree with these rules
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/jsx-filename-extension': 'off',

    /**
     * react-hooks rules
     * @see https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks
     */
    'react-hooks/exhaustive-deps': [
      'error',
      {
        additionalHooks: 'useIsomorphicLayoutEffect',
      },
    ],
    'react-hooks/rules-of-hooks': 'error',

    /**
     * jsx-a11y rules
     * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
     */
    'jsx-a11y/tabindex-no-positive': 'error',
    // NOTE: following rules has been turned off to override `airbnb/rules/react-a11y`
    // TODO: needs to be checked against core jsx-a11y eslint plugin if we need those turn off explicitly
    // @see https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb/rules/react-a11y.js
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
  },
  overrides: [
    {
      // Test overrides
      files: [...configHelpers.testFiles],
      rules: {
        'react/jsx-no-bind': 'off',
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
  ],
};
