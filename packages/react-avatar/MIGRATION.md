# Avatar Migration

## STATUS: WIP 🚧

This Migration guide is a work in progress and is not yet ready for use.

## Migration from v8

The existing `Persona` control supports many more props than the proposed `Avatar` control: notably the extra display text to the side of the image. As such, Avatar is not a direct replacement for Persona. It will only be possible to migrate in cases where the Persona was only being used to display the image (`hidePersonaDetails` is true).

In cases where migration is possible, the following props will need to be renamed:

- `text` => `name`
- `size` converted from an enum to a number, and not all previous sizes are supported:
  - `PersonaSize.size8` => Not Supported
  - `PersonaSize.size10` => Not Supported
  - `PersonaSize.size16` => Not Supported
  - `PersonaSize.size24` => `size={24}`
  - `PersonaSize.size28` => `size={28}`
  - `PersonaSize.size32` => `size={32}`
  - `PersonaSize.size40` => `size={40}`
  - `PersonaSize.size48` => `size={48}`
  - `PersonaSize.size56` => `size={56}`
  - `PersonaSize.size72` => `size={72}`
  - `PersonaSize.size100` => Not Supported, use either `size={96}`, or `customSize={100}`
  - `PersonaSize.size120` => `size={120}`
- `coinSize` => `customSize`
- `imageUrl` => `image`
- `imageAlt` => Set `alt` on the `image` slot
- `imageInitials` => `label` (or remove and have it calculated from `name`)
- `presence` => NOT SUPPORTED - use the `badge` slot instead
- `presenceColors` => NOT SUPPORTED - use the `badge` slot instead
- `presenceTitle` => NOT SUPPORTED - use the `badge` slot instead
- `isOutOfOffice` => NOT SUPPORTED - use the `badge` slot instead
- `showUnknownPersonaCoin` => NOT SUPPORTED - use the `icon` slot instead
- `initialsColor` => _[TODO need to add prop for color]_
- `showInitialsUntilImageLoad` => NOT SUPPORTED (this is the normal behavior of Avatar)
- `imageShouldFadeIn` => NOT SUPPORTED
- `imageShouldStartVisible` => NOT SUPPORTED
- `onPhotoLoadingStateChange` => NOT SUPPORTED
- `onRender*` => NOT SUPPORTED - add custom components to the slots instead of overriding the rendering
  - (Or, to render a square image, use the `square` prop)

## Migration from v0

The v0 Avatar maps more closely to the converged Avatar. The primary concerns are the v0-specific `variables`, `design`, and `accessibility` props, will need to be modified to fit with their converged equivalents.

Additionally, the `size` will need to be mapped from a `SizeValue` to a number:

- `smallest` => ???
- `smaller` => ???
- `small` => ???
- `medium` => ???
- `large` => ???
- `larger` => ???
- `largest` => ???

## Property mapping

| v8 `Persona`               | v0 `Avatar`      | Converged `Avatar` |
| -------------------------- | ---------------- | ------------------ |
| text                       | name             | name               |
| size (PersonaSize enum)    | size (SizeValue) | size (number)      |
| coinSize                   | -                | customSize         |
| imageUrl                   | image (S)        | image (slot)       |
| imageAlt                   | -                | -                  |
| imageInitials              | label (S)        | label (slot)       |
| -                          | getInitials      | getInitials        |
| presence                   | status (S)       | badge (slot)       |
| presenceColors             | -                | -                  |
| presenceTitle              | -                | -                  |
| -                          | icon (S)         | icon (slot)        |
| -                          | -                | display            |
| showUnknownPersonaCoin     | -                | -                  |
| className                  | className        | className          |
| -                          | -                | tokens             |
| -                          | square           | square             |
| -                          | -                | active             |
| -                          | -                | activeDisplay      |
| -                          | styles           | -                  |
| -                          | as               | -                  |
| -                          | variables        | -                  |
| -                          | design           | -                  |
| -                          | accessibility    | -                  |
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
