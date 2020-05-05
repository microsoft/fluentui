# @fluentui/react-theme-provider

**React theming component and hook for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

## Installation

```bash
yarn add @fluentui/react-theme-provider
```

## Example usage

First, ensure you use an existing theme, or create your own. Example:

```js
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

## `ThemeProvider` api

The `ThemeProvider` component takes all default `div` html attributes, in addition to the following:

| Prop name | Description       |
| --------- | ----------------- |
| theme     | The partial theme |
