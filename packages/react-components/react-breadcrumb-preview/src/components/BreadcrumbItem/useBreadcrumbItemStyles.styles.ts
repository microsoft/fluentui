import { makeStyles, makeResetStyles, mergeClasses, shorthands } from '@griffel/react';
import type { BreadcrumbItemSlots, BreadcrumbItemState } from './BreadcrumbItem.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens, typographyStyles } from '@fluentui/react-theme';

export const breadcrumbItemClassNames: SlotClassNames<BreadcrumbItemSlots> = {
  root: 'fui-BreadcrumbItem',
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
  const size = state.size || 'medium';
  const sizeMap = {
    small: styles.small,
    medium: '', // Medium is the default. No need to apply any styles
    large: styles.large,
  } as const;
  const noSpacingStyle =
    state.isInteractive || (!state.hasInteractiveItems && state.size === 'small') ? styles.noSpacing : '';

  state.root.className = mergeClasses(
    breadcrumbItemClassNames.root,
    resetStyles,
    sizeMap[size],
    noSpacingStyle,
    state.root.className,
  );

  return state;
};
