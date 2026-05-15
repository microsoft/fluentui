# FileTypeIcon

`FileTypeIcon` renders a file-type image by extension or file icon type using the same resolver logic as legacy utility APIs.

This component follows Fluent UI React v9 component patterns and lives in the `react-components` package structure while preserving the existing file icon utility APIs.

## Quick start

```tsx
import { FileIconType, FileTypeIcon } from '@fluentui/react-file-type-icons';

<FileTypeIcon extension="docx" size={24} />
<FileTypeIcon type={FileIconType.folder} size={24} />
```

Use `extension` for file extensions and `type` for non-file entities.

## Decision guide

- Use `Playground` first to validate the icon you expect.
- Use `extension` when you have a real file type.
- Use `type` for folders, list-like entities, and other non-file objects.
- If both are provided, `extension` takes precedence.

## Sizing and format

- Supported sizes: `16`, `20`, `24`, `32`, `40`, `48`, `64`, `96`
- Default format: `svg`
- Optional format: `png`
- Prefer `svg` for new UI; use `png` only when bitmap output is required.

## Fallback behavior

- Unknown or empty extensions render a generic file icon.
- Extension matching is case-insensitive.
- Leading dots are accepted (for example, `.PDF` and `pdf` resolve the same way).

## Migration from utility APIs

- For new UI, prefer rendering with `FileTypeIcon`.
- Existing utility APIs (`getFileTypeIconProps`, `getFileTypeIconAsUrl`) remain useful for incremental migration and non-component callsites.

## Custom CDN host

Use `baseUrl` only when hosting a fully compatible copy of the item-type icon assets.

Stories in this section cover:

- a controls-first playground for quick validation
- default and common component usage patterns
- file-type enum usage for non-extension icons
- size and image format variants
- fallback behavior and normalization examples
- custom base URL scenarios
- utility interop (`getFileTypeIconProps` and `getFileTypeIconAsUrl`) parity
