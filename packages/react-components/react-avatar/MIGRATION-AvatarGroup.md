# AvatarGroup Migration

## Migration from v0

`v0` does not have a component similar to `AvatarGroup`.

## Migration from v8

AvatarGroup and Facepile have similar APIs, but the main difference is how they interact with AvatarGroupItem/Persona. AvatarGroup receives AvatarGroupItems as children and places them in their respective place, this means AvatarGroup has no control over AvatarGroupItem. `size` is the only property of AvatarGroupItem that is modified by AvatarGroup to make all AvatarGroupItems the same size. Face adding functionality is not supported.

Avatars must not be used inside an AvatarGroup, instead AvatarGroupItems are used since it has extra functionality used only in AvatarGroups. This includes adding a label when the AvatarGroupItem is rendered in the overflow Popover and specific styling for each layout.

AvatarGroup has extra functionality that Facepile does not have, this includes:
 - When the AvatarGroupItems are overflowing, a Popover is rendered that contains all the overflowed AvatarGroupItems. The Popover is triggered when the overflow button is clicked.
 - AvatarGroup supports three layouts: `spread` (default), `stack`, and `pie`.

## Property mapping

| v8 `Facepile`            | v9 `AvatarGroup`                                         |
| ------------------------ | -------------------------------------------------------- |
| `personas`               | `children`                                               |
| `addButtonProps`         | -                                                        |
| `className`              | `className`                                              |
| `getPersonaProps`        | `AvatarGroupItem`'s props                                |
| `maxDisplayablePersonas` | `maxAvatars`                                             |
| `onRenderPersona`        | Render function for the AvatarGroupItem                  |
| `onRenderPersonaCoin`    | Render function for the `avatar` slot in AvatarGroupItem |
| `onRenderPersonaWrapper` | -                                                        |
| `overflowButtonProps`    | `overflowButton` slot props                              |
| `overflowButtonType`     | `overflowIndicator`                                      |
| `overflowPersonas`       | -                                                        |
| `personaSize`            | `size`                                                   |
| `showAddButton`          | -                                                        |
| `showTooltip`            | -                                                        |
| `styles`                 | (theme)                                                  |
