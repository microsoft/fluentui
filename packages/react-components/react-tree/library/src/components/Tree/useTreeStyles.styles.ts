import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import type { TreeSlots, TreeState } from './Tree.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';

export const treeClassNames: SlotClassNames<TreeSlots> = {
  root: 'fui-Tree',
};

const useBaseStyles = makeResetStyles({
  display: 'flex',
  flexDirection: 'column',
  rowGap: tokens.spacingVerticalXXS,
});

const useStyles = makeStyles({
  subtree: {
    paddingTop: tokens.spacingVerticalXXS,
  },
});

export const useTreeStyles_unstable = (state: TreeState): TreeState => {
  'use no memo';

  const baseStyles = useBaseStyles();
  const styles = useStyles();
  const isSubTree = state.level > 1;

  state.root.className = mergeClasses(
    treeClassNames.root,
    baseStyles,
    isSubTree && styles.subtree,
    state.root.className,
  );
  return state;
};
