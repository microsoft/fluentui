import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavItemSlots, NavItemState } from './NavItem.types';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';

export const navItemClassNames: SlotClassNames<NavItemSlots> = {
  root: 'fui-NavItem',
  content: 'fui-NavItem__content',
  icon: 'fui-NavItem__icon',
};

const navItemTokens = {
  indicatorOffset: 18,
  indicatorWidth: 4,
  indicatorHeight: 20,
};

/**
 * Styles for the root slot
 */
const useRootDefaultClassName = makeResetStyles({
  display: 'flex',
  textTransform: 'none',
  position: 'relative',
  justifyContent: 'start',
  gap: tokens.spacingVerticalL,
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
      marginInlineStart: `-${navItemTokens.indicatorOffset}px`,
      backgroundColor: tokens.colorNeutralForeground2BrandSelected,
      height: `${navItemTokens.indicatorHeight}px`,
      width: `${navItemTokens.indicatorWidth}px`,
      ...shorthands.borderRadius(tokens.borderRadiusCircular),
      content: '""',
    },
  },
});

const useIconStyles = makeStyles({
  base: {
    minHeight: '20px',
    minWidth: '20px',
    alignItems: 'top',
    display: 'inline-flex',
    justifyContent: 'center',
    ...shorthands.overflow('hidden'),
    [`& .${iconFilledClassName}`]: {
      display: 'none',
    },
    [`& .${iconRegularClassName}`]: {
      display: 'inline',
    },
  },
  selected: {
    [`& .${iconFilledClassName}`]: {
      display: 'inline',
      color: tokens.colorNeutralForeground2BrandSelected,
    },
    [`& .${iconRegularClassName}`]: {
      display: 'none',
    },
  },
});

/**
 * Apply styling to the NavItem slots based on the state
 */
export const useNavItemStyles_unstable = (state: NavItemState): NavItemState => {
  const rootDefaultClassName = useRootDefaultClassName();
  const contentStyles = useContentStyles();
  const indicatorStyles = useIndicatorStyles();
  const iconStyles = useIconStyles();

  const { selected } = state;

  state.root.className = mergeClasses(
    navItemClassNames.root,
    rootDefaultClassName,
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
