# @fluentui/react version 8 release notes (draft)

## Breaking changes

### SpinButton

- Simplified props to `ISpinButtonStyles` to include only the parts of the component to bring inline with
  other components.
- Replaced `getClassNames` legacy prop with `styles` prop to bring component consistent to other components
  and improve cachability of internal styles.

### Checkbox

- Removed `styles` prop.
- Removed `checkmarkIconProps` prop.
- Deprecated `onRenderLabel`.
- Added `label`/`checkmark` slot props.

### Pivot

- Removed deprecated and redundant props from v7, including: `initialSelectedKey` and `defaultSelectedIndex`. Use `selectedKey` or `defaultSelectedKey` to define the selected tab, and provide `itemKey` on pivot item children.

### Others

- Function component conversion.
- `ThemeProvider` is required. (new)
- `Customizer`. (shim)
- `KeytipData`/`keytipProps` removed from `Link`/`Toggle`/`Checkbox`.
- `Button` and `Card` are new components that break from their previous implementation.

## Minor changes

### Pivot

- Updated enums to string union type: `PivotLinkFormat`, `PivotLinkSize`. (#13370)

## Changes worth callout

- `styles` prop backward compat solution.
- css variables and IE 11 solution.
