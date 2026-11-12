# @fluentui/react-headless-components-preview

**React Headless Components for [Fluent UI React](https://react.fluentui.dev/)**

> [!WARNING] > **This package is in preview and not production-ready.** APIs may change without notice before final release. **Do not use in production.**
>
> This package exposes unstyled, headless Fluent UI v9 primitives for teams building custom design systems. For most teams, [`@fluentui/react-components`](https://www.npmjs.com/package/@fluentui/react-components) remains the recommended default.

## State selector contract

Headless components expose resolved interaction and structural state through `data-*` attributes. Consumers that wrap these components, including visual-system packages, must preserve the attributes on the slot where headless emits them.

Existing attributes retain their current names and value semantics. Visual axes such as appearance, size, and shape are intentionally not part of the headless contract.

## Scrollable menus

Consumers own MenuPopover sizing and scrolling styles. Headless keeps focused items and ancestor
submenu invokers visible after viewport or scrollport changes, without moving focus.

Positioned surfaces expose `data-cover-target` when enabled and `--fui-positioning-block-offset`
as a CSS pixel length (`mainAxis` for above/below, `crossAxis` for before/after). These describe
positioning inputs, not available space after fallback placement; consumer size limits still apply.
