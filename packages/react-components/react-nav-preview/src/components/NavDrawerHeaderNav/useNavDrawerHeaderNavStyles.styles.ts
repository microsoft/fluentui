import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { useDrawerHeaderNavigationStyles_unstable } from '@fluentui/react-drawer';

import type { NavDrawerHeaderNavSlots, NavDrawerHeaderNavState } from './NavDrawerHeaderNav.types';
import { SlotClassNames } from '@fluentui/react-utilities';

export const navDrawerHeaderNavClassNames: SlotClassNames<NavDrawerHeaderNavSlots> = {
  root: 'fui-NavDrawerHeaderNav',
};

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
  state.root.className = mergeClasses(navDrawerHeaderNavClassNames.root, styles.root, state.root.className);

  return state;
};
