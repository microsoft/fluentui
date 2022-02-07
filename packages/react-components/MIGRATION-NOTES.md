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

**TBD**

### makeStyles is Griffel now [just rename]

`makeStyles` CSS-in-JS become a separate project called [Griffel](https://github.com/microsoft/griffel). It still used in Fluent UI React v9.

## Typings & exports

### Hooks are export with "\_unstable" suffix

**TBD**

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
