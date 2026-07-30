It's often useful for an app to extend the base set of tokens from Fluent UI.

⚠ Components in this repo should _not_ do this.

⚠ Warning that adding more tokens adds more CSS variables which can effect run time performance as each DOM Node carries all the tokens.

```tsx
import { themeToTokensObject, webLightTheme, FluentProvider, Theme } from '@fluentui/react-components';

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
```

Because the theme is emitted as CSS custom properties, your own stylesheet can reference the new
tokens directly — the `tokens` object is only needed when a value has to be read from TypeScript:

```css
/* MyApp.module.css */
.base {
  color: var(--tokenA);
  background-color: var(--tokenB);
  outline-color: var(--tokenC);
}
```

Custom tokens are **not** registered with Tailwind's `@theme`, so there is no generated utility for
them — reference the custom property, as above.
