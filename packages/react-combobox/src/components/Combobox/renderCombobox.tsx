import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { ComboboxState, ComboboxSlots } from './Combobox.types';

/**
 * Render the final JSX of Combobox
 */
export const renderCombobox_unstable = (state: ComboboxState) => {
  const { slots, slotProps } = getSlots<ComboboxSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
