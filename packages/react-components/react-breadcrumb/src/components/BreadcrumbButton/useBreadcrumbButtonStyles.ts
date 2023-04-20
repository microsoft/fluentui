import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { BreadcrumbButtonSlots, BreadcrumbButtonState } from './BreadcrumbButton.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useButtonStyles_unstable } from '@fluentui/react-button';
import { tokens, typographyStyles } from '@fluentui/react-theme';

export const breadcrumbButtonClassNames: SlotClassNames<BreadcrumbButtonSlots> = {
  root: 'fui-BreadcrumbButton',
  icon: 'fui-BreadcrumbButton__icon',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {},
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
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(iconStyles[state.size], state.icon.className);
  }

  useButtonStyles_unstable(state);

  return state;
};
