import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { ListboxContextValues, ListboxState, ListboxSlots } from './Listbox.types';
import { ListboxContext } from '../../contexts/ListboxContext';

/**
 * Render the final JSX of Listbox
 */
export const renderListbox_unstable = (state: ListboxState, contextValues: ListboxContextValues) => {
  const { slots, slotProps } = getSlots<ListboxSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      <ListboxContext.Provider value={contextValues.listbox}>{state.children}</ListboxContext.Provider>
    </slots.root>
  );
};
