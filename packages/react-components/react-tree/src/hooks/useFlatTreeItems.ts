import { useEventCallback } from '@fluentui/react-utilities';
import * as React from 'react';
import {
  TreeItemId,
  TreeNavigationData_unstable,
  TreeNavigationEvent_unstable,
  TreeOpenChangeData,
  TreeOpenChangeEvent,
  TreeProps,
} from '../Tree';
import { TreeItemProps } from '../TreeItem';
import { ImmutableSet } from '../utils/ImmutableSet';
import { useFlatTreeNavigation } from './useFlatTreeNavigation';
import { useOpenItemsState } from './useOpenItemsState';

export type FlatTreeItem = Required<Pick<TreeItemProps, 'id'>> &
  TreeItemProps & {
    parentId?: string;
  };

export type FlatTreeItemProps = Required<
  Pick<TreeItemProps, 'id' | 'aria-level' | 'aria-posinset' | 'leaf' | 'aria-setsize'>
> &
  TreeItemProps;

type TreeItemPropsReference = {
  props: Required<Pick<TreeItemProps, 'id' | 'aria-level' | 'aria-posinset' | 'leaf'>> & TreeItemProps;
  parentId?: string;
  childrenSize: number;
  index: number;
};

export type TreeItemPropsReferences = {
  refs: TreeItemPropsReference[];
  getParent(ref: TreeItemPropsReference): TreeItemPropsReference | null;
  get(id: string): TreeItemPropsReference | null;
};

type LazyArray<Value> = {
  map<NextValue>(fn: (child: Value) => NextValue): NextValue[];
  toArray(): Value[];
};

export type FlatTreeProps = Required<
  Pick<TreeProps, 'openItems' | 'onOpenChange' | 'onNavigation_unstable'> & { ref: React.Ref<HTMLDivElement> }
>;
export type LazyFlatTreeItems = LazyArray<FlatTreeItemProps> & {
  get(id: string): TreeItemPropsReference | null;
};

export type UseFlatTreeItemsOptions = Pick<TreeProps, 'openItems' | 'defaultOpenItems'>;

export function useFlatTreeItems_unstable(
  items: FlatTreeItem[],
  options?: UseFlatTreeItemsOptions,
): readonly [FlatTreeProps, LazyFlatTreeItems] {
  const references = React.useMemo(() => createTreeItemPropsRefs(items), [items]);
  const [openItems, updateOpenItems] = useOpenItemsState(options ?? {});
  const [navigate, treeRef] = useFlatTreeNavigation(references);

  const handleOpenChange = useEventCallback((event: TreeOpenChangeEvent, data: TreeOpenChangeData) => {
    event.preventDefault();
    updateOpenItems(data);
  });

  const handleNavigation = useEventCallback(
    (event: TreeNavigationEvent_unstable, data: TreeNavigationData_unstable) => {
      event.preventDefault();
      navigate(data);
    },
  );

  const lazyFlatTreeItems = React.useMemo(
    () =>
      createLazyFlatTreeItems(references, {
        filter: item => isTreeItemVisible(item, { openItems, references }),
      }),
    [references, openItems],
  );

  return [
    {
      ref: treeRef as React.Ref<HTMLDivElement>,
      openItems,
      onOpenChange: handleOpenChange,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      onNavigation_unstable: handleNavigation,
    },
    lazyFlatTreeItems,
  ];
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
    const parent = references.getParent(itemRef);
    if (!parent) {
      return false;
    }
    itemRef = parent;
  }
  return true;
}

function createTreeItemPropsRefs(flatTreeItemProps: FlatTreeItem[]): TreeItemPropsReferences {
  const root: TreeItemPropsReference = {
    props: { id: 'root', leaf: false, 'aria-level': 0, 'aria-posinset': 0 },
    childrenSize: 0,
    index: -1,
  };
  const treeItemPropsRefsPerId = new Map<string, TreeItemPropsReference>();
  const refs: TreeItemPropsReference[] = [];

  for (let index = 0; index < flatTreeItemProps.length; index++) {
    const { parentId, ...treeItemProps } = flatTreeItemProps[index];

    const nextPartialItem = flatTreeItemProps[index + 1] as FlatTreeItem | undefined;
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
      index: -1,
    };
    treeItemPropsRefsPerId.set(treeItemPropsRef.props.id, treeItemPropsRef);
    refs.push(treeItemPropsRef);
  }

  function getParent(itemRef: TreeItemPropsReference): TreeItemPropsReference | null {
    const parentRef = itemRef.parentId ? treeItemPropsRefsPerId.get(itemRef.parentId) : root;
    return parentRef ?? null;
  }
  function get(id: string): TreeItemPropsReference | null {
    return treeItemPropsRefsPerId.get(id) ?? null;
  }

  return { refs, getParent, get };
}

function createLazyFlatTreeItems(
  treeItemPropsRefs: TreeItemPropsReferences,
  { filter = () => true }: { filter: (item: TreeItemPropsReference) => boolean },
): LazyFlatTreeItems {
  const flatTreeItems: LazyFlatTreeItems = {
    get: treeItemPropsRefs.get,
    toArray: () => flatTreeItems.map(identity),
    map: fn => {
      const items: ReturnType<typeof fn>[] = [];
      for (let index = 0; index < treeItemPropsRefs.refs.length; index++) {
        const currentItemRef = treeItemPropsRefs.refs[index];
        const currentParentRef = treeItemPropsRefs.getParent(currentItemRef);
        if (!currentParentRef) {
          break;
        }
        if (filter(currentItemRef)) {
          currentItemRef.index = index;
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
