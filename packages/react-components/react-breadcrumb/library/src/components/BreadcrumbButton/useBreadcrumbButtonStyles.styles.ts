import { makeStyles, mergeClasses } from '@griffel/react';
import type { BreadcrumbButtonSlots, BreadcrumbButtonState } from './BreadcrumbButton.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useButtonStyles_unstable, buttonClassNames } from '@fluentui/react-button';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';

/**
 * Static CSS class names used internally for the component slots.
 */
export const breadcrumbButtonClassNames: SlotClassNames<BreadcrumbButtonSlots> = {
  root: 'fui-BreadcrumbButton',
  icon: 'fui-BreadcrumbButton__icon',
};

/**
 * CSS variable names used internally for styling in the Breadcrumb.
 */
const breadcrumbCSSVars = {
  breadcrumbIconSizeVar: '--fui-Breadcrumb--icon-size',
  breadcrumbIconLineHeightVar: '--fui-Breadcrumb--icon-line-height',
};

const useIconStyles = makeStyles({
  base: {
    fontSize: `var(${breadcrumbCSSVars.breadcrumbIconSizeVar})`,
    height: `var(${breadcrumbCSSVars.breadcrumbIconSizeVar})`,
    lineHeight: `var(${breadcrumbCSSVars.breadcrumbIconLineHeightVar})`,
    width: `var(${breadcrumbCSSVars.breadcrumbIconSizeVar})`,
    marginRight: `var(--473, var(--474, ${tokens.spacingHorizontalXS}))`,
  },
  small: {
    [breadcrumbCSSVars.breadcrumbIconSizeVar]: '12px',
    [breadcrumbCSSVars.breadcrumbIconLineHeightVar]: `var(--475, var(--476, ${tokens.lineHeightBase200}))`,
  },
  medium: {
    [breadcrumbCSSVars.breadcrumbIconSizeVar]: '16px',
    [breadcrumbCSSVars.breadcrumbIconLineHeightVar]: `var(--477, var(--478, ${tokens.lineHeightBase400}))`,
  },
  large: {
    [breadcrumbCSSVars.breadcrumbIconSizeVar]: '20px',
    [breadcrumbCSSVars.breadcrumbIconLineHeightVar]: `var(--479, var(--480, ${tokens.lineHeightBase600}))`,
  },
});

const defaultButtonStyles = {
  backgroundColor: `var(--481, var(--482, ${tokens.colorTransparentBackground}))`,
  color: `var(--483, var(--484, ${tokens.colorNeutralForeground2}))`,
  cursor: 'auto',
};

const currentIconStyles = {
  ...defaultButtonStyles,
  [`& .${buttonClassNames.icon}`]: {
    color: 'unset',
  },
  [`& .${iconFilledClassName}`]: {
    display: 'none',
  },
  [`& .${iconRegularClassName}`]: {
    display: 'inline',
  },
};

const useStyles = makeStyles({
  root: {
    minWidth: 'unset',
    textWrap: 'nowrap',
  },
  small: {
    height: '24px',
    ...typographyStyles.caption1,
    padding: `var(--485, var(--486, ${tokens.spacingHorizontalSNudge}))`,
  },
  medium: {
    height: '32px',
    ...typographyStyles.body1,
    padding: `var(--487, var(--488, ${tokens.spacingHorizontalSNudge}))`,
  },
  large: {
    height: '40px',
    ...typographyStyles.body2,
    padding: `var(--489, var(--490, ${tokens.spacingHorizontalS}))`,
  },
  current: {
    ':hover': {
      ...currentIconStyles,
    },
    ':hover:active': {
      ...currentIconStyles,
    },
    ':disabled': {
      ...currentIconStyles,
    },
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
});

/**
 * Apply styling to the BreadcrumbButton slots based on the state
 */
export const useBreadcrumbButtonStyles_unstable = (state: BreadcrumbButtonState): BreadcrumbButtonState => {
  'use no memo';

  const styles = useStyles();
  const iconStyles = useIconStyles();

  const currentSizeMap = {
    small: styles.currentSmall,
    medium: styles.currentMedium,
    large: styles.currentLarge,
  };
  state.root.className = mergeClasses(
    breadcrumbButtonClassNames.root,
    styles[state.size],
    styles.root,
    state.current && currentSizeMap[state.size],
    state.current && styles.current,
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(iconStyles.base, iconStyles[state.size], state.icon.className);
  }

  useButtonStyles_unstable(state);

  return state;
};
