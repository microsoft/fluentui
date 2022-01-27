import { shorthands, mergeClasses, makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { BadgeState } from './Badge.types';

export const badgeClassName = 'fui-Badge';

const useStyles = makeStyles({
  root: {
    display: 'inline-flex',
    boxSizing: 'border-box',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tokens.colorBrandBackground,
    ...shorthands.borderColor(tokens.colorBrandBackground),
    color: tokens.colorNeutralForegroundOnBrand,
    fontWeight: tokens.fontWeightSemibold,
    ...shorthands.borderWidth(tokens.strokeWidthThin),
    ...shorthands.borderStyle('solid'),
    fontFamily: tokens.fontFamilyBase,
    position: 'relative',
  },
  rootTiny: {
    width: '6px',
    height: '6px',
    fontSize: '4px',
  },
  rootExtraSmall: {
    width: '10px',
    height: '10px',
    fontSize: '6px',
  },
  rootSmall: {
    minWidth: '16px',
    height: '16px',
    ...shorthands.padding('2px'),
    ...shorthands.gap('4px'),
    fontSize: '8px',
  },
  rootMedium: {
    height: '20px',
    minWidth: '20px',
    ...shorthands.gap('4px'),
    ...shorthands.padding('4px'),
    fontSize: '10px',
  },
  rootLarge: {
    minWidth: '24px',
    height: '24px',
    ...shorthands.padding('4px'),
    fontSize: '12px',
    ...shorthands.gap('4px'),
  },
  rootExtraLarge: {
    minWidth: '32px',
    height: '32px',
    ...shorthands.padding('6px'),
    ...shorthands.gap('6px'),
    fontSize: '12px',
    ...shorthands.borderWidth(tokens.strokeWidthThick),
  },
  rootRounded: {
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  rootRoundedSmallToTiny: {
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
  },
  rootCircular: {
    ...shorthands.borderRadius('99px'),
  },
  rootGhost: {
    backgroundColor: 'transparent',
    ...shorthands.borderStyle('none'),
    color: tokens.colorBrandBackground,
  },
  rootOutline: {
    backgroundColor: 'transparent',
    ...shorthands.borderColor(tokens.colorBrandBackground),
    color: tokens.colorBrandBackground,
  },
  rootTint: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
    ...shorthands.borderColor(tokens.colorBrandStroke2),
  },
  rootFilledDanger: {
    backgroundColor: tokens.colorPaletteRedBackground3,
    color: tokens.colorNeutralForegroundOnBrand,
    ...shorthands.borderColor(tokens.colorPaletteRedBackground3),
  },
  rootOutlineDanger: {
    color: tokens.colorPaletteRedForeground3,
    ...shorthands.borderColor(tokens.colorPaletteRedForeground3),
  },
  rootTintDanger: {
    backgroundColor: tokens.colorPaletteRedBackground1,
    color: tokens.colorPaletteRedForeground1,
    ...shorthands.borderColor(tokens.colorPaletteRedBorder1),
  },
  rootGhostDanger: {
    color: tokens.colorPaletteRedForeground3,
  },
  rootFilledSevere: {
    backgroundColor: tokens.colorPaletteDarkOrangeBackground3,
    color: tokens.colorNeutralForegroundOnBrand,
    ...shorthands.borderColor(tokens.colorTransparentStroke),
  },
  rootOutlineSevere: {
    color: tokens.colorPaletteDarkOrangeForeground3,
    ...shorthands.borderColor(tokens.colorPaletteDarkOrangeForeground3),
  },
  rootTintSevere: {
    backgroundColor: tokens.colorPaletteDarkOrangeBackground1,
    color: tokens.colorPaletteDarkOrangeForeground1,
    ...shorthands.borderColor(tokens.colorPaletteDarkOrangeForeground2),
  },
  rootGhostSevere: {
    color: tokens.colorPaletteDarkOrangeForeground3,
  },
  rootFilledWarning: {
    backgroundColor: tokens.colorPaletteYellowBackground3,
    color: tokens.colorNeutralForeground1,
    ...shorthands.borderColor(tokens.colorPaletteYellowBackground3),
  },
  rootOutlineWarning: {
    color: tokens.colorPaletteYellowForeground2,
    ...shorthands.borderColor(tokens.colorPaletteYellowForeground2),
  },
  rootTintWarning: {
    backgroundColor: tokens.colorPaletteYellowBackground1,
    color: tokens.colorPaletteYellowForeground2,
    ...shorthands.borderColor(tokens.colorPaletteYellowBackground2),
  },
  rootGhostWarning: {
    color: tokens.colorPaletteYellowForeground2,
  },
  rootFilledSuccess: {
    backgroundColor: tokens.colorPaletteGreenBackground3,
    color: tokens.colorNeutralForegroundOnBrand,
    ...shorthands.borderColor(tokens.colorTransparentStroke),
  },
  rootOutlineSuccess: {
    color: tokens.colorPaletteGreenForeground2,
    ...shorthands.borderColor(tokens.colorPaletteGreenForeground2),
  },
  rootTintSuccess: {
    backgroundColor: tokens.colorPaletteGreenBackground1,
    color: tokens.colorPaletteGreenForeground1,
    ...shorthands.borderColor(tokens.colorPaletteGreenBackground2),
  },
  rootGhostSuccess: {
    color: tokens.colorPaletteGreenForeground3,
  },
  rootFilledImportant: {
    backgroundColor: tokens.colorNeutralForeground1,
    color: tokens.colorNeutralBackground1,
    ...shorthands.borderColor(tokens.colorTransparentStroke),
  },
  rootOutlineImportant: {
    color: tokens.colorNeutralForeground3,
    ...shorthands.borderColor(tokens.colorNeutralStrokeAccessible),
  },
  rootTintImportant: {
    backgroundColor: tokens.colorNeutralForeground3,
    color: tokens.colorNeutralBackground1,
    ...shorthands.borderColor(tokens.colorTransparentStroke),
  },
  rootGhostImportant: {
    color: tokens.colorNeutralForeground1,
  },
  rootFilledInformative: {
    backgroundColor: tokens.colorNeutralBackground5,
    color: tokens.colorNeutralForeground3,
    ...shorthands.borderColor(tokens.colorTransparentStroke),
  },
  rootOutlineInformative: {
    color: tokens.colorNeutralForeground3,
    ...shorthands.borderColor(tokens.colorNeutralStroke2),
  },
  rootTintInformative: {
    backgroundColor: tokens.colorNeutralBackground4,
    color: tokens.colorNeutralForeground3,
    ...shorthands.borderColor(tokens.colorNeutralStroke2),
  },
  rootGhostInformative: {
    color: tokens.colorNeutralForeground3,
  },
  rootFilledSubtle: {
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    ...shorthands.borderColor(tokens.colorTransparentStroke),
  },
  rootOutlineSubtle: {
    color: tokens.colorNeutralForegroundInverted,
    ...shorthands.borderColor(tokens.colorNeutralForegroundInverted),
  },
  rootTintSubtle: {
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground3,
    ...shorthands.borderColor(tokens.colorNeutralStroke2),
  },
  rootGhostSubtle: {
    color: tokens.colorNeutralForegroundInverted,
  },
  icon: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  iconTiny: {
    fontSize: '6px',
  },
  iconExtraSmall: {
    fontSize: '10px',
  },
  iconSmall: {
    fontSize: '12px',
  },
  iconMedium: {
    fontSize: '12px',
  },
  iconLarge: {
    fontSize: '16px',
  },
  iconExtraLarge: {
    fontSize: '20px',
  },
});

/**
 * Applies style classnames to slots
 */
export const useBadgeStyles_unstable = (state: BadgeState): BadgeState => {
  const styles = useStyles();
  const isGhost = state.appearance === 'ghost';
  const isOutline = state.appearance === 'outline';
  const isTint = state.appearance === 'tint';
  const isFilled = state.appearance === 'filled';
  const isDanger = state.color === 'danger';
  const isSevere = state.color === 'severe';
  const isWarning = state.color === 'warning';
  const isSuccess = state.color === 'success';
  const isImportant = state.color === 'important';
  const isInformative = state.color === 'informative';
  const isSubtle = state.color === 'subtle';

  state.root.className = mergeClasses(
    badgeClassName,
    styles.root,
    state.size === 'tiny' && styles.rootTiny,
    state.size === 'extra-small' && styles.rootExtraSmall,
    state.size === 'small' && styles.rootSmall,
    state.size === 'medium' && styles.rootMedium,
    state.size === 'large' && styles.rootLarge,
    state.size === 'extra-large' && styles.rootExtraLarge,
    state.shape === 'circular' && styles.rootCircular,
    state.shape === 'rounded' && styles.rootRounded,
    state.shape === 'rounded' &&
      (state.size === 'small' || state.size === 'extra-small' || state.size === 'tiny') &&
      styles.rootRoundedSmallToTiny,
    isGhost && styles.rootGhost,
    isOutline && styles.rootOutline,
    isTint && styles.rootTint,
    isFilled && isDanger && styles.rootFilledDanger,
    isOutline && isDanger && styles.rootOutlineDanger,
    isTint && isDanger && styles.rootTintDanger,
    isGhost && isDanger && styles.rootGhostDanger,
    isFilled && isSevere && styles.rootFilledSevere,
    isOutline && isSevere && styles.rootOutlineSevere,
    isTint && isSevere && styles.rootTintSevere,
    isGhost && isSevere && styles.rootGhostSevere,
    isFilled && isWarning && styles.rootFilledWarning,
    isOutline && isWarning && styles.rootOutlineWarning,
    isTint && isWarning && styles.rootTintWarning,
    isGhost && isWarning && styles.rootGhostWarning,
    isFilled && isSuccess && styles.rootFilledSuccess,
    isOutline && isSuccess && styles.rootOutlineSuccess,
    isTint && isSuccess && styles.rootTintSuccess,
    isGhost && isSuccess && styles.rootGhostSuccess,
    isFilled && isImportant && styles.rootFilledImportant,
    isOutline && isImportant && styles.rootOutlineImportant,
    isTint && isImportant && styles.rootTintImportant,
    isGhost && isImportant && styles.rootGhostImportant,
    isFilled && isInformative && styles.rootFilledInformative,
    isOutline && isInformative && styles.rootOutlineInformative,
    isTint && isInformative && styles.rootTintInformative,
    isGhost && isInformative && styles.rootGhostInformative,
    isFilled && isSubtle && styles.rootFilledSubtle,
    isOutline && isSubtle && styles.rootOutlineSubtle,
    isTint && isSubtle && styles.rootTintSubtle,
    isGhost && isSubtle && styles.rootGhostSubtle,
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      styles.icon,
      state.size === 'tiny' && styles.iconTiny,
      state.size === 'extra-small' && styles.iconExtraSmall,
      state.size === 'small' && styles.iconSmall,
      state.size === 'medium' && styles.iconMedium,
      state.size === 'large' && styles.iconLarge,
      state.size === 'extra-large' && styles.iconExtraLarge,
      state.icon.className,
    );
  }

  return state;
};
