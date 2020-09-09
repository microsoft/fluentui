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

  /** Classes for the parts of the component */
  classes?: { [key: string]: string };

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
export type AvatarSizeValue = 20 | 24 | 28 | 32 | 36 | 40 | 48 | 56 | 64 | 72 | 96 | 120 | 128;
// !! Important: when adding new AvatarSizeValues, add corresponding "._sizeClass" classes in Avatar.scss,
// and add it to the avatarSizes array.

/** Supported Avatar sizes as an array; should match the values allowed in AvatarSizeValue */
export const avatarSizes: readonly AvatarSizeValue[] = [20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 96, 120, 128];

/** Default Avatar size if not specified */
export const defaultAvatarSize: AvatarSizeValue = 32;

/**
 * Style tokens for the Avatar
 */
export type AvatarTokenSet = {
  /** Size of the avatar.
   * @defaultvalue - The Avatar's `size` prop */
  size?: string;

  /** Background fill when there is no image */
  background?: string;

  /** Border radius */
  borderRadius?: string;

  /** Font size used by the initials */
  fontSize?: string;

  /** Font weight used by the initials */
  fontWeight?: string;

  /** Font size used by the icon */
  iconSize?: string;

  /** Custom clip path for the image or background fill */
  clipPath?: string;
};

export type AvatarState = AvatarProps;
