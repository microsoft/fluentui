import type * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

/**
 * PopoverSurface Slots.
 *
 * The root renders as a native `<dialog popover="auto">` so a single element
 * supports both show modes: `showPopover()` for non-modal (default) and
 * `showModal()` for the modal/focus-trap path.
 */
export type PopoverSurfaceSlots = {
  root: Slot<'dialog'>;
};

export type PopoverSurfaceProps = ComponentProps<PopoverSurfaceSlots>;

export type PopoverSurfaceState = ComponentState<PopoverSurfaceSlots> & {
  withArrow: boolean | undefined;
  arrowRef: React.RefObject<HTMLDivElement | null>;
  'data-open': string;
};
