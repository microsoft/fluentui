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
  popoverTrigger: NonNullable<Slot<typeof Button>>;

  /**
   * Popover surface that will be displayed when the popover is triggered.
   */
  popoverSurface: NonNullable<Slot<typeof PopoverSurface>>;
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
export type AvatarGroupState = ComponentState<AvatarGroupSlots> &
  Required<Pick<AvatarGroupProps, 'layout' | 'maxAvatars' | 'size' | 'strings' | 'overflowIndicator'>> & {
    /**
     * Tooltip content for the overflow indicator.
     */
    tooltipContent: TooltipProps['content'];

    /**
     * Whether there are more Avatars than `maxAvatars`.
     * @default false
     */
    hasOverflow: boolean;
  };

export type AvatarGroupStrings = {
  /**
   * Text applied to the overflow indicator's tooltip.
   */
  tooltipContent: string;
};
