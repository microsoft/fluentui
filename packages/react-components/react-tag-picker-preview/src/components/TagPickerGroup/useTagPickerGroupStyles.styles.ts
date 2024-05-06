import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TagPickerGroupSlots, TagPickerGroupState } from './TagPickerGroup.types';
import { useTagGroupStyles_unstable } from '@fluentui/react-tags';
import { tokens } from '@fluentui/react-theme';
import { tagSizeToTagPickerSize } from '../../utils/tagPicker2Tag';

export const tagPickerGroupClassNames: SlotClassNames<TagPickerGroupSlots> = {
  root: 'fui-TagPickerGroup',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    flexWrap: 'wrap',
    boxSizing: 'border-box',
    cursor: 'text',
  },
  // size variants
  medium: {
    ...shorthands.padding(tokens.spacingVerticalSNudge, 0, tokens.spacingVerticalSNudge, 0),
    ...shorthands.gap(tokens.spacingHorizontalXS),
  },
  large: {
    ...shorthands.padding(tokens.spacingVerticalS, 0, tokens.spacingVerticalS, 0),
    ...shorthands.gap(tokens.spacingHorizontalSNudge),
  },
  'extra-large': {
    ...shorthands.padding(tokens.spacingVerticalS, 0, tokens.spacingVerticalS, 0),
    ...shorthands.gap(tokens.spacingHorizontalSNudge),
  },
});

/**
 * Apply styling to the TagPickerGroup slots based on the state
 */
export const useTagPickerGroupStyles_unstable = (state: TagPickerGroupState): TagPickerGroupState => {
  useTagGroupStyles_unstable(state);
  const styles = useStyles();
  state.root.className = mergeClasses(
    tagPickerGroupClassNames.root,
    styles[tagSizeToTagPickerSize(state.size)],
    styles.root,
    state.root.className,
  );

  return state;
};
