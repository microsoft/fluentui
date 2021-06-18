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
    backgroundColor: 'none',
    color: theme.alias.color.red.foreground3,
    borderColor: theme.alias.color.red.foreground3,
  }),
  rootTintDanger: theme => ({
    backgroundColor: theme.alias.color.red.background1,
    color: theme.alias.color.red.foreground1,
    borderColor: theme.alias.color.red.foreground2,
  }),
  rootGhostDanger: theme => ({
    backgroundColor: 'none',
    color: theme.alias.color.red.foreground3,
    border: 'none',
  }),
  rootFilledSevere: theme => ({
    backgroundColor: theme.alias.color.darkOrange.background3,
    color: theme.alias.color.neutral.neutralForegroundInvertedAccessible,
    borderColor: 'none',
  }),
  rootOutlineSevere: theme => ({
    backgroundColor: 'none',
    color: theme.alias.color.darkOrange.foreground3,
    borderColor: theme.alias.color.darkOrange.foreground3,
  }),
  rootTintSevere: theme => ({
    backgroundColor: theme.alias.color.darkOrange.background1,
    color: theme.alias.color.darkOrange.foreground1,
    borderColor: theme.alias.color.darkOrange.foreground2,
  }),
  rootGhostSevere: theme => ({
    backgroundColor: 'none',
    color: theme.alias.color.darkOrange.foreground3,
    border: 'none',
  }),
  rootFilledWarning: theme => ({
    backgroundColor: theme.alias.color.yellow.background3,
    color: theme.alias.color.neutral.neutralForeground1,
    borderColor: theme.alias.color.yellow.background3,
  }),
  rootOutlineWarning: theme => ({
    backgroundColor: 'none',
    color: theme.alias.color.yellow.foreground2,
    borderColor: theme.alias.color.yellow.foreground2,
  }),
  rootTintWarning: theme => ({
    backgroundColor: theme.alias.color.yellow.background1,
    color: theme.alias.color.yellow.foreground2,
    borderColor: theme.alias.color.yellow.background2,
  }),
  rootGhostWarning: theme => ({
    backgroundColor: 'none',
    color: theme.alias.color.yellow.foreground2,
    border: 'none',
  }),
  rootFilledSuccess: theme => ({
    backgroundColor: theme.alias.color.green.background3,
    color: theme.alias.color.neutral.neutralForegroundInvertedAccessible,
    borderColor: 'none',
  }),
  rootOutlineSuccess: theme => ({
    backgroundColor: 'none',
    color: theme.alias.color.green.foreground2,
    borderColor: theme.alias.color.green.foreground2,
  }),
  rootTintSuccess: theme => ({
    backgroundColor: theme.alias.color.green.background1,
    color: theme.alias.color.green.foreground1,
    borderColor: theme.alias.color.green.background2,
  }),
  rootGhostSuccess: theme => ({
    backgroundColor: 'none',
    color: theme.alias.color.green.foreground3,
    border: 'none',
  }),
  rootFilledImportant: theme => ({
    backgroundColor: theme.alias.color.neutral.neutralForeground1,
    color: theme.alias.color.neutral.neutralBackground1,
    borderColor: theme.alias.color.neutral.strokeAccessible,
  }),
  rootOutlineImportant: theme => ({
    backgroundColor: 'none',
    color: theme.alias.color.neutral.neutralForeground1,
    borderColor: theme.alias.color.neutral.neutralForeground1,
  }),
  rootTintImportant: theme => ({
    backgroundColor: theme.alias.color.neutral.neutralForeground3,
    color: theme.alias.color.neutral.neutralBackground1,
    borderColor: theme.alias.color.neutral.strokeAccessible,
  }),
  rootGhostImportant: theme => ({
    backgroundColor: 'none',
    color: theme.alias.color.neutral.neutralForeground1,
    border: 'none',
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
    backgroundColor: 'none',
    color: theme.alias.color.neutral.neutralBackground5,
    border: 'none',
  }),
  rootFilledSubtle: theme => ({
    backgroundColor: theme.alias.color.neutral.neutralBackground1,
    color: theme.alias.color.neutral.neutralForeground1,
    borderColor: theme.alias.color.neutral.strokeAccessible,
  }),
  rootOutlineSubtle: theme => ({
    backgroundColor: 'none',
    color: theme.alias.color.neutral.neutralForegroundInvertedAccessible,
    borderColor: theme.alias.color.neutral.neutralForegroundInvertedAccessible,
  }),
  rootTintSubtle: theme => ({
    backgroundColor: theme.alias.color.neutral.neutralBackground1,
    color: theme.alias.color.neutral.neutralForeground3,
    borderColor: theme.alias.color.neutral.neutralStroke2,
  }),
  rootGhostSubtle: theme => ({
    backgroundColor: 'none',
    color: theme.alias.color.neutral.neutralForegroundInvertedAccessible,
    border: 'none',
  }),
  icon: {
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
});

/**
 * Applies style classnames to slots
 */
export const useBadgeStyles = (state: BadgeState): BadgeState => {
  const styles = useStyles();
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
    state.appearance === 'ghost' && styles.rootGhost,
    state.appearance === 'outline' && styles.rootOutline,
    state.appearance === 'tint' && styles.rootTint,
    state.appearance === 'filled' && state.color === 'danger' && styles.rootFilledDanger,
    state.appearance === 'outline' && state.color === 'danger' && styles.rootOutlineDanger,
    state.appearance === 'tint' && state.color === 'danger' && styles.rootTintDanger,
    state.appearance === 'ghost' && state.color === 'danger' && styles.rootGhostDanger,
    state.appearance === 'filled' && state.color === 'severe' && styles.rootFilledSevere,
    state.appearance === 'outline' && state.color === 'severe' && styles.rootOutlineSevere,
    state.appearance === 'tint' && state.color === 'severe' && styles.rootTintSevere,
    state.appearance === 'ghost' && state.color === 'severe' && styles.rootGhostSevere,
    state.appearance === 'filled' && state.color === 'warning' && styles.rootFilledWarning,
    state.appearance === 'outline' && state.color === 'warning' && styles.rootOutlineWarning,
    state.appearance === 'tint' && state.color === 'warning' && styles.rootTintWarning,
    state.appearance === 'ghost' && state.color === 'warning' && styles.rootGhostWarning,
    state.appearance === 'filled' && state.color === 'success' && styles.rootFilledSuccess,
    state.appearance === 'outline' && state.color === 'success' && styles.rootOutlineSuccess,
    state.appearance === 'tint' && state.color === 'success' && styles.rootTintSuccess,
    state.appearance === 'ghost' && state.color === 'success' && styles.rootGhostSuccess,
    state.appearance === 'filled' && state.color === 'important' && styles.rootFilledImportant,
    state.appearance === 'outline' && state.color === 'important' && styles.rootOutlineImportant,
    state.appearance === 'tint' && state.color === 'important' && styles.rootTintImportant,
    state.appearance === 'ghost' && state.color === 'important' && styles.rootGhostImportant,
    state.appearance === 'filled' && state.color === 'informative' && styles.rootFilledInformative,
    state.appearance === 'outline' && state.color === 'informative' && styles.rootOutlineInformative,
    state.appearance === 'tint' && state.color === 'informative' && styles.rootTintInformative,
    state.appearance === 'ghost' && state.color === 'informative' && styles.rootGhostInformative,
    state.appearance === 'filled' && state.color === 'subtle' && styles.rootFilledSubtle,
    state.appearance === 'outline' && state.color === 'subtle' && styles.rootOutlineSubtle,
    state.appearance === 'tint' && state.color === 'subtle' && styles.rootTintSubtle,
    state.appearance === 'ghost' && state.color === 'subtle' && styles.rootGhostSubtle,
    state.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(styles.icon, state.icon.className);
  }

  return state;
};
