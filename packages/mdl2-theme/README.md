# @uifabric/mdl2-theme

**MDL2 Theme package for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**
([formerly Office UI Fabric React](https://developer.microsoft.com/en-us/office/blogs/ui-fabric-is-evolving-into-fluent-ui/))

This package contains MDL2 coloring, theming and styling for use with Fluent UI React components.

To import MDL2 theme:

```js
import { MDL2Theme, MDL2Customizations } from '@uifabric/mdl2-theme';
```

In case of applying theme using `Customizer`:

```jsx
  import { Customizer } from '@fluentui/react';

  <Customizer {...MDL2Customizations}>
    <div>{child component}</div>
  </Customizer>
```

In case of applying theme using `ThemeProvider`:

```jsx
  import { ThemeProvider } from '@fluentui/react-theme-provider';

  <ThemeProvider theme={MDL2Theme}>
    <div>{child component}</div>
  </ThemeProvider>
```
