'use client';

import * as React from 'react';
import type { TreeItemContextValues, TreeItemState } from './TreeItem.types';
import type { TreeItemContextValue } from '../../contexts';

export function useTreeItemContextValues_unstable(state: TreeItemState): TreeItemContextValues {
  const {
    value,
    itemType,
    layoutRef,
    subtreeRef,
    open,
    expandIconRef,
    actionsRef,
    treeItemRef,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    isActionsVisible,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    isAsideVisible,
    selectionRef,
    checked,
  } = state;

  const treeItem = React.useMemo<TreeItemContextValue>(
    () => ({
      value,
      checked,
      itemType,
      layoutRef,
      subtreeRef,
      open,
      selectionRef,
      isActionsVisible,
      isAsideVisible,
      actionsRef,
      treeItemRef,
      expandIconRef,
    }),
    [
      value,
      checked,
      itemType,
      layoutRef,
      subtreeRef,
      open,
      selectionRef,
      isActionsVisible,
      isAsideVisible,
      actionsRef,
      treeItemRef,
      expandIconRef,
    ],
  );

  return { treeItem };
}
