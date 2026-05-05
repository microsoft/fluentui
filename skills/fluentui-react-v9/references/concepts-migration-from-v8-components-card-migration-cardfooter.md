# CardFooter Migration

Fluent UI v8 provides the `DocumentCardActions` component. Fluent UI v9 provides a more consistent and opinionated `CardFooter` instead.

This table maps `DocumentCard` v8 props to the `Card` v9 equivalent.

| v8           | v9        | Notes                                     |
| ------------ | --------- | ----------------------------------------- |
| className    | className |                                           |
| componentRef | ref       |                                           |
| views        | n/a       | see Migrate `views` prop in this document |
| role         | role      |                                           |
| styles       | className |                                           |
| theme        | n/a       | Use `FluentProvider` to customize themes  |

## Migrate `views` prop

The `views` prop is no longer supported. To migrate, create an element that displays the number of views and pass it to the `CardFooter` `action` prop.

Before:

After:
