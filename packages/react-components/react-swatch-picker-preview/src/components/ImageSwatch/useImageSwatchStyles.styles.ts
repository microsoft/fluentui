import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ImageSwatchSlots, ImageSwatchState } from './ImageSwatch.types';

export const imageSwatchClassNames: SlotClassNames<ImageSwatchSlots> = {
  root: 'fui-ImageSwatch',
  // TODO: add class names for all slots on ImageSwatchSlots.
  // Should be of the form `<slotName>: 'fui-ImageSwatch__<slotName>`
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
 * Apply styling to the ImageSwatch slots based on the state
 */
export const useImageSwatchStyles_unstable = (state: ImageSwatchState): ImageSwatchState => {
  const styles = useStyles();
  state.root.className = mergeClasses(imageSwatchClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
