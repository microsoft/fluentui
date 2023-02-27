import { useControllableState, useEventCallback } from '@fluentui/react-utilities';
import * as React from 'react';
import { TreeItemId, TreeOpenChangeData, TreeOpenChangeEvent, TreeProps } from '../Tree';
import { TreeItemProps } from '../TreeItem';
import { createImmutableSet, emptyImmutableSet, ImmutableSet } from '../utils/ImmutableSet';
import { updateOpenItems } from '../utils/updateOpenItems';

export type FlatTreeItemProps = Required<Pick<TreeItemProps, 'id'>> &
  TreeItemProps & {
    parentId?: string;
  };

type TreeItemPropsReference = {
  props: Required<Pick<TreeItemProps, 'id' | 'aria-level' | 'aria-posinset' | 'leaf'>> & TreeItemProps;
  parentId?: string;
  childrenSize: number;
};

type TreeItemPropsReferences = {
  refs: TreeItemPropsReference[];
  getParent(ref: TreeItemPropsReference): TreeItemPropsReference;
};

type LazyArray<Value> = {
  map<NextValue>(fn: (child: Value) => NextValue): NextValue[];
  toArray(): Value[];
};

export type FlatTreeProps = Pick<TreeProps, 'openItems' | 'onOpenChange'>;
export type LazyFlatTreeItems = LazyArray<
  Required<Pick<TreeItemProps, 'id' | 'aria-level' | 'aria-posinset' | 'leaf' | 'aria-setsize'>> & TreeItemProps
>;

export type UseFlatTreeItemsOptions = Pick<TreeProps, 'openItems' | 'defaultOpenItems'>;

export function useFlatTreeItems_unstable(
  items: FlatTreeItemProps[],
  options?: UseFlatTreeItemsOptions,
): readonly [FlatTreeProps, LazyFlatTreeItems] {
  const [openItems, setOpenItems] = useControllableState({
    state: React.useMemo(() => options?.openItems && createImmutableSet(options.openItems), [options?.openItems]),
    defaultState: React.useMemo(() => options?.defaultOpenItems && createImmutableSet(options?.defaultOpenItems), [
      options?.defaultOpenItems,
    ]),
    initialState: emptyImmutableSet,
  });
  const handleOpenChange = useEventCallback((ev: TreeOpenChangeEvent, data: TreeOpenChangeData) =>
    setOpenItems(curr => updateOpenItems(data, curr)),
  );

  const references = React.useMemo(() => createTreeItemPropsRefs(items), [items]);

  const lazyFlatTreeItems = React.useMemo(
    () =>
      createLazyFlatTreeItems(references, {
        filter: item => isTreeItemVisible(item, { openItems, references }),
      }),
    [references, openItems],
  );

  return [{ openItems, onOpenChange: handleOpenChange }, lazyFlatTreeItems];
}

function isTreeItemVisible(
  itemRef: TreeItemPropsReference,
  {
    openItems,
    references,
  }: {
    openItems: ImmutableSet<TreeItemId>;
    references: TreeItemPropsReferences;
  },
) {
  if (itemRef.props['aria-level'] === 1) {
    return true;
  }
  while (itemRef.parentId !== undefined) {
    if (!openItems.has(itemRef.parentId)) {
      return false;
    }
    itemRef = references.getParent(itemRef);
  }
  return true;
}

function createTreeItemPropsRefs(flatTreeItemProps: FlatTreeItemProps[]): TreeItemPropsReferences {
  const root: TreeItemPropsReference = {
    props: { id: 'root', leaf: false, 'aria-level': 0, 'aria-posinset': 0 },
    childrenSize: 0,
  };
  const treeItemPropsRefsPerId = new Map<string, TreeItemPropsReference>();
  const refs: TreeItemPropsReference[] = [];

  for (let index = 0; index < flatTreeItemProps.length; index++) {
    const { parentId, ...treeItemProps } = flatTreeItemProps[index];

    const nextPartialItem = flatTreeItemProps[index + 1] as FlatTreeItemProps | undefined;
    const currentParentRef = parentId ? treeItemPropsRefsPerId.get(parentId) ?? root : root;
    const isLeaf = nextPartialItem?.parentId !== treeItemProps.id;
    const currentLevel = (currentParentRef.props['aria-level'] ?? 0) + 1;
    currentParentRef.childrenSize++;

    const treeItemPropsRef: TreeItemPropsReference = {
      props: {
        ...treeItemProps,
        'aria-level': currentLevel,
        'aria-posinset': currentParentRef.childrenSize,
        leaf: isLeaf,
      },
      parentId,
      childrenSize: 0,
    };
    treeItemPropsRefsPerId.set(treeItemPropsRef.props.id, treeItemPropsRef);
    refs.push(treeItemPropsRef);
  }

  function getParent(itemRef: TreeItemPropsReference): TreeItemPropsReference {
    const parentRef = itemRef.parentId ? treeItemPropsRefsPerId.get(itemRef.parentId) : root;
    // This indicates that an item doesn't have a proper parent
    if (parentRef === undefined) {
      throw new Error(`useFlatTreeItem: TreeItem ${itemRef.props.id} doesn't have a proper parent!`);
    }
    return parentRef;
  }

  return { refs, getParent };
}

function createLazyFlatTreeItems(
  treeItemPropsRefs: TreeItemPropsReferences,
  { filter = () => true }: { filter: (item: TreeItemPropsReference) => boolean },
): LazyFlatTreeItems {
  const flatTreeItems: LazyFlatTreeItems = {
    toArray: () => flatTreeItems.map(identity),
    map: fn => {
      const items: ReturnType<typeof fn>[] = [];
      for (let index = 0; index < treeItemPropsRefs.refs.length; index++) {
        const currentItemRef = treeItemPropsRefs.refs[index];
        const currentParentRef = treeItemPropsRefs.getParent(currentItemRef);

        if (filter(currentItemRef)) {
          items.push(fn({ ...currentItemRef.props, 'aria-setsize': currentParentRef.childrenSize }));
        } else {
          index += currentParentRef.childrenSize - 1 + currentItemRef.childrenSize;
        }
      }
      return items;
    },
  };
  return flatTreeItems;
}

function identity<T>(item: T) {
  return item;
}
