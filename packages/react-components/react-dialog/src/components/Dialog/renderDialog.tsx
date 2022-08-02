import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { Portal } from '@fluentui/react-portal';
import { DialogProvider, DialogSurfaceProvider } from '../../contexts';
import type { DialogState, DialogSlots, DialogContextValues } from './Dialog.types';

/**
 * Render the final JSX of Dialog
 */
export const renderDialog_unstable = (state: DialogState, contextValues: DialogContextValues) => {
  const { content, trigger, open } = state;
  const { slots, slotProps } = getSlots<DialogSlots>(state);

  return (
    <DialogProvider value={contextValues.dialog}>
      <DialogSurfaceProvider value={contextValues.dialogSurface}>
        {trigger}
        {open && (
          <Portal>
            {slots.overlay && <slots.overlay {...slotProps.overlay} />}
            {content}
          </Portal>
        )}
      </DialogSurfaceProvider>
    </DialogProvider>
  );
};
