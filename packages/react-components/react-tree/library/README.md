# @fluentui/react-tree

**React Tree components for [Fluent UI React](https://react.fluentui.dev/)**

These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

## Opt-in CSS Modules styles

Tree, FlatTree, TreeItem, TreeItemLayout, and TreeItemPersonaLayout have alternatives. TreeItem retains the custom-property fallback for indentation beyond ten levels.

The default components continue to use Griffel. An opt-in bundler resolver can replace
`use<Component>Styles.styles.js` with `use<Component>Styles.styles.css.js`
(and the corresponding `.ts` source modules). Keep the emitted CSS assets and process
their CSS Modules imports; all rules are in `@layer fluentui`. Apply the same selection
to client and server bundles. Within-package composed alternatives import their CSS
base hook explicitly. These alternatives do not make composed external components
Griffel-free. Browser, forced-colors, SSR, and full VRT parity require separate validation.
