# @fluentui/react-theme-provider

**React theming component and hook for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

## Installation

```bash
yarn add @fluentui/react-theme-provider
```

## Example usage

Use the theme with Fluent UI by wrapping content within the provider:

```tsx
import { webLightTheme } from '@fluentui/react-theme';
import { ThemeProvider } from '@fluentui/react-theme-provider';

export const App = () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
```

You can also nest `ThemeProvider`s:

```tsx
import { webLightTheme, PartialTheme } from '@fluentui/react-theme';
import { ThemeProvider } from '@fluentui/react-theme-provider';

const headerTheme: PartialTheme = {
  /* your customizations */
};

export const App = () => (
  <ThemeProvider theme={webLightTheme}>
    <ThemeProvider theme={headerTheme}>
      <App />
    </ThemeProvider>

    <App />
  </ThemeProvider>
);
```

## Accessing theme

### useTheme

Theme can be accessed using `useTheme` hook.

```jsx
import { useTheme } from '@fluentui/react-theme-provider';

const Content = () => {
  const theme = useTheme();
};

export const App = () => (
  <ThemeProvider>
    <Content />
  </ThemeProvider>
);
```
