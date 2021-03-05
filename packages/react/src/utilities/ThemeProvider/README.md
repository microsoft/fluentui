# ThemeProvider

Utilities for accessing and providing contextual theme.

## Example usage

Use the theme with Fluent UI by wrapping content within the provider. If `theme` is not provided, default (Fluent) theme will be provided:

```tsx
import { ThemeProvider } from '@fluentui/react';

export const App = () => (
  <ThemeProvider>
    <>...app</>
  </ThemeProvider>
);
```

You can also customize your own theme:

```tsx
import { ThemeProvider, PartialTheme } from '@fluentui/react';

const appTheme: PartialTheme = {
  palette: {
    themePrimary: 'red'
    ...
  }
};

export const App = () => (
  <ThemeProvider theme={appTheme}>
    App content ...
  </ThemeProvider>
);
```

You can also nest `ThemeProvider`s:

```tsx
import { ThemeProvider, PartialTheme } from '@fluentui/react';

const appTheme: PartialTheme = {
  palette: {
    themePrimary: 'red'
    ...
  }
};

const headerTheme: PartialTheme = {
  palette: {
    themePrimary: 'orange'
    ...
  }
};

export const App = () => (
  <ThemeProvider theme={appTheme}>
    <ThemeProvider theme={headerTheme}>
      <MyHeader />
    </ThemeProvider>

    App content ...
  </ThemeProvider>
);
```

You can apply component-level styles:

```tsx
import { Checkbox, ThemeProvider, createTheme } from '@fluentui/react';

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

Theme can be accessed using `useTheme` hook. If you are specifically accessing theme to create classes/styles, you can use `makeStyles` described below.

```jsx
import { useTheme } from '@fluentui/react';

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
import { Theme, ThemeContext } from '@fluentui/react';

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
import { makeStyles } from '@fluentui/react';

const useFooStyles = makeStyles(theme => ({
  root: {
    background: theme.semanticColors.bodyBackground,
    ':hover': {
      background: theme.semanticColors.bodyBackgroundHovered,
    },
  },
}));

const Foo = props => {
  const classes = useFooStyles();

  return <div className={classes.root} />;
};
```

## How does this change other existing ways of theming Fluent UI components?

### Customizer

`Customizer` is now deprecated and you should replace it with `ThemeProvider`.
`CustomizerContext` is now deprecated and you should replace it with `ThemeContext` or `useTheme` hook.

Deprecations will remain functional as is in Fluent UI v8 but will be removed during the Fluent UI v9 release.

#### Replace settings prop

Before:

```jsx
<Customizer settings={{ theme }} />
```

After:

```jsx
<ThemeProvider theme={theme} />
```

#### Replace scopedSettings prop

Before:

```jsx
<Customizer
  scopedSettings={{
    Checkbox: {
      styles: CheckboxStyles,
    },
  }}
/>
```

After:

```jsx
<ThemeProvider
  theme={{
    components: { Checkbox: { styles: CheckboxStyles } },
  }}
/>
```

#### Replace CustomizerContext

Before:

```jsx
  <CustomizerContext.Consumer>
    {(parentContext: ICustomizerContext) => {
      const theme = parentContext.customizations.settings;
      ...
    }
  </CustomizerContext.Consumer>
```

After:
See options in [Accessing theme](https://github.com/microsoft/fluentui/blob/master/packages/react/README.md#accessing-theme).

### loadTheme

`loadTheme` remains to work as is. However, you are recommended to replace `loadTheme` with `ThemeProvider`. That way, your application consistently has one way of providing theme.

To do that, instead of calling `loadTheme(your_theme)`, you will simply wrap the root component of your React application once with `ThemeProvider`:

```jsx
<ThemeProvider theme={your_theme}>
  <App />
</ThemeProvider>
```

One caveat here is that if you app has styles which relies on `@microsoft/load-themed-styles`, `ThemeProvider` won't be able to replace `loadTheme` in this case.

### Fabric component

Instead of using `Fabric` component, you can now replace it fully with `ThemeProvider`. Here is how to replace each prop usage:

| Fabric             | ThemeProvider                                                                                                                                                                                       |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `componentRef`     | `ref`                                                                                                                                                                                               |
| `as`               | `as`                                                                                                                                                                                                |
| `theme`            | `theme`                                                                                                                                                                                             |
| `styles`           | Not longer support `styles` prop. If you need to style the root element, you can do that using (inline) style or className prop. Setting arbitrary styles for document body is no longer supported. |
| `applyTheme`       | This is now applied by default, or by setting `applyTo="element"`. If you don't want any body styles to be applied on root element, you can set `applyTo="none"`.                                   |
| `applyThemeToBody` | `applyTo="body"`                                                                                                                                                                                    |
| `dir`              | set `rtl` in `theme` prop                                                                                                                                                                           |

#### Other call-outs

- `ThemeProvider` by default sets `background-color` for the root element using `theme.semanticColors.bodyBackground`. If you find the background color being incorrect after switching to `ThemeProvider`, the right fix is likely that you need to update your theme definition to have the correct `bodyBackground`. Or, if you don't want any default stylings applied to the root element, you can set `applyTo` prop to `"none"`.
- `ThemeProvider` does not set `font-family: inherit` on all native `button`, `input`, `textArea` elements. If you find any Fluent UI component having incorrect fonts after switching to `ThemeProvider`, please [report an issue](https://github.com/microsoft/fluentui/issues/new?template=bug_report.md).
