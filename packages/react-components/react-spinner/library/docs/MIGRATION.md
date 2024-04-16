# Spinner Migration

## Migration from v8

- `Spinner`
  - `ariaLabel` => use `aria-label` instead.
  - `ariaLive` => use `aria-live` instead.
  - `componentRef` => use `ref` instead.
  - `theme` => Not supported. Use a `ThemeProvider` control instead.

## Migration from v0

- `Loader`
  - `delay` => Not supported.
  - `inline` => Not supported.
  - `labelPosition` => `labelPosition` => 'start' and 'end' changed to 'before' and 'after'
  - `size` => `size` => There are the same number of sizes

## Property mapping

| v8 `Spinner`   | v0 `Loader`     | v9 `Spinner`    |
| -------------- | --------------- | --------------- |
| `ariaLabel`    | `aria-label`    | `aria-label`    |
| `ariaLive`     | `aria-live`     | `aria-live`     |
| `componentRef` | `ref`           | `ref`           |
|                | `delay`         |                 |
|                | `inline`        |                 |
|                | `labelPosition` | `labelPosition` |
|                | `size`          | `size`          |
| `theme`        |                 |                 |
