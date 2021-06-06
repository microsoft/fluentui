import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { Portal } from '@fluentui/react-portal';
import { PopoverOverlayState } from './PopoverOverlay.types';

/**
 * Render the final JSX of PopoverOverlay
 */
export const renderPopoverOverlay = (state: PopoverOverlayState) => {
  const { slots, slotProps } = getSlots(state);

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
