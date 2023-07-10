import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { BreadcrumbLinkSlots, BreadcrumbLinkState } from './BreadcrumbLink.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { useLinkStyles_unstable, LinkState } from '@fluentui/react-link';

export const breadcrumbLinkClassNames: SlotClassNames<BreadcrumbLinkSlots> = {
  root: 'fui-BreadcrumbLink',
  icon: 'fui-BreadcrumbLink__icon',
};

const defaultLinkStyles = {
  textDecorationLine: 'none',
  color: tokens.colorNeutralForeground2,
  cursor: 'auto',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.padding(tokens.spacingHorizontalXS),
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
  overflow: {
    ...shorthands.padding(tokens.spacingHorizontalSNudge),
    '&:hover': {
      textDecorationLine: 'none',
    },
  },
  current: {
    color: tokens.colorNeutralForeground2,
    ':hover': {
      ...defaultLinkStyles,
    },
    ':hover:active': {
      ...defaultLinkStyles,
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

const useIconStyles = makeStyles({
  small: {
    fontSize: '12px',
    height: '12px',
    lineHeight: tokens.lineHeightBase200,
    width: '12px',
  },
  medium: {
    fontSize: '16px',
    height: '16px',
    lineHeight: tokens.lineHeightBase400,
    width: '16px',
  },
  large: {
    fontSize: '20px',
    height: '20px',
    lineHeight: tokens.lineHeightBase600,
    width: '20px',
  },
});

/**
 * Apply styling to the BreadcrumbLink slots based on the state
 */
export const useBreadcrumbLinkStyles_unstable = (state: BreadcrumbLinkState): BreadcrumbLinkState => {
  const styles = useStyles();
  const iconStyles = useIconStyles();

  const currentSizeMap = {
    small: styles.currentSmall,
    medium: styles.currentMedium,
    large: styles.currentLarge,
  };

  state.root.className = mergeClasses(
    breadcrumbLinkClassNames.root,
    styles.root,
    styles[state.size],
    state.overflow && styles.overflow,
    state.current && currentSizeMap[state.size],
    state.current && styles.current,
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(iconStyles[state.size], styles.icon, state.icon.className);
  }

  useLinkStyles_unstable(state as LinkState);

  return state;
};
