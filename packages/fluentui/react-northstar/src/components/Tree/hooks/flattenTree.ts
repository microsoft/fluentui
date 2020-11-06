import { ObjectShorthandValue } from '../../../index';
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

  /** Shorthand props for the current item */
  item: ObjectShorthandValue<TreeItemProps>;
}

export type BaseFlatTree = Record<string, BaseFlatTreeItem>;

// Fluent UI Tree component does not have a root item.
// Adding a 'secret' root (level=0) helps traversing among the top level (level=1) tree items.
// This 'secret' root should NOT be returned as part of orderedItemIds, because it is not an item from user props
export const SECRET_ROOT_ID = 'FLUENT_UI_SECRET_ROOT_ID';

/**
 * @param items
 * @returns returns the flattened tree, and returns an array of all tree item ids in a Depth First order.
 */
export function flattenTree(
  items: ObjectShorthandValue<TreeItemProps>[],
): { flatTree: BaseFlatTree; orderedItemIds: string[] } {
  const flatTree = {
    [SECRET_ROOT_ID]: {
      index: 1,
      level: 0,
      expanded: true,
      treeSize: 1,
      hasSubtree: true,
    } as BaseFlatTreeItem,
  };

  // returns an extra array of orderedItemIds because flattened tree object does not keep the order of insertion
  return flattenSubTree(items, 1, SECRET_ROOT_ID, flatTree, []);
}

function flattenSubTree(
  items: ObjectShorthandValue<TreeItemProps>[],
  level: number = 1,
  parent: string,
  flatTree: BaseFlatTree,
  orderedItemIds: string[],
) {
  if (!items) {
    return { flatTree, orderedItemIds };
  }

  const itemsInLeaf = items.length;

  items.forEach((item, indexAmongSiblings) => {
    const { id, expanded, items: childrenItems } = item;
    const hasSubtree = childrenItems ? !!childrenItems.length : false;
    orderedItemIds.push(id);

    flatTree[id] = {
      item,
      index: indexAmongSiblings + 1, // Used for aria-posinset and it's 1-based.
      level,
      expanded: hasSubtree ? !!expanded : undefined,
      parent: parent == null ? undefined : parent,
      treeSize: itemsInLeaf,
      hasSubtree,
    };

    if (hasSubtree) {
      flattenSubTree(childrenItems as ObjectShorthandValue<TreeItemProps>[], level + 1, id, flatTree, orderedItemIds);
    }

    if (flatTree[parent].childrenIds) {
      flatTree[parent].childrenIds.push(id);
    } else {
      flatTree[parent].childrenIds = [id];
    }
  });

  return { flatTree, orderedItemIds };
}
