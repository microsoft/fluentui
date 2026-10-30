# @fluentui/react-menu

**React Menu components for [Fluent UI React](https://react.fluentui.dev)**

## Opt-in CSS Modules styles

Menu items, selectable checkmarks, groups, lists, and popovers have layered CSS Modules alternatives beside their Griffel style hooks.
Resolve the relevant `.styles.js` imports to `.styles.css.js` (and source `.styles`
imports to `.styles.css.ts`) only in an explicitly opted-in bundler configuration.
Keep CSS assets and process the headless icon stylesheet in the `fluentui` layer.
The default component imports and Griffel implementations are unchanged.
