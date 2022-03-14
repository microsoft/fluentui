import { shorthands, mergeClasses, makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { BadgeSlots, BadgeState } from './Badge.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

/**
 * @deprecated Use `badgeClassNames.root` instead.
 */
export const badgeClassName = 'fui-Badge';
export const badgeClassNames: SlotClassNames<BadgeSlots> = {
  root: 'fui-Badge',
  icon: 'fui-Badge__icon',
};

const useRootStyles = makeStyles({
  base: {
    display: 'inline-flex',
    boxSizing: 'border-box',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: tokens.fontWeightSemibold,
    ...shorthands.borderWidth(tokens.strokeWidthThin),
    ...shorthands.borderStyle('solid'),
    fontFamily: tokens.fontFamilyBase,
    position: 'relative',
  },

  // size

  tiny: {
    width: '6px',
    height: '6px',
    fontSize: '4px',
  },
  'extra-small': {
    width: '10px',
    height: '10px',
    fontSize: '6px',
  },
  small: {
    minWidth: '16px',
    height: '16px',
    ...shorthands.padding('2px'),
    ...shorthands.gap('4px'),
    fontSize: '8px',
  },
  medium: {
    height: '20px',
    minWidth: '20px',
    ...shorthands.gap('4px'),
    ...shorthands.padding('4px'),
    fontSize: '10px',
  },
  large: {
    minWidth: '24px',
    height: '24px',
    ...shorthands.padding('4px'),
    fontSize: '12px',
    ...shorthands.gap('4px'),
  },
  'extra-large': {
    minWidth: '32px',
    height: '32px',
    ...shorthands.padding('6px'),
    ...shorthands.gap('6px'),
    fontSize: '12px',
    ...shorthands.borderWidth(tokens.strokeWidthThick),
  },

  // shape

  square: {
    // Default border radius
  },
  rounded: {
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  roundedSmallToTiny: {
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
  },
  circular: {
    ...shorthands.borderRadius('99px'),
  },

  // appearance: filled

  filled: {
    ...shorthands.borderColor(tokens.colorTransparentStroke),
  },
  'filled-brand': {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    ...shorthands.borderColor(tokens.colorBrandBackground),
  },
  'filled-danger': {
    backgroundColor: tokens.colorPaletteRedBackground3,
    color: tokens.colorNeutralForegroundOnBrand,
    ...shorthands.borderColor(tokens.colorPaletteRedBackground3),
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
    color: tokens.colorNeutralForeground1,
    ...shorthands.borderColor(tokens.colorPaletteYellowBackground3),
  },

  // appearance: ghost

  ghost: {
    ...shorthands.borderStyle('none'),
  },
  'ghost-brand': {
    color: tokens.colorBrandBackground,
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
    color: tokens.colorNeutralForegroundInverted,
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
    color: tokens.colorBrandBackground,
  },
  'outline-danger': {
    color: tokens.colorPaletteRedForeground3,
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
    color: tokens.colorNeutralForegroundInverted,
  },
  'outline-success': {
    color: tokens.colorPaletteGreenForeground2,
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
    ...shorthands.borderColor(tokens.colorPaletteDarkOrangeForeground2),
  },
  'tint-subtle': {
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground3,
    ...shorthands.borderColor(tokens.colorNeutralStroke2),
  },
  'tint-success': {
    backgroundColor: tokens.colorPaletteGreenBackground1,
    color: tokens.colorPaletteGreenForeground1,
    ...shorthands.borderColor(tokens.colorPaletteGreenBackground2),
  },
  'tint-warning': {
    backgroundColor: tokens.colorPaletteYellowBackground1,
    color: tokens.colorPaletteYellowForeground2,
    ...shorthands.borderColor(tokens.colorPaletteYellowBackground2),
  },
});

const useIconStyles = makeStyles({
  base: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    height: '100%',
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
    fontSize: '12px',
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
  const rootStyles = useRootStyles();

  state.root.className = mergeClasses(
    badgeClassNames.root,
    rootStyles.base,
    rootStyles[state.size],
    rootStyles[state.shape],
    state.shape === 'rounded' &&
      (state.size === 'small' || state.size === 'extra-small' || state.size === 'tiny') &&
      rootStyles.roundedSmallToTiny,
    rootStyles[state.appearance],
    rootStyles[`${state.appearance}-${state.color}` as const],
    state.root.className,
  );

  const iconStyles = useIconStyles();
  if (state.icon) {
    state.icon.className = mergeClasses(
      badgeClassNames.icon,
      iconStyles.base,
      iconStyles[state.size],
      state.icon.className,
    );
  }

  return state;
};
