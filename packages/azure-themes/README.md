# @uifabric/azure-themes

**Azure theme for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**
([formerly Office UI Fabric React](https://developer.microsoft.com/en-us/office/blogs/ui-fabric-is-evolving-into-fluent-ui/))

The Azure themes require the following import statements:

```js
import { ThemeProvider } from '@fluentui/react';
import { AzureThemeLight, AzureThemeDark } from '@uifabric/azure-themes';
```

The theme may subsequently be set to either the Azure or Azure-Dark themes

```jsx
const theme = AzureThemeDark; // or alternatively AzureThemeLight

const App = () => (
  <ThemeProvider theme={theme}>
     App ...
  </ThemeProvider>;
);
```
