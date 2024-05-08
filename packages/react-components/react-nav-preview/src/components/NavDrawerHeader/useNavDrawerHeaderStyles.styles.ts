import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { NavDrawerHeaderState } from './NavDrawerHeader.types';
import { useDrawerHeaderStyles_unstable } from '@fluentui/react-drawer';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    ...shorthands.margin('unset'),
    paddingInlineStart: '12px',
    paddingBlockStart: '0px',
    paddingBlockEnd: '0px',
  },
});

/**
 * Apply styling to the NavDrawerHeader slots based on the state
 */
export const useNavDrawerHeaderStyles_unstable = (state: NavDrawerHeaderState): NavDrawerHeaderState => {
  useDrawerHeaderStyles_unstable(state);
  const styles = useStyles();
  state.root.className = mergeClasses(styles.root, state.root.className);

  return state;
};
