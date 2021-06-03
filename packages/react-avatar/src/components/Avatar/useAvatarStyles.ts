import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
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

const useStyles = makeStyles({
  root: theme => ({
    display: 'inline-block',
    flexShrink: 0,
    position: 'relative',
    verticalAlign: 'middle',
    borderRadius: theme.global.borderRadius.circular,
    fontFamily: theme.global.type.fontFamilies.base,
    fontWeight: theme.global.type.fontWeights.semibold,
  }),

  textCaption2: theme => ({
    fontSize: theme.global.type.fontSizes.base[100],
    fontWeight: theme.global.type.fontWeights.regular,
  }),
  textCaption1Strong: theme => ({ fontSize: theme.global.type.fontSizes.base[200] }),
  textBody1Strong: theme => ({ fontSize: theme.global.type.fontSizes.base[300] }),
  textSubtitle2: theme => ({ fontSize: theme.global.type.fontSizes.base[400] }),
  textSubtitle1: theme => ({ fontSize: theme.global.type.fontSizes.base[500] }),
  textTitle: theme => ({ fontSize: theme.global.type.fontSizes.base[600] }),

  squareSmall: theme => ({ borderRadius: theme.global.borderRadius.small }),
  squareMedium: theme => ({ borderRadius: theme.global.borderRadius.medium }),
  squareLarge: theme => ({ borderRadius: theme.global.borderRadius.large }),
  squareXLarge: theme => ({ borderRadius: theme.global.borderRadius.xLarge }),

  icon: { fontWeight: 'initial' },
  iconSizeLessThan28: { fontSize: iconSize.small },
  iconSizeGreaterEqualThan28: { fontSize: iconSize.medium },
  iconSizeGreaterEqualThan48: { fontSize: iconSize.large },
  iconSizeGreaterEqualThan96: { fontSize: iconSize.larger },
  iconSizeGreaterEqualThan120: { fontSize: iconSize.largest },

  activeOrInactive: {
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

  ring: theme => ({
    ':before': {
      borderColor: theme.alias.color.neutral.brandBackgroundStatic,
      borderStyle: 'solid',
    },
  }),
  ringThick: theme => ({
    ':before': {
      margin: `calc(-2 * ${theme.global.strokeWidth.thick})`,
      borderWidth: theme.global.strokeWidth.thick,
    },
  }),
  ringThicker: theme => ({
    ':before': {
      margin: `calc(-2 * ${theme.global.strokeWidth.thicker})`,
      borderWidth: theme.global.strokeWidth.thicker,
    },
  }),
  ringThickest: theme => ({
    ':before': {
      margin: `calc(-2 * ${theme.global.strokeWidth.thickest})`,
      borderWidth: theme.global.strokeWidth.thickest,
    },
  }),

  shadow4: theme => ({ ':before': { boxShadow: theme.alias.shadow.shadow4 } }),
  shadow8: theme => ({ ':before': { boxShadow: theme.alias.shadow.shadow8 } }),
  shadow16: theme => ({ ':before': { boxShadow: theme.alias.shadow.shadow16 } }),
  shadow28: theme => ({ ':before': { boxShadow: theme.alias.shadow.shadow28 } }),

  // TODO: use proper tokens instead of "rgba(0,120,212,0.3)"
  glow4: theme => ({ ':before': { boxShadow: `${theme.alias.shadow.shadow4}, 0 0 4px 2px rgba(0,120,212,0.3)` } }),
  glow8: theme => ({ ':before': { boxShadow: `${theme.alias.shadow.shadow8}, 0 0 8px 2px rgba(0,120,212,0.3)` } }),
  glow16: theme => ({ ':before': { boxShadow: `${theme.alias.shadow.shadow16}, 0 0 8px 2px rgba(0,120,212,0.3)` } }),
  glow28: theme => ({ ':before': { boxShadow: `${theme.alias.shadow.shadow28}, 0 0 28px 4px rgba(0,120,212,0.3)` } }),

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

  badge: theme => ({
    position: 'absolute',
    bottom: 0,
    right: 0,
    boxShadow: `0 0 0 ${theme.global.strokeWidth.thin} ${theme.alias.color.neutral.neutralBackground1}`,
  }),
  badgeLarge: theme => ({
    boxShadow: `0 0 0 ${theme.global.strokeWidth.thick} ${theme.alias.color.neutral.neutralBackground1}`,
  }),

  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',

    borderRadius: 'inherit',
    objectFit: 'cover',
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
  }),
});

const useSizeStyles = makeStyles({
  20: { width: '20px', height: '20px' },
  24: { width: '24px', height: '24px' },
  28: { width: '28px', height: '28px' },
  32: { width: '32px', height: '32px' },
  36: { width: '36px', height: '36px' },
  40: { width: '40px', height: '40px' },
  48: { width: '48px', height: '48px' },
  56: { width: '56px', height: '56px' },
  64: { width: '64px', height: '64px' },
  72: { width: '72px', height: '72px' },
  96: { width: '96px', height: '96px' },
  120: { width: '120px', height: '120px' },
  128: { width: '128px', height: '128px' },
});

const useColorStyles = makeStyles({
  neutral: theme => ({
    color: theme.alias.color.neutral.neutralForeground3,
    background: theme.alias.color.neutral.neutralBackground6,
  }),
  brand: theme => ({
    color: theme.alias.color.neutral.neutralForegroundInverted,
    background: theme.alias.color.neutral.brandBackgroundStatic,
  }),
  darkRed: theme => ({
    color: theme.alias.color.darkRed.foreground2,
    background: theme.alias.color.darkRed.background2,
  }),
  cranberry: theme => ({
    color: theme.alias.color.cranberry.foreground2,
    background: theme.alias.color.cranberry.background2,
  }),
  red: theme => ({
    color: theme.alias.color.red.foreground2,
    background: theme.alias.color.red.background2,
  }),
  pumpkin: theme => ({
    color: theme.alias.color.pumpkin.foreground2,
    background: theme.alias.color.pumpkin.background2,
  }),
  peach: theme => ({
    color: theme.alias.color.peach.foreground2,
    background: theme.alias.color.peach.background2,
  }),
  marigold: theme => ({
    color: theme.alias.color.marigold.foreground2,
    background: theme.alias.color.marigold.background2,
  }),
  gold: theme => ({
    color: theme.alias.color.gold.foreground2,
    background: theme.alias.color.gold.background2,
  }),
  brass: theme => ({
    color: theme.alias.color.brass.foreground2,
    background: theme.alias.color.brass.background2,
  }),
  brown: theme => ({
    color: theme.alias.color.brown.foreground2,
    background: theme.alias.color.brown.background2,
  }),
  forest: theme => ({
    color: theme.alias.color.forest.foreground2,
    background: theme.alias.color.forest.background2,
  }),
  seafoam: theme => ({
    color: theme.alias.color.seafoam.foreground2,
    background: theme.alias.color.seafoam.background2,
  }),
  darkGreen: theme => ({
    color: theme.alias.color.darkGreen.foreground2,
    background: theme.alias.color.darkGreen.background2,
  }),
  lightTeal: theme => ({
    color: theme.alias.color.lightTeal.foreground2,
    background: theme.alias.color.lightTeal.background2,
  }),
  teal: theme => ({
    color: theme.alias.color.teal.foreground2,
    background: theme.alias.color.teal.background2,
  }),
  steel: theme => ({
    color: theme.alias.color.steel.foreground2,
    background: theme.alias.color.steel.background2,
  }),
  blue: theme => ({
    color: theme.alias.color.blue.foreground2,
    background: theme.alias.color.blue.background2,
  }),
  royalBlue: theme => ({
    color: theme.alias.color.royalBlue.foreground2,
    background: theme.alias.color.royalBlue.background2,
  }),
  cornflower: theme => ({
    color: theme.alias.color.cornflower.foreground2,
    background: theme.alias.color.cornflower.background2,
  }),
  navy: theme => ({
    color: theme.alias.color.navy.foreground2,
    background: theme.alias.color.navy.background2,
  }),
  lavender: theme => ({
    color: theme.alias.color.lavender.foreground2,
    background: theme.alias.color.lavender.background2,
  }),
  purple: theme => ({
    color: theme.alias.color.purple.foreground2,
    background: theme.alias.color.purple.background2,
  }),
  grape: theme => ({
    color: theme.alias.color.grape.foreground2,
    background: theme.alias.color.grape.background2,
  }),
  lilac: theme => ({
    color: theme.alias.color.lilac.foreground2,
    background: theme.alias.color.lilac.background2,
  }),
  pink: theme => ({
    color: theme.alias.color.pink.foreground2,
    background: theme.alias.color.pink.background2,
  }),
  magenta: theme => ({
    color: theme.alias.color.magenta.foreground2,
    background: theme.alias.color.magenta.background2,
  }),
  plum: theme => ({
    color: theme.alias.color.plum.foreground2,
    background: theme.alias.color.plum.background2,
  }),
  beige: theme => ({
    color: theme.alias.color.beige.foreground2,
    background: theme.alias.color.beige.background2,
  }),
  mink: theme => ({
    color: theme.alias.color.mink.foreground2,
    background: theme.alias.color.mink.background2,
  }),
  platinum: theme => ({
    color: theme.alias.color.platinum.foreground2,
    background: theme.alias.color.platinum.background2,
  }),
  anchor: theme => ({
    color: theme.alias.color.anchor.foreground2,
    background: theme.alias.color.anchor.background2,
  }),
});

export const useAvatarStyles = (state: AvatarState): AvatarState => {
  const { size, square, color, active, activeDisplay } = state;

  const styles = useStyles();

  const rootClasses = [styles.root];

  const sizeClasses = useSizeStyles();
  rootClasses.push(sizeClasses[size]);

  if (size <= 24) {
    rootClasses.push(styles.textCaption2);
  } else if (size <= 28) {
    rootClasses.push(styles.textCaption1Strong);
  } else if (size <= 40) {
    rootClasses.push(styles.textBody1Strong);
  } else if (size <= 56) {
    rootClasses.push(styles.textSubtitle2);
  } else if (size <= 96) {
    rootClasses.push(styles.textSubtitle1);
  } else {
    rootClasses.push(styles.textTitle);
  }

  if (square) {
    if (size <= 24) {
      rootClasses.push(styles.squareSmall);
    } else if (size <= 48) {
      rootClasses.push(styles.squareMedium);
    } else if (size <= 72) {
      rootClasses.push(styles.squareLarge);
    } else {
      rootClasses.push(styles.squareXLarge);
    }
  }

  if (active === 'active' || active === 'inactive') {
    rootClasses.push(styles.activeOrInactive);

    if (activeDisplay.includes('ring')) {
      rootClasses.push(styles.ring);

      if (size <= 48) {
        rootClasses.push(styles.ringThick);
      } else if (size <= 64) {
        rootClasses.push(styles.ringThicker);
      } else {
        rootClasses.push(styles.ringThickest);
      }
    }

    if (activeDisplay.includes('shadow')) {
      if (size <= 28) {
        rootClasses.push(styles.shadow4);
      } else if (size <= 48) {
        rootClasses.push(styles.shadow8);
      } else if (size <= 64) {
        rootClasses.push(styles.shadow16);
      } else {
        rootClasses.push(styles.shadow28);
      }
    }

    if (activeDisplay.includes('glow')) {
      if (size <= 28) {
        rootClasses.push(styles.glow4);
      } else if (size <= 48) {
        rootClasses.push(styles.glow8);
      } else if (size <= 64) {
        rootClasses.push(styles.glow16);
      } else {
        rootClasses.push(styles.glow28);
      }
    }

    // Note: The inactive style overrides some of the activeDisplay styles and must be applied after them
    if (active === 'inactive') {
      rootClasses.push(styles.inactive);
    }
  }

  state.className = mergeClasses(
    ...rootClasses,
    state.icon !== undefined && styles.icon,
    state.icon !== undefined && size < 28 && styles.iconSizeLessThan28,
    state.icon !== undefined && size >= 28 && styles.iconSizeGreaterEqualThan28,
    state.icon !== undefined && size >= 48 && styles.iconSizeGreaterEqualThan48,
    state.icon !== undefined && size >= 96 && styles.iconSizeGreaterEqualThan96,
    state.icon !== undefined && size >= 120 && styles.iconSizeGreaterEqualThan120,
    state.className,
  );

  if (state.badge) {
    state.badge.className = mergeClasses(styles.badge, size >= 64 && styles.badgeLarge, state.badge.className);
  }

  if (state.image) {
    state.image.className = mergeClasses(styles.image, state.image.className);
  }

  const colorClasses = useColorStyles();
  state.label.className = mergeClasses(
    styles.label,
    // 'colorful' should have been replaced with a color name by useAvatar, but if not default to darkRed
    colorClasses[color === 'colorful' ? 'darkRed' : color],
    state.label.className,
  );

  return state;
};
