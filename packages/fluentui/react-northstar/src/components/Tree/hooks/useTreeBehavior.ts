import * as React from 'react';
import { GetItemById } from './useGetItemById';

export function useTreeBehavior(getItemById: GetItemById, getItemRef: (id: string) => HTMLElement) {
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

  return {
    focusParent,
    focusFirstChild,
  };
}
