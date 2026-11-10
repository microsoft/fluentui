/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { ListState, ListSlots, ListContextValues } from './List.types';
import { ListContextProvider, ListSynchronousContextProvider } from './listContext';

/**
 * Render the final JSX of List
 */
export const renderList_unstable = (state: ListState, contextValues: ListContextValues): JSXElement => {
  assertSlots<ListSlots>(state);

  return (
    <ListContextProvider value={contextValues.listContext}>
      <ListSynchronousContextProvider value={contextValues.synchronousContext}>
        <state.root />
      </ListSynchronousContextProvider>
    </ListContextProvider>
  );
};
