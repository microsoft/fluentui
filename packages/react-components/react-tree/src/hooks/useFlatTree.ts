import { useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import * as React from 'react';
import { createFlatTreeItems, VisibleFlatTreeItemGenerator } from '../utils/createFlatTreeItems';
import { treeDataTypes } from '../utils/tokens';
import { useFlatTreeNavigation } from './useFlatTreeNavigation';
import { useControllableOpenItems } from './useControllableOpenItems';
import type {
  TreeCheckedChangeData,
  TreeCheckedChangeEvent,
  TreeNavigationData_unstable,
  TreeNavigationEvent_unstable,
  TreeOpenChangeData,
  TreeOpenChangeEvent,
  TreeProps,
} from '../Tree';
import type { TreeItemProps, TreeItemValue } from '../TreeItem';
import { dataTreeItemValueAttrName } from '../utils/getTreeItemValueFromElement';
import { ImmutableSet } from '../utils/ImmutableSet';
import { createNextFlatCheckedItems, useFlatControllableCheckedItems } from './useFlatControllableCheckedItems';

export type FlatTreeItemProps = Omit<TreeItemProps, 'itemType' | 'value'> &
  Partial<Pick<TreeItemProps, 'itemType'>> & {
    value: TreeItemValue;
    parentValue?: TreeItemValue;
  };

/**
 * The item that is returned by `useFlatTree`, it represents a wrapper around the properties provided to
 * `useFlatTree` but with extra information that might be useful on flat tree scenarios
 */
export type FlatTreeItem<Props extends FlatTreeItemProps = FlatTreeItemProps> = {
  index: number;
  level: number;
  childrenSize: number;
  value: TreeItemValue;
  parentValue: TreeItemValue | undefined;
  getTreeItemProps(): Required<Pick<Props, 'value' | 'aria-setsize' | 'aria-level' | 'aria-posinset' | 'itemType'>> &
    Omit<Props, 'parentId'>;
};

export type FlatTreeProps = Required<
  Pick<TreeProps, 'openItems' | 'onOpenChange' | 'onNavigation_unstable' | 'checkedItems' | 'onCheckedChange'>
> & {
  ref: React.Ref<HTMLDivElement>;
  openItems: ImmutableSet<TreeItemValue>;
};

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
export type FlatTree<Props extends FlatTreeItemProps = FlatTreeItemProps> = {
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
   *   if (nextItem && tree.getElementFromItem(nextItem)) {
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
   *
   * On the case of TypeAhead navigation this method returns the current item.
   */
  getNextNavigableItem(
    visibleItems: FlatTreeItem<Props>[],
    data: TreeNavigationData_unstable,
  ): FlatTreeItem<Props> | undefined;
  /**
   * similar to getElementById but for FlatTreeItems
   */
  getElementFromItem(item: FlatTreeItem<Props>): HTMLElement | null;
  /**
   * an iterable containing all visually available flat tree items
   */
  items(): IterableIterator<FlatTreeItem<Props>>;
};

export type FlatTreeOptions = Pick<
  TreeProps,
  | 'openItems'
  | 'defaultOpenItems'
  | 'onOpenChange'
  | 'onNavigation_unstable'
  | 'selectionMode'
  | 'checkedItems'
  | 'defaultCheckedItems'
  | 'onCheckedChange'
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
export function useFlatTree_unstable<Props extends FlatTreeItemProps = FlatTreeItemProps>(
  flatTreeItemProps: Props[],
  options: FlatTreeOptions = {},
): FlatTree<Props> {
  const flatTreeItems = React.useMemo(() => createFlatTreeItems(flatTreeItemProps), [flatTreeItemProps]);
  const [openItems, setOpenItems] = useControllableOpenItems(options);
  const [checkedItems, setCheckedItems] = useFlatControllableCheckedItems(options);
  const [navigate, navigationRef] = useFlatTreeNavigation(flatTreeItems);
  const treeRef = React.useRef<HTMLDivElement>(null);
  const handleOpenChange = useEventCallback((event: TreeOpenChangeEvent, data: TreeOpenChangeData) => {
    options.onOpenChange?.(event, data);
    if (!event.isDefaultPrevented()) {
      setOpenItems(data.openItems);
    }
    event.preventDefault();
  });

  const handleCheckedChange = useEventCallback((event: TreeCheckedChangeEvent, data: TreeCheckedChangeData) => {
    const nextFlatCheckedItems = createNextFlatCheckedItems(data, checkedItems);
    options.onCheckedChange?.(event, { ...data, checkedItems: nextFlatCheckedItems } as TreeCheckedChangeData);
    if (!event.isDefaultPrevented()) {
      setCheckedItems(nextFlatCheckedItems);
    }
    event.preventDefault();
  });

  const handleNavigation = useEventCallback(
    (event: TreeNavigationEvent_unstable, data: TreeNavigationData_unstable) => {
      options.onNavigation_unstable?.(event, data);
      if (!event.isDefaultPrevented()) {
        navigate(data);
      }
      event.preventDefault();
    },
  );

  const getNextNavigableItem = useEventCallback(
    (visibleItems: FlatTreeItem<Props>[], data: TreeNavigationData_unstable) => {
      const item = flatTreeItems.get(data.value);
      if (item) {
        switch (data.type) {
          case treeDataTypes.TypeAhead:
            return item;
          case treeDataTypes.ArrowLeft:
            return flatTreeItems.get(item.parentValue!);
          case treeDataTypes.ArrowRight:
            return visibleItems[item.index + 1];
          case treeDataTypes.End:
            return visibleItems[visibleItems.length - 1];
          case treeDataTypes.Home:
            return visibleItems[0];
          case treeDataTypes.ArrowDown:
            return visibleItems[item.index + 1];
          case treeDataTypes.ArrowUp:
            return visibleItems[item.index - 1];
        }
      }
    },
  );

  const getElementFromItem = React.useCallback((item: FlatTreeItem<Props>) => {
    return treeRef.current?.querySelector(`[${dataTreeItemValueAttrName}="${item.value}"]`) as HTMLElement | null;
  }, []);

  const ref = useMergedRefs(treeRef, navigationRef as React.Ref<HTMLDivElement>);

  const getTreeProps = React.useCallback(
    () => ({
      ref,
      openItems,
      selectionMode: options.selectionMode,
      checkedItems,
      onOpenChange: handleOpenChange,
      onCheckedChange: handleCheckedChange,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      onNavigation_unstable: handleNavigation,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [openItems, checkedItems],
  );

  const items = React.useCallback(
    () => VisibleFlatTreeItemGenerator(openItems, flatTreeItems),
    [openItems, flatTreeItems],
  );

  return React.useMemo(
    () => ({ navigate, getTreeProps, getNextNavigableItem, getElementFromItem, items }),
    [navigate, getTreeProps, getNextNavigableItem, getElementFromItem, items],
  );
}
