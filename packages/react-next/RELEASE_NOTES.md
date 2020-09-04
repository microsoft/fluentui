# @fluentui/react version 8 release notes (draft)

## Breaking changes

### Calendar

TODO: Diff of OUFR vs date-time Calendar

### Checkbox

- Removed `styles` prop.
- Removed `checkmarkIconProps` prop.
- Deprecated `onRenderLabel`.
- Added `label`/`checkmark` slot props.

### ChoiceGroup

- Moved `root` class to the actual root element by replacing `applicationRole`.
- Removed `applicationRole` from IChoiceGroupStyles.
- Removed deprecated `onChanged` prop.

### Coachmark

- Removed `isBeaconAnimating` and `isMeasured` style props
- Beak:
  - Removed empty `IBeak` interface
  - Removed `componentRef` prop

### DatePicker

TODO: Diff of OUFR vs date-time DatePicker

### OverflowSet

- Removed deprecated `focusZoneProps` and `doNotContainWithinFocusZone` from types.
- Removed uses of `FocusZone` from render and the public-api.

### Pivot

- Removed deprecated and redundant props from v7, including: `initialSelectedKey` and `defaultSelectedIndex`. Use `selectedKey` or `defaultSelectedKey` to define the selected tab, and provide `itemKey` on pivot item children.
  - Removed deprecated styles prop `linkIsSelected?: boolean;`.
  - Removed styles prop `rootIsLarge` and added `linkSize` instead.
  - Removed styles prop `rootIsTabs` and added `linkFormat` instead.
  - TODO: enumerate all removed props

### Slider

TODO: document any API or functionality changes

### SpinButton

- Simplified props to `ISpinButtonStyles` to include only the parts of the component to bring inline with other components.
- Replaced `getClassNames` legacy prop with `styles` prop to bring component consistent to other components and improve cachability of internal styles.

### Shimmer

- Removed unused `ComponentRef` prop from `Shimmer` types as it doesn't use any public methods.

### TeachingBubble

- Removed unused defaultProps from TeachingBubbleContent.
- Removed rootElementRef from public api.

### Function component conversions

- The `ref` prop for such components no longer refers to a component class instance; instead, the ref is forwarded to the underlying DOM.
  - We will ensure all function components correctly return a reference to the root DOM element.
  - For components with an imperative API, you can still access that via `componentRef`.
  - See React's docs for [`useRef`](https://reactjs.org/docs/hooks-reference.html#useref) and [`forwardRef`](https://reactjs.org/docs/react-api.html#reactforwardref) for more on using refs with function components.
- The [deprecated `ReactDOM.findDOMNode` API](https://reactjs.org/docs/react-dom.html#finddomnode) can't be used to find root elements (this is a React limitation). Instead, use `ref` as described above.
- Class extension of most components is no longer supported.
  - Due to time constraints, not all components will be converted by the time of v8 release. However, they may be converted at any time in the future within a minor version.
  - Exception: Class extension of Pickers will continue to be supported for now since the current architecture relies on it. (This will change in a future major release, but not within v8.)
- Accessing `state` of converted components is no longer possible.
  - If you need a former state property which is not included in the relevant `IComponentName` interface, please file an issue and we can consider adding it.
- In your components which use the converted components, you may need to wrap certain test operations in `act` from `react-dom/test-utils`. [More details here.](https://reactjs.org/docs/test-utils.html#act)

### Others

- `ThemeProvider` is required. (new)
- `KeytipData`/`keytipProps` removed from `Link`/`Toggle`/`Checkbox`.
- `Button` and `Card` are new components that break from their previous implementation.

## Minor changes

### Pivot

- Updated enums to string union type: `PivotLinkFormat`, `PivotLinkSize`. (#13370)

### FocusTrapZone

- `FocusTrapZone's` `FocusStack` now takes an ID instead of component object.

### SwatchColorPicker

- Removed deprecated props `positionInSet` (use `ariaPosInSet`) and `setSize` (use `ariaSetSize`).
- Added an `onChange` prop and deprecated `onColorChanged`.
- Deprecated `isControlled`. Provide `selectedId` for controlled behavior and `defaultSelectedId` for uncontrolled behavior.
- Selection state is now tracked internally based on `IColorCellProps.id`, not item index. Ensure that all color cells have a unique `id` property.

## Other notable changes

- `styles` prop backward compat solution.
- css variables and IE 11 solution.
