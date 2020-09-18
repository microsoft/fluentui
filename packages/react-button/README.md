# @fluentui/react-button

**Button components for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

**WARNING!** These components are still in active development, and the APIs may change before final release. The package will be released with a stable API as part of [Fluent UI React version 8](https://github.com/microsoft/fluentui/issues/12770) in late 2020.

To use the Button components:

```js
import { Button } from '@fluentui/react-button';

const App = () => {
  return <Button content="hello, world!" />;
};
```

## Migration guide

The Button has been completely rewritten to be faster, smaller, and easier to customize compared to the version from `office-ui-fabric-react@7`. By default, Buttons now have no opinion about icons, menuing, or split button behavior, which has led to large bundle and performance hits for the most common cases in the past.

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
