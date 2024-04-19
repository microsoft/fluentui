import { PresenceBadge } from '@fluentui/react-badge';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

/**
 * Sizes for the avatar
 * @deprecated use AvatarSize instead
 */
export type AvatarSizes = AvatarSize;
/**
 * Sizes for the avatar
 */
export type AvatarSize = 16 | 20 | 24 | 28 | 32 | 36 | 40 | 48 | 56 | 64 | 72 | 96 | 120 | 128;

/**
 * Shape of the avatar
 */
export type AvatarShape = 'circular' | 'square';

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
   * @default `PersonRegular` (the default icon's size depends on the Avatar's size)
   */
  icon?: Slot<'span'>;

  /**
   * Badge to show the avatar's presence status.
   */
  badge?: Slot<typeof PresenceBadge>;
};

/**
 * A specific named color for the Avatar
 */
export type AvatarNamedColor =
  | 'dark-red'
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
  | 'dark-green'
  | 'light-teal'
  | 'teal'
  | 'steel'
  | 'blue'
  | 'royal-blue'
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

/**
 * Properties for Avatar
 */
export type AvatarProps = Omit<ComponentProps<AvatarSlots>, 'color'> & {
  /**
   * Optional activity indicator
   * * active: the avatar will be decorated according to activeAppearance
   * * inactive: the avatar will be reduced in size and partially transparent
   * * unset: normal display
   *
   * @default unset
   */
  active?: 'active' | 'inactive' | 'unset';

  /**
   * The appearance when `active="active"`
   *
   * @default ring
   */
  activeAppearance?: 'ring' | 'shadow' | 'ring-shadow';

  /**
   * The color when displaying either an icon or initials.
   * * neutral (default): gray
   * * brand: color from the brand palette
   * * colorful: picks a color from a set of pre-defined colors, based on a hash of the name (or idForColor if provided)
   * * [AvatarNamedColor]: a specific color from the theme
   *
   * @default neutral
   */
  color?: 'neutral' | 'brand' | 'colorful' | AvatarNamedColor;

  /**
   * Specify a string to be used instead of the name, to determine which color to use when color="colorful".
   * Use this when a name is not available, but there is another unique identifier that can be used instead.
   */
  idForColor?: string | undefined;

  /**
   * The name of the person or entity represented by this Avatar. This should always be provided if it is available.
   *
   * The name is used to determine the initials displayed when there is no image. It is also provided to
   * accessibility tools.
   */
  name?: string;

  /**
   * The avatar can have a circular or square shape.
   * @default circular
   */
  shape?: AvatarShape;

  /**
   * Size of the avatar in pixels.
   *
   * Size is restricted to a limited set of supported values recommended for most uses (see `AvatarSizeValue`) and
   * based on design guidelines for the Avatar control.
   *
   * Note: At size 16, if initials are displayed, only the first initial will be rendered.
   *
   * If a non-supported size is needed, set `size` to the next-smaller supported size, and set `width` and `height`
   * to override the rendered size.
   *
   * For example, to set the avatar to 45px in size:
   * `<Avatar size={40} style={{ width: '45px', height: '45px' }} />`
   *
   * @default 32
   */
  size?: AvatarSize;
};

/**
 * State used in rendering Avatar
 */
export type AvatarState = ComponentState<AvatarSlots> &
  Required<Pick<AvatarProps, 'active' | 'activeAppearance' | 'shape' | 'size'>> & {
    /**
     * The Avatar's color, it matches props.color but with `'colorful'` resolved to a named color
     */
    color: NonNullable<Exclude<AvatarProps['color'], 'colorful'>>;

    /**
     * Hidden span to render the active state label for the purposes of including in the aria-labelledby, if needed.
     */
    activeAriaLabelElement?: JSX.Element;
  };
