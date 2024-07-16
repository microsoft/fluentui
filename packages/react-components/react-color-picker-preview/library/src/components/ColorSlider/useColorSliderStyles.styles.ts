import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ColorSliderSlots, ColorSliderState } from './ColorSlider.types';

export const colorSliderClassNames: SlotClassNames<ColorSliderSlots> = {
  root: 'fui-ColorSlider',
  // TODO: add class names for all slots on ColorSliderSlots.
  // Should be of the form `<slotName>: 'fui-ColorSlider__<slotName>`
};

const hueStyle = {
  background: `linear-gradient(${[
    'to left',
    'red 0',
    '#f09 10%',
    '#cd00ff 20%',
    '#3200ff 30%',
    '#06f 40%',
    '#00fffd 50%',
    '#0f6 60%',
    '#35ff00 70%',
    '#cdff00 80%',
    '#f90 90%',
    'red 100%',
  ].join(',')})`,
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    position: 'relative',
    height: '20px',
    marginBottom: '8px',
    border: `1px solid #ccc`,
    borderRadius: `2px`,
    boxSizing: 'border-box',
    outline: 'none',
    forcedColorAdjust: 'none',
    background: hueStyle.background,
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
