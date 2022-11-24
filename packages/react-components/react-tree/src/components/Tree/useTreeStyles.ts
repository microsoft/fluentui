import { mergeClasses } from '@griffel/react';
import type { TreeSlots, TreeState } from './Tree.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const treeClassNames: SlotClassNames<TreeSlots> = {
  root: 'fui-Tree',
};

export const useTreeStyles_unstable = (state: TreeState): TreeState => {
  state.root.className = mergeClasses(treeClassNames.root, state.root.className);

  return state;
};
