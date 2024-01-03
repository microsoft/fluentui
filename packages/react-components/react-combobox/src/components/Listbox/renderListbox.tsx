/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { ListboxContextValues, ListboxState, ListboxSlots } from './Listbox.types';
import { ListboxContext } from '../../contexts/ListboxContext';

/**
 * Render the final JSX of Listbox
 */
export const renderListbox_unstable = (state: ListboxState, contextValues: ListboxContextValues) => {
  assertSlots<ListboxSlots>(state);

  return (
    <ListboxContext.Provider value={contextValues.listbox}>
      <state.root />
    </ListboxContext.Provider>
  );
};
