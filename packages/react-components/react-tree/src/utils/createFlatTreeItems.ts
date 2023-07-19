import type { FlatTreeItem, FlatTreeItemProps } from '../hooks/useFlatTree';
import { TreeItemValue } from '../TreeItem';
import { ImmutableSet } from './ImmutableSet';

/**
 * @internal
 */
export type FlatTreeItems<Props extends FlatTreeItemProps> = {
  size: number;
  root: FlatTreeItem;
  get(key: TreeItemValue): FlatTreeItem<Props> | undefined;
  getParent(key: TreeItemValue): FlatTreeItem<Props>;
  getByIndex(index: number): FlatTreeItem<Props>;
  subtree(key: TreeItemValue): IterableIterator<FlatTreeItem<Props>>;
  children(key: TreeItemValue): IterableIterator<FlatTreeItem<Props>>;
  visibleItems(openItems: ImmutableSet<TreeItemValue>): IterableIterator<FlatTreeItem<Props>>;
  ancestors(key: TreeItemValue): IterableIterator<FlatTreeItem<Props>>;
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

    const flatTreeItem: FlatTreeItem<FlatTreeItemProps> = {
      value: treeItemProps.value,
      getTreeItemProps: () => ({
        ...treeItemProps,
        'aria-level': currentLevel,
        'aria-posinset': currentChildrenSize,
        'aria-setsize': currentParent.childrenValues.length,
        itemType,
      }),
      level: currentLevel,
      parentValue,
      childrenValues: [],
      index: -1,
    };
    const currentChildrenSize = currentParent.childrenValues.push(flatTreeItem.value);
    itemsPerValue.set(flatTreeItem.value, flatTreeItem);
    items.push(flatTreeItem);
  }

  const flatTreeItems: FlatTreeItems<FlatTreeItemProps> = {
    root,
    size: items.length,
    getByIndex: index => items[index],
    getParent: key => itemsPerValue.get(itemsPerValue.get(key)?.parentValue ?? root.value) ?? root,
    get: key => itemsPerValue.get(key),
    subtree: key => FlatTreeSubtreeGenerator(key, flatTreeItems),
    children: key => FlatTreeChildrenGenerator(key, flatTreeItems),
    ancestors: key => FlatTreeAncestorsGenerator(key, flatTreeItems),
    visibleItems: openItems => VisibleFlatTreeItemGenerator(openItems, flatTreeItems),
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
    childrenValues: [],
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

/**
 * Generator that returns all subtree of a given flat tree item
 * @param key the key of the item to get the subtree from
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
function* FlatTreeSubtreeGenerator<Props extends FlatTreeItemProps>(
  key: TreeItemValue,
  flatTreeItems: FlatTreeItems<Props>,
) {
  const item = flatTreeItems.get(key);
  if (!item || item.childrenValues.length === 0) {
    return [];
  }
  let counter = item.childrenValues.length;
  let index = item.index;
  while (counter > 0) {
    const children = flatTreeItems.getByIndex(++index);
    yield children;
    counter += children.childrenValues.length - 1;
  }
}

/**
 * Generator that returns all children of a given flat tree item
 * @param key the key of the item to get the children from
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
function* FlatTreeChildrenGenerator<Props extends FlatTreeItemProps>(
  key: TreeItemValue,
  flatTreeItems: FlatTreeItems<Props>,
) {
  const item = flatTreeItems.get(key);
  if (!item || item.childrenValues.length === 0) {
    return;
  }
  for (const childValue of item.childrenValues) {
    yield flatTreeItems.get(childValue)!;
  }
}

/**
 * Generator that returns all ancestors of a given flat tree item
 * @param key the key of the item to get the children from
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
function* FlatTreeAncestorsGenerator<Props extends FlatTreeItemProps>(
  key: TreeItemValue,
  flatTreeItems: FlatTreeItems<Props>,
) {
  let parent = flatTreeItems.getParent(key);
  while (parent !== flatTreeItems.root) {
    yield parent;
    parent = flatTreeItems.getParent(parent.value);
  }
}

/**
 * Generator that returns all visible items of a given flat tree
 * @param openItems the open items of the tree
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
function* VisibleFlatTreeItemGenerator<Props extends FlatTreeItemProps>(
  openItems: ImmutableSet<TreeItemValue>,
  flatTreeItems: FlatTreeItems<Props>,
) {
  for (let index = 0, visibleIndex = 0; index < flatTreeItems.size; index++) {
    const item = flatTreeItems.getByIndex(index) as FlatTreeItem<Props>;
    if (isItemVisible(item, openItems, flatTreeItems)) {
      item.index = visibleIndex++;
      yield item;
    } else {
      // Jump the amount of children the current item has, since those items will also be hidden
      index += item.childrenValues.length;
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
