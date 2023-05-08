import * as React from 'react';
import type { AvatarSize } from '../Avatar/Avatar.types';
import type { AvatarGroupProps } from '../AvatarGroup/AvatarGroup.types';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { PopoverProps, PopoverSurface } from '@fluentui/react-popover';
import type { TooltipProps } from '@fluentui/react-tooltip';

export type AvatarGroupPopoverSlots = {
  root: NonNullable<Slot<PopoverProps>>;

  /**
   * Button that triggers the Popover.
   */
  triggerButton: NonNullable<Slot<'button'>>;

  /**
   * List that contains the overflowed AvatarGroupItems.
   */
  content: NonNullable<Slot<'ul'>>;

  /**
   * PopoverSurface that contains the content.
   */
  popoverSurface: NonNullable<Slot<typeof PopoverSurface>>;

  /**
   * Tooltip shown when triggerButton is hovered.
   */
  tooltip: NonNullable<Slot<TooltipProps>>;
};

/**
 * AvatarGroupPopover Props
 */
export type AvatarGroupPopoverProps = Omit<ComponentProps<Partial<AvatarGroupPopoverSlots>>, 'children'> & {
  /**
   * Whether the triggerButton should render an icon instead of the number of overflowed AvatarGroupItems.
   * Note: The indicator will default to `icon` when the size is less than 24.
   * @default count
   */
  indicator?: 'count' | 'icon';

  /**
   * Number of AvatarGroupItems that will be rendered.
   *
   * Note: AvatarGroupPopover handles counting the number of children, but when using a react fragment to wrap the
   * children, this is not possible and therefore it has do be added manually.
   */
  count?: number;

  children: React.ReactNode;
};

/**
 * State used in rendering AvatarGroupPopover
 */
export type AvatarGroupPopoverState = ComponentState<AvatarGroupPopoverSlots> &
  Required<Pick<AvatarGroupPopoverProps, 'count' | 'indicator'>> & {
    popoverOpen: boolean;
    layout: AvatarGroupProps['layout'];
    size: AvatarSize;
  };
