import type * as React from 'react';
import type { ComponentProps, ComponentState, DistributiveOmit, Slot } from '@fluentui/react-utilities';

/**
 * PopoverSurface Slots.
 *
 * The root renders as a native `<div popover="auto">` for non-modal surfaces
 * and as a `<dialog>` for the modal/focus-trap path.
 */
export type PopoverSurfaceSlots = {
  root: Slot<'dialog', 'div'>;
};

export type PopoverSurfaceProps = DistributiveOmit<ComponentProps<PopoverSurfaceSlots>, 'as'>;

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
