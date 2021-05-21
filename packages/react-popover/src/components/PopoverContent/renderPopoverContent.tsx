import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { Portal } from '@fluentui/react-portal';
import { PopoverContentState } from './PopoverContent.types';
import { popoverContentShorthandProps } from './usePopoverContent';

/**
 * Render the final JSX of PopoverContent
 */
export const renderPopoverContent = (state: PopoverContentState) => {
  const { slots, slotProps } = getSlots(state, popoverContentShorthandProps);

  // TODO should hidden Popovers be supported ?
  if (!state.open) {
    return null;
  }

  return (
    <Portal mountNode={state.mountNode}>
      <slots.root {...slotProps.root}>{state.children}</slots.root>
    </Portal>
  );
};
