import { makeStyles, mergeClasses } from '@griffel/react';
import { useDrawerHeaderStyles_unstable } from '@fluentui/react-drawer';

import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavDrawerHeaderSlots, NavDrawerHeaderState } from './NavDrawerHeader.types';

export const navDrawerHeaderClassNames: SlotClassNames<NavDrawerHeaderSlots> = {
  root: 'fui-NavDrawerHeader',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    margin: 'unset',
    paddingInlineStart: '12px',
    paddingBlock: '5px',
  },
});

/**
 * Apply styling to the NavDrawerHeader slots based on the state
 */
export const useNavDrawerHeaderStyles_unstable = (state: NavDrawerHeaderState): NavDrawerHeaderState => {
  'use no memo';

  useDrawerHeaderStyles_unstable(state);
  const styles = useStyles();
  state.root.className = mergeClasses(navDrawerHeaderClassNames.root, styles.root, state.root.className);

  return state;
};
