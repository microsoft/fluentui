import { makeStyles, mergeClasses } from '@griffel/react';
import type { BreadcrumbItemSlots, BreadcrumbItemState } from './BreadcrumbItem.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const breadcrumbItemClassNames: SlotClassNames<BreadcrumbItemSlots> = {
  root: 'fui-BreadcrumbItem',
  // TODO: add class names for all slots on BreadcrumbItemSlots.
  // Should be of the form `<slotName>: 'fui-BreadcrumbItem__<slotName>`
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
 * Apply styling to the BreadcrumbItem slots based on the state
 */
export const useBreadcrumbItemStyles_unstable = (state: BreadcrumbItemState): BreadcrumbItemState => {
  const styles = useStyles();
  state.root.className = mergeClasses(breadcrumbItemClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
