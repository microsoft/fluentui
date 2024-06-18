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
  animationTokens: {
    animationDuration: tokens.durationFast,
    animationFillMode: 'both',
    animationTimingFunction: tokens.curveAccelerateMid,
  },
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

  transitionDuration: navItemTokens.animationTokens.animationDuration,
  transitionTimingFunction: navItemTokens.animationTokens.animationTimingFunction,
  transitionProperty: 'background',

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
      ...navItemTokens.animationTokens,
      animationName: {
        '0%': { background: 'transparent' },
        '100%': { background: tokens.colorCompoundBrandForeground1 },
      },

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
    display: 'grid',
    gridTemplateAreas: 'overlay-area',
    minHeight: '20px',
    minWidth: '20px',
    alignItems: 'top',
    justifyContent: 'center',
    overflow: 'hidden',
    [`& .${iconFilledClassName}`]: {
      gridArea: 'overlay-area',
      color: 'transparent',
      display: 'none',
    },
    [`& .${iconRegularClassName}`]: {
      gridArea: 'overlay-area',
      display: 'inline',
    },
  },
  selected: {
    [`& .${iconFilledClassName}`]: {
      ...navItemTokens.animationTokens,
      display: 'inline',
      animationName: {
        '0%': {
          display: 'none',
          color: 'transparent',
        },
        '100%': {
          display: 'inline',
          color: tokens.colorNeutralForeground2BrandSelected,
        },
      },
    },
    [`& .${iconRegularClassName}`]: {
      ...navItemTokens.animationTokens,
      animationName: {
        '0%': {
          display: 'inline',
          color: tokens.colorNeutralForeground2,
        },
        '100%': {
          display: 'none',
          color: 'transparent',
        },
      },
    },
  },
});
