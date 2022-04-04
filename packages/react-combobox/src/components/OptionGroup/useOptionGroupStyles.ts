import { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses } from '@griffel/react';
import type { OptionGroupSlots, OptionGroupState } from './OptionGroup.types';

/**
 * @deprecated Use `optionGroupClassNames.root` instead.
 */
export const optionGroupClassName = 'fui-OptionGroup';
export const optionGroupClassNames: SlotClassNames<OptionGroupSlots> = {
  root: 'fui-OptionGroup',
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
 * Apply styling to the OptionGroup slots based on the state
 */
export const useOptionGroupStyles_unstable = (state: OptionGroupState): OptionGroupState => {
  const styles = useStyles();
  state.root.className = mergeClasses(optionGroupClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
