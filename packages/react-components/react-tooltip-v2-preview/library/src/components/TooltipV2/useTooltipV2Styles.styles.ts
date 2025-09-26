import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TooltipV2Slots, TooltipV2State } from './TooltipV2.types';

export const tooltipV2ClassNames: SlotClassNames<TooltipV2Slots> = {
  root: 'fui-TooltipV2',
  // TODO: add class names for all slots on TooltipV2Slots.
  // Should be of the form `<slotName>: 'fui-TooltipV2__<slotName>`
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
 * Apply styling to the TooltipV2 slots based on the state
 */
export const useTooltipV2Styles_unstable = (state: TooltipV2State): TooltipV2State => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(tooltipV2ClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
