'use client';

import { makeStyles, mergeClasses } from '@griffel/react';
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
  //
  // `rowGap`, not `gap`: the column axis has always belonged to TagGroup. Under Griffel,
  // `useTagGroupStyles_unstable`'s output was the last mergeClasses argument below, so its
  // columnGap atomic beat the columnGap half of a `gap` shorthand on every size — only the
  // row axis from here ever rendered. Now that react-tags is converted (cascade layers),
  // an unlayered columnGap atomic here would steal the column axis back (mixed-mode
  // inversion, DECISIONS.md D12). Setting only rowGap keeps the computed styles identical
  // in both worlds.
  medium: {
    padding: `${tokens.spacingVerticalSNudge} 0 ${tokens.spacingVerticalSNudge} 0`,
    rowGap: tokens.spacingHorizontalXS,
  },
  large: {
    padding: `${tokens.spacingVerticalS} 0 ${tokens.spacingVerticalS} 0`,
    rowGap: tokens.spacingHorizontalSNudge,
  },
  'extra-large': {
    padding: `${tokens.spacingVerticalS} 0 ${tokens.spacingVerticalS} 0`,
    rowGap: tokens.spacingHorizontalSNudge,
  },
});

/**
 * Apply styling to the TagPickerGroup slots based on the state
 */
export const useTagPickerGroupStyles_unstable = (state: TagPickerGroupState): TagPickerGroupState => {
  useTagGroupStyles_unstable(state);
  const styles = useStyles();
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = mergeClasses(
    tagPickerGroupClassNames.root,
    styles[tagSizeToTagPickerSize(state.size)],
    styles.root,
    state.root.className,
  );

  return state;
};
