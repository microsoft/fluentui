import * as React from 'react';
import { PresenceBadge } from '@fluentui/react-badge';
import type {
  ComponentProps,
  ComponentSlotProps,
  ComponentState,
  IntrinsicSlotProps,
  SlotRenderFunction,
} from '@fluentui/react-utilities';

export type AvatarSlots = {
  root: Omit<IntrinsicSlotProps<'span'>, 'color'> & { children?: never };

  /**
   * This overidden in the component's props, it's only here to make `getSlots` work
   * `img`  is an exception since it should never accept children, but can accept a children render function
   */
  image?: IntrinsicSlotProps<'img'>;

  /**
   * (optional) Custom initials.
   *
   * It is usually not necessary to specify custom initials; by default they will be derived from the `name` prop,
   * using the `getInitials` function.
   *
   * The initials are displayed when there is no image (including while the image is loading).
   */
  initials?: IntrinsicSlotProps<'span'>;

  /**
   * Icon to be displayed when the avatar doesn't have an image or initials.
   *
   * @defaultvalue `PersonRegular` (the default icon's size depends on the Avatar's size)
   */
  icon?: IntrinsicSlotProps<'span'>;

  /**
   * Badge to show the avatar's presence status.
   */
  badge?: ComponentSlotProps<typeof PresenceBadge>;
};

export type AvatarCommonsUnstable = Omit<React.HTMLAttributes<HTMLElement>, 'children'> & {
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
  activeAppearance: 'ring' | 'shadow' | 'ring-shadow';

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
  Partial<AvatarCommonsUnstable> & {
    /**
     * The Avatar's image. Cannot be typed as a normal slot since it should not accept any children
     * but can accept a children render function.
     */
    image?: Omit<IntrinsicSlotProps<'img'>, 'children'> & {
      children?: SlotRenderFunction<React.HTMLAttributes<HTMLImageElement>>;
    };
  };

/**
 * State used in rendering Avatar
 */
export type AvatarState = ComponentState<AvatarSlots> &
  AvatarCommonsUnstable & {
    /**
     * The Avatar's color, with `'colorful'` resolved to a named color
     */
    color: Exclude<AvatarCommonsUnstable['color'], 'colorful'>;
  };
