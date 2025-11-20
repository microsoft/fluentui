import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { BadgeState, useBadgeStyles_unstable } from '@fluentui/react-components';
import { tokens } from '@fluentui/react-theme';
import { CAP_THEME } from '../CAPTheme';

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

  'outline-brand': {
    ...shorthands.borderColor(tokens.colorBrandStroke2),
  },
  'outline-warning': {
    ...shorthands.borderColor(tokens.colorStatusWarningBorder1),
  },
  'outline-important': {
    ...shorthands.borderColor(tokens.colorNeutralStroke1),
  },
  'outline-danger': {
    ...shorthands.borderColor(tokens.colorStatusDangerBorder1),
  },
  'outline-success': {
    ...shorthands.borderColor(tokens.colorStatusSuccessBorder1),
  },
  'outline-informative': {
    ...shorthands.borderColor(tokens.colorNeutralStroke1),
  },
  'outline-subtle': {
    ...shorthands.borderColor(tokens.colorNeutralForegroundOnBrand),
  },

  'tint-brand': {
    color: CAP_THEME.colorBrandForegroundCompound,
  },

  'ghost-brand': {
    color: CAP_THEME.colorBrandForegroundCompound,
  },

  'filled-warning': {
    color: tokens.colorNeutralForegroundOnBrand,
    backgroundColor: tokens.colorStatusWarningBackground3,
  },

  'tint-informative': {
    backgroundColor: tokens.colorNeutralBackground5,
    ...shorthands.borderColor(tokens.colorNeutralStroke1),
  },

  'filled-important': {
    backgroundColor: tokens.colorNeutralBackgroundInverted,
    color: tokens.colorNeutralForegroundOnBrand,
  },

  'tint-important': {
    backgroundColor: tokens.colorNeutralBackground5,
    color: tokens.colorNeutralForeground3,
    ...shorthands.borderColor(tokens.colorNeutralStroke1),
  },

  'filled-subtle': {
    color: tokens.colorNeutralForeground3,
    backgroundColor: tokens.colorNeutralBackground5,
  },

  'tint-subtle': {
    ...shorthands.borderColor(tokens.colorNeutralStroke1),
  },
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
    `${state.appearance}-${state.color}` in styles &&
      styles[`${state.appearance}-${state.color}` as keyof typeof styles],
  );

  // Override icon spacing for small size
  if (state.icon && state.size === 'small') {
    const iconPositionClass = state.iconPosition === 'after' ? iconStyles.afterTextSmall : iconStyles.beforeTextSmall;
    state.icon.className = mergeClasses(state.icon.className, iconPositionClass);
  }

  return state;
}
