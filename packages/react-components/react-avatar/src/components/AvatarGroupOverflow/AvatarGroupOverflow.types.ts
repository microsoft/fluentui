import * as React from 'react';
import type { AvatarSizes } from '../Avatar/Avatar.types';
import type { AvatarGroupProps } from '../AvatarGroup/AvatarGroup.types';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { PopoverProps, PopoverSurface } from '@fluentui/react-popover';
import type { TooltipProps } from '@fluentui/react-tooltip';

export type AvatarGroupOverflowSlots = {
  root: NonNullable<Slot<PopoverProps>>;

  /**
   * Overflow indicator that triggers the Popover.
   */
  overflowButton: NonNullable<Slot<'button'>>;

  /**
   * List that contains the overflow AvatarGroupItems.
   */
  overflowContent: NonNullable<Slot<'div'>>;

  /**
   * PopoverSurface that contains the overflow content.
   */
  overflowSurface: NonNullable<Slot<typeof PopoverSurface>>;
};

/**
 * AvatarGroupOverflow Props
 */
export type AvatarGroupOverflowProps = Omit<ComponentProps<Partial<AvatarGroupOverflowSlots>>, 'children'> & {
  /**
   * Whether the overflow indicator should render an icon instead of the number of overflowed AvatarGroupItems.
   * Note: The overflowIndicator will default to `icon` when the size is less than 24.
   * @default count
   */
  overflowIndicator?: 'count' | 'icon';

  /**
   * Number of AvatarGroupItems that will be rendered.
   *
   * Note: AvatarGroupOverflow handles counting the number of children, but when using a react fragment to wrap the
   * children, this is not possible and therefore it has do be added manually.
   */
  count?: number;

  children: React.ReactNode;
};

/**
 * State used in rendering AvatarGroupOverflow
 */
export type AvatarGroupOverflowState = ComponentState<AvatarGroupOverflowSlots> &
  Required<Pick<AvatarGroupOverflowProps, 'overflowIndicator'>> & {
    /**
     * Tooltip content for the overflow button.
     */
    tooltipContent: TooltipProps['content'];

    isPopoverOpen: boolean;
    layout: AvatarGroupProps['layout'];
    size: AvatarSizes;
  };
