import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TagPickerGroupSlots, TagPickerGroupState } from './TagPickerGroup.types';
import { useTagGroupStyles_unstable } from '@fluentui/react-tags';

export const tagPickerGroupClassNames: SlotClassNames<TagPickerGroupSlots> = {
  root: 'fui-TagPickerGroup',
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
 * Apply styling to the TagPickerGroup slots based on the state
 */
export const useTagPickerGroupStyles_unstable = (state: TagPickerGroupState): TagPickerGroupState => {
  useTagGroupStyles_unstable(state);
  const styles = useStyles();
  state.root.className = mergeClasses(tagPickerGroupClassNames.root, styles.root, state.root.className);

  return state;
};
