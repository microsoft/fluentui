import { shorthands, mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import type { BadgeState } from './Badge.types';

export const badgeClassName = 'fui-Badge';

const useStyles = makeStyles({
  root: theme => ({
    display: 'inline-flex',
    boxSizing: 'border-box',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colorBrandBackground,
    ...shorthands.borderColor(theme.colorBrandBackground),
    color: theme.colorNeutralForegroundOnBrand,
    fontWeight: theme.fontWeightSemibold,
    ...shorthands.borderWidth(theme.strokeWidthThin),
    ...shorthands.borderStyle('solid'),
    fontFamily: theme.fontFamilyBase,
    position: 'relative',
  }),
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
    paddingRight: '6px',
    paddingLeft: '6px',
    ...shorthands.gap('4px'),
    fontSize: '8px',
  },
  rootMedium: {
    height: '20px',
    minWidth: '20px',
    ...shorthands.gap('4px'),
    paddingRight: '8px',
    paddingLeft: '8px',
    fontSize: '10px',
  },
  rootLarge: {
    minWidth: '24px',
    height: '24px',
    paddingRight: '8px',
    paddingLeft: '8px',
    fontSize: '12px',
    ...shorthands.gap('6px'),
  },
  rootExtraLarge: theme => ({
    minWidth: '32px',
    height: '32px',
    paddingRight: '12px',
    paddingLeft: '12px',
    ...shorthands.gap('6px'),
    fontSize: '12px',
    ...shorthands.borderWidth(theme.strokeWidthThick),
  }),
  rootRounded: theme => ({
    ...shorthands.borderRadius(theme.borderRadiusMedium),
  }),
  rootRoundedSmallToTiny: theme => ({
    ...shorthands.borderRadius(theme.borderRadiusSmall),
  }),
  rootCircular: {
    ...shorthands.borderRadius('99px'),
  },
  rootGhost: theme => ({
    backgroundColor: 'transparent',
    ...shorthands.borderStyle('none'),
    color: theme.colorBrandBackground,
  }),
  rootOutline: theme => ({
    backgroundColor: 'transparent',
    ...shorthands.borderColor(theme.colorBrandBackground),
    color: theme.colorBrandBackground,
  }),
  rootTint: theme => ({
    backgroundColor: theme.colorBrandBackground2,
    color: theme.colorBrandForeground2,
    ...shorthands.borderColor(theme.colorBrandStroke2),
  }),
  rootFilledDanger: theme => ({
    backgroundColor: theme.colorPaletteRedBackground3,
    color: theme.colorNeutralForegroundOnBrand,
    ...shorthands.borderColor(theme.colorPaletteRedBackground3),
  }),
  rootOutlineDanger: theme => ({
    color: theme.colorPaletteRedForeground3,
    ...shorthands.borderColor(theme.colorPaletteRedForeground3),
  }),
  rootTintDanger: theme => ({
    backgroundColor: theme.colorPaletteRedBackground1,
    color: theme.colorPaletteRedForeground1,
    ...shorthands.borderColor(theme.colorPaletteRedForeground2),
  }),
  rootGhostDanger: theme => ({
    color: theme.colorPaletteRedForeground3,
  }),
  rootFilledSevere: theme => ({
    backgroundColor: theme.colorPaletteDarkOrangeBackground3,
    color: theme.colorNeutralForegroundOnBrand,
    ...shorthands.borderColor(theme.colorTransparentStroke),
  }),
  rootOutlineSevere: theme => ({
    color: theme.colorPaletteDarkOrangeForeground3,
    ...shorthands.borderColor(theme.colorPaletteDarkOrangeForeground3),
  }),
  rootTintSevere: theme => ({
    backgroundColor: theme.colorPaletteDarkOrangeBackground1,
    color: theme.colorPaletteDarkOrangeForeground1,
    ...shorthands.borderColor(theme.colorPaletteDarkOrangeForeground2),
  }),
  rootGhostSevere: theme => ({
    color: theme.colorPaletteDarkOrangeForeground3,
  }),
  rootFilledWarning: theme => ({
    backgroundColor: theme.colorPaletteYellowBackground3,
    color: theme.colorNeutralForeground1,
    ...shorthands.borderColor(theme.colorPaletteYellowBackground3),
  }),
  rootOutlineWarning: theme => ({
    color: theme.colorPaletteYellowForeground2,
    ...shorthands.borderColor(theme.colorPaletteYellowForeground2),
  }),
  rootTintWarning: theme => ({
    backgroundColor: theme.colorPaletteYellowBackground1,
    color: theme.colorPaletteYellowForeground2,
    ...shorthands.borderColor(theme.colorPaletteYellowBackground2),
  }),
  rootGhostWarning: theme => ({
    color: theme.colorPaletteYellowForeground2,
  }),
  rootFilledSuccess: theme => ({
    backgroundColor: theme.colorPaletteGreenBackground3,
    color: theme.colorNeutralForegroundOnBrand,
    ...shorthands.borderColor(theme.colorTransparentStroke),
  }),
  rootOutlineSuccess: theme => ({
    color: theme.colorPaletteGreenForeground2,
    ...shorthands.borderColor(theme.colorPaletteGreenForeground2),
  }),
  rootTintSuccess: theme => ({
    backgroundColor: theme.colorPaletteGreenBackground1,
    color: theme.colorPaletteGreenForeground1,
    ...shorthands.borderColor(theme.colorPaletteGreenBackground2),
  }),
  rootGhostSuccess: theme => ({
    color: theme.colorPaletteGreenForeground3,
  }),
  rootFilledImportant: theme => ({
    backgroundColor: theme.colorNeutralForeground1,
    color: theme.colorNeutralBackground1,
    ...shorthands.borderColor(theme.colorTransparentStroke),
  }),
  rootOutlineImportant: theme => ({
    color: theme.colorNeutralForeground3,
    ...shorthands.borderColor(theme.colorNeutralStrokeAccessible),
  }),
  rootTintImportant: theme => ({
    backgroundColor: theme.colorNeutralForeground3,
    color: theme.colorNeutralBackground1,
    ...shorthands.borderColor(theme.colorTransparentStroke),
  }),
  rootGhostImportant: theme => ({
    color: theme.colorNeutralForeground1,
  }),
  rootFilledInformative: theme => ({
    backgroundColor: theme.colorNeutralBackground5,
    color: theme.colorNeutralForeground3,
    ...shorthands.borderColor(theme.colorTransparentStroke),
  }),
  rootOutlineInformative: theme => ({
    color: theme.colorNeutralForeground3,
    ...shorthands.borderColor(theme.colorNeutralStroke2),
  }),
  rootTintInformative: theme => ({
    backgroundColor: theme.colorNeutralBackground4,
    color: theme.colorNeutralForeground3,
    ...shorthands.borderColor(theme.colorNeutralStroke2),
  }),
  rootGhostInformative: theme => ({
    color: theme.colorNeutralForeground3,
  }),
  rootFilledSubtle: theme => ({
    backgroundColor: theme.colorNeutralBackground1,
    color: theme.colorNeutralForeground1,
    ...shorthands.borderColor(theme.colorTransparentStroke),
  }),
  rootOutlineSubtle: theme => ({
    color: theme.colorNeutralForegroundInverted,
    ...shorthands.borderColor(theme.colorNeutralForegroundInverted),
  }),
  rootTintSubtle: theme => ({
    backgroundColor: theme.colorNeutralBackground1,
    color: theme.colorNeutralForeground3,
    ...shorthands.borderColor(theme.colorNeutralStroke2),
  }),
  rootGhostSubtle: theme => ({
    color: theme.colorNeutralForegroundInverted,
  }),
  icon: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});

/**
 * Applies style classnames to slots
 */
export const useBadgeStyles = (state: BadgeState): BadgeState => {
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
    state.icon.className = mergeClasses(styles.icon, state.icon.className);
  }

  return state;
};
