import * as React from 'react';
import { BadgeProps } from '../Badge/index';
import { ShorthandValue } from '../utils/commonTypes';

export interface AvatarProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The root element type of the Avatar.
   *
   * @defaultvalue span
   */
  as?: React.ElementType;

  /** The Avatar's image. */
  image?: ShorthandValue<{}>;

  /** The label shown when there's no image or icon. Defaults to the initials derived from `name` using `getInitials` */
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
   *
   * @defaultvalue neutral
   */
  colorVariant?: 'neutral' | 'brand';

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

/**
 * Style tokens for the Avatar
 */
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

export type AvatarState = AvatarProps & {
  activeRing: boolean;
  activeShadow: boolean;
  activeGlow: boolean;

  hasIcon: boolean;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  label: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  badge: any;

  getInitials: (name: string, isRtl: boolean) => string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: any;
};
