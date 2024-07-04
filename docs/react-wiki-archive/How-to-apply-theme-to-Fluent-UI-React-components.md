Once you have defined the [`theme`](https://github.com/microsoft/fluentui/wiki/Theming) for your app, you need to apply the theme. Fluent UI React currently supports multiple ways of applying theme. Below is detailed guidance on the recommended and possible approaches.

- [ThemeProvider (in preview)](#themeprovider-in-preview)
- [loadTheme](#loadtheme)
- [Customizer (deprecated/legacy)](#customizer-deprecatedlegacy)

## ThemeProvider (in preview)

Starting in `@fluentui/react@8`, we've introduced a new component called `ThemeProvider`. It's designed to provide a contextual theme down to its child components. By default, it provides the Fluent theme. You can pass a partial or full theme you have created using `theme` prop. `ThemeProvider` will then merge it with the default (Fluent) theme and provide down to its children.

**NOTE:** `ThemeProvider` was previously published under `@fluentui/react-theme-provider`. For various reasons, it was moved from that package into `@fluentui/react` itself in version 8, so **do not use `@fluentui/react-theme-provider` in version 8.**

Here is a basic example of using `ThemeProvider`:

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

You can find more examples and supported props of `ThemeProvider` [here](https://fabricweb.z5.web.core.windows.net/oufr/8.0.0-beta.2/#/examples/themeprovider).

`ThemeProvider` is supported with version 8 of Fluent UI React. Note that we don't plan to re-export `ThemeProvider` from version 7. If really needed, you can still use `ThemeProvider` on version 7 by importing it from `@fluentui/react-theme-provider@0` package (see this example [here](https://codesandbox.io/s/themeprovider-for-v7-28ihm?file=/src/App.tsx)). However we recommend you start to adopt `ThemeProvider` after your application is upgraded to version 8.

## loadTheme

`loadTheme` is a way to provide a theme in global (and only global) scope, which will affect your entire application.

If you are `loadTheme` today, it's recommended to replace it with `ThemeProvider`. That way, your application consistently has one way of providing a theme.

One caveat here is that if you app has styles which is authored in raw CSS which uses theming tokens and relies on `@microsoft/load-themed-styles`, `ThemeProvider` won't be able to replace `loadTheme` in this case without the need to re-write the styles. Only `loadTheme` calls `loadTheme` from `@microsoft/load-themed-styles` internally.

Here is a basic example of using `loadTheme`:

```tsx
import { loadTheme, createTheme, Theme } from '@fluentui/react';

// Note:
// `loadTheme` does not support passing partial theme.
// You must create a full theme (using `createTheme`).
const appTheme: Theme = createTheme({
  palette: {
    themePrimary: 'red'
    ...
  }
});

loadTheme(appTheme);

export const App = () => (
  <>
    App content ...
  </>
);
```

## Customizer (deprecated/legacy)

Starting from `@fluentui/react` version 8, `Customizer` is deprecated in favor of `ThemeProvider`. Compared to `ThemeProvider`, `Customizer` is not type-safe and does not support partial themes. For the sole purpose of providing and consuming a theme in your app, `ThemeProvider` is able to do everything `Customizer` can do today. You can learn more about how to replace `Customizer` with `ThemeProvider` [here](https://github.com/microsoft/fluentui/blob/master/packages/react/src/utilities/ThemeProvider/README.md#customizer).

(If you're using `Customizer` for purposes besides theming, please let us know.)
