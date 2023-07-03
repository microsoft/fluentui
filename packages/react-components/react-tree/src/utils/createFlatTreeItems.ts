import type { ImmutableSet } from './ImmutableSet';
import type { FlatTreeItem, FlatTreeItemProps } from '../hooks/useFlatTree';
import { TreeItemValue } from '../TreeItem';

/**
 * @internal
 */
export type FlatTreeItems<Props extends FlatTreeItemProps> = {
  size: number;
  root: FlatTreeItem;
  get(key: TreeItemValue): FlatTreeItem<Props> | undefined;
  set(key: TreeItemValue, value: FlatTreeItem<Props>): void;
  getByIndex(index: number): FlatTreeItem<Props>;
};

/**
 * creates a list of flat tree items
 * and provides a map to access each item by id
 */
export function createFlatTreeItems<Props extends FlatTreeItemProps>(flatTreeItemProps: Props[]): FlatTreeItems<Props> {
  const root = createFlatTreeRootItem();
  const itemsPerValue = new Map<TreeItemValue, FlatTreeItem<FlatTreeItemProps>>([[root.value, root]]);
  const items: FlatTreeItem<FlatTreeItemProps>[] = [];

  for (let index = 0; index < flatTreeItemProps.length; index++) {
    const { parentValue = flatTreeRootId, ...treeItemProps } = flatTreeItemProps[index];

    const nextItemProps: Props | undefined = flatTreeItemProps[index + 1];
    const currentParent = itemsPerValue.get(parentValue);
    if (!currentParent) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error(
          `useFlatTree: item ${flatTreeItemProps[index].value} is wrongly positioned, did you properly ordered provided item props? make sure provided items are organized`,
        );
      }
      break;
    }
    const itemType =
      treeItemProps.itemType ??
      (treeItemProps.value === undefined || nextItemProps?.parentValue !== treeItemProps.value ? 'leaf' : 'branch');
    const currentLevel = (currentParent.level ?? 0) + 1;
    const currentChildrenSize = ++currentParent.childrenSize;

    const flatTreeItem: FlatTreeItem<FlatTreeItemProps> = {
      value: treeItemProps.value,
      getTreeItemProps: () => ({
        ...treeItemProps,
        'aria-level': currentLevel,
        'aria-posinset': currentChildrenSize,
        'aria-setsize': currentParent.childrenSize,
        itemType,
      }),
      level: currentLevel,
      parentValue,
      childrenSize: 0,
      index: -1,
    };
    itemsPerValue.set(flatTreeItem.value, flatTreeItem);
    items.push(flatTreeItem);
  }

  const flatTreeItems: FlatTreeItems<FlatTreeItemProps> = {
    root,
    size: items.length,
    getByIndex: index => items[index],
    get: key => itemsPerValue.get(key),
    set: (key, value) => itemsPerValue.set(key, value),
  };

  return flatTreeItems as FlatTreeItems<Props>;
}

export const flatTreeRootId = '__fuiFlatTreeRoot';

function createFlatTreeRootItem(): FlatTreeItem {
  return {
    parentValue: undefined,
    value: flatTreeRootId,
    getTreeItemProps: () => {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error('useFlatTree: internal error, trying to access treeitem props from invalid root element');
      }
      return {
        id: flatTreeRootId,
        value: flatTreeRootId,
        'aria-setsize': -1,
        'aria-level': -1,
        'aria-posinset': -1,
        itemType: 'branch',
      };
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
export function* VisibleFlatTreeItemGenerator<Props extends FlatTreeItemProps>(
  openItems: ImmutableSet<string>,
  flatTreeItems: FlatTreeItems<Props>,
) {
  for (let index = 0, visibleIndex = 0; index < flatTreeItems.size; index++) {
    const item = flatTreeItems.getByIndex(index) as FlatTreeItem<Props>;
    if (isItemVisible(item, openItems, flatTreeItems)) {
      item.index = visibleIndex++;
      yield item;
    } else {
      // Jump the amount of children the current item has, since those items will also be hidden
      index += item.childrenSize;
    }
  }
}

function isItemVisible(
  item: FlatTreeItem<FlatTreeItemProps>,
  openItems: ImmutableSet<TreeItemValue>,
  flatTreeItems: FlatTreeItems<FlatTreeItemProps>,
) {
  if (item.level === 1) {
    return true;
  }
  while (item.parentValue && item.parentValue !== flatTreeItems.root.value) {
    if (!openItems.has(item.parentValue)) {
      return false;
    }
    const parent = flatTreeItems.get(item.parentValue);
    if (!parent) {
      return false;
    }
    item = parent;
  }
  return true;
}
