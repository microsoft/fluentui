import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MessagebarSlots, MessagebarState } from './Messagebar.types';

export const messagebarClassNames: SlotClassNames<MessagebarSlots> = {
  root: 'fui-Messagebar',
  // TODO: add class names for all slots on MessagebarSlots.
  // Should be of the form `<slotName>: 'fui-Messagebar__<slotName>`
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
 * Apply styling to the Messagebar slots based on the state
 */
export const useMessagebarStyles_unstable = (state: MessagebarState): MessagebarState => {
  const styles = useStyles();
  state.root.className = mergeClasses(messagebarClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
