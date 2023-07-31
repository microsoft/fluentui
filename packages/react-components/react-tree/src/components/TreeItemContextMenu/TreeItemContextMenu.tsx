import * as React from 'react';
import { useTreeItemContextMenu_unstable } from './useTreeItemContextMenu';
import { renderTreeItemContextMenu_unstable } from './renderTreeItemContextMenu';
import type { TreeItemContextMenuProps } from './TreeItemContextMenu.types';
import { useTreeItemContextMenuContextValue_unstable } from './useTreeItemContextMenuContextValues';

export const TreeItemContextMenu: React.FC<TreeItemContextMenuProps> = props => {
  const state = useTreeItemContextMenu_unstable(props);
  const contextValues = useTreeItemContextMenuContextValue_unstable(state);
  return renderTreeItemContextMenu_unstable(state, contextValues);
};

TreeItemContextMenu.displayName = 'TreeItemContextMenu';
