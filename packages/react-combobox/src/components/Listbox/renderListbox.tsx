import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { listboxShorthandProps } from './useListbox';
import type { ListboxState, ListboxSlots } from './Listbox.types';

/**
 * Render the final JSX of Listbox
 */
export const renderListbox = (state: ListboxState) => {
  const { slots, slotProps } = getSlots<ListboxSlots>(state, listboxShorthandProps);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
