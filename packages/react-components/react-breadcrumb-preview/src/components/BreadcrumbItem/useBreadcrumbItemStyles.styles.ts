import { makeStyles, makeResetStyles, mergeClasses, shorthands } from '@griffel/react';
import type { BreadcrumbItemSlots, BreadcrumbItemState } from './BreadcrumbItem.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { useIconStyles } from '../../shared/useIconStyles.styles';

export const breadcrumbItemClassNames: SlotClassNames<BreadcrumbItemSlots> = {
  root: 'fui-BreadcrumbItem',
  icon: 'fui-BreadcrumbItem__icon',
};

const useBreadcrumbItemResetStyles = makeResetStyles({
  display: 'flex',
  alignItems: 'center',
  color: tokens.colorNeutralForeground2,
  boxSizing: 'border-box',
  textWrap: 'nowrap',

  // Styles for the medium (default) size
  height: '32px',
  ...shorthands.padding(tokens.spacingHorizontalSNudge),
  ...typographyStyles.body1,
});

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
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

/**
 * Apply styling to the BreadcrumbItem slots based on the state
 */
export const useBreadcrumbItemStyles_unstable = (state: BreadcrumbItemState): BreadcrumbItemState => {
  const resetStyles = useBreadcrumbItemResetStyles();
  const styles = useStyles();
  const iconStyles = useIconStyles();
  const size = state.size || 'medium';
  const sizeMap = {
    small: styles.small,
    medium: '', // Medium is the default. No need to apply any styles
    large: styles.large,
  } as const;
  const currentSizeMap = {
    small: styles.currentSmall,
    medium: styles.currentMedium,
    large: styles.currentLarge,
  } as const;
  const noSpacingStyle =
    state.isInteractive || (!state.isInteractive && state.size === 'small') ? styles.noSpacing : '';

  state.root.className = mergeClasses(
    breadcrumbItemClassNames.root,
    resetStyles,
    sizeMap[size],
    state.current && currentSizeMap[size],
    noSpacingStyle,
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(iconStyles.base, iconStyles[state.size], styles.icon, state.icon.className);
  }

  return state;
};
