import { shorthands, makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { BadgeSlots, BadgeState } from './Badge.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import * as semanticTokens from '@fluentui/semantic-tokens';

export const badgeClassNames: SlotClassNames<BadgeSlots> = {
  root: 'fui-Badge',
  icon: 'fui-Badge__icon',
};

// The text content of the badge has additional horizontal padding, but there is no `text` slot to add that padding to.
// Instead, add extra padding to the root, and a negative margin on the icon to "remove" the extra padding on the icon.

const useRootClassName = makeResetStyles({
  display: 'inline-flex',
  boxSizing: 'border-box',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  fontFamily: semanticTokens.textStyleDefaultHeaderFontFamily,
  fontWeight: semanticTokens.textStyleDefaultHeaderWeight,
  fontSize: semanticTokens.textRampLegalFontSize,
  lineHeight: semanticTokens.textRampLegalLineHeight,
  height: '20px',
  minWidth: '20px',
  padding: `0 calc(${semanticTokens.ctrlBadgePadding} + ${semanticTokens._ctrlBadgePaddingTextSide})`,
  borderRadius: semanticTokens.cornerCircular,
  // Use a transparent stroke (rather than no border) so the border is visible in high contrast
  borderColor: semanticTokens._ctrlBadgeNullColor,

  '::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderStyle: 'solid',
    borderColor: 'inherit',
    borderWidth: semanticTokens.strokeWidthDefault,
    borderRadius: 'inherit',
  },
});

const useRootStyles = makeStyles({
  fontSmallToTiny: {
    fontFamily: semanticTokens.textStyleDefaultRegularFontFamily,
    fontWeight: semanticTokens._ctrlBadgeTextStyleSemiBoldWeight,
    fontSize: semanticTokens.textRampSmLegalFontSize,
    lineHeight: semanticTokens.textRampSmLegalLineHeight,
  },

  // size

  tiny: {
    width: '6px',
    height: '6px',
    fontSize: '4px',
    lineHeight: '4px',
    minWidth: 'unset',
    padding: 'unset',
  },
  'extra-small': {
    width: '10px',
    height: '10px',
    fontSize: '6px',
    lineHeight: '6px',
    minWidth: 'unset',
    padding: 'unset',
  },
  small: {
    minWidth: '16px',
    height: '16px',
    padding: `0 calc(${semanticTokens.ctrlBadgeSmPadding} + ${semanticTokens._ctrlBadgePaddingTextSide})`,
  },
  medium: {
    // Set by useRootClassName
  },
  large: {
    fontSize: semanticTokens.textRampLgLegalFontSize,
    lineHeight: semanticTokens.textRampLgLegalLineHeight,
    minWidth: '24px',
    height: '24px',
    padding: `0 calc(${semanticTokens.ctrlBadgeLgPadding} + ${semanticTokens._ctrlBadgePaddingTextSide})`,
  },
  'extra-large': {
    fontSize: semanticTokens.textRampLgLegalFontSize,
    lineHeight: semanticTokens.textRampLgLegalLineHeight,
    minWidth: '32px',
    height: '32px',
    padding: `0 calc(${semanticTokens._ctrlBadgeXLPadding} + ${semanticTokens._ctrlBadgePaddingTextSide})`,
  },

  // shape

  square: { borderRadius: semanticTokens.cornerZero },
  rounded: { borderRadius: semanticTokens.ctrlBadgeCorner },
  roundedSmallToTiny: { borderRadius: semanticTokens._ctrlBadgeSmallTinyCorner },
  circular: {
    // Set by useRootClassName
  },
  // hide the boder when appearance is "ghost"

  borderGhost: {
    // The border is applied in an ::after pseudo-element because it should not affect layout.
    // The padding and size of the badge should be the same regardless of whether or not it has a border.
    '::after': {
      display: 'none',
    },
  },

  // appearance: filled

  filled: {
    // Set by useRootClassName
  },
  'filled-brand': {
    backgroundColor: semanticTokens.statusBrandBackground,
    color: semanticTokens.statusBrandForeground,
  },
  'filled-danger': {
    backgroundColor: semanticTokens.statusDangerBackground,
    color: semanticTokens.statusDangerForeground,
  },
  'filled-important': {
    backgroundColor: semanticTokens.statusImportantBackground,
    color: semanticTokens.statusImportantForeground,
  },
  'filled-informative': {
    backgroundColor: semanticTokens.statusInformativeBackground,
    color: semanticTokens.statusInformativeForeground,
  },
  'filled-severe': {
    backgroundColor: tokens.colorPaletteDarkOrangeBackground3, //come back to this one
    color: tokens.colorNeutralForegroundOnBrand,
  },
  'filled-subtle': {
    backgroundColor: tokens.colorNeutralBackground1, //come back to this one
    color: tokens.colorNeutralForeground1,
  },
  'filled-success': {
    backgroundColor: semanticTokens.statusSuccessBackground,
    color: semanticTokens.statusSuccessForeground,
  },
  'filled-warning': {
    backgroundColor: semanticTokens._ctrlBadgeStatusWarningBackground,
    color: semanticTokens.statusWarningForeground,
  },

  // appearance: ghost

  ghost: {
    // No shared colors between ghost appearances
  },
  'ghost-brand': {
    color: semanticTokens.statusBrandTintForeground,
  },
  'ghost-danger': {
    color: semanticTokens.statusDangerTintForeground,
  },
  'ghost-important': {
    color: semanticTokens.statusImportantTintForeground,
  },
  'ghost-informative': {
    color: semanticTokens.statusInformativeTintForeground,
  },
  'ghost-severe': {
    color: tokens.colorPaletteDarkOrangeForeground3, //come back to this one
  },
  'ghost-subtle': {
    color: tokens.colorNeutralForegroundStaticInverted, //come back to this one
  },
  'ghost-success': {
    color: semanticTokens._ctrlBadgeStatusSuccessTintForeground3,
  },
  'ghost-warning': {
    color: semanticTokens._ctrlBadgeStatusWarningTintForeground2,
  },

  // appearance: outline

  outline: {
    ...shorthands.borderColor('currentColor'),
  },
  'outline-brand': {
    color: semanticTokens.statusBrandTintForeground,
  },
  'outline-danger': {
    color: semanticTokens.statusDangerTintForeground,
    ...shorthands.borderColor(semanticTokens.statusDangerStroke),
  },
  'outline-important': {
    color: semanticTokens.statusImportantTintForeground,
    ...shorthands.borderColor(semanticTokens.statusImportantStroke),
  },
  'outline-informative': {
    color: semanticTokens.statusInformativeTintForeground,
    ...shorthands.borderColor(semanticTokens.statusInformativeStroke),
  },
  'outline-severe': {
    color: tokens.colorPaletteDarkOrangeForeground3, //come back to this one
  },
  'outline-subtle': {
    color: tokens.colorNeutralForegroundStaticInverted, //come back to this one
  },
  'outline-success': {
    color: semanticTokens._ctrlBadgeStatusSuccessTintForeground3,
    ...shorthands.borderColor(semanticTokens.statusSuccessStroke),
  },
  'outline-warning': {
    color: semanticTokens._ctrlBadgeStatusWarningTintForeground2,
  },

  // appearance: tint

  tint: {
    // No shared colors between tint appearances
  },
  'tint-brand': {
    backgroundColor: semanticTokens.statusBrandTintBackground,
    color: semanticTokens._ctrlBadgeStatusBrandTintForeground,
    ...shorthands.borderColor(semanticTokens.statusBrandTintStroke),
  },
  'tint-danger': {
    backgroundColor: semanticTokens._ctrlBadgeStatusDangerTintBackground,
    color: semanticTokens._ctrlBadgeStatusDangerTintForeground,
    ...shorthands.borderColor(semanticTokens._ctrlBadgeStatusDangerTintStroke),
  },
  'tint-important': {
    backgroundColor: semanticTokens._ctrlBadgeStatusImportantTintBackground,
    color: semanticTokens._ctrlBadgeStatusImportantTintForeground,
    ...shorthands.borderColor(semanticTokens.statusImportantTintStroke),
  },
  'tint-informative': {
    backgroundColor: semanticTokens.statusInformativeTintBackground,
    color: semanticTokens.statusInformativeTintForeground,
    ...shorthands.borderColor(semanticTokens._ctrlBadgeStatusInformativeTintStroke),
  },
  'tint-severe': {
    //come back to this
    backgroundColor: tokens.colorPaletteDarkOrangeBackground1,
    color: tokens.colorPaletteDarkOrangeForeground1,
    ...shorthands.borderColor(tokens.colorPaletteDarkOrangeBorder1),
  },
  'tint-subtle': {
    //come back to this
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground3,
    ...shorthands.borderColor(tokens.colorNeutralStroke2),
  },
  'tint-success': {
    backgroundColor: semanticTokens._ctrlBadgeStatusSuccessTintBackground,
    color: semanticTokens._ctrlBadgeStatusSuccessTintForeground,
    ...shorthands.borderColor(semanticTokens._ctrlBadgeStatusSuccessTintStroke),
  },
  'tint-warning': {
    backgroundColor: semanticTokens._ctrlBadgeStatusWarningTintBackground,
    color: semanticTokens._ctrlBadgeStatusWarningTintForeground,
    ...shorthands.borderColor(semanticTokens._ctrlBadgeStatusWarningTintStroke),
  },
});

const useIconRootClassName = makeResetStyles({
  display: 'flex',
  lineHeight: '1',
  margin: `0 calc(-1 * ${semanticTokens._ctrlBadgePaddingTextSide})`, // Remove text padding added to root
  fontSize: '12px',
});

const useIconStyles = makeStyles({
  beforeText: {
    marginRight: `calc(${semanticTokens._ctrlBadgePaddingRightSide} + ${semanticTokens._ctrlBadgePaddingTextSide})`,
  },
  afterText: {
    marginLeft: `calc(${semanticTokens._ctrlBadgePaddingLeftSide} + ${semanticTokens._ctrlBadgePaddingTextSide})`,
  },

  beforeTextXL: {
    marginRight: `calc(${semanticTokens._ctrlBadgePaddingRightSideXL} + ${semanticTokens._ctrlBadgePaddingTextSide})`,
  },
  afterTextXL: {
    marginLeft: `calc(${semanticTokens._ctrlBadgePaddingLeftSideXL} + ${semanticTokens._ctrlBadgePaddingTextSide})`,
  },

  // size

  tiny: {
    fontSize: '6px',
  },
  'extra-small': {
    fontSize: '10px',
  },
  small: {
    fontSize: '12px',
  },
  medium: {
    // Set by useIconRootClassName
  },
  large: {
    fontSize: '16px',
  },
  'extra-large': {
    fontSize: '20px',
  },
});

/**
 * Applies style classnames to slots
 */
export const useBadgeStyles_unstable = (state: BadgeState): BadgeState => {
  'use no memo';

  const rootClassName = useRootClassName();
  const rootStyles = useRootStyles();

  const smallToTiny = state.size === 'small' || state.size === 'extra-small' || state.size === 'tiny';

  state.root.className = mergeClasses(
    badgeClassNames.root,
    rootClassName,
    smallToTiny && rootStyles.fontSmallToTiny,
    rootStyles[state.size],
    rootStyles[state.shape],
    state.shape === 'rounded' && smallToTiny && rootStyles.roundedSmallToTiny,
    state.appearance === 'ghost' && rootStyles.borderGhost,
    rootStyles[state.appearance],
    rootStyles[`${state.appearance}-${state.color}` as const],
    state.root.className,
  );

  const iconRootClassName = useIconRootClassName();
  const iconStyles = useIconStyles();
  if (state.icon) {
    let iconPositionClass;
    if (state.root.children) {
      if (state.size === 'extra-large') {
        iconPositionClass = state.iconPosition === 'after' ? iconStyles.afterTextXL : iconStyles.beforeTextXL;
      } else {
        iconPositionClass = state.iconPosition === 'after' ? iconStyles.afterText : iconStyles.beforeText;
      }
    }

    state.icon.className = mergeClasses(
      badgeClassNames.icon,
      iconRootClassName,
      iconPositionClass,
      iconStyles[state.size],
      state.icon.className,
    );
  }

  return state;
};
