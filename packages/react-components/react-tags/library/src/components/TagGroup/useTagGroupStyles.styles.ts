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
    columnGap: `var(--2521, var(--2522, ${tokens.spacingHorizontalS}))`,
  },
  small: {
    columnGap: `var(--2523, var(--2524, ${tokens.spacingHorizontalSNudge}))`,
  },
  'extra-small': {
    columnGap: `var(--2525, var(--2526, ${tokens.spacingHorizontalXS}))`,
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
