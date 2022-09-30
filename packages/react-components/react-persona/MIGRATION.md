# Badge Migration

## Migration from v8

v8 offers a component equivalent to v9's `Persona`. However, the API is slightly different. The main difference is that v9's `Persona` does not handle the functionality of the `presence` and `avatar`. Instead, the `presence` and `avatar` are separate components that can be used in conjunction with `Persona`.

Here's how the API of v8's `Persona` compares to the one from v9's `Persona` component:

- `className` => `className`
- `coinProps` => Use `avatar`'s or `presence`'s slot props
- `componentRef` => NOT SUPPORTED - use `ref` instead
- `hidePersonaDetails` => NOT SUPPORTED
- `imageShouldFadeIn` => NOT SUPPORTED
- `isOutOfOffice` => Use `status` in `presence` slot props
- `presence` => `presence`
- `presenceTitle` => NOT SUPPORTED
- `showOverflowTooltip` => NOT SUPPORTED
- `showUnknownPersonaCoin` => NOT SUPPORTED
- `styles` => Use style customization through `className` instead

## Property Mapping

| v8 `Persona`             | v9 `Persona`                           |
| ------------------------ | -------------------------------------- |
| `coinProps`              | `avatar` or `badge` slot props         |
| `coinSize`               | `size` in the `badge` or `avatar` slot |
| `className`              | `className`                            |
| `componentRef`           | `ref`                                  |
| `hidePersonaDetails`     | -                                      |
| `imageShouldFadeIn`      | -                                      |
| `isOutOfOffice`          | `status` in `presence` slot props      |
| `optionalText`           | `quaternaryText`                       |
| `presence`               | `presence`                             |
| `presenceTitle`          | -                                      |
| `primaryText`            | `primaryText`                          |
| `secondaryText`          | `secondaryText`                        |
| `showOverflowTooltip`    | -                                      |
| `showUnknownPersonaCoin` | -                                      |
| `styles`                 | `className`                            |
| `tertiaryText`           | `tertiaryText`                         |
| `text`                   | `name`                                 |
