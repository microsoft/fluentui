# @fluentui/react Release Notes

## Breaking changes

### Checkbox

- Removed `styles` prop.
- Removed `checkmarkIconProps` prop.
- Deprecated `onRenderLabel`.
- Added `label`/`checkmark` slot props.

### Pivot

- Converted Pivot to a function component.
- Removed deprecated and redundant props from v7, including: `initialSelectedKey` and `defaultSelectedIndex`. Use `selectedKey` or `defaultSelectedKey` to define the selected tab, and provide `itemKey` on pivot item children.

### Others

- Function component conversion.
- ThemeProvider is required. (new)
- Customizer. (shim)
- KeytipData/keytipProps removed from Link/Toggle/Checkbox.
- Button and Card are new components that break from their previous implementation.

## Minor changes

### Pivot

- Updated enums to string union type: PivotLinkFormat, PivotLinkSize. (#13370)

## Changes worth callout

- `styles` prop backward compat solution.sss
- css variables and IE 11 solution.
