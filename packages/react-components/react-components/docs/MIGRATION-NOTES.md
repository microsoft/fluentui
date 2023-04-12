# Migration notes from `@fluentui/react-components@9.0.0-beta.5`to `@fluentui/react-components@9.0.0-rc.1`

## Changes to the styling system

### Functions no longer supported

Functions in `makeStyles()` are no longer supported, the `tokens` object can be used directly instead.

Please apply following changes:

```diff
-import { makeStyles } from '@fluentui/react-components';
+import { makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
-  root: theme => ({ color: theme.tokenB }),
+  root: { color: tokens.tokenB },
});
```

Focus indicator style functions in `@fluentui/react-tabster` were also updated to support this change:

```diff
-import { createCustomFocusIndicatorStyle, createFocusOutlineStyle, makeStyles } from '@fluentui/react-components';
+import { createCustomFocusIndicatorStyle, createFocusOutlineStyle, makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
-  focusOutline1: createFocusOutlineStyle(theme, { selector: 'focus-within', style: { outlineOffset: '8px' } }),
+  focusOutline1: createFocusOutlineStyle({ selector: 'focus-within', style: { outlineOffset: '8px' } }),

-  focusOutline2: createFocusOutlineStyle(theme => ({ backgroundColor: theme.colorNeutralBackground1 })),
+  focusOutline2: createFocusOutlineStyle({ backgroundColor: tokens.colorNeutralBackground1 }),
});
```

For more details, please check [microsoft/fluentui#20651](https://github.com/microsoft/fluentui/pull/20651).

### CSS shorthands no longer supported

[CSS shorthands](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties) in `makeStyles()` calls are no longer supported. For many shorthands there exist matching functions in `@fluentui/react-components`:

```ts
import { shorthands } from '@fluentui/react-componenents';

console.log(shorthands.overflow('hidden')); // { overflowX: 'hidden', overflowY: 'hidden' }
```

Please apply following changes:

```diff
import { makeStyles } from '@fluentui/react-componenents';
+import { makeStyles, shorthands } from '@fluentui/react-componenents';

const useStyles = makeStyles({
-  backgroundColor: { background: 'red' },
+  backgroundColor: { backgroundColor: 'red' },
-  padding: { padding: '5px' },
+  padding: { ...shorthands.padding('5px') },
-  margin: { margin: '5px' },
+  margin: { ...shorthands.margin('5px') },
-  border: { border: '5px solid red' },
+  border: { ...shorthands.border('5px', 'solid', 'red') },
-  borderRight: { borderRight: '5px solid red' },
+  borderRight: { ...shorthands.borderRight('5px', 'solid', 'red') },
});
```

For more details, please check [microsoft/fluentui#20573](https://github.com/microsoft/fluentui/pull/20573).

### makeStyles is now Griffel [just rename]

`makeStyles` CSS-in-JS become a separate project called [Griffel](https://github.com/microsoft/griffel). It is still used in Fluent UI React v9.

## Changes to the theming system

### Brand ramp updated

The brand colors have been updated to match the latest design guidelines.

For more details, please check [microsoft/fluentui#20140](https://github.com/microsoft/fluentui/pull/20140).

The shape of the Brand ramp object which is used to create a theme was changed from shade/primary/tint properties to an array of values for 10, 20 ... 160.

For more details, please check [microsoft/fluentui#20884](https://github.com/microsoft/fluentui/pull/20884).

### Tokens to css variables mapping is now exported

An object mapping the available tokens in the `Theme` to their respective css variables is now exported. You can import and use it in your project as follows:

```ts
import { tokens } from '@fluentui/react-components';

// To refer to the css variable containing the value for color neutral foreground 1:
console.log(tokens.colorNeutralForeground1);
```

### Custom tokens can now be passed as part of the Theme

Previously, the only tokens one could access were those provided by Fluent UI in its `Theme` definition. We are now opening up our APIs so that custom tokens can be passed down and accessed in our theming infrastructure. An example of how to achieve that is as follows:

```tsx
import { makeStyles, themeToTokensObject, webLightTheme, FluentProvider, Theme } from '@fluentui/react-components';

// You can pass your own custom tokens to a theme and pass that to the provider.
type CustomTheme = Theme & {
  tokenA: string;
  tokenB: string;
  tokenC: string;
};
const customTheme: CustomTheme = { ...webLightTheme, tokenA: 'red', tokenB: 'blue', tokenC: 'green' };
function App() {
  return <FluentProvider theme={customTheme}>{/* ... */}</FluentProvider>;
}

// ...

// You can construct a custom tokens object by yourself.
const customTokens: Record<keyof CustomTheme, string> = {
  ...tokens,
  tokenA: `var(--tokenA)`,
  tokenB: `var(--tokenB)`,
  tokenC: `var(--tokenC)`,
};

// You can alternatively use the themeToTokensObject function to construct the custom tokens object.
// Note: If you do it via the themeToTokensObject you might see a negative effect on tree-shaking since bundles won't know the shape of the output.
const alternativeCustomTokens = themeToTokensObject(customTheme);

// You can then use this custom tokens object inside your styles.
const useStyles = makeStyles({
  base: {
    color: customTokens.tokenA,
    backgroundColor: customTokens.tokenB,
    outlineColor: customTokens.tokenC,
  },
});
```

### `themeToCSSVariables()` was removed

`themeToCSSVariables()` was previously used for getting CSS variables name from nested values on `Theme`, since `Theme` has become flattened this method becomes unnecessary.

This API was internal, no replacement is provided.

For more details, please check [microsoft/fluentui#20828](https://github.com/microsoft/fluentui/pull/20828).

## Typings & exports

### Hooks are now exported with "\_unstable" suffix

All component hooks and render functions were renamed to add the suffix `_unstable` to indicate that their API has not been finalized and may change in the future.

```diff
-import { renderAccordionHeader } from `@fluentui/react-components`;
+import { renderAccordionHeader_unstable } from `@fluentui/react-components`;

-useAccordionHeaderStyles();
-renderAccordionHeader();
+useAccordionHeaderStyles_unstable();
+renderAccordionHeader_unstable();
```

> **Note**: No changes in functionality.

For more details, please check [microsoft/fluentui#21365](https://github.com/microsoft/fluentui/pull/21365).

### `*Commons` types are no longer exported

```diff
-import { AvatarCommons } from '@fluentui/react-components';
```

There is no direct replacement, consider to use `AvatarProps` or `AvatarState` for example. For more details, please check [microsoft/fluentui#21195](https://github.com/microsoft/fluentui/pull/21195).

### Removed functionality & exports

#### `useTheme()` hook is no longer exported

To replace the hook usage please apply the following changes:

```diff
-import { useTheme } from `@fluentui/react-components`;
+import { tokens } from `@fluentui/react-components`;

function App() {
-  const theme = useTheme();

-  return <div style={{ color: theme.colorNeutralForeground1 }} />;
+  return <div style={{ color: tokens.colorNeutralForeground1 }} />;
}
```

> **Note**: `tokens.VALUE` returns the name of a CSS variable, not an actual value.

For more details, please check [microsoft/fluentui#21257](https://github.com/microsoft/fluentui/pull/21257).

#### `mergeThemes()` function has been removed

To replace the usage of this function you should just spread the themes into a new object (which was what the function was doing internally for the most part):

```diff
import { webLightTheme, Theme } from '@fluentui/react-components';

const customTokens = { ... };
-const customTheme = mergeTheme(webLightTheme, customTokens);
+const customTheme = { ...webLightTheme, ...customTokens };
```

#### `*shorthandProps` removed

```diff
-import { accordionPanelShorthandProps } from '@fluentui/react-components'
```

These arrays with enumerated list of slots are no longer needed. For more details, please check [microsoft/fluentui#21134](https://github.com/microsoft/fluentui/pull/21134).

### Slot utilities have been updated and renamed

#### The `getSlots` function has been updated

> **Note**: This change should not affect most users of the library. It only affects authors of custom render functions.

`getSlots` now returns `null` instead of `nullRender` for slots that don't render. This requires that the render function checks for null before rendering a slot. `getSlots` also no longer takes a second parameter listing the slot names.

```diff
const renderMyComponent = (state: MyComponentState) => {
-  const { slots, slotProps } = getSlots<MyComponentSlots>(state, ['root', 'slotA', 'slotB']);
+  const { slots, slotProps } = getSlots<MyComponentSlots>(state);

  return (
    <slots.root {...slotProps.root}>
-      <slots.slotA {...slotProps.slotA} />
-      <slots.slotB {...slotProps.slotB} />
+      {slots.slotA && <slots.slotA {...slotProps.slotA} />}
+      {slots.slotB && <slots.slotB {...slotProps.slotB} />}
    </slots.root>
  );
};
```

For more details, see [microsoft/fluentui#21503](https://github.com/microsoft/fluentui/pull/21503).

#### New `Slot` type, and renamed slot utility types

> **Note**: This change should not affect most users of the library. It only affects authors of custom components.

All slots are now declared using a single `Slot` type:

- `IntrinsicShorthandProps` => `Slot`: direct rename with the same arguments.
- `ObjectShorthandProps` => `Slot`: the argument changes from the props type to the component type; e.g. from `ButtonProps`, to `typeof Button`.

```diff
type MyComponentSlots = {
-  root?: IntrinsicShorthandProps<'div'>;
-  slotA?: IntrinsicShorthandProps<'label', 'span' | 'div'>;
-  slotB?: ObjectShorthandProps<ButtonProps>;
+  root?: Slot<'div'>;
+  slotA?: Slot<'label', 'span' | 'div'>;
+  slotB?: Slot<typeof Button>;
};
```

The following types related to slots have been renamed:

- `ShorthandProps` => `WithSlotShorthandValue`
- `ShorthandRenderFunction` => `SlotRenderFunction`
- `ObjectShorthandPropsRecord` => `SlotPropsRecord`
- `DefaultObjectShorthandProps` => `UnknownSlotProps`

## Component changes

### `Accordion`

- `AccordionHeaderExpandIcon` has been removed and replaced by `ChevronRightRegular` from `@fluentui/react-icons`, [#21218](https://github.com/microsoft/fluentui/pull/21218).
- `AccordionHeader` props `children` is no longer a slot, [#21285](https://github.com/microsoft/fluentui/pull/21285).

### `Avatar`

- The `label` prop has been renamed to `initials`.
- Removed the `getInitials` prop. Instead, the customized initials can be set directly on the `initials` prop:
  ```diff
  - <Avatar name={name} getInitials={customGetInitialsFunction} />
  + <Avatar name={name} initials={customGetInitialsFunction(name)} />
  ```
- The `activeAppearance` prop can no longer be `glow` or `ring-glow`. Those appearances may be added again later when they have a final visual design.

### `Button`

- A styling change was made were the border radius of small buttons changed from using the `borderRadiusMedium` token (`4px` in our default global tokens) to now use the `borderRadiusSmall` token (`2px` in our default global tokens).

### `Checkbox`

- The label is now provided by the `label` prop instead of as the child of `Checkbox`.
  ```diff
  - <Checkbox>Example</Checkbox>
  + <Checkbox label="Example" />
  ```

### `CompoundButton`

The styles of the `CompoundButton` component have been updated to match the latest design specification guidelines. The changes made are outlined below:

| Style changed                                     | Value Before |      ValueAfter       |
| ------------------------------------------------- | :----------: | :-------------------: |
| Separation between primary and secondary contents |    `4px`     |          `0`          |
| Small-sized button padding                        |    `8px`     |  `8px 8px 10px 8px`   |
| Medium-sized button padding                       |    `12px`    | `14px 12px 16px 12px` |
| Large-sized button padding                        |    `16px`    | `18px 16px 20px 16px` |

### Icons

- Most icons are now available without a specific size (like `<PersonRegular />` instead of `<Person24Regular />`).
  - These icons will get their size from either the CSS `fontSize`, or the icon's `fontSize` property. Every FluentUI component with an `icon` slot will style these icons to be the correct size when used in that slot.
  - For example, instead of having to pick the correct size icon for a Button, an icon without a specific size can be used:
    ```diff
    - <Button icon={<Add20Filled />} />
    - <Button icon={<Add24Filled />} size="large" />
    + <Button icon={<AddFilled />} />
    + <Button icon={<AddFilled />} size="large" />
    ```

### `FluentProvider`

- Outermost `FluentProvider` now emits a warning to user in development/test environment if there has been no theme set, [#21286](https://github.com/microsoft/fluentui/pull/21286).

### `Menu`

The order of JSX children are now important. The `MenuTrigger` or an element that composes `MenuTrigger` must be the first JSX child of `Menu` and `MenuPopover` or its composed variants must be the second JSX child.

```tsx
function App() {
  return (
    <>
      {/* ❌❌❌ */}
      <Menu>
        <MenuPopover>
          <MenuList>
            <MenuItem> Item </MenuItem>
            <MenuItem> Item </MenuItem>
            <MenuItem> Item </MenuItem>
          </MenuList>
        </MenuPopover>
        <MenuTrigger>
          <button>Menu trigger</button>
        </MenuTrigger>
      </Menu>

      {/* ✅✅✅ */}
      <Menu>
        <MenuTrigger>
          <button>Menu trigger</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem> Item </MenuItem>
            <MenuItem> Item </MenuItem>
            <MenuItem> Item </MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>

      {/* ✅✅✅ */}
      <Menu>
        <WrapperElement>
          <MenuTrigger>
            <button>Menu trigger</button>
          </MenuTrigger>
        </WrapperElement>
        <MenuPopover>
          <MenuList>
            <MenuItem> Item </MenuItem>
            <MenuItem> Item </MenuItem>
            <MenuItem> Item </MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </>
  );
}
```

### `MenuButton`

- The typings of the `MenuButton` component have been updated to fix an issue where `ref` could not be properly passed because the type of it was wrong. It used to be that the only way to pass it was by typing it as `any`. After our change we are able to pass a properly typed `ref` of type `React.RefObject<HTMLButtonElement | HTMLAnchorElement>`.

### `ToggleButton`

- An issue was fixed where `aria-pressed` used to still change on `ToggleButton` click when the component was `disabledFocusable`. This is no longer the case and the component now behaves correctly.

### `Tooltip`

- `Tooltip` has a new required prop `relationship`. It describes how the tooltip is related to its child (trigger), and is used to set the appropriate aria properties on the trigger element. Its values can be:
  - `label` - The tooltip is the only text label for a control (for example an icon-only button).
  - `description` - The tooltip is extra descriptive text for a control that has another label.
  - `inaccessible` - The tooltip's content is not available to accessibility tools. This is not recommended unless the content is accessible in some other way.
- Native props now must go on the `content` slot instead of the `Tooltip` itself.
  - This only applies to HTMLElement props that are forwarded the Tooltip's `<div>` element; it doesn't apply to Tooltip-specific props like `appearance="inverted"`. This example would need to change:
    ```diff
    - <Tooltip id="example-id" className="example-class" content="Example Tooltip" relationship="label">
    + <Tooltip content={{ id: 'example-id', className: 'example-class', children: 'Example Tooltip' }} relationship="label">
    ```
  - This example is fine because `relationship="label"` is a Tooltip prop.
    ```diff
    <Tooltip content="Example Tooltip" relationship="label">
    ```
- The `inverted` prop was removed. Use `appearance="inverted"` instead.
- The `triggerAriaAttribute` prop was removed. Use the `relationship` prop instead.
