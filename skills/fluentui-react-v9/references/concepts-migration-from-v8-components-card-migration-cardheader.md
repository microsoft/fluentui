# CardHeader Migration

Fluent UI v8 provides the `DocumentCardDetails`, `DocumentCardTitle`, and `DocumentCardActivity` components that can be used anywhere inside the `DocumentCard`. Fluent UI v9 provides a more consistent and opinionated `CardHeader` component that can be used to group information.

## How to migrate

`DocumentCardDetails` => `CardHeader`  
`DocumentCardTitle` => No equivalent, but can be achieved with a `Text` component  
`DocumentCardActivity` with `activity` prop => `CardHeader` with `description` prop  
`DocumentCardActivity` with `people` prop => `CardHeader` with `image` and `header` props

Before:

After:
