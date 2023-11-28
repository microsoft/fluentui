import { ButtonState, useButtonStyles_unstable } from '@fluentui/react-button';
import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';

/**
 * Styles for the root slot
 */
const useRootBaseStyles = makeResetStyles({
  display: 'block',
  width: '100%',
  textAlign: 'left',
  ...shorthands.padding(0),
});

const useStyles = makeStyles({
  root: {
    '&:hover': {
      color: 'unset',
    },
    '&:hover:active': {
      color: 'unset',
    },
  },
});

/**
 * Apply styling to the ListItemButton slots based on the state
 */
export const useListItemButtonStyles_unstable = (state: ButtonState): ButtonState => {
  useButtonStyles_unstable(state);

  const baseStyles = useRootBaseStyles();
  const styles = useStyles();
  state.root.className = mergeClasses(state.root.className, baseStyles, styles.root);

  return state;
};
