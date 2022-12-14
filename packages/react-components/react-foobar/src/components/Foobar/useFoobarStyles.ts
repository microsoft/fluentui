import { makeStyles, mergeClasses } from '@griffel/react';
import type { FoobarSlots, FoobarState } from './Foobar.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const foobarClassNames: SlotClassNames<FoobarSlots> = {
  root: 'fui-Foobar',
  // TODO: add class names for all slots on FoobarSlots.
  // Should be of the form `<slotName>: 'fui-Foobar__<slotName>`
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
 * Apply styling to the Foobar slots based on the state
 */
export const useFoobarStyles_unstable = (state: FoobarState): FoobarState => {
  const styles = useStyles();
  state.root.className = mergeClasses(foobarClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
