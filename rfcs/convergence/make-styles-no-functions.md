# Problem

Currently `makeStyles()` can define style rules in two different ways

```ts
makeStyles({
  rootA: { color: 'red' },
  rootB: theme => ({ color: theme.tokenB }),
});
```

`theme` is typed and coupled to tokens from `@fluentui/react-theme`. This tokens shape is not extensible for customers.

# Solution

## Export tokens separately

Tokens are just CSS variables, we communicate this fact to customers so that they understand clearly what they are using. This also removes need in `useTheme()` hook as tokens can be accessed directly.

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

Currently `FluentProvider` only supports the `Theme` type from `@fluentui/react-theme`. If we simplify this to `Record<string, string | number>` , we enable consumers to extend the default theme.

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

`FluentProvider` will inject all customer tokens properly. These tokens will also be available on React Portals.

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
