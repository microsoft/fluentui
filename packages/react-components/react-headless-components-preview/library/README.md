# @fluentui/react-headless-components-preview

**React Headless Components for [Fluent UI React](https://react.fluentui.dev/)**

> [!WARNING] > **This package is in preview and not production-ready.** APIs may change without notice before final release. **Do not use in production.**
>
> This package exposes unstyled, headless Fluent UI v9 primitives for teams building custom design systems. For most teams, [`@fluentui/react-components`](https://www.npmjs.com/package/@fluentui/react-components) remains the recommended default.

## State selector contract

Headless components expose resolved interaction and structural state through `data-*` attributes. Consumers that wrap these components, including visual-system packages, must preserve the attributes on the slot where headless emits them.

Existing attributes retain their current names and value semantics. Visual axes such as appearance, size, and shape are intentionally not part of the headless contract.

## TeachingPopover carousel boundary buttons

`TeachingPopoverCarouselFooterButton` keeps boundary actions visible by default, including
`altText` actions such as **Done** or **Restart**. Empty children, icons, and accessible labels
are not used to infer whether an action is available.

Set `hideOnBoundary: true` on an individual footer button to hide it at the committed first
(`navType: 'prev'`) or last (`navType: 'next'`) page, regardless of its content. For example:

```tsx
<TeachingPopoverCarouselFooter
  previous={{ navType: 'prev', children: 'Previous', altText: undefined, hideOnBoundary: true }}
  next={{ navType: 'next', children: 'Next', altText: 'Done' }}
/>
```

When a focused button becomes hidden by this policy, the headless footer transfers focus
to its other button if that button is focusable. Ordinary navigation, mount, rejected
controlled updates, and navigation initiated while focus is elsewhere do not move focus.
Standalone buttons hide without choosing a replacement focus target. Custom button
components must use the headless hook and forward its root ref, focus handlers, and `hidden`
attribute. Styling wrappers should preserve this behavior rather than infer availability
from CSS `:empty` or observe child mutations.
