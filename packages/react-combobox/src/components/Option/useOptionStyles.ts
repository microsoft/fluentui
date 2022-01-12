import { makeStyles, mergeClasses } from '@griffel/react';
import type { OptionState } from './Option.types';

export const optionClassName = 'fui-Option';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: theme => ({
    // TODO Add default styles for the root element
  }),

  // these are testing-only styles
  active: {
    backgroundColor: 'slategray',
    color: '#fff',
  },

  // TODO add additional classes for different states and/or slots
});

/**
 * Apply styling to the Option slots based on the state
 */
export const useOptionStyles = (state: OptionState): OptionState => {
  const { isActive } = state;
  const styles = useStyles();
  state.root.className = mergeClasses(styles.root, state.root.className, isActive && styles.active);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
