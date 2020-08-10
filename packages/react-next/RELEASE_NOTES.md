# @fluentui/react version 8 release notes (draft)

## Breaking changes

### Beak

- Removed empty `IBeak` interface
- Removed `componentRef` prop

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

### ChoiceGroup

- Moved `root` class to the actual root element by replacing `applicationRole`.
- Removed `applicationRole` from IChoiceGroupStyles.

### Coachmark

- Removed `isBeaconAnimating` and `isMeasured` style props

### Pivot

- Removed deprecated and redundant props from v7, including: `initialSelectedKey` and `defaultSelectedIndex`. Use `selectedKey` or `defaultSelectedKey` to define the selected tab, and provide `itemKey` on pivot item children.

### Others

- Function component conversion.
  - The `ref` attribute for such components no longer refers to a component class instance; instead, the ref is forwarded to the underlying DOM.
  - Class extension of converted components is no longer possible.
    - Even for components which have not yet been converted to function components, class extension is no longer supported
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
