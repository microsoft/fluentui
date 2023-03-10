import { FlatTreeItem, FlatTreeItemProps } from '../hooks/useFlatTree';

/**
 * @internal
 */
export type UnfilteredFlatTree = {
  items: FlatTreeItem[];
  itemsPerId: Map<string, FlatTreeItem>;
};

/**
 * creates a list of flat tree items
 * and provides a map to access each item by id
 */
export function createUnfilteredFlatTree(flatTreeItemProps: FlatTreeItemProps[]): UnfilteredFlatTree {
  const root = createRootFlatTreeItem();
  const itemsPerId = new Map<string, FlatTreeItem>([[root.id, root]]);
  const items: FlatTreeItem[] = [];

  for (let index = 0; index < flatTreeItemProps.length; index++) {
    const { parentId = flatTreeRootParentId, ...treeItemProps } = flatTreeItemProps[index];

    const nextItemProps = flatTreeItemProps[index + 1] as FlatTreeItemProps | undefined;
    const currentParent = itemsPerId.get(parentId);
    if (!currentParent) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error(
          `useFlatTree: item ${flatTreeItemProps[index].id} not properly initialized, make sure provided items are organized`,
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

  return { items, itemsPerId };
}

export const flatTreeRootParentId = '__fuiFlatTreeRoot';

function createRootFlatTreeItem(): FlatTreeItem {
  return {
    id: flatTreeRootParentId,
    getTreeItemProps: () => {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('useFlatTree: internal error, trying to access treeitem props from invalid root element');
      }
      return { id: flatTreeRootParentId, 'aria-setsize': -1, 'aria-level': -1, 'aria-posinset': -1, leaf: true };
    },
    childrenSize: 0,
    get index() {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('useFlatTree: internal error, trying to access treeitem props from invalid root element');
      }
      return -1;
    },
    level: 0,
  };
}
