import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { ListboxState, ListboxSlots } from './Listbox.types';
import { ListboxContext } from '../../contexts/ListboxContext';
import { ListboxContextValues } from '../../contexts/ListboxContext';

/**
 * Render the final JSX of Listbox
 */
export const renderListbox = (state: ListboxState, contextValues: ListboxContextValues) => {
  const { slots, slotProps } = getSlots<ListboxSlots>(state);

  // TODO Add additional slots in the appropriate place
  return (
    <slots.root {...slotProps.root}>
      <ListboxContext.Provider value={contextValues.listbox}>{slotProps.root.children}</ListboxContext.Provider>
    </slots.root>
  );
};
