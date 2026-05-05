'use client';

import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavSubItemGroupSlots, NavSubItemGroupState } from './NavSubItemGroup.types';

export const navSubItemGroupClassNames: SlotClassNames<Omit<NavSubItemGroupSlots, 'collapseMotion'>> = {
  root: 'fui-NavSubItemGroup',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    flexShrink: 0,
    transform: 'translateZ(0)',
    overflow: 'hidden',
  },
});

/**
 * Apply styling to the NavSubItemGroup slots based on the state
 */
export const useNavSubItemGroupStyles_unstable = (state: NavSubItemGroupState): NavSubItemGroupState => {
  'use no memo';

  const styles = useStyles();

  state.root.className = mergeClasses(navSubItemGroupClassNames.root, styles.root, state.root.className);

  return state;
};
