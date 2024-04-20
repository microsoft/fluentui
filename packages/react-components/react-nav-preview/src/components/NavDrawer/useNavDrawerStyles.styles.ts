import { makeStyles, mergeClasses } from '@griffel/react';
import { InlineDrawerSlots } from '@fluentui/react-drawer';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavDrawerState } from './NavDrawer.types';

export const navDrawerClassNames: SlotClassNames<InlineDrawerSlots> = {
  root: 'fui-NavDrawer',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    width: '260px', // per spec
  },
});

/**
 * Apply styling to the NavDrawer slots based on the state
 */
export const useNavDrawerStyles_unstable = (state: NavDrawerState): NavDrawerState => {
  const styles = useStyles();
  state.root.className = mergeClasses(navDrawerClassNames.root, styles.root, state.root.className);

  return state;
};
