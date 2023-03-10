import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { DialogSurfaceState, DialogSurfaceSlots, DialogSurfaceContextValues } from './DialogSurface.types';
import { DialogSurfaceProvider } from '../../contexts';
import { Portal } from '@fluentui/react-portal';

/**
 * Render the final JSX of DialogSurface
 */
export const renderDialogSurface_unstable = (state: DialogSurfaceState, contextValues: DialogSurfaceContextValues) => {
  const { slots, slotProps } = getSlots<DialogSurfaceSlots>(state);

  return (
    <Portal>
      {slots.backdrop && <slots.backdrop {...slotProps.backdrop} />}
      <DialogSurfaceProvider value={contextValues.dialogSurface}>
        <slots.root {...slotProps.root} />
      </DialogSurfaceProvider>
    </Portal>
  );
};
