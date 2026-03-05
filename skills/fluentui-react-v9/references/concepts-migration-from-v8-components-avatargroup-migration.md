# AvatarGroup Migration

Fluent UI v8 provides the `Facepile` control to allow users to display a list of `Personas`. Fluent UI v9 provides an `AvatarGroup` control, but has a different API.

Some key differences between `Facepile` and `AvatarGroup` are:

- v9 breaks the component apart into one main component and two subcomponents:
  - `AvatarGroup`: the main component that is in charge of the inline items displayed in the `AvatarGroup`.
  - `AvatarGroupPopover`: subcomponent in charge of rendering the overflow indicator button and rendering the `Popover` containing the overflowing `AvatarGroupItems`.
  - `AvatarGroupItem`: used instead of `Personas` and provides internal functionality for `AvatarGroup`.

v9 also provides a function `partitionAvatarGroupItems` that will split the items provided with the right behavior based on the layout provided. It is highly encouraged to use this function as each layout has a specific way of arranging the items.

## Examples

### Basic Migration

Basic usage of `FacePile` in v8

An equivalent `AvatarGroup` in v9 is

## Props Mapping

This table maps `Facepile` v8 props to the v9's `AvatarGroup` equivalent.

| v8 `Facepile`            | v9 `AvatarGroup`                                           |
| ------------------------ | ---------------------------------------------------------- |
| `personas`               | `children`                                                 |
| `addButtonProps`         | -                                                          |
| `className`              | `className`                                                |
| `getPersonaProps`        | `AvatarGroupItem`'s props                                  |
| `maxDisplayablePersonas` | `maxAvatars` option in `partitionAvatarGroupItems`         |
| `onRenderPersona`        | Render function for the `AvatarGroupItem`                  |
| `onRenderPersonaCoin`    | Render function for the `avatar` slot in `AvatarGroupItem` |
| `onRenderPersonaWrapper` | -                                                          |
| `overflowButtonProps`    | `AvatarGroupPopover`'s props                               |
| `overflowButtonType`     | `AvatarGroupPopover`'s `indicator` prop                    |
| `overflowPersonas`       | `AvatarGroupPopover`'s children                            |
| `personaSize`            | `size`                                                     |
| `showAddButton`          | -                                                          |
| `showTooltip`            | -                                                          |
| `styles`                 | (theme)                                                    |
