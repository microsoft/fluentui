# [Office UI Fabric - File Type Icons](http://dev.office.com/fabric)

##### The React-based front-end framework for building experiences for Office and Office 365.

Fabric File Type Icons includes a collection of icons to represent file types.


# Getting started

If you are using Fabric React components, you can make all file type icons available by calling the `initializeFileTypeIcons` function from the `@uifabric/file-type-icons` package:

```tsx
import { initializeFileTypeIcons } from '@uifabric/file-type-icons';

// Register icons and pull the fonts from the default SharePoint cdn.
initializeFileTypeIcons();

// ...or, register icons and pull the fonts from your own cdn:
initializeFileTypeIcons('https://my.cdn.com/path/to/icons/');
```

# Usage in code

If you are using Fabric React, you can use the `Icon` component and pass in the corresponding icon properties to render a given icon.

```tsx
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { getFileTypeIconProps } from '@uifabric/file-type-icons';

<Icon {...getFileTypeIconProps({extension: 'docx', size: 16}) />
```

# Notes

See [Office UI Fabric React](http://github.com/OfficeDev/office-ui-fabric-react) for more details on the UI Fabric project and packages within.
