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

Initially we planed to support IE11 via runtime tricks, but with the deprecation of IE11, we are now able to leverage CSS Variables for tokens and theming purposes. We communicate this fact to customers so that they understand clearly what they are using.

The proposal is to export `tokens` as a plain object:

```ts
import type { Theme } from '@fluentui/react-theme';

const tokens: Theme = {
  borderRadiusNone: 'var(--borderRadiusNone)',
  borderRadiusSmall: 'var(--borderRadiusSmall)',
  /* ... */
};
```

This also removes the need of using the `useTheme()` hook for customers as tokens can be accessed directly, for example:

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

Currently `FluentProvider` only supports the `Theme` type from `@fluentui/react-theme`.

If we simplify this to `Record<string, string | number>`, we enable consumers to extend the default theme:

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

We could alternatively make the theme property in `FluentProvider` extend from `PartialTheme` if we want to ensure that the theme that is passed in always has the keys for the default tokens we provide.

The type of `FluentProviderProps` would then be:

```ts
export interface FluentProviderProps<TTheme extends PartialTheme = PartialTheme>
  extends Omit<ComponentProps<FluentProviderSlots>, 'dir'>,
    Partial<FluentProviderCommons> {
  theme?: TTheme;
}
```

And we could then use it as follows:

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

In both scenarios above, `FluentProvider` will still inject all customer tokens properly including scenarios with React Portals.

Also, in case there is an ask for it, we can decide to export a primitive component in the future (named for example `TokensProvider`) whose only purpose would be to render variables for `Record<string, string | number>`.

Finally, we will export a function to make the tokens to css variable mapping for any custom theme be programatically generated.

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
