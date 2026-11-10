import type * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

/**
 * PopoverSurface Slots.
 *
 * The root renders as a native `<dialog>` by default and can be changed to a
 * `<div>` for non-modal surfaces. Focus trapping requires a `<dialog>`.
 */
export type PopoverSurfaceSlots = {
  root: Slot<'dialog', 'div'>;
};

export type PopoverSurfaceProps = ComponentProps<PopoverSurfaceSlots>;

export type PopoverSurfaceState = ComponentState<PopoverSurfaceSlots> & {
  /**
   * Indicates whether the popover surface has an arrow.
   */
  withArrow: boolean | undefined;
  /**
   * A ref pointing to the popover surface arrow element.
   */
  arrowRef: React.RefObject<HTMLDivElement | null>;

  root: {
    /**
     * Indicates whether the popover surface is open.
     */
    'data-open'?: string;

    /**
     * Indicates that the element is a popover surface.
     */
    'data-popover-surface'?: string;
  };
};
