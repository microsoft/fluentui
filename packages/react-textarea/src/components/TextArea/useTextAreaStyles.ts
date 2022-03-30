import { makeStyles, mergeClasses } from '@griffel/react';
import type { TextAreaSlots, TextAreaState } from './TextArea.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const textAreaClassName = 'fui-TextArea';
export const textAreaClassNames: SlotClassNames<TextAreaSlots> = {
  root: 'fui-TextArea',
  // TODO: add class names for all slots on TextAreaSlots.
  // Should be of the form `<slotName>: 'fui-TextArea__<slotName>`
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
 * Apply styling to the TextArea slots based on the state
 */
export const useTextAreaStyles_unstable = (state: TextAreaState): TextAreaState => {
  const styles = useStyles();
  state.root.className = mergeClasses(textAreaClassName, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
