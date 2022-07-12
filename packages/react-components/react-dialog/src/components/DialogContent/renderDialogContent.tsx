import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { DialogContentState, DialogContentSlots, DialogContentContextValues } from './DialogContent.types';
import { DialogContentProvider } from '../../contexts/dialogContentContext';

/**
 * Render the final JSX of DialogContent
 */
export const renderDialogContent_unstable = (state: DialogContentState, contextValues: DialogContentContextValues) => {
  const { slots, slotProps } = getSlots<DialogContentSlots>(state);

  return (
    <DialogContentProvider value={contextValues.dialogContent}>
      <slots.root {...slotProps.root} />
    </DialogContentProvider>
  );
};
