# [@uifabric/azure-themes](http://dev.microsoft.com/fabric)

##### Azure theme for Office UI Fabric React

The Azure themes require the following import statements:

```js
import { Fabric, Customizer } from 'office-ui-fabric-react';
import { AzureCustomizationsLight, AzureCustomizationsDark } from '@uifabric/azure-themes';
```

The theme may subsequently be set to either the Azure or Azure-Dark themes

```js
  const customizations = AzureCustomizationsDark // or alternatively AzureCustomizationsLight
  <Customizer {...customizations}>
    <Fabric>
        <div>{child component}</div>
    </Fabric>
  </Customizer>
```
