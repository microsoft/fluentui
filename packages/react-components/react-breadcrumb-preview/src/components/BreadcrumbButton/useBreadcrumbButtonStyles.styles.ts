import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { BreadcrumbButtonSlots, BreadcrumbButtonState } from './BreadcrumbButton.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useButtonStyles_unstable } from '@fluentui/react-button';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { useIconStyles } from '../../shared/useIconStyles.styles';

/**
 * Static CSS class names used internally for the component slots.
 */
export const breadcrumbButtonClassNames: SlotClassNames<BreadcrumbButtonSlots> = {
  root: 'fui-BreadcrumbButton',
  icon: 'fui-BreadcrumbButton__icon',
};

const defaultButtonStyles = {
  backgroundColor: tokens.colorTransparentBackground,
  color: tokens.colorNeutralForeground2,
  cursor: 'auto',
};
const useStyles = makeStyles({
  root: {
    minWidth: 'unset',
    textWrap: 'nowrap',
    ...shorthands.border('none'),
  },
  small: {
    height: '24px',
    ...typographyStyles.caption1,
    ...shorthands.padding(tokens.spacingHorizontalSNudge),
  },
  medium: {
    height: '32px',
    ...typographyStyles.body1,
    ...shorthands.padding(tokens.spacingHorizontalSNudge),
  },
  large: {
    height: '40px',
    ...typographyStyles.body2,
    ...shorthands.padding(tokens.spacingHorizontalS),
  },
  current: {
    ':hover': {
      ...defaultButtonStyles,
    },
    ':hover:active': {
      ...defaultButtonStyles,
    },
    ':disabled': {
      ...defaultButtonStyles,
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
