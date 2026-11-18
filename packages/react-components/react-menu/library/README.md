# @fluentui/react-menu

**React Menu components for [Fluent UI React](https://react.fluentui.dev)**

## Scrollable menus

Menus use native `scrollIntoView()` to reveal focused items and ancestor submenu invokers when
scrollports or the viewport change, without moving focus. This complements positioning and
`autoSize`; it does not correct a menu surface positioned outside the viewport.
Browsers without support for `container: 'nearest'` may also scroll enclosing containers.
