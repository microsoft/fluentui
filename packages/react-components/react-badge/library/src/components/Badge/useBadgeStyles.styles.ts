import { shorthands, makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import type { BadgeSlots, BadgeState } from './Badge.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const badgeClassNames: SlotClassNames<BadgeSlots> = {
  root: 'fui-Badge',
  icon: 'fui-Badge__icon',
};

// The text content of the badge has additional horizontal padding, but there is no `text` slot to add that padding to.
// Instead, add extra padding to the root, and a negative margin on the icon to "remove" the extra padding on the icon.
const textPadding = tokens.spacingHorizontalXXS;

const useRootClassName = makeResetStyles({
  display: 'inline-flex',
  boxSizing: 'border-box',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  ...typographyStyles.caption1Strong,
  height: '20px',
  width: '20px',
  minWidth: 'max-content',
  padding: `0 calc(${tokens.spacingHorizontalXS} + ${textPadding})`,
  borderRadius: tokens.borderRadiusCircular,
  // Use a transparent stroke (rather than no border) so the border is visible in high contrast
  borderColor: tokens.colorTransparentStroke,

  '::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderStyle: 'solid',
    borderColor: 'inherit',
    borderWidth: tokens.strokeWidthThin,
    borderRadius: 'inherit',
  },
});

const useRootStyles = makeStyles({
  fontSmallToTiny: {
    ...typographyStyles.caption2Strong,
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
    width: '16px',
    height: '16px',
    padding: `0 calc(${tokens.spacingHorizontalXXS} + ${textPadding})`,
  },
  medium: {
    // Set by useRootClassName
  },
  large: {
    width: '24px',
    height: '24px',
    padding: `0 calc(${tokens.spacingHorizontalXS} + ${textPadding})`,
  },
  'extra-large': {
    width: '32px',
    height: '32px',
    padding: `0 calc(${tokens.spacingHorizontalSNudge} + ${textPadding})`,
  },

  // shape

  square: { borderRadius: tokens.borderRadiusNone },
  rounded: { borderRadius: tokens.borderRadiusMedium },
  roundedSmallToTiny: { borderRadius: tokens.borderRadiusSmall },
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
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
  },
  'filled-danger': {
    backgroundColor: tokens.colorPaletteRedBackground3,
    color: tokens.colorNeutralForegroundOnBrand,
  },
  'filled-important': {
    backgroundColor: tokens.colorNeutralForeground1,
    color: tokens.colorNeutralBackground1,
  },
  'filled-informative': {
    backgroundColor: tokens.colorNeutralBackground5,
    color: tokens.colorNeutralForeground3,
  },
  'filled-severe': {
    backgroundColor: tokens.colorPaletteDarkOrangeBackground3,
    color: tokens.colorNeutralForegroundOnBrand,
  },
  'filled-subtle': {
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
  },
  'filled-success': {
    backgroundColor: tokens.colorPaletteGreenBackground3,
    color: tokens.colorNeutralForegroundOnBrand,
  },
  'filled-warning': {
    backgroundColor: tokens.colorPaletteYellowBackground3,
    color: tokens.colorNeutralForeground1Static,
  },

  // appearance: ghost

  ghost: {
    // No shared colors between ghost appearances
  },
  'ghost-brand': {
    color: tokens.colorBrandForeground1,
  },
  'ghost-danger': {
    color: tokens.colorPaletteRedForeground3,
  },
  'ghost-important': {
    color: tokens.colorNeutralForeground1,
  },
  'ghost-informative': {
    color: tokens.colorNeutralForeground3,
  },
  'ghost-severe': {
    color: tokens.colorPaletteDarkOrangeForeground3,
  },
  'ghost-subtle': {
    color: tokens.colorNeutralForegroundStaticInverted,
  },
  'ghost-success': {
    color: tokens.colorPaletteGreenForeground3,
  },
  'ghost-warning': {
    color: tokens.colorPaletteYellowForeground2,
  },

  // appearance: outline

  outline: {
    ...shorthands.borderColor('currentColor'),
  },
  'outline-brand': {
    color: tokens.colorBrandForeground1,
  },
  'outline-danger': {
    color: tokens.colorPaletteRedForeground3,
    ...shorthands.borderColor(tokens.colorPaletteRedBorder2),
  },
  'outline-important': {
    color: tokens.colorNeutralForeground3,
    ...shorthands.borderColor(tokens.colorNeutralStrokeAccessible),
  },
  'outline-informative': {
    color: tokens.colorNeutralForeground3,
    ...shorthands.borderColor(tokens.colorNeutralStroke2),
  },
  'outline-severe': {
    color: tokens.colorPaletteDarkOrangeForeground3,
  },
  'outline-subtle': {
    color: tokens.colorNeutralForegroundStaticInverted,
  },
  'outline-success': {
    color: tokens.colorPaletteGreenForeground3,
    ...shorthands.borderColor(tokens.colorPaletteGreenBorder2),
  },
  'outline-warning': {
    color: tokens.colorPaletteYellowForeground2,
  },

  // appearance: tint

  tint: {
    // No shared colors between tint appearances
  },
  'tint-brand': {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
    ...shorthands.borderColor(tokens.colorBrandStroke2),
  },
  'tint-danger': {
    backgroundColor: tokens.colorPaletteRedBackground1,
    color: tokens.colorPaletteRedForeground1,
    ...shorthands.borderColor(tokens.colorPaletteRedBorder1),
  },
  'tint-important': {
    backgroundColor: tokens.colorNeutralForeground3,
    color: tokens.colorNeutralBackground1,
    ...shorthands.borderColor(tokens.colorTransparentStroke),
  },
  'tint-informative': {
    backgroundColor: tokens.colorNeutralBackground4,
    color: tokens.colorNeutralForeground3,
    ...shorthands.borderColor(tokens.colorNeutralStroke2),
  },
  'tint-severe': {
    backgroundColor: tokens.colorPaletteDarkOrangeBackground1,
    color: tokens.colorPaletteDarkOrangeForeground1,
    ...shorthands.borderColor(tokens.colorPaletteDarkOrangeBorder1),
  },
  'tint-subtle': {
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground3,
    ...shorthands.borderColor(tokens.colorNeutralStroke2),
  },
  'tint-success': {
    backgroundColor: tokens.colorPaletteGreenBackground1,
    color: tokens.colorPaletteGreenForeground1,
    ...shorthands.borderColor(tokens.colorPaletteGreenBorder1),
  },
  'tint-warning': {
    backgroundColor: tokens.colorPaletteYellowBackground1,
    color: tokens.colorPaletteYellowForeground1,
    ...shorthands.borderColor(tokens.colorPaletteYellowBorder1),
  },
});

const useIconRootClassName = makeResetStyles({
  display: 'flex',
  lineHeight: '1',
  margin: `0 calc(-1 * ${textPadding})`, // Remove text padding added to root
  fontSize: '12px',
});

const useIconStyles = makeStyles({
  beforeText: {
    marginRight: `calc(${tokens.spacingHorizontalXXS} + ${textPadding})`,
  },
  afterText: {
    marginLeft: `calc(${tokens.spacingHorizontalXXS} + ${textPadding})`,
  },

  beforeTextXL: {
    marginRight: `calc(${tokens.spacingHorizontalXS} + ${textPadding})`,
  },
  afterTextXL: {
    marginLeft: `calc(${tokens.spacingHorizontalXS} + ${textPadding})`,
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
