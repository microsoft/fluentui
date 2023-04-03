import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { BreadcrumbButtonSlots, BreadcrumbButtonState } from './BreadcrumbButton.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useButtonStyles_unstable } from '@fluentui/react-button';
import { tokens, typographyStyles } from '@fluentui/react-theme';

export const breadcrumbButtonClassNames: SlotClassNames<BreadcrumbButtonSlots> = {
  root: 'fui-BreadcrumbButton',
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
    ':active': {
      ...typographyStyles.caption1Strong,
    },
  },
  medium: {
    height: '32px',
    ...shorthands.padding(tokens.spacingHorizontalSNudge),
    ...typographyStyles.body1,
    ':active': {
      ...typographyStyles.body1Strong,
    },
  },
  large: {
    height: '40px',
    ...shorthands.padding(tokens.spacingHorizontalS),
    ...typographyStyles.body2,
    ':active': {
      ...typographyStyles.subtitle2,
    },
  },
  selectedSmall: {
    ...typographyStyles.caption1Strong,
  },
  selectedMedium: {
    ...typographyStyles.body1Strong,
  },
  selectedLarge: {
    ...typographyStyles.subtitle2,
  },
});

/**
 * Apply styling to the BreadcrumbButton slots based on the state
 */
export const useBreadcrumbButtonStyles_unstable = (state: BreadcrumbButtonState): BreadcrumbButtonState => {
  const styles = useStyles();
  const size = state.size || 'medium';
  const selectedSizeMap = {
    small: styles.selectedSmall,

    medium: styles.selectedMedium,
    large: styles.selectedLarge,
  };
  state.root.className = mergeClasses(
    breadcrumbButtonClassNames.root,
    styles[size],
    styles.root,
    state.root.className,
    state.selected && selectedSizeMap[size],
  );

  useButtonStyles_unstable({ ...state });

  return state;
};
