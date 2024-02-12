import type { NavCategoryItemSlots, NavCategoryItemState } from './NavCategoryItem.types';

import { makeResetStyles, mergeClasses, makeStyles } from '@griffel/react';
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
  display: 'flex',
  ...typographyStyles.body1,
});

const useExpandIconStyles = makeStyles({
  icon: {
    display: 'flex',
  },
  open: {
    transform: 'rotate(-90deg)',
  },
  closed: {
    transform: 'rotate(90deg)',
  },
});

/**
 * Apply styling to the NavCategoryItem slots based on the state
 */
export const useNavCategoryItemStyles_unstable = (state: NavCategoryItemState): NavCategoryItemState => {
  const defaultRootStyles = useRootStyles();
  const expandIconStyles = useExpandIconStyles();

  state.root.className = mergeClasses(navCategoryItemClassNames.root, defaultRootStyles, state.root.className);

  state.expandIcon.className = mergeClasses(
    navCategoryItemClassNames.expandIcon,
    expandIconStyles.icon,
    state.open ? expandIconStyles.open : expandIconStyles.closed,
    state.expandIcon.className,
  );

  return state;
};
