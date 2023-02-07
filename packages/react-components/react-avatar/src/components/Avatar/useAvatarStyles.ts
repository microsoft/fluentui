import { mergeClasses, makeStyles, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { AvatarSlots, AvatarState } from './Avatar.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const avatarClassNames: SlotClassNames<AvatarSlots> = {
  root: 'fui-Avatar',
  image: 'fui-Avatar__image',
  initials: 'fui-Avatar__initials',
  icon: 'fui-Avatar__icon',
  badge: 'fui-Avatar__badge',
};

const animations = {
  fastOutSlowInMax: tokens.curveDecelerateMax,
  fastOutSlowInMid: tokens.curveDecelerateMid,
  fastOutSlowInMin: tokens.curveDecelerateMin,
  slowOutFastInMax: tokens.curveAccelerateMax,
  slowOutFastInMid: tokens.curveAccelerateMid,
  slowOutFastInMin: tokens.curveAccelerateMin,
  fastEase: tokens.curveEasyEaseMax,
  normalEase: tokens.curveEasyEase,
  nullEasing: tokens.curveLinear,
};

const useStyles = makeStyles({
  root: {
    display: 'inline-block',
    flexShrink: 0,
    position: 'relative',
    verticalAlign: 'middle',
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightSemibold,
  },

  textCaption2Strong: {
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightSemibold,
  },
  textCaption1Strong: { fontSize: tokens.fontSizeBase200 },
  textBody1Strong: { fontSize: tokens.fontSizeBase300 },
  textSubtitle2: { fontSize: tokens.fontSizeBase400 },
  textSubtitle1: { fontSize: tokens.fontSizeBase500 },
  textTitle: { fontSize: tokens.fontSizeBase600 },

  squareSmall: {
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
  },
  squareMedium: {
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  squareLarge: {
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
  },
  squareXLarge: {
    ...shorthands.borderRadius(tokens.borderRadiusXLarge),
  },

  activeOrInactive: {
    transform: 'perspective(1px)', // Work-around for text pixel snapping at the end of the animation
    transitionProperty: 'transform, opacity',
    transitionDuration: `${tokens.durationUltraSlow}, ${tokens.durationFaster}`,
    transitionDelay: `${animations.fastEase}, ${animations.nullEasing}`,

    '@media screen and (prefers-reduced-motion: reduce)': {
      transitionDuration: '0.01ms',
    },

    '::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,

      ...shorthands.borderRadius('inherit'),
      transitionProperty: 'margin, opacity',
      transitionDuration: `${tokens.durationUltraSlow}, ${tokens.durationSlower}`,
      transitionDelay: `${animations.fastEase}, ${animations.nullEasing}`,

      '@media screen and (prefers-reduced-motion: reduce)': {
        transitionDuration: '0.01ms',
        transitionDelay: '0.01ms',
      },
    },
  },

  ring: {
    '::before': {
      ...shorthands.borderStyle('solid'),
    },
  },
  ringThick: {
    '::before': {
      ...shorthands.margin(`calc(-2 * ${tokens.strokeWidthThick})`),
      ...shorthands.borderWidth(tokens.strokeWidthThick),
    },
  },
  ringThicker: {
    '::before': {
      ...shorthands.margin(`calc(-2 * ${tokens.strokeWidthThicker})`),
      ...shorthands.borderWidth(tokens.strokeWidthThicker),
    },
  },
  ringThickest: {
    '::before': {
      ...shorthands.margin(`calc(-2 * ${tokens.strokeWidthThickest})`),
      ...shorthands.borderWidth(tokens.strokeWidthThickest),
    },
  },

  shadow4: { '::before': { boxShadow: tokens.shadow4 } },
  shadow8: { '::before': { boxShadow: tokens.shadow8 } },
  shadow16: { '::before': { boxShadow: tokens.shadow16 } },
  shadow28: { '::before': { boxShadow: tokens.shadow28 } },

  inactive: {
    opacity: '0.8',
    transform: 'scale(0.875)',

    transitionProperty: 'transform, opacity',
    transitionDuration: `${tokens.durationUltraSlow}, ${tokens.durationFaster}`,
    transitionDelay: `${animations.fastOutSlowInMin}, ${animations.nullEasing}`,

    '@media screen and (prefers-reduced-motion: reduce)': {
      transitionDuration: '0.01ms',
      transitionDelay: '0.01ms',
    },

    '::before': {
      ...shorthands.margin(0),
      opacity: 0,

      transitionProperty: 'margin, opacity',
      transitionDuration: `${tokens.durationUltraSlow}, ${tokens.durationSlower}`,
      transitionDelay: `${animations.fastOutSlowInMin}, ${animations.nullEasing}`,

      '@media screen and (prefers-reduced-motion: reduce)': {
        transitionDuration: '0.01ms',
        transitionDelay: '0.01ms',
      },
    },
  },

  badge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    boxShadow: `0 0 0 ${tokens.strokeWidthThin} ${tokens.colorNeutralBackground1}`,
  },
  badgeLarge: {
    boxShadow: `0 0 0 ${tokens.strokeWidthThick} ${tokens.colorNeutralBackground1}`,
  },

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

  iconInitials: {
    position: 'absolute',
    boxSizing: 'border-box',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    lineHeight: '1',
    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorTransparentStroke),

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'center',
    textAlign: 'center',
    userSelect: 'none',
    ...shorthands.borderRadius('inherit'),
  },

  icon12: { fontSize: '12px' },
  icon16: { fontSize: '16px' },
  icon20: { fontSize: '20px' },
  icon24: { fontSize: '24px' },
  icon28: { fontSize: '28px' },
  icon32: { fontSize: '32px' },
  icon48: { fontSize: '48px' },
});

export const useSizeStyles = makeStyles({
  16: { width: '16px', height: '16px' },
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
  neutral: {
    color: tokens.colorNeutralForeground3,
    backgroundColor: tokens.colorNeutralBackground6,
    // The ::before element is the ring when active
    '::before': { color: tokens.colorBrandStroke1 },
  },
  brand: {
    color: tokens.colorNeutralForegroundStaticInverted,
    backgroundColor: tokens.colorBrandBackgroundStatic,
    '::before': { color: tokens.colorBrandStroke1 },
  },
  'dark-red': {
    color: tokens.colorPaletteDarkRedForeground2,
    backgroundColor: tokens.colorPaletteDarkRedBackground2,
    '::before': { color: tokens.colorPaletteDarkRedBorderActive },
  },
  cranberry: {
    color: tokens.colorPaletteCranberryForeground2,
    backgroundColor: tokens.colorPaletteCranberryBackground2,
    '::before': { color: tokens.colorPaletteCranberryBorderActive },
  },
  red: {
    color: tokens.colorPaletteRedForeground2,
    backgroundColor: tokens.colorPaletteRedBackground2,
    '::before': { color: tokens.colorPaletteRedBorderActive },
  },
  pumpkin: {
    color: tokens.colorPalettePumpkinForeground2,
    backgroundColor: tokens.colorPalettePumpkinBackground2,
    '::before': { color: tokens.colorPalettePumpkinBorderActive },
  },
  peach: {
    color: tokens.colorPalettePeachForeground2,
    backgroundColor: tokens.colorPalettePeachBackground2,
    '::before': { color: tokens.colorPalettePeachBorderActive },
  },
  marigold: {
    color: tokens.colorPaletteMarigoldForeground2,
    backgroundColor: tokens.colorPaletteMarigoldBackground2,
    '::before': { color: tokens.colorPaletteMarigoldBorderActive },
  },
  gold: {
    color: tokens.colorPaletteGoldForeground2,
    backgroundColor: tokens.colorPaletteGoldBackground2,
    '::before': { color: tokens.colorPaletteGoldBorderActive },
  },
  brass: {
    color: tokens.colorPaletteBrassForeground2,
    backgroundColor: tokens.colorPaletteBrassBackground2,
    '::before': { color: tokens.colorPaletteBrassBorderActive },
  },
  brown: {
    color: tokens.colorPaletteBrownForeground2,
    backgroundColor: tokens.colorPaletteBrownBackground2,
    '::before': { color: tokens.colorPaletteBrownBorderActive },
  },
  forest: {
    color: tokens.colorPaletteForestForeground2,
    backgroundColor: tokens.colorPaletteForestBackground2,
    '::before': { color: tokens.colorPaletteForestBorderActive },
  },
  seafoam: {
    color: tokens.colorPaletteSeafoamForeground2,
    backgroundColor: tokens.colorPaletteSeafoamBackground2,
    '::before': { color: tokens.colorPaletteSeafoamBorderActive },
  },
  'dark-green': {
    color: tokens.colorPaletteDarkGreenForeground2,
    backgroundColor: tokens.colorPaletteDarkGreenBackground2,
    '::before': { color: tokens.colorPaletteDarkGreenBorderActive },
  },
  'light-teal': {
    color: tokens.colorPaletteLightTealForeground2,
    backgroundColor: tokens.colorPaletteLightTealBackground2,
    '::before': { color: tokens.colorPaletteLightTealBorderActive },
  },
  teal: {
    color: tokens.colorPaletteTealForeground2,
    backgroundColor: tokens.colorPaletteTealBackground2,
    '::before': { color: tokens.colorPaletteTealBorderActive },
  },
  steel: {
    color: tokens.colorPaletteSteelForeground2,
    backgroundColor: tokens.colorPaletteSteelBackground2,
    '::before': { color: tokens.colorPaletteSteelBorderActive },
  },
  blue: {
    color: tokens.colorPaletteBlueForeground2,
    backgroundColor: tokens.colorPaletteBlueBackground2,
    '::before': { color: tokens.colorPaletteBlueBorderActive },
  },
  'royal-blue': {
    color: tokens.colorPaletteRoyalBlueForeground2,
    backgroundColor: tokens.colorPaletteRoyalBlueBackground2,
    '::before': { color: tokens.colorPaletteRoyalBlueBorderActive },
  },
  cornflower: {
    color: tokens.colorPaletteCornflowerForeground2,
    backgroundColor: tokens.colorPaletteCornflowerBackground2,
    '::before': { color: tokens.colorPaletteCornflowerBorderActive },
  },
  navy: {
    color: tokens.colorPaletteNavyForeground2,
    backgroundColor: tokens.colorPaletteNavyBackground2,
    '::before': { color: tokens.colorPaletteNavyBorderActive },
  },
  lavender: {
    color: tokens.colorPaletteLavenderForeground2,
    backgroundColor: tokens.colorPaletteLavenderBackground2,
    '::before': { color: tokens.colorPaletteLavenderBorderActive },
  },
  purple: {
    color: tokens.colorPalettePurpleForeground2,
    backgroundColor: tokens.colorPalettePurpleBackground2,
    '::before': { color: tokens.colorPalettePurpleBorderActive },
  },
  grape: {
    color: tokens.colorPaletteGrapeForeground2,
    backgroundColor: tokens.colorPaletteGrapeBackground2,
    '::before': { color: tokens.colorPaletteGrapeBorderActive },
  },
  lilac: {
    color: tokens.colorPaletteLilacForeground2,
    backgroundColor: tokens.colorPaletteLilacBackground2,
    '::before': { color: tokens.colorPaletteLilacBorderActive },
  },
  pink: {
    color: tokens.colorPalettePinkForeground2,
    backgroundColor: tokens.colorPalettePinkBackground2,
    '::before': { color: tokens.colorPalettePinkBorderActive },
  },
  magenta: {
    color: tokens.colorPaletteMagentaForeground2,
    backgroundColor: tokens.colorPaletteMagentaBackground2,
    '::before': { color: tokens.colorPaletteMagentaBorderActive },
  },
  plum: {
    color: tokens.colorPalettePlumForeground2,
    backgroundColor: tokens.colorPalettePlumBackground2,
    '::before': { color: tokens.colorPalettePlumBorderActive },
  },
  beige: {
    color: tokens.colorPaletteBeigeForeground2,
    backgroundColor: tokens.colorPaletteBeigeBackground2,
    '::before': { color: tokens.colorPaletteBeigeBorderActive },
  },
  mink: {
    color: tokens.colorPaletteMinkForeground2,
    backgroundColor: tokens.colorPaletteMinkBackground2,
    '::before': { color: tokens.colorPaletteMinkBorderActive },
  },
  platinum: {
    color: tokens.colorPalettePlatinumForeground2,
    backgroundColor: tokens.colorPalettePlatinumBackground2,
    '::before': { color: tokens.colorPalettePlatinumBorderActive },
  },
  anchor: {
    color: tokens.colorPaletteAnchorForeground2,
    backgroundColor: tokens.colorPaletteAnchorBackground2,
    '::before': { color: tokens.colorPaletteAnchorBorderActive },
  },
});

export const useAvatarStyles_unstable = (state: AvatarState): AvatarState => {
  const { size, shape, active, activeAppearance, color } = state;

  const styles = useStyles();
  const sizeStyles = useSizeStyles();
  const colorStyles = useColorStyles();

  const rootClasses = [styles.root, sizeStyles[size], colorStyles[color]];

  if (size <= 24) {
    rootClasses.push(styles.textCaption2Strong);
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

    if (activeAppearance === 'ring' || activeAppearance === 'ring-shadow') {
      rootClasses.push(styles.ring);

      if (size <= 48) {
        rootClasses.push(styles.ringThick);
      } else if (size <= 64) {
        rootClasses.push(styles.ringThicker);
      } else {
        rootClasses.push(styles.ringThickest);
      }
    }

    if (activeAppearance === 'shadow' || activeAppearance === 'ring-shadow') {
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

    // Note: The inactive style overrides some of the activeAppearance styles and must be applied after them
    if (active === 'inactive') {
      rootClasses.push(styles.inactive);
    }
  }

  state.root.className = mergeClasses(avatarClassNames.root, ...rootClasses, state.root.className);

  if (state.badge) {
    state.badge.className = mergeClasses(
      avatarClassNames.badge,
      styles.badge,
      size >= 64 && styles.badgeLarge,
      state.badge.className,
    );
  }

  if (state.image) {
    state.image.className = mergeClasses(avatarClassNames.image, styles.image, state.image.className);
  }

  if (state.initials) {
    state.initials.className = mergeClasses(avatarClassNames.initials, styles.iconInitials, state.initials.className);
  }

  if (state.icon) {
    let iconSizeClass;
    if (size <= 16) {
      iconSizeClass = styles.icon12;
    } else if (size <= 24) {
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

    state.icon.className = mergeClasses(
      avatarClassNames.icon,
      styles.iconInitials,
      iconSizeClass,
      state.icon.className,
    );
  }

  return state;
};
