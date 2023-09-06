import { TreeItemProps, TreeItemType, TreeItemValue } from '../../TreeItem';
import { ImmutableSet } from '../ImmutableSet';

export type HeadlessTreeItemProps = Partial<Omit<TreeItemProps, 'value'>> & Required<Pick<TreeItemProps, 'value'>>;

/**
 * @internal
 */
export type GetTreeItemPropsReturnType<Props extends HeadlessTreeItemProps> = Required<
  Pick<Props, 'value' | 'aria-setsize' | 'aria-level' | 'aria-posinset' | 'itemType'>
> &
  Props;

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
  getTreeItemProps(): GetTreeItemPropsReturnType<Props>;
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
   * @param key the key of the item to get
   */
  get(value: TreeItemValue): HeadlessTreeItem<Props> | undefined;
  /**
   * method to check if a virtual tree item exists by its value
   * @param value the value of the item to check if exists
   */
  has(value: TreeItemValue): boolean;
  /**
   * method to add a new virtual tree item to the virtual tree
   * @param props the props of the item to add
   */
  add(props: Props): void;
  /**
   * method to remove a virtual tree item from the virtual tree.
   * When an item is removed:
   * 1. all its children are also removed
   * 2. all its siblings are repositioned
   * @param value the value of the item to remove
   */
  // remove(value: TreeItemValue): void;
  /**
   * method to get the parent of a virtual tree item by its value
   * @param value the value of the item to get the parent from
   */
  getParent(value: TreeItemValue): HeadlessTreeItem<Props>;
  /**
   * method to get the subtree of a virtual tree item by its value
   * @param value the value of the item to get the subtree from
   */
  subtree(value: TreeItemValue): IterableIterator<HeadlessTreeItem<Props>>;
  /**
   * method to get the children of a virtual tree item by its value
   * @param value the value of the item to get the children from
   */
  children(value: TreeItemValue): IterableIterator<HeadlessTreeItem<Props>>;
  /**
   * method to get the visible items of a virtual tree
   * @param openItems the open items of the tree
   * @param value the value of the item to start from
   */
  visibleItems(
    openItems: ImmutableSet<TreeItemValue>,
    value?: TreeItemValue,
  ): IterableIterator<HeadlessTreeItem<Props>>;
  /**
   * method to get the ancestors of a virtual tree item by its value
   * @param value the value of the item to get the ancestors from
   */
  ancestors(value: TreeItemValue): IterableIterator<HeadlessTreeItem<Props>>;
};
