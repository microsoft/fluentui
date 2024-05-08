import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { useDrawerBodyStyles_unstable } from '@fluentui/react-drawer';
import type { NavDrawerBodyState } from './NavDrawerBody.types';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    ...shorthands.padding(0, tokens.spacingVerticalMNudge),
    alignItems: 'unset',
  },
});

/**
 * Apply styling to the NavDrawerBody slots based on the state
 */
export const useNavDrawerBodyStyles_unstable = (state: NavDrawerBodyState): NavDrawerBodyState => {
  useDrawerBodyStyles_unstable(state);
  const styles = useStyles();
  state.root.className = mergeClasses(styles.root, state.root.className);
  return state;
};
