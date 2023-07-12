import * as React from 'react';
import type { TreeItemContextValues, TreeItemState } from './TreeItem.types';
import type { TreeItemContextValue, TreeItemSlotsContextValue } from '../../contexts';

export function useTreeItemContextValues_unstable(state: TreeItemState): TreeItemContextValues {
  const { value, itemType, layoutRef, subtreeRef, open, actions, aside, expandIcon } = state;

  /**
   * This context is created with "@fluentui/react-context-selector",
   * there is no sense to memoize it
   */
  const treeItem: TreeItemContextValue = {
    value,
    itemType,
    layoutRef,
    subtreeRef,
    open,
  };

  const treeItemSlots: TreeItemSlotsContextValue = React.useMemo(
    () => ({ actions, aside, expandIcon }),
    [actions, aside, expandIcon],
  );

  return { treeItem, treeItemSlots };
}
