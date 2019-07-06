# [Office UI Fabric - Icons](http://dev.office.com/fabric)

##### The React-based front-end framework for building experiences for Office and Office 365.

Fabric Icons includes a collection of 1100+ icons which you can use in your application.

# Getting started

If you are using Fabric React components, you can make all icons available by calling the `initializeIcons` function from the `@uifabric/icons` package:

```tsx
import { initializeIcons } from '@uifabric/icons';

// Register icons and pull the fonts from the default SharePoint cdn.
initializeIcons();

// ...or, register icons and pull the fonts from your own cdn:
initializeIcons('https://my.cdn.com/path/to/icons/');
```

This will make ALL icons in the collection available, but will download them on demand when referenced using the `@uifabric/styling` APIs `getIcon` or `getIconClassName`.

# Usage in code

## getIcon API

If you are using Fabric React, you can use the `Icon` component and pass in the corresponding iconName property to render a given icon.

```tsx
import { Icon } from 'office-ui-fabric-react/lib/Icon';

<Icon iconName="Snow" />;
```

The styling package includes a `getIconClassName` api which can provide a css class to use for rendering the icon manually using the `:before` pseudoselector:

```ts
import { getIconClassName } from '@uifabric/styling';

return `<i class="${getIconClassName('Snow')}" />`;
```

# Notes

See [Office UI Fabric React](http://github.com/OfficeDev/office-ui-fabric-react) for more details on the UI Fabric project and packages within.
