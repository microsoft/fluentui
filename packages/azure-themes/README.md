# @uifabric/azure-themes

**Azure theme for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**
([formerly Office UI Fabric React](https://developer.microsoft.com/en-us/office/blogs/ui-fabric-is-evolving-into-fluent-ui/))

The Azure themes require the following import statements:

```js
import { Fabric, Customizer } from '@fluentui/react';
import { AzureCustomizationsLight, AzureCustomizationsDark } from '@fluentui/azure-themes';
```

The theme may subsequently be set to either the Azure or Azure-Dark themes

```jsx
  const customizations = AzureCustomizationsDark // or alternatively AzureCustomizationsLight
  <Customizer {...customizations}>
    <Fabric>
        <div>{child component}</div>
    </Fabric>
  </Customizer>
```
