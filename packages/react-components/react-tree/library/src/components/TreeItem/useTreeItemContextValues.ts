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
    // eslint-disable-next-line deprecation/deprecation
    isActionsVisible,
    // eslint-disable-next-line deprecation/deprecation
    isAsideVisible,
    selectionRef,
    checked,
  } = state;

  /**
   * This context is created with "@fluentui/react-context-selector",
   * there is no sense to memoize it
   */
  const treeItem: TreeItemContextValue = {
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
  };

  return { treeItem };
}
