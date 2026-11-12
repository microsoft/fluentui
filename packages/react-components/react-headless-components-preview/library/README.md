# @fluentui/react-headless-components-preview

**React Headless Components for [Fluent UI React](https://react.fluentui.dev/)**

> [!WARNING] > **This package is in preview and not production-ready.** APIs may change without notice before final release. **Do not use in production.**
>
> This package exposes unstyled, headless Fluent UI v9 primitives for teams building custom design systems. For most teams, [`@fluentui/react-components`](https://www.npmjs.com/package/@fluentui/react-components) remains the recommended default.

## State selector contract

Headless components expose resolved interaction and structural state through `data-*` attributes. Consumers that wrap these components, including visual-system packages, must preserve the attributes on the slot where headless emits them.

Existing attributes retain their current names and value semantics. Visual axes such as appearance, size, and shape are intentionally not part of the headless contract.

## Scrollable menus

Consumers provide the MenuPopover's maximum size and scrolling styles. While a menu is open,
Headless keeps its currently focused item visible when its scrollport shrinks or the viewport
changes. Nested menus also reveal their ancestor invokers, without moving focus. Manual scrolling
of the focused surface does not snap back to the focused item.

Positioned surfaces expose `data-cover-target` when `coverTarget` is enabled and
`--fui-positioning-block-offset` as a CSS pixel length. The latter is the normalized block-axis
offset (`mainAxis` for above/below, `crossAxis` for before/after), including zero and negative
values. These describe the positioning options, not a measurement of the space available after
the browser chooses a fallback placement. Consumer sizing must still preserve its own limits.

The browser regression fixture is `src/components/Menu/MenuViewport.cy.tsx`. From the repository
root, run `yarn nx run react-headless-components-preview:e2e --spec=src/components/Menu/MenuViewport.cy.tsx --browser=chrome`.
It opens a scrollable submenu, focuses its last item, replaces its invoker without moving focus,
and shrinks the viewport. The focused item and replacement invoker must remain inside their
respective scrollports; Escape must return focus to that invoker without closing the parent.
The fixture exercises document, open-shadow, and closed-shadow roots.
