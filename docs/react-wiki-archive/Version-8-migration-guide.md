This page provides a detailed list of changes and migration guide for Fluent UI React version 8. [See the release notes for a higher-level overview.](Version-8-release-notes)

<!-- UPDATING HEADINGS? Also update table of contents with doctoc or other tool (and be sure to test the new heading links). -->

- [Easier migration](#easier-migration)
- [Using codemods](#using-codemods)
- [Supported dependency versions](#supported-dependency-versions)
- [Package renames](#package-renames)
  - [`office-ui-fabric-react` to `@fluentui/react`](#office-ui-fabric-react-to-fluentuireact)
  - [`@uifabric` package renames](#uifabric-package-renames)
- [Function component conversions](#function-component-conversions)
  - [Converted components](#converted-components)
  - [Potentially breaking changes](#potentially-breaking-changes)
- [Theming changes](#theming-changes)
- [Individual components: new features](#individual-components-new-features)
- [Individual components: breaking changes](#individual-components-breaking-changes)
- [Keytips](#keytips)
- [Child window support](#child-window-support)
- [Other changes](#other-changes)
  - [Removed experimental components](#removed-experimental-components)
  - [Removed internal paths](#removed-internal-paths)
- [Known issues](#known-issues)

---

## Easier migration

As of 2022-09-05, Fluent UI React v7 has been updated to ease migration from `@uifabric` and `office-ui-fabric-react` to `@fluentui` packages and imports.

If you first update your package references and imports to the `@fluentui` name while remaining on v7, moving to v8 will require fewer changes. You will be able to focus on the few breaking changes between v7 and v8.

### @fluentui Stub Packages

The following packages were added to v7 that publish the `@uifabric` exports as equivalent `@fluentui` exports.

> Important! v8 removed implicit exports which removed deep imports beyond the lib level. The stub packages only re-export top-level and lib level exports. For example, `office-ui-fabric-react/lib/components/Button/CommandBarButton/CommandBarButton` should become `@fluentui/react/lib/Button` if you are still doing lib level imports or `@fluent/react` if moving to package-level imports.

| @uifabric package | @fluentui stub package |
| ----------------- | ---------------------- |
| charting          | react-charting         |
| experiments       | react-experiments      |
| file-type-icons   | react-file-type-icons  |
| icons             | font-icons-mdl2        |
| merge-styles      | merge-style            |
| react-cards       | react-cards            |
| react-hooks       | react-hooks            |
| styling           | style-utilities        |
| utilities         | utilities              |
| variants          | scheme-utilities       |

### v7 and v8 fixes

Fixes and additions were made to both v7 and v8 to make migration easier. Many were ensuring that the getStyles methods for various components were exported under unique names at the top level. Others included exporting types and methods that were previously implicit exports.

v8:

- [Added roundedCorners missing from common-styles](https://github.com/microsoft/fluentui/pull/24091)

- [Expanded ChoiceGroup callbacks to remove breaking change](https://github.com/microsoft/fluentui/pull/24242)
- [Exported ActivityItem getStyles](https://github.com/microsoft/fluentui/pull/24475)
- [Exported CommandBar getStyles](https://github.com/microsoft/fluentui/pull/24478)
- [Exported DetailsList getStyles](https://github.com/microsoft/fluentui/pull/22990)
- [Exported ContextualMenu getItemStyles](https://github.com/microsoft/fluentui/pull/24484)
- [Exported Layer getStyles and notifications](https://github.com/microsoft/fluentui/pull/24485)
- [Exported Picker getStyles](https://github.com/microsoft/fluentui/pull/24509)
- [Exported TextField getStyles](https://github.com/microsoft/fluentui/pull/24511)
- [Exported GroupedListUtilities](https://github.com/microsoft/fluentui/pull/24515)

v7:

- [Exported lib/Decorators](https://github.com/microsoft/fluentui/pull/24192)
- [Exported ActivityItem getStyles](https://github.com/microsoft/fluentui/pull/24473)
- [Exported CommandBar getStyles](https://github.com/microsoft/fluentui/pull/24476)
- [Exported DetailsList getStyles](https://github.com/microsoft/fluentui/pull/24483)
- [Exported ContextualMenu getItemStyles](https://github.com/microsoft/fluentui/pull/24493)
- [Exported Layer getStyles and notifications](https://github.com/microsoft/fluentui/pull/24495)
- [Exported Picker getStyles](https://github.com/microsoft/fluentui/pull/24508)
- [Exported TextField getStyles](https://github.com/microsoft/fluentui/pull/24510)
- [Exported GroupedListUtilities](https://github.com/microsoft/fluentui/pull/24514)

---

## Using codemods

We've provided a number of codemods to help make picking up name and API changes easier.

Run `npx @fluentui/codemods` to automatically upgrade your repo! This will result in changes being made to files so be sure to run it separate from an other active changes that you have.

More documentation [here](https://github.com/microsoft/fluentui/wiki/Codemods).

---

## Supported dependency versions

The minimum supported **React** version remains at **16.8**. React 17 is also supported but has not yet been thoroughly tested due to tooling issues, so if you encounter any problems, please file an issue and we'll fix it.

The minimum supported **TypeScript** version has increased to **3.9**. Later versions should also work. Our `tslib` dependency has been updated to version 2, as required by TS 3.9.

React 16.8 and TypeScript 3.9 will continue to be our minimum supported versions for the duration of `@fluentui/react` version 8.

(We've updated our tooling within the repo to TypeScript 4.1, but we'll ensure that this _does not_ affect our public APIs.)

---

## Package renames

As the Fabric brand has evolved to Fluent UI, we've renamed our main package from `office-ui-fabric-react` to `@fluentui/react`. The `@uifabric` sub-packages have also been moved to the `@fluentui` scope and in some cases renamed.

### `office-ui-fabric-react` to `@fluentui/react`

As of version 8, the `office-ui-fabric-react` package has been discontinued in favor of `@fluentui/react`.

#### Deep imports: what are they, why are they bad?

> Update: Although deep imports won't create as much of an immediate issue now that we've reverted the `@fluentui/react-internal` addition from the original beta and moved most files back to their original locations ([details here](https://github.com/microsoft/fluentui/issues/12770#issuecomment-776389207)), we still **highly recommend** removing deep imports! This should be easier now since recent versions of 7 and 8-beta fixed the majority of exports that were missing from the package root.

Some partners have deep imports into the current Fabric package; for example:

```tsx
import { ICalloutProps } from 'office-ui-fabric-react/lib/components/Callout/Callout.types';
```

This has never been supported officially, as we've always recommended to use either the package import or a "top-level import," meaning a file directly under the `/lib/` path.

```tsx
import { ICalloutProps } from '@fluentui/react'; // Good
import { ICalloutProps } from '@fluentui/react/lib/Callout'; // Also good
```

We cannot guarantee any deep import will continue working across major releases. They will break any time any given file is moved, renamed, or even when the casing is changed. This would create a massive surface contract that we are not able to support.

If you have deep imports in your product, please update them now to only use package or top-level imports. (And please, let us know if you depend on something that is not exported. We can fix that.)

### `@uifabric` package renames

The `@uifabric` sub-packages have been moved to the `@fluentui` scope and in some cases renamed to reflect our current naming conventions.

These renames can automatically be picked up in TypeScript code by [running codemods](#using-codemods), though references in `package.json` and other configuration files will need to be updated manually.

The following table shows the new package names. For more details and history, [see this issue](https://github.com/microsoft/fluentui/issues/13384). (The UMD global name is probably only relevant for codepen examples or prototypes, not apps which use a bundler.)

| Old name (under `@uifabric`)   | New name (under `@fluentui`)                                                 | New UMD global name         |
| ------------------------------ | ---------------------------------------------------------------------------- | --------------------------- |
| `azure-themes`                 | same                                                                         | `FluentUIAzureThemes`       |
| `charting`                     | `react-charting`                                                             | `FluentUIReactCharting`     |
| `date-time`                    | `react-date-time`                                                            | `FluentUIReactDateTime`     |
| `example-app-base`             | `react-docsite-components`                                                   |                             |
| `example-data`                 | same                                                                         | `FluentUIExampleData`       |
| `experiments`                  | `react-experiments`                                                          | `FluentUIReactExperiments`  |
| `file-type-icons`              | `react-file-type-icons`                                                      |                             |
| `foundation`                   | `foundation-legacy`                                                          | `FluentUIFoundationLegacy`  |
| `icons`                        | `font-icons-mdl2`                                                            |                             |
| `jest-serializer-merge-styles` | same                                                                         |                             |
| `merge-styles`                 | same                                                                         | `MergeStyles`               |
| `monaco-editor`                | same                                                                         | `FluentUIReactMonacoEditor` |
| `office-ui-fabric-react`       | `@fluentui/react`                                                            | `FluentUIReact`             |
| `react-cards`                  | same ([reintroduced here](https://github.com/microsoft/fluentui/pull/18965)) | `FluentUIReactCards`        |
| `react-hooks`                  | same                                                                         | `FluentUIReactHooks`        |
| `set-version`                  | same                                                                         |                             |
| `styling`                      | `style-utilities`                                                            |                             |
| `test-utilities`               | same                                                                         |                             |
| `theme-samples`                | same                                                                         | `FluentUIThemeSamples`      |
| `tsx-editor`                   | `react-monaco-editor`                                                        |                             |
| `utilities`                    | same                                                                         |                             |
| `variants`                     | `scheme-utilities`                                                           | `FluentUISchemeUtilities`   |
| `webpack-utils`                | `webpack-utilities`                                                          |                             |

#### Discontinued packages

The following packages have been discontinued:

- `@uifabric/fluent-theme`: Constants have been moved to `@fluentui/theme`. Styles are now the default.
- `@uifabric/mdl2-theme`: This styling is deprecated (though you can continue to use version 7 of the package if needed).

#### ThemeProvider location changes

A preview of `ThemeProvider` was published with version 7 under `@fluentui/react-theme-provider`. For various reasons, it was moved from that package into `@fluentui/react` itself in version 8, so **do not use `@fluentui/react-theme-provider` in version 8.**

---

## Function component conversions

As part of the work to support [React strict mode](https://reactjs.org/docs/strict-mode.html) and unblock adoption of [React concurrent mode](https://reactjs.org/docs/concurrent-mode-intro.html) once it's released, some components were converted from class components to function components. This results in some API surface changes and may also require updates to tests.

While the function component conversions may require a bit of extra work to pick up in the short term, they also unblock future changes to more easily share state and interaction logic between components, which will help reduce bundle sizes and make behavior more consistent across components.

### Converted components

The following components have been converted. (Any component not on this list remains the same component type, class or function, as it was in version 7.)

- Breadcrumb
- Calendar
- Callout
- Checkbox
- ChoiceGroup (and ChoiceGroupOption)
- Coachmark (and Beak, PositioningContainer)
- ComboBox
- ContextualMenu
- DatePicker
- Dropdown
- Fabric
- Grid (renamed to ButtonGrid)
- Image
- Layer
- Link
- MaskedTextField
- MessageBar
- Modal
- OverflowSet
- Persona (and PersonaCoin, PersonaPresence)
- Pivot
- Popup
- Rating
- ResizeGroup
- SearchBox
- Shimmer
- Slider
- SpinButton
- SwatchColorPicker
- TeachingBubble
- Toggle

### Potentially breaking changes

There are a few breaking behavior and API changes for the converted components. Most of these are inherent differences between the behavior of class and function components in React, not specific to Fluent UI React.

#### `ref` returns a DOM element, not class instance

The `ref` prop no longer refers to a component class instance; instead, the ref is forwarded to the underlying DOM. All our function components should correctly return a reference to the root DOM element.

For components with an imperative API (example: `IDropdown.focus()`), you can still access that via `componentRef`.

See React's docs for [`useRef`](https://reactjs.org/docs/hooks-reference.html#useref) and [`forwardRef`](https://reactjs.org/docs/react-api.html#reactforwardref) for more on using refs with function components.

#### `ReactDOM.findDOMNode` will not work on function components

The [deprecated `ReactDOM.findDOMNode` API](https://reactjs.org/docs/react-dom.html#finddomnode) can't be used to find root elements of function components (this is a React limitation). Instead, use `ref` as described above.

#### Accessing `state` is no longer supported

Since function component state is handled with hooks rather than a `state` member, it can no longer be accessed from outside the component.

Most important state properties should be accessible via `componentRef` on the `IComponentName` "imperative handle" interface.

If you need a former state property which is not included in the relevant `IComponentName` interface, please file an issue and we can consider adding it.

#### Class extension of components is no longer supported

If you were using class extension on a component that was converted, it will no longer work. We recommend using composition instead: wrap the Fluent UI component inside another component which handles the prop or callback customizations which were previously done in the child class.

Even for components which were not converted, class extension is **not recommended** since we'll be converting the remaining components to function components in the future, possibly within a minor release. (Exception: Class extension of Pickers will continue to be supported for now since the current architecture relies on it. We'd like to change this in the future, but not within v8.)

#### Some test operations may need to be wrapped in `act()`

If you have components which use our converted function components, certain test operations may need to be wrapped in `act()` (from `react-dom/test-utils`). This is a new requirement from React itself when testing function components that use hooks, and React will log console warnings if the wrapper is missing. [More details here.](https://reactjs.org/docs/test-utils.html#act)

---

## Theming changes

We know that the number of possible theming approaches and lack of clear guidance has been confusing to Fabric/Fluent UI React users in the past, so for version 8 we've added `ThemeProvider` as a unified approach to applying and accessing themes.

Please see [this wiki page](https://github.com/microsoft/fluentui/wiki/How-to-apply-theme-to-Fluent-UI-React-components) and the [ThemeProvider README](https://github.com/microsoft/fluentui/blob/master/packages/react/src/utilities/ThemeProvider/README.md) for details about usage and migration.

The `Fabric` and `Customizer` components have been deprecated in favor of `ThemeProvider`. (If you're using `Customizer` for purposes besides theming, please let us know.)

**NOTE:** `ThemeProvider` was previously published under `@fluentui/react-theme-provider`. For various reasons, it was moved from that package into `@fluentui/react` itself in version 8, so **do not use `@fluentui/react-theme-provider` in version 8.**

---

## Individual components: new features

#### ~~`[IN PREVIEW]` Button~~

This has moved back to dev status--see [this comment](https://github.com/microsoft/fluentui/issues/12770#issuecomment-776389207) for details.

_(Note: when the beta was announced, we planned to officially release the new buttons with version 8 and export them by default from `@fluentui/react`. However, it became apparent that a bit more time was needed to ensure that we're using the right patterns to provide a good foundation for building components moving forward.)_

#### Calendar/DatePicker

`Calendar` and `DatePicker` have been replaced with the versions from the `@fluentui/react-date-time` package (formerly `@uifabric/date-time`). These versions contain various bug fixes and have been converted from SCSS to CSS-in-JS. They should be almost identical in visuals and functionality, though there are some changes to how to customize styles. See under "Breaking changes" below for details.

#### Pivot

`Pivot` supports displaying an overflow menu when there is not enough room to display all of the tabs. This can be enabled by setting `overflowBehavior="menu"` on the `Pivot`.

#### Rating

It's now possible to use `Rating` as an uncontrolled component by setting `IRatingProps.defaultRating`.

For either controlled or uncontrolled `Rating`s, the current value is now accessible via `componentRef` as `IRating.rating`. (Use this instead if you were previously accessing `Rating.state.rating`.)

#### SpinButton

`SpinButton` (finally) has a standard `onChange` prop. This means you can easily use it as a controlled component without having to re-implement the default increment/decrement/validate handlers.

#### SwatchColorPicker

`SwatchColorPicker` now has a standard `onChange` prop. `onColorChanged` is still available but has been deprecated.

Also added support for the standard controlled/uncontrolled pattern: provide `selectedId` for controlled behavior and `defaultSelectedId` for uncontrolled behavior.

---

## Individual components: breaking changes

#### ~~Button~~

Due to a change of plans, there are **no breaking changes** to Button in v8. The old version of Button remains exported by default from `@fluentui/react` for this release, and the previously proposed "compat" import path for the old Button (`@fluentui/react/lib/compat/Button`) has been removed.

#### Calendar

`Calendar` has been replaced with the version from the `@fluentui/react-date-time` package (formerly `@uifabric/date-time`).

- Converted styling from legacy SCSS to CSS-in-JS. Styling can now be customized using `ICalendarProps.styles` or sub-component props, such as `ICalendarProps.calendarDayProps.styles`.
  - [See here](https://github.com/microsoft/fluentui/issues/15646) for details of how to override sub-components' style props and related outstanding issues.
- The DOM structure has changed, and most global classNames are no longer available. We may add some of the classNames back if needed ([see details here](https://github.com/microsoft/fluentui/issues/15646)) but haven't implemented this yet.
- Removed the following props:
  - `autoNavigateOnSelection`: Now the default behavior.
  - `selectDateOnClick`: Now the default behavior.
  - `shouldFocusOnMount`: Use `ICalendar.focus()` instead (via `componentRef`)
  - `yearPickerHidden`: Moved to `ICalendarMonthProps` (settable via `ICalendarProps.calendarMonthProps`)

#### Callout

- Prop `onDismiss?: (ev?: any) => void;` is now `onDismiss?: (ev?: Event | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void;`

#### Checkbox

`Checkbox` no longer accepts arbitrary native props at the root (`ICheckboxProps` no longer extends `React.ButtonHTMLAttributes<HTMLElement | HTMLInputElement>`). This actually is _not a behavior change_: any native props or `data-*` props previously being passed through were ignored, and now the types accurately reflect the behavior.

To apply arbitrary native props to the hidden checkbox input element (used for accessibility and forms), use `ICheckboxProps.inputProps` instead. Note that `data-*` props are supported in `ICheckboxProps.inputProps` but will require casting since TS < 4.1 doesn't provide a way to express this. This should be adequate for most scenarios, but please comment on [this issue](https://github.com/microsoft/fluentui/issues/16307) if you have a scenario where you need native props on the root element.

#### ChoiceGroup

- Setting `checked` on individual options to indicate their checked state is no longer supported. Instead, use `defaultSelectedKey` or `selectedKey`.
- Moved `root` style to the actual root element and removed `applicationRole` style.
- Removed deprecated props and types:
  - `onChanged` from `IChoiceGroupProps` (use `onChange`)
  - `checked` from `IChoiceGroupOption` (see above for alternative)
    - Note that this is still available via `IChoiceGroupOptionProps` for custom rendering purposes only, and will be set correctly by the parent `ChoiceGroup`.
  - Type aliases `OnFocusCallback` and `OnChangeCallback`: use `IChoiceGroupOptionProps['onFocus']` and `IChoiceGroupOptionProps['onChange']`
- Only if manually rendering the `ChoiceGroupOption` component, the new prop `itemKey` is now required. (You can still use `key` when passing options via `IChoiceGroupProps.options`, which is by far the most common.)

#### Coachmark

- Removed deprecated `isBeaconAnimating` and `isMeasured` style props

#### ComboBox

- The return type of `IComboBox.focus()` has changed from `boolean` to `void` to reflect its actual behavior (the implementation does not return a value and can't easily be modified to do so).

#### DatePicker

`DatePicker` has been replaced with the version from the `@fluentui/react-date-time` package (formerly `@uifabric/date-time`), which also uses the `Calendar` from that package. See the notes on `Calendar` above for details and potential breaking changes.

#### Dropdown

Dropdown options no longer infer `title` values from their `text` prop as it was redundant.

#### Grid

`Grid` has been renamed to `ButtonGrid` to better reflect what it is, and to free up the more generic name for a possible future abstraction of CSS grid. (The new name is also available in version 7.) Exported `IGridStyles` are now `IButtonGridStyles`.

#### OverflowSet

- Contents of the `OverflowSet` are no longer wrapped in a `FocusZone`.
- Removed deprecated `focusZoneProps` and `doNotContainWithinFocusZone` from types.

#### Pickers

- The picker input and selected tags are no longer wrapped in a `FocusZone`.
- The text of selected tags is no longer focusable; only the remove button is in the tab order.

#### Pivot

- Removed deprecated and redundant props from v7, including `initialSelectedKey` and `defaultSelectedIndex`. Use `selectedKey` or `defaultSelectedKey` to define the selected tab, and provide `itemKey` on pivot item children.
- `IPivotStyleProps` changes
  - Replaced `rootIsLarge` with `linkSize`.
  - Replaced `rootIsTabs` and `linkFormat`.
  - Removed deprecated prop `linkIsSelected`.
- Updated enums to string union type: `PivotLinkFormat`, `PivotLinkSize`. (#13370)

#### Popup

- Updated signature of `onDismiss` to include the native `KeyboardEvent` as a possible type of the `ev` parameter: `onDismiss?: (ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement> | KeyboardEvent) => any`

#### Rating

- Removed deprecated props:
  - `onChanged` (use `onChange`)
  - `ariaLabelId` (use `getAriaLabel`)
- Passing `null` for `IRatingProps.rating` is no longer supported. To determine whether the user has interacted with the rating yet, set `allowZeroStars: true` and check whether the rating is 0.
- Minor typing corrections:
  - `IRatingProps` now extends `React.HTMLAttributes` rather than `React.AllHTMLAttributes`. The old interface included some props which don't actually apply to a `div`.
  - Corrected type of `IRatingProp.onChange`'s `event` parameter to reflect how it's used internally. It should be `React.FormEvent<HTMLElement>`, not `React.FocusEvent<HTMLElement>`.

#### SearchBox

- If `value` is provided, the `SearchBox` will now use strict controlled behavior (the displayed value won't update until the `value` prop changes). Use `defaultValue` for uncontrolled behavior.

#### SpinButton

- Removed default values of `min` and `max` (formerly 0 and 100).
- If `value` is provided, the `SpinButton` will now use strict controlled behavior (the displayed value won't update until the `value` prop changes). Use `defaultValue` for uncontrolled behavior.
- `onChange` now has custom handling and is only called when the SpinButton's value is "committed" (blur, enter, or spin). If you were previously using the native `onChange` prop (applied to the component's root `div`) to be notified of every keystroke, use `onInput` instead.
- Simplified props to `ISpinButtonStyles` to include only the parts of the component to bring in line with other components. As a result, the following props have been removed (see below for migration tips):
  - `arrowButtonsContainerDisabled`
  - `inputDisabled`
  - `inputTextSelected`
  - `labelDisabled`
  - `labelWrapperStart`
  - `labelWrapperEnd`
  - `spinButtonWrapperDisabled`
  - `spinButtonWrapperFocused`
  - `spinButtonWrapperHovered`
  - `spinButtonWrapperTopBottom`
- Replaced `getClassNames` legacy prop with `styles` prop to bring component consistent to other components and improve cacheability of internal styles.

If you're using a removed `ISpinButtonStyles` prop, you can instead pass a style function which returns appropriate styles based on the current state of the component. The following code snippet shows how to do this for each removed prop.

```tsx
<SpinButton styles={(props: ISpinButtonStyleProps) => {
  const { disabled, isFocused, labelPosition, theme } = props;
  return {
    spinButtonWrapper: [
      disabled && { /* spinButtonWrapperDisabled styles */ },
      isFocused && { /* spinButtonWrapperFocused styles */ },
      !disabled && { ':hover': { /* spinButtonWrapperHovered styles */ } }
    ],
    input: [
      disabled && { /* inputDisabled styles */ },
      !disabled && { '::selection': { /* inputTextSelected styles */ } }
    ],
    label: [
      disabled && { /* labelDisabled styles */ }
    ],
    labelWrapper: [
      (labelPosition === Position.top || labelPosition === Position.bottom)
        && { /* spinButtonWrapperTopBottom styles */ },
      labelPosition === Position.left && { /* labelWrapperStart styles */ },
      labelPosition === Position.right && { /* labelWrapperEnd styles */ },
    ],
    arrowButtonsContainer: [
      disabled && { /* arrowButtonsContainerDisabled styles */ }
    ]
  }
}}>
```

#### Shimmer

- Removed unused `componentRef` prop from `Shimmer` types as it doesn't use any public methods.

#### SwatchColorPicker

- Selection state is now tracked internally based on `IColorCellProps.id`, not item index. Ensure that all color cells have a unique `id` property.
- Removed deprecated props:
  - `positionInSet`: use `ariaPosInSet`
  - `setSize`: use `ariaSetSize`
- Deprecated `isControlled`. Provide `selectedId` for controlled behavior and `defaultSelectedId` for uncontrolled behavior.
- Added an `onChange` prop and deprecated `onColorChanged`.

#### TeachingBubble

- Removed `rootElementRef` from public API.

#### Text

`Text` now uses either the selected font variant's color, or `theme.semanticColors.bodyText` as its color by default. This will only cause problems if you were previously relying on `Text` inheriting color from its parent.

#### TextField/MaskedTextField

- Added separate interfaces for `MaskedTextField`: `IMaskedTextFieldProps` and `IMaskedTextField`
- Moved `MaskedTextField`-specific props `mask`, `maskChar`, and `maskCharData` from the general `ITextFieldProps` to `IMaskedTextFieldProps`
- `onChange` is now called synchronously in the change event handler, _before_ updating state (previously it was called asynchronously after the state update). This more closely matches other components and React itself, but may cause issues if anyone was depending on the old behavior.

---

## Keytips

Previously, `KeytipData` was built into different components which needed Keytip support. This added extra bundle size to our components. In version 8, we have removed `KeytipData` and `keytipProps` props from `Link`, `Toggle`, `Checkbox`, `ComboBox`, `Dropdown`, and `SpinButton`.

Here is an example on how to migrate from this change:

Before:

```jsx
<Checkbox label="Checkbox" keytipProps={checkboxKeytips} />
```

After:

```jsx
import { useKeytipRef } from '@fluentui/react/lib/Keytips';

const checkboxRef = useKeytipRef({ keytipProps: checkboxKeytips });

<Checkbox label="Checkbox" ref={checkboxRef} />;
```

You can find more code examples on the public documentation site [here](https://developer.microsoft.com/en-us/fluentui#/controls/web/keytips).

#### Other call-outs

- If the component is disabled and you don't want to enable keytips in that case, make sure you are passing `disabled: true` to `keytipProps`. It's possible you weren't setting `disabled` previously and still worked because the value was populated within the component which uses `KeytipData`.
- If you have another `ref` that needs to be passed to a component apart from the `ref` returned by `useKeytipRef`, you can use `useMergedRefs` from `@fluentui/react-hooks` to merge multiple refs into one then pass it to the component.

---

## Child window support

`WindowProvider` is required for child windows/embeds. This can be imported from `@fluentui/react/lib/WindowProvider` or the `@fluentui/react-window-provider` package.

---

## Other changes

### Removed experimental components

The following components have been removed or deprecated from `@fluentui/react-experiments` (formerly `@uifabric/experiments`):

- Removed `Button`: didn't provide desired performance gains, and is superseded by convergence work.
  - `MicroFeedback` now uses the button from `@fluentui/react`; this will affect valid slot prop overrides.
- Deprecated `Slider`: we kept this one for now since it provides some functionality not currently implemented by the `@fluentui/react` `Slider`, but it will also be superseded by convergence work in the future.
- Removed `Toggle`: superseded by convergence work.

~~The previous implementation of `Card` (which was never officially released) has been entirely removed.~~ As of [this PR](https://github.com/microsoft/fluentui/pull/18965), the deprecated experimental Card has been re-introduced under `@fluentui/react-cards`. Please don't use it in new code.

### Removed internal paths

- `FluentStyles` is removed from `@fluentui/react-experiments` since it re-exported `FluentStyles` from `@uifabric/fluent-theme`. Leverage `@fluentui/theme` if you want to replicate the original behavior inside your project, although this should not be needed since the `FluentStyles` are the default ones.
- Removed various files which were originally in `office-ui-fabric-react` and not intended to be part of the public API:
  - `office-ui-fabric-react/src/components/Theme/defaultTheme.ts` (use `@fluentui/theme`)
  - `office-ui-fabric-react/src/customizations/TeamsTheme.ts` (use `@fluentui/theme-samples`)
  - `office-ui-fabric-react/src/utilities/exampleData.ts` (use `@fluentui/example-data`)
- _(list may be incomplete)_

### Something missing? Let us know!

If you encounter any breaking changes which were not mentioned here, feel free to file an issue or let us know internally.

---

## Known issues

- Although we've added React 17 to our peer dependency range, the library has not been fully tested with React 17. Please file an issue if you encounter problems.

- Azure theme styling for DatePicker and Calendar may not fully work - [#17156](https://github.com/microsoft/fluentui/issues/17156)
