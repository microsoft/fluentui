// @ts-check

/**
 * Stylelint configuration for v9 component stylesheets (CSS Modules alternatives to Griffel styles).
 *
 * Component CSS is unlayered and must keep the specificity of the Griffel rules it replaces, so app styles
 * (makeStyles overrides, custom style hooks, caller class names) win and lose exactly as they did before.
 * Intentional exceptions use `stylelint-disable-next-line <rule> -- <reason>`.
 *
 * @type {import('stylelint').Config}
 */
export default {
  plugins: ['./tools/stylelint-rules/index.js'],
  reportDescriptionlessDisables: true,
  reportInvalidScopeDisables: true,
  reportNeedlessDisables: true,
  rules: {
    // Fluent UI conventions
    'fluentui/griffel-buckets': true,
    'fluentui/selector-max-local-classes': 1,
    'fluentui/use-logical-properties': true,
    'fluentui/no-unknown-tokens': true,
    'at-rule-disallowed-list': [
      ['layer'],
      {
        message:
          'Component rules must not be layered: unlayered app styles would beat every component state regardless of specificity.',
      },
    ],
    'selector-max-id': 0,
    'declaration-no-important': true,
    'color-no-hex': true,
    'color-named': 'never',
    'block-no-empty': true,

    // Correctness
    'at-rule-no-unknown': true,
    'color-no-invalid-hex': true,
    'comment-no-empty': true,
    'custom-property-no-missing-var-function': true,
    'declaration-block-no-duplicate-custom-properties': true,
    'declaration-block-no-duplicate-properties': [true, { ignore: ['consecutive-duplicates-with-different-syntaxes'] }],
    'declaration-block-no-shorthand-property-overrides': true,
    'function-calc-no-unspaced-operator': true,
    'keyframe-declaration-no-important': true,
    'media-feature-name-no-unknown': true,
    'no-duplicate-at-import-rules': true,
    'no-invalid-double-slash-comments': true,
    'property-no-unknown': true,
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global', 'local'] }],
    'selector-pseudo-element-no-unknown': true,
    'selector-type-no-unknown': [true, { ignore: ['custom-elements'] }],
    'string-no-newline': true,
    'unit-no-unknown': true,
  },
};
