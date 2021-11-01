import * as React from 'react';
import { Portal } from '@fluentui/react-portal';
import { getSlots } from '@fluentui/react-utilities';
import type { PopoverSurfaceSlots, PopoverSurfaceState } from './PopoverSurface.types';
import { popoverSurfaceSlots } from './usePopoverSurface';

/**
 * Render the final JSX of PopoverSurface
 */
export const renderPopoverSurface = (state: PopoverSurfaceState) => {
  const { slots, slotProps } = getSlots<PopoverSurfaceSlots>(state, popoverSurfaceSlots);

  // TODO should hidden Popovers be supported ?
  if (!state.open) {
    return null;
  }

  return (
    <Portal mountNode={state.mountNode}>
      <slots.root {...slotProps.root}>
        {!state.noArrow && <div ref={state.arrowRef} className={state.arrowClassName} />}
        {slotProps.root.children}
      </slots.root>
    </Portal>
  );
};
