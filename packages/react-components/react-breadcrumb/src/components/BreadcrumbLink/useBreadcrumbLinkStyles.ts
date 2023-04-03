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
  overflow: {
    ...shorthands.padding(tokens.spacingHorizontalSNudge),
    '&:hover': {
      textDecorationLine: 'none',
    },
  },
});

/**
 * Apply styling to the BreadcrumbLink slots based on the state
 */
export const useBreadcrumbLinkStyles_unstable = (state: BreadcrumbLinkState): BreadcrumbLinkState => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    breadcrumbLinkClassNames.root,
    styles.root,
    state.root.className,
    state.overflow && styles.overflow,
  );

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
