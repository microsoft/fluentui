import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { AppItemSlots, AppItemState } from './AppItem.types';

export const appItemClassNames: SlotClassNames<AppItemSlots> = {
  root: 'fui-AppItem',
  // TODO: add class names for all slots on AppItemSlots.
  // Should be of the form `<slotName>: 'fui-AppItem__<slotName>`
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
 * Apply styling to the AppItem slots based on the state
 */
export const useAppItemStyles_unstable = (state: AppItemState): AppItemState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(appItemClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
