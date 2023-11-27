import { ButtonState, useButtonStyles_unstable } from '@fluentui/react-button';
import { makeResetStyles, mergeClasses, shorthands } from '@griffel/react';

/**
 * Styles for the root slot
 */
const useStyles = makeResetStyles({
  display: 'block',
  width: '100%',
  textAlign: 'left',
  ...shorthands.padding(0),
});

/**
 * Apply styling to the ListItemButton slots based on the state
 */
export const useListItemButtonStyles_unstable = (state: ButtonState): ButtonState => {
  useButtonStyles_unstable(state);

  const styles = useStyles();
  state.root.className = mergeClasses(state.root.className, styles);

  return state;
};
