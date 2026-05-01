import type * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

/**
 * PopoverSurface Slots
 */
export type PopoverSurfaceSlots = {
  root: Slot<'div'>;
};

export type PopoverSurfaceProps = ComponentProps<PopoverSurfaceSlots>;

export type PopoverSurfaceState = ComponentState<PopoverSurfaceSlots> & {
  withArrow: boolean | undefined;
  arrowRef: React.RefObject<HTMLDivElement | null>;
  'data-open': string;
};
