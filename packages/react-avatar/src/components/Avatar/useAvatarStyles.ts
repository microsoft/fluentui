import { mergeClasses, makeStyles, shorthands } from '@fluentui/react-make-styles';
import type { AvatarState } from './Avatar.types';

export const avatarClassName = 'fui-Avatar';

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

const useStyles = makeStyles({
  root: theme => ({
    display: 'inline-block',
    flexShrink: 0,
    position: 'relative',
    verticalAlign: 'middle',
    ...shorthands.borderRadius(theme.borderRadiusCircular),
    fontFamily: theme.fontFamilyBase,
    fontWeight: theme.fontWeightSemibold,
    boxShadow: `0 0 0 ${theme.strokeWidthThin} ${theme.colorTransparentStroke} inset`,
  }),

  textCaption2: theme => ({
    fontSize: theme.fontSizeBase100,
    fontWeight: theme.fontWeightRegular,
  }),
  textCaption1Strong: theme => ({ fontSize: theme.fontSizeBase200 }),
  textBody1Strong: theme => ({ fontSize: theme.fontSizeBase300 }),
  textSubtitle2: theme => ({ fontSize: theme.fontSizeBase400 }),
  textSubtitle1: theme => ({ fontSize: theme.fontSizeBase500 }),
  textTitle: theme => ({ fontSize: theme.fontSizeBase600 }),

  squareSmall: theme => ({
    ...shorthands.borderRadius(theme.borderRadiusSmall),
  }),
  squareMedium: theme => ({
    ...shorthands.borderRadius(theme.borderRadiusMedium),
  }),
  squareLarge: theme => ({
    ...shorthands.borderRadius(theme.borderRadiusLarge),
  }),
  squareXLarge: theme => ({
    ...shorthands.borderRadius(theme.borderRadiusXLarge),
  }),

  activeOrInactive: {
    transform: 'perspective(1px)', // Work-around for text pixel snapping at the end of the animation
    transitionProperty: 'transform, opacity',
    transitionDuration: `${animationTiming.ultraSlow}, ${animationTiming.faster}`,
    transitionDelay: `${animations.fastEase}, ${animations.nullEasing}`,

    ':before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,

      ...shorthands.borderRadius('inherit'),
      transitionProperty: 'margin, opacity',
      transitionDuration: `${animationTiming.ultraSlow}, ${animationTiming.slower}`,
      transitionDelay: `${animations.fastEase}, ${animations.nullEasing}`,
    },
  },

  ring: theme => ({
    ':before': {
      ...shorthands.borderColor(theme.colorBrandBackgroundStatic),
      ...shorthands.borderStyle('solid'),
    },
  }),
  ringThick: theme => ({
    ':before': {
      ...shorthands.margin(`calc(-2 * ${theme.strokeWidthThick})`),
      ...shorthands.borderWidth(theme.strokeWidthThick),
    },
  }),
  ringThicker: theme => ({
    ':before': {
      ...shorthands.margin(`calc(-2 * ${theme.strokeWidthThicker})`),
      ...shorthands.borderWidth(theme.strokeWidthThicker),
    },
  }),
  ringThickest: theme => ({
    ':before': {
      ...shorthands.margin(`calc(-2 * ${theme.strokeWidthThickest})`),
      ...shorthands.borderWidth(theme.strokeWidthThickest),
    },
  }),

  shadow4: theme => ({ ':before': { boxShadow: theme.shadow4 } }),
  shadow8: theme => ({ ':before': { boxShadow: theme.shadow8 } }),
  shadow16: theme => ({ ':before': { boxShadow: theme.shadow16 } }),
  shadow28: theme => ({ ':before': { boxShadow: theme.shadow28 } }),

  // TODO: use proper tokens instead of "rgba(0,120,212,0.3)"
  glow4: theme => ({ ':before': { boxShadow: `${theme.shadow4}, 0 0 4px 2px rgba(0,120,212,0.3)` } }),
  glow8: theme => ({ ':before': { boxShadow: `${theme.shadow8}, 0 0 8px 2px rgba(0,120,212,0.3)` } }),
  glow16: theme => ({ ':before': { boxShadow: `${theme.shadow16}, 0 0 8px 2px rgba(0,120,212,0.3)` } }),
  glow28: theme => ({ ':before': { boxShadow: `${theme.shadow28}, 0 0 28px 4px rgba(0,120,212,0.3)` } }),

  inactive: {
    opacity: '0.8',
    transform: 'scale(0.875)',

    transitionProperty: 'transform, opacity',
    transitionDuration: `${animationTiming.ultraSlow}, ${animationTiming.faster}`,
    transitionDelay: `${animations.fastOutSlowInMin}, ${animations.nullEasing}`,

    ':before': {
      ...shorthands.margin(0),
      opacity: 0,

      transitionProperty: 'margin, opacity',
      transitionDuration: `${animationTiming.ultraSlow}, ${animationTiming.slower}`,
      transitionDelay: `${animations.fastOutSlowInMin}, ${animations.nullEasing}`,
    },
  },

  badge: theme => ({
    position: 'absolute',
    bottom: 0,
    right: 0,
    boxShadow: `0 0 0 ${theme.strokeWidthThin} ${theme.colorNeutralBackground1}`,
  }),
  badgeLarge: theme => ({
    boxShadow: `0 0 0 ${theme.strokeWidthThick} ${theme.colorNeutralBackground1}`,
  }),

  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',

    ...shorthands.borderRadius('inherit'),
    objectFit: 'cover',
    verticalAlign: 'top',
  },

  iconLabel: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    lineHeight: '1',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'center',
    textAlign: 'center',
    ...shorthands.borderRadius('inherit'),
  },

  icon16: { fontSize: '16px' },
  icon20: { fontSize: '20px' },
  icon24: { fontSize: '24px' },
  icon28: { fontSize: '28px' },
  icon32: { fontSize: '32px' },
  icon48: { fontSize: '48px' },
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
    color: theme.colorNeutralForeground3,
    backgroundColor: theme.colorNeutralBackground6,
  }),
  brand: theme => ({
    color: theme.colorNeutralForegroundInverted,
    backgroundColor: theme.colorBrandBackgroundStatic,
  }),
  darkRed: theme => ({
    color: theme.colorPaletteDarkRedForeground2,
    backgroundColor: theme.colorPaletteDarkRedBackground2,
  }),
  cranberry: theme => ({
    color: theme.colorPaletteCranberryForeground2,
    backgroundColor: theme.colorPaletteCranberryBackground2,
  }),
  red: theme => ({
    color: theme.colorPaletteRedForeground2,
    backgroundColor: theme.colorPaletteRedBackground2,
  }),
  pumpkin: theme => ({
    color: theme.colorPalettePumpkinForeground2,
    backgroundColor: theme.colorPalettePumpkinBackground2,
  }),
  peach: theme => ({
    color: theme.colorPalettePeachForeground2,
    backgroundColor: theme.colorPalettePeachBackground2,
  }),
  marigold: theme => ({
    color: theme.colorPaletteMarigoldForeground2,
    backgroundColor: theme.colorPaletteMarigoldBackground2,
  }),
  gold: theme => ({
    color: theme.colorPaletteGoldForeground2,
    backgroundColor: theme.colorPaletteGoldBackground2,
  }),
  brass: theme => ({
    color: theme.colorPaletteBrassForeground2,
    backgroundColor: theme.colorPaletteBrassBackground2,
  }),
  brown: theme => ({
    color: theme.colorPaletteBrownForeground2,
    backgroundColor: theme.colorPaletteBrownBackground2,
  }),
  forest: theme => ({
    color: theme.colorPaletteForestForeground2,
    backgroundColor: theme.colorPaletteForestBackground2,
  }),
  seafoam: theme => ({
    color: theme.colorPaletteSeafoamForeground2,
    backgroundColor: theme.colorPaletteSeafoamBackground2,
  }),
  darkGreen: theme => ({
    color: theme.colorPaletteDarkGreenForeground2,
    backgroundColor: theme.colorPaletteDarkGreenBackground2,
  }),
  lightTeal: theme => ({
    color: theme.colorPaletteLightTealForeground2,
    backgroundColor: theme.colorPaletteLightTealBackground2,
  }),
  teal: theme => ({
    color: theme.colorPaletteTealForeground2,
    backgroundColor: theme.colorPaletteTealBackground2,
  }),
  steel: theme => ({
    color: theme.colorPaletteSteelForeground2,
    backgroundColor: theme.colorPaletteSteelBackground2,
  }),
  blue: theme => ({
    color: theme.colorPaletteBlueForeground2,
    backgroundColor: theme.colorPaletteBlueBackground2,
  }),
  royalBlue: theme => ({
    color: theme.colorPaletteRoyalBlueForeground2,
    backgroundColor: theme.colorPaletteRoyalBlueBackground2,
  }),
  cornflower: theme => ({
    color: theme.colorPaletteCornflowerForeground2,
    backgroundColor: theme.colorPaletteCornflowerBackground2,
  }),
  navy: theme => ({
    color: theme.colorPaletteNavyForeground2,
    backgroundColor: theme.colorPaletteNavyBackground2,
  }),
  lavender: theme => ({
    color: theme.colorPaletteLavenderForeground2,
    backgroundColor: theme.colorPaletteLavenderBackground2,
  }),
  purple: theme => ({
    color: theme.colorPalettePurpleForeground2,
    backgroundColor: theme.colorPalettePurpleBackground2,
  }),
  grape: theme => ({
    color: theme.colorPaletteGrapeForeground2,
    backgroundColor: theme.colorPaletteGrapeBackground2,
  }),
  lilac: theme => ({
    color: theme.colorPaletteLilacForeground2,
    backgroundColor: theme.colorPaletteLilacBackground2,
  }),
  pink: theme => ({
    color: theme.colorPalettePinkForeground2,
    backgroundColor: theme.colorPalettePinkBackground2,
  }),
  magenta: theme => ({
    color: theme.colorPaletteMagentaForeground2,
    backgroundColor: theme.colorPaletteMagentaBackground2,
  }),
  plum: theme => ({
    color: theme.colorPalettePlumForeground2,
    backgroundColor: theme.colorPalettePlumBackground2,
  }),
  beige: theme => ({
    color: theme.colorPaletteBeigeForeground2,
    backgroundColor: theme.colorPaletteBeigeBackground2,
  }),
  mink: theme => ({
    color: theme.colorPaletteMinkForeground2,
    backgroundColor: theme.colorPaletteMinkBackground2,
  }),
  platinum: theme => ({
    color: theme.colorPalettePlatinumForeground2,
    backgroundColor: theme.colorPalettePlatinumBackground2,
  }),
  anchor: theme => ({
    color: theme.colorPaletteAnchorForeground2,
    backgroundColor: theme.colorPaletteAnchorBackground2,
  }),
});

export const useAvatarStyles = (state: AvatarState): AvatarState => {
  const { size, shape, active, activeAppearance, color } = state;

  const styles = useStyles();
  const sizeStyles = useSizeStyles();
  const colorStyles = useColorStyles();

  const rootClasses = [styles.root, sizeStyles[size], colorStyles[color]];

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

  if (shape === 'square') {
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

    if (activeAppearance.includes('ring')) {
      rootClasses.push(styles.ring);

      if (size <= 48) {
        rootClasses.push(styles.ringThick);
      } else if (size <= 64) {
        rootClasses.push(styles.ringThicker);
      } else {
        rootClasses.push(styles.ringThickest);
      }
    }

    if (activeAppearance.includes('shadow')) {
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

    if (activeAppearance.includes('glow')) {
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

    // Note: The inactive style overrides some of the activeAppearance styles and must be applied after them
    if (active === 'inactive') {
      rootClasses.push(styles.inactive);
    }
  }

  state.root.className = mergeClasses(avatarClassName, ...rootClasses, state.root.className);

  if (state.badge) {
    state.badge.className = mergeClasses(styles.badge, size >= 64 && styles.badgeLarge, state.badge.className);
  }

  if (state.image) {
    state.image.className = mergeClasses(styles.image, state.image.className);
  }

  if (state.label) {
    state.label.className = mergeClasses(styles.iconLabel, state.label.className);
  }

  if (state.icon) {
    let iconSizeClass;
    if (size <= 24) {
      iconSizeClass = styles.icon16;
    } else if (size <= 40) {
      iconSizeClass = styles.icon20;
    } else if (size <= 48) {
      iconSizeClass = styles.icon24;
    } else if (size <= 56) {
      iconSizeClass = styles.icon28;
    } else if (size <= 72) {
      iconSizeClass = styles.icon32;
    } else {
      iconSizeClass = styles.icon48;
    }

    state.icon.className = mergeClasses(styles.iconLabel, iconSizeClass, state.icon.className);
  }

  return state;
};
