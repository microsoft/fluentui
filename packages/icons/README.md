# @uifabric/icons

**Icons for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**
([formerly Office UI Fabric React](https://developer.microsoft.com/en-us/office/blogs/ui-fabric-is-evolving-into-fluent-ui/))

Fluent UI React Icons includes a collection of 1100+ icons which you can use in your application.

## Getting started

If you are using Fluent UI React components, you can make all icons available by calling the `initializeIcons` function from the `@uifabric/icons` package:

```tsx
import { initializeIcons } from '@uifabric/icons';

// Register icons and pull the fonts from the default SharePoint cdn.
initializeIcons();

// ...or, register icons and pull the fonts from your own cdn:
initializeIcons('https://my.cdn.com/path/to/icons/');
```

This will make ALL icons in the collection available, but will download them on demand when referenced using the `@uifabric/styling` APIs `getIcon` or `getIconClassName`.

## Usage in code

### Icon component

If you are using Fluent UI React, you can use the `Icon` component and pass in the corresponding iconName property to render a given icon.

```tsx
import { Icon } from '@fluentui/react/lib/Icon';

<Icon iconName="Snow" />;
```

### `getIconClassName` API

The styling package includes a `getIconClassName` API which can provide a css class to use for rendering the icon manually using the `:before` pseudoselector:

```ts
import { getIconClassName } from '@uifabric/styling';

return `<i class="${getIconClassName('Snow')}" />`;
```

## Notes

See [GitHub](https://github.com/microsoft/fluentui) for more details on the Fluent UI React project and packages within.
