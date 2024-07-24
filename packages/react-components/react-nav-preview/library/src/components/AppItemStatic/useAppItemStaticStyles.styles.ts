import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { AppItemStaticSlots, AppItemStaticState } from './AppItemStatic.types';

export const appItemStaticClassNames: SlotClassNames<AppItemStaticSlots> = {
  root: 'fui-AppItemStatic',
  // TODO: add class names for all slots on AppItemStaticSlots.
  // Should be of the form `<slotName>: 'fui-AppItemStatic__<slotName>`
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
 * Apply styling to the AppItemStatic slots based on the state
 */
export const useAppItemStaticStyles_unstable = (state: AppItemStaticState): AppItemStaticState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(appItemStaticClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
