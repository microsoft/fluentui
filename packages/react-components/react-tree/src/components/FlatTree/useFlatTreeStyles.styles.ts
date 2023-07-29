import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import { FlatTreeSlots, FlatTreeState } from './FlatTree.types';

export const flatTreeClassNames: SlotClassNames<FlatTreeSlots> = {
  root: 'fui-FlatTree',
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalXXS,
  },
  subtree: {
    ...shorthands.flex(1, 1, '100%'),
    ...shorthands.gridArea('subtree'),
  },
});

export const useFlatTreeStyles_unstable = (state: FlatTreeState): FlatTreeState => {
  const styles = useStyles();
  const isSubTree = state.level > 0;
  state.root.className = mergeClasses(
    flatTreeClassNames.root,
    styles.root,
    isSubTree && styles.subtree,
    state.root.className,
  );
  return state;
};
