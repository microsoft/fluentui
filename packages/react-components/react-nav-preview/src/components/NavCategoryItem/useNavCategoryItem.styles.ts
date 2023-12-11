import type { NavCategoryItemSlots, NavCategoryItemState } from './NavCategoryItem.types';

import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { typographyStyles } from '@fluentui/react-theme';
import { SlotClassNames } from '@fluentui/react-utilities';

export const navCategoryItemClassNames: SlotClassNames<NavCategoryItemSlots> = {
  root: 'fui-NavCategoryItem',
  content: 'fui-NavCategoryItem__content',
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
 * Apply styling to the NavCategoryItem slots based on the state
 */
export const useNavCategoryItemStyles_unstable = (state: NavCategoryItemState): NavCategoryItemState => {
  const rootStyles = useStyles();
  const contentStyles = useContentStyles();

  const { selected } = state;

  state.root.className = mergeClasses(
    navCategoryItemClassNames.root,
    rootStyles,

    state.root.className,
  );

  state.content.className = mergeClasses(
    navCategoryItemClassNames.content,
    selected && contentStyles.selected,
    state.content.className,
  );

  return state;
};
