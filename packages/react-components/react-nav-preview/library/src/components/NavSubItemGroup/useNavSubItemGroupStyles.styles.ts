import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavSubItemGroupSlots, NavSubItemGroupState } from './NavSubItemGroup.types';

export const navSubItemGroupClassNames: SlotClassNames<NavSubItemGroupSlots> = {
  root: 'fui-NavSubItemGroup',
  collapseMotion: 'fui-NavSubItemGroup__collapseMotion',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
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
