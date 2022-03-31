import { makeStyles, mergeClasses } from '@griffel/react';
import type { TextareaSlots, TextareaState } from './Textarea.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const textareaClassName = 'fui-Textarea';
export const textareaClassNames: SlotClassNames<TextareaSlots> = {
  root: 'fui-Textarea',
  // TODO: add class names for all slots on TextareaSlots.
  // Should be of the form `<slotName>: 'fui-Textarea__<slotName>`
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
 * Apply styling to the Textarea slots based on the state
 */
export const useTextareaStyles_unstable = (state: TextareaState): TextareaState => {
  const styles = useStyles();
  state.root.className = mergeClasses(textareaClassName, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
