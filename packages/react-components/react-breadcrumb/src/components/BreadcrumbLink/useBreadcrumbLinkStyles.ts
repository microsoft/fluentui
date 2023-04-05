import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { BreadcrumbLinkSlots, BreadcrumbLinkState } from './BreadcrumbLink.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens, typographyStyles } from '@fluentui/react-theme';

export const breadcrumbLinkClassNames: SlotClassNames<BreadcrumbLinkSlots> = {
  root: 'fui-BreadcrumbLink',
  icon: 'fui-BreadcrumbLink__icon',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
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
 * Apply styling to the BreadcrumbLink slots based on the state
 */
export const useBreadcrumbLinkStyles_unstable = (state: BreadcrumbLinkState): BreadcrumbLinkState => {
  const styles = useStyles();

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
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(styles.icon, state.icon.className);
  }

  return state;
};
