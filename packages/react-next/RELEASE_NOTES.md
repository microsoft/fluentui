# @fluentui/react version 8 release notes (draft)

## Breaking changes

### Button

The Button has been completely rewritten to be faster, smaller, and easier to customize. By default, Buttons have no opinion about icons, menuing, or split button behavior, which has led to large bundle and performance hits for the most common cases.

As a result, please see the table below on the replacements:

### Component renames

Common buttons now all map to `Button`:

| Old                                              | New                                                          |
| ------------------------------------------------ | ------------------------------------------------------------ |
| `<DefaultButton text="Hello, world" />`          | `<Button>Hello, world</Button>`                              |
| `<PrimaryButton text="Hello, world" />`          | `<Button primary>Hello, world</Button>`                      |
| `<IconButton iconProps={{ iconName: 'Add' }} />` | `<Button iconOnly ghost icon={ <Icon iconName="Add" /> } />` |

### Toggle buttons

The `ToggleButton` component is an extension of the `Button` and has been separated out to reduce bundle size and performance overhead. The `ToggleButton` respects a `checked` or `defaultChecked` flag.

```jsx
const App = () => {
  const [isChecked, setChecked] = React.useState(false);

  return (
    <ToggleButton checked={checked} onClick={() => setChecked(!isChecked)}>
      {checked ? 'Pause' : 'Play'}
    </ToggleButton>
  );
};
```

### Menu buttons

The `MenuButton` component is an extension of the `Button` and has been separated out to reduce bundle size and performance overhead. The `MenuButton` takes in a `menu` prop to provide the menu:

```jsx
const App = () => {
  const [ isChecked, setChecked ] = React.useState(false);

  return (
    <MenuButton
      iconOnly
      circular
      ghost
      icon={ <EllipsisIcon /> }
      menu={
        items: [
          { key: 'a', ... }
        ]
      }
   />
  );
}
```

### Split menu buttons

The `SplitButton` is now its own component, instead of being baked into the `Button` component itself. This helps to overall reduce the default `Button` complexity, runtime overhead, and bundle size:

Before:

```jsx
<PrimaryButton split onClick={ () => alert('action')} menuProps={{ items: [ ... ] }} text="Hello, world" />
```

After:

```jsx
<SplitButton primary onClick={ () => alert('action')} menu={{ items: [ ... ] }} />
```

Additional changes:

- Now 2 tab targets rather than 1: The action part of the button and the menu part are now separate focus targets. This helps with predictability for users who want to either execute the action or expand the menu. It also helps with accessibility, as we can keep the action with a normal `button` role, and the menu with an `aria-haspopup` attribute, making it more clear for screen readers to differentiate from a typical menu button.

### Button: slots support

Buttons now support slots. Slot support replaces `onRender*` and `*Props` props. The `iconProps` is an example of this. Before, you would provide the props directly. Now you can provide JSX, which lets the implementation own prop typing:

Before:

```jsx
<DefaultButton iconProps={{ iconName: 'Add' }}> />
```

After:

```jsx
<Button icon={<Icon iconName="Add" />} />
```

This ensures that `Button` components work not just with Fluent UI icons, but with any other icon set.

### Additional button modifiers and enums

These all apply to `Button`, `ToggleButton`, `MenuButton`, and `SplitButton`:
| Modifier | Description |
| ---------- | --------------------------------------------------------------------------------------- |
| `circular` | Make the button rounded on the edges (pill button.) |
| `fluid` | Stretches the button to the container width. |
| `iconOnly` | Makes the width match the height. Can be combined with circular to make circle buttons. |
| `ghost` | Makes the button inherit the background color. |
| `primary` | Uses the brand color to indicate the button is a primary action. |
| `size` | Controls the size of the button, based on an enum value: `smallest`, `smaller`, `small`, `regular`, `large`, `larger`, `largest`. Defaults to `regular`. |

### Button styling changes

- `vertical-align` is now set to `middle` to ensure they align correctly. See https://codesandbox.io/s/align-buttons-middle-6u5nu for an example of why this is important.
- Focus rectangles have been adjusted to be more visible and consistent with our new focus styling approach (note that not everything has been updated to the 2px black border 1px inverted inner.)
- Gaps between elements within the button were changed to margins rather than combo of padding/margin.

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

### Rating

- Removed deprecated props `onChanged` (use `onChange`) and `ariaLabelId` (use `getAriaLabel`)
- `IRatingProps` now extends `React.HTMLAttributes` rather than `React.AllHTMLAttributes` (using the old interface was incorrect because it included some props which don't actually apply to a `div`)
- Passing `null` for `rating` is no longer supported. To determine whether the user has interacted with the rating yet, set `allowZeroStars: true` and check whether the rating is 0.
- Added `IRating.rating` property for accessing the current rating value via `componentRef`. (Use this instead if you were previously accessing `state.rating`.)
- The component now uses strict controlled behavior when the `rating` prop is provided. Use the new `defaultRating` prop to make the rating uncontrolled.

### Slider

- Deprecated prop `ariaLabel` (use `aria-label`)

### SpinButton

- Simplified props to `ISpinButtonStyles` to include only the parts of the component to bring inline with other components.
- Replaced `getClassNames` legacy prop with `styles` prop to bring component consistent to other components and improve cachability of internal styles.

### Shimmer

- Removed unused `ComponentRef` prop from `Shimmer` types as it doesn't use any public methods.

### SwatchColorPicker

- Removed deprecated props `positionInSet` (use `ariaPosInSet`) and `setSize` (use `ariaSetSize`).
- Added an `onChange` prop and deprecated `onColorChanged`.
- Deprecated `isControlled`. Provide `selectedId` for controlled behavior and `defaultSelectedId` for uncontrolled behavior.
- Selection state is now tracked internally based on `IColorCellProps.id`, not item index. Ensure that all color cells have a unique `id` property.

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
- `WindowProvider` is required for child windows/embeds.

## Minor changes

### Pivot

- Updated enums to string union type: `PivotLinkFormat`, `PivotLinkSize`. (#13370)

## Other notable changes

- `styles` prop backward compat solution.
- css variables and IE 11 solution.
