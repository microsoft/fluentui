import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { DialogState, DialogSlots } from './Dialog.types';

/**
 * Render the final JSX of Dialog
 */
export const renderDialog_unstable = (state: DialogState) => {
  const { slots, slotProps } = getSlots<DialogSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
