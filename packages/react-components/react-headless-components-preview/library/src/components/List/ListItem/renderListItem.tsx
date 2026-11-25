/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';

import type { ListItemSlots, ListItemState } from './ListItem.types';

/**
 * Renders the final JSX of the ListItem component, given the state.
 */
export const renderListItem = (state: ListItemState): JSXElement => {
  assertSlots<ListItemSlots>(state);

  return (
    <state.root>
      {state.checkmark &&
        (state.root.role === 'row' ? (
          <span role="gridcell">
            <state.checkmark />
          </span>
        ) : (
          <state.checkmark />
        ))}
      {state.root.children}
    </state.root>
  );
};
