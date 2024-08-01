/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { ListState, ListSlots, ListContextValues } from './List.types';
import { ListContextProvider } from './listContext';

/**
 * Render the final JSX of List
 */
export const renderList_unstable = (state: ListState, contextValues: ListContextValues) => {
  assertSlots<ListSlots>(state);

  return (
    <ListContextProvider value={contextValues.listContext}>
      <state.root />
    </ListContextProvider>
  );
};
