import * as React from 'react';
import { Portal } from '@fluentui/react-portal';
import { getSlots } from '@fluentui/react-utilities';
import type { PopoverSurfaceSlots, PopoverSurfaceState } from './PopoverSurface.types';

/**
 * Render the final JSX of PopoverSurface
 */
export const renderPopoverSurface_unstable = (state: PopoverSurfaceState) => {
  const { slots, slotProps } = getSlots<PopoverSurfaceSlots>(state);

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
