import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { NavDrawerBodyState } from './NavDrawerBody.types';
import { useDrawerStyles_unstable } from '@fluentui/react-drawer';

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
  useDrawerStyles_unstable(state);
  const styles = useStyles();
  state.root.className = mergeClasses(styles.root, state.root.className);
  return state;
};
