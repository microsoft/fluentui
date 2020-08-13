# @fluentui/react version 8 release notes (draft)

## Breaking changes

### Calendar

TODO: Diff of OUFR vs date-time Calendar

### Checkbox

- Removed `styles` prop.
- Removed `checkmarkIconProps` prop.
- Deprecated `onRenderLabel`.
- Added `label`/`checkmark` slot props.

### Coachmark

- Removed `isBeaconAnimating` and `isMeasured` style props
- Beak:
  - Removed empty `IBeak` interface
  - Removed `componentRef` prop

### DatePicker

TODO: Diff of OUFR vs date-time DatePicker

### Pivot

- Removed deprecated and redundant props from v7, including: `initialSelectedKey` and `defaultSelectedIndex`. Use `selectedKey` or `defaultSelectedKey` to define the selected tab, and provide `itemKey` on pivot item children.
  - TODO: enumerate all removed props

### Slider

TODO: document any API or functionality changes

### SpinButton

- Simplified props to `ISpinButtonStyles` to include only the parts of the component to bring inline with other components.
- Replaced `getClassNames` legacy prop with `styles` prop to bring component consistent to other components and improve cachability of internal styles.

### Others

- Function component conversion.
  - The `ref` attribute for such components no longer refers to a component class instance; instead, the ref is forwarded to the underlying DOM.
  - Class extension of converted components is no longer possible.
    - Even for components which have not yet been converted to function components, class extension is no longer supported
- `ThemeProvider` is required. (new)
- `KeytipData`/`keytipProps` removed from `Link`/`Toggle`/`Checkbox`.
- `Button` and `Card` are new components that break from their previous implementation.

## Minor changes

### Pivot

- Updated enums to string union type: `PivotLinkFormat`, `PivotLinkSize`. (#13370)

## Other notable changes

- `styles` prop backward compat solution.
- css variables and IE 11 solution.
