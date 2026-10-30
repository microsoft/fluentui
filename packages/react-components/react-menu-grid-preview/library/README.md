# @fluentui/react-menu-grid-preview

**React Menu Grid components for [Fluent UI React](https://react.fluentui.dev/)**

These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

## Opt-in CSS Modules styles

Menu grid groups, headers, rows, cells, and items have layered CSS Modules alternatives beside their Griffel style hooks.
Resolve the relevant `.styles.js` imports to `.styles.css.js` (and source `.styles`
imports to `.styles.css.ts`) only in an explicitly opted-in bundler configuration.
Keep CSS assets and process the headless icon stylesheet in the `fluentui` layer.
The default component imports and Griffel implementations are unchanged.
