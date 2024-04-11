import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavSlots, NavState } from './Nav.types';

export const navClassNames: SlotClassNames<NavSlots> = {
  root: 'fui-Nav',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
});

/**
 * Apply styling to the Nav slots based on the state
 */
export const useNavStyles_unstable = (state: NavState): NavState => {
  const styles = useStyles();
  state.root.className = mergeClasses(navClassNames.root, styles.root, state.root.className);

  return state;
};
