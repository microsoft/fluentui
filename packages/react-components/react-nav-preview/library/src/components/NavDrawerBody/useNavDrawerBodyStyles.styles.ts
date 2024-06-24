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
    padding: `0 ${tokens.spacingHorizontalXS} 0 ${tokens.spacingHorizontalMNudge}`,
    alignItems: 'unset',
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalXXS,
  },
});

/**
 * Apply styling to the NavDrawerBody slots based on the state
 */
export const useNavDrawerBodyStyles_unstable = (state: NavDrawerBodyState): NavDrawerBodyState => {
  'use no memo';

  useDrawerBodyStyles_unstable(state);
  const styles = useStyles();
  state.root.className = mergeClasses(navDrawerBodyClassNames.root, styles.root, state.root.className);
  return state;
};
