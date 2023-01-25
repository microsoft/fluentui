import * as React from 'react';
import { TreeItemContextValue } from '../../contexts';
import type { TreeItemContextValues, TreeItemState } from './TreeItem.types';

export function useTreeItemContextValues_unstable(state: TreeItemState): TreeItemContextValues {
  const { isActionsVisible } = state;

  const treeItem: TreeItemContextValue = React.useMemo(
    () => ({
      isActionsVisible,
    }),
    [isActionsVisible],
  );

  return { treeItem };
}
