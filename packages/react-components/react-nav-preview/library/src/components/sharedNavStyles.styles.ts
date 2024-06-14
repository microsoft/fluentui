import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { makeResetStyles, makeStyles } from '@griffel/react';

// Styles shared by several nav components.

export const navItemTokens = {
  indicatorOffset: 16,
  indicatorWidth: 4,
  indicatorHeight: 20,
  backgroundColor: tokens.colorNeutralBackground4,
  backgroundColorHover: tokens.colorNeutralBackground4Hover,
  backgroundColorPressed: tokens.colorNeutralBackground4Pressed,
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
  padding: `${tokens.spacingVerticalMNudge} ${tokens.spacingHorizontalS} ${tokens.spacingVerticalMNudge} ${tokens.spacingHorizontalMNudge}`,
  backgroundColor: navItemTokens.backgroundColor,
  borderRadius: tokens.borderRadiusMedium,
  color: tokens.colorNeutralForeground2,
  textDecorationLine: 'none',
  border: 'none',
  // this element can change between a button and an anchor
  // so we need to reset box sizing to prevent horizontal overflow
  boxSizing: 'border-box',
  width: '100%',
  ...typographyStyles.body1,
  ':hover': {
    backgroundColor: navItemTokens.backgroundColorHover,
  },
  ':active': {
    backgroundColor: navItemTokens.backgroundColorPressed,
  },
});

export const useSmallStyles = makeStyles({
  root: {
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalS} ${tokens.spacingVerticalXS} ${tokens.spacingHorizontalMNudge}`,
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
      backgroundColor: tokens.colorCompoundBrandForeground1,
      height: `${navItemTokens.indicatorHeight}px`,
      width: `${navItemTokens.indicatorWidth}px`,
      borderRadius: tokens.borderRadiusCircular,
      content: '""',
    },
    '@media (forced-colors: active)': {
      '::after': {
        backgroundColor: 'ButtonText',
      },
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
    overflow: 'hidden',
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
      color: tokens.colorCompoundBrandForeground1,
    },
    [`& .${iconRegularClassName}`]: {
      display: 'none',
    },
  },
});
