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

### Component changes

**TBD**
