import { makeStyles, mergeClasses } from '@griffel/react';
import type { OptionState } from './Option.types';

export const optionClassName = 'fui-Option';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: '4px 6px',
    borderRadius: '4px',

    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },

  // these are testing-only styles
  active: {
    outline: '2px solid black',
  },

  // these are testing-only styles
  selected: {},

  check: {
    padding: '4px',
    visibility: 'hidden',
  },

  selectedCheck: {
    visibility: 'visible',
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

  state.check.className = mergeClasses(styles.check, state.check.className, selected && styles.selectedCheck);

  return state;
};
