import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NativeSliderSlots, NativeSliderState } from './NativeSlider.types';

export const nativeSliderClassNames: SlotClassNames<NativeSliderSlots> = {
  root: 'fui-NativeSlider',
  // TODO: add class names for all slots on NativeSliderSlots.
  // Should be of the form `<slotName>: 'fui-NativeSlider__<slotName>`
};

const ChromeMedia = '@media screen and (-webkit-min-device-pixel-ratio:0)';

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
// /** FF*/
// input[type="range"]::-moz-range-progress {
// background-color: #43e5f7;
// }
// input[type="range"]::-moz-range-track {
// background-color: #9a905d;
// }
// /* IE*/
// input[type="range"]::-ms-fill-lower {
// background-color: #43e5f7;
// }
// input[type="range"]::-ms-fill-upper {
// background-color: #9a905d;
// }

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    '::-webkit-slider-runnable-track': {
      height: '10px',
      '-webkit-appearance': 'none',
      // color: 'red',
      marginTop: '-1px',
    },
    '::-webkit-slider-thumb': {
      width: '28px',
      // '-webkit-appearance': 'none',
      height: '28px',
      // background: 'red',
      borderRadius: '50%',
      boxShadow: '-80px 0 0 80px #43e5f7',
    },
    // ChromeMedia: {},
    accentColor: 'coral',
    overflow: 'hidden',
    width: '100px',
    '-webkit-appearance': 'none',
    backgroundImage: hueStyle.background,
    height: '28px',
    borderRadius: '4px',
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
