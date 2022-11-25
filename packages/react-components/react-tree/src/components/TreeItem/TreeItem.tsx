import * as React from 'react';
import { useTreeItem_unstable } from './useTreeItem';
import { renderTreeItem_unstable } from './renderTreeItem';
import { useTreeItemStyles_unstable } from './useTreeItemStyles';
import type { TreeItemProps } from './TreeItem.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * TreeItem component - Represents a single node on the Tree
 */
export const TreeItem: ForwardRefComponent<TreeItemProps> = React.forwardRef((props, ref) => {
  const state = useTreeItem_unstable(props, ref);

  useTreeItemStyles_unstable(state);
  return renderTreeItem_unstable(state);
});

TreeItem.displayName = 'TreeItem';
