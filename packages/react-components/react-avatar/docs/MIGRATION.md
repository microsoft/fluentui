# Avatar Migration

## Migration from v8

The existing `Persona` control supports many more props than the `Avatar` control: notably the extra display text to the side of the image. As such, Avatar is only a direct replacement for `Persona` in cases where it was only being used to display the image (`hidePersonaDetails` is true). To fully replace `Persona`, `Avatar` needs to be used in conjunction with another component that displays additional content.

In cases where migration is possible, the following props will need to be renamed:

- `text` => `name`
- `size` converted from an enum to a number, and not all previous sizes are supported:
  - `PersonaSize.size8` => Not Supported. Use the `PresenceBadge` component since this size of Persona only displays the badge.
  - `PersonaSize.size16` => Not Supported. Use `size={20}`, and optionally add `style={{ width: '16px', height: '16px' }}` if the exact size is needed.
  - `PersonaSize.size24` => `size={24}`
  - `PersonaSize.size28` => `size={28}`
  - `PersonaSize.size32` => `size={32}`
  - `PersonaSize.size40` => `size={40}`
  - `PersonaSize.size48` => `size={48}`
  - `PersonaSize.size56` => `size={56}`
  - `PersonaSize.size72` => `size={72}`
  - `PersonaSize.size100` => Not Supported. Use `size={96}`, and optionally add `style={{ width: '100px', height: '100px' }}` if the exact size is needed.
  - `PersonaSize.size120` => `size={120}`
- `coinSize` => Use `size`
- `imageUrl` => `image={{ src: '...' }}`
- `imageAlt` => The Avatar's `aria-label` can be used.
- `imageInitials` => `initials`
- `presence` => `badge` (see the `PresenceBadge` component for more details)
  - `PersonaPresence.none` => (Default)
  - `PersonaPresence.away` => `badge={{ status: 'away' }}`
  - `PersonaPresence.blocked` => Not Supported.
  - `PersonaPresence.busy` => `badge={{ status: 'busy' }}`
  - `PersonaPresence.dnd` => `badge={{ status: 'doNotDisturb' }}`
  - `PersonaPresence.offline` => `badge={{ status: 'offline' }}`
  - `PersonaPresence.online` => `badge={{ status: 'available' }}`
- `presenceColors` => Not Supported. However, the badge can be styled using CSS. E.g. `badge={{ style: { color: '...' } }}`
- `presenceTitle` => Not Supported.
- `isOutOfOffice` => `badge={{ status: ..., outOfOffice: true }}`
- `showUnknownPersonaCoin` => Not Supported. An approximation is: `icon={<QuestionRegular />}`
- `initialsColor` => `color="colorful"`, or specify a color by name like `color="darkRed"`
- `showInitialsUntilImageLoad` => Not Supported. This is always true for `Avatar`.
- `imageShouldFadeIn` => Not Supported. Add a CSS class to the image if desired: `image={{ className: 'myFadeInClass' }}`
- `imageShouldStartVisible` => Not Supported. This is always true for `Avatar`.
- `onPhotoLoadingStateChange` => Add event listeners to the image slot for the `<img>` events: `image={{ onLoad: ..., onError: ... }}`
- `onRender*` => Avatar's slots allow render functions, such as `image={(Component, props) => <Component {...props} />}`
  - To render a square image, use `shape="square"`.

## Migration from v0

The v0 Avatar maps more closely to the converged Avatar.

- `variables` => Replaced by theme
- `design` => Replaced by theme
- `accessibility` => Not needed
- `size` is converted from `SizeValue` to a number:
  - `size="smallest"` => `size={20}`
  - `size="smaller"` => `size={24}`
  - `size="small"` => `size={28}`
  - `size="medium"` => `size={32}`
  - `size="large"` => `size={44}`
  - `size="larger"` => `size={64}`
  - `size="largest"` => `size={96}`
- `getInitials` => Set the initials directly: `initials={getInitials(name)}`
- `as` => Only allows `as="span"` (which is the default)

## Property mapping

| v8 `Persona`                 | v0 `Avatar`        | v9 `Avatar`                             |
| ---------------------------- | ------------------ | --------------------------------------- |
| `text`                       | `name`             | `name`                                  |
| `size` (PersonaSize enum)    | `size` (SizeValue) | `size` (number)                         |
| `coinSize`                   | -                  | -                                       |
| `imageUrl`                   | `image` (slot)     | `src` prop of the `image` slot          |
| `imageAlt`                   | -                  | `aria-label`                            |
| `imageInitials`              | `label` (slot)     | `initials` (slot)                       |
| -                            | `getInitials`      | -                                       |
| `presence`                   | `status` (slot)    | `badge` (slot)                          |
| `presenceColors`             | -                  | -                                       |
| `presenceTitle`              | -                  | -                                       |
| `initialsColor`              | -                  | `color`                                 |
|                              | -                  | `idForColor`                            |
| -                            | `icon` (slot)      | `icon` (slot)                           |
| `showUnknownPersonaCoin`     | -                  | -                                       |
| `className`                  | `className`        | `className`                             |
| -                            | `square`           | `shape`                                 |
| -                            | -                  | `active`                                |
| -                            | -                  | `activeAppearance`                      |
| -                            | `styles`           | (theme)                                 |
| -                            | `variables`        | (theme)                                 |
| -                            | `design`           | (theme)                                 |
| -                            | `accessibility`    | -                                       |
| -                            | `as`               | -                                       |
| `secondaryText`              | -                  | -                                       |
| `showSecondaryText`          | -                  | -                                       |
| `tertiaryText`               | -                  | -                                       |
| `optionalText`               | -                  | -                                       |
| `isOutOfOffice`              | -                  | `outOfOffice` prop of the `badge` slot  |
| `hidePersonaDetails`         | -                  | -                                       |
| `showInitialsUntilImageLoad` | -                  | -                                       |
| `imageShouldFadeIn`          | -                  | -                                       |
| `imageShouldStartVisible`    | -                  | -                                       |
| `onPhotoLoadingStateChange`  | -                  | `image={{ onLoad: ..., onError: ... }}` |
| `onRenderInitials`           | -                  | Render function for the `initials` slot |
| `onRenderPersonaCoin`        | -                  | Render function for the Avatar          |
| `onRenderPrimaryText`        | -                  | -                                       |
| `onRenderSecondaryText`      | -                  | -                                       |
| `onRenderTertiaryText`       | -                  | -                                       |
| `onRenderOptionalText`       | -                  | -                                       |
