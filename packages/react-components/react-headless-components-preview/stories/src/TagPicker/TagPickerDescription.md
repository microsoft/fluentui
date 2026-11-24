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

### Option styling

`TagPickerOption` exposes `data-selected` when its value is selected by the picker.
Explicit ARIA overrides do not change this selection state. `data-checked` reflects a
consumer-supplied `aria-checked`: it is present with an empty value for `true` or `"true"`,
omitted for `false`, `"false"` or `undefined`, and set to `"mixed"` for a mixed state.

### Accessibility defaults

`TagPickerList` exposes a multiselect listbox, and each `TagPickerOption` exposes its current
selection through `aria-selected`. Explicit consumer ARIA props override these defaults.
Supplying `aria-checked` suppresses the default `aria-selected`; consumers can explicitly
provide both attributes when they represent distinct states.
`TagPickerButton` is disabled when either it or its parent `TagPicker` is disabled; setting
`disabled={false}` on the button does not re-enable a disabled picker.

### Positioning

The headless TagPicker renders its native popover in DOM order and positions it with the package's
CSS anchor-based `usePositioning` hook. Use the optional `positioning` prop to define placement and
any desired alignment, offset, fallback positions, or target-size matching. The component does not
apply the styled TagPicker's presentation defaults; these stories explicitly add an offset for visual
spacing. Consumers do not need to pass an `inline` prop.

### Keyboard navigation requires a focusgroup polyfill

Arrow-key navigation across the tags relies on the native `focusgroup` attribute, which is not yet
shipped in browsers. These stories load [`@microsoft/focusgroup-polyfill`](https://www.npmjs.com/package/@microsoft/focusgroup-polyfill)
in `.storybook/preview.js`; consumers must load an equivalent polyfill until `focusgroup` is
natively supported.
