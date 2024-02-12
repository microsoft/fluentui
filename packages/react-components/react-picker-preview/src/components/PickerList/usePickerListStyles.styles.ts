import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { PickerListSlots, PickerListState } from './PickerList.types';

export const pickerListClassNames: SlotClassNames<PickerListSlots> = {
  root: 'fui-PickerList',
  // TODO: add class names for all slots on PickerListSlots.
  // Should be of the form `<slotName>: 'fui-PickerList__<slotName>`
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    boxShadow: `${tokens.shadow16}`,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    maxHeight: '80vh',
    boxSizing: 'border-box',
  },

  collapsed: {
    display: 'none',
  },
});

/**
 * Apply styling to the PickerList slots based on the state
 */
export const usePickerListStyles_unstable = (state: PickerListState): PickerListState => {
  const styles = useStyles();
  if (state.root) {
    state.root.className = mergeClasses(
      pickerListClassNames.root,
      styles.root,
      !state.open && styles.collapsed,
      state.root.className,
    );
  }

  return state;
};
