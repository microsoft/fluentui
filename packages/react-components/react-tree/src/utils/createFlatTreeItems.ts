import type { TreeItemId } from '../TreeItem';
import type { ImmutableSet } from './ImmutableSet';
import type { FlatTreeItem, FlatTreeItemProps, MutableFlatTreeItem } from '../hooks/useFlatTree';

/**
 * @internal
 */
export type FlatTreeItems = {
  size: number;
  root: FlatTreeItem;
  get(id: string): FlatTreeItem | undefined;
  set(id: string, value: FlatTreeItem): void;
  getByIndex(index: number): FlatTreeItem;
};

/**
 * creates a list of flat tree items
 * and provides a map to access each item by id
 */
export function createFlatTreeItems(flatTreeItemProps: FlatTreeItemProps[]): FlatTreeItems {
  const root = createFlatTreeRootItem();
  const itemsPerId = new Map<string, MutableFlatTreeItem>([[flatTreeRootId, root]]);
  const items: MutableFlatTreeItem[] = [];

  for (let index = 0; index < flatTreeItemProps.length; index++) {
    const { parentId = flatTreeRootId, ...treeItemProps } = flatTreeItemProps[index];

    const nextItemProps: FlatTreeItemProps | undefined = flatTreeItemProps[index + 1];
    const currentParent = itemsPerId.get(parentId);
    if (!currentParent) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error(
          `useFlatTree: item ${flatTreeItemProps[index].id} is wrongly positioned, did you properly ordered provided item props? make sure provided items are organized`,
        );
      }
      break;
    }
    const isLeaf = nextItemProps?.parentId !== treeItemProps.id;
    const currentLevel = (currentParent.level ?? 0) + 1;
    const currentChildrenSize = ++currentParent.childrenSize;

    const flatTreeItem: FlatTreeItem = {
      id: treeItemProps.id,
      getTreeItemProps: () => ({
        ...treeItemProps,
        'aria-level': currentLevel,
        'aria-posinset': currentChildrenSize,
        'aria-setsize': currentParent.childrenSize,
        leaf: isLeaf,
      }),
      level: currentLevel,
      parentId,
      childrenSize: 0,
      index: -1,
    };
    itemsPerId.set(flatTreeItem.id, flatTreeItem);
    items.push(flatTreeItem);
  }

  return {
    root,
    size: items.length,
    getByIndex: index => items[index],
    get: id => itemsPerId.get(id),
    set: (id, value) => itemsPerId.set(id, value),
  };
}

export const flatTreeRootId = '__fuiFlatTreeRoot';

function createFlatTreeRootItem(): FlatTreeItem {
  return {
    id: flatTreeRootId,
    getTreeItemProps: () => {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error('useFlatTree: internal error, trying to access treeitem props from invalid root element');
      }
      return { id: flatTreeRootId, 'aria-setsize': -1, 'aria-level': -1, 'aria-posinset': -1, leaf: true };
    },
    childrenSize: 0,
    get index() {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error('useFlatTree: internal error, trying to access treeitem props from invalid root element');
      }
      return -1;
    },
    level: 0,
  };
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function* VisibleFlatTreeItemGenerator(openItems: ImmutableSet<TreeItemId>, flatTreeItems: FlatTreeItems) {
  for (let index = 0, visibleIndex = 0; index < flatTreeItems.size; index++) {
    const item: MutableFlatTreeItem = flatTreeItems.getByIndex(index);
    const parent = item.parentId ? flatTreeItems.get(item.parentId) ?? flatTreeItems.root : flatTreeItems.root;
    if (isItemVisible(item, openItems, flatTreeItems)) {
      item.index = visibleIndex++;
      yield item;
    } else {
      index += parent.childrenSize - 1 + item.childrenSize;
    }
  }
}

function isItemVisible(item: FlatTreeItem, openItems: ImmutableSet<TreeItemId>, flatTreeItems: FlatTreeItems) {
  if (item.level === 1) {
    return true;
  }
  while (item.parentId && item.parentId !== flatTreeItems.root.id) {
    if (!openItems.has(item.parentId)) {
      return false;
    }
    const parent = flatTreeItems.get(item.parentId);
    if (!parent) {
      return false;
    }
    item = parent;
  }
  return true;
}
