import { makeStyles, mergeClasses } from '@griffel/react';
import type { InfoIconLabelSlots, InfoIconLabelState } from './InfoIconLabel.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const infoIconLabelClassNames: SlotClassNames<InfoIconLabelSlots> = {
  root: 'fui-InfoIconLabel',
  // TODO: add class names for all slots on InfoIconLabelSlots.
  // Should be of the form `<slotName>: 'fui-InfoIconLabel__<slotName>`
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
 * Apply styling to the InfoIconLabel slots based on the state
 */
export const useInfoIconLabelStyles_unstable = (state: InfoIconLabelState): InfoIconLabelState => {
  const styles = useStyles();
  state.root.className = mergeClasses(infoIconLabelClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
