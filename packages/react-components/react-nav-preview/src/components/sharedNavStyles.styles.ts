import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { makeResetStyles, makeStyles, shorthands } from '@griffel/react';

// Styles shared by several nav components.

export const navItemTokens = {
  indicatorOffset: 18,
  indicatorWidth: 4,
  indicatorHeight: 20,
};

/**
 * Styles for the root slot
 * Shared across NavItem, NavCategoryItem, and NavSubItem
 */
export const useRootDefaultClassName = makeResetStyles({
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
  border: 'none',
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
 * Shared across NavItem, NavCategoryItem, and NavSubItem
 */
export const useContentStyles = makeStyles({
  selected: typographyStyles.body1Strong,
});

/**
 * French fry styles
 * Shared across NavItem, NavCategoryItem, and NavSubItem
 */
export const useIndicatorStyles = makeStyles({
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

/**
 * Styles for the icon slot
 * Shared across NavItem, NavCategoryItem, and NavSubItem
 */
export const useIconStyles = makeStyles({
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
