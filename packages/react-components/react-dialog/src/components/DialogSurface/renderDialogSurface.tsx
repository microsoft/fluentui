import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { DialogSurfaceState, DialogSurfaceSlots, DialogSurfaceContextValues } from './DialogSurface.types';
import { DialogSurfaceProvider } from '../../contexts';

/**
 * Render the final JSX of DialogSurface
 */
export const renderDialogSurface_unstable = (state: DialogSurfaceState, contextValues: DialogSurfaceContextValues) => {
  const { slots, slotProps } = getSlots<DialogSurfaceSlots>(state);

  return (
    <DialogSurfaceProvider value={contextValues.dialogSurface}>
      <slots.root {...slotProps.root} />
    </DialogSurfaceProvider>
  );
};
