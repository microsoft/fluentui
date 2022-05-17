import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { PopoverSurface } from '@fluentui/react-popover';
import { AvatarSizes } from '../Avatar/Avatar.types';
import { Button } from '@fluentui/react-button';
import { TooltipProps } from '@fluentui/react-tooltip';

export type AvatarGroupSlots = {
  root: Slot<'div'>;

  /**
   * Popover trigger slot that can be used to change the overflow indicator.
   */
  popoverTrigger?: Slot<typeof Button>;

  /**
   * Popover surface that will be displayed when the popover is triggered.
   */
  popoverSurface?: Slot<typeof PopoverSurface>;
};

/**
 * AvatarGroup Props
 */
export type AvatarGroupProps = ComponentProps<AvatarGroupSlots> & {
  /**
   * Layout the Avatars should be displayed as.
   * @default spread
   */
  layout?: 'spread' | 'stack' | 'pie';

  /**
   * Maximum number of Avatars to be displayed before overflowing.
   * NOTE: if pie layout is used, `maxAvatars` will be ignored.
   * @default 5
   */
  maxAvatars?: number;

  /**
   * Whether the overflow indicator should render an icon instead of the number of overflowed avatars.
   * @default false
   */
  overflowIndicator?: 'number-overflowed' | 'icon';

  /**
   * Size of the avatars.
   * @default 32
   */
  size?: AvatarSizes;

  /**
   * Strings for localizing text in the tooltip.
   */
  strings?: AvatarGroupStrings;
};

/**
 * State used in rendering AvatarGroup
 */
export type AvatarGroupState = ComponentState<AvatarGroupSlots> & {
  tooltipContent: TooltipProps['content'];
};

export type AvatarGroupStrings = {
  /**
   * Text applied to the overflow indicator's tooltip.
   * Can include the token "\{numOverflowedAvatars\}" which will be replaced with the number of overflowed avatars.
   */
  tooltipContent: string;
};
