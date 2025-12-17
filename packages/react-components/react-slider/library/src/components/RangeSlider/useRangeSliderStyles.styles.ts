import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { RangeSliderSlots, RangeSliderState } from './RangeSlider.types';

export const rangeSliderClassNames: SlotClassNames<RangeSliderSlots> = {
  root: 'fui-RangeSlider',
  // TODO: add class names for all slots on RangeSliderSlots.
  // Should be of the form `<slotName>: 'fui-RangeSlider__<slotName>`
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
 * Apply styling to the RangeSlider slots based on the state
 */
export const useRangeSliderStyles_unstable = (state: RangeSliderState): RangeSliderState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(rangeSliderClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
