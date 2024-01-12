/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { ListboxContextValues, ListboxState, ListboxSlots } from './Listbox.types';
import { ListboxContext } from '../../contexts/ListboxContext';
import { ActiveDescendantContextProvider } from '../../../../react-aria/src/index';

/**
 * Render the final JSX of Listbox
 */
export const renderListbox_unstable = (state: ListboxState, contextValues: ListboxContextValues) => {
  assertSlots<ListboxSlots>(state);

  return (
    <ActiveDescendantContextProvider value={contextValues.activeDescendant}>
      <ListboxContext.Provider value={contextValues.listbox}>
        <state.root />
      </ListboxContext.Provider>
    </ActiveDescendantContextProvider>
  );
};
