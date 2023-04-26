import { useEventCallback } from '@fluentui/react-utilities';
import * as React from 'react';
import { createFlatTreeItems, VisibleFlatTreeItemGenerator } from '../utils/createFlatTreeItems';
import { treeDataTypes } from '../utils/tokens';
import { useFlatTreeNavigation } from './useFlatTreeNavigation';
import { useOpenItemsState } from './useOpenItemsState';
import type {
  TreeNavigationData_unstable,
  TreeNavigationEvent_unstable,
  TreeOpenChangeData,
  TreeOpenChangeEvent,
  TreeProps,
} from '../Tree';
import type { TreeItemProps } from '../TreeItem';

export type FlatTreeItemProps<Value = string> = TreeItemProps<Value> & {
  value: Value;
  parentValue?: Value;
};

/**
 * The item that is returned by `useFlatTree`, it represents a wrapper around the properties provided to
 * `useFlatTree` but with extra information that might be useful on flat tree scenarios
 */
export type FlatTreeItem<Props extends FlatTreeItemProps<unknown> = FlatTreeItemProps> = {
  index: number;
  level: number;
  childrenSize: number;
  value: Props['value'];
  parentValue: Props['parentValue'];
  /**
   * A reference to the element that will render the `TreeItem`,
   * this is necessary for nodes with parents (to ensure child to parent navigation),
   * if a node has no parent then this reference will be null.
   */
  ref: React.RefObject<HTMLDivElement>;
  getTreeItemProps(): Required<Pick<Props, 'value' | 'aria-setsize' | 'aria-level' | 'aria-posinset' | 'leaf'>> &
    Omit<Props, 'parentValue'>;
};

export type FlatTreeProps<Value = string> = Required<
  Pick<TreeProps<Value>, 'openItems' | 'onOpenChange' | 'onNavigation_unstable'>
> & { ref: React.Ref<HTMLDivElement> };

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
export type FlatTree<Props extends FlatTreeItemProps<unknown> = FlatTreeItemProps> = {
  /**
   * returns the properties required for the Tree component to work properly.
   * That includes:
   * `openItems`, `onOpenChange`, `onNavigation_unstable` and `ref`
   */
  getTreeProps(): FlatTreeProps<Props['value']>;
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
   *   if (nextItem && document.getElementById(nextItem.id)) {
   *     listRef.current.scrollToItem(nextItem.index);
   *   }
   *   // wait for scrolling to happen and then invoke navigate method
   *   requestAnimationFrame(() => {
   *     tree.navigate(data);
   *   });
   * };
   *```
   */
  navigate(data: TreeNavigationData_unstable<Props['value']>): void;
  /**
   * returns next item to be focused on a navigation.
   * This method is provided to decouple the element that needs to be focused from
   *  the action of focusing it itself.
   *
   * On the case of TypeAhead navigation this method returns the current item.
   */
  getNextNavigableItem(
    visibleItems: FlatTreeItem<Props>[],
    data: TreeNavigationData_unstable<Props['value']>,
  ): FlatTreeItem<Props> | undefined;
  /**
   * an iterable containing all visually available flat tree items
   */
  items(): IterableIterator<FlatTreeItem<Props>>;
};

type FlatTreeOptions<Props extends FlatTreeItemProps<unknown> = FlatTreeItemProps> = Pick<
  TreeProps<Props['value']>,
  'openItems' | 'defaultOpenItems' | 'onOpenChange' | 'onNavigation_unstable'
>;

/**
 * this hook provides FlatTree API to manage all required mechanisms to convert a list of items into renderable TreeItems
 * in multiple scenarios including virtualization.
 *
 * !!A flat tree is an unofficial spec for tree!!
 *
 * It should be used on cases where more complex interactions with a Tree is required.
 * On simple scenarios it is advised to simply use a nested structure instead.
 *
 * @param flatTreeItemProps - a list of tree items
 * @param options - in case control over the internal openItems is required
 */
export function useFlatTree_unstable<Props extends FlatTreeItemProps<unknown> = FlatTreeItemProps>(
  flatTreeItemProps: Props[],
  options: FlatTreeOptions<Props> = {},
): FlatTree<Props> {
  const [openItems, updateOpenItems] = useOpenItemsState<Props['value']>(options);
  const flatTreeItems = React.useMemo(() => createFlatTreeItems(flatTreeItemProps), [flatTreeItemProps]);
  const [navigate, navigationRef] = useFlatTreeNavigation(flatTreeItems);

  const handleOpenChange = useEventCallback((event: TreeOpenChangeEvent, data: TreeOpenChangeData<Props['value']>) => {
    options.onOpenChange?.(event, data);
    if (!event.isDefaultPrevented()) {
      updateOpenItems(data);
    }
    event.preventDefault();
  });

  const handleNavigation = useEventCallback(
    (event: TreeNavigationEvent_unstable, data: TreeNavigationData_unstable<Props['value']>) => {
      options.onNavigation_unstable?.(event, data);
      if (!event.isDefaultPrevented()) {
        navigate(data);
      }
      event.preventDefault();
    },
  );

  const getNextNavigableItem = useEventCallback(
    (visibleItems: FlatTreeItem<Props>[], data: TreeNavigationData_unstable<Props['value']>) => {
      const item = flatTreeItems.get(data.value);
      if (item) {
        switch (data.type) {
          case treeDataTypes.typeAhead:
            return item;
          case treeDataTypes.arrowLeft:
            return flatTreeItems.get(item.parentValue!);
          case treeDataTypes.arrowRight:
            return visibleItems[item.index + 1];
          case treeDataTypes.end:
            return visibleItems[visibleItems.length - 1];
          case treeDataTypes.home:
            return visibleItems[0];
          case treeDataTypes.arrowDown:
            return visibleItems[item.index + 1];
          case treeDataTypes.arrowUp:
            return visibleItems[item.index - 1];
        }
      }
    },
  );

  const getTreeProps = React.useCallback(
    () => ({
      ref: navigationRef as React.Ref<HTMLDivElement>,
      openItems,
      onOpenChange: handleOpenChange,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      onNavigation_unstable: handleNavigation,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [openItems],
  );

  const items = React.useCallback(
    () => VisibleFlatTreeItemGenerator(openItems, flatTreeItems),
    [openItems, flatTreeItems],
  );

  return React.useMemo(
    () => ({ navigate, getTreeProps, getNextNavigableItem, items }),
    [navigate, getTreeProps, getNextNavigableItem, items],
  );
}
