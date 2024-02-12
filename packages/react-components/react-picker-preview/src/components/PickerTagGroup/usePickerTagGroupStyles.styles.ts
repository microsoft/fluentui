import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { PickerTagGroupSlots, PickerTagGroupState } from './PickerTagGroup.types';
import { useTagGroupStyles_unstable } from '@fluentui/react-tags';

export const pickerTagGroupClassNames: SlotClassNames<PickerTagGroupSlots> = {
  root: 'fui-PickerTagGroup',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    flexWrap: 'wrap',
  },
});

/**
 * Apply styling to the PickerTagGroup slots based on the state
 */
export const usePickerTagGroupStyles_unstable = (state: PickerTagGroupState): PickerTagGroupState => {
  useTagGroupStyles_unstable(state);
  const styles = useStyles();
  state.root.className = mergeClasses(pickerTagGroupClassNames.root, styles.root, state.root.className);

  return state;
};
