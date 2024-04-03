import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavItemSlots, NavItemState } from './NavItem.types';
import { tokens, typographyStyles } from '@fluentui/react-theme';

export const navItemClassNames: SlotClassNames<NavItemSlots> = {
  root: 'fui-NavItem',
  content: 'fui-NavItem__content',
  selectedIcon: 'fui-NavItem__selectedIcon',
  unSelectedIcon: 'fui-NavItem__unSelectedIcon',
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
  textDecorationLine: 'none',
  ...typographyStyles.body1,
  ':hover': {
    backgroundColor: tokens.colorNeutralBackground4Hover,
  },
  ':active': {
    backgroundColor: tokens.colorNeutralBackground4Pressed,
  },
});

/**
 * Styles for the content slot (children)
 */
const useContentStyles = makeStyles({
  selected: typographyStyles.body1Strong,
});

const useIndicatorStyles = makeStyles({
  base: {
    '::after': {
      position: 'absolute',
      transform: 'translateX(-18px)', // per spec
      backgroundColor: tokens.colorNeutralForeground2BrandSelected,
      width: '4px', // No relevant to any design token for these
      height: '20px',
      ...shorthands.borderRadius(tokens.borderRadiusCircular),
      content: '""',
    },
  },
});

const useSelectedIconStyles = makeStyles({
  base: {
    color: tokens.colorNeutralForeground2BrandSelected,
  },
});

/**
 * Apply styling to the NavItem slots based on the state
 */
export const useNavItemStyles_unstable = (state: NavItemState): NavItemState => {
  const rootDefaultStyles = useRootDefaultStyles();
  const contentStyles = useContentStyles();
  const indicatorStyles = useIndicatorStyles();
  const selectedIconStyles = useSelectedIconStyles();

  const { selected } = state;

  state.root.className = mergeClasses(
    navItemClassNames.root,
    rootDefaultStyles,
    state.root.className,
    selected && indicatorStyles.base,
  );

  state.content.className = mergeClasses(
    navItemClassNames.content,
    selected && contentStyles.selected,
    state.content.className,
  );

  // Only shows in the selected state
  if (state.selectedIcon) {
    state.selectedIcon.className = mergeClasses(
      navItemClassNames.selectedIcon,
      state.selectedIcon.className,
      selectedIconStyles.base,
    );
  }

  // Only shows in the selected state
  if (state.unSelectedIcon) {
    state.unSelectedIcon.className = mergeClasses(navItemClassNames.unSelectedIcon, state.unSelectedIcon.className);
  }

  return state;
};
