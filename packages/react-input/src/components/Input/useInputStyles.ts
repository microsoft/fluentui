import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { InputState } from './Input.types';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: theme => ({
    // TODO Add default styles for the root element
  }),

  // TODO add additional classes for different states and/or slots
});

/**
 * Apply styling to the Input slots based on the state
 */
export const useInputStyles = (state: InputState): InputState => {
  const styles = useStyles();
  state.className = mergeClasses(styles.root, state.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
