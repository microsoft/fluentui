import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { DialogContentState, DialogContentSlots } from './DialogContent.types';

/**
 * Render the final JSX of DialogContent
 */
export const renderDialogContent_unstable = (state: DialogContentState) => {
  const { slots, slotProps } = getSlots<DialogContentSlots>(state);

  return <slots.root {...slotProps.root} />;
};
