# Avatar

**GitHub Epic issue** - [Avatar Convergence #16373](https://github.com/microsoft/fluentui/issues/16373)

## Background

The Avatar component represents a person or entity. It displays the person's image, initials, or an icon, and can be either circular or square.

Note: The Avatar control has been mostly implemented already. Visit [Avatar Storybook Examples](http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/heads/master/react-avatar/storybook/index.html) to see the current state of the implementation.

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

Basic examples:

```jsx
<Avatar name="Miguel Garcia" />
<Avatar size={72} name="Mona Kane" image="./MonaKane.jpg" />
<Avatar square icon={<IDBadgeIcon />} />
```

Displaying a badge (\*\*subject to change pending final spec for the `Badge` component):

```jsx
<Avatar name="Allan Munger" badge={<PresenceBadge status="busy" />} />
```

With active state indication:

```jsx
<Avatar name="Daisy Phillips" active="active" activeDisplay="ring-shadow" />
<Avatar name="Robin Counts" active="inactive" />
```

## Variants

### Color

The Avatar supports color variants when displaying initials or an icon:

- **Neutral** - Gray (default)
- **Brand** - Brand colors from the theme
- **Colorful** - Pick from a list of pre-defined Avatar colors. The color will be assigned based on a hash of the name
  (to "randomly" assign a person a color). The color index can also be specified explicitly in case the use case
  requires a different algorithm to pick the color.

### Shape

The Avatar natively supports a circular and square shape. However, some use cases require a hexagon shape (e.g. to represent a bot). The hexagon will not be supported directly, but it is possible to style the Avatar with a hexagon background by using `tokens`:

```jsx
<Avatar
  icon={<ChatBotIcon />}
  display="icon"
  tokens={{
    width: 'calc(var(--avatar-height) * 1.125)',
    background: `url('${hexagonSvg}') 0px/contain no-repeat`,
    borderRadius: '0',
  }}
/>
```

Where hexagonSvg is defined as:

```js
hexagonSvg =
  'data:image/svg+xml;utf8,' +
  '<svg width="36" height="32" viewBox="0 0 36 32" fill="none" xmlns="http://www.w3.org/2000/svg">' +
  '<path fill="rgb(232,232,232)" d="M0.407926 17.528C-0.135976 16.5859 -0.135975 15.4141 0.407926 14.472' +
  'L7.91541 1.46793C8.44076 0.557947 9.39444 0 10.4245 0H25.5755C26.6056 0 27.5592 0.557951 28.0846 1.46793' +
  'L35.5921 14.472C36.136 15.4141 36.136 16.5859 35.5921 17.528L28.0846 30.5321' +
  'C27.5592 31.4421 26.6056 32 25.5755 32H10.4245C9.39443 32 8.44076 31.4421 7.91541 30.5321L0.407926 17.528Z"/>' +
  '</svg>';
```

## API

From [Avatar.types.tsx](https://github.com/microsoft/fluentui/blob/master/packages/react-avatar/src/components/Avatar/Avatar.types.tsx):

### Slots

- `root` - The root element of the Avatar.
- `image` - The Avatar's image, if available.
- `label` - The text shown when there's no image. Defaults to the initials derived from `name` using `getInitials`.
- `icon` - Icon displayed when there's no image or intials available.
- `badge` - Badge to show the avatar's status.

### Props

```ts
export interface AvatarProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The root element type of the Avatar.
   *
   * @defaultvalue span
   */
  as?: React.ElementType;

  /** The Avatar's image. */
  image?: ShorthandValue<{}>;

  /** The label shown when there's no image or icon. Defaults to the initials derived from `name` using `getInitials`. */
  label?: ShorthandValue<{}>;

  /** Icon displayed when there's no image. */
  icon?: ShorthandValue<{}>;

  /** Badge to show the avatar's status. */
  badge?: ShorthandValue<BadgeProps>;

  /** The name used for displaying the initials of the avatar if the image is not provided. */
  name?: string;

  /** Custom method for generating the initials from the name property, which is shown if no image is provided. */
  getInitials?: (name: string, isRtl: boolean) => string;

  /**
   * Size of the avatar in pixels.
   *
   * Size is restricted to a limited set of supported values recommended for most uses (see `AvatarSizeValue`).
   *
   * If a non-supported size is neeeded, set `size` to the next-smaller supported size, and use the `width` and `height`
   * tokens to override the rendered size, plus other size-related tokens if needed, such as `fontSize` and `iconSize`.
   *
   * For example, to set the avatar to 45px in size:
   * `<Avatar size={40} tokens={{ width: '45px', height: '45px' }} />`
   *
   * @defaultvalue 32
   */
  size?: AvatarSizeValue;

  /** The avatar can have a square shape. */
  square?: boolean;

  /**
   * Optional activity indicator
   * * active: the avatar will be decorated according to activeDisplay
   * * inactive: the avatar will be reduced in size and partially transparent
   * * unset: normal display
   *
   * @defaultvalue unset
   */
  active?: 'active' | 'inactive' | 'unset';

  /**
   * The type of visual treatment to use when `active="active"`
   *
   * @defaultvalue ring
   */
  activeDisplay?: 'ring' | 'shadow' | 'glow' | 'ring-shadow' | 'ring-glow';

  /**
   * The color when displaying either an icon or initials.
   * * neutral (default): gray
   * * brand: color from the brand palette
   * * colorful: picks a color from a set of pre-defined colors, based on a hash of the name prop.
   *     If another method is needed to assign colors to avatars, use the colorIndex prop.
   *
   * @defaultvalue neutral
   */
  colorVariant?: 'neutral' | 'brand' | 'colorful';

  /**
   * When colorVariant="colorful", specifies which color in the list of avatar colors to use.
   * If colorIndex is out of bounds of the colors list, it will wrap around.
   *
   * @defaultvalue calculated based on a hash of the name prop.
   */
  colorIndex?: number;

  /** Style tokens */
  tokens?: AvatarTokenSet;
}

/**
 * Sizes for the Avatar
 *
 * This is a restricted list based on design guidelines for the Avatar control.
 * It's recommended to use one of these sizes to conform to the design guidelines,
 * but it is possible to render a different size using tokens.
 */
export const avatarSizeValues = [20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 96, 120, 128] as const;
export type AvatarSizeValue = typeof avatarSizeValues[number]; // 20 | 24 | 28 | ... | 128
// !! Important: when adding new AvatarSizeValues, add corresponding "._size" classes in Avatar.scss

/** Default Avatar size if not specified */
export const defaultAvatarSize: AvatarSizeValue = 32;
```

### Styling Tokens

```tsx
export type AvatarTokenSet = {
  /** Width of the avatar */
  width?: string;

  /** Height of the avatar */
  height?: string;

  /** Background shown behind the initials or icon */
  background?: string;

  /** Color of the initials or icon */
  color?: string;

  /** Border radius */
  borderRadius?: string;

  /** Font used by the initials */
  fontFamily?: string;

  /** Font size used by the initials */
  fontSize?: string;

  /** Font weight used by the initials */
  fontWeight?: string;

  /** Font size used by the icon */
  iconSize?: string;

  /** Color of the ring when active="active" and activeDisplay includes 'ring' */
  activeRingColor?: string;

  /** Color of the glow when active="active" and activeDisplay includes 'glow' */
  activeGlowColor?: string;

  /** Opacity of the avatar when active="inactive" */
  inactiveOpacity?: string;

  /** Scale transform applied to the avatar when active="inactive" */
  inactiveScale?: string;
};
```

## Structure

```html
<span class="root">
  <!-- Initials or icon -->
  <span class="label">AB</span>
  <!-- Profile image, if given -->
  <img class="image" src="..." />
  <span class="badge">
    <!-- Content of the badge slot goes here, if given -->
  </span>
</span>
```

## Migration

See [MIGRATION.md](https://github.com/microsoft/fluentui/blob/master/packages/react-avatar/MIGRATION.md).

## Behaviors

### States

- **Display** - The Avatar will use the following priority:

  - The `image` property, if provided.
  - The `icon` property, if provided.
  - Initials derived from the `name` property (this is also displayed while the image is loading).
  - If no `image`, `icon`, or `name` is provided, the default "person" icon will be used.

- **Active** - The `active` property affects the display of the avatar if set. There will be an animation when switching between active and inactive.
  - `unset` - Display at normal size/opacity.
  - `inactive` - Reduce to 80% opacity, and 87.5% size.
  - `active` - Adorn with an extra visual such as a ring and/or shadow, based on the `activeDisplay` property.

### Interaction

The Avatar is non-interactive.

- **Keyboard** - Not keyboard focusable.
- **Mouse**
  - Hover: Show tooltip (TODO: Need to figure out how the tooltip content will be generated based on the name and status).
  - Click: No action
- **Touch** - Nothing

## Accessibility

_TODO_
