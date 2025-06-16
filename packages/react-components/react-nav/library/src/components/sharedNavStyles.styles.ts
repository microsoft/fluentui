import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { makeResetStyles, makeStyles } from '@griffel/react';

// Styles shared by several nav components.

export const navItemTokens = {
  defaultDrawerWidth: 260,
  indicatorOffset: 16,
  indicatorWidth: 4,
  indicatorHeight: 20,
  backgroundColor: tokens.colorNeutralBackground4,
  backgroundColorHover: tokens.colorNeutralBackground4Hover,
  backgroundColorPressed: tokens.colorNeutralBackground4Pressed,
  animationTokens: {
    animationDuration: tokens.durationFaster,
    animationFillMode: 'both',
    animationTimingFunction: tokens.curveLinear,
  },
  transitionTokens: {
    transitionDuration: tokens.durationFaster,
    transitionTimingFunction: tokens.curveLinear,
    transitionProperty: 'background',
  },
};

/**
 * Styles for the root slot
 * Shared across NavItem, NavCategoryItem, NavSubItem, and AppItem
 */
export const useRootDefaultClassName = makeResetStyles({
  display: 'flex',
  textTransform: 'none',
  position: 'relative',
  justifyContent: 'start',
  alignItems: 'flex-start',
  textAlign: 'left',
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
  cursor: 'pointer',

  transitionDuration: navItemTokens.animationTokens.animationDuration,
  transitionTimingFunction: navItemTokens.animationTokens.animationTimingFunction,
  transitionProperty: 'background',

  width: '100%',
  ...typographyStyles.body1,
  ':hover': {
    backgroundColor: navItemTokens.backgroundColorHover,
  },

  // Use custom insert focus indicator
  '&:focus-visible': {
    outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
    outlineOffset: `calc(${tokens.strokeWidthThick} * -1)`,
  },
});

export const useSmallStyles = makeStyles({
  root: {
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalS} ${tokens.spacingVerticalXS} ${tokens.spacingHorizontalMNudge}`,
  },
});

/**
 * Styles for the content slot (children)
 * Shared across NavItem, NavCategoryItem, NavSubItem, and AppItem
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
        outline: `solid 2px ${tokens.colorTransparentStroke}`,
        outlineOffset: '-2px',
      },
    },
  },
});

/**
 * Styles for the icon slot
 * Shared across NavItem, NavCategoryItem, and NavSubItem
 * We use the grid trick to stack the filled and regular icons on top of each other
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
          opacity: 0,
          color: 'transparent',
        },
        '100%': {
          opacity: 1,
          color: tokens.colorNeutralForeground2BrandSelected,
        },
      },
    },
    [`& .${iconRegularClassName}`]: {
      ...navItemTokens.animationTokens,
      animationName: {
        '0%': {
          opacity: 1,
          color: tokens.colorNeutralForeground2,
        },
        '100%': {
          opacity: 0,
          color: 'transparent',
        },
      },
    },
  },
});
