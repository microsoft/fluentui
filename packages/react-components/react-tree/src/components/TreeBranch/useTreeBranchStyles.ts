import { mergeClasses } from '@griffel/react';
import type { TreeBranchSlots, TreeBranchState } from './TreeBranch.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const treeBranchClassNames: SlotClassNames<TreeBranchSlots> = {
  root: 'fui-TreeBranch',
};

export const useTreeBranchStyles_unstable = (state: TreeBranchState): TreeBranchState => {
  state.root.className = mergeClasses(treeBranchClassNames.root, state.root.className);
  return state;
};
