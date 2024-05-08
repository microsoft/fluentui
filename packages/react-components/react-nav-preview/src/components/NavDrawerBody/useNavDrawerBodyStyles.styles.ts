import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { NavDrawerBodyState } from './NavDrawerBody.types';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    ...shorthands.padding(0, tokens.spacingVerticalMNudge),
    backgroundColor: 'red',
  },

  // TODO add additional classes for different states and/or slots
});

/**
 * Apply styling to the NavDrawerBody slots based on the state
 */
export const useNavDrawerBodyStyles_unstable = (state: NavDrawerBodyState): NavDrawerBodyState => {
  const styles = useStyles();
  state.root.className = mergeClasses(styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
