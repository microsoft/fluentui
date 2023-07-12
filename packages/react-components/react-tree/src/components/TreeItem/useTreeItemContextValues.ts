import type { TreeItemContextValue } from '../../contexts';
import type { TreeItemContextValues, TreeItemState } from './TreeItem.types';

export function useTreeItemContextValues_unstable(
  state: Pick<TreeItemState, keyof TreeItemContextValue>,
): TreeItemContextValues {
  const {
    value,
    checked,
    defaultChecked,
    isActionsVisible,
    isAsideVisible,
    actionsRef,
    itemType,
    layoutRef,
    subtreeRef,
    expandIconRef,
    open,
  } = state;

  /**
   * This context is created with "@fluentui/react-context-selector",
   * there is no sense to memoize it
   */
  const treeItem: TreeItemContextValue = {
    isActionsVisible,
    isAsideVisible,
    value,
    actionsRef,
    checked,
    defaultChecked,
    itemType,
    layoutRef,
    subtreeRef,
    expandIconRef,
    open,
  };

  return { treeItem };
}
