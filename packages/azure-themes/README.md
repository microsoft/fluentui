# @uifabric/azure-themes

**Azure theme for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**
([formerly Office UI Fabric React](https://developer.microsoft.com/en-us/office/blogs/ui-fabric-is-evolving-into-fluent-ui/))

The Azure themes require the following import statements:

```js
import {
  AzureThemeDark,
  AzureThemeLight,
  AzureCustomizationsLight,
  AzureCustomizationsDark,
} from '@uifabric/azure-themes';
```

The theme may subsequently be set to either the Azure or Azure-Dark themes.

In case of applying theme using `Customizer`:

```jsx
  import { Customizer } from '@fluentui/react';
  const customizations = AzureCustomizationsDark; // or alternatively AzureCustomizationsLight

  <Customizer {...customizations}>
    <div>{child component}</div>
  </Customizer>
```

In case of applying theme using `ThemeProvider`:

```jsx
  import { ThemeProvider } from '@fluentui/react-theme-provider';
  const theme = AzureThemeDark; // or alternatively AzureThemeLight

  <ThemeProvider theme={theme}>
    <div>{child component}</div>
  </ThemeProvider>
```
