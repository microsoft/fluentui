# [Office UI Fabric - Icons](http://dev.office.com/fabric)

##### The React-based front-end framework for building experiences for Office and Office 365.

Fabric Icons includes a collection of 1100+ icons which you can use in your application.

The library is rather large; downloading the entire font is more than 80k gzipped. Even the definitions of the codes can be large, so it is important to your application performance that you download the icons you need, rather than the entire set.

# Getting started

If you are using Fabric React components, you can make all icons available by calling the `initializeIcons` function from the `@uifabric/icons` package:

```tsx
import { initializeIcons } from '@uifabric/icons';

initializeIcons();
```

This will make ALL icons in the collection available, but will download them on demand.

# Reducing the download size

If you are simply using Fabric React components, you can initialize only the core icons:

```tsx
import { initializeIcons } from '@uifabric/icons/lib/iconSets/core';

initializeIcons();
```

# Creating your own subsets

TODO

# Usage in code

## getIcon API

If you are using Fabric React, you can use the `Icon` component and pass in the corresponding iconName property to render a given icon.

```tsx
<Icon iconName='Snow' />
```

The styling package includes a `getIcon` api which returns information about a given icon, including subset className and the icon code. This can be used to render icons in other frameworks.

## getIconClassName API

In special cases you may would prefer to simply get an icon class name, which can be attached to an `I` element. You can use the getIconClassName api in the styling package.

```ts
import { getIconClassName } from '@uifabric/styling';

return `<i class="${getIconClassName('Snow')}" />`;
```

# Notes

See [Office UI Fabric React](http://github.com/OfficeDev/office-ui-fabric-react) for more details on the UI Fabric project and packages within.
