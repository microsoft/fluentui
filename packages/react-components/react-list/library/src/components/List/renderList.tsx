/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { ListState, ListSlots, ListContextValues } from './List.types';
import { ListContextProvider, SynchronousListContextProvider } from './listContext';

/**
 * Render the final JSX of List
 */
export const renderList_unstable = (state: ListState, contextValues: ListContextValues) => {
  assertSlots<ListSlots>(state);

  return (
    <ListContextProvider value={contextValues.listContext}>
      <SynchronousListContextProvider value={contextValues.synchronousContext}>
        <state.root />
      </SynchronousListContextProvider>
    </ListContextProvider>
  );
};
