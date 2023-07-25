import { TreeItemProps, TreeItemType, TreeItemValue } from '../TreeItem';
import { ImmutableSet } from './ImmutableSet';

export type HeadlessTreeItemProps = Omit<TreeItemProps, 'itemType' | 'value'> & {
  value: TreeItemValue;
  itemType?: TreeItemType;
  parentValue?: TreeItemValue;
};

/**
 * The item that is returned by `createHeadlessTree`, it represents a wrapper around the properties provided to
 * `createHeadlessTree` but with extra information that might be useful on virtual tree scenarios
 */
export type HeadlessTreeItem<Props extends HeadlessTreeItemProps> = {
  index: number;
  level: number;
  childrenValues: TreeItemValue[];
  value: TreeItemValue;
  parentValue: TreeItemValue | undefined;
  getTreeItemProps(): Required<Pick<Props, 'value' | 'aria-setsize' | 'aria-level' | 'aria-posinset' | 'itemType'>> &
    Omit<Props, 'parentValue'>;
};

/**
 * @internal
 */
export type HeadlessTree<Props extends HeadlessTreeItemProps> = {
  size: number;
  root: HeadlessTreeItem<HeadlessTreeItemProps>;
  get(key: TreeItemValue): HeadlessTreeItem<Props> | undefined;
  getParent(key: TreeItemValue): HeadlessTreeItem<Props>;
  getByIndex(index: number): HeadlessTreeItem<Props>;
  subtree(key: TreeItemValue): IterableIterator<HeadlessTreeItem<Props>>;
  children(key: TreeItemValue): IterableIterator<HeadlessTreeItem<Props>>;
  visibleItems(openItems: ImmutableSet<TreeItemValue>): IterableIterator<HeadlessTreeItem<Props>>;
  ancestors(key: TreeItemValue): IterableIterator<HeadlessTreeItem<Props>>;
};

/**
 * creates a list of virtual tree items
 * and provides a map to access each item by id
 */
export function createHeadlessTree<Props extends HeadlessTreeItemProps>(
  virtualTreeItemProps: Props[],
): HeadlessTree<Props> {
  const root = createHeadlessTreeRootItem();
  const itemsPerValue = new Map<TreeItemValue, HeadlessTreeItem<HeadlessTreeItemProps>>([[root.value, root]]);
  const items: HeadlessTreeItem<HeadlessTreeItemProps>[] = [];

  for (let index = 0; index < virtualTreeItemProps.length; index++) {
    const { parentValue = virtualTreeRootId, ...treeItemProps } = virtualTreeItemProps[index];

    const nextItemProps: Props | undefined = virtualTreeItemProps[index + 1];
    const currentParent = itemsPerValue.get(parentValue);
    if (!currentParent) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error(
          `useHeadlessTree: item ${virtualTreeItemProps[index].value} is wrongly positioned, did you properly ordered provided item props? make sure provided items are organized`,
        );
      }
      break;
    }
    const itemType =
      treeItemProps.itemType ??
      (treeItemProps.value === undefined || nextItemProps?.parentValue !== treeItemProps.value ? 'leaf' : 'branch');
    const currentLevel = (currentParent.level ?? 0) + 1;

    const virtualTreeItem: HeadlessTreeItem<HeadlessTreeItemProps> = {
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
    const currentChildrenSize = currentParent.childrenValues.push(virtualTreeItem.value);
    itemsPerValue.set(virtualTreeItem.value, virtualTreeItem);
    items.push(virtualTreeItem);
  }

  const virtualTreeItems: HeadlessTree<HeadlessTreeItemProps> = {
    root,
    size: items.length,
    getByIndex: index => items[index],
    getParent: key => itemsPerValue.get(itemsPerValue.get(key)?.parentValue ?? root.value) ?? root,
    get: key => itemsPerValue.get(key),
    subtree: key => HeadlessTreeSubtreeGenerator(key, virtualTreeItems),
    children: key => HeadlessTreeChildrenGenerator(key, virtualTreeItems),
    ancestors: key => HeadlessTreeAncestorsGenerator(key, virtualTreeItems),
    visibleItems: openItems => HeadlessTreeVisibleItemsGenerator(openItems, virtualTreeItems),
  };

  return virtualTreeItems as HeadlessTree<Props>;
}

export const virtualTreeRootId = '__fuiHeadlessTreeRoot';

function createHeadlessTreeRootItem(): HeadlessTreeItem<HeadlessTreeItemProps> {
  return {
    parentValue: undefined,
    value: virtualTreeRootId,
    getTreeItemProps: () => {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error('useHeadlessTree: internal error, trying to access treeitem props from invalid root element');
      }
      return {
        id: virtualTreeRootId,
        value: virtualTreeRootId,
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
        console.error('useHeadlessTree: internal error, trying to access treeitem props from invalid root element');
      }
      return -1;
    },
    level: 0,
  };
}

/**
 * Generator that returns all subtree of a given virtual tree item
 * @param key the key of the item to get the subtree from
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
function* HeadlessTreeSubtreeGenerator<Props extends HeadlessTreeItemProps>(
  key: TreeItemValue,
  virtualTreeItems: HeadlessTree<Props>,
) {
  const item = virtualTreeItems.get(key);
  if (!item || item.childrenValues.length === 0) {
    return [];
  }
  let counter = item.childrenValues.length;
  let index = item.index;
  while (counter > 0) {
    const children = virtualTreeItems.getByIndex(++index);
    yield children;
    counter += children.childrenValues.length - 1;
  }
}

/**
 * Generator that returns all children of a given virtual tree item
 * @param key the key of the item to get the children from
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
function* HeadlessTreeChildrenGenerator<Props extends HeadlessTreeItemProps>(
  key: TreeItemValue,
  virtualTreeItems: HeadlessTree<Props>,
) {
  const item = virtualTreeItems.get(key);
  if (!item || item.childrenValues.length === 0) {
    return;
  }
  for (const childValue of item.childrenValues) {
    yield virtualTreeItems.get(childValue)!;
  }
}

/**
 * Generator that returns all ancestors of a given virtual tree item
 * @param key the key of the item to get the children from
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
function* HeadlessTreeAncestorsGenerator<Props extends HeadlessTreeItemProps>(
  key: TreeItemValue,
  virtualTreeItems: HeadlessTree<Props>,
) {
  let parent = virtualTreeItems.getParent(key);
  while (parent !== virtualTreeItems.root) {
    yield parent;
    parent = virtualTreeItems.getParent(parent.value);
  }
}

/**
 * Generator that returns all visible items of a given virtual tree
 * @param openItems the open items of the tree
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
function* HeadlessTreeVisibleItemsGenerator<Props extends HeadlessTreeItemProps>(
  openItems: ImmutableSet<TreeItemValue>,
  virtualTreeItems: HeadlessTree<Props>,
) {
  for (let index = 0, visibleIndex = 0; index < virtualTreeItems.size; index++) {
    const item = virtualTreeItems.getByIndex(index) as HeadlessTreeItem<Props>;
    if (isItemVisible(item, openItems, virtualTreeItems)) {
      item.index = visibleIndex++;
      yield item;
    } else {
      // Jump the amount of children the current item has, since those items will also be hidden
      index += item.childrenValues.length;
    }
  }
}

function isItemVisible(
  item: HeadlessTreeItem<HeadlessTreeItemProps>,
  openItems: ImmutableSet<TreeItemValue>,
  virtualTreeItems: HeadlessTree<HeadlessTreeItemProps>,
) {
  if (item.level === 1) {
    return true;
  }
  while (item.parentValue && item.parentValue !== virtualTreeItems.root.value) {
    if (!openItems.has(item.parentValue)) {
      return false;
    }
    const parent = virtualTreeItems.get(item.parentValue);
    if (!parent) {
      return false;
    }
    item = parent;
  }
  return true;
}
