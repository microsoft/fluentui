import { makeResetStyles, mergeClasses, makeStyles } from '@griffel/react';
import { typographyStyles } from '@fluentui/react-theme';
import { SlotClassNames } from '@fluentui/react-utilities';

import type { NavCategoryItemSlots, NavCategoryItemState } from './NavCategoryItem.types';

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

const useContentStyles = makeStyles({
  icon: {
    display: 'flex',
  },
  open: {
    transform: 'rotate(-90deg)',
  },
  closed: {
    transform: 'rotate(90deg)',
  },
  selected: {
    ...typographyStyles.body1Strong,
  },
});

/**
 * Apply styling to the NavCategoryItem slots based on the state
 */
export const useNavCategoryItemStyles_unstable = (state: NavCategoryItemState): NavCategoryItemState => {
  const defaultRootStyles = useRootStyles();
  const contentStyles = useContentStyles();

  const { selected } = state;

  state.root.className = mergeClasses(
    navCategoryItemClassNames.root,
    defaultRootStyles,
    state.root.className,
    selected && state.open === false && contentStyles.selected,
  );

  state.expandIcon.className = mergeClasses(
    navCategoryItemClassNames.expandIcon,
    contentStyles.icon,
    state.open ? contentStyles.open : contentStyles.closed,
    state.expandIcon.className,
  );

  return state;
};
