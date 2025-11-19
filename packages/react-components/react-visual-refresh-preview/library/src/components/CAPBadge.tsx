import { makeStyles, mergeClasses } from '@griffel/react';
import { BadgeState, useBadgeStyles_unstable } from '@fluentui/react-components';
import { tokens } from '@fluentui/react-theme';

const textPadding = tokens.spacingHorizontalXXS;

const useCAPBadgeStyles = makeStyles({
  root: {
    padding: `0 calc(${tokens.spacingHorizontalSNudge} + ${textPadding})`,
  },

  tiny: {
    padding: 'unset',
  },

  'extra-small': {
    padding: 'unset',
  },

  small: {
    padding: `0 calc(${tokens.spacingHorizontalXS} + ${textPadding})`,
  },

  medium: {
    // Set by root
  },

  large: {
    padding: `0 calc(${tokens.spacingHorizontalSNudge} + ${textPadding})`,
  },

  'extra-large': {
    padding: `0 calc(${tokens.spacingHorizontalS} + ${textPadding})`,
  },

  // shape
  'rounded-extra-large': { borderRadius: tokens.borderRadiusXLarge },
  'rounded-large': { borderRadius: tokens.borderRadiusLarge },
  'rounded-medium': { borderRadius: tokens.borderRadiusMedium },
  'rounded-small': { borderRadius: tokens.borderRadiusMedium },
  'rounded-extra-small': { borderRadius: tokens.borderRadiusSmall },
  'rounded-tiny': { borderRadius: tokens.borderRadiusSmall },
});

const useCAPBadgeIconStyles = makeStyles({
  beforeTextSmall: {
    marginRight: textPadding,
  },
  afterTextSmall: {
    marginLeft: textPadding,
  },
});

export function useCAPBadgeStylesHook(state: BadgeState) {
  // Apply base Badge styles first
  useBadgeStyles_unstable(state);

  // Then override with CAP styles
  const styles = useCAPBadgeStyles();
  const iconStyles = useCAPBadgeIconStyles();

  state.root.className = mergeClasses(
    state.root.className,
    styles.root,
    styles[state.size],
    state.shape === 'rounded' && styles[`rounded-${state.size}`],
  );

  // Override icon spacing for small size
  if (state.icon && state.size === 'small') {
    const iconPositionClass = state.iconPosition === 'after' ? iconStyles.afterTextSmall : iconStyles.beforeTextSmall;
    state.icon.className = mergeClasses(state.icon.className, iconPositionClass);
  }

  return state;
}
