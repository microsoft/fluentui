import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavItemSlots, NavItemState } from './NavItem.types';
import { tokens, typographyStyles } from '@fluentui/react-theme';

export const navItemClassNames: SlotClassNames<NavItemSlots> = {
  root: 'fui-NavItem',
  content: 'fui-NavItem__content',
  icon: 'fui-NavItem__icon',
};

// These should match the constants defined in @fluentui/react-icons
// This package avoids taking a dependency on the icons package for only the constants.
const iconClassNames = {
  filled: 'fui-Icon-filled',
  regular: 'fui-Icon-regular',
};

const navItemTokens = { indicatorWidth: '4px', indicatorOffset: '-18px', indicatorHeight: '20px' };

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
      transform: `translateX(${navItemTokens.indicatorOffset})`, // per spec
      backgroundColor: tokens.colorNeutralForeground2BrandSelected,
      width: navItemTokens.indicatorWidth,
      height: navItemTokens.indicatorHeight,
      ...shorthands.borderRadius(tokens.borderRadiusCircular),
      content: '""',
    },
  },
});

const useIconStyles = makeStyles({
  base: {
    height: navItemTokens.indicatorHeight,
    [`& .${iconClassNames.filled}`]: {
      display: 'none',
    },
    [`& .${iconClassNames.regular}`]: {
      display: 'inline',
    },
  },
  selected: {
    [`& .${iconClassNames.filled}`]: {
      display: 'inline',
      color: tokens.colorNeutralForeground2BrandSelected,
    },
    [`& .${iconClassNames.regular}`]: {
      display: 'none',
    },
  },
});

/**
 * Apply styling to the NavItem slots based on the state
 */
export const useNavItemStyles_unstable = (state: NavItemState): NavItemState => {
  const rootDefaultStyles = useRootDefaultStyles();
  const contentStyles = useContentStyles();
  const indicatorStyles = useIndicatorStyles();
  const iconStyles = useIconStyles();

  const { selected } = state;

  state.root.className = mergeClasses(
    navItemClassNames.root,
    rootDefaultStyles,
    selected && indicatorStyles.base,
    state.root.className,
  );

  state.content.className = mergeClasses(
    navItemClassNames.content,
    selected && contentStyles.selected,
    state.content.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      navItemClassNames.icon,
      iconStyles.base,
      selected && iconStyles.selected,
      state.icon.className,
    );
  }

  return state;
};
