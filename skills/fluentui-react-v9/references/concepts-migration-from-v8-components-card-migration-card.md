# Card Migration

Fluent UI v8 provides the `DocumentCard` component and it's variants. Fluent UI v9 provides a `Card` control, but has a different API. `Card` is more generic is less opinionated about its content.

This table maps `DocumentCard` v8 props to the `Card` v9 equivalent.

| v8            | v9        | Notes                                    |
| ------------- | --------- | ---------------------------------------- |
| className     | className |                                          |
| componentRef  | ref       |                                          |
| onClick       | onClick   |                                          |
| onClickHref   | n/a       | Can be implemented using `onClick`       |
| onClickTarget | n/a       | Can be implemented using `onClick`       |
| role          | role      |                                          |
| styles        | className |                                          |
| theme         | n/a       | Use `FluentProvider` to customize themes |
| type          | n/a       | see Migrate `type` prop in this document |

## Migrate `type` prop

The `type` prop is no longer supported. To migrate, the property `orientation="horizontal"` can be used to achieve the same effect.

Before:

After:
