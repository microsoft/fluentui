# Problem

Currently `makeStyles()` implements two on how styles can be defined:

```ts
makeStyles({
  rootA: { color: 'red' },
  rootB: theme => ({ color: theme.tokenB }),
});
```

`theme` is typed strictly and offers tokens from `@fluentui/react-theme`. This tokens shape is not extensible for customers.

# Solution

## Export tokens separately

Tokens are just CSS variables, we should be clear with customers on what they are using. This also removes need in `useTheme()` hook as tokens can be accessed directly.

```tsx
import { tokens } from '@fluentui/react-theme';

function CustomComponent() {
  return <div style={{ color: tokens.tokensA }} />;
}
```

`tokens` is just a plain object:

```ts
import type { Theme } from '@fluentui/react-theme';

const tokens: Theme = {
  borderRadiusNone: 'var(--borderRadiusNone)',
  borderRadiusSmall: 'var(--borderRadiusSmall)',
  /* ... */
};
```

## Remove functions

Once `tokens` are available there is no sense to keep functions in `makeStyles()`:

```diff
import { makeStyles } from '@fluentui/react-make-styles';
+import { tokens } from '@fluentui/react-theme';

makeStyles({
-  root: theme => ({ color: theme.tokenB }),
+  root: { color: tokens.tokenB },
});
```

## Simplify types in `FluentProvider`

Currently `FluentProvider` accepts `theme` only as `Theme` type from `@fluentui/react-theme`. If we will simplify it to `Record<string, string | number>` this will allow customers to extend our theme.

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

Usage of `FluentProvider` will inject all customer tokens properly and will make them available on React Portals.

## Using custom tokens in `makeStyles()`

Once tokens are injected on `FluentProvider` they could be used in `makeStyles()`.

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
