# @fluentui/react-headless-components-preview

**React Headless Components for [Fluent UI React](https://react.fluentui.dev/)**

> [!WARNING] > **This package is in preview and not production-ready.** APIs may change without notice before final release. **Do not use in production.**
>
> This package exposes unstyled, headless Fluent UI v9 primitives for teams building custom design systems. For most teams, [`@fluentui/react-components`](https://www.npmjs.com/package/@fluentui/react-components) remains the recommended default.

## State selector contract

Headless components expose resolved interaction and structural state through `data-*` attributes. Consumers that wrap these components, including visual-system packages, must preserve the attributes on the slot where headless emits them.

Existing attributes retain their current names and value semantics. Visual axes such as appearance, size, and shape are intentionally not part of the headless contract.

## Scrollable menus

Consumers own MenuPopover sizing and scrolling styles. Headless uses `scrollIntoView()` to reveal
focused items and ancestor submenu invokers after viewport or scrollport changes, without moving focus.
Sizing and positioning must keep the menu surface within the viewport: native scrolling does not
correct an offscreen surface. Browsers without support for `container: 'nearest'` may also scroll
enclosing containers.
