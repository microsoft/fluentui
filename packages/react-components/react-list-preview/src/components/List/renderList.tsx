/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { ListState, ListSlots } from './List.types';

/**
 * Render the final JSX of List
 */
export const renderList_unstable = (state: ListState) => {
  assertSlots<ListSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <state.root />;
};
