# @uifabric/file-type-icons

**File type icons for [Office UI Fabric React](https://dev.microsoft.com/fabric)**

This package includes a collection of icons to represent file types.

## Getting started

If you are using Fabric React components, you can make all file type icons available by calling the `initializeFileTypeIcons` function from the `@uifabric/file-type-icons` package:

```tsx
import { initializeFileTypeIcons } from '@uifabric/file-type-icons';

// Register icons and pull the fonts from the default SharePoint cdn.
initializeFileTypeIcons();

// ...or, register icons and pull the fonts from your own cdn:
initializeFileTypeIcons('https://my.cdn.com/path/to/icons/');
```

## Usage in code

If you are using Fabric React, you can use the `Icon` component and pass in the corresponding icon properties to render a given icon.

```tsx
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { getFileTypeIconProps } from '@uifabric/file-type-icons';

<Icon {...getFileTypeIconProps({extension: 'docx', size: 16}) />
```

## Fluent file type icons

You can use the new Fluent file type icons as they become available by passing the following path to `initializeFileTypeIcons`:

```tsx
initializeFileTypeIcons('https://spoprod-a.akamaihd.net/files/fabric/assets/item-types-fluent/');
```

In Fabric 7, the new Fluent file type icons will be the default.

## Notes

See [Office UI Fabric React](https://github.com/OfficeDev/office-ui-fabric-react) for more details on the UI Fabric project and packages within.
