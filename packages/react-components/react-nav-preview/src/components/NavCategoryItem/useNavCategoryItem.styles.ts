import type { NavCategoryItemSlots, NavCategoryItemState } from './NavCategoryItem.types';

import { makeResetStyles, mergeClasses } from '@griffel/react';
import { typographyStyles } from '@fluentui/react-theme';
import { SlotClassNames } from '@fluentui/react-utilities';

export const navCategoryItemClassNames: SlotClassNames<NavCategoryItemSlots> = {
  root: 'fui-NavCategoryItem',
};

/**
 * Styles for the root slot
 */
const useStyles = makeResetStyles({
  display: 'flex',
  ...typographyStyles.body1,
});

/**
 * Apply styling to the NavCategoryItem slots based on the state
 */
export const useNavCategoryItemStyles_unstable = (state: NavCategoryItemState): NavCategoryItemState => {
  const rootStyles = useStyles();

  state.root.className = mergeClasses(
    navCategoryItemClassNames.root,
    rootStyles,

    state.root.className,
  );

  return state;
};
