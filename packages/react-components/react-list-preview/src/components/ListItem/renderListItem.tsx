/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { assertSlots } from '@fluentui/react-utilities';
import type { ListItemState, ListItemSlots } from './ListItem.types';

/**
 * Render the final JSX of ListItem
 */
export const renderListItem_unstable = (state: ListItemState) => {
  assertSlots<ListItemSlots>(state);

  // TODO Add additional slots in the appropriate place
  return (
    <state.root>
      {state.checkbox ? <state.checkbox /> : null}
      {state.root.children}
    </state.root>
  );
};
