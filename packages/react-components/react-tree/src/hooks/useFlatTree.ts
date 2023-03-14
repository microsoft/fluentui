import { useEventCallback } from '@fluentui/react-utilities';
import * as React from 'react';
import {
  TreeNavigationData_unstable,
  TreeNavigationEvent_unstable,
  TreeOpenChangeData,
  TreeOpenChangeEvent,
  TreeProps,
} from '../Tree';
import { TreeItemProps } from '../TreeItem';
import { createUnfilteredFlatTree } from '../utils/createUnfilteredFlatTree';
import { createVisibleFlatTree } from '../utils/createVisibleFlatTree';
import { useFlatTreeNavigation } from './useFlatTreeNavigation';
import { useOpenItemsState } from './useOpenItemsState';

export type FlatTreeItemProps = Required<Pick<TreeItemProps, 'id'>> &
  TreeItemProps & {
    parentId?: string;
  };

export type FlatTreeItem = {
  getTreeItemProps(): Required<Pick<TreeItemProps, 'id' | 'aria-setsize' | 'aria-level' | 'aria-posinset' | 'leaf'>> &
    TreeItemProps;
  parentId?: string;
  childrenSize: number;
  index: number;
  id: string;
  level: number;
};

export type FlatTreeProps = Required<
  Pick<TreeProps, 'openItems' | 'onOpenChange' | 'onNavigation_unstable'> & { ref: React.Ref<HTMLDivElement> }
>;

/**
 * FlatTree API to manage all required mechanisms to convert a list of items into renderable TreeItems
 * in multiple scenarios including virtualization.
 *
 * !!A flat tree is an unofficial spec for tree!!
 *
 * It should be used on cases where more complex interactions with a Tree is required.
 *
 * On simple scenarios it is advised to simply use a nested structure instead.
 */
export type FlatTree = {
  /**
   * returns the properties required for the Tree component to work properly.
   * That includes:
   * `openItems`, `onOpenChange`, `onNavigation_unstable` and `ref`
   */
  getTreeProps(): FlatTreeProps;
  /**
   * internal method used to react to an `onNavigation` event.
   * This method ensures proper navigation on keyboard and mouse interaction.
   * In case of virtualization it might be required to cancel default provided `onNavigation`
   * event and then call this method manually.
   *
   * @example
   * ```ts
   * // react-window
   * const handleNavigation = (event, data) => {
   *   event.preventDefault();
   *   const nextItem = tree.getNextNavigableItem(data);
   *   // scroll to item using virtualization scroll mechanism
   *   if (nextItem && !targetDocument.getElementById(nextItem.id)) {
   *     listRef.current.scrollToItem(nextItem.index);
   *   }
   *   // wait for scrolling to happen and then invoke navigate method
   *   requestAnimationFrame(() => {
   *     tree.navigate(data);
   *   });
   * };
   *```
   */
  navigate(data: TreeNavigationData_unstable): void;
  /**
   * returns next item to be focused on a navigation.
   * This method is provided to decouple the element that needs to be focused from
   *  the action of focusing it itself.
   */
  getNextNavigableItem(data: TreeNavigationData_unstable): FlatTreeItem | null;
  /**
   * returns a single flat tree item by id without iterating over the whole collection
   */
  getItem(id: string): FlatTreeItem | null;
  /**
   * returns an iterable containing all visually available flat tree items
   */
  items(): Iterable<FlatTreeItem>;
};

/**
 * this hook provides FlatTree API to manage all required mechanisms to convert a list of items into renderable TreeItems
 * in multiple scenarios including virtualization.
 *
 * !!A flat tree is an unofficial spec for tree!!
 *
 * It should be used on cases where more complex interactions with a Tree is required.
 * On simple scenarios it is advised to simply use a nested structure instead.
 *
 * @param items - a list of tree items
 * @param options - in case control over the internal openItems is required
 */
export function useFlatTree_unstable(
  items: FlatTreeItemProps[],
  options: Pick<TreeProps, 'openItems' | 'defaultOpenItems'> = {},
): FlatTree {
  const [openItems, updateOpenItems] = useOpenItemsState(options);
  const unfilteredFlatTree = React.useMemo(() => createUnfilteredFlatTree(items), [items]);
  const [navigate, navigationRef] = useFlatTreeNavigation(unfilteredFlatTree);
  const visibleFlatTree = React.useMemo(
    () => createVisibleFlatTree(unfilteredFlatTree, openItems),
    [unfilteredFlatTree, openItems],
  );

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

  const flatTree: FlatTree = {
    ...visibleFlatTree,
    getTreeProps: () => ({
      ref: navigationRef as React.Ref<HTMLDivElement>,
      openItems,
      onOpenChange: handleOpenChange,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      onNavigation_unstable: handleNavigation,
    }),
    navigate,
    getItem: id => unfilteredFlatTree.itemsPerId.get(id) ?? null,
  };
  return flatTree;
}
