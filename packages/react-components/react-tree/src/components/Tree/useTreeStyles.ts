import { makeStyles, mergeClasses } from '@griffel/react';
import type { TreeSlots, TreeState } from './Tree.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';

export const treeClassNames: SlotClassNames<TreeSlots> = {
  root: 'fui-Tree',
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalXXS,
  },
});

export const useTreeStyles_unstable = (state: TreeState): TreeState => {
  const styles = useStyles();
  state.root.className = mergeClasses(treeClassNames.root, styles.root, state.root.className);

  return state;
};
