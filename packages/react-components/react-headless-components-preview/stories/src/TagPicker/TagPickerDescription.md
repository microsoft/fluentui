The headless **TagPicker** is a combobox-like control for selecting multiple options, each
rendered as a dismissible tag. It composes:

- `TagPicker` — the root; owns combobox state and provides context. No DOM element, no styles.
- `TagPickerControl` — the interactive area that holds the tags and the trigger.
- `TagPickerGroup` — the selected tags. Uses the native WICG **`focusgroup`** attribute for
  arrow-key navigation across the tags, replacing Tabster's `useArrowNavigationGroup`.
- `TagPickerInput` / `TagPickerButton` — the trigger.
- `TagPickerList` — the popover list of `Option` / `OptionGroup` children.

It wraps the base hooks exported by `@fluentui/react-tag-picker` (`useTagPickerBase_unstable`,
`useTagPickerControlBase_unstable`, `useTagPickerInputBase_unstable`,
`useTagPickerButtonBase_unstable`) and ships **no styles** — bring your own via `className` and the
`data-*` attributes the hooks expose.

### Positioning

The base hook omits floating-ui positioning. Pass the `inline` prop (as these stories do) to render
the popover in DOM order and position it with CSS, or compose your own positioning around the
`TagPickerList`.

### Keyboard navigation requires a focusgroup polyfill

Arrow-key navigation across the tags relies on the native `focusgroup` attribute, which is not yet
shipped in browsers. These stories load [`@microsoft/focusgroup-polyfill`](https://www.npmjs.com/package/@microsoft/focusgroup-polyfill)
in `.storybook/preview.js`; consumers must load an equivalent polyfill until `focusgroup` is
natively supported.
