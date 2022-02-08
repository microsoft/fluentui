# Notes on migration to `@fluentui/react-components@9.0.0-rc.1`

## Styling changes

### Functions no longer supported

Functions in `makeStyles()` are no longer supported, `tokens` can be used directly.

Please apply following changes:

```diff
import { makeStyles } from '@fluentui/react-componenents';
+import { makeStyles, tokens } from '@fluentui/react-componenents';

const useStyles = makeStyles({
-  root: theme => ({ color: theme.tokenB }),
+  root: { color: tokens.tokenB },
});
```

For more details, please check [microsoft/fluentui#20651](https://github.com/microsoft/fluentui/pull/20651).

### CSS shorthands no longer supported

[CSS shorthands](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties) in `makeStyles()` calls are no longer supported. For many shorthands there matching functions in `@fluentui/react-components`:

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

### makeStyles is Griffel now [just rename]

`makeStyles` CSS-in-JS become a separate project called [Griffel](https://github.com/microsoft/griffel). It still used in Fluent UI React v9.

## Typings & exports

### Hooks are export with "\_unstable" suffix

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

### Removed functionality & exports

#### `useTheme()` hook is no longer exported

To replace the hook usage please apply following changes:

```diff
-import { useTheme } from `@fluentui/react-components`;
+import { tokens } from `@fluentui/react-components`;

function App() {
-  const theme = useTheme();

-  return <div style={{ color: theme.colorNeutralForeground1 }} />;
+  return <div style={{ color: tokens.colorNeutralForeground1 }} />;
}
```

> **Note**: `tokens.VALUE` returns name of a CSS variable, not an actual value.

For more details, please check [microsoft/fluentui#21257](https://github.com/microsoft/fluentui/pull/21257).

### Slot utilities have been updated and renamed

#### The `getSlots` function has been updated

> **Note**: This change should not affect most users of the library. It only affects authors of custom render functions.

`getSlots` now returns `null` instead of `nullRender` for slots that don't render. This requires that the render function check for null before rendering a slot. `getSlots` also no longer takes a second parameter listing the slot names.
```diff
const renderMyComponent = (state: MyComponentState) => {
-  const { slots, slotProps } = getSlots<MyComponentSlots>(state, ['root', 'slotA', 'slotB']);
+  const { slots, slotProps } = getSlots<MyComponentSlots>(state);

  return (
    <slots.root {...slotProps.root}>
-      <slots.slotA {...slotProps.slotA} />
+      {slots.slotA && <slots.slotA {...slotProps.slotA} />}
-      <slots.slotB {...slotProps.slotB} />
+      {slots.slotB && <slots.slotB {...slotProps.slotB} />}
    </slots.root>
  );
};
```

#### New `Slot` type, and renamed slot utility types

> **Note**: This change should not affect most users of the library. It only affects authors of custom components.

All slots are now declared using a single `Slot` type:
* `IntrinsicShorthandProps` => `Slot`: direct rename with the same arguments.
* `ObjectShorthandProps` => `Slot`: the argument changes from the props type to the component type; e.g. from `ButtonProps`, to `typeof Button`.

```diff
type MyComponentSlots = {
-  root?: IntrinsicShorthandProps<'div'>;
+  root?: Slot<'div'>;
-  slotA?: IntrinsicShorthandProps<'label', 'span' | 'div'>;
+  slotA?: Slot<'label', 'span' | 'div'>;
-  slotB?: ObjectShorthandProps<ButtonProps>;
+  slotB?: Slot<typeof Button>;
};
```

The following types related to slots have been renamed:
* `ShorthandProps` => `WithSlotShorthandValue`
* `ShorthandRenderFunction` => `SlotRenderFunction`
* `ObjectShorthandPropsRecord` => `SlotPropsRecord`
* `DefaultObjectShorthandProps` => `UnknownSlotProps`

## Component changes

**TBD**
