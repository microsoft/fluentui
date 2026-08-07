It's often useful for an app to extend the base set of tokens from Fluent UI.

⚠ Components in this repo should _not_ do this.

⚠ Warning that adding more tokens adds more CSS variables which can effect run time performance as each DOM Node carries all the tokens.

A theme is a CSS class containing only custom-property declarations, so extending it means adding
your own custom properties to that class. There is no theme object to spread and no `theme` prop —
you author CSS and apply the class:

```css
/* my-theme.css */
.my-custom-theme {
  /* override any built-in token by its canonical kebab-case name */
  --color-brand-background: #0f6cbd;

  /* ...and add your own alongside them */
  --tokenA: red;
  --tokenB: blue;
  --tokenC: green;
}
```

```tsx
import './my-theme.css';
import { FluentProvider } from '@fluentui/react-components';

function App() {
  return <FluentProvider themeClassName="my-custom-theme">{/* ... */}</FluentProvider>;
}
```

The class works on any DOM node, not just a provider — `<aside className="my-custom-theme">` themes
its subtree the same way. Tokens you do not declare fall through to the surrounding theme, or to the
Web Light defaults emitted at `:root` by `@fluentui/react-tailwind-theme/styles.css`.

Because the theme is emitted as CSS custom properties, your own stylesheet can reference the new
tokens directly:

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

When a value has to be read from TypeScript (inline styles, a canvas fill), build a `tokens`-shaped
map of `var()` references. The built-in `tokens` object from `@fluentui/react-theme` is exactly
this, so extend it:

```tsx
import { tokens } from '@fluentui/react-theme';

const customTokens = {
  ...tokens,
  tokenA: 'var(--tokenA)',
  tokenB: 'var(--tokenB)',
  tokenC: 'var(--tokenC)',
};
```

> **Generating the values.** If you would rather derive a full theme from a brand ramp than
> hand-write the declarations, the theme objects (`webLightTheme`, …) and factories
> (`createLightTheme()`, `createDarkTheme()`, …) remain available from `@fluentui/tokens` as
> **build-time/tooling input** — they are no longer part of the runtime API. Use them in a script to
> emit your theme class, then ship that class as static CSS. The
> [Theme Designer](https://aka.ms/themedesigner-v9) does this and exports ready-made CSS.
