# FileTypeIcon

Filetype icons represent a file or other "digital object" based on its extension or a special type (like folder). This Fluent UI design system component provides consistent, recognizable visual representations of the user's items and documents across your application, aligned with Microsoft 365.

The component automatically selects the appropriate icon from the comprehensive Fluent Design file type icon set and handles device pixel ratio for optimal display quality on all screens.

## Use Filetype Icons when you need to

- **Display file lists or grids** - Help users quickly identify file types in recent lists, document libraries, file browsers, or search results
- **Show file attachments or file upload interfaces** - Indicate attachment types in emails, messages, or forms. Provide visual feedback about accepted or uploaded file types
- **Represent documents in workflows** - Show file types in approval processes, cloud content management interfaces, document workflows, or collaboration tools

This control integrates seamlessly with other Fluent UI v9 components using the same design principles. It can be used in `DataGrid`, `List`, and `Card` components for displaying file collections, following consistent theming, spacing and sizing patterns with the broader Fluent Design System.

## Quick start

```tsx
import { FileTypeIcon, FileIconType } from '@fluentui/react-file-type-icons';

<FileTypeIcon extension="docx" size={24} />
<FileTypeIcon type={FileIconType.folder} size={24} />
```

Use `extension` for real file extensions and `type` for non-extension entities like folders.

## API guidance

- `extension` accepts values with or without a leading `.` (for example, `pdf` and `.pdf` both work)
- `type` supports special icons from `FileIconType` for objects that are not files
- `size` supports: `16`, `20`, `24`, `32`, `40`, `48`, `64`, and `96`
- `imageFileType` supports `'svg'` (default) and `'png'`
- `baseUrl` allows overriding the default CDN host for icon assets

When both `extension` and `type` are provided, `extension` is used for icon resolution.

## Interop and migration

This package supports both patterns:

- component-first rendering via `FileTypeIcon` (recommended for new UI)
- utility-based helpers like `getFileTypeIconAsUrl` and `getFileTypeIconAsHTMLString` (useful for incremental migration)

See the `Migration` story for side-by-side examples.

## Features

- **Automatic icon selection**: Matches file extensions to the appropriate icon from a comprehensive library
- **Multiple sizes**: Supports 16, 20, 24, 32, 40, 48, 64, and 96 pixel sizes for different UI contexts
- **Format support**: Renders icons as SVG (default, recommended) or PNG for maximum compatibility
- **Special types**: Supports non-file-based icons like folders, shared folders, list items, docsets, and generic files
- **Accessibility**: Includes appropriate alt text for screen readers and follows WCAG guidelines
- **Device-aware rendering**: Automatically handles different pixel densities for crisp display on all screens
- **Customizable base URL**: Configure a custom CDN or asset path for icon resources
