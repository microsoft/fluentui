import { makeStyles, mergeClasses } from '@griffel/react';
import { RadioGroupState } from './RadioGroup.types';

export const radioGroupClassName = 'fui-RadioGroup';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    // TODO Add default styles for the root element
  },

  // TODO add additional classes for different states and/or slots
});

/**
 * Apply styling to the RadioGroup slots based on the state
 */
export const useRadioGroupStyles_unstable = (state: RadioGroupState): RadioGroupState => {
  const styles = useStyles();
  state.root.className = mergeClasses(radioGroupClassName, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
