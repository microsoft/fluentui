import * as React from 'react';
import type { ComponentPropsCompat, ComponentStateCompat, ShorthandPropsCompat } from '@fluentui/react-utilities';
import type { PresenceBadgeProps, PresenceBadgeStatus } from '@fluentui/react-badge';

export type AvatarProps = ComponentPropsCompat &
  React.HTMLAttributes<HTMLElement> & {
    /**
     * The Avatar's image.
     */
    image?: ShorthandPropsCompat<React.ImgHTMLAttributes<HTMLImageElement>>;

    /**
     * The label shown when there's no image. Defaults to the initials derived from `name` using `getInitials`.
     */
    label?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;

    /**
     * Icon to be displayed when the avatar doesn't have an image or name (or if getInitials returns an empty string).
     *
     * @defaultvalue `Person20Regular` (the default icon's size depends on the Avatar's size)
     */
    icon?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;

    /**
     * Badge to show the avatar's presence status.
     * Can either be a string indicating the status ("busy", "away", etc.), or a PresenceBadgeProps object.
     */
    badge?: PresenceBadgeStatus | Exclude<ShorthandPropsCompat<PresenceBadgeProps>, string>;

    /**
     * The name used for displaying the initials of the avatar if the image is not provided
     */
    name?: string;

    /**
     * Custom method for generating the initials from the name property, which is shown if no image is provided.
     */
    getInitials?: (name: string, isRtl: boolean) => string;

    /**
     * Size of the avatar in pixels.
     *
     * Size is restricted to a limited set of supported values recommended for most uses (see `AvatarSizeValue`).
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
    activeAppearance?: 'ring' | 'shadow' | 'glow' | 'ring-shadow' | 'ring-glow';

    /**
     * The color when displaying either an icon or initials.
     * * neutral (default): gray
     * * brand: color from the brand palette
     * * colorful: picks a color from a set of pre-defined colors, based on a hash of the name
     * (or idForColor if provided)
     * * [AvatarNamedColor]: a specific color from the theme
     *
     * @defaultvalue neutral
     */
    color?: 'neutral' | 'brand' | 'colorful' | AvatarNamedColor;

    /**
     * Specify a string to be used instead of the name, to determine which color to use when color="colorful".
     * Use this when a name is not available, but there is another unique identifier that can be used instead.
     */
    idForColor?: string;
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

/**
 * Names of the shorthand properties in AvatarProps
 */
export type AvatarShorthandPropsCompat = 'label' | 'image' | 'badge' | 'icon';

/**
 * Names of AvatarProps that have a default value in useAvatar
 */
export type AvatarDefaultedProps = 'shape' | 'size' | 'color' | 'activeAppearance' | 'getInitials' | 'label' | 'icon';

export type AvatarState = ComponentStateCompat<AvatarProps, AvatarShorthandPropsCompat, AvatarDefaultedProps> & {
  /**
   * Ref to the root element
   */
  ref: React.Ref<HTMLElement>;

  /**
   * True if the avatar has no label/initials and should render an icon
   */
  showIcon?: boolean;
};
