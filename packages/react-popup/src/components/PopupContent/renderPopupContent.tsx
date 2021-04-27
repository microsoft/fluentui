import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { Portal } from '@fluentui/react-portal';
import { popupContentShorthandProps, PopupContentState } from './PopupContent.types';

/**
 * Render the final JSX of PopupContent
 */
export const renderPopupContent = (state: PopupContentState) => {
  const { slots, slotProps } = getSlots(state, popupContentShorthandProps);

  // TODO should hidden popups be supported ?
  if (!state.open) {
    return null;
  }

  return (
    <Portal mountNode={state.mountNode}>
      <slots.root {...slotProps.root}>{state.children}</slots.root>
    </Portal>
  );
};
