import { makeStyles, mergeClasses } from '@griffel/react';
import type { TagGroupSlots, TagGroupState } from './TagGroup.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';

export const tagGroupClassNames: SlotClassNames<TagGroupSlots> = {
  root: 'fui-TagGroup',
};

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  base: {
    display: 'inline-flex',
  },
  medium: {
    columnGap: tokens.spacingHorizontalS,
  },
  small: {
    columnGap: tokens.spacingHorizontalSNudge,
  },
  'extra-small': {
    columnGap: tokens.spacingHorizontalXS,
  },
});

/**
 * Apply styling to the TagGroup slots based on the state
 */
export const useTagGroupStyles_unstable = (state: TagGroupState): TagGroupState => {
  'use no memo';

  const styles = useRootStyles();
  const { size } = state;
  state.root.className = mergeClasses(tagGroupClassNames.root, styles.base, styles[size], state.root.className);

  return state;
};
