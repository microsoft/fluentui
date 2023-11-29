/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { ItemLayout } from '@fluentui/react-migration-v0-v9';
import { assertSlots } from '@fluentui/react-utilities';
import type { ListItemSlots, ListItemState } from './ListItem.types';
/**
 * Render the final JSX of ListItem
 */
export const renderListItem_unstable = (state: ListItemState) => {
  assertSlots<ListItemSlots>(state);

  return (
    <state.root>
      <ItemLayout
        startMedia={state.media}
        header={state.header}
        headerMedia={state.headerMedia}
        contentWrapper={state.contentWrapper}
        contentMedia={state.contentMedia}
        endMedia={state.endMedia}
      >
        {state.root.children}
      </ItemLayout>
    </state.root>
  );
};
