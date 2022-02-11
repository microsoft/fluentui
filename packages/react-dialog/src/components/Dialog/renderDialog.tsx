import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { DialogSlots, DialogRender } from './Dialog.types';

/**
 * Render the final JSX of Dialog
 */
export const renderDialog_unstable: DialogRender = state => {
  const { slots, slotProps } = getSlots<DialogSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
