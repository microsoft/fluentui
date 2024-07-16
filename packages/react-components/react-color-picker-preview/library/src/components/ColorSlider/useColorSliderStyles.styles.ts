import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ColorSliderSlots, ColorSliderState } from './ColorSlider.types';

export const colorSliderClassNames: SlotClassNames<ColorSliderSlots> = {
  root: 'fui-ColorSlider',
  // TODO: add class names for all slots on ColorSliderSlots.
  // Should be of the form `<slotName>: 'fui-ColorSlider__<slotName>`
};

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
 * Apply styling to the ColorSlider slots based on the state
 */
export const useColorSliderStyles_unstable = (state: ColorSliderState): ColorSliderState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(colorSliderClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
