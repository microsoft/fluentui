# Avatar

**GitHub Epic issue** - [Avatar Convergence #16373](https://github.com/microsoft/fluentui/issues/16373)

## Background

The Avatar component represents a person or entity. It displays the person's image, initials, or an icon, and can be either circular or square.

Note: The Avatar control has been mostly implemented already. Visit [Avatar Storybook Examples](https://fluentuipr.z22.web.core.windows.net/heads/master/react-components/storybook/index.html?path=/docs/components-avatar--default) to see the current state of the implementation.

## Prior Art

### Open UI

The Open UI [Avatar Research](https://open-ui.org/components/avatar.research) page (currently in PR: https://github.com/WICG/open-ui/pull/250), shows how the Avatar component is used in UI platforms across the web. There is a good consensus about the basic features such as displaying an image, initials, or an icon; as well as the shape being either a square or circle.

### Comparison of v8 and v0

The existing components are:

- v8 - [Persona](https://developer.microsoft.com/en-us/fluentui#/controls/web/persona)
- v0 - [Avatar](https://fluentsite.z22.web.core.windows.net/0.51.4/components/avatar/definition)

#### Display

Both the v8 and v0 components support displaying an image, initials, and an icon.

The v8 `Persona` also supports the full name and extra detail text to the right of the image. The extra detail text is specifically out of scope for the `Avatar` control, and may be added to a future component that makes use of Avatar.

The v8 `Persona` appears to not support a custom icon, and can only show the default person icon, or a "?" icon

#### Status/Presence Badge

Both components support showing a badge to indicate status, but they have different APIs. The v8 `Persona` has an enum of preset options for the presence badge. The v0 `Avatar` supports rendering a `Status` component, which is more customizable and can render an icon, and specify different sizes and colors.

## Sample Code

Display a user's initials:

```jsx
<Avatar name="Miguel Garcia" />
```

Display a user's image:

```jsx
<Avatar size={72} name="Mona Kane" image={{ src: './MonaKane.jpg' }} />
```

Display an icon only:

```jsx
<Avatar aria-label="Team" icon={<PeopleTeamRegular />} shape="square" />
```

Display a badge:

```jsx
<Avatar name="Allan Munger" badge={{ status: 'busy' }} />
```

With active state indication:

```jsx
<Avatar name="Daisy Phillips" active={isUserActive ? 'active' : 'inactive'} activeAppearance="ring-shadow" />
```

## Variants

### Color

The Avatar supports color variants when displaying initials or an icon:

- **Neutral** - Gray (default)
- **Brand** - Brand colors from the theme
- **Colorful** - Pick from a list of pre-defined Avatar colors. The color will be assigned based on a hash of the name
  (to "randomly" assign a person a color). The color name (like `darkRed`) can also be specified explicitly in case the use case
  requires a different algorithm to pick the color.

### Shape

The Avatar supports a circular and square (with rounded corners) shape.

## API

From [Avatar.types.tsx](https://github.com/microsoft/fluentui/blob/master/packages/react-avatar/src/components/Avatar/Avatar.types.tsx):

### Slots

- `root` - The root element of the Avatar.
- `image` - The Avatar's image, if provided.
- `initials` - The text shown when there's no image. Defaults to the initials derived from `name`.
- `icon` - Icon displayed when there's no image or intials available.
- `badge` - PresenceBadge to show the avatar's status.

### Props

```ts
export type AvatarSlots = {
  root: Slot<'span'>;

  /**
   * The Avatar's image.
   *
   * Usage e.g.: `image={{ src: '...' }}`
   */
  image?: Slot<'img'>;

  /**
   * (optional) Custom initials.
   *
   * It is usually not necessary to specify custom initials; by default they will be derived from the `name` prop,
   * using the `getInitials` function.
   *
   * The initials are displayed when there is no image (including while the image is loading).
   */
  initials?: Slot<'span'>;

  /**
   * Icon to be displayed when the avatar doesn't have an image or initials.
   *
   * @defaultvalue `PersonRegular` (the default icon's size depends on the Avatar's size)
   */
  icon?: Slot<'span'>;

  /**
   * Badge to show the avatar's presence status.
   */
  badge?: Slot<typeof PresenceBadge>;
};

export type AvatarProps = Omit<ComponentProps<AvatarSlots>, 'color'> & {
  /**
   * The name of the person or entity represented by this Avatar. This should always be provided if it is available.
   *
   * The name will be used to determine the initials displayed when there is no icon, as well as provided to
   * accessibility tools.
   */
  name?: string;

  /**
   * Size of the avatar in pixels.
   *
   * Size is restricted to a limited set of supported values recommended for most uses (see `AvatarSizeValue`) and
   * based on design guidelines for the Avatar control.
   *
   * If a non-supported size is neeeded, set `size` to the next-smaller supported size, and set `width` and `height`
   * to override the rendered size.
   *
   * For example, to set the avatar to 45px in size:
   * `<Avatar size={40} style={{ width: '45px', height: '45px' }} />`
   *
   * @defaultvalue 32
   */
  size?: 20 | 24 | 28 | 32 | 36 | 40 | 48 | 56 | 64 | 72 | 96 | 120 | 128;

  /**
   * The avatar can have a circular or square shape.
   * @defaultvalue circular
   */
  shape?: 'circular' | 'square';

  /**
   * Optional activity indicator
   * * active: the avatar will be decorated according to activeAppearance
   * * inactive: the avatar will be reduced in size and partially transparent
   * * unset: normal display
   *
   * @defaultvalue unset
   */
  active?: 'active' | 'inactive' | 'unset';

  /**
   * The appearance when `active="active"`
   *
   * @defaultvalue ring
   */
  activeAppearance?: 'ring' | 'shadow' | 'ring-shadow';

  /**
   * The color when displaying either an icon or initials.
   * * neutral (default): gray
   * * brand: color from the brand palette
   * * colorful: picks a color from a set of pre-defined colors, based on a hash of the name (or idForColor if provided)
   * * [AvatarNamedColor]: a specific color from the theme
   *
   * @defaultvalue neutral
   */
  color?: 'neutral' | 'brand' | 'colorful' | AvatarNamedColor;

  /**
   * Specify a string to be used instead of the name, to determine which color to use when color="colorful".
   * Use this when a name is not available, but there is another unique identifier that can be used instead.
   */
  idForColor?: string | undefined;
};

/**
 * A specific named color for the Avatar
 */
export type AvatarNamedColor =
  | 'darkRed'
  | 'cranberry'
  | 'red'
  | 'pumpkin'
  | 'peach'
  | 'marigold'
  | 'gold'
  | 'brass'
  | 'brown'
  | 'forest'
  | 'seafoam'
  | 'darkGreen'
  | 'lightTeal'
  | 'teal'
  | 'steel'
  | 'blue'
  | 'royalBlue'
  | 'cornflower'
  | 'navy'
  | 'lavender'
  | 'purple'
  | 'grape'
  | 'lilac'
  | 'pink'
  | 'magenta'
  | 'plum'
  | 'beige'
  | 'mink'
  | 'platinum'
  | 'anchor';
```

## Structure

JSX Tree:

```jsx
<slots.root {...slotProps.root}>
  {slots.initials && <slots.initials {...slotProps.initials} />}
  {slots.icon && <slots.icon {...slotProps.icon} />}
  {slots.image && <slots.image {...slotProps.image} />}
  {slots.badge && <slots.badge {...slotProps.badge} />}
</slots.root>
```

Resulting HTML (in this example, "avatar-42" is an ID generated by `useId`):

```html
<span class="{root}" id="avatar-42" aria-label="Miguel Garcia" aria-labelledby="avatar-42 avatar-42__badge">
  <!-- Only one of initials OR icon will be rendered, never both -->
  <span class="{initials}" aria-hidden="true">MG</span>
  <span class="{icon}" aria-hidden="true"><svg>...</svg></span>

  <!-- The Image -->
  <img class="{image}" src="..." aria-hidden="true" role="presentation" alt="" />

  <!-- The PresenceBadge's HTML is rendered here -->
  <span class="{PresenceBadge}" id="avatar-42__badge" aria-hidden="true">...</span>
</span>
```

## Migration

See [MIGRATION.md](./MIGRATION.md).

## Behaviors

### States

- **Display** - The Avatar will use the following priority:

  - The `image` property, if provided.
  - Initials derived from the `name` property (this is always displayed, so it is visible while the image is loading, and if the image fails to load).
  - The `icon` property, if provided.
  - If no `image`, `icon`, or `name` is provided, the default "person" icon will be used.

- **Active** - The `active` property affects the display of the avatar if set. There will be an animation when switching between active and inactive.
  - `unset` - Display at normal size/opacity.
  - `inactive` - Reduce to 80% opacity, and 87.5% size.
  - `active` - Adorn with an extra visual such as a ring and/or shadow, based on the `activeAppearance` property.

### Interaction

The Avatar is non-interactive.

- **Keyboard** - Not keyboard focusable.
- **Mouse** - Nothing
- **Touch** - Nothing

## Accessibility

The Avatar presents as a single img element to accessibility tools, regardless of what it is displaying (image, initials, or icon).

- The Avatar's root has `role="img"`
- All other slots have `aria-hidden="true"`.
- The `<img>` additionally has `alt="" role="presentation"`

The Avatar root's label is determined using the following priority:

- If `aria-label` and/or `aria-labelledby` is provided on props, do not add anything else.
- If `name` is provided, set the root's `aria-label={name}`.
  - If a badge is present, _also_ set the root's `aria-labelledby={root.id + ' ' + badge.id}`.
  - This means the Avatar is labelled by both its root and badge slots, and results in a label like "Miguel Garcia Busy".
- If there's no `name`, but `initials` are provided, set the root's `aria-labelledby={initials.id}`.
  - If a badge is present, _instead_ set the root's `aria-labelledby={initials.id + ' ' + badge.id}`.
