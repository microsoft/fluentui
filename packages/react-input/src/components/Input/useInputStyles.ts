import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import type { InputSlots, InputState } from './Input.types';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles<keyof InputSlots | 'root'>({
  root: theme => ({}),
  input: theme => ({}),
  inputWrapper: theme => ({}),
  bookendBefore: theme => ({}),
  bookendAfter: theme => ({}),
  insideStart: theme => ({}),
  insideEnd: theme => ({}),
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
