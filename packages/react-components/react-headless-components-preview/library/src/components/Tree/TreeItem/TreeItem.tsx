'use client';
import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TreeItemProps } from './TreeItem.types';
import { useTreeItem, useTreeItemContextValues } from './useTreeItem';
import { renderTreeItem } from './renderTreeItem';

export const TreeItem: ForwardRefComponent<TreeItemProps> = React.forwardRef((props, ref) => {
  const state = useTreeItem(props, ref);
  const contextValues = useTreeItemContextValues(state);
  return renderTreeItem(state, contextValues);
});
TreeItem.displayName = 'TreeItem';
