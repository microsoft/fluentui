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
  level: number;
  index: number;
  position: number;
  childrenValues: TreeItemValue[];
  value: TreeItemValue;
  parentValue: TreeItemValue | undefined;
  itemType: TreeItemType;
  getTreeItemProps(): Required<Pick<Props, 'value' | 'aria-setsize' | 'aria-level' | 'aria-posinset' | 'itemType'>> &
    Props;
};

/**
 * @internal
 */
export type HeadlessTree<Props extends HeadlessTreeItemProps> = {
  /**
   * the number of items in the virtual tree
   */
  readonly size: number;
  /**
   * the root item of the virtual tree
   */
  root: HeadlessTreeItem<HeadlessTreeItemProps>;
  /**
   * method to get a virtual tree item by its value
   * @param key - the key of the item to get
   */
  get(value: TreeItemValue): HeadlessTreeItem<Props> | undefined;
  /**
   * method to check if a virtual tree item exists by its value
   * @param value - the value of the item to check if exists
   */
  has(value: TreeItemValue): boolean;
  /**
   * method to add a new virtual tree item to the virtual tree
   * @param props - the props of the item to add
   */
  add(props: Props): void;
  /**
   * method to remove a virtual tree item from the virtual tree.
   * When an item is removed:
   * 1. all its children are also removed
   * 2. all its siblings are repositioned
   * @param value - the value of the item to remove
   */
  // remove(value: TreeItemValue): void;
  /**
   * method to get the parent of a virtual tree item by its value
   * @param value - the value of the item to get the parent from
   */
  getParent(value: TreeItemValue): HeadlessTreeItem<Props>;
  /**
   * method to get the subtree of a virtual tree item by its value
   * @param value - the value of the item to get the subtree from
   */
  subtree(value: TreeItemValue): IterableIterator<HeadlessTreeItem<Props>>;
  /**
   * method to get the children of a virtual tree item by its value
   * @param value - the value of the item to get the children from
   */
  children(value: TreeItemValue): IterableIterator<HeadlessTreeItem<Props>>;
  /**
   * method to get the visible items of a virtual tree
   * @param openItems - the open items of the tree
   */
  visibleItems(openItems: ImmutableSet<TreeItemValue>): IterableIterator<HeadlessTreeItem<Props>>;
  /**
   * method to get the ancestors of a virtual tree item by its value
   * @param value - the value of the item to get the ancestors from
   */
  ancestors(value: TreeItemValue): IterableIterator<HeadlessTreeItem<Props>>;
};

/**
 * creates a list of virtual tree items
 * and provides a map to access each item by id
 */
export function createHeadlessTree<Props extends HeadlessTreeItemProps>(
  initialProps: Props[] = [],
): HeadlessTree<Props> {
  const root = createHeadlessTreeRootItem();
  const itemsPerValue = new Map<TreeItemValue, HeadlessTreeItem<HeadlessTreeItemProps>>([[root.value, root]]);

  const headlessTree: HeadlessTree<HeadlessTreeItemProps> = {
    root,
    get size() {
      return itemsPerValue.size;
    },
    getParent: key => itemsPerValue.get(itemsPerValue.get(key)?.parentValue ?? root.value) ?? root,
    get: key => itemsPerValue.get(key),
    has: key => itemsPerValue.has(key),
    add(props) {
      const { parentValue = headlessTreeRootId, ...propsWithoutParentValue } = props;
      const parentItem = itemsPerValue.get(parentValue);
      if (!parentItem) {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error(/* #__DE-INDENT__ */ `
            @fluentui/react-tree [createHeadlessTree]:
            TreeItem "${props.value}" is wrongly positioned, did you properly ordered provided item props? make sure provided items are organized, parents should come before children
          `);
        }
        return;
      }
      parentItem.itemType = 'branch';

      const item: HeadlessTreeItem<HeadlessTreeItemProps> = {
        value: props.value,
        getTreeItemProps: () => ({
          ...propsWithoutParentValue,
          parentValue,
          'aria-level': item.level,
          'aria-posinset': item.position,
          'aria-setsize': parentItem.childrenValues.length,
          itemType: item.itemType,
        }),
        itemType: propsWithoutParentValue.itemType ?? 'leaf',
        level: parentItem.level + 1,
        parentValue,
        childrenValues: [],
        index: -1,
        position: parentItem.childrenValues.push(props.value),
      };
      itemsPerValue.set(item.value, item);
    },
    subtree: key => HeadlessTreeSubtreeGenerator(key, headlessTree),
    children: key => HeadlessTreeChildrenGenerator(key, headlessTree),
    ancestors: key => HeadlessTreeAncestorsGenerator(key, headlessTree),
    visibleItems: openItems => HeadlessTreeVisibleItemsGenerator(openItems, headlessTree),
  };

  initialProps.forEach(headlessTree.add);

  return headlessTree as HeadlessTree<Props>;
}

export const headlessTreeRootId = '__fuiHeadlessTreeRoot';

function createHeadlessTreeRootItem(): HeadlessTreeItem<HeadlessTreeItemProps> {
  return {
    parentValue: undefined,
    value: headlessTreeRootId,
    itemType: 'branch',
    getTreeItemProps: () => {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error(/* #__DE-INDENT__ */ `
          @fluentui/react-tree [createHeadlessTree]:
          Internal error, trying to access treeitem props from invalid root element
        `);
      }
      return {
        id: headlessTreeRootId,
        parentValue: undefined,
        value: headlessTreeRootId,
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
        console.error(/* #__DE-INDENT__ */ `
          @fluentui/react-tree [createHeadlessTree]:
          Internal error, trying to access treeitem props from invalid root element
        `);
      }
      return -1;
    },
    get position() {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error(/* #__DE-INDENT__ */ `
          @fluentui/react-tree [createHeadlessTree]:
          Internal error, trying to access treeitem props from invalid root element
        `);
      }
      return -1;
    },
    level: 0,
  };
}

/**
 * Generator that returns all subtree of a given virtual tree item
 * @param key - the key of the item to get the subtree from
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
function* HeadlessTreeSubtreeGenerator<Props extends HeadlessTreeItemProps>(
  key: TreeItemValue,
  virtualTreeItems: HeadlessTree<Props>,
): Generator<HeadlessTreeItem<Props>, void, void> {
  const item = virtualTreeItems.get(key);
  if (!item || item.childrenValues.length === 0) {
    return;
  }
  for (const childValue of item.childrenValues) {
    yield virtualTreeItems.get(childValue)!;
    yield* HeadlessTreeSubtreeGenerator(childValue, virtualTreeItems);
  }
}

/**
 * Generator that returns all children of a given virtual tree item
 * @param key - the key of the item to get the children from
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
function* HeadlessTreeChildrenGenerator<Props extends HeadlessTreeItemProps>(
  key: TreeItemValue,
  virtualTreeItems: HeadlessTree<Props>,
): Generator<HeadlessTreeItem<Props>, void, void> {
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
 * @param key - the key of the item to get the children from
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
function* HeadlessTreeAncestorsGenerator<Props extends HeadlessTreeItemProps>(
  key: TreeItemValue,
  virtualTreeItems: HeadlessTree<Props>,
): Generator<HeadlessTreeItem<Props>, void, void> {
  let parent = virtualTreeItems.getParent(key);
  while (parent !== virtualTreeItems.root) {
    yield parent;
    parent = virtualTreeItems.getParent(parent.value);
  }
}

/**
 * Generator that returns all visible items of a given virtual tree
 * @param openItems - the open items of the tree
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
function* HeadlessTreeVisibleItemsGenerator<Props extends HeadlessTreeItemProps>(
  openItems: ImmutableSet<TreeItemValue>,
  virtualTreeItems: HeadlessTree<Props>,
): Generator<HeadlessTreeItem<Props>, void, void> {
  let index = 0;
  for (const item of HeadlessTreeSubtreeGenerator(virtualTreeItems.root.value, virtualTreeItems)) {
    if (isItemVisible(item, openItems, virtualTreeItems)) {
      item.index = index++;
      yield item;
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
