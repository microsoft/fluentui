# @fluentui/react-theme-provider

**React theming component and hook for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

## Installation

```bash
yarn add @fluentui/react-theme-provider
```

## Example usage

Use the theme with Fluent UI by wrapping content within the provider. If `theme` is not provided, default (Fluent) theme will be provided:

```tsx
import { ThemeProvider } from '@fluentui/react-theme-provider';

export const App = () => (
  <ThemeProvider>
    <>...app</>
  </ThemeProvider>
);
```

You can also customize your own theme:

```tsx
import { ThemeProvider } from '@fluentui/react-theme-provider';

export const theme: Theme = {
  /* Provide any stylesheets which should come along with the theme */
  stylesheets: [
    '.className { ... }',
    ...
  ],

  /* Provide standard fluent tokens here. */
  tokens: {
    body: {
      fill: '#fafafa',
      text: '#333'
    }
  }
};

export const App = () => (
  <ThemeProvider theme={theme}>
    <>...app</>
  </ThemeProvider>
);
```

You can apply component-level styles:

```tsx
import { Checkbox } from '@fluentui/react';
import { ThemeProvider, createTheme } from '@fluentui/react-theme-provider';

export const App = () => (
  <ThemeProvider
    theme={{
      components: { Checkbox: { styles: { root: { background: 'red' } } } },
    }}
  >
    <Checkbox />
  </ThemeProvider>
);
```
