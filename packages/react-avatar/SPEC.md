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

The v8 `Persona` also supports the full name and extra detail text to the right of the image. The extra details is specifically out of scope for the `Avatar` control, and may be added to a future component that makes use of Avatar.

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
<Avatar name="Daisy Phillips" active={true} activeDisplay="ring-shadow" />
<Avatar name="Robin Counts" active={false} activeDisplay="ring-shadow" />
```

## Variants

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

- `image` - The Avatar's image, if available.
- `label` - The text shown when there's no image. Defaults to the initials derived from `name` using `getInitials`.
- `icon` - Icon displayed when there's no image or intials available.
- `badge` - Badge to show the avatar's status.

### Props

```ts
export interface AvatarProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /** The Avatar's image. */
  image?: ShorthandValue<{}>;

  /** The label shown when there's no image. Defaults to the initials derived from `name` using `getInitials`. */
  label?: ShorthandValue<{}>;

  /** Icon displayed when there's no image or intials available, or if `display="icon"`. */
  icon?: ShorthandValue<{}>;

  /** What the avatar displays. This can be used to override the default behavior, for example to show the icon even
   *  if the avatar has initials that could be shown as the label. */
  display?: 'image' | 'label' | 'icon';

  /**
   * Optional activity indicator
   * * true: the avatar will be decorated according to activeDisplay
   * * false: the avatar will be reduced in size and partially transparent
   * * undefined (default): normal display
   */
  active?: boolean;

  /**
   * The type of visual treatment to use when `active="true"`
   * @defaultvalue ring
   */
  activeDisplay?: 'ring' | 'shadow' | 'glow' | 'ring-shadow' | 'ring-glow';

  /** Badge to show the avatar's status. */
  badge?: ShorthandValue<BadgeProps>;

  /** The name used for displaying the initials of the avatar if the image is not provided. */
  name?: string;

  /** The avatar can have a square shape. */
  square?: boolean;

  /** Size of the avatar */
  size?: AvatarSizeValue;

  /**
   * If a non-standard size is needed, use customSize instead of size.
   *
   * The dimensions of the avatar will be the given customSize, and the icon
   * and font sizes will be based on the next-smaller AvatarSizeValue.
   * For more fine-grained control over the font and icon sizes, use tokens:
   * `tokens={{ fontSize: '...px', fontWeight: '...', iconSize: '...px' }}`
   */
  customSize?: number;

  /** Custom method for generating the initials from the name property, which is shown if no image is provided. */
  getInitials?: (name: string, isRtl: boolean) => string;

  /** Style tokens */
  tokens?: AvatarTokenSet;
}

/**
 * Sizes for the Avatar
 *
 * This is a restricted list based on design guidelines for the Avatar control.
 * It's recommended to use one of these sizes to conform to the design guidelines;
 * however, it is possible to specify a different value using the customSize property.
 */
export const avatarSizeValues = [20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 96, 120, 128] as const;
export type AvatarSizeValue = typeof avatarSizeValues[number]; // 20 | 24 | 28 | ... | 128
// !! Important: when adding new AvatarSizeValues, add corresponding "._size" classes in Avatar.scss

/** Default Avatar size if not specified */
export const defaultAvatarSize: AvatarSizeValue = 32;

}
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

  /** Color of the ring when active=true and activeDisplay includes 'ring' */
  activeRingColor?: string;

  /** Color of the glow when active=true and activeDisplay includes 'glow' */
  activeGlowColor?: string;

  /** Opacity of the avatar when active=false */
  inactiveOpacity?: string;

  /** Scale transform applied to the avatar when active=false */
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

- **Display** - The Avatar will respect the `display` property to pick what content to show, if specified. Otherwise, it'll use the following priority:

  - The `image` property.
  - If no image is available (or it can't be loaded), then it will display initials derived from the `name` property.
  - If no initials are available, display the provided `icon`.
  - If no icon is provided, the default "person" icon will be used.

- **Active** - The `active` property affects the display of the avatar if set. There will be an animation when switching between active and inactive.
  - `(unset)` - Display at normal size/opacity.
  - `false` - Reduce to 80% opacity, and 87.5% size.
  - `true` - Adorn with an extra visual such as a ring and/or shadow, based on the `activeDisplay` property.

### Interaction

The Avatar is non-interactive.

- **Keyboard** - Not keyboard focusable.
- **Mouse**
  - Hover: Show tooltip (TODO: Need to figure out how the tooltip content will be generated based on the name and status).
  - Click: No action
- **Touch** - Nothing

## Accessibility

_TODO_
