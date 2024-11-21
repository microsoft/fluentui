It's often useful for an app to extend the base set of tokens from Fluent UI.

⚠ Components in this repo should _not_ do this.

⚠ Warning that adding more tokens adds more CSS variables which can effect run time performance as each DOM Node carries all the tokens.

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
