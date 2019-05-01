To use the Office and Office 365 multicolor brand icons, select the format and size that best meets your needs. The following code shows you how to reference the file. Be sure to use the right resolution for the pixel density of the screen you’re targeting.

Office brand icons come in predefined dimensions at 16px, 48px, and 96px. Although you may overwrite icon sizes with your custom styles, we recommend using our icons at the predefined sizes so the images appear as intended. Fabric includes custom media queries that will display our PNG brand icons in a different resolution depending on the device's pixel density. See the code sample below for an example:

```jsx
// Sample code for displaying an Word 96x96px Icon
<div class="ms-BrandIcon--icon96 ms-BrandIcon--word" />
```

### File type icons

The most durable and future-proof way to get the right icon for a file or item is to use the [file-type-icons package from Fabric](https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/file-type-icons).  Here's a simple [demo of how](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/experiments/src/components/FileTypeIcon/examples/FileTypeIcon.Basic.Example.tsx).  The code for the main method you'll use ([`getFileTypeIconProps`](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/file-type-icons/src/getFileTypeIconProps.ts)) is also well-commented. The icons are served up from Fabric-CDN but you should not directly clone or reference these.

Using the new file type icons looks something like this:

```jsx
// Done by the app.
import { initializeFileTypeIcons } from ‘@uifabric/file-type-icons’;
initializeFileTypeIcons(/* optional base url */);

// Done in components
import { Icon } from 'office-ui-fabric-react';
import { getFileTypeIconProps, FileIconType } from '@uifabric/file-type-icons';

<Icon {...getFileTypeIconProps({ extension: 'docx', size: 96, imageFileType: 'png' }) } />
<Icon {...getFileTypeIconProps({ type: FileIconType.folder, size: 20, imageFileType: 'svg' }) } />
```

#### Map icons to extensions - [TypeScript mapping file](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/file-type-icons/src/FileTypeIconMap.ts)

This file describes the relationship between file extensions and the right icon PNG or SVG. We've done the work to minimize the number of required icons while maximizing the number of files that get a non-generic icon. To support non-filesystem objects which may not have file extensions, you will want to add them to [getFileTypeIconProps.ts](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/file-type-icons/src/getFileTypeIconProps.ts) and [FileIconType.ts](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/file-type-icons/src/FileIconType.ts).
