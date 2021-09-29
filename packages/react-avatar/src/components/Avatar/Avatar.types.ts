import * as React from 'react';
import type {
  ComponentProps,
  ComponentState,
  IntrinsicShorthandProps,
  ObjectShorthandProps,
  ShorthandRenderFunction,
} from '@fluentui/react-utilities';
import type { PresenceBadgeProps } from '@fluentui/react-badge';

export type AvatarSlots = {
  root: Omit<IntrinsicShorthandProps<'span'>, 'color'> & { children?: never };

  /**
   * This overidden in the component's props, it's only here to make `getSlots` work
   * `img`  is an exception since it should never accept children, but can accept a children render function
   */
  image?: IntrinsicShorthandProps<'img'>;

  /**
   * The label shown when there's no image. Defaults to the initials derived from `name` using `getInitials`.
   */
  label?: IntrinsicShorthandProps<'span'>;

  /**
   * Icon to be displayed when the avatar doesn't have an image or name (or if getInitials returns an empty string).
   *
   * @defaultvalue `Person20Regular` (the default icon's size depends on the Avatar's size)
   */
  icon?: IntrinsicShorthandProps<'span'>;

  /**
   * Badge to show the avatar's presence status.
   */
  badge?: ObjectShorthandProps<PresenceBadgeProps>;
};

export type AvatarCommons = Omit<React.HTMLAttributes<HTMLElement>, 'children'> & {
  /**
   * The name used for displaying the initials of the avatar if the image is not provided
   */
  name: string;

  /**
   * Custom method for generating the initials from the name property, which is shown if no image is provided.
   */
  getInitials: (name: string, isRtl: boolean) => string;

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
  size: 20 | 24 | 28 | 32 | 36 | 40 | 48 | 56 | 64 | 72 | 96 | 120 | 128;

  /**
   * The avatar can have a circular or square shape.
   * @defaultvalue circular
   */
  shape: 'circular' | 'square';

  /**
   * Optional activity indicator
   * * active: the avatar will be decorated according to activeAppearance
   * * inactive: the avatar will be reduced in size and partially transparent
   * * unset: normal display
   *
   * @defaultvalue unset
   */
  active: 'active' | 'inactive' | 'unset';

  /**
   * The appearance when `active="active"`
   *
   * @defaultvalue ring
   */
  activeAppearance: 'ring' | 'shadow' | 'glow' | 'ring-shadow' | 'ring-glow';

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
  idForColor: string | undefined;
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
 * Properties for Avatar
 */
export type AvatarProps = Omit<ComponentProps<AvatarSlots>, 'image'> &
  Partial<AvatarCommons> & {
    /**
     * The Avatar's image. Cannot be typed as a normal slot since it should not accept any children
     * but can accept a children render function.
     */
    image?: Omit<IntrinsicShorthandProps<'img'>, 'children'> & {
      children?: ShorthandRenderFunction<React.HTMLAttributes<HTMLImageElement>>;
    };
  };

/**
 * State used in rendering Avatar
 */
export type AvatarState = ComponentState<AvatarSlots> &
  AvatarCommons & {
    /**
     * The Avatar's color, with `'colorful'` resolved to a named color
     */
    color: Exclude<AvatarCommons['color'], 'colorful'>;
  };
