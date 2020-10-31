import * as React from 'react';
import { TreeItemProps } from '../TreeItem';
import { FlatTree } from './flattenTree';
import { ObjectShorthandCollection, ShorthandRenderFunction } from '../../../types';
import { TreeTitleProps } from '../TreeTitle';

export function useTobeRenderedItemsProps(
  flatTree: FlatTree,
  isActiveItem: (id: string) => boolean,
  isSelectableTree: boolean,
  isSelectedItem?: (id: string) => SelectedState,
  /** Shorthand array of props for Tree. */
  items?: ObjectShorthandCollection<TreeItemProps>,
  /**
   * A custom render function for the title slot.
   *
   * @param Component - The computed component for this slot.
   * @param props - The computed props for this slot.
   * @param children - The computed children for this slot.
   */
  renderItemTitle?: ShorthandRenderFunction<TreeTitleProps>,
) {
  const tobeRenderedItemsProps = React.useMemo(
    () => getTreeItemsProps(flatTree, isActiveItem, isSelectableTree, isSelectedItem, items, renderItemTitle),
    [flatTree, isActiveItem, isSelectableTree, isSelectedItem, items, renderItemTitle],
  );

  return tobeRenderedItemsProps;
}

// const renderItems = (items?: TreeItemProps[], level = 1) => {
//   if (!items) {
//     return null;
//   }

//   return items.reduce((prevTreeItemsProps: TreeItemProps[], currItem: TreeItemProps, index: number) => {
//     const id = currItem.id;
//     // const isSelected = isSelectedItem ? isSelectedItem(id) : undefined;

//     const treeItemProps = {
//       items: flatTree[id].items,
//       renderItemTitle: flatTree[id].renderItemTitle,
//       id,
//       key: id,
//       parent: flatTree[id].parentId,
//       level,
//       index: index + 1, // Used for aria-posinset and it's 1-based.
//       contentRef: flatTree[id].itemRef,
//       treeSize: items.length,
//       // props controled by useTreeActiveState
//       expanded: flatTree[id].isActive,
//       // selectable: isSelectableTree,
//       // // props controled by useTreeSelectState
//       // selected: isSelectableTree ? isSelected === SelectedState.ALL_SELECTED : undefined,
//       // indeterminate: isSelectableTree ? isSelected === SelectedState.SOME_SELECTED : undefined,
//     };

//     return [
//       ...prevTreeItemsProps,
//       treeItemProps,
//       ...(flatTree[id].isActive ? renderItems(currItem.items as TreeItemProps[], level + 1) : ([] as any)),
//     ];
//   }, []);
// };

// return renderItems(items);
