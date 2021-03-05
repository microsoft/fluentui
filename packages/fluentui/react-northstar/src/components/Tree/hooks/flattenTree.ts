import { ObjectShorthandValue } from '../../../types';
import { TreeItemProps } from '../TreeItem';

export interface FlatTreeItem {
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

  /**
   * when selected=true, the tree item is fully selected, indicating all its descendents are fully selected;
   * when selected=false, the tree item is not selected, indicating none of its descendents is selected;
   * when selected='indeterminate', only part of the tree item's descendents are selected
   */
  selected?: boolean | 'indeterminate';
}

export type FlatTree = Record<string, FlatTreeItem>;

// Fluent UI Tree component does not have a root item.
// Adding a 'secret' root (level=0) helps traversing among the top level (level=1) tree items.
// This 'secret' root should NOT be returned as part of orderedItemIds, because it is not an item from user props
const SECRET_ROOT_ID = 'FLUENT_UI_SECRET_ROOT_ID';

/**
 * @returns returns the flattened tree, and an array of all visible tree item ids in a Depth First order.
 */
export function flattenTree(
  items: ObjectShorthandValue<TreeItemProps>[],
  activeItemIds: string[],
  selectedItemIds: string[],
): { flatTree: FlatTree; visibleItemIds: string[] } {
  const flatTree = {
    [SECRET_ROOT_ID]: {
      index: 1,
      level: 0,
      expanded: true,
      treeSize: 1,
      hasSubtree: true,
    } as FlatTreeItem,
  };

  // returns an extra array of orderedItemIds because flattened tree object does not keep the order of insertion
  return flattenSubTree(items, 1, SECRET_ROOT_ID, flatTree, true, activeItemIds, [], selectedItemIds);
}

function flattenSubTree(
  items: ObjectShorthandValue<TreeItemProps>[],
  level: number = 1,
  parent: string,
  flatTree: FlatTree,
  isParentVisible: boolean = true,
  activeItemIds: string[],
  visibleItemIds: string[],
  selectedItemIds: string[],
): { flatTree: FlatTree; visibleItemIds: string[]; selectedChildrenNum: number; selectableChildrenNum: number } {
  if (!items) {
    return { flatTree, visibleItemIds, selectedChildrenNum: 0, selectableChildrenNum: 0 };
  }

  const itemsInLeaf = items.length;
  let selectedNum = 0;
  let selectableNum = 0;

  items.forEach((item, indexAmongSiblings) => {
    const { id, items: childrenItems } = item;
    const selectable = item.selectable !== false; // by default item is selectable, unless selectable=false specified
    const hasSubtree = childrenItems ? !!childrenItems.length : false;
    const expanded = hasSubtree && activeItemIds.indexOf(id) !== -1;

    flatTree[id] = {
      item,
      index: indexAmongSiblings + 1, // Used for aria-posinset and it's 1-based.
      level,
      expanded,
      parent: parent == null ? undefined : parent,
      treeSize: itemsInLeaf,
      hasSubtree,
      selected: false,
    };

    if (isParentVisible) {
      visibleItemIds.push(id);
    }

    const { selectedChildrenNum, selectableChildrenNum } = flattenSubTree(
      childrenItems as ObjectShorthandValue<TreeItemProps>[],
      level + 1,
      id,
      flatTree,
      isParentVisible && expanded, // parent being visible and expanded means subtree is visible
      activeItemIds,
      visibleItemIds,
      selectedItemIds,
    );

    if (selectable) {
      selectableNum++;
      if (
        (hasSubtree && selectedChildrenNum === selectableChildrenNum) ||
        (!hasSubtree && selectedItemIds.indexOf(id) >= 0) // selectedItemIds only make sense for leaf nodes
      ) {
        flatTree[id].selected = true;
        selectedNum++;
      } else if (selectedChildrenNum > 0) {
        flatTree[id].selected = 'indeterminate';
        selectedNum += 0.5; // trick to propagate indeterminate state to ancestors
      }
    }

    if (flatTree[parent].childrenIds) {
      flatTree[parent].childrenIds.push(id);
    } else {
      flatTree[parent].childrenIds = [id];
    }
  });

  return { flatTree, visibleItemIds, selectedChildrenNum: selectedNum, selectableChildrenNum: selectableNum };
}
