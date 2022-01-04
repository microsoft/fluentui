import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { dialogShorthandProps } from './useDialog';
import type { DialogState, DialogSlots } from './Dialog.types';

/**
 * Render the final JSX of Dialog
 */
export const renderDialog = (state: DialogState) => {
  const { slots, slotProps } = getSlots<DialogSlots>(state, dialogShorthandProps);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
