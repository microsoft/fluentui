import type * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { AvatarGroupProps } from '@fluentui/react-avatar';

import type { PopoverProps } from '../../Popover/Popover.types';
import type { PopoverSurface } from '../../Popover/PopoverSurface/PopoverSurface';

/**
 * Subset of the headless {@link PopoverProps} forwarded to the underlying
 * `Popover` that wraps the overflow surface.
 */
export type AvatarGroupPopoverPopoverProps = Pick<
  PopoverProps,
  | 'open'
  | 'defaultOpen'
  | 'onOpenChange'
  | 'openOnHover'
  | 'openOnContext'
  | 'mouseLeaveDelay'
  | 'positioning'
  | 'withArrow'
  | 'trapFocus'
>;

export type AvatarGroupPopoverSlots = {
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
};

/**
 * AvatarGroupPopover Props
 */
export type AvatarGroupPopoverProps = Omit<ComponentProps<Partial<AvatarGroupPopoverSlots>>, 'children'> &
  AvatarGroupPopoverPopoverProps & {
    /**
     * Whether the triggerButton should render an icon instead of the number of overflowed AvatarGroupItems.
     * @default count
     */
    indicator?: 'count' | 'icon';

    /**
     * Number of AvatarGroupItems that will be rendered.
     *
     * Note: AvatarGroupPopover handles counting the number of children, but when using a react fragment to wrap the
     * children, this is not possible and therefore it has to be added manually.
     */
    count?: number;

    children: React.ReactNode;
  };

/**
 * AvatarGroupPopover State
 */
export type AvatarGroupPopoverState = ComponentState<AvatarGroupPopoverSlots> &
  Required<Pick<AvatarGroupPopoverProps, 'count' | 'indicator'>> & {
    popoverOpen: boolean;
    layout: AvatarGroupProps['layout'];

    /**
     * Behavior props forwarded to the headless `Popover` wrapper.
     */
    popover: AvatarGroupPopoverPopoverProps;
  };
