# @fluentui/react version 8 release notes (draft)

## Breaking changes: specific components

### Button

The Button has been completely rewritten to be faster, smaller, and easier to customize. By default, Buttons now have no opinion about icons, menuing, or split button behavior, which has led to large bundle and performance hits for the most common cases in the past.

Please see the [`@fluentui/react-button` package README](https://github.com/microsoft/fluentui/blob/master/packages/react-button/README.md) for details about improvements and a migration guide.

If you would like to continue using the previous button components for now, update your imports to reference `@fluentui/react/lib/compat/Button`.

### Calendar

`Calendar` has been replaced with the version from the `@uifabric/date-time` package. This should be almost identical in visuals and functionality

- Converted styling from legacy SCSS to CSS-in-JS. Styling can now be customized using `ICalendarProps.styles`.
- Removed the following props (TODO: suggest alternatives)
  - `autoNavigateOnSelection`
  - `selectDateOnClick`
  - `shouldFocusOnMount`
  - `yearPickerHidden`

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

`DatePicker` has been replaced with the version from the `@uifabric/date-time` package, which also uses the `Calendar` from that package. The only breaking changes are to `ICalendarProps` (see above).

### OverflowSet

- Removed deprecated `focusZoneProps` and `doNotContainWithinFocusZone` from types.
- Removed uses of `FocusZone` from render and the public-api.

### Pivot

- Removed deprecated and redundant props from v7, including: `initialSelectedKey` and `defaultSelectedIndex`. Use `selectedKey` or `defaultSelectedKey` to define the selected tab, and provide `itemKey` on pivot item children.
- `IPivotStyleProps` changes
  - Replaced `rootIsLarge` with `linkSize`.
  - Replaced `rootIsTabs` and `linkFormat`.
  - Removed deprecated prop `linkIsSelected`.

### Rating

- The component now uses strict controlled behavior when the `rating` prop is provided. Use the new `defaultRating` prop to make the rating uncontrolled.
- Removed deprecated props `onChanged` (use `onChange`) and `ariaLabelId` (use `getAriaLabel`)
- `IRatingProps` now extends `React.HTMLAttributes` rather than `React.AllHTMLAttributes` (using the old interface was incorrect because it included some props which don't actually apply to a `div`)
- Passing `null` for `rating` is no longer supported. To determine whether the user has interacted with the rating yet, set `allowZeroStars: true` and check whether the rating is 0.
- Added `IRating.rating` property for accessing the current rating value via `componentRef`. (Use this instead if you were previously accessing `state.rating`.)
- Corrected type of `IRatingProp.onChange`'s `event` parameter to reflect how it's used internally. It should be `React.FormEvent<HTMLElement>`, not `React.FocusEvent<HTMLElement>`.

### SpinButton

- Simplified props to `ISpinButtonStyles` to include only the parts of the component to bring inline with other components.
- Replaced `getClassNames` legacy prop with `styles` prop to bring component consistent to other components and improve cachability of internal styles.

### Shimmer

- Removed unused `componentRef` prop from `Shimmer` types as it doesn't use any public methods.

### SwatchColorPicker

- Removed deprecated props `positionInSet` (use `ariaPosInSet`) and `setSize` (use `ariaSetSize`).
- Added an `onChange` prop and deprecated `onColorChanged`.
- Deprecated `isControlled`. Provide `selectedId` for controlled behavior and `defaultSelectedId` for uncontrolled behavior.
- Selection state is now tracked internally based on `IColorCellProps.id`, not item index. Ensure that all color cells have a unique `id` property.

### TeachingBubble

- Removed unused `defaultProps` from TeachingBubbleContent.
- Removed `rootElementRef` from public API.

### TextField

- Moved MaskedTextField-specific props `mask`, `maskChar`, and `maskCharData` from the general `ITextFieldProps` to a new `IMaskedTextFieldProps`.

## Breaking changes: general

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

### ThemeProvider

`ThemeProvider` is required to use if any button from `@fluentui/react/lib/Button` is used. We also deprecated `Fabric`, `Customizer` components in favor of using `ThemeProvider`.

Please see the [`@fluentui/react-theme-provider` package README](https://github.com/microsoft/fluentui/blob/master/packages/react-theme-provider/README.md) for details about usage and a migration guide.

### Component package moves and renames

In addition to the rename of `office-ui-fabric-react` to `@fluentui/react`, most components have been moved to either a new **internal use only** package `@fluentui/react-internal`, or to individual component packages. This means **deep path imports will no longer work.** We've added root-level export files for most things that were intended to be part of the public API, but if anything is missing, please file an issue.

Note that directly importing from the `@fluentui/react-internal` package (the root or any file within it) is **not supported**, and the structure of this package may change at any time. Importing from individual component packages or `@fluentui/react` top-level files is fine.

### Discontinued packages

- Discontinue `@fluentui/fluent-theme` package in favor of `@fluentui/theme` package; removed from `master`.

### Others

- `KeytipData`/`keytipProps` removed from `Link`/`Toggle`/`Checkbox`.
- `Button` and `Card` are new components that break from their previous implementation.
- `WindowProvider` is required for child windows/embeds.
- `FluentStyles` is removed from `experiments` package.
- Removed various files which were originally in `office-ui-fabric-react` and not intended to be part of the public API:
  - `office-ui-fabric-react/src/components/Theme/defaultTheme.ts` (use `@fluentui/theme`)
  - `office-ui-fabric-react/src/customizations/TeamsTheme.ts` (use `@fluentui/theme-samples`)
  - `office-ui-fabric-react/src/utilities/exampleData.ts` (use `@fluentui/example-data`)

## Minor changes

### Pivot

- Updated enums to string union type: `PivotLinkFormat`, `PivotLinkSize`. (#13370)

### FocusTrapZone

- `FocusTrapZone's` `FocusStack` now takes an ID instead of component object.

## New features

- Pivot supports displaying an overflow menu when there is not enough room to display all of the tabs. This can be enabled by setting `overflowBehavior="menu"` on the Pivot.

## Other notable changes

- `styles` prop backward compat solution.
- css variables and IE 11 solution.
