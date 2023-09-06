import type { TreeNavigationData_unstable, TreeProps } from '../../components/Tree/Tree.types';
import type { HeadlessTreeItem, HeadlessTreeItemProps } from '../HeadlessTree/types';
import type { ImmutableSet } from '../ImmutableSet';
import type { TreeItemValue } from '../../components/TreeItem/TreeItem.types';
import type { FlatTreeProps } from '../../components/FlatTree/FlatTree.types';

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
export type HeadlessRootFlatTree<Props extends HeadlessFlatTreeItemProps> = {
  /**
   * returns the properties required for the Tree component to work properly.
   * That includes:
   * `openItems`, `onOpenChange`, `onNavigation_unstable` and `ref`
   */
  getTreeProps(): Required<Pick<FlatTreeProps, 'onOpenChange'>> & {
    openItems: ImmutableSet<TreeItemValue>;
  };

  getTreeItem(value: TreeItemValue): HeadlessTreeItem<Props>;

  isOpen(value: TreeItemValue): boolean;
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
   * @param value - optional value from where to start the iteration
   */
  items(value?: TreeItemValue): IterableIterator<HeadlessTreeItem<Props>>;
};

export type HeadlessRootFlatTreeOptions = Pick<
  FlatTreeProps,
  'onOpenChange' | 'onNavigation' | 'selectionMode' | 'onCheckedChange'
> &
  Pick<TreeProps, 'defaultOpenItems' | 'openItems' | 'checkedItems'> & {
    defaultCheckedItems?: TreeProps['checkedItems'];
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
export type HeadlessSubFlatTree<Props extends HeadlessFlatTreeItemProps> = {
  /**
   * returns the properties required for the Tree component to work properly.
   * That includes:
   * `openItems`, `onOpenChange`, `onNavigation_unstable` and `ref`
   */
  getTreeProps(): Required<Pick<FlatTreeProps, 'onOpenChange'>> & {
    openItems: ImmutableSet<TreeItemValue>;
  };

  getTreeItem(value: TreeItemValue): HeadlessTreeItem<Props>;

  isOpen(value: TreeItemValue): boolean;
  /**
   * an iterable containing all visually available flat tree items
   * @param value - optional value from where to start the iteration
   */
  items(value?: TreeItemValue): IterableIterator<HeadlessTreeItem<Props>>;
};

export type HeadlessSubFlatTreeOptions = Pick<FlatTreeProps, 'onOpenChange'> &
  Pick<TreeProps, 'defaultOpenItems' | 'openItems'> & {
    rootValue: TreeItemValue;
    rootLevel: number;
  };

export type HeadlessFlatTree<Props extends HeadlessTreeItemProps> =
  | HeadlessRootFlatTree<Props>
  | HeadlessSubFlatTree<Props>;

export type HeadlessFlatTreeOptions = HeadlessRootFlatTreeOptions | HeadlessSubFlatTreeOptions;
