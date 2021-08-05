import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
// import { SliderState } from './Slider.types';

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
 * Apply styling to the Slider slots based on the state
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useSliderStyles = (state: any): any => {
  const styles = useStyles();
  state.className = mergeClasses(styles.root, state.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
