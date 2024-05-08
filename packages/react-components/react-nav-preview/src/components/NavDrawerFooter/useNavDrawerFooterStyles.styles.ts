import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { useDrawerFooterStyles_unstable } from '@fluentui/react-drawer';
import type { NavDrawerFooterState } from './NavDrawerFooter.types';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'unset',
    ...shorthands.padding(0, tokens.spacingVerticalMNudge),
  },
});

/**
 * Apply styling to the NavDrawerFooter slots based on the state
 */
export const useNavDrawerFooterStyles_unstable = (state: NavDrawerFooterState): NavDrawerFooterState => {
  useDrawerFooterStyles_unstable(state);
  const styles = useStyles();
  state.root.className = mergeClasses(styles.root, state.root.className);

  return state;
};
