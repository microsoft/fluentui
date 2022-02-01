import { makeStyles, mergeClasses } from '@griffel/react';
import type { OptionState } from './Option.types';

export const optionClassName = 'fui-Option';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {},

  // these are testing-only styles
  active: {
    backgroundColor: 'slategray',
    color: '#fff',
  },

  // these are testing-only styles
  selected: {
    backgroundColor: 'black',
    color: '#fff',
  },
});

/**
 * Apply styling to the Option slots based on the state
 */
export const useOptionStyles = (state: OptionState): OptionState => {
  const { isActive, selected } = state;
  const styles = useStyles();
  state.root.className = mergeClasses(
    styles.root,
    state.root.className,
    selected && styles.selected,
    isActive && styles.active,
  );

  return state;
};
