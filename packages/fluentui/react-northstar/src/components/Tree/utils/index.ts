import * as _ from 'lodash';
import * as React from 'react';
import { TreeItemProps } from '../TreeItem';
import { ShorthandValue } from '../../../types';

export const hasSubtree = (item: TreeItemProps | ShorthandValue<TreeItemProps>): boolean => {
  return !_.isNil(item['items']) && item['items'].length > 0;
};

export const removeItemAtIndex = (items: any[], itemIndex: number): any[] => {
  return [...items.slice(0, itemIndex), ...items.slice(itemIndex + 1)];
};

export const getAllSelectableChildrenId = (items: TreeItemProps[]): string[] => {
  return items.reduce<string[]>((acc, item) => {
    if (item.items) {
      return [...acc, ...getAllSelectableChildrenId(item.items as TreeItemProps[])];
    }

    return item.hasOwnProperty('selectable') && !item.selectable ? acc : [...acc, item.id];
  }, []);
};

export const isAllGroupChecked = (items: TreeItemProps[], selectedItemIds: string[]) => {
  const selectableItemIds = getAllSelectableChildrenId(items);

  return selectableItemIds.every(id => selectedItemIds.indexOf(id) > -1);
};

/**
 * Looks for the item inside the nested items array and returns its siblings.
 * @param {any[]} items The nested items array.
 * @param {string} itemId The id of the item to return the children of.
 * @returns {any[]} The item siblings
 */
export const getSiblings = (items: any[], itemId: string): any[] => {
  function getSiblingsFn(items: any[]) {
    const itemIndex = items.findIndex(item => item.id === itemId);

    if (itemIndex > -1) {
      return removeItemAtIndex(items, itemIndex);
    }

    for (const item of items) {
      if (item.items) {
        const result = getSiblingsFn(item.items);

        if (result) {
          return result;
        }
      }
    }

    return null;
  }

  return getSiblingsFn(items);
};

export const processItemsForSelection = (treeItemProps: TreeItemProps, selectedItemIds: string[]) => {
  const isExpandedSelectableParent = hasSubtree(treeItemProps) && treeItemProps.selectable;

  let nextSelectedItemIds = selectedItemIds;

  // push all tree items under particular parent into selection array
  // not parent itself, therefore not procced with selection

  if (isExpandedSelectableParent) {
    if (isAllGroupChecked(treeItemProps.items as TreeItemProps[], selectedItemIds)) {
      const selectedItems = getAllSelectableChildrenId(treeItemProps.items as TreeItemProps[]);
      nextSelectedItemIds = selectedItemIds.filter(id => selectedItems.indexOf(id) === -1);
    } else {
      const selectItems = items => {
        items.forEach(item => {
          const selectble = item.hasOwnProperty('selectable') ? item.selectable : treeItemProps.selectable;
          if (selectedItemIds.indexOf(item.id) === -1) {
            if (item.items) {
              selectItems(item.items);
            } else if (selectble) {
              nextSelectedItemIds.push(item.id);
            }
          }
        });
      };
      selectItems(treeItemProps.items);
    }

    return [...nextSelectedItemIds];
  }

  // push/remove single tree item into selection array
  if (selectedItemIds.indexOf(treeItemProps.id) === -1) {
    nextSelectedItemIds = [...selectedItemIds, treeItemProps.id];
  } else {
    nextSelectedItemIds = nextSelectedItemIds.filter(itemID => itemID !== treeItemProps.id);
  }

  return nextSelectedItemIds;
};

export interface TreeRenderContextValue {
  onFocusFirstChild: (itemId: string) => void;
  onFocusParent: (itemId: string) => void;
  onSiblingsExpand: (e: React.SyntheticEvent, itemProps: TreeItemProps) => void;
  onTitleClick: (e: React.SyntheticEvent, itemProps: TreeItemProps, executeSelection?: boolean) => void;
}

export const TreeContext = React.createContext<TreeRenderContextValue>({
  onFocusFirstChild: _.noop,
  onFocusParent: _.noop,
  onSiblingsExpand: _.noop,
  onTitleClick: _.noop,
});
