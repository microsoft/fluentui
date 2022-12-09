import { mergeClasses } from '@griffel/react';
import type { TreeItemSlots, TreeItemState } from './TreeItem.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const treeItemClassNames: SlotClassNames<TreeItemSlots> = {
  root: 'fui-TreeItem',
  expandIcon: 'fui-TreeItem__expandIcon',
  iconBefore: 'fui-TreeItem__iconBefore',
  iconAfter: 'fui-TreeItem__iconAfter',
  actionIcon: 'fui-TreeItem__actionIcon',
};

/**
 * Apply styling to the TreeItem slots based on the state
 */
export const useTreeItemStyles_unstable = (state: TreeItemState): TreeItemState => {
  state.root.className = mergeClasses(treeItemClassNames.root, state.root.className);

  if (state.expandIcon) {
    state.expandIcon.className = mergeClasses(treeItemClassNames.expandIcon, state.expandIcon.className);
  }

  if (state.iconBefore) {
    state.iconBefore.className = mergeClasses(treeItemClassNames.iconBefore, state.iconBefore.className);
  }

  if (state.iconAfter) {
    state.iconAfter.className = mergeClasses(treeItemClassNames.iconAfter, state.iconAfter.className);
  }

  if (state.actionIcon) {
    state.actionIcon.className = mergeClasses(treeItemClassNames.actionIcon, state.actionIcon.className);
  }

  return state;
};
