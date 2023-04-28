/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';
import type { ListboxContextValues, ListboxState, ListboxSlots } from './Listbox.types';
import { ListboxContext } from '../../contexts/ListboxContext';

/**
 * Render the final JSX of Listbox
 */
export const renderListbox_unstable = (state: ListboxState, contextValues: ListboxContextValues) => {
  const { slots, slotProps } = getSlotsNext<ListboxSlots>(state);

  return (
    <ListboxContext.Provider value={contextValues.listbox}>
      <slots.root {...slotProps.root} />
    </ListboxContext.Provider>
  );
};
