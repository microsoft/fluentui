import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { DialogHeaderState, DialogHeaderSlots } from './DialogHeader.types';

/**
 * Render the final JSX of DialogHeader
 */
export const renderDialogHeader_unstable = (state: DialogHeaderState) => {
  const { slots, slotProps } = getSlots<DialogHeaderSlots>(state);

  return <slots.root {...slotProps.root} />;
};
