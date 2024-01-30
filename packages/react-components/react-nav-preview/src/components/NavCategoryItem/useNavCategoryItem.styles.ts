import type { NavCategoryItemSlots, NavCategoryItemState } from './NavCategoryItem.types';

import { makeResetStyles, mergeClasses } from '@griffel/react';
import { typographyStyles } from '@fluentui/react-theme';
import { SlotClassNames } from '@fluentui/react-utilities';

export const navCategoryItemClassNames: SlotClassNames<NavCategoryItemSlots> = {
  root: 'fui-NavCategoryItem',
  expandIcon: 'fui-NavCategoryItem__expandIcon',
};

/**
 * Styles for the root slot
 */
const useRootStyles = makeResetStyles({
  root: {
    display: 'flex',
    ...typographyStyles.body1,
  },
});

const useExpandIconStyles = makeResetStyles({
  //todo: add styles for expand icon
  expandIcon: {
    display: 'flex',
  },
});

/**
 * Apply styling to the NavCategoryItem slots based on the state
 */
export const useNavCategoryItemStyles_unstable = (state: NavCategoryItemState): NavCategoryItemState => {
  const defaultRootStyles = useRootStyles();
  const defaultExpandIconStyles = useExpandIconStyles();

  state.root.className = mergeClasses(navCategoryItemClassNames.root, defaultRootStyles, state.root.className);

  state.expandIcon.className = mergeClasses(
    navCategoryItemClassNames.expandIcon,
    defaultExpandIconStyles,
    state.expandIcon.className,
  );

  return state;
};
