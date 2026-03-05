# CardPreview Migration

Fluent UI v8 provides the `DocumentCardPreview` component. Fluent UI v9 provides a `CardPreview`, with a complete different API.

This table maps `DocumentCardPreview` v8 props to the `Card` v9 equivalent.

| v8                           | v9        | Notes                                                            |
| ---------------------------- | --------- | ---------------------------------------------------------------- |
| className                    | className |                                                                  |
| componentRef                 | ref       |                                                                  |
| previewImages                | n/a       | see Migrate `previewImages` prop in this document                |
| getOverflowDocumentCountText | n/a       | see Migrate `getOverflowDocumentCountText` prop in this document |
| maxDisplayCount              | n/a       | see Migrate `getOverflowDocumentCountText` prop in this document |
| styles                       | className |                                                                  |
| theme                        | n/a       | Use `FluentProvider` to customize themes                         |

## Migrate `previewImages` prop

The `previewImages` prop is no longer supported and has no other alternatives. The new CardPreview component accepts any element as children and can be used to render images.

Before:

After:

## Migrate `getOverflowDocumentCountText` prop

The `getOverflowDocumentCountText` and `maxDisplayCount` prop are no longer supported. The main `Card` can be used to implement a similar functionality.

Before:

After:
