import * as React from 'react';
import { ComponentProps, ComponentState, ObjectShorthandProps } from '@fluentui/react-utilities';
import { PresenceBadgeProps, PresenceBadgeStatus } from '@fluentui/react-badge';

export type AvatarSlots = {
  /**
   * The Avatar's image.
   */
  image?: React.ImgHTMLAttributes<HTMLImageElement>;

  /**
   * The label shown when there's no image. Defaults to the initials derived from `name` using `getInitials`.
   */
  label?: React.HTMLAttributes<HTMLElement>;

  /**
   * Icon to be displayed when the avatar doesn't have an image or name (or if getInitials returns an empty string).
   *
   * @defaultvalue `Person20Regular` (the default icon's size depends on the Avatar's size)
   */
  icon?: React.HTMLAttributes<HTMLElement>;

  /**
   * Badge to show the avatar's presence status.
   */
  badge?: PresenceBadgeProps;
};

export interface AvatarCommons extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /**
   * The name used for displaying the initials of the avatar if the image is not provided
   */
  name?: string;

  /**
   * Custom method for generating the initials from the name property, which is shown if no image is provided.
   */
  getInitials: (name: string, isRtl: boolean) => string;

  /**
   * Size of the avatar in pixels.
   *
   * Size is restricted to a limited set of supported values recommended for most uses (see `AvatarSizeValue`).
   *
   * If a non-supported size is neeeded, set `size` to the next-smaller supported size, and set `width` and `height`
   * to override the rendered size.
   *
   * For example, to set the avatar to 45px in size:
   * `<Avatar size={40} style={{ width: '45px', height: '45px' }} />`
   *
   * @defaultvalue 32
   */
  size: AvatarSizeValue;

  /**
   * The avatar can have a square shape.
   */
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
  activeDisplay: 'ring' | 'shadow' | 'glow' | 'ring-shadow' | 'ring-glow';

  /**
   * The color when displaying either an icon or initials.
   * * neutral (default): gray
   * * brand: color from the brand palette
   * * colorful: picks a color from a set of pre-defined colors, based on a hash of the name (or idForColor if provided)
   * * [AvatarNamedColor]: a specific color from the theme
   *
   * @defaultvalue neutral
   */
  color: 'neutral' | 'brand' | 'colorful' | AvatarNamedColor;

  /**
   * Specify a string to be used instead of the name, to determine which color to use when color="colorful".
   * Use this when a name is not available, but there is another unique identifier that can be used instead.
   */
  idForColor?: string;
}

/**
 * Sizes for the Avatar
 *
 * This is a restricted list based on design guidelines for the Avatar control.
 */
export type AvatarSizeValue = 20 | 24 | 28 | 32 | 36 | 40 | 48 | 56 | 64 | 72 | 96 | 120 | 128;

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

/**
 * Properties for Avatar
 */
export interface AvatarProps extends ComponentProps<Partial<AvatarSlots>>, Partial<AvatarCommons> {
  /**
   * Badge to show the avatar's presence status.
   * Can either be a string indicating the status ("busy", "away", etc.), or a PresenceBadgeProps object.
   */
  badge?: PresenceBadgeStatus | ObjectShorthandProps<PresenceBadgeProps> | null;

  /**
   * The Avatar's image.
   * Can either be the URL of the image, or the props of the img tag
   */
  image?: string | ObjectShorthandProps<React.ImgHTMLAttributes<HTMLImageElement>> | null;
}

/**
 * State used in rendering Avatar
 */
export interface AvatarState extends ComponentState<AvatarSlots>, AvatarCommons {
  /**
   * Ref to the root element
   */
  ref: React.Ref<HTMLElement>;
}
