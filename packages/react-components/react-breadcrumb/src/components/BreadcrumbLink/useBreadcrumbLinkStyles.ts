import { makeStyles, mergeClasses } from '@griffel/react';
import type { BreadcrumbLinkSlots, BreadcrumbLinkState } from './BreadcrumbLink.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const breadcrumbLinkClassNames: SlotClassNames<BreadcrumbLinkSlots> = {
  root: 'fui-BreadcrumbLink',
  // TODO: add class names for all slots on BreadcrumbLinkSlots.
  // Should be of the form `<slotName>: 'fui-BreadcrumbLink__<slotName>`
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
 * Apply styling to the BreadcrumbLink slots based on the state
 */
export const useBreadcrumbLinkStyles_unstable = (state: BreadcrumbLinkState): BreadcrumbLinkState => {
  const styles = useStyles();
  state.root.className = mergeClasses(breadcrumbLinkClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
