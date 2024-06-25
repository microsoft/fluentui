import { makeStyles, mergeClasses } from '@griffel/react';
import { SlotClassNames } from '@fluentui/react-utilities';
import { typographyStyles } from '@fluentui/react-theme';
import {
  useContentStyles,
  useIconStyles,
  useIndicatorStyles,
  useRootDefaultClassName,
  useSmallStyles,
} from '../sharedNavStyles.styles';

import type { NavCategoryItemSlots, NavCategoryItemState } from './NavCategoryItem.types';

export const navCategoryItemClassNames: SlotClassNames<NavCategoryItemSlots> = {
  root: 'fui-NavCategoryItem',
  icon: 'fui-NavCategoryItem__icon',
  expandIcon: 'fui-NavCategoryItem__expandIcon',
};

const useExpandIconStyles = makeStyles({
  base: {
    marginInlineStart: 'auto',
    height: '20px',
  },
  open: {
    transform: 'rotate(90deg)',
  },
  selected: typographyStyles.body1Strong,
});

/**
 * Styles for the root slot
 */
export const useRootStyles = makeStyles({
  base: {
    width: '100%',
  },
});

/**
 * Apply styling to the NavCategoryItem slots based on the state
 */
export const useNavCategoryItemStyles_unstable = (state: NavCategoryItemState): NavCategoryItemState => {
  'use no memo';

  const rootStyles = useRootStyles();
  const smallStyles = useSmallStyles();
  const defaultRootClassName = useRootDefaultClassName();
  const contentStyles = useContentStyles();
  const indicatorStyles = useIndicatorStyles();
  const iconStyles = useIconStyles();
  const expandIconStyles = useExpandIconStyles();

  const { selected, open, size } = state;

  state.root.className = mergeClasses(
    navCategoryItemClassNames.root,
    defaultRootClassName,
    rootStyles.base,
    size === 'small' && smallStyles.root,
    selected && open === false && indicatorStyles.base,
    selected && open === false && contentStyles.selected,
    state.root.className,
  );

  state.expandIcon.className = mergeClasses(
    navCategoryItemClassNames.expandIcon,
    expandIconStyles.base,
    state.open && expandIconStyles.open,
    state.expandIcon.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      navCategoryItemClassNames.icon,
      iconStyles.base,
      selected && iconStyles.selected,
      state.icon.className,
    );
  }

  return state;
};
