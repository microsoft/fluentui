import type { ImmutableSet } from './ImmutableSet';
import type { FlatTreeItem, FlatTreeItemProps, MutableFlatTreeItem } from '../hooks/useFlatTree';
import * as React from 'react';

/**
 * @internal
 */
export type FlatTreeItems<Value = string> = {
  size: number;
  root: FlatTreeItem<Value>;
  get(key: Value): FlatTreeItem<Value> | undefined;
  set(key: Value, value: FlatTreeItem<Value>): void;
  getByIndex(index: number): FlatTreeItem<Value>;
};

/**
 * creates a list of flat tree items
 * and provides a map to access each item by id
 */
export function createFlatTreeItems<Value = string>(
  flatTreeItemProps: FlatTreeItemProps<Value>[],
): FlatTreeItems<Value> {
  const root = createFlatTreeRootItem<Value>();
  const itemsPerValue = new Map<Value, MutableFlatTreeItem<Value>>([[flatTreeRootId as Value, root]]);
  const items: MutableFlatTreeItem<Value>[] = [];

  for (let index = 0; index < flatTreeItemProps.length; index++) {
    const { parentValue = flatTreeRootId as Value, ...treeItemProps } = flatTreeItemProps[index];

    const nextItemProps: FlatTreeItemProps<Value> | undefined = flatTreeItemProps[index + 1];
    const currentParent = itemsPerValue.get(parentValue);
    if (!currentParent) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error(
          `useFlatTree: item ${flatTreeItemProps[index].id} is wrongly positioned, did you properly ordered provided item props? make sure provided items are organized`,
        );
      }
      break;
    }
    const isLeaf = nextItemProps?.parentValue !== treeItemProps.value;
    const currentLevel = (currentParent.level ?? 0) + 1;
    const currentChildrenSize = ++currentParent.childrenSize;
    const ref = React.createRef<HTMLDivElement>();

    const flatTreeItem: MutableFlatTreeItem<Value> = {
      value: treeItemProps.value,
      getTreeItemProps: () => ({
        ...treeItemProps,
        'aria-level': currentLevel,
        'aria-posinset': currentChildrenSize,
        'aria-setsize': currentParent.childrenSize,
        leaf: isLeaf,
        // a reference to every parent element is necessary to ensure navigation
        ref: flatTreeItem.childrenSize > 0 ? ref : undefined,
      }),
      ref,
      level: currentLevel,
      parentValue,
      childrenSize: 0,
      index: -1,
    };
    itemsPerValue.set(flatTreeItem.value, flatTreeItem);
    items.push(flatTreeItem);
  }

  return {
    root,
    size: items.length,
    getByIndex: index => items[index],
    get: id => itemsPerValue.get(id),
    set: (id, value) => itemsPerValue.set(id, value),
  };
}

export const flatTreeRootId = '__fuiFlatTreeRoot' as unknown;

function createFlatTreeRootItem<Value = string>(): FlatTreeItem<Value> {
  return {
    ref: { current: null },
    value: flatTreeRootId as Value,
    getTreeItemProps: () => {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error('useFlatTree: internal error, trying to access treeitem props from invalid root element');
      }
      return { value: flatTreeRootId as Value, 'aria-setsize': -1, 'aria-level': -1, 'aria-posinset': -1, leaf: true };
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
export function* VisibleFlatTreeItemGenerator<Value = string>(
  openItems: ImmutableSet<Value>,
  flatTreeItems: FlatTreeItems<Value>,
) {
  for (let index = 0, visibleIndex = 0; index < flatTreeItems.size; index++) {
    const item: MutableFlatTreeItem<Value> = flatTreeItems.getByIndex(index);
    const parent = item.parentValue ? flatTreeItems.get(item.parentValue) ?? flatTreeItems.root : flatTreeItems.root;
    if (isItemVisible(item, openItems, flatTreeItems)) {
      item.index = visibleIndex++;
      yield item;
    } else {
      index += parent.childrenSize - 1 + item.childrenSize;
    }
  }
}

function isItemVisible<Value>(
  item: FlatTreeItem<Value>,
  openItems: ImmutableSet<Value>,
  flatTreeItems: FlatTreeItems<Value>,
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
