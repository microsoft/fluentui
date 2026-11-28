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
