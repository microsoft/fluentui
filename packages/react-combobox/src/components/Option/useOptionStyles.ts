import { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses } from '@griffel/react';
import type { OptionSlots, OptionState } from './Option.types';

/**
 * @deprecated Use `optionClassNames.root` instead.
 */
export const optionClassName = 'fui-Option';
export const optionClassNames: SlotClassNames<OptionSlots> = {
  root: 'fui-Option',
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
 * Apply styling to the Option slots based on the state
 */
export const useOptionStyles_unstable = (state: OptionState): OptionState => {
  const styles = useStyles();
  state.root.className = mergeClasses(optionClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
