import { FlatTree, FlatTreeItem } from '../hooks/useFlatTree';
import { TreeItemId, TreeNavigationData_unstable } from '../Tree';
import { flatTreeRootParentId, UnfilteredFlatTree } from './createUnfilteredFlatTree';
import { ImmutableSet } from './ImmutableSet';
import { treeDataTypes } from './tokens';

/**
 * creates methods that depend on the unfilteredFlatTree and the current available openItems
 */
export function createVisibleFlatTree(
  unfilteredFlatTree: UnfilteredFlatTree,
  openItems: ImmutableSet<TreeItemId>,
): Pick<FlatTree, 'items' | 'getNextNavigableItem'> {
  let visibleItems: FlatTreeItem[] | null = null;

  const getNextNavigableItem = (data: TreeNavigationData_unstable): FlatTreeItem | null => {
    const item = unfilteredFlatTree.itemsPerId.get(data.target.id);
    if (!item || !visibleItems) {
      return null;
    }
    switch (data.type) {
      case treeDataTypes.arrowLeft:
        return item.parentId ? unfilteredFlatTree.itemsPerId.get(item.parentId) ?? null : null;
      case treeDataTypes.arrowRight:
        return visibleItems[item.index + 1] ?? null;
      case treeDataTypes.end:
        return visibleItems[visibleItems.length - 1];
      case treeDataTypes.home:
        return visibleItems[0];
      case treeDataTypes.arrowDown:
        return visibleItems[item.index + 1] ?? null;
      case treeDataTypes.arrowUp:
        return visibleItems[item.index - 1] ?? null;
      default:
        return null;
    }
  };

  function* makeVisibleItemsGenerator() {
    visibleItems = [];
    for (let index = 0, visibleIndex = 0; index < unfilteredFlatTree.items.length; index++) {
      const item = unfilteredFlatTree.items[index];
      const parent = unfilteredFlatTree.itemsPerId.get(item.parentId ?? flatTreeRootParentId);
      if (!parent) {
        break;
      }
      if (isFlatTreeItemVisible(item, { openItems, unfilteredFlatTree })) {
        item.index = visibleIndex++;
        visibleItems.push({ ...item });
        yield item;
      } else {
        index += parent.childrenSize - 1 + item.childrenSize;
      }
    }
  }

  return {
    getNextNavigableItem,
    items: () => {
      return visibleItems || makeVisibleItemsGenerator();
    },
  };
}

function isFlatTreeItemVisible(
  item: FlatTreeItem,
  {
    openItems,
    unfilteredFlatTree: flatTree,
  }: {
    openItems: ImmutableSet<TreeItemId>;
    unfilteredFlatTree: UnfilteredFlatTree;
  },
) {
  if (item.level === 1) {
    return true;
  }
  while (item.parentId && item.parentId !== flatTreeRootParentId) {
    if (!openItems.has(item.parentId)) {
      return false;
    }
    const parent = flatTree.itemsPerId.get(item.parentId);
    if (!parent) {
      return false;
    }
    item = parent;
  }

  return true;
}
