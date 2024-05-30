import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { useDrawerBodyStyles_unstable } from '@fluentui/react-drawer';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavDrawerBodySlots, NavDrawerBodyState } from './NavDrawerBody.types';

export const navDrawerBodyClassNames: SlotClassNames<NavDrawerBodySlots> = {
  root: 'fui-NavDrawerBody',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    padding: `0 ${tokens.spacingVerticalMNudge}`,
    alignItems: 'unset',
  },
});

/**
 * Apply styling to the NavDrawerBody slots based on the state
 */
export const useNavDrawerBodyStyles_unstable = (state: NavDrawerBodyState): NavDrawerBodyState => {
  useDrawerBodyStyles_unstable(state);
  const styles = useStyles();
  state.root.className = mergeClasses(navDrawerBodyClassNames.root, styles.root, state.root.className);
  return state;
};
