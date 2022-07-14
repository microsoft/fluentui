import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { Portal } from '@fluentui/react-portal';
import type { DialogState, DialogSlots, DialogContextValues } from './Dialog.types';
import { DialogProvider } from './DialogContext';

/**
 * Render the final JSX of Dialog
 */
export const renderDialog_unstable = (state: DialogState, contextValues: DialogContextValues) => {
  const { content, trigger } = state;
  const { slots, slotProps } = getSlots<DialogSlots>(state);

  return (
    <DialogProvider value={contextValues.dialog}>
      {trigger}
      <Portal>
        <slots.overlay {...slotProps.overlay} />
        {content}
      </Portal>
    </DialogProvider>
  );
};
