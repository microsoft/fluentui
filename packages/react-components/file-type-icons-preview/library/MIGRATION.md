# Migration Guide: react-file-type-icons to react-file-type-icons-preview

This guide helps you migrate from `@fluentui/react-file-type-icons` (v8) to `@fluentui/react-file-type-icons-preview` (v9).

## Overview

The v9 version provides a React component-based API instead of utility functions, following Fluent UI v9 patterns and conventions.

## Package Installation

```bash
# Remove the v8 package
npm uninstall @fluentui/react-file-type-icons

# Install the v9 preview package
npm install @fluentui/react-file-type-icons-preview
```

## Breaking Changes

### 1. Component-based API instead of utility functions

**v8 (utility-based):**

```tsx
import { getFileTypeIconProps, FileIconType } from '@fluentui/react-file-type-icons';

const iconProps = getFileTypeIconProps({ extension: 'docx', size: 48 });
<img src={iconProps.iconName} alt="Document" />;
```

**v9 (component-based):**

```tsx
import { FileTypeIcon } from '@fluentui/react-file-type-icons-preview';

<FileTypeIcon extension="docx" size={48} />;
```

### 2. Simplified Props

The v9 component automatically handles icon name resolution and URL construction internally.

**v8:**

```tsx
const iconProps = getFileTypeIconProps({
  extension: 'docx',
  size: 48,
  imageFileType: 'png',
});
// Manually construct URL and set on img element
```

**v9:**

```tsx
<FileTypeIcon extension="docx" size={48} imageFileType="png" />
```

### 3. Type Usage

**v8:**

```tsx
import { FileIconType, getFileTypeIconProps } from '@fluentui/react-file-type-icons';

const iconProps = getFileTypeIconProps({ type: FileIconType.folder });
```

**v9:**

```tsx
import { FileTypeIcon, FileIconType } from '@fluentui/react-file-type-icons-preview';

<FileTypeIcon type={FileIconType.folder} />;
```

### 4. Custom Base URL

**v8:**

```tsx
const iconProps = getFileTypeIconProps({
  extension: 'docx',
  size: 48,
});
const customUrl = `https://my-cdn.com/${iconProps.iconName}`;
```

**v9:**

```tsx
<FileTypeIcon extension="docx" size={48} baseUrl="https://my-cdn.com/assets/item-types/" />
```

## Migration Examples

### Example 1: Document Icon

**Before (v8):**

```tsx
import { getFileTypeIconProps } from '@fluentui/react-file-type-icons';

function DocumentItem({ filename }) {
  const extension = filename.split('.').pop();
  const iconProps = getFileTypeIconProps({ extension, size: 32 });

  return (
    <div>
      <img src={iconProps.iconName} alt={filename} style={{ width: 32, height: 32 }} />
      <span>{filename}</span>
    </div>
  );
}
```

**After (v9):**

```tsx
import { FileTypeIcon } from '@fluentui/react-file-type-icons-preview';

function DocumentItem({ filename }) {
  const extension = filename.split('.').pop();

  return (
    <div>
      <FileTypeIcon extension={extension} size={32} />
      <span>{filename}</span>
    </div>
  );
}
```

### Example 2: Folder Icon

**Before (v8):**

```tsx
import { getFileTypeIconProps, FileIconType } from '@fluentui/react-file-type-icons';

const folderIconProps = getFileTypeIconProps({
  type: FileIconType.folder,
  size: 48,
});

<img src={folderIconProps.iconName} alt="Folder" />;
```

**After (v9):**

```tsx
import { FileTypeIcon, FileIconType } from '@fluentui/react-file-type-icons-preview';

<FileTypeIcon type={FileIconType.folder} size={48} />;
```

### Example 3: Dynamic File List

**Before (v8):**

```tsx
import { getFileTypeIconProps } from '@fluentui/react-file-type-icons';

function FileList({ files }) {
  return (
    <ul>
      {files.map(file => {
        const extension = file.name.split('.').pop();
        const iconProps = getFileTypeIconProps({ extension, size: 24 });

        return (
          <li key={file.id}>
            <img src={iconProps.iconName} alt={file.name} style={{ width: 24, height: 24 }} />
            {file.name}
          </li>
        );
      })}
    </ul>
  );
}
```

**After (v9):**

```tsx
import { FileTypeIcon } from '@fluentui/react-file-type-icons-preview';

function FileList({ files }) {
  return (
    <ul>
      {files.map(file => {
        const extension = file.name.split('.').pop();

        return (
          <li key={file.id}>
            <FileTypeIcon extension={extension} size={24} />
            {file.name}
          </li>
        );
      })}
    </ul>
  );
}
```

## Utilities Still Available

If you need to access the underlying utilities for custom use cases, they are still exported:

```tsx
import {
  getFileTypeIconProps,
  FileIconType,
  getFileTypeIconNameFromExtensionOrType,
} from '@fluentui/react-file-type-icons-preview';

// Use utilities if you need custom logic
const iconName = getFileTypeIconNameFromExtensionOrType({ extension: 'docx' });
```

## Benefits of Migration

1. **Simpler API**: Use a React component instead of manually handling URLs and img elements
2. **Better TypeScript**: Full type safety with v9's improved type definitions
3. **Consistent with Fluent UI v9**: Follows the same patterns as other v9 components
4. **Automatic optimization**: The component handles pixel ratio and image format internally
5. **Better accessibility**: Built-in alt text and ARIA support

## Feature Parity

The v9 package maintains full feature parity with v8:

- ✅ All file type icons (100+ extensions)
- ✅ Special types (folder, genericFile, listItem, etc.)
- ✅ All sizes (16, 20, 24, 32, 40, 48, 64, 96)
- ✅ SVG and PNG support
- ✅ Custom base URL
- ✅ Device pixel ratio handling

## Need Help?

If you encounter issues during migration:

1. Check the [Storybook examples](https://aka.ms/fluentui-storybook)
2. Review the [API documentation](https://aka.ms/fluentui-api)
3. Open an issue on [GitHub](https://github.com/microsoft/fluentui)
