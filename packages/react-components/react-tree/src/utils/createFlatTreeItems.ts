import type { ImmutableSet } from './ImmutableSet';
import type { FlatTreeItem, FlatTreeItemProps } from '../hooks/useFlatTree';
import * as React from 'react';

/**
 * @internal
 */
export type FlatTreeItems<Props extends FlatTreeItemProps<unknown>> = {
  size: number;
  root: FlatTreeItem;
  get(key: Props['value']): FlatTreeItem<Props> | undefined;
  set(key: Props['value'], value: FlatTreeItem<Props>): void;
  getByIndex(index: number): FlatTreeItem<Props>;
};

/**
 * creates a list of flat tree items
 * and provides a map to access each item by id
 */
export function createFlatTreeItems<Props extends FlatTreeItemProps<unknown>>(
  flatTreeItemProps: Props[],
): FlatTreeItems<Props> {
  const root = createFlatTreeRootItem();
  const itemsPerValue = new Map<unknown, FlatTreeItem<FlatTreeItemProps<unknown>>>([[root.value, root]]);
  const items: FlatTreeItem<FlatTreeItemProps<unknown>>[] = [];

  for (let index = 0; index < flatTreeItemProps.length; index++) {
    const { parentValue = flatTreeRootId, ...treeItemProps } = flatTreeItemProps[index];

    const nextItemProps: Props | undefined = flatTreeItemProps[index + 1];
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
    const isLeaf =
      treeItemProps.leaf ?? (treeItemProps.value === undefined || nextItemProps?.parentValue !== treeItemProps.value);
    const currentLevel = (currentParent.level ?? 0) + 1;
    const currentChildrenSize = ++currentParent.childrenSize;
    const ref = React.createRef<HTMLDivElement>();

    const flatTreeItem: FlatTreeItem<FlatTreeItemProps<unknown>> = {
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

  const flatTreeItems: FlatTreeItems<FlatTreeItemProps<unknown>> = {
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
    ref: { current: null },
    value: flatTreeRootId,
    parentValue: undefined,
    getTreeItemProps: () => {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error('useFlatTree: internal error, trying to access treeitem props from invalid root element');
      }
      return { value: flatTreeRootId, 'aria-setsize': -1, 'aria-level': -1, 'aria-posinset': -1, leaf: true };
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
export function* VisibleFlatTreeItemGenerator<Props extends FlatTreeItemProps<unknown>>(
  openItems: ImmutableSet<unknown>,
  flatTreeItems: FlatTreeItems<Props>,
) {
  for (let index = 0, visibleIndex = 0; index < flatTreeItems.size; index++) {
    const item = flatTreeItems.getByIndex(index) as FlatTreeItem<Props>;
    const parent = item.parentValue ? flatTreeItems.get(item.parentValue) ?? flatTreeItems.root : flatTreeItems.root;
    if (isItemVisible(item, openItems, flatTreeItems)) {
      item.index = visibleIndex++;
      yield item;
    } else {
      index += parent.childrenSize - 1 + item.childrenSize;
    }
  }
}

function isItemVisible(
  item: FlatTreeItem<FlatTreeItemProps<unknown>>,
  openItems: ImmutableSet<unknown>,
  flatTreeItems: FlatTreeItems<FlatTreeItemProps<unknown>>,
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
