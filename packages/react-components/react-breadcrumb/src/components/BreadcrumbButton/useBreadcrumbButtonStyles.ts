import { makeStyles, mergeClasses } from '@griffel/react';
import type { BreadcrumbButtonSlots, BreadcrumbButtonState } from './BreadcrumbButton.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const breadcrumbButtonClassNames: SlotClassNames<BreadcrumbButtonSlots> = {
  root: 'fui-BreadcrumbButton',
  // TODO: add class names for all slots on BreadcrumbButtonSlots.
  // Should be of the form `<slotName>: 'fui-BreadcrumbButton__<slotName>`
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
 * Apply styling to the BreadcrumbButton slots based on the state
 */
export const useBreadcrumbButtonStyles_unstable = (state: BreadcrumbButtonState): BreadcrumbButtonState => {
  const styles = useStyles();
  state.root.className = mergeClasses(breadcrumbButtonClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
