import { ButtonState, useButtonStyles_unstable } from '@fluentui/react-button';
import { makeResetStyles, mergeClasses } from '@griffel/react';

/**
 * Styles for the root slot
 */
const useRootBaseStyles = makeResetStyles({
  display: 'block',
  width: '100%',
  textAlign: 'left',
  padding: 0,
  '&:hover': {
    color: 'unset',
  },
  '&:hover:active': {
    color: 'unset',
  },
});

/**
 * Apply styling to the ListItemButton slots based on the state
 */
export const useListItemButtonStyles_unstable = (state: ButtonState): ButtonState => {
  useButtonStyles_unstable(state);

  const baseStyles = useRootBaseStyles();
  state.root.className = mergeClasses(state.root.className, baseStyles);

  return state;
};
