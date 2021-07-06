import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import { BadgeState } from './Badge.types';

const useStyles = makeStyles({
  root: theme => ({
    display: 'inline-flex',
    boxSizing: 'border-box',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.alias.color.neutral.brandBackground,
    borderColor: theme.alias.color.neutral.brandBackground,
    color: theme.alias.color.neutral.neutralForegroundInvertedAccessible,
    fontWeight: theme.global.type.fontWeights.semibold,
    borderWidth: theme.global.strokeWidth.thin,
    borderStyle: 'solid',
    fontFamily: theme.global.type.fontFamilies.base,
    position: 'relative',
  }),
  rootSmallest: {
    width: '6px',
    height: '6px',
    fontSize: '4px',
  },
  rootSmaller: {
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
  rootLargerLargest: theme => ({
    minWidth: '32px',
    height: '32px',
    paddingRight: '12px',
    paddingLeft: '12px',
    gap: '6px',
    fontSize: '12px',
    borderWidth: theme.global.strokeWidth.thick,
  }),
  rootRounded: theme => ({ borderRadius: theme.global.borderRadius.medium }),
  rootRoundedSmallSmallerSmallest: theme => ({ borderRadius: theme.global.borderRadius.small }),
  rootCircular: { borderRadius: '99px' },
  rootGhost: theme => ({
    background: 'transparent',
    border: 'none',
    color: theme.alias.color.neutral.brandBackground,
  }),
  rootOutline: theme => ({
    background: 'transparent',
    borderColor: theme.alias.color.neutral.brandBackground,
    color: theme.alias.color.neutral.brandBackground,
  }),
  rootTint: theme => ({
    backgroundColor: theme.global.palette.brand.tint60,
    color: theme.global.palette.brand.shade40,
    borderColor: 'none',
  }),
  rootFilledDanger: theme => ({
    backgroundColor: theme.alias.color.red.background3,
    color: theme.alias.color.neutral.neutralForegroundInvertedAccessible,
    borderColor: theme.alias.color.red.background3,
  }),
  rootOutlineDanger: theme => ({
    color: theme.alias.color.red.foreground3,
    borderColor: theme.alias.color.red.foreground3,
  }),
  rootTintDanger: theme => ({
    backgroundColor: theme.alias.color.red.background1,
    color: theme.alias.color.red.foreground1,
    borderColor: theme.alias.color.red.foreground2,
  }),
  rootGhostDanger: theme => ({
    color: theme.alias.color.red.foreground3,
  }),
  rootFilledSevere: theme => ({
    backgroundColor: theme.alias.color.darkOrange.background3,
    color: theme.alias.color.neutral.neutralForegroundInvertedAccessible,
    borderColor: 'none',
  }),
  rootOutlineSevere: theme => ({
    color: theme.alias.color.darkOrange.foreground3,
    borderColor: theme.alias.color.darkOrange.foreground3,
  }),
  rootTintSevere: theme => ({
    backgroundColor: theme.alias.color.darkOrange.background1,
    color: theme.alias.color.darkOrange.foreground1,
    borderColor: theme.alias.color.darkOrange.foreground2,
  }),
  rootGhostSevere: theme => ({
    color: theme.alias.color.darkOrange.foreground3,
  }),
  rootFilledWarning: theme => ({
    backgroundColor: theme.alias.color.yellow.background3,
    color: theme.alias.color.neutral.neutralForeground1,
    borderColor: theme.alias.color.yellow.background3,
  }),
  rootOutlineWarning: theme => ({
    color: theme.alias.color.yellow.foreground2,
    borderColor: theme.alias.color.yellow.foreground2,
  }),
  rootTintWarning: theme => ({
    backgroundColor: theme.alias.color.yellow.background1,
    color: theme.alias.color.yellow.foreground2,
    borderColor: theme.alias.color.yellow.background2,
  }),
  rootGhostWarning: theme => ({
    color: theme.alias.color.yellow.foreground2,
  }),
  rootFilledSuccess: theme => ({
    backgroundColor: theme.alias.color.green.background3,
    color: theme.alias.color.neutral.neutralForegroundInvertedAccessible,
    borderColor: 'none',
  }),
  rootOutlineSuccess: theme => ({
    color: theme.alias.color.green.foreground2,
    borderColor: theme.alias.color.green.foreground2,
  }),
  rootTintSuccess: theme => ({
    backgroundColor: theme.alias.color.green.background1,
    color: theme.alias.color.green.foreground1,
    borderColor: theme.alias.color.green.background2,
  }),
  rootGhostSuccess: theme => ({
    color: theme.alias.color.green.foreground3,
  }),
  rootFilledImportant: theme => ({
    backgroundColor: theme.alias.color.neutral.neutralForeground1,
    color: theme.alias.color.neutral.neutralBackground1,
    borderColor: theme.alias.color.neutral.strokeAccessible,
  }),
  rootOutlineImportant: theme => ({
    color: theme.alias.color.neutral.neutralForeground1,
    borderColor: theme.alias.color.neutral.neutralForeground1,
  }),
  rootTintImportant: theme => ({
    backgroundColor: theme.alias.color.neutral.neutralForeground3,
    color: theme.alias.color.neutral.neutralBackground1,
    borderColor: theme.alias.color.neutral.strokeAccessible,
  }),
  rootGhostImportant: theme => ({
    color: theme.alias.color.neutral.neutralForeground1,
  }),
  rootFilledInformative: theme => ({
    backgroundColor: theme.alias.color.neutral.neutralBackground5,
    color: theme.alias.color.neutral.neutralForeground3,
    borderColor: theme.alias.color.neutral.strokeAccessible,
  }),
  rootOutlineInformative: theme => ({
    backgroundColor: theme.alias.color.darkOrange.background3,
    color: theme.alias.color.neutral.neutralBackground5,
    borderColor: theme.alias.color.neutral.neutralBackground5,
  }),
  rootTintInformative: theme => ({
    backgroundColor: theme.alias.color.neutral.neutralBackground4,
    color: theme.alias.color.neutral.neutralForeground3,
    borderColor: theme.alias.color.neutral.neutralStroke2,
  }),
  rootGhostInformative: theme => ({
    color: theme.alias.color.neutral.neutralBackground5,
  }),
  rootFilledSubtle: theme => ({
    backgroundColor: theme.alias.color.neutral.neutralBackground1,
    color: theme.alias.color.neutral.neutralForeground1,
    borderColor: theme.alias.color.neutral.strokeAccessible,
  }),
  rootOutlineSubtle: theme => ({
    color: theme.alias.color.neutral.neutralForegroundInvertedAccessible,
    borderColor: theme.alias.color.neutral.neutralForegroundInvertedAccessible,
  }),
  rootTintSubtle: theme => ({
    backgroundColor: theme.alias.color.neutral.neutralBackground1,
    color: theme.alias.color.neutral.neutralForeground3,
    borderColor: theme.alias.color.neutral.neutralStroke2,
  }),
  rootGhostSubtle: theme => ({
    color: theme.alias.color.neutral.neutralForegroundInvertedAccessible,
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

  state.className = mergeClasses(
    styles.root,
    state.size === 'smallest' && styles.rootSmallest,
    state.size === 'smaller' && styles.rootSmaller,
    state.size === 'small' && styles.rootSmall,
    state.size === 'medium' && styles.rootMedium,
    state.size === 'large' && styles.rootLarge,
    (state.size === 'larger' || state.size === 'largest') && styles.rootLargerLargest,
    state.shape === 'circular' && styles.rootCircular,
    state.shape === 'rounded' && styles.rootRounded,
    state.shape === 'rounded' &&
      (state.size === 'small' || state.size === 'smaller' || state.size === 'smallest') &&
      styles.rootRoundedSmallSmallerSmallest,
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
    state.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(styles.icon, state.icon.className);
  }

  return state;
};
