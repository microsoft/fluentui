import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { DialogFooterState, DialogFooterSlots } from './DialogFooter.types';

/**
 * Render the final JSX of DialogFooter
 */
export const renderDialogFooter_unstable = (state: DialogFooterState) => {
  const { slots, slotProps } = getSlots<DialogFooterSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
