import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NativeSliderSlots, NativeSliderState } from './NativeSlider.types';

export const nativeSliderClassNames: SlotClassNames<NativeSliderSlots> = {
  root: 'fui-NativeSlider',
  // TODO: add class names for all slots on NativeSliderSlots.
  // Should be of the form `<slotName>: 'fui-NativeSlider__<slotName>`
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
 * Apply styling to the NativeSlider slots based on the state
 */
export const useNativeSliderStyles_unstable = (state: NativeSliderState): NativeSliderState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(nativeSliderClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
