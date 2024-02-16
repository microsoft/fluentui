import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { typographyStyles } from '@fluentui/react-theme';

import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavSubItemSlots, NavSubItemState } from './NavSubItem.types';

export const navSubItemClassNames: SlotClassNames<NavSubItemSlots> = {
  root: 'fui-NavSubItem',
  content: 'fui-NavSubItem__content',
};

/**
 * Styles for the root slot
 */
const useStyles = makeResetStyles({
  display: 'flex',
  ...typographyStyles.body1,
});

/**
 * Styles for the content slot (children)
 */
const useContentStyles = makeStyles({
  selected: {
    ...typographyStyles.body1Strong,
  },
});

/**
 * Apply styling to the NavSubItem slots based on the state
 */
export const useNavSubItemStyles_unstable = (state: NavSubItemState): NavSubItemState => {
  const rootStyles = useStyles();
  const contentStyles = useContentStyles();

  const { selected } = state;

  state.root.className = mergeClasses(
    navSubItemClassNames.root,
    rootStyles,

    state.root.className,
  );

  state.content.className = mergeClasses(
    navSubItemClassNames.content,
    selected && contentStyles.selected,
    state.content.className,
  );

  return state;
};
