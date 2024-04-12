import { makeStyles, mergeClasses } from '@griffel/react';
import { SlotClassNames } from '@fluentui/react-utilities';
import { typographyStyles } from '@fluentui/react-theme';

import type { NavCategoryItemSlots, NavCategoryItemState } from './NavCategoryItem.types';
import {
  useContentStyles,
  useIconStyles,
  useIndicatorStyles,
  useRootDefaultClassName,
} from '../sharedNavStyles.styles';

export const navCategoryItemClassNames: SlotClassNames<NavCategoryItemSlots> = {
  root: 'fui-NavCategoryItem',
  icon: 'fui-NavCategoryItem__icon',
  expandIcon: 'fui-NavCategoryItem__expandIcon',
};

const useExpandIconStyles = makeStyles({
  base: {
    marginInlineStart: 'auto',
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
  const rootStyles = useRootStyles();
  const defaultRootClassName = useRootDefaultClassName();
  const contentStyles = useContentStyles();
  const indicatorStyles = useIndicatorStyles();
  const iconStyles = useIconStyles();
  const expandIconStyles = useExpandIconStyles();

  const { selected, open } = state;

  state.root.className = mergeClasses(
    navCategoryItemClassNames.root,
    defaultRootClassName,
    rootStyles.base,
    state.root.className,
    selected && open === false && indicatorStyles.base,
    selected && open === false && contentStyles.selected,
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
