# Badge Migration

## Migration from v8

v8 does not offer a component equivalent to v9's `Badge`. However, it does offer a `PersonaCoin` component that is similar in concept to v9's `PresenceBadge` component.

Here's how the API of v8's `PersonaCoin` compares to the one from v9's `PresenceBadge` component:

- `className` => `className`
- `coinProps` => Use native HTML props sent directly to `root` slot instead
- `coinSize` => `size`
- `componentRef` => NOT SUPPORTED - use `ref` instead
- `isOutOfOffice` => `outOfOffice`
- `onRenderPersonaCoin` => Use slots customization instead
- `presence` => `status`
- `presenceTitle` => NOT SUPPORTED
- `styles` => Use style customization through `className` instead

## Migration from v0

v0 does not offer a component equivalent to v9's `Badge`. However, it does offer an `AvatarStatus` component that is similar in concept to v9's `PresenceBadge` component.

Here's how the API of v0's `AvatarStatus` compares to the one from v9's `PresenceBadge` component:

- `accessibility` => NOT SUPPORTED
- `as` => `as`
- `className` => `className`
- `color` => Use style customization through `className` instead
- `design` => NOT SUPPORTED
- `icon` => Use `icon` slot
- `image` => NOT SUPPORTED
- `key` => NOT SUPPORTED
- `ref` => `ref`
- `size` => `size`
- `state` => `status`
- `styles` => Use style customization through `className` instead
- `variables` => NOT SUPPORTED

## Property Mapping

| v8 `PersonaCoin`      | v0 `AvatarStatus` | v9 `PresenceBadge` |
| --------------------- | ----------------- | ------------------ |
|                       | `acessibility`    |                    |
|                       | `as`              | `as`               |
| `className`           | `className`       | `className`        |
| `coinProps`           |                   | `root` slot        |
| `coinSize`            | `size`            | `size`             |
|                       | `color`           |                    |
| `componentRef`        | `ref`             | `ref`              |
|                       | `design`          |                    |
|                       | `icon`            | `icon` slot        |
|                       | `image`           |                    |
| `isOutOfOffice`       |                   | `outOfOffice`      |
|                       | `key`             |                    |
| `onRenderPersonaCoin` |                   | `root` slot        |
| `presence`            | `state`           | `status`           |
| `presenceTitle`       |                   |                    |
| `styles`              | `styles`          |                    |
|                       | `variables`       |                    |
