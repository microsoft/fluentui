import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { DialogState, DialogSlots } from './Dialog.types';
import { Portal } from '@fluentui/react-portal';

/**
 * Render the final JSX of Dialog
 */
export const renderDialog_unstable = (state: DialogState) => {
  const { slots, slotProps } = getSlots<DialogSlots>(state);

  // TODO Add handling for non-modal dialogs
  return state.isOpen ? (
    <Portal>
      {slots.overlay ? <slots.overlay {...slotProps.overlay} /> : <div className={state.overlayClassName} />}
      <slots.root {...slotProps.root}>{slotProps.root.children} </slots.root>
    </Portal>
  ) : null;
};
