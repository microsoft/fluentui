import { mergeClasses } from '@griffel/react';
import type { BaseTreeItemSlots, BaseTreeItemState } from './BaseTreeItem.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const baseTreeItemClassNames: SlotClassNames<BaseTreeItemSlots> = {
  root: 'fui-BaseTreeItem',
};

/**
 * Apply styling to the BaseTreeItem slots based on the state
 */
export const useBaseTreeItemStyles_unstable = (state: BaseTreeItemState): BaseTreeItemState => {
  state.root.className = mergeClasses(baseTreeItemClassNames.root, state.root.className);
  return state;
};
