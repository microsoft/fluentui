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
const useStyles = makeStyles({
  root: {
    display: 'inline-flex',
    columnGap: tokens.spacingHorizontalS,
  },
  rootSmall: {
    columnGap: tokens.spacingHorizontalSNudge,
  },
});

/**
 * Apply styling to the TagGroup slots based on the state
 */
export const useTagGroupStyles_unstable = (state: TagGroupState): TagGroupState => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    tagGroupClassNames.root,
    styles.root,
    state.size === 'small' && styles.rootSmall,
    state.root.className,
  );

  return state;
};
