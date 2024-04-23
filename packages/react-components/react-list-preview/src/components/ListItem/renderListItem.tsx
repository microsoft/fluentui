/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { ListItemState, ListItemSlots } from './ListItem.types';

/**
 * Render the final JSX of ListItem
 */
export const renderListItem_unstable = (state: ListItemState) => {
  assertSlots<ListItemSlots>(state);

  return (
    <state.root>
      {state.checkmark && <state.checkmark />}
      {state.root.children}
    </state.root>
  );
};
