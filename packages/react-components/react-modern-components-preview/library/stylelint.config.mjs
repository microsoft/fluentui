import { tokens } from '@fluentui/tokens';

const customProperties = Object.fromEntries(
  Object.values(tokens).map(value => [value.slice('var('.length, -1), 'initial']),
);

export default {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-use-logical', 'stylelint-value-no-unknown-custom-properties'],
  rules: {
    'custom-property-empty-line-before': null,
    'custom-property-pattern': null,
    'function-disallowed-list': ['rgb', 'rgba', 'hsl', 'hsla', 'hwb', 'lab', 'lch', 'oklab', 'oklch', 'color'],
    'color-named': 'never',
    'color-no-hex': true,
    'csstools/use-logical': 'always',
    'csstools/value-no-unknown-custom-properties': [true, { importFrom: [{ customProperties }] }],
    'no-descending-specificity': [true, { ignore: ['selectors-within-list'] }],
    'selector-class-pattern': null,
    'selector-max-combinators': 1,
    'selector-max-compound-selectors': 2,
    'selector-max-id': 0,
    'selector-max-specificity': '0,6,0',
    'selector-max-type': 0,
    'selector-max-universal': 0,
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global'] }],
  },
};
