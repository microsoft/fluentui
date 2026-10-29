Headless Fluent components that make use of positioning can all be configured in the same way. In this preview package, positioning currently applies to:

- Popover, Menu, Tooltip, and other components exposing `positioning`

Components that have slots which are positioned will always expose a `positioning` prop where the positioning of the slot can be configured.

Below you can try out the different positioning options in the playground. Further examples try to explain more clearly different configuration options for the `positioning` prop.

### Autosizing

Set `positioning={{ autoSize: 'height' }}` to constrain a popup to the available height and allow its contents to scroll.
This is useful for overflow menus in short viewports: normal keyboard focus movement can reveal items without a separate
`scrollIntoView()` handler. Autosizing is opt-in; omitting it or setting `false` preserves CSS anchor positioning.

`true` constrains both axes, while `'height'` and `'width'` constrain only that axis. The v9 aliases `'always'`,
`'height-always'`, and `'width-always'` are also supported. Autosizing uses the same positioning engine and available-space
calculation as v9, including flipping before constraining the popup. Existing inline overflow styles are respected, so
avoid explicitly setting `overflowY: 'hidden'` on a popup that needs vertical scrolling.

The Overflow Default story demonstrates the height-only opt-in. Resize the viewport while its menu is open, then use
Up/Down and Home/End to check that focused items stay in view. See the [WAI menu pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/)
for keyboard guidance and [Understanding Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) for the applicable
viewport and zoom considerations.
