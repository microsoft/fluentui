# @fluentui/react-nav

**React Nav components for [Fluent UI React](https://react.fluentui.dev/)**

These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

## Opt-in CSS Modules styles

The style hooks have sibling `.styles.css.ts` alternatives and CSS assets in the
`fluentui` layer. Griffel remains the default. Opt-in bundler selection must
replace both `.styles` source imports and `.styles.js` published imports, including
the shared nav style module and composed Button/Divider/Drawer hooks. Shared package-local
hooks explicitly compose their CSS alternatives. Use the CSS/headless icon entry
points; the shared stylesheet imports their defaults into the same layer.

Hamburger, NavDivider, and the drawer sections retain public Button, Divider, and
Drawer hook imports, so consumers must select those packages' CSS alternatives
too; these public imports
are not a claim that the package is Griffel-free. SplitNavItem and NavDrawer also
render composed components whose CSS implementations must be selected separately.

Source-order behavior is preserved, including NavSubItem's 46px start padding at
both densities (the original base style overrides its small-density adjustment).
NavDrawerFooter's original five-value padding is invalid CSS and ignored by the
browser, so its alternative leaves padding to DrawerFooter rather than silently
fixing the original declaration.

Hook tests verify finite state-to-class mappings and caller classes, not browser
styling parity. Browser interaction, RTL, forced-colors, animation, SSR, React
compatibility, and visual-regression checks remain required before a default switch.
