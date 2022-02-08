import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { ComboButtonState } from './ComboButton.types';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    ...shorthands.border('1px', 'solid', '#d1d1d1'),
    borderBottomColor: '#616161',
    ...shorthands.borderRadius('4px'),
    display: 'flex',
    alignItems: 'center',

    '&:focus-within': {
      outlineWidth: '2px',
      outlineStyle: 'solid',
      outlineColor: 'transparent',
      borderBottomColor: '#0078d4',
      borderBottomWidth: '2px',
    },
  },

  dropdownIcon: {
    flexGrow: 0,
    flexShrink: 0,
    ...shorthands.padding('4px'),
  },

  content: {
    flexGrow: 1,
    backgroundColor: 'transparent',
    ...shorthands.border('none'),
    textAlign: 'left',
    ...shorthands.padding('4px', '8px'),

    '&:focus': {
      outlineStyle: 'none',
    },
  },
});

/**
 * Apply styling to the ComboButton slots based on the state
 */
export const useComboButtonStyles = (state: ComboButtonState): ComboButtonState => {
  const styles = useStyles();
  state.root.className = mergeClasses(styles.root, state.root.className);

  state.content.className = mergeClasses(styles.content, state.content.className);

  if (state.dropdownIcon) {
    state.dropdownIcon.className = mergeClasses(styles.dropdownIcon, state.dropdownIcon.className);
  }

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
