import { makeResetStyles, mergeClasses, makeStyles, shorthands } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { SlotClassNames } from '@fluentui/react-utilities';

import type { NavCategoryItemSlots, NavCategoryItemState } from './NavCategoryItem.types';

export const navCategoryItemClassNames: SlotClassNames<NavCategoryItemSlots> = {
  root: 'fui-NavCategoryItem',
  expandIcon: 'fui-NavCategoryItem__expandIcon',
  selectedIcon: 'fui-NavCategoryItem__selectedIcon',
  unSelectedIcon: 'fui-NavCategoryItem__unSelectedIcon',
};

/**
 * Styles for the root slot
 */
const useRootDefaultStyles = makeResetStyles({
  display: 'flex',
  gap: tokens.spacingHorizontalL,
  padding: tokens.spacingVerticalMNudge,
  backgroundColor: tokens.colorNeutralBackground4,
  borderRadius: tokens.borderRadiusMedium,
  color: tokens.colorNeutralForeground2,
  border: 'none',
  textDecorationLine: 'none',
  ...typographyStyles.body1,
  ':hover': {
    backgroundColor: tokens.colorNeutralBackground4Hover,
  },
  ':active': {
    backgroundColor: tokens.colorNeutralBackground4Pressed,
  },
});

const useContentStyles = makeStyles({
  icon: {
    display: 'flex',
  },

  selected: typographyStyles.body1Strong,
});

const indicatorHeight = '20px';

const useExpandIconStyles = makeStyles({
  open: {
    transform: 'rotate(90deg)',
  },
});

const useIndicatorStyles = makeStyles({
  base: {
    '::after': {
      position: 'absolute',
      transform: 'translateX(-18px)', // per spec
      backgroundColor: tokens.colorNeutralForeground2BrandSelected,
      width: '4px', // No relevant to any design token for these
      height: indicatorHeight,
      ...shorthands.borderRadius(tokens.borderRadiusCircular),
      content: '""',
    },
  },
});

const useSelectedIconStyles = makeStyles({
  base: {
    color: tokens.colorNeutralForeground2BrandSelected,
    height: indicatorHeight,
  },
});

/**
 * Apply styling to the NavCategoryItem slots based on the state
 */
export const useNavCategoryItemStyles_unstable = (state: NavCategoryItemState): NavCategoryItemState => {
  const rootDefaultStyles = useRootDefaultStyles();
  const contentStyles = useContentStyles();
  const indicatorStyles = useIndicatorStyles();
  const expandIconStyles = useExpandIconStyles();
  const selectedIconStyles = useSelectedIconStyles();

  const { selected } = state;

  state.root.className = mergeClasses(
    navCategoryItemClassNames.root,
    rootDefaultStyles,
    selected && state.open === false && indicatorStyles.base,
    selected && state.open === false && contentStyles.selected,
    state.root.className,
  );

  state.expandIcon.className = mergeClasses(
    navCategoryItemClassNames.expandIcon,
    contentStyles.icon,
    state.open && expandIconStyles.open,
    state.expandIcon.className,
  );

  // Only shows in the selected state
  if (state.selectedIcon) {
    state.selectedIcon.className = mergeClasses(
      navCategoryItemClassNames.selectedIcon,
      selectedIconStyles.base,
      state.selectedIcon.className,
    );
  }

  // Only shows in the selected state
  if (state.unSelectedIcon) {
    state.unSelectedIcon.className = mergeClasses(
      navCategoryItemClassNames.unSelectedIcon,
      state.unSelectedIcon.className,
    );
  }

  return state;
};
