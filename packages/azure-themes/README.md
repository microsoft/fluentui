# @fluentui/azure-themes

**Azure theme for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**
([formerly Office UI Fabric React](https://developer.microsoft.com/en-us/office/blogs/ui-fabric-is-evolving-into-fluent-ui/))

The Azure themes require the following import statements:

```js
import {
  AzureThemeLight,
  AzureThemeDark,
  AzureThemeHighContrastLight,
  AzureThemeHighContrastDark,
} from '@fluentui/azure-themes';
```

In case of applying theme using `ThemeProvider`:

```jsx
  import { ThemeProvider } from '@fluentui/react';
  const theme = AzureThemeDark; // or alternatively AzureThemeLight

  <ThemeProvider theme={theme}>
    <div>{child component}</div>
  </ThemeProvider>
```
