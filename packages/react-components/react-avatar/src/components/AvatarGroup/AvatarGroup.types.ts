import { PopoverSurface } from '@fluentui/react-popover';
import { TooltipProps } from '@fluentui/react-tooltip';
import type { AvatarSizes } from '../Avatar/Avatar.types';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type AvatarGroupSlots = {
  root: NonNullable<Slot<'div'>>;

  /**
   * Popover trigger slot that can be used to change the overflow indicator.
   */
  popoverTrigger: NonNullable<Slot<'button'>>;

  /**
   * Popover surface that will be displayed when the popover is triggered.
   */
  popoverSurface: NonNullable<Slot<typeof PopoverSurface>>;

  /**
   * Unordered list that contains the overflow AvatarGroupItems.
   */
  popoverSurfaceList: NonNullable<Slot<'ul'>>;
};

/**
 * AvatarGroup Props
 */
export type AvatarGroupProps = ComponentProps<Partial<AvatarGroupSlots>> & {
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
  Required<Pick<AvatarGroupProps, 'layout' | 'maxAvatars' | 'size' | 'overflowIndicator'>> & {
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
