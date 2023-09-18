import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { BreadcrumbItemSlots, BreadcrumbItemState } from './BreadcrumbItem.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens, typographyStyles } from '@fluentui/react-theme';

export const breadcrumbItemClassNames: SlotClassNames<BreadcrumbItemSlots> = {
  root: 'fui-BreadcrumbItem',
  icon: 'fui-BreadcrumbItem__icon',
};

/**
 * CSS variable names used internally for styling in the Breadcrumb.
 */
export const breadcrumbCSSVars = {
  breadcrumbIconSizeVar: '--fui-Breadcrumb--icon-size',
  breadcrumbIconLineHeightVar: '--fui-Breadcrumb--icon-line-height',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    color: tokens.colorNeutralForeground2,
    boxSizing: 'border-box',
    textWrap: 'nowrap',
  },
  icon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: tokens.spacingHorizontalXS,
  },
  small: {
    height: '24px',
    ...shorthands.padding(tokens.spacingHorizontalSNudge),
    ...typographyStyles.caption1,
  },
  medium: {
    height: '32px',
    ...shorthands.padding(tokens.spacingHorizontalSNudge),
    ...typographyStyles.body1,
  },
  large: {
    height: '40px',
    ...shorthands.padding(tokens.spacingHorizontalS),
    ...typographyStyles.body2,
  },
  currentSmall: {
    ...typographyStyles.caption1Strong,
  },
  currentMedium: {
    ...typographyStyles.body1Strong,
  },
  currentLarge: {
    ...typographyStyles.subtitle2,
  },
  noSpacing: {
    ...shorthands.padding(0),
  },
});

const useIconStyles = makeStyles({
  base: {
    fontSize: `var(${breadcrumbCSSVars.breadcrumbIconSizeVar})`,
    height: `var(${breadcrumbCSSVars.breadcrumbIconSizeVar})`,
    lineHeight: `var(${breadcrumbCSSVars.breadcrumbIconLineHeightVar})`,
    width: `var(${breadcrumbCSSVars.breadcrumbIconSizeVar})`,
    marginRight: tokens.spacingHorizontalXS,
  },
  small: {
    [breadcrumbCSSVars.breadcrumbIconSizeVar]: '12px',
    [breadcrumbCSSVars.breadcrumbIconLineHeightVar]: tokens.lineHeightBase200,
  },
  medium: {
    [breadcrumbCSSVars.breadcrumbIconSizeVar]: '16px',
    [breadcrumbCSSVars.breadcrumbIconLineHeightVar]: tokens.lineHeightBase400,
  },
  large: {
    [breadcrumbCSSVars.breadcrumbIconSizeVar]: '20px',
    [breadcrumbCSSVars.breadcrumbIconLineHeightVar]: tokens.lineHeightBase600,
  },
});

/**
 * Apply styling to the BreadcrumbItem slots based on the state
 */
export const useBreadcrumbItemStyles_unstable = (state: BreadcrumbItemState): BreadcrumbItemState => {
  const styles = useStyles();
  const iconStyles = useIconStyles();
  const size = state.size || 'medium';
  const currentSizeMap = {
    small: styles.currentSmall,
    medium: styles.currentMedium,
    large: styles.currentLarge,
  };
  const noSpacingStyle =
    state.isInteractive || (!state.isInteractive && state.size === 'small') ? styles.noSpacing : '';

  state.root.className = mergeClasses(
    breadcrumbItemClassNames.root,
    styles.root,
    styles[size],
    state.current && currentSizeMap[size],
    noSpacingStyle,
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(iconStyles[state.size], styles.icon, state.icon.className);
  }

  return state;
};
