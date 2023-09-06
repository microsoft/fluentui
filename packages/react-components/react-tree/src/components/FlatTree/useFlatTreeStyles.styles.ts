import { makeStyles, mergeClasses } from '@griffel/react';
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
});

export const useFlatTreeStyles_unstable = (state: FlatTreeState): FlatTreeState => {
  const styles = useStyles();
  if (state.level === 1) {
    state.root.className = mergeClasses(flatTreeClassNames.root, styles.root, state.root.className);
  }
  return state;
};
