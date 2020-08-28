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

## Accessing theme

### useTheme

Theme can be accessed using `useTheme` hook. If you are specifically accessing theme to create classes/styles, you can use `makeStyles` below.

```jsx
import { useTheme } from '@fluentui/react-theme-provider';

const Content = () => {
  const theme = useTheme();
  ...
};

export const App = () => (
  <ThemeProvider>
    <Content />
  </ThemeProvider>
);
```

### ThemeContext.Consumer

Theme can be accessed in Class Component using `ThemeContext.Consumer`.

```tsx
import { Theme, ThemeContext } from '@fluentui/react-theme-provider';

class Content extends React.Component {
  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme: Theme | undefined) => {
          ...
        }}
      </ThemeContext.Consumer>
    );
  }
}

export const App = () => (
  <ThemeProvider>
    <Content />
  </ThemeProvider>
);
```

### Create classes for React components based on theme

Theme can be accessed using the `makeStyles` hook. This hook abstracts rendering css given the theme object:

```jsx
import { makeStyles } from '@fluentui/react-theme-provider';

const useFooStyles = makeStyles(theme => ({
    root: {
      background: theme.semanticColors.bodyBackground,
      ':hover': {
        background: theme.semanticColors.bodyBackgroundHovered
    },
}));

const Foo = props => {
  const classes = useFooStyles();

  return <div className={classes.root} />;
};
```
