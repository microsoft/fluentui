# @fluentui/react-file-type-icons

**File Type Icons components for [Fluent UI React](https://react.fluentui.dev/)**

## Components

### FileTypeIcon

Displays an icon representing a file type based on its extension or a special type (like folder). Automatically selects the appropriate icon from the Fluent Design file type icon set.

#### Features

- 🎨 **100+ file type icons** - Supports all common file extensions
- 📏 **Multiple sizes** - 16, 20, 24, 32, 40, 48, 64, and 96 pixels
- 🖼️ **Format support** - SVG (default) or PNG
- 📁 **Special types** - Folder, list items, and other non-file icons
- ♿ **Accessible** - Proper alt text for screen readers

## Usage

### Basic Examples

```tsx
import { FileTypeIcon, FileIconType } from '@fluentui/react-file-type-icons';

// File extension
<FileTypeIcon extension="docx" size={48} />

// Special type
<FileTypeIcon type={FileIconType.folder} size={32} />

// Common file types
<FileTypeIcon extension="pdf" />
<FileTypeIcon extension="xlsx" />
<FileTypeIcon extension="mp4" />
```

### Sizes

```tsx
<FileTypeIcon extension="docx" size={16} />
<FileTypeIcon extension="docx" size={24} />
<FileTypeIcon extension="docx" size={32} />
<FileTypeIcon extension="docx" size={48} />
```

### Image Format

```tsx
// SVG (default, recommended)
<FileTypeIcon extension="docx" imageFileType="svg" />

// PNG (for legacy scenarios)
<FileTypeIcon extension="docx" imageFileType="png" />
```

### Custom CDN

```tsx
<FileTypeIcon extension="docx" baseUrl="https://my-cdn.com/file-icons/" />
```

### Custom Styling

```tsx
<FileTypeIcon extension="docx" className="my-class" style={{ borderRadius: '4px' }} />
```

## Migration from v8

If you're migrating from `@fluentui/react-file-type-icons` (v8), see the [Migration Guide](./MIGRATION.md).

**v8:**

```tsx
import { getFileTypeIconProps } from '@fluentui/react-file-type-icons';
const iconProps = getFileTypeIconProps({ extension: 'docx', size: 48 });
<img src={iconProps.iconName} alt="Document" />;
```

**v9:**

```tsx
import { FileTypeIcon } from '@fluentui/react-file-type-icons';
<FileTypeIcon extension="docx" size={48} />;
```

## Utilities

Underlying utilities are exported for advanced use cases:

```tsx
import { getFileTypeIconProps, getFileTypeIconAsUrl, FileIconType } from '@fluentui/react-file-type-icons';

// Get icon URL
const url = getFileTypeIconAsUrl({ extension: 'docx', size: 48 });

// Get icon props
const props = getFileTypeIconProps({ extension: 'docx', size: 48 });
```

## API

See [Fluent UI Storybook](https://aka.ms/fluentui-storybook) for full API documentation and interactive examples.
