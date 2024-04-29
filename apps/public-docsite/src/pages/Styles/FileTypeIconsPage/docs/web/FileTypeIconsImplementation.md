The most durable and future-proof way to get the right icon for a file or item is to use the [react-file-type-icons package](https://github.com/microsoft/fluentui/tree/master/packages/react-file-type-icons) from Fluent UI (`@fluentui/react-file-type-icons` on npm).

The following code shows you how to specify a file type icon by extension, item type, icon size, and image type using the `@fluentui/react-file-type-icons` package along with Fluent UI's `<Icon>` component:

```jsx
// Done by the app.
import { initializeFileTypeIcons } from ‘@fluentui/react-file-type-icons’;
initializeFileTypeIcons(/* optional base url */);

// Done in components
import { Icon } from '@fluentui/react';
import { getFileTypeIconProps, FileIconType } from '@fluentui/react-file-type-icons';

<Icon {...getFileTypeIconProps({ extension: 'docx', size: 96, imageFileType: 'png' }) } />
<Icon {...getFileTypeIconProps({ type: FileIconType.folder, size: 20, imageFileType: 'svg' }) } />
```

When specifying `size`, stick to these default sizes so the images appear as intended. When specifying image file format (`imageFileType`) and `size`, consider the screen size and pixel density of the screen you're targeting. Note that Fabric Core includes custom media queries that will automatically display the PNG icons in a different resolution depending on the device's pixel density.

#### References

Here's a [simple demo](https://github.com/microsoft/fluentui/blob/master/packages/react-examples/src/react-experiments/FileTypeIcon/FileTypeIcon.Basic.Example.tsx) of how to use the [`@fluentui/react-file-type-icons` package](https://github.com/microsoft/fluentui/tree/master/packages/react-file-type-icons).  The code for the main method you'll use ([`getFileTypeIconProps`](https://github.com/microsoft/fluentui/blob/master/packages/react-file-type-icons/src/getFileTypeIconProps.ts)) is also well-commented. The icons are kept up-to-date on Fluent UI's CDN, so we recommend not copying or referencing these assets directly.

#### Map icons to extensions - [TypeScript mapping file](https://github.com/microsoft/fluentui/blob/master/packages/react-file-type-icons/src/FileTypeIconMap.ts)

This file maps file extensions to the right PNG or SVG icon. The mapping minimizes the number of required icons while maximizing the number of files that get a non-generic icon. Support for non-file system objects which may not have file extensions can be added in [getFileTypeIconProps.ts](https://github.com/microsoft/fluentui/blob/master/packages/react-file-type-icons/src/getFileTypeIconProps.ts) and [FileIconType.ts](https://github.com/microsoft/fluentui/blob/master/packages/react-file-type-icons/src/FileIconType.ts).
