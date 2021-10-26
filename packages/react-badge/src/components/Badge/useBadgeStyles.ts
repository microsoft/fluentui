import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import type { BadgeState } from './Badge.types';

const useStyles = makeStyles({
  root: theme => ({
    display: 'inline-flex',
    boxSizing: 'border-box',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colorBrandBackground,
    borderColor: theme.colorBrandBackground,
    color: theme.colorNeutralForegroundOnBrand,
    fontWeight: theme.fontWeightSemibold,
    borderWidth: theme.strokeWidthThin,
    borderStyle: 'solid',
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
    gap: '4px',
    fontSize: '8px',
  },
  rootMedium: {
    height: '20px',
    minWidth: '20px',
    gap: '4px',
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
    gap: '6px',
  },
  rootExtraLarge: theme => ({
    minWidth: '32px',
    height: '32px',
    paddingRight: '12px',
    paddingLeft: '12px',
    gap: '6px',
    fontSize: '12px',
    borderWidth: theme.strokeWidthThick,
  }),
  rootRounded: theme => ({ borderRadius: theme.borderRadiusMedium }),
  rootRoundedSmallToTiny: theme => ({ borderRadius: theme.borderRadiusSmall }),
  rootCircular: { borderRadius: '99px' },
  rootGhost: theme => ({
    background: 'transparent',
    border: 'none',
    color: theme.colorBrandBackground,
  }),
  rootOutline: theme => ({
    background: 'transparent',
    borderColor: theme.colorBrandBackground,
    color: theme.colorBrandBackground,
  }),
  rootTint: theme => ({
    backgroundColor: theme.colorBrandBackground2,
    color: theme.colorBrandForeground2,
    borderColor: 'none',
  }),
  rootFilledDanger: theme => ({
    backgroundColor: theme.colorPaletteRedBackground3,
    color: theme.colorNeutralForegroundOnBrand,
    borderColor: theme.colorPaletteRedBackground3,
  }),
  rootOutlineDanger: theme => ({
    color: theme.colorPaletteRedForeground3,
    borderColor: theme.colorPaletteRedForeground3,
  }),
  rootTintDanger: theme => ({
    backgroundColor: theme.colorPaletteRedBackground1,
    color: theme.colorPaletteRedForeground1,
    borderColor: theme.colorPaletteRedForeground2,
  }),
  rootGhostDanger: theme => ({
    color: theme.colorPaletteRedForeground3,
  }),
  rootFilledSevere: theme => ({
    backgroundColor: theme.colorPaletteDarkOrangeBackground3,
    color: theme.colorNeutralForegroundOnBrand,
    borderColor: 'none',
  }),
  rootOutlineSevere: theme => ({
    color: theme.colorPaletteDarkOrangeForeground3,
    borderColor: theme.colorPaletteDarkOrangeForeground3,
  }),
  rootTintSevere: theme => ({
    backgroundColor: theme.colorPaletteDarkOrangeBackground1,
    color: theme.colorPaletteDarkOrangeForeground1,
    borderColor: theme.colorPaletteDarkOrangeForeground2,
  }),
  rootGhostSevere: theme => ({
    color: theme.colorPaletteDarkOrangeForeground3,
  }),
  rootFilledWarning: theme => ({
    backgroundColor: theme.colorPaletteYellowBackground3,
    color: theme.colorNeutralForeground1,
    borderColor: theme.colorPaletteYellowBackground3,
  }),
  rootOutlineWarning: theme => ({
    color: theme.colorPaletteYellowForeground2,
    borderColor: theme.colorPaletteYellowForeground2,
  }),
  rootTintWarning: theme => ({
    backgroundColor: theme.colorPaletteYellowBackground1,
    color: theme.colorPaletteYellowForeground2,
    borderColor: theme.colorPaletteYellowBackground2,
  }),
  rootGhostWarning: theme => ({
    color: theme.colorPaletteYellowForeground2,
  }),
  rootFilledSuccess: theme => ({
    backgroundColor: theme.colorPaletteGreenBackground3,
    color: theme.colorNeutralForegroundOnBrand,
    borderColor: 'none',
  }),
  rootOutlineSuccess: theme => ({
    color: theme.colorPaletteGreenForeground2,
    borderColor: theme.colorPaletteGreenForeground2,
  }),
  rootTintSuccess: theme => ({
    backgroundColor: theme.colorPaletteGreenBackground1,
    color: theme.colorPaletteGreenForeground1,
    borderColor: theme.colorPaletteGreenBackground2,
  }),
  rootGhostSuccess: theme => ({
    color: theme.colorPaletteGreenForeground3,
  }),
  rootFilledImportant: theme => ({
    backgroundColor: theme.colorNeutralForeground1,
    color: theme.colorNeutralBackground1,
    borderColor: theme.colorTransparentStroke,
  }),
  rootOutlineImportant: theme => ({
    color: theme.colorNeutralForeground1,
    borderColor: theme.colorNeutralForeground1,
  }),
  rootTintImportant: theme => ({
    backgroundColor: theme.colorNeutralForeground3,
    color: theme.colorNeutralBackground1,
    borderColor: theme.colorTransparentStroke,
  }),
  rootGhostImportant: theme => ({
    color: theme.colorNeutralForeground1,
  }),
  rootFilledInformative: theme => ({
    backgroundColor: theme.colorNeutralBackground5,
    color: theme.colorNeutralForeground3,
    borderColor: theme.colorTransparentStroke,
  }),
  rootOutlineInformative: theme => ({
    backgroundColor: theme.colorPaletteDarkOrangeBackground3,
    color: theme.colorNeutralBackground5,
    borderColor: theme.colorNeutralBackground5,
  }),
  rootTintInformative: theme => ({
    backgroundColor: theme.colorNeutralBackground4,
    color: theme.colorNeutralForeground3,
    borderColor: theme.colorNeutralStroke2,
  }),
  rootGhostInformative: theme => ({
    color: theme.colorNeutralBackground5,
  }),
  rootFilledSubtle: theme => ({
    backgroundColor: theme.colorNeutralBackground1,
    color: theme.colorNeutralForeground1,
    borderColor: theme.colorTransparentStroke,
  }),
  rootOutlineSubtle: theme => ({
    color: theme.colorNeutralForegroundOnBrand,
    borderColor: theme.colorNeutralForegroundOnBrand,
  }),
  rootTintSubtle: theme => ({
    backgroundColor: theme.colorNeutralBackground1,
    color: theme.colorNeutralForeground3,
    borderColor: theme.colorNeutralStroke2,
  }),
  rootGhostSubtle: theme => ({
    color: theme.colorNeutralForegroundOnBrand,
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
