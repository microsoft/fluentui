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
