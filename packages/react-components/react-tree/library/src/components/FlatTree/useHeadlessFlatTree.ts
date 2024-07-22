import { useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import * as React from 'react';
import { HeadlessTreeItem, HeadlessTreeItemProps, createHeadlessTree } from '../../utils/createHeadlessTree';
import { treeDataTypes } from '../../utils/tokens';
import { useFlatTreeNavigation } from '../../hooks/useFlatTreeNavigation';
import { createNextOpenItems, useControllableOpenItems } from '../../hooks/useControllableOpenItems';
import type { TreeItemValue } from '../../TreeItem';
import { dataTreeItemValueAttrName } from '../../utils/getTreeItemValueFromElement';
import { ImmutableSet } from '../../utils/ImmutableSet';
import { createNextFlatCheckedItems, useFlatControllableCheckedItems } from './useFlatControllableCheckedItems';
import { FlatTreeProps } from './FlatTree.types';
import {
  TreeCheckedChangeData,
  TreeCheckedChangeEvent,
  TreeNavigationData_unstable,
  TreeOpenChangeData,
  TreeOpenChangeEvent,
  TreeProps,
} from '../Tree/Tree.types';

export type HeadlessFlatTreeItemProps = HeadlessTreeItemProps;
export type HeadlessFlatTreeItem<Props extends HeadlessFlatTreeItemProps> = HeadlessTreeItem<Props>;

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
export type HeadlessFlatTree<Props extends HeadlessFlatTreeItemProps> = {
  /**
   * returns the properties required for the Tree component to work properly.
   * That includes:
   * `openItems`, `onOpenChange`, `onNavigation_unstable` and `ref`
   */
  getTreeProps(): Required<
    Pick<FlatTreeProps, 'openItems' | 'onOpenChange' | 'onNavigation' | 'checkedItems' | 'onCheckedChange'>
  > & {
    ref: React.Ref<HTMLDivElement>;
    openItems: ImmutableSet<TreeItemValue>;
  };
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
    visibleItems: HeadlessTreeItem<Props>[],
    data: TreeNavigationData_unstable,
  ): HeadlessTreeItem<Props> | undefined;
  /**
   * similar to getElementById but for FlatTreeItems
   */
  getElementFromItem(item: HeadlessTreeItem<Props>): HTMLElement | null;
  /**
   * an iterable containing all visually available flat tree items
   */
  items(): IterableIterator<HeadlessTreeItem<Props>>;
};

export type HeadlessFlatTreeOptions = Pick<
  FlatTreeProps,
  'onOpenChange' | 'onNavigation' | 'selectionMode' | 'onCheckedChange'
> &
  Pick<TreeProps, 'defaultOpenItems' | 'openItems' | 'checkedItems'> & {
    defaultCheckedItems?: TreeProps['checkedItems'];
  };

/**
 * @internal
 */
type HeadlessFlatTreeReturn<Props extends HeadlessFlatTreeItemProps> = HeadlessFlatTree<Props> & {
  getItem(value: TreeItemValue): HeadlessTreeItem<Props> | undefined;
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
 * @param props - a list of tree items
 * @param options - in case control over the internal openItems is required
 */
export function useHeadlessFlatTree_unstable<Props extends HeadlessTreeItemProps>(
  props: Props[],
  options: HeadlessFlatTreeOptions = {},
): HeadlessFlatTreeReturn<Props> {
  'use no memo';

  const headlessTree = React.useMemo(() => createHeadlessTree(props), [props]);
  const [openItems, setOpenItems] = useControllableOpenItems(options);
  const [checkedItems, setCheckedItems] = useFlatControllableCheckedItems(options, headlessTree);
  const navigation = useFlatTreeNavigation();

  const treeRef = React.useRef<HTMLDivElement>(null);
  const handleOpenChange = useEventCallback((event: TreeOpenChangeEvent, data: TreeOpenChangeData) => {
    const nextOpenItems = createNextOpenItems(data, openItems);
    options.onOpenChange?.(event, {
      ...data,
      openItems: nextOpenItems.dangerouslyGetInternalSet_unstable(),
    });
    setOpenItems(nextOpenItems);
  });

  const handleCheckedChange = useEventCallback((event: TreeCheckedChangeEvent, data: TreeCheckedChangeData) => {
    const nextCheckedItems = createNextFlatCheckedItems(data, checkedItems, headlessTree);
    options.onCheckedChange?.(event, {
      ...data,
      checkedItems: nextCheckedItems.dangerouslyGetInternalMap_unstable(),
    });
    setCheckedItems(nextCheckedItems);
  });

  const getNextNavigableItem = useEventCallback(
    (visibleItems: HeadlessTreeItem<Props>[], data: TreeNavigationData_unstable) => {
      const item = headlessTree.get(data.value);
      if (item) {
        switch (data.type) {
          case treeDataTypes.TypeAhead:
            return item;
          case treeDataTypes.ArrowLeft:
            return headlessTree.get(item.parentValue!);
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

  const getElementFromItem = React.useCallback((item: HeadlessTreeItem<Props>) => {
    return treeRef.current?.querySelector(`[${dataTreeItemValueAttrName}="${item.value}"]`) as HTMLElement | null;
  }, []);

  const ref = useMergedRefs<HTMLDivElement>(treeRef, navigation.rootRef);

  const getTreeProps = React.useCallback(
    () => ({
      ref,
      openItems,
      selectionMode: options.selectionMode,
      checkedItems,
      onOpenChange: handleOpenChange,
      onCheckedChange: handleCheckedChange,
      onNavigation: options.onNavigation ?? noop,
    }),
    // ref, handleOpenChange - useEventCallback, handleCheckedChange - useEventCallback
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [openItems, checkedItems, options.selectionMode, options.onNavigation],
  );

  const items = React.useCallback(() => headlessTree.visibleItems(openItems), [openItems, headlessTree]);

  const getItem = React.useCallback((value: TreeItemValue) => headlessTree.get(value), [headlessTree]);

  return React.useMemo<HeadlessFlatTreeReturn<Props>>(
    () => ({
      navigate: navigation.navigate,
      getTreeProps,
      getNextNavigableItem,
      getElementFromItem,
      items,
      getItem,
    }),
    [navigation.navigate, getTreeProps, getNextNavigableItem, getElementFromItem, items, getItem],
  );
}

/** @internal */
function noop() {
  /* noop */
}
