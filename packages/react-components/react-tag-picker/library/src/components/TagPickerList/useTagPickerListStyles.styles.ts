import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TagPickerListSlots, TagPickerListState } from './TagPickerList.types';

export const tagPickerListClassNames: SlotClassNames<TagPickerListSlots> = {
  root: 'fui-TagPickerList',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    boxShadow: `${tokens.shadow16}`,
    borderRadius: tokens.borderRadiusMedium,
    maxHeight: '80vh',
    boxSizing: 'border-box',
  },

  collapsed: {
    display: 'none',
  },
});

/**
 * Apply styling to the TagPickerList slots based on the state
 */
export const useTagPickerListStyles_unstable = (state: TagPickerListState): TagPickerListState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(
    tagPickerListClassNames.root,
    styles.root,
    !state.open && styles.collapsed,
    state.root.className,
  );
  return state;
};
