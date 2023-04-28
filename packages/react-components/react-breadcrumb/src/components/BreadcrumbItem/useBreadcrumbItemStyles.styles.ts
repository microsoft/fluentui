import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { BreadcrumbItemSlots, BreadcrumbItemState } from './BreadcrumbItem.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens, typographyStyles } from '@fluentui/react-theme';

export const breadcrumbItemClassNames: SlotClassNames<BreadcrumbItemSlots> = {
  root: 'fui-BreadcrumbItem',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    color: tokens.colorNeutralForeground2,
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
});

/**
 * Apply styling to the BreadcrumbItem slots based on the state
 */
export const useBreadcrumbItemStyles_unstable = (state: BreadcrumbItemState): BreadcrumbItemState => {
  const styles = useStyles();
  const size = state.size || 'medium';
  const currentSizeMap = {
    small: styles.currentSmall,
    medium: styles.currentMedium,
    large: styles.currentLarge,
  };
  state.root.className = mergeClasses(
    breadcrumbItemClassNames.root,
    styles.root,
    styles[size],
    state.current && currentSizeMap[size],
    state.root.className,
  );

  return state;
};
