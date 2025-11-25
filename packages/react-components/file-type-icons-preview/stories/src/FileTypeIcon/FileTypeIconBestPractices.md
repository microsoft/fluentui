# FileTypeIcon best practices

- **Use SVG format (default) for better scalability and smaller file sizes** - SVG icons scale perfectly at any size and are more performant than PNG.
- **Choose appropriate sizes based on UI density**:
  - Use 16-20px for compact interfaces, breadcrumbs, and dense lists
  - Use 24-32px for standard list items and cards
  - Use 40-48px for featured content and file pickers
  - Use 64-96px only for hero sections or file upload zones
- **Provide meaningful context through surrounding UI** - File type icons work best when combined with file names, metadata, or labels. This is especially valuable in search results or similar experiences where diverse item types may be present.
- **Use special types for non-file entities** - Use `folder`, `sharedFolder`, `listItem`, `docset`, or `genericFile` types for appropriate contexts instead of trying to force file extensions.
- **Handle unknown file extensions gracefully** - The component automatically falls back to `genericFile` for unrecognized extensions, and is regularly updated to support new file types if they have a recognized icon.
- **Consider accessibility** - The component provides default alt text, but ensure the surrounding context makes the file's purpose clear to all users.
- **Use consistent sizes within the same UI context** - Mixing different icon sizes in a single list or grid creates visual inconsistency.

## Things to avoid

- **Don't use file type icons as the sole means of identifying files** - Always pair icons with file names or descriptions for better usability and accessibility.
- **Don't use file type icons as primary navigation elements** - These icons are meant to represent file types, not actions or navigation destinations.
- **Don't override the default alt text without good reason** - The component provides sensible defaults based on the file extension or type.
- **Don't use very large sizes (64px+) in dense lists or tables** - Large icons create excessive whitespace and reduce content density. Use thumbnail previews of the real file contents if available.
- **Don't use file type icons for branding or decorative purposes** - These icons follow Fluent Design System conventions and are meant for functional file type representation. Avoid non-square aspect ratios, custom styling overrides or distorting the visual design.
- **Don't assume all file types have unique icons** - Many extensions may share the same icon; rely on file names for precise identification.
