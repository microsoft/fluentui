# Migration Guide: react-file-type-icons to react-file-type-icons

This guide helps you migrate from `@fluentui/react-file-type-icons` (v8) to `@fluentui/react-file-type-icons` (v9).

## Overview

The v9 version provides a **modern React component-based API** while maintaining **full backward compatibility** with all v8 utility functions.

**Key Points:**

- ✅ All v8 utilities exported and work identically
- ✅ No breaking API changes for utility functions
- 🆕 New component API available (recommended but optional)

## Installation

```bash
npm install @fluentui/react-file-type-icons
```

## What's Changed

### Package Name (Breaking Change)

The only breaking change is the package name:

- **Old**: `@fluentui/react-file-type-icons`
- **New**: `@fluentui/react-file-type-icons`

### New Component API (Recommended)

**v8 (utility-based) - Still works:**

```tsx
import { getFileTypeIconProps } from '@fluentui/react-file-type-icons';

const iconProps = getFileTypeIconProps({ extension: 'docx', size: 48 });
<img src={iconProps.iconName} alt="Document" />;
```

**v9 (component-based) - Recommended:**

```tsx
import { FileTypeIcon } from '@fluentui/react-file-type-icons';

<FileTypeIcon extension="docx" size={48} />;
```

## Migration Examples

### Document Icons

**Before:**

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

**After:**

```tsx
import { FileTypeIcon } from '@fluentui/react-file-type-icons';

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

### Folder Icons

**Before:**

```tsx
import { getFileTypeIconProps, FileIconType } from '@fluentui/react-file-type-icons';

const iconProps = getFileTypeIconProps({ type: FileIconType.folder, size: 48 });
<img src={iconProps.iconName} alt="Folder" />;
```

**After:**

```tsx
import { FileTypeIcon, FileIconType } from '@fluentui/react-file-type-icons';

<FileTypeIcon type={FileIconType.folder} size={48} />;
```

## Incremental Migration

**You don't have to migrate all code at once!** All v8 utilities work identically in v9:

```tsx
import {
  FileTypeIcon, // v9 component (new)
  getFileTypeIconAsUrl, // v8 utility (still works)
} from '@fluentui/react-file-type-icons';

function MyComponent() {
  return (
    <div>
      {/* Old code - still works */}
      <img src={getFileTypeIconAsUrl({ extension: 'docx', size: 32 })} alt="Document" />

      {/* New code - recommended */}
      <FileTypeIcon extension="docx" size={32} />
    </div>
  );
}
```

## Benefits of the New Component API

1. **Simpler** - No manual URL handling or img element construction
2. **Better TypeScript** - Full type safety with v9's type definitions
3. **Accessible** - Built-in alt text and ARIA support
4. **Optimized** - Automatic pixel ratio and format handling

## Need Help?

If you encounter issues:

1. Check the [Storybook examples](https://aka.ms/fluentui-storybook)
2. Open an issue on [GitHub](https://github.com/microsoft/fluentui)
