import { makeStyles, mergeClasses } from '@griffel/react';
import type { BreadcrumbSlots, BreadcrumbState } from './Breadcrumb.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const breadcrumbClassNames: SlotClassNames<BreadcrumbSlots> = {
  root: 'fui-Breadcrumb',
  // TODO: add class names for all slots on BreadcrumbSlots.
  // Should be of the form `<slotName>: 'fui-Breadcrumb__<slotName>`
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
 * Apply styling to the Breadcrumb slots based on the state
 */
export const useBreadcrumbStyles_unstable = (state: BreadcrumbState): BreadcrumbState => {
  const styles = useStyles();
  state.root.className = mergeClasses(breadcrumbClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
