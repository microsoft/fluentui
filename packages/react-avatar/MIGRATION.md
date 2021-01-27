# Avatar Migration

## STATUS: WIP 🚧

This Migration guide is a work in progress and is not yet ready for use.

## Migration from v8

The existing `Persona` control supports many more props than the `Avatar` control: notably the extra display text to the side of the image. As such, Avatar is only a direct replacement for Persona in cases where it was only being used to display the image (`hidePersonaDetails` is true). There is a plan to create a wrapper component EntityLayout (final name TBD) that supports placing text next to an Avatar, which is still being designed.

In cases where migration is possible, the following props will need to be renamed:

- `text` => `name`
- `size` converted from an enum to a number, and not all previous sizes are supported:
  - `PersonaSize.size8` => Not Supported. Use the `Badge` component since this size of Persona only displays the badge.
  - `PersonaSize.size16` => Not Supported. Can use `size={20} tokens={{ width: '16px', height: '16px' }}`
  - `PersonaSize.size24` => `size={24}`
  - `PersonaSize.size28` => `size={28}`
  - `PersonaSize.size32` => `size={32}`
  - `PersonaSize.size40` => `size={40}`
  - `PersonaSize.size48` => `size={48}`
  - `PersonaSize.size56` => `size={56}`
  - `PersonaSize.size72` => `size={72}`
  - `PersonaSize.size100` => Not Supported. Can use `size={96} tokens={{ width: '100px', height: '100px' }}`
  - `PersonaSize.size120` => `size={120}`
- `coinSize` => Use `size`
- `imageUrl` => `image`
- `imageAlt` => Set `alt` on the `image` slot
- `imageInitials` => `label` (or remove and have it calculated from `name`)
- `presence` => Use the `Badge` component
- `presenceColors` => Use the `Badge` component
- `presenceTitle` => Use the `Badge` component
- `isOutOfOffice` => Use the `Badge` component
- `showUnknownPersonaCoin` => NOT SUPPORTED - Set the `icon` prop to an appropriate icon
- `initialsColor` => Use `colorScheme="colorful"` and if needed set the `colorIndex` prop
- `showInitialsUntilImageLoad` => (This is the normal behavior of Avatar)
- `imageShouldFadeIn` => NOT SUPPORTED
- `imageShouldStartVisible` => NOT SUPPORTED
- `onPhotoLoadingStateChange` => NOT SUPPORTED
- `onRender*` => NOT SUPPORTED - add custom components to the slots instead of overriding the rendering
  - (Or to render a square image, use the `square` prop)

## Migration from v0

The v0 Avatar maps more closely to the converged Avatar.

- `variables` => Replaced by `tokens`
- `design` => Replaced by `tokens`
- `accessibility` => Not needed
- `size` is converted from `SizeValue` to a number:
  - `size="smallest"` => `size={20}`
  - `size="smaller"` => `size={24}`
  - `size="small"` => `size={28}`
  - `size="medium"` => `size={32}`
  - `size="large"` => `size={44}`
  - `size="larger"` => `size={64}`
  - `size="largest"` => `size={96}`

## Property mapping

| v8 `Persona`               | v0 `Avatar`      | Converged `Avatar` |
| -------------------------- | ---------------- | ------------------ |
| text                       | name             | name               |
| size (PersonaSize enum)    | size (SizeValue) | size (number)      |
| coinSize                   | -                | -                  |
| imageUrl                   | image (slot)     | image (slot)       |
| imageAlt                   | -                | -                  |
| imageInitials              | label (slot)     | label (slot)       |
| -                          | getInitials      | getInitials        |
| presence                   | status (slot)    | badge (slot)       |
| presenceColors             | -                | -                  |
| presenceTitle              | -                | -                  |
| -                          | icon (slot)      | icon (slot)        |
| showUnknownPersonaCoin     | -                | -                  |
| className                  | className        | className          |
| -                          | square           | square             |
| -                          | -                | active             |
| -                          | -                | activeDisplay      |
| -                          | styles           | (tokens)           |
| -                          | variables        | (tokens)           |
| -                          | design           | (tokens)           |
| -                          | accessibility    | -                  |
| -                          | as               | as                 |
| secondaryText              | -                | -                  |
| showSecondaryText          | -                | -                  |
| tertiaryText               | -                | -                  |
| optionalText               | -                | -                  |
| initialsColor              | -                | -                  |
| isOutOfOffice              | -                | -                  |
| hidePersonaDetails         | -                | -                  |
| showInitialsUntilImageLoad | -                | -                  |
| imageShouldFadeIn          | -                | -                  |
| imageShouldStartVisible    | -                | -                  |
| onPhotoLoadingStateChange  | -                | -                  |
| onRenderInitials           | -                | -                  |
| onRenderPersonaCoin        | -                | -                  |
| onRenderPrimaryText        | -                | -                  |
| onRenderSecondaryText      | -                | -                  |
| onRenderTertiaryText       | -                | -                  |
| onRenderOptionalText       | -                | -                  |
