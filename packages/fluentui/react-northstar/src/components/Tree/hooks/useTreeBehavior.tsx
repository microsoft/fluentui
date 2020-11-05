import * as React from 'react';
import { FlatTree } from './flattenTree';

export function useTreeBehavior(
  flatTree: FlatTree,
  toggleActive: (ids: string[], e: React.SyntheticEvent) => void,
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
      const firstChild = flatTree[id]?.childrenIds?.[0];
      if (!firstChild) return;

      const firstChildRef = getItemRef(firstChild);
      if (!firstChildRef) {
        return;
      }

      if (flatTree[firstChild]?.hasSubtree) {
        firstChildRef.focus();
      } else {
        // when node is leaf, need to focus on the inner treeTitle
        const firstElementChild = firstChildRef.firstElementChild;
        if (firstElementChild) {
          (firstElementChild as HTMLElement).focus();
        }
      }
    },
    [flatTree, getItemRef],
  );

  const siblingsExpand = React.useCallback(
    (e: React.SyntheticEvent, id: string) => {
      if (isExclusiveTree) {
        return;
      }

      const siblingIds = getInactiveSiblingIds(flatTree, id);
      toggleActive(siblingIds, e);
    },
    [flatTree, isExclusiveTree, toggleActive],
  );

  return {
    focusParent,
    focusFirstChild,
    siblingsExpand,
  };
}

function getInactiveSiblingIds(flatTree: FlatTree, id: string): string[] {
  const item = flatTree[id];
  if (!item) {
    return [];
  }
  const parent = item.parent;
  const siblingIds = [];
  Object.keys(flatTree).forEach(key => {
    if (flatTree[key].parent === parent && key !== id && flatTree[key].expanded === false) {
      siblingIds.push(key);
    }
  });
  return siblingIds;
}
