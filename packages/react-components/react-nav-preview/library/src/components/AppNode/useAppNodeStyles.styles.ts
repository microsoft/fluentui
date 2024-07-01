import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { AppNodeSlots, AppNodeState } from './AppNode.types';

export const appNodeClassNames: SlotClassNames<AppNodeSlots> = {
  root: 'fui-AppNode',
  // TODO: add class names for all slots on AppNodeSlots.
  // Should be of the form `<slotName>: 'fui-AppNode__<slotName>`
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
 * Apply styling to the AppNode slots based on the state
 */
export const useAppNodeStyles_unstable = (state: AppNodeState): AppNodeState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(appNodeClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
