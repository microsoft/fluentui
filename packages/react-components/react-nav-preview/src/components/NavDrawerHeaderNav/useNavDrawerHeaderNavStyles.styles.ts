import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { useDrawerHeaderNavigationStyles_unstable } from '@fluentui/react-drawer';

import type { NavDrawerHeaderNavState } from './NavDrawerHeaderNav.types';
/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    ...shorthands.margin('unset'),
    paddingInlineStart: '0px',
    paddingBlockStart: '0px',
  },
});

/**
 * Apply styling to the NavDrawerHeaderNav slots based on the state
 */
export const useNavDrawerHeaderNavStyles_unstable = (state: NavDrawerHeaderNavState): NavDrawerHeaderNavState => {
  useDrawerHeaderNavigationStyles_unstable(state);
  const styles = useStyles();
  state.root.className = mergeClasses(styles.root, state.root.className);

  return state;
};
