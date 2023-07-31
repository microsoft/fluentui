import { useMenuContextValues_unstable } from '@fluentui/react-menu';
import { TreeItemContextMenuContextValues, TreeItemContextMenuState } from './TreeItemContextMenu.types';

export const useTreeItemContextMenuContextValue_unstable: (
  state: TreeItemContextMenuState,
) => TreeItemContextMenuContextValues = useMenuContextValues_unstable;
