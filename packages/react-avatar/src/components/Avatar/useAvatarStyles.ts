import { ax, makeStyles } from '@fluentui/react-make-styles';
import { GlobalSharedColors, Theme } from '@fluentui/react-theme';
import { AvatarState } from './Avatar.types';

//
// TODO: All animation constants should go to theme or globals?
// https://github.com/microsoft/fluentui/issues/16372#issuecomment-778240665

const animationDuration = {
  duration50: '50ms',
  duration100: '100ms',
  duration150: '150ms',
  duration200: '200ms',
  duration300: '300ms',
  duration400: '400ms',
  duration500: '500ms',
};

const animationTiming = {
  ultraFast: animationDuration.duration50,
  faster: animationDuration.duration100,
  fast: animationDuration.duration150,
  normal: animationDuration.duration200,
  slow: animationDuration.duration300,
  slower: animationDuration.duration400,
  ultraSlow: animationDuration.duration500,
};

const animationLines = {
  decelerateMax: 'cubic-bezier(0.00,0.00,0.00,1.00)',
  decelerateMid: 'cubic-bezier(0.10,0.90,0.20,1.00)',
  decelerateMin: 'cubic-bezier(0.33,0.00,0.10,1.00)',
  accelerateMax: 'cubic-bezier(1.00,0.00,1.00,1.00)',
  accelerateMid: 'cubic-bezier(0.90,0.10,1.00,0.20)',
  accelerateMin: 'cubic-bezier(0.80,0.00,0.78,1.00)',
  maxEasyEase: 'cubic-bezier(0.80,0.00,0.20,1.00)',
  easyEase: 'cubic-bezier(0.33,0.00,0.67,1.00)',
  linear: 'linear',
};

const animations = {
  fastOutSlowInMax: animationLines.decelerateMax,
  fastOutSlowInMid: animationLines.decelerateMid,
  fastOutSlowInMin: animationLines.decelerateMin,
  slowOutFastInMax: animationLines.accelerateMax,
  slowOutFastInMid: animationLines.accelerateMid,
  slowOutFastInMin: animationLines.accelerateMin,
  fastEase: animationLines.maxEasyEase,
  normalEase: animationLines.easyEase,
  nullEasing: animationLines.linear,
};

const iconSize = {
  small: '12px',
  medium: '16px',
  large: '24px',
  larger: '40px',
  largest: '48px',
};

const activeRing = (s: AvatarState) =>
  (s.active === 'active' || s.active === 'inactive') &&
  (!s.activeDisplay ||
    s.activeDisplay === 'ring' ||
    s.activeDisplay === 'ring-glow' ||
    s.activeDisplay === 'ring-shadow');

const activeShadow = (s: AvatarState) =>
  (s.active === 'active' || s.active === 'inactive') &&
  (s.activeDisplay === 'shadow' || s.activeDisplay === 'ring-shadow');

const activeGlow = (s: AvatarState) =>
  (s.active === 'active' || s.active === 'inactive') && (s.activeDisplay === 'glow' || s.activeDisplay === 'ring-glow');

const avatarColor = (theme: Theme, name: keyof GlobalSharedColors) => ({
  color: theme.alias.color[name].foreground2,
  background: theme.alias.color[name].background2,
});

const useStyles = makeStyles({
  root: theme => ({
    display: 'inline-block',
    flexShrink: 0,
    position: 'relative',
    verticalAlign: 'middle',

    borderRadius: theme.global.borderRadius.circular,

    width: '32px',
    height: '32px',

    fontFamily: theme.global.type.fontFamilies.base,
    fontSize: theme.global.type.fontSizes.base[300],
    fontWeight: theme.global.type.fontWeights.semibold,
  }),
  size20: { width: '20px', height: '20px' },
  size24: { width: '24px', height: '24px' },
  size28: { width: '28px', height: '28px' },
  size32: { width: '32px', height: '32px' },
  size36: { width: '36px', height: '36px' },
  size40: { width: '40px', height: '40px' },
  size48: { width: '48px', height: '48px' },
  size56: { width: '56px', height: '56px' },
  size64: { width: '64px', height: '64px' },
  size72: { width: '72px', height: '72px' },
  size96: { width: '96px', height: '96px' },
  size120: { width: '120px', height: '120px' },
  size128: { width: '128px', height: '128px' },
  sizeLessThan28: theme => ({
    fontSize: theme.global.type.fontSizes.base[100],
    fontWeight: theme.global.type.fontWeights.regular,
  }),
  sizeGreaterEqualThan28: theme => ({
    fontSize: theme.global.type.fontSizes.base[200],
    fontWeight: theme.global.type.fontWeights.semibold,
  }),
  sizeGreaterEqualThan32: theme => ({ fontSize: theme.global.type.fontSizes.base[300] }),
  sizeGreaterEqualThan48: theme => ({ fontSize: theme.global.type.fontSizes.base[400] }),
  sizeGreaterEqualThan68: theme => ({ fontSize: theme.global.type.fontSizes.base[500] }),
  sizeGreaterEqualThan120: theme => ({ fontSize: theme.global.type.fontSizes.base[600] }),
  squareSizeLessThan28: theme => ({ borderRadius: theme.global.borderRadius.small }),
  squareSizeGreaterEqualThan28: theme => ({ borderRadius: theme.global.borderRadius.medium }),
  squareSizeGreaterEqualThan56: theme => ({ borderRadius: theme.global.borderRadius.large }),
  squareSizeGreaterEqualThan96: theme => ({ borderRadius: theme.global.borderRadius.xLarge }),

  icon: { fontWeight: 'initial' },
  iconSizeLessThan28: { fontSize: iconSize.small },
  iconSizeGreaterEqualThan28: { fontSize: iconSize.medium },
  iconSizeGreaterEqualThan48: { fontSize: iconSize.large },
  iconSizeGreaterEqualThan96: { fontSize: iconSize.larger },
  iconSizeGreaterEqualThan120: { fontSize: iconSize.largest },

  activeInactive: {
    transform: 'perspective(1px)', // Work-around for text pixel snapping at the end of the animation
    transition:
      `transform ${animationTiming.ultraSlow} ${animations.fastEase}, ` +
      `opacity ${animationTiming.faster} ${animations.nullEasing}`,

    ':before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,

      borderRadius: 'inherit',
      transition:
        `margin ${animationTiming.ultraSlow} ${animations.fastEase}, ` +
        `opacity ${animationTiming.slower} ${animations.nullEasing}`,
    },
  },
  activeRing: theme => ({
    ':before': {
      borderColor: theme.alias.color.brand.brandBackgroundStatic,
      borderStyle: 'solid',
    },
  }),
  activeRingSizeLessThan48: theme => ({
    ':before': {
      margin: `calc(-2 * ${theme.global.strokeWidth.thick})`,
      borderWidth: theme.global.strokeWidth.thick,
    },
  }),
  activeRingSizeGreaterEqualThan48: theme => ({
    ':before': {
      margin: `calc(-2 * ${theme.global.strokeWidth.thicker})`,
      borderWidth: theme.global.strokeWidth.thicker,
    },
  }),
  activeRingSizeGreaterEqualThan72: theme => ({
    ':before': {
      margin: `calc(-2 * ${theme.global.strokeWidth.thickest})`,
      borderWidth: theme.global.strokeWidth.thickest,
    },
  }),
  activeShadowSizeLessThan32: theme => ({ ':before': { boxShadow: theme.alias.shadow.shadow4 } }),
  activeShadowSizeGreaterEqualThan32: theme => ({ ':before': { boxShadow: theme.alias.shadow.shadow8 } }),
  activeShadowSizeGreaterEqualThan48: theme => ({ ':before': { boxShadow: theme.alias.shadow.shadow16 } }),
  activeShadowSizeGreaterEqualThan72: theme => ({ ':before': { boxShadow: theme.alias.shadow.shadow28 } }),
  // TODO: use proper tokens instead of "rgba(0,120,212,0.3)"
  activeGlowSizeLessThan32: theme => ({
    ':before': { boxShadow: `${theme.alias.shadow.shadow4}, 0 0 4px 2px rgba(0,120,212,0.3)` },
  }),
  activeGlowSizeGreaterEqualThan32: theme => ({
    ':before': { boxShadow: `${theme.alias.shadow.shadow8}, 0 0 8px 2px rgba(0,120,212,0.3)` },
  }),
  activeGlowSizeGreaterEqualThan48: theme => ({
    ':before': { boxShadow: `${theme.alias.shadow.shadow16}, 0 0 8px 2px rgba(0,120,212,0.3)` },
  }),
  activeGlowSizeGreaterEqualThan72: theme => ({
    ':before': { boxShadow: `${theme.alias.shadow.shadow28}, 0 0 28px 4px rgba(0,120,212,0.3)` },
  }),
  inactive: {
    opacity: '0.8',
    transform: 'scale(0.875)',
    transition:
      `transform ${animationTiming.ultraSlow} ${animations.fastOutSlowInMin}, ` +
      `opacity ${animationTiming.faster} ${animations.nullEasing}`,

    ':before': {
      margin: 0,
      opacity: 0,
      transition:
        `margin ${animationTiming.ultraSlow} ${animations.fastOutSlowInMin}, ` +
        `opacity ${animationTiming.slower} ${animations.nullEasing}`,
    },
  },
  badge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  badgeSizeLessThan24: { '--badge-size': '5px' },
  badgeSizeGreaterEqualThan24: { '--badge-size': '6px' },
  badgeSizeGreaterEqualThan28: { '--badge-size': '7px' },
  badgeSizeGreaterEqualThan32: { '--badge-size': '8px' },
  badgeSizeGreaterEqualThan36: { '--badge-size': '9px' },
  badgeSizeGreaterEqualThan40: { '--badge-size': '10px' },
  badgeSizeGreaterEqualThan48: { '--badge-size': '12px' },
  badgeSizeGreaterEqualThan56: { '--badge-size': '14px' },
  badgeSizeGreaterEqualThan64: { '--badge-size': '16px' },
  badgeSizeGreaterEqualThan72: { '--badge-size': '18px' },
  badgeSizeGreaterEqualThan96: { '--badge-size': '24px' },
  badgeSizeGreaterEqualThan120: { '--badge-size': '30px' },
  badgeSizeGreaterEqualThan128: { '--badge-size': '32px' },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',

    borderRadius: 'inherit',
    objectFit: 'cover', // TODO:  does not work in IE11
    verticalAlign: 'top',
  },
  label: theme => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'top',
    textAlign: 'center',
    borderRadius: 'inherit',
    boxShadow: `0 0 0 ${theme.global.strokeWidth.thin} ${theme.alias.color.neutral.strokeAccessible} inset`,

    color: theme.alias.color.neutral.neutralForeground3,
    background: theme.alias.color.neutral.neutralBackground6,
  }),
  labelBrand: theme => ({
    color: theme.alias.color.neutral.neutralForegroundInverted,
    background: theme.alias.color.brand.brandBackgroundStatic,
  }),
  labelDarkRed: theme => avatarColor(theme, 'darkRed'),
  labelCranberry: theme => avatarColor(theme, 'cranberry'),
  labelRed: theme => avatarColor(theme, 'red'),
  labelPumpkin: theme => avatarColor(theme, 'pumpkin'),
  labelPeach: theme => avatarColor(theme, 'peach'),
  labelMarigold: theme => avatarColor(theme, 'marigold'),
  labelGold: theme => avatarColor(theme, 'gold'),
  labelBrass: theme => avatarColor(theme, 'brass'),
  labelBrown: theme => avatarColor(theme, 'brown'),
  labelForest: theme => avatarColor(theme, 'forest'),
  labelSeafoam: theme => avatarColor(theme, 'seafoam'),
  labelDarkGreen: theme => avatarColor(theme, 'darkGreen'),
  labelLightTeal: theme => avatarColor(theme, 'lightTeal'),
  labelTeal: theme => avatarColor(theme, 'teal'),
  labelSteel: theme => avatarColor(theme, 'steel'),
  labelBlue: theme => avatarColor(theme, 'blue'),
  labelRoyalBlue: theme => avatarColor(theme, 'royalBlue'),
  labelCornflower: theme => avatarColor(theme, 'cornflower'),
  labelNavy: theme => avatarColor(theme, 'navy'),
  labelLavender: theme => avatarColor(theme, 'lavender'),
  labelPurple: theme => avatarColor(theme, 'purple'),
  labelGrape: theme => avatarColor(theme, 'grape'),
  labelLilac: theme => avatarColor(theme, 'lilac'),
  labelPink: theme => avatarColor(theme, 'pink'),
  labelMagenta: theme => avatarColor(theme, 'magenta'),
  labelPlum: theme => avatarColor(theme, 'plum'),
  labelBeige: theme => avatarColor(theme, 'beige'),
  labelMink: theme => avatarColor(theme, 'mink'),
  labelPlatinum: theme => avatarColor(theme, 'platinum'),
  labelAnchor: theme => avatarColor(theme, 'anchor'),
});

export const useAvatarStyles = (state: AvatarState): AvatarState => {
  const isActiveRing = activeRing(state);
  const isActiveShadow = activeShadow(state);
  const isActiveGlow = activeGlow(state);
  const styles = useStyles();
  state.className = ax(
    styles.root,
    state.size === 20 && styles.size20,
    state.size === 24 && styles.size24,
    state.size === 28 && styles.size28,
    state.size === 32 && styles.size32,
    state.size === 36 && styles.size36,
    state.size === 40 && styles.size40,
    state.size === 48 && styles.size48,
    state.size === 56 && styles.size56,
    state.size === 64 && styles.size64,
    state.size === 72 && styles.size72,
    state.size === 96 && styles.size96,
    state.size === 120 && styles.size120,
    state.size === 128 && styles.size128,
    state.size < 28 && styles.sizeLessThan28,
    state.size >= 28 && styles.sizeGreaterEqualThan28,
    state.size >= 32 && styles.sizeGreaterEqualThan32,
    state.size >= 48 && styles.sizeGreaterEqualThan48,
    state.size >= 68 && styles.sizeGreaterEqualThan68,
    state.size >= 120 && styles.sizeGreaterEqualThan120,
    state.square && state.size < 28 && styles.squareSizeLessThan28,
    state.square && state.size >= 28 && styles.squareSizeGreaterEqualThan28,
    state.square && state.size >= 56 && styles.squareSizeGreaterEqualThan56,
    state.square && state.size >= 96 && styles.squareSizeGreaterEqualThan96,
    state.icon !== undefined && styles.icon,
    state.icon !== undefined && state.size < 28 && styles.iconSizeLessThan28,
    state.icon !== undefined && state.size >= 28 && styles.iconSizeGreaterEqualThan28,
    state.icon !== undefined && state.size >= 48 && styles.iconSizeGreaterEqualThan48,
    state.icon !== undefined && state.size >= 96 && styles.iconSizeGreaterEqualThan96,
    state.icon !== undefined && state.size >= 120 && styles.iconSizeGreaterEqualThan120,
    (state.active === 'active' || state.active === 'inactive') && styles.activeInactive,
    isActiveRing && styles.activeRing,
    isActiveRing && state.size < 48 && styles.activeRingSizeLessThan48,
    isActiveRing && state.size >= 48 && styles.activeRingSizeGreaterEqualThan48,
    isActiveRing && state.size >= 72 && styles.activeRingSizeGreaterEqualThan72,
    isActiveShadow && state.size < 32 && styles.activeShadowSizeLessThan32,
    isActiveShadow && state.size >= 32 && styles.activeShadowSizeGreaterEqualThan32,
    isActiveShadow && state.size >= 48 && styles.activeShadowSizeGreaterEqualThan48,
    isActiveShadow && state.size >= 72 && styles.activeShadowSizeGreaterEqualThan72,
    isActiveGlow && state.size < 32 && styles.activeGlowSizeLessThan32,
    isActiveGlow && state.size >= 32 && styles.activeGlowSizeGreaterEqualThan32,
    isActiveGlow && state.size >= 48 && styles.activeGlowSizeGreaterEqualThan48,
    isActiveGlow && state.size >= 72 && styles.activeGlowSizeGreaterEqualThan72,
    state.active === 'inactive' && styles.inactive,
    state.className,
  );
  state.badge.className = ax(
    styles.badge,
    state.size < 24 && styles.badgeSizeLessThan24,
    state.size >= 24 && styles.badgeSizeGreaterEqualThan24,
    state.size >= 28 && styles.badgeSizeGreaterEqualThan28,
    state.size >= 32 && styles.badgeSizeGreaterEqualThan32,
    state.size >= 36 && styles.badgeSizeGreaterEqualThan36,
    state.size >= 40 && styles.badgeSizeGreaterEqualThan40,
    state.size >= 48 && styles.badgeSizeGreaterEqualThan48,
    state.size >= 56 && styles.badgeSizeGreaterEqualThan56,
    state.size >= 64 && styles.badgeSizeGreaterEqualThan64,
    state.size >= 72 && styles.badgeSizeGreaterEqualThan72,
    state.size >= 96 && styles.badgeSizeGreaterEqualThan96,
    state.size >= 120 && styles.badgeSizeGreaterEqualThan120,
    state.size >= 128 && styles.badgeSizeGreaterEqualThan128,
    state.badge.className,
  );
  state.image.className = ax(styles.image, state.image.className);
  state.label.className = ax(
    styles.label,
    state.color === 'brand' && styles.labelBrand,
    state.color === 'darkRed' && styles.labelDarkRed,
    state.color === 'cranberry' && styles.labelCranberry,
    state.color === 'red' && styles.labelRed,
    state.color === 'pumpkin' && styles.labelPumpkin,
    state.color === 'peach' && styles.labelPeach,
    state.color === 'marigold' && styles.labelMarigold,
    state.color === 'gold' && styles.labelGold,
    state.color === 'brass' && styles.labelBrass,
    state.color === 'brown' && styles.labelBrown,
    state.color === 'forest' && styles.labelForest,
    state.color === 'seafoam' && styles.labelSeafoam,
    state.color === 'darkGreen' && styles.labelDarkGreen,
    state.color === 'lightTeal' && styles.labelLightTeal,
    state.color === 'teal' && styles.labelTeal,
    state.color === 'steel' && styles.labelSteel,
    state.color === 'blue' && styles.labelBlue,
    state.color === 'royalBlue' && styles.labelRoyalBlue,
    state.color === 'cornflower' && styles.labelCornflower,
    state.color === 'navy' && styles.labelNavy,
    state.color === 'lavender' && styles.labelLavender,
    state.color === 'purple' && styles.labelPurple,
    state.color === 'grape' && styles.labelGrape,
    state.color === 'lilac' && styles.labelLilac,
    state.color === 'pink' && styles.labelPink,
    state.color === 'magenta' && styles.labelMagenta,
    state.color === 'plum' && styles.labelPlum,
    state.color === 'beige' && styles.labelBeige,
    state.color === 'mink' && styles.labelMink,
    state.color === 'platinum' && styles.labelPlatinum,
    state.color === 'anchor' && styles.labelAnchor,
    state.label.className,
  );
  return state;
};
