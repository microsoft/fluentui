import { shorthands, mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import { tokens } from '@fluentui/react-theme';
import type { BadgeState } from './Badge.types';

export const badgeClassName = 'fui-Badge';

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

  //
  // size
  //
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

  //
  // shape
  //
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

  //
  // appearance
  //
  ghost: {
    ...shorthands.borderColor('transparent'),
  },

  //
  // appearance-color
  //
  'filled-brand': {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    ...shorthands.borderColor(tokens.colorBrandBackground),
  },
  'outline-brand': {
    color: tokens.colorBrandBackground,
    ...shorthands.borderColor(tokens.colorBrandBackground),
  },
  'tint-brand': {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
    ...shorthands.borderColor(tokens.colorBrandStroke2),
  },
  'ghost-brand': {
    color: tokens.colorBrandBackground,
  },
  'filled-danger': {
    backgroundColor: tokens.colorPaletteRedBackground3,
    color: tokens.colorNeutralForegroundOnBrand,
    ...shorthands.borderColor(tokens.colorPaletteRedBackground3),
  },
  'outline-danger': {
    color: tokens.colorPaletteRedForeground3,
    ...shorthands.borderColor(tokens.colorPaletteRedForeground3),
  },
  'tint-danger': {
    backgroundColor: tokens.colorPaletteRedBackground1,
    color: tokens.colorPaletteRedForeground1,
    ...shorthands.borderColor(tokens.colorPaletteRedBorder1),
  },
  'ghost-danger': {
    color: tokens.colorPaletteRedForeground3,
  },
  'filled-severe': {
    backgroundColor: tokens.colorPaletteDarkOrangeBackground3,
    color: tokens.colorNeutralForegroundOnBrand,
    ...shorthands.borderColor(tokens.colorTransparentStroke),
  },
  'outline-severe': {
    color: tokens.colorPaletteDarkOrangeForeground3,
    ...shorthands.borderColor(tokens.colorPaletteDarkOrangeForeground3),
  },
  'tint-severe': {
    backgroundColor: tokens.colorPaletteDarkOrangeBackground1,
    color: tokens.colorPaletteDarkOrangeForeground1,
    ...shorthands.borderColor(tokens.colorPaletteDarkOrangeForeground2),
  },
  'ghost-severe': {
    color: tokens.colorPaletteDarkOrangeForeground3,
  },
  'filled-warning': {
    backgroundColor: tokens.colorPaletteYellowBackground3,
    color: tokens.colorNeutralForeground1,
    ...shorthands.borderColor(tokens.colorPaletteYellowBackground3),
  },
  'outline-warning': {
    color: tokens.colorPaletteYellowForeground2,
    ...shorthands.borderColor(tokens.colorPaletteYellowForeground2),
  },
  'tint-warning': {
    backgroundColor: tokens.colorPaletteYellowBackground1,
    color: tokens.colorPaletteYellowForeground2,
    ...shorthands.borderColor(tokens.colorPaletteYellowBackground2),
  },
  'ghost-warning': {
    color: tokens.colorPaletteYellowForeground2,
  },
  'filled-success': {
    backgroundColor: tokens.colorPaletteGreenBackground3,
    color: tokens.colorNeutralForegroundOnBrand,
    ...shorthands.borderColor(tokens.colorTransparentStroke),
  },
  'outline-success': {
    color: tokens.colorPaletteGreenForeground2,
    ...shorthands.borderColor(tokens.colorPaletteGreenForeground2),
  },
  'tint-success': {
    backgroundColor: tokens.colorPaletteGreenBackground1,
    color: tokens.colorPaletteGreenForeground1,
    ...shorthands.borderColor(tokens.colorPaletteGreenBackground2),
  },
  'ghost-success': {
    color: tokens.colorPaletteGreenForeground3,
  },
  'filled-important': {
    backgroundColor: tokens.colorNeutralForeground1,
    color: tokens.colorNeutralBackground1,
    ...shorthands.borderColor(tokens.colorTransparentStroke),
  },
  'outline-important': {
    color: tokens.colorNeutralForeground3,
    ...shorthands.borderColor(tokens.colorNeutralStrokeAccessible),
  },
  'tint-important': {
    backgroundColor: tokens.colorNeutralForeground3,
    color: tokens.colorNeutralBackground1,
    ...shorthands.borderColor(tokens.colorTransparentStroke),
  },
  'ghost-important': {
    color: tokens.colorNeutralForeground1,
  },
  'filled-informative': {
    backgroundColor: tokens.colorNeutralBackground5,
    color: tokens.colorNeutralForeground3,
    ...shorthands.borderColor(tokens.colorTransparentStroke),
  },
  'outline-informative': {
    color: tokens.colorNeutralForeground3,
    ...shorthands.borderColor(tokens.colorNeutralStroke2),
  },
  'tint-informative': {
    backgroundColor: tokens.colorNeutralBackground4,
    color: tokens.colorNeutralForeground3,
    ...shorthands.borderColor(tokens.colorNeutralStroke2),
  },
  'ghost-informative': {
    color: tokens.colorNeutralForeground3,
  },
  'filled-subtle': {
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    ...shorthands.borderColor(tokens.colorTransparentStroke),
  },
  'outline-subtle': {
    color: tokens.colorNeutralForegroundInverted,
    ...shorthands.borderColor(tokens.colorNeutralForegroundInverted),
  },
  'tint-subtle': {
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground3,
    ...shorthands.borderColor(tokens.colorNeutralStroke2),
  },
  'ghost-subtle': {
    color: tokens.colorNeutralForegroundInverted,
  },
});

const useIconStyles = makeStyles({
  base: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
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
export const useBadgeStyles = (state: BadgeState): BadgeState => {
  const rootStyles = useRootStyles();

  state.root.className = mergeClasses(
    badgeClassName,
    rootStyles.base,
    rootStyles[state.size],
    rootStyles[state.shape],
    state.shape === 'rounded' &&
      (state.size === 'small' || state.size === 'extra-small' || state.size === 'tiny') &&
      rootStyles.roundedSmallToTiny,
    state.appearance === 'ghost' && rootStyles.ghost,
    rootStyles[`${state.appearance}-${state.color}` as const],
    state.root.className,
  );

  const iconStyles = useIconStyles();
  if (state.icon) {
    state.icon.className = mergeClasses(iconStyles.base, iconStyles[state.size], state.icon.className);
  }

  return state;
};
