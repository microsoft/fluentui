import * as React from 'react';
import { BaseFlatTreeItem } from './flattenTree';

export function useTreeBehavior(
  getItemById: (id: string) => BaseFlatTreeItem,
  expandSiblings: (e: React.KeyboardEvent, focusedItemId: string) => void,
  isExclusiveTree: boolean,
  getItemRef: (id: string) => HTMLElement,
) {
  const focusParent = React.useCallback(
    (parent: string) => {
      const parentRef = getItemRef(parent);
      parentRef?.focus();
    },
    [getItemRef],
  );

  const focusFirstChild = React.useCallback(
    (id: string) => {
      const firstChild = getItemById(id)?.childrenIds?.[0];
      if (!firstChild) return;

      const firstChildRef = getItemRef(firstChild);
      if (!firstChildRef) {
        return;
      }

      if (getItemById(firstChild)?.hasSubtree) {
        firstChildRef.focus();
      } else {
        // when node is leaf, need to focus on the inner treeTitle
        (firstChildRef.firstElementChild as HTMLElement)?.focus();
      }
    },
    [getItemById, getItemRef],
  );

  const siblingsExpand = React.useCallback(
    (e: React.KeyboardEvent, id: string) => {
      if (isExclusiveTree) {
        return;
      }

      expandSiblings(e, id);
    },
    [expandSiblings, isExclusiveTree],
  );

  return {
    focusParent,
    focusFirstChild,
    siblingsExpand,
  };
}
