'use client';
import { useTreeItem_unstable, useTreeItemContextValues_unstable } from '@fluentui/react-tree';
import type { TreeItemState, TreeItemContextValues } from './TreeItem.types';
export const useTreeItem = useTreeItem_unstable;
export const useTreeItemContextValues = useTreeItemContextValues_unstable as (
  state: TreeItemState,
) => TreeItemContextValues;
