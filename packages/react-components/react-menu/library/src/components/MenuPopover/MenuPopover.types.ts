import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import * as React from 'react';

export type MenuPopoverSlots = {
  root: Slot<'div'>;
};

/**
 * MenuPopover Props
 */
export type MenuPopoverProps = ComponentProps<MenuPopoverSlots>;

/**
 * State used in rendering MenuPopover
 */
export type MenuPopoverState = ComponentState<MenuPopoverSlots> & {
  safeZone?: React.ReactElement | null;

  /**
   * @deprecated Popover is always rendered in DOM order with HTML Popover API
   */
  mountNode?: HTMLElement | null | undefined;
};
