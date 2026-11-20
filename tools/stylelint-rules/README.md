# stylelint-rules

Custom [Stylelint](https://stylelint.io/) rules for the v9 component stylesheets (`*.module.css`) that are
CSS Modules alternatives to Griffel styles. They are enabled by the root [`stylelint.config.mjs`](../../stylelint.config.mjs).

Component CSS is unlayered. It must keep the specificity of the Griffel rules it replaces, so that application
styles (`makeStyles` overrides, custom style hooks and caller class names) keep winning and losing exactly as
they did with Griffel components.

```sh
# lint component CSS
yarn stylelint "packages/react-components/*/library/src/**/*.css"

# test the rules
yarn nx run stylelint-rules:test
```

Intentional exceptions must be described:

```css
/* stylelint-disable-next-line fluentui/selector-max-local-classes -- reason */
```

## Rules

### fluentui/selector-max-local-classes

Limits the number of local (CSS Modules) classes that contribute to a selector's specificity. The default
configuration allows `1`, matching a Griffel atomic class, which has a specificity of `(0,1,0)` plus pseudo-classes.

Not counted:

- classes inside `:where()`, which add no specificity
- public slot classes wrapped in `:global()`, such as `:global(.fui-Button__icon)`, which mirror Griffel's
  `& .fui-*` selectors
- pseudo-classes, attributes, elements and pseudo-elements

`:is()`, `:not()` and `:has()` count their most specific argument. Nested rules are resolved like native CSS
nesting, and a violation is reported on the rule that adds the extra class.

```css
/* ✗ */
.root.small {
}
.small .icon {
}
.root:not(.selected) {
}

/* ✓ */
.root:where(.small) {
}
:where(.small) .icon {
}
.root:where(:not(.selected)) {
}
.root:hover :global(.fui-Button__icon) {
}
```

When lowering specificity creates ties, order the rules like Griffel's insertion buckets: base, then `:focus`,
`:focus-visible`, `:hover`, `:active`, then `@supports`, `@media` and `@container` rules.

### fluentui/use-logical-properties

Requires logical properties and values instead of physical ones (`margin-left` → `margin-inline-start`,
`left` → `inset-inline-start`, `float: left` → `float: inline-start`). Griffel flips physical properties for RTL,
but plain CSS does not. Supports `--fix`.

Asymmetric four-value shorthands such as `padding: 0 1px 0 2px` are reported but not fixed; split them into
`padding-block` and `padding-inline`.

Rules scoped to a direction (`[dir]`, `:dir()`, `.rtl` or `.ltr` selectors) are ignored, because they already
handle RTL explicitly.

### fluentui/no-unknown-tokens

Reports `var()` references to custom properties that are not:

- theme tokens from [`packages/tokens/src/tokens.ts`](../../packages/tokens/src/tokens.ts)
- component variables with an allowed prefix (`--fui-` or `--fluent-` by default)
- custom properties declared in the same file

This catches misspelled tokens, which would otherwise silently fall back to the inherited or initial value.

Options:

- `tokensFile`: path to a file whose `var(--token)` references define the allowed tokens
- `allowedPrefixes`: allowed component variable prefixes

### fluentui/griffel-buckets

Keeps the `@griffel-buckets` directive of a stylesheet in sync with the Griffel styles it was ported from. The
directive records what can't be derived from the CSS itself about how Griffel ordered those styles, for the opt-in
integration that orders Fluent CSS Modules with an application's Griffel styles (see
[`apps/css-modules-parity`](../../apps/css-modules-parity/README.md)):

```css
/* @griffel-buckets reset: .root, .icon; logical: padding-inline-start */
.root {
}
```

- `reset`: classes replacing `makeResetStyles()` styles, which Griffel inserts before every `makeStyles()` style.
- `logical`: logical properties the Griffel styles declared as such. Griffel's physical shorthands (`padding`) don't
  remove them, so they keep beating an application's shorthand overrides.

Stylesheets without reset classes or logical properties have no directive. The directive is a plain comment and is
published with the stylesheet.

While the Griffel styles hook (`*.styles.ts`) exists next to the CSS Modules hook (`*.styles.css.ts`) importing the
stylesheet, the rule derives the expected directive from it and reports a missing, outdated or unneeded directive.
Supports `--fix`. Without a Griffel source it only validates the directive: listed classes and properties must be used
by the stylesheet, and it must come before the first rule.
