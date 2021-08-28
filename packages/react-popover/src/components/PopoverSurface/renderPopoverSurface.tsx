import * as React from 'react';
import { getSlotsCompat } from '@fluentui/react-utilities';
import { Portal } from '@fluentui/react-portal';
import type { PopoverSurfaceState } from './PopoverSurface.types';

/**
 * Render the final JSX of PopoverSurface
 */
export const renderPopoverSurface = (state: PopoverSurfaceState) => {
  const { slots, slotProps } = getSlotsCompat(state);

  // TODO should hidden Popovers be supported ?
  if (!state.open) {
    return null;
  }

  return (
    <Portal mountNode={state.mountNode}>
      <slots.root {...slotProps.root}>
        {!state.noArrow && <div ref={state.arrowRef} className={state.arrowClassName} />}
        {state.children}
      </slots.root>
    </Portal>
  );
};
