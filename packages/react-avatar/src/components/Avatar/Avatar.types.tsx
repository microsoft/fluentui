import * as React from 'react';
import { BadgeProps } from '../Badge/index';
import { ComponentProps, ShorthandValue } from '../utils/commonTypes';

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
   * * active: the avatar will be decorated according to activeDisplay
   * * inactive: the avatar will be reduced in size and partially transparent
   * * unset: normal display
   *
   * @defaultvalue unset
   */
  active?: 'active' | 'inactive' | 'unset';

  /**
   * The type of visual treatment to use when `active="active"`
   * @defaultvalue ring
   */
  activeDisplay?: 'ring' | 'shadow' | 'glow' | 'ring-shadow' | 'ring-glow';

  /** Badge to show the avatar's status. */
  badge?: ShorthandValue<BadgeProps>;

  /** The name used for displaying the initials of the avatar if the image is not provided. */
  name?: string;

  /** The avatar can have a square shape. */
  square?: boolean;

  /**
   * Size of the avatar in pixels.
   *
   * Size is restricted to a limited set of supported values recommended for most uses (see `AvatarSizeValue`).
   *
   * If a non-supported size is neeeded, set `size` to the next-smaller supported size, and use the `width` and `height`
   * tokens to override the display size, plus other size-related tokens if needed, such as `fontSize` and `iconSize`.
   *
   * For example, to set the avatar to 45px in size:
   * `<Avatar size={40} tokens={{ width: '45px', height: '45px' }} />`
   */
  size?: AvatarSizeValue;

  /** Custom method for generating the initials from the name property, which is shown if no image is provided. */
  getInitials?: (name: string, isRtl: boolean) => string;

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

export type AvatarState = AvatarProps;
