# @fluentui/file-type-icons-preview

**File Type Icons components for [Fluent UI React](https://react.fluentui.dev/)**

These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

## Components

### FileTypeIcon

The `FileTypeIcon` component displays an icon representing a file type based on its extension or a special type (like folder). It automatically selects the appropriate icon from the Fluent Design file type icon set.

#### Features

- 🎨 **100+ file type icons** - Supports all common file extensions
- 📏 **Multiple sizes** - 16, 20, 24, 32, 40, 48, 64, and 96 pixels
- 🖼️ **Format support** - Renders icons as SVG or PNG
- 📁 **Special types** - Folder, list items, and other non-file icons
- ♿ **Accessible** - Includes proper alt text for screen readers
- 🎯 **Automatic optimization** - Handles device pixel ratio for crisp display

## Usage

### Basic Usage

```tsx
import { FileTypeIcon } from '@fluentui/react-file-type-icons-preview';

// Display a Word document icon
<FileTypeIcon extension="docx" size={48} />

// Display a folder icon
<FileTypeIcon type={FileIconType.folder} size={32} />
```

### File Extensions

The component recognizes 100+ file extensions:

```tsx
import { FileTypeIcon } from '@fluentui/react-file-type-icons-preview';

<FileTypeIcon extension="docx" />  // Word document
<FileTypeIcon extension="xlsx" />  // Excel spreadsheet
<FileTypeIcon extension="pptx" />  // PowerPoint presentation
<FileTypeIcon extension="pdf" />   // PDF document
<FileTypeIcon extension="zip" />   // Archive file
<FileTypeIcon extension="mp4" />   // Video file
<FileTypeIcon extension="jpg" />   // Image file
```

### Sizes

All standard Fluent UI icon sizes are supported:

```tsx
<FileTypeIcon extension="docx" size={16} />
<FileTypeIcon extension="docx" size={20} />
<FileTypeIcon extension="docx" size={24} />
<FileTypeIcon extension="docx" size={32} />
<FileTypeIcon extension="docx" size={40} />
<FileTypeIcon extension="docx" size={48} />
<FileTypeIcon extension="docx" size={64} />
<FileTypeIcon extension="docx" size={96} />
```

### Special Types

Use the `type` prop for non-extension-based icons:

```tsx
import { FileTypeIcon, FileIconType } from '@fluentui/react-file-type-icons-preview';

<FileTypeIcon type={FileIconType.folder} />
<FileTypeIcon type={FileIconType.genericFile} />
<FileTypeIcon type={FileIconType.sharedFolder} />
<FileTypeIcon type={FileIconType.listItem} />
<FileTypeIcon type={FileIconType.docset} />
```

### Image Format

Choose between SVG (default) or PNG:

```tsx
// SVG (default, recommended for most cases)
<FileTypeIcon extension="docx" imageFileType="svg" />

// PNG (better for certain legacy scenarios)
<FileTypeIcon extension="docx" imageFileType="png" />
```

### Custom CDN

Override the default Fluent CDN with your own:

```tsx
<FileTypeIcon extension="docx" baseUrl="https://my-cdn.com/file-icons/" />
```

### With Custom Styling

Apply custom className or style:

```tsx
<FileTypeIcon extension="docx" className="my-custom-class" style={{ borderRadius: '4px' }} />
```

## Migration from v8

If you're migrating from `@fluentui/react-file-type-icons` (v8), see the [Migration Guide](./MIGRATION.md).

### Quick Comparison

**v8 (utility-based):**

```tsx
import { getFileTypeIconProps } from '@fluentui/react-file-type-icons';

const iconProps = getFileTypeIconProps({ extension: 'docx', size: 48 });
<img src={iconProps.iconName} alt="Document" />;
```

**v9 (component-based):**

```tsx
import { FileTypeIcon } from '@fluentui/react-file-type-icons-preview';

<FileTypeIcon extension="docx" size={48} />;
```

## Utilities

The underlying utilities are also exported for advanced use cases:

```tsx
import {
  getFileTypeIconProps,
  FileIconType,
  getFileTypeIconNameFromExtensionOrType,
  FileTypeIconMap,
} from '@fluentui/react-file-type-icons-preview';

// Get icon name for custom logic
const iconName = getFileTypeIconNameFromExtensionOrType({ extension: 'docx' });

// Get full icon props
const iconProps = getFileTypeIconProps({ extension: 'docx', size: 48 });
```

## API

See [Fluent UI Storybook](https://aka.ms/fluentui-storybook) for full API documentation and interactive examples.
