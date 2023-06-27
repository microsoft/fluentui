import { makeStyles, mergeClasses } from '@griffel/react';
import type { InfoIconSlots, InfoIconState } from './InfoIcon.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const infoIconClassNames: SlotClassNames<InfoIconSlots> = {
  root: 'fui-InfoIcon',
  // TODO: add class names for all slots on InfoIconSlots.
  // Should be of the form `<slotName>: 'fui-InfoIcon__<slotName>`
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
 * Apply styling to the InfoIcon slots based on the state
 */
export const useInfoIconStyles_unstable = (state: InfoIconState): InfoIconState => {
  const styles = useStyles();
  state.root.className = mergeClasses(infoIconClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
