'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TreeItemProps } from './TreeItem.types';
import { useTreeItem, useTreeItemContextValues } from './useTreeItem';
import { renderTreeItem } from './renderTreeItem';

/**
 * Represents a single `treeitem` within a `Tree`.
 *
 * Must be rendered inside a `Tree`. A `branch` item renders its subtree as a nested `Tree`, and its
 * content is usually rendered with a `TreeItemLayout`.
 */
export const TreeItem: ForwardRefComponent<TreeItemProps> = React.forwardRef((props, ref) => {
  const state = useTreeItem(props, ref);
  const contextValues = useTreeItemContextValues(state);

  return renderTreeItem(state, contextValues);
});

TreeItem.displayName = 'TreeItem';
