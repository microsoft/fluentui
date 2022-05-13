# Spinner Migration

## Migration from v0

- `Loader`
  - `inline` => Not supported.
  - `labelPosition` => 'start' and 'end' changed to 'before' and 'after'
  - `size` => There are the same number of sizes
  - `delay` => Not supported.

## Migration from v8

- `Spinner`
  - `ariaLabel` => use `aria-label` instead.
  - `ariaLive` => use `aria-live` instead.
  - `componentRef` => use `ref` instead.
  - `theme` => Not supported. Use a `ThemeProvider` control instead.
