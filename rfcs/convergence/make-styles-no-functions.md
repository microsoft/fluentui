# RFC: No functions in `makeStyles()`

---

@layershifter @khmakoto

## Summary/problem

Currently `makeStyles()` allows to define style rules in two different ways:

```ts
makeStyles({
  // 👇 as an object
  rootA: { color: 'red' },
  // 👇 as a function
  rootB: theme => ({ color: theme.tokenB }),
});
```

- `rootB` uses a function where `theme` is typed and coupled to tokens from `@fluentui/react-theme`. This tokens shape is not extensible for customers.

# Proposed solution

- Remove functions from `makeStyles()` calls
- Export the `tokens` object with CSS variables

## Export tokens separately

Initially we planed support IE11 via runtime tricks, but with the deprecation of IE11, we are now able to leverage CSS Variables for tokens and theming purposes. We communicate this fact to customers so that they understand clearly what they are using.

The proposal is to export `tokens` as a plain object:

```ts
import type { Theme } from '@fluentui/react-theme';

const tokens: Theme = {
  borderRadiusNone: 'var(--borderRadiusNone)',
  borderRadiusSmall: 'var(--borderRadiusSmall)',
  /* ... */
};
```

This also removes need in `useTheme()` hook for customers as tokens can be accessed directly, for example:

```tsx
import { tokens } from '@fluentui/react-theme';

function CustomComponent() {
  return <div style={{ color: tokens.borderRadiusNone /* is "var(--borderRadiusNone)" */ }} />;
}
```

That simplifies also integration with other CSS-in-JS from Fluent UI v8 or Fluent UI Northstar.

## Remove functions in `makeStyles()`

Once `tokens` are available there is no more need for functional style rules in `makeStyles()`:

```diff
import { makeStyles } from '@fluentui/react-make-styles';
+import { tokens } from '@fluentui/react-theme';

makeStyles({
-  root: theme => ({ color: theme.tokenB }),
+  root: { color: tokens.tokenB },
});
```

## Simplify types in `FluentProvider`

Currently `FluentProvider` only supports the `Theme` type from `@fluentui/react-theme`. If we simplify this to `Record<string, string | number>`, we enable consumers to extend the default theme:

```tsx
import { FluentProvider } from '@fluentui/react-provider';
import { mergeThemes, teamsLightTheme, Theme } from '@fluentui/react-theme';

type CustomTokens = {
  tokenA: string;
};
type CustomTheme = CustomTokens & Theme;

const extendedTheme: CustomTheme = mergeThemes(teamsLightTheme, { tokenA: 'red' });

function App() {
  return <FluentProvider theme={extendedTheme} />;
}
```

`FluentProvider` will inject all customer tokens properly including scenarios with React Portals.

## Using custom tokens in `makeStyles()`

Once tokens are injected through the `FluentProvider` they can be used in `makeStyles()`.

```tsx
import { tokens } from '@fluentui/react-theme';
import type { CustomTokens } from './custom-theme';

const customTokens: CustomTokens = {
  tokenA: 'var(--tokenA)',
};

makeStyles({
  root: {
    backgroundColor: customTokens.tokenA,
    color: tokens.tokenB,
  },
});
```
