import { ax, makeOverrides } from '@fluentui/react-make-styles';
import { AvatarState, defaultAvatarSize } from './Avatar.types';

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

const useStyles = makeOverrides({
  root: tokens => ({
    display: 'inline-block',
    flexShrink: 0,
    position: 'relative',
    verticalAlign: 'middle',

    borderRadius: tokens.global.borderRadius.circular,

    width: `${defaultAvatarSize}px`,
    height: `${defaultAvatarSize}px`,

    fontFamily: tokens.global.type.fontFamilies.base,
    fontSize: tokens.global.type.fontSizes.base[300],
    fontWeight: tokens.global.type.fontWeights.semibold,
  }),

  rootShape20: { width: '20px', height: '20px' },
  rootShape24: { width: '24px', height: '24px' },
  rootShape28: { width: '28px', height: '28px' },
  rootShape32: { width: '32px', height: '32px' },
  rootShape36: { width: '36px', height: '36px' },
  rootShape40: { width: '40px', height: '40px' },
  rootShape48: { width: '48px', height: '48px' },
  rootShape56: { width: '56px', height: '56px' },
  rootShape64: { width: '64px', height: '64px' },
  rootShape72: { width: '72px', height: '72px' },
  rootShape96: { width: '96px', height: '96px' },
  rootShape120: { width: '120px', height: '120px' },
  rootShape128: { width: '128px', height: '128px' },

  rootFontSizeXSmall: tokens => ({ fontSize: tokens.global.type.fontSizes.base[100] }),
  rootFontSizeSmall: tokens => ({ fontSize: tokens.global.type.fontSizes.base[200] }),
  rootFontSizeMedium: tokens => ({ fontSize: tokens.global.type.fontSizes.base[300] }),
  rootFontSizeLarge: tokens => ({ fontSize: tokens.global.type.fontSizes.base[400] }),
  rootFontSizeXLarge: tokens => ({ fontSize: tokens.global.type.fontSizes.base[500] }),
  rootFontSizeGiant: tokens => ({ fontSize: tokens.global.type.fontSizes.base[600] }),

  rootFontWeightRegular: tokens => ({ fontWeight: tokens.global.type.fontWeights.regular }),
  rootFontWeightSemibold: tokens => ({ fontWeight: tokens.global.type.fontWeights.semibold }),

  rootSquareBorderRadiusSmall: tokens => ({ borderRadius: tokens.global.borderRadius.small }),
  rootSquareBorderRadiusMedium: tokens => ({ borderRadius: tokens.global.borderRadius.medium }),
  rootSquareBorderRadiusLarge: tokens => ({ borderRadius: tokens.global.borderRadius.large }),
  rootSquareBorderRadiusXLarge: tokens => ({ borderRadius: tokens.global.borderRadius.xLarge }),

  rootIconFontWeight: { fontWeight: 'initial' },
  rootIconFontSizeSmall: { fontSize: iconSize.small },
  rootIconFontSizeMedium: { fontSize: iconSize.medium },
  rootIconFontSizeLarge: { fontSize: iconSize.large },
  rootIconFontSizeLarger: { fontSize: iconSize.larger },
  rootIconFontSizeLargest: { fontSize: iconSize.largest },

  rootActive: {
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
  rootInactive: {
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

  rootActiveRingSmall: tokens => ({
    ':before': {
      borderColor: tokens.alias.color.neutral.brandForeground, // TODO: use valid token
      borderStyle: 'solid',
    },
  }),
  rootActiveRingMedium: tokens => ({
    ':before': {
      margin: `calc(-2 * ${tokens.global.strokeWidth.thick})`,
      borderWidth: tokens.global.strokeWidth.thick,
    },
  }),
  rootActiveRingLarge: tokens => ({
    ':before': {
      margin: `calc(-2 * ${tokens.global.strokeWidth.thicker})`,
      borderWidth: tokens.global.strokeWidth.thicker,
    },
  }),
  rootActiveRingXLarge: tokens => ({
    ':before': {
      margin: `calc(-2 * ${tokens.global.strokeWidth.thickest})`,
      borderWidth: tokens.global.strokeWidth.thickest,
    },
  }),

  rootActiveShadow4: tokens => ({ ':before': { boxShadow: tokens.alias.shadow.shadow4 } }),
  rootActiveShadow8: tokens => ({ ':before': { boxShadow: tokens.alias.shadow.shadow8 } }),
  rootActiveShadow16: tokens => ({ ':before': { boxShadow: tokens.alias.shadow.shadow16 } }),
  rootActiveShadow28: tokens => ({ ':before': { boxShadow: tokens.alias.shadow.shadow28 } }),

  // TODO: use proper tokens instead of "rgba(0,120,212,0.3)"
  rootActiveGlow4: tokens => ({
    ':before': { boxShadow: `${tokens.alias.shadow.shadow4}, 0 0 4px 2px rgba(0,120,212,0.3)` },
  }),
  rootActiveGlow8: tokens => ({
    ':before': { boxShadow: `${tokens.alias.shadow.shadow8}, 0 0 8px 2px rgba(0,120,212,0.3)` },
  }),

  rootActiveGlow16: tokens => ({
    ':before': { boxShadow: `${tokens.alias.shadow.shadow16}, 0 0 8px 2px rgba(0,120,212,0.3)` },
  }),
  rootActiveGlow28: tokens => ({
    ':before': { boxShadow: `${tokens.alias.shadow.shadow28}, 0 0 28px 4px rgba(0,120,212,0.3)` },
  }),

  // TODO apply the correct badge sizes once the new Badge component is available
  badge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  badgeSize20: { '--badge-size': '5px' },
  badgeSize24: { '--badge-size': '6px' },
  badgeSize28: { '--badge-size': '7px' },
  badgeSize32: { '--badge-size': '8px' },
  badgeSize36: { '--badge-size': '9px' },
  badgeSize40: { '--badge-size': '10px' },
  badgeSize48: { '--badge-size': '12px' },
  badgeSize56: { '--badge-size': '14px' },
  badgeSize64: { '--badge-size': '16px' },
  badgeSize72: { '--badge-size': '18px' },
  badgeSize96: { '--badge-size': '24px' },
  badgeSize120: { '--badge-size': '30px' },
  badgeSize128: { '--badge-size': '32px' },

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

  label: tokens => ({
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

    color: tokens.alias.color.neutral.neutralForeground3,
    background: tokens.alias.color.neutral.neutralBackground6,
  }),
  labelBrand: tokens => ({
    color: tokens.alias.color.neutral.neutralForegroundInverted,
    background: tokens.alias.color.brand.brandBackground,
  }),
});

export const useAvatarStyles = (state: AvatarState): AvatarState => {
  const classes = useStyles();

  const activeRing =
    (state.active === 'active' || state.active === 'inactive') &&
    (!state.activeDisplay ||
      state.activeDisplay === 'ring' ||
      state.activeDisplay === 'ring-glow' ||
      state.activeDisplay === 'ring-shadow');
  const activeShadow =
    (state.active === 'active' || state.active === 'inactive') &&
    (state.activeDisplay === 'shadow' || state.activeDisplay === 'ring-shadow');
  const activeGlow =
    (state.active === 'active' || state.active === 'inactive') &&
    (state.activeDisplay === 'glow' || state.activeDisplay === 'ring-glow');

  state.className = ax(
    classes.root,

    state.size === 20 && classes.rootShape20,
    state.size === 24 && classes.rootShape24,
    state.size === 28 && classes.rootShape28,
    state.size === 32 && classes.rootShape32,
    state.size === 36 && classes.rootShape36,
    state.size === 40 && classes.rootShape40,
    state.size === 48 && classes.rootShape48,
    state.size === 56 && classes.rootShape56,
    state.size === 64 && classes.rootShape64,
    state.size === 72 && classes.rootShape72,
    state.size === 96 && classes.rootShape96,
    state.size === 120 && classes.rootShape120,
    state.size === 128 && classes.rootShape128,

    state.size < 28 && classes.rootFontSizeXSmall,
    state.size >= 28 && classes.rootFontSizeSmall,
    state.size >= 32 && classes.rootFontSizeMedium,
    state.size >= 48 && classes.rootFontSizeLarge,
    state.size >= 64 && classes.rootFontSizeXLarge,
    state.size >= 120 && classes.rootFontSizeGiant,

    state.size < 28 && classes.rootFontWeightRegular,
    state.size >= 28 && classes.rootFontWeightSemibold,

    state.square && state.size < 28 && classes.rootSquareBorderRadiusSmall,
    state.square && state.size >= 28 && classes.rootSquareBorderRadiusMedium,
    state.square && state.size >= 56 && classes.rootSquareBorderRadiusLarge,
    state.square && state.size >= 96 && classes.rootSquareBorderRadiusXLarge,

    state.icon !== undefined && classes.rootIconFontWeight,
    state.icon !== undefined && state.size < 28 && classes.rootIconFontSizeSmall,
    state.icon !== undefined && state.size >= 28 && classes.rootIconFontSizeMedium,
    state.icon !== undefined && state.size >= 48 && classes.rootIconFontSizeLarge,
    state.icon !== undefined && state.size >= 96 && classes.rootIconFontSizeLarger,
    state.icon !== undefined && state.size >= 120 && classes.rootIconFontSizeLargest,

    (state.active === 'active' || state.active === 'inactive') && classes.rootActive,

    activeRing && classes.rootActiveRingSmall,
    activeRing && state.size < 48 && classes.rootActiveRingMedium,
    activeRing && state.size >= 48 && classes.rootActiveRingLarge,
    activeRing && state.size >= 72 && classes.rootActiveRingXLarge,

    activeShadow && state.size < 32 && classes.rootActiveShadow4,
    activeShadow && state.size >= 32 && classes.rootActiveShadow8,
    activeShadow && state.size >= 48 && classes.rootActiveShadow16,
    activeShadow && state.size >= 72 && classes.rootActiveShadow28,

    activeGlow && state.size < 32 && classes.rootActiveGlow4,
    activeGlow && state.size >= 32 && classes.rootActiveGlow8,
    activeGlow && state.size >= 48 && classes.rootActiveGlow16,
    activeGlow && state.size >= 72 && classes.rootActiveGlow28,

    // Note: The inactive styles must be after all of the active/activeRing/activeShadow/activeGlow styles,
    // so they appropriately override the margin, etc.
    state.active === 'inactive' && classes.rootInactive,

    state.className,
  );

  state.badge.className = ax(
    classes.badge,

    state.size < 24 && classes.badgeSize20,
    state.size >= 24 && classes.badgeSize24,
    state.size >= 28 && classes.badgeSize28,
    state.size >= 32 && classes.badgeSize32,
    state.size >= 36 && classes.badgeSize36,
    state.size >= 40 && classes.badgeSize40,
    state.size >= 48 && classes.badgeSize48,
    state.size >= 56 && classes.badgeSize56,
    state.size >= 64 && classes.badgeSize64,
    state.size >= 72 && classes.badgeSize72,
    state.size >= 96 && classes.badgeSize96,
    state.size >= 120 && classes.badgeSize120,
    state.size >= 128 && classes.badgeSize128,

    state.badge.className,
  );

  state.image.className = ax(classes.image, state.image.className);

  state.label.className = ax(
    classes.label,
    state.colorVariant === 'brand' && classes.labelBrand,
    state.label.className,
  );

  return state;
};
