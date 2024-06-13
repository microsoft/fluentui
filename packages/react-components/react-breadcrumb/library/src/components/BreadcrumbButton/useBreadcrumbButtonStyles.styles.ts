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
    marginRight: `var(--ctrl-token-BreadcrumbButton-473, var(--semantic-token-BreadcrumbButton-474, ${tokens.spacingHorizontalXS}))`,
  },
  small: {
    [breadcrumbCSSVars.breadcrumbIconSizeVar]: '12px',
    [breadcrumbCSSVars.breadcrumbIconLineHeightVar]: `var(--ctrl-token-BreadcrumbButton-475, var(--semantic-token-BreadcrumbButton-476, ${tokens.lineHeightBase200}))`,
  },
  medium: {
    [breadcrumbCSSVars.breadcrumbIconSizeVar]: '16px',
    [breadcrumbCSSVars.breadcrumbIconLineHeightVar]: `var(--ctrl-token-BreadcrumbButton-477, var(--semantic-token-BreadcrumbButton-478, ${tokens.lineHeightBase400}))`,
  },
  large: {
    [breadcrumbCSSVars.breadcrumbIconSizeVar]: '20px',
    [breadcrumbCSSVars.breadcrumbIconLineHeightVar]: `var(--ctrl-token-BreadcrumbButton-479, var(--semantic-token-BreadcrumbButton-480, ${tokens.lineHeightBase600}))`,
  },
});

const defaultButtonStyles = {
  backgroundColor: `var(--ctrl-token-BreadcrumbButton-481, var(--semantic-token-BreadcrumbButton-482, ${tokens.colorTransparentBackground}))`,
  color: `var(--ctrl-token-BreadcrumbButton-483, var(--semantic-token-BreadcrumbButton-484, ${tokens.colorNeutralForeground2}))`,
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
    padding: `var(--ctrl-token-BreadcrumbButton-485, var(--semantic-token-BreadcrumbButton-486, ${tokens.spacingHorizontalSNudge}))`,
  },
  medium: {
    height: '32px',
    ...typographyStyles.body1,
    padding: `var(--ctrl-token-BreadcrumbButton-487, var(--semantic-token-BreadcrumbButton-488, ${tokens.spacingHorizontalSNudge}))`,
  },
  large: {
    height: '40px',
    ...typographyStyles.body2,
    padding: `var(--ctrl-token-BreadcrumbButton-489, var(--semantic-token-BreadcrumbButton-490, ${tokens.spacingHorizontalS}))`,
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
