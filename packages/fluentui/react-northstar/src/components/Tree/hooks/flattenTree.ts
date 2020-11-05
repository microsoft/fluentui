import {
  ObjectShorthandCollection,
  ObjectShorthandValue,
  ShorthandRenderFunction,
  TreeTitleProps,
} from '../../../index';
import { TreeItemProps } from '../TreeItem';

export interface BaseFlatTreeItem {
  /**
   * Also in TreeItemProps.
   * The index of the item among its siblings. Count starts at 1.
   */
  index: number;

  /**
   * Also in TreeItemProps.
   * Level of the tree/subtree that contains this item.
   */
  level: number;

  /**
   * Also in TreeItemProps.
   * true if the tree item is expanded (indicating tree item has subtree).
   * when tree item has no subtree, expanded is undefined
   */
  expanded?: boolean;

  /**
   * Also in TreeItemProps.
   * parent id of the tree item. For the top level tree items, parent is undefined
   */
  parent?: string;

  /**
   * Also in TreeItemProps.
   * Size of the tree/subtree that contains this item.
   */
  treeSize: number;

  /** true if the tree item has subtree, indicating childrenIds are not undefined */
  hasSubtree: boolean;

  /** children ids of the tree item. For leaf tree item, childrenIds is undefined */
  childrenIds?: string[];
}

export type BaseFlatTree = Record<string, BaseFlatTreeItem>;

export function flattenTree(
  items: ObjectShorthandValue<TreeItemProps>[],
  level: number = 1,
  parent: string | null = null,
  result: BaseFlatTree = {},
): BaseFlatTree {
  if (!items) {
    return result;
  }

  const itemsInLeaf = items.length;

  items.forEach((item, indexAmongSiblings) => {
    const { id, expanded, items: childrenItems } = item;
    const hasSubtree = childrenItems ? !!childrenItems.length : false;

    result[id] = {
      index: indexAmongSiblings + 1, // Used for aria-posinset and it's 1-based.
      level,
      expanded: hasSubtree ? !!expanded : undefined,
      parent: parent == null ? undefined : parent,
      treeSize: itemsInLeaf,
      hasSubtree,
    };

    if (hasSubtree) {
      flattenTree(childrenItems as ObjectShorthandValue<TreeItemProps>[], level + 1, id, result);
    }

    if (parent) {
      if (result[parent].childrenIds) {
        result[parent].childrenIds.push(id);
      } else {
        result[parent].childrenIds = [id];
      }
    }
  });

  return result;
}

export function getTobeRenderedItemsProps(
  items: ObjectShorthandCollection<TreeItemProps>, // tree's props.items
  flatTree: BaseFlatTree,
  treeRenderItemTitle?: ShorthandRenderFunction<TreeTitleProps>,
): TreeItemProps[] {
  if (!items) {
    return [];
  }

  return items.reduce((prevProps: TreeItemProps[], currItem) => {
    const {
      id,
      items,
      title,
      accessibility,
      onFocusFirstChild,
      onFocusParent,
      onTitleClick,
      onClick,
      onSiblingsExpand,
      renderItemTitle,
      selectable,
      selectionIndicator,
    } = currItem;

    if (!flatTree[id]) {
      // should never happen
      return prevProps;
    }

    const { expanded, parent, level, index, treeSize } = flatTree[id];

    const treeItemProps = {
      // user props:
      id,
      items,
      key: id,
      title,
      ...(accessibility && { accessibility }), // to not override accessibility passed down from tree
      onFocusFirstChild,
      onFocusParent,
      onTitleClick,
      onClick,
      onSiblingsExpand,
      renderItemTitle: renderItemTitle ?? treeRenderItemTitle,
      selectable,
      selectionIndicator,
      // props from flatTree:
      expanded,
      parent,
      level,
      index,
      treeSize,
    };

    return [
      ...prevProps,
      treeItemProps,
      ...(flatTree[id].expanded ? getTobeRenderedItemsProps(items as any, flatTree, treeRenderItemTitle) : ([] as any)),
    ];
  }, []);
}
