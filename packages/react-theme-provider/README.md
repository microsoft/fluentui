# @fluentui/react-theme-provider

**React theming component and hook for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

# Installation

```bash
yarn add @fluentui/react-theme-provider
```

# Example usage

First, ensure you use an existing theme, or create your own. Example:

```js
/**
 * Note: Themes are partial by default. They will become fully qualified
export const theme: Theme = {
  /* Provide any stylesheets which should come along with the theme */
  stylesheets: [
    '.className { ... }',
    ...
  ],

  /* Provide standard fluent tokens here. */
  tokens: {

    body: {
      fill: {}
    },

    site: {

    }
  }
};
```

Use the theme with Fluent UI by wrapping content within the provider:

```tsx
import { ThemeProvider } from '@fluentui/react-theme-provider';
import { theme } from './theme';

export const App = () => (
  <ThemeProvider theme={theme}>
    <>...app</>
  </ThemeProvider>
);
```

## Applying the theme to the body element

By default, the `ThemeProvider` will render a `div` element, applying the correct localized styling to that element which follows the site tokens. You can also apply these rules to the `body` element as well using the `applyToBody` prop:

```tsx
<ThemeProvider theme={theme} applyToBody>
  ...
</ThemeProvider>
```

## `ThemeProvider` api

| Prop name | Description       |
| --------- | ----------------- |
| theme     | The partial theme |
