# FileTypeIcon Best Practices

## Do

- **Use SVG format (default) for better scalability and smaller file sizes** - SVG icons scale perfectly at any size and are more performant than PNG.
- **Choose appropriate sizes based on UI density**:
  - Use 16-20px for compact interfaces, toolbars, and dense lists
  - Use 24-32px for standard list items and cards
  - Use 40-48px for featured content and file pickers
  - Use 64-96px only for hero sections or file upload zones
- **Provide meaningful context through surrounding UI** - File type icons work best when combined with file names, metadata, or labels.
- **Use special types for non-file entities** - Use `folder`, `sharedFolder`, `listItem`, `docset`, or `genericFile` types for appropriate contexts instead of trying to force file extensions.
- **Handle unknown file extensions gracefully** - The component automatically falls back to `genericFile` for unrecognized extensions.
- **Consider accessibility** - The component provides default alt text, but ensure the surrounding context makes the file's purpose clear to all users.
- **Use consistent sizes within the same UI context** - Mixing different icon sizes in a single list or grid creates visual inconsistency.

## Don't

- **Don't use file type icons as the sole means of identifying files** - Always pair icons with file names or descriptions for better usability and accessibility.
- **Don't use file type icons as primary navigation elements** - These icons are meant to represent file types, not actions or navigation destinations.
- **Don't override the default alt text without good reason** - The component provides sensible defaults based on the file extension or type.
- **Don't use very large sizes (64px+) in dense lists or tables** - Large icons create excessive whitespace and reduce content density.
- **Don't mix PNG and SVG formats in the same UI context** - Stick to one format for visual consistency; prefer SVG unless you have specific compatibility requirements.
- **Don't forget to handle loading states** - When displaying many icons, consider performance implications and implement appropriate loading strategies.
- **Don't use file type icons for branding or decorative purposes** - These icons follow Fluent Design System conventions and are meant for functional file type representation.
- **Don't assume all file types have unique icons** - Many extensions share the same generic icon; rely on file names for precise identification.

## Usage Guidelines

### In Lists and Tables

Use smaller sizes (16-24px) and ensure adequate spacing between icons and text labels for readability.

### In File Upload Interfaces

Use medium to large sizes (40-64px) to create clear drop zones and visual feedback during file selection.

### In Search Results

Combine icons with file metadata (size, date modified, path) to help users quickly identify files.

### In Breadcrumbs and Navigation

Use small sizes (16-20px) to maintain compact navigation while providing visual cues about file types.

### With Custom Styling

When applying custom styles, maintain the icon's aspect ratio and avoid distorting the visual design.

### Performance Considerations

When rendering many icons (100+), consider virtualization and lazy loading techniques to maintain smooth performance.
