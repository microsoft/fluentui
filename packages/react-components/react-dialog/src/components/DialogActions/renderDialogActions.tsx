import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { DialogActionsState, DialogActionsSlots } from './DialogActions.types';

/**
 * Render the final JSX of DialogActions
 */
export const renderDialogActions_unstable = (state: DialogActionsState) => {
  const { slots, slotProps } = getSlots<DialogActionsSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
