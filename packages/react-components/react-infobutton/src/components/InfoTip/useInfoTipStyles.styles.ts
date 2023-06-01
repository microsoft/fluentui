import { makeStyles, mergeClasses } from '@griffel/react';
import type { InfoTipSlots, InfoTipState } from './InfoTip.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const infoTipClassNames: SlotClassNames<InfoTipSlots> = {
  root: 'fui-InfoTip',
  // TODO: add class names for all slots on InfoTipSlots.
  // Should be of the form `<slotName>: 'fui-InfoTip__<slotName>`
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
 * Apply styling to the InfoTip slots based on the state
 */
export const useInfoTipStyles_unstable = (state: InfoTipState): InfoTipState => {
  const styles = useStyles();
  state.root.className = mergeClasses(infoTipClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
