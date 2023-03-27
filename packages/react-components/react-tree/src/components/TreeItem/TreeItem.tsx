import * as React from 'react';
import { useTreeItem_unstable } from './useTreeItem';
import { renderTreeItem_unstable } from './renderTreeItem';
import { useTreeItemStyles_unstable } from './useTreeItemStyles';
import type { TreeItemProps } from './TreeItem.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTreeItemContextValues_unstable } from './useTreeItemContextValues';

/**
 * TreeItem component - TODO: add more docs
 */
export const TreeItem: ForwardRefComponent<TreeItemProps> = React.forwardRef((props, ref) => {
  const state = useTreeItem_unstable(props, ref);

  useTreeItemStyles_unstable(state);
  const contextValues = useTreeItemContextValues_unstable(state);
  return renderTreeItem_unstable(state, contextValues);
});

TreeItem.displayName = 'TreeItem';
