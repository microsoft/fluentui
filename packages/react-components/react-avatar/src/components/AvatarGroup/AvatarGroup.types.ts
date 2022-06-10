import { PopoverSurface } from '@fluentui/react-popover';
import { TooltipProps } from '@fluentui/react-tooltip';
import type { AvatarSizes } from '../Avatar/Avatar.types';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type AvatarGroupSlots = {
  root: NonNullable<Slot<'div'>>;

  /**
   * Popover trigger slot that can be used to change the overflow indicator.
   */
  overflowButton?: NonNullable<Slot<'button'>>;

  /**
   * List that contains the overflow AvatarGroupItems.
   */
  overflowContent?: NonNullable<Slot<typeof PopoverSurface>>;
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
   * Note: if pie layout is used, `maxAvatars` will be ignored.
   * @default 5
   */
  maxAvatars?: number;

  /**
   * Whether the overflow indicator should render an icon instead of the number of overflowed avatars.
   * Note: The overflowIndicator will default to `icon` when the size is less than 24.
   * @default count
   */
  overflowIndicator?: 'count' | 'icon';

  /**
   * Size of the avatars.
   * @default 32
   */
  size?: AvatarSizes;
};

/**
 * State used in rendering AvatarGroup
 */
export type AvatarGroupState = ComponentState<AvatarGroupSlots> &
  Required<Pick<AvatarGroupProps, 'layout' | 'size' | 'overflowIndicator'>> & {
    /**
     * Whether there are more Avatars than `maxAvatars`.
     * @default false
     */
    hasOverflow: boolean;

    /**
     * Tooltip content for the overflow indicator.
     */
    tooltipContent: TooltipProps['content'];
  };
