import { avatarTokens } from './Avatar.tokens'
import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import type { AvatarSlots, AvatarState } from './Avatar.types';

export const avatarClassNames: SlotClassNames<AvatarSlots> = {
  root: 'fui-Avatar',
  image: 'fui-Avatar__image',
  initials: 'fui-Avatar__initials',
  icon: 'fui-Avatar__icon',
  badge: 'fui-Avatar__badge',
};

// CSS variables used internally in Avatar's styles
const vars = {
  badgeRadius: '--fui-Avatar-badgeRadius',
  badgeGap: '--fui-Avatar-badgeGap',
  badgeAlign: '--fui-Avatar-badgeAlign',
  ringWidth: '--fui-Avatar-ringWidth',
};

const useRootClassName = makeResetStyles({
  display: 'inline-block',
  flexShrink: 0,
  position: 'relative',
  verticalAlign: 'middle',
  borderRadius: avatarTokens.ctrlBorderRadiusCircular,
  fontFamily: avatarTokens.ctrlFontFamilyBase,
  fontWeight: avatarTokens.ctrlFontWeightSemibold,
  fontSize: avatarTokens.ctrlFontSizeBase300,
  width: '32px',
  height: '32px',

  // ::before is the ring, and ::after is the shadow.
  // These are not displayed by default; the ring and shadow clases set content: "" to display them when appropriate.
  '::before,::after': {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: -1,
    margin: `calc(-2 * var(${vars.ringWidth}, 0px))`,
    borderRadius: 'inherit',
    transitionProperty: 'margin, opacity',
    transitionTimingFunction: `${avatarTokens.ctrlCurveEasyEaseMax}, ${avatarTokens.ctrlCurveLinear}`,
    transitionDuration: `${avatarTokens.ctrlDurationUltraSlow}, ${avatarTokens.ctrlDurationSlower}`,
    '@media screen and (prefers-reduced-motion: reduce)': {
      transitionDuration: '0.01ms',
    },
  },
  '::before': {
    borderStyle: 'solid',
    borderWidth: `var(${vars.ringWidth})`,
  },
});

const useImageClassName = makeResetStyles({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',

  borderRadius: 'inherit',
  objectFit: 'cover',
  verticalAlign: 'top',
});

const useIconInitialsClassName = makeResetStyles({
  position: 'absolute',
  boxSizing: 'border-box',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  lineHeight: '1',
  border: `${avatarTokens.ctrlStrokeWidthThin} solid ${avatarTokens.ctrlColorTransparentStroke}`,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'center',
  textAlign: 'center',
  userSelect: 'none',
  borderRadius: 'inherit',
});

/**
 * Helper to create a maskImage that punches out a circle larger than the badge by `badgeGap`.
 * This creates a transparent gap between the badge and Avatar.
 *
 * Used by the icon, initials, and image slots, as well as the ring ::before pseudo-element.
 */
const badgeMask = (margin?: string) => {
  // Center the cutout at the badge's radius away from the edge.
  // The ring (::before) also has a 2 * ringWidth margin that also needs to be offset.
  const centerOffset = margin ? `calc(var(${vars.badgeRadius}) + ${margin})` : `var(${vars.badgeRadius})`;
  // radial-gradient does not have anti-aliasing, so the transparent and opaque gradient stops are offset by +/- 0.25px
  // to "fade" from transparent to opaque over a half-pixel and ease the transition.
  const innerRadius = `calc(var(${vars.badgeRadius}) + var(${vars.badgeGap}) - 0.25px)`;
  const outerRadius = `calc(var(${vars.badgeRadius}) + var(${vars.badgeGap}) + 0.25px)`;

  return (
    `radial-gradient(circle at bottom ${centerOffset} var(${vars.badgeAlign}) ${centerOffset}, ` +
    `transparent ${innerRadius}, white ${outerRadius})`
  );
};

const useStyles = makeStyles({
  textCaption2Strong: { fontSize: avatarTokens.ctrlFontSizeBase100 },
  textCaption1Strong: { fontSize: avatarTokens.ctrlFontSizeBase200 },
  textSubtitle2: { fontSize: avatarTokens.ctrlFontSizeBase400 },
  textSubtitle1: { fontSize: avatarTokens.ctrlFontSizeBase500 },
  textTitle3: { fontSize: avatarTokens.ctrlFontSizeBase600 },

  squareSmall: { borderRadius: avatarTokens.ctrlBorderRadiusSmall },
  squareMedium: { borderRadius: avatarTokens.ctrlBorderRadiusMedium },
  squareLarge: { borderRadius: avatarTokens.ctrlBorderRadiusLarge },
  squareXLarge: { borderRadius: avatarTokens.ctrlBorderRadiusXLarge },

  activeOrInactive: {
    transform: 'perspective(1px)', // Work-around for text pixel snapping at the end of the animation
    transitionProperty: 'transform, opacity',
    transitionDuration: `${avatarTokens.ctrlDurationUltraSlow}, ${avatarTokens.ctrlDurationFaster}`,
    transitionTimingFunction: `${avatarTokens.ctrlCurveEasyEaseMax}, ${avatarTokens.ctrlCurveLinear}`,

    '@media screen and (prefers-reduced-motion: reduce)': {
      transitionDuration: '0.01ms',
    },
  },

  ring: {
    // Show the ::before pseudo-element, which is the ring
    '::before': { content: '""' },
  },
  ringBadgeCutout: {
    '::before': { maskImage: badgeMask(/*margin =*/ `2 * var(${vars.ringWidth})`) },
  },
  ringThick: {
    [vars.ringWidth]: avatarTokens.ctrlStrokeWidthThick,
  },
  ringThicker: {
    [vars.ringWidth]: avatarTokens.ctrlStrokeWidthThicker,
  },
  ringThickest: {
    [vars.ringWidth]: avatarTokens.ctrlStrokeWidthThickest,
  },

  shadow: {
    // Show the ::after pseudo-element, which is the shadow
    '::after': { content: '""' },
  },
  shadow4: {
    '::after': { boxShadow: avatarTokens.ctrlShadow4 },
  },
  shadow8: {
    '::after': { boxShadow: avatarTokens.ctrlShadow8 },
  },
  shadow16: {
    '::after': { boxShadow: avatarTokens.ctrlShadow16 },
  },
  shadow28: {
    '::after': { boxShadow: avatarTokens.ctrlShadow28 },
  },

  inactive: {
    opacity: '0.8',
    transform: 'scale(0.875)',
    transitionTimingFunction: `${avatarTokens.ctrlCurveDecelerateMin}, ${avatarTokens.ctrlCurveLinear}`,

    '::before,::after': {
      margin: 0,
      opacity: 0,
      transitionTimingFunction: `${avatarTokens.ctrlCurveDecelerateMin}, ${avatarTokens.ctrlCurveLinear}`,
    },
  },

  // Applied to the badge slot
  badge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },

  // Applied to the image, initials, or icon slot when there is a badge
  badgeCutout: {
    maskImage: badgeMask(),
  },

  // Applied to the root when there is a badge
  badgeAlign: {
    // Griffel won't auto-flip the "right" alignment to "left" in RTL if it is inline in the maskImage,
    // so split it out into a css variable that will auto-flip.
    [vars.badgeAlign]: 'right',
  },

  // Badge size: applied to root when there is a badge
  tiny: {
    [vars.badgeRadius]: '3px',
    [vars.badgeGap]: avatarTokens.ctrlStrokeWidthThin,
  },
  'extra-small': {
    [vars.badgeRadius]: '5px',
    [vars.badgeGap]: avatarTokens.ctrlStrokeWidthThin,
  },
  small: {
    [vars.badgeRadius]: '6px',
    [vars.badgeGap]: avatarTokens.ctrlStrokeWidthThin,
  },
  medium: {
    [vars.badgeRadius]: '8px',
    [vars.badgeGap]: avatarTokens.ctrlStrokeWidthThin,
  },
  large: {
    [vars.badgeRadius]: '10px',
    [vars.badgeGap]: avatarTokens.ctrlStrokeWidthThick,
  },
  'extra-large': {
    [vars.badgeRadius]: '14px',
    [vars.badgeGap]: avatarTokens.ctrlStrokeWidthThick,
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
    color: avatarTokens.ctrlColorNeutralForeground3,
    backgroundColor: avatarTokens.ctrlColorNeutralBackground6,
  },
  brand: {
    color: avatarTokens.ctrlColorNeutralForegroundStaticInverted,
    backgroundColor: avatarTokens.ctrlColorBrandBackgroundStatic,
  },
  'dark-red': {
    color: avatarTokens.ctrlColorPaletteDarkRedForeground2,
    backgroundColor: avatarTokens.ctrlColorPaletteDarkRedBackground2,
  },
  cranberry: {
    color: avatarTokens.ctrlColorPaletteCranberryForeground2,
    backgroundColor: avatarTokens.ctrlColorPaletteCranberryBackground2,
  },
  red: {
    color: avatarTokens.ctrlColorPaletteRedForeground2,
    backgroundColor: avatarTokens.ctrlColorPaletteRedBackground2,
  },
  pumpkin: {
    color: avatarTokens.ctrlColorPalettePumpkinForeground2,
    backgroundColor: avatarTokens.ctrlColorPalettePumpkinBackground2,
  },
  peach: {
    color: avatarTokens.ctrlColorPalettePeachForeground2,
    backgroundColor: avatarTokens.ctrlColorPalettePeachBackground2,
  },
  marigold: {
    color: avatarTokens.ctrlColorPaletteMarigoldForeground2,
    backgroundColor: avatarTokens.ctrlColorPaletteMarigoldBackground2,
  },
  gold: {
    color: avatarTokens.ctrlColorPaletteGoldForeground2,
    backgroundColor: avatarTokens.ctrlColorPaletteGoldBackground2,
  },
  brass: {
    color: avatarTokens.ctrlColorPaletteBrassForeground2,
    backgroundColor: avatarTokens.ctrlColorPaletteBrassBackground2,
  },
  brown: {
    color: avatarTokens.ctrlColorPaletteBrownForeground2,
    backgroundColor: avatarTokens.ctrlColorPaletteBrownBackground2,
  },
  forest: {
    color: avatarTokens.ctrlColorPaletteForestForeground2,
    backgroundColor: avatarTokens.ctrlColorPaletteForestBackground2,
  },
  seafoam: {
    color: avatarTokens.ctrlColorPaletteSeafoamForeground2,
    backgroundColor: avatarTokens.ctrlColorPaletteSeafoamBackground2,
  },
  'dark-green': {
    color: avatarTokens.ctrlColorPaletteDarkGreenForeground2,
    backgroundColor: avatarTokens.ctrlColorPaletteDarkGreenBackground2,
  },
  'light-teal': {
    color: avatarTokens.ctrlColorPaletteLightTealForeground2,
    backgroundColor: avatarTokens.ctrlColorPaletteLightTealBackground2,
  },
  teal: {
    color: avatarTokens.ctrlColorPaletteTealForeground2,
    backgroundColor: avatarTokens.ctrlColorPaletteTealBackground2,
  },
  steel: {
    color: avatarTokens.ctrlColorPaletteSteelForeground2,
    backgroundColor: avatarTokens.ctrlColorPaletteSteelBackground2,
  },
  blue: {
    color: avatarTokens.ctrlColorPaletteBlueForeground2,
    backgroundColor: avatarTokens.ctrlColorPaletteBlueBackground2,
  },
  'royal-blue': {
    color: avatarTokens.ctrlColorPaletteRoyalBlueForeground2,
    backgroundColor: avatarTokens.ctrlColorPaletteRoyalBlueBackground2,
  },
  cornflower: {
    color: avatarTokens.ctrlColorPaletteCornflowerForeground2,
    backgroundColor: avatarTokens.ctrlColorPaletteCornflowerBackground2,
  },
  navy: {
    color: avatarTokens.ctrlColorPaletteNavyForeground2,
    backgroundColor: avatarTokens.ctrlColorPaletteNavyBackground2,
  },
  lavender: {
    color: avatarTokens.ctrlColorPaletteLavenderForeground2,
    backgroundColor: avatarTokens.ctrlColorPaletteLavenderBackground2,
  },
  purple: {
    color: avatarTokens.ctrlColorPalettePurpleForeground2,
    backgroundColor: avatarTokens.ctrlColorPalettePurpleBackground2,
  },
  grape: {
    color: avatarTokens.ctrlColorPaletteGrapeForeground2,
    backgroundColor: avatarTokens.ctrlColorPaletteGrapeBackground2,
  },
  lilac: {
    color: avatarTokens.ctrlColorPaletteLilacForeground2,
    backgroundColor: avatarTokens.ctrlColorPaletteLilacBackground2,
  },
  pink: {
    color: avatarTokens.ctrlColorPalettePinkForeground2,
    backgroundColor: avatarTokens.ctrlColorPalettePinkBackground2,
  },
  magenta: {
    color: avatarTokens.ctrlColorPaletteMagentaForeground2,
    backgroundColor: avatarTokens.ctrlColorPaletteMagentaBackground2,
  },
  plum: {
    color: avatarTokens.ctrlColorPalettePlumForeground2,
    backgroundColor: avatarTokens.ctrlColorPalettePlumBackground2,
  },
  beige: {
    color: avatarTokens.ctrlColorPaletteBeigeForeground2,
    backgroundColor: avatarTokens.ctrlColorPaletteBeigeBackground2,
  },
  mink: {
    color: avatarTokens.ctrlColorPaletteMinkForeground2,
    backgroundColor: avatarTokens.ctrlColorPaletteMinkBackground2,
  },
  platinum: {
    color: avatarTokens.ctrlColorPalettePlatinumForeground2,
    backgroundColor: avatarTokens.ctrlColorPalettePlatinumBackground2,
  },
  anchor: {
    color: avatarTokens.ctrlColorPaletteAnchorForeground2,
    backgroundColor: avatarTokens.ctrlColorPaletteAnchorBackground2,
  },
});

const useRingColorStyles = makeStyles({
  neutral: {
    '::before': { color: avatarTokens.ctrlColorBrandStroke1 },
  },
  brand: {
    '::before': { color: avatarTokens.ctrlColorBrandStroke1 },
  },
  'dark-red': {
    '::before': { color: avatarTokens.ctrlColorPaletteDarkRedBorderActive },
  },
  cranberry: {
    '::before': { color: avatarTokens.ctrlColorPaletteCranberryBorderActive },
  },
  red: {
    '::before': { color: avatarTokens.ctrlColorPaletteRedBorderActive },
  },
  pumpkin: {
    '::before': { color: avatarTokens.ctrlColorPalettePumpkinBorderActive },
  },
  peach: {
    '::before': { color: avatarTokens.ctrlColorPalettePeachBorderActive },
  },
  marigold: {
    '::before': { color: avatarTokens.ctrlColorPaletteMarigoldBorderActive },
  },
  gold: {
    '::before': { color: avatarTokens.ctrlColorPaletteGoldBorderActive },
  },
  brass: {
    '::before': { color: avatarTokens.ctrlColorPaletteBrassBorderActive },
  },
  brown: {
    '::before': { color: avatarTokens.ctrlColorPaletteBrownBorderActive },
  },
  forest: {
    '::before': { color: avatarTokens.ctrlColorPaletteForestBorderActive },
  },
  seafoam: {
    '::before': { color: avatarTokens.ctrlColorPaletteSeafoamBorderActive },
  },
  'dark-green': {
    '::before': { color: avatarTokens.ctrlColorPaletteDarkGreenBorderActive },
  },
  'light-teal': {
    '::before': { color: avatarTokens.ctrlColorPaletteLightTealBorderActive },
  },
  teal: {
    '::before': { color: avatarTokens.ctrlColorPaletteTealBorderActive },
  },
  steel: {
    '::before': { color: avatarTokens.ctrlColorPaletteSteelBorderActive },
  },
  blue: {
    '::before': { color: avatarTokens.ctrlColorPaletteBlueBorderActive },
  },
  'royal-blue': {
    '::before': { color: avatarTokens.ctrlColorPaletteRoyalBlueBorderActive },
  },
  cornflower: {
    '::before': { color: avatarTokens.ctrlColorPaletteCornflowerBorderActive },
  },
  navy: {
    '::before': { color: avatarTokens.ctrlColorPaletteNavyBorderActive },
  },
  lavender: {
    '::before': { color: avatarTokens.ctrlColorPaletteLavenderBorderActive },
  },
  purple: {
    '::before': { color: avatarTokens.ctrlColorPalettePurpleBorderActive },
  },
  grape: {
    '::before': { color: avatarTokens.ctrlColorPaletteGrapeBorderActive },
  },
  lilac: {
    '::before': { color: avatarTokens.ctrlColorPaletteLilacBorderActive },
  },
  pink: {
    '::before': { color: avatarTokens.ctrlColorPalettePinkBorderActive },
  },
  magenta: {
    '::before': { color: avatarTokens.ctrlColorPaletteMagentaBorderActive },
  },
  plum: {
    '::before': { color: avatarTokens.ctrlColorPalettePlumBorderActive },
  },
  beige: {
    '::before': { color: avatarTokens.ctrlColorPaletteBeigeBorderActive },
  },
  mink: {
    '::before': { color: avatarTokens.ctrlColorPaletteMinkBorderActive },
  },
  platinum: {
    '::before': { color: avatarTokens.ctrlColorPalettePlatinumBorderActive },
  },
  anchor: {
    '::before': { color: avatarTokens.ctrlColorPaletteAnchorBorderActive },
  },
});

export const useAvatarStyles_unstable = (state: AvatarState): AvatarState => {
  'use no memo';

  const { size, shape, active, activeAppearance, color } = state;

  const rootClassName = useRootClassName();
  const imageClassName = useImageClassName();
  const iconInitialsClassName = useIconInitialsClassName();
  const styles = useStyles();
  const sizeStyles = useSizeStyles();
  const colorStyles = useColorStyles();
  const ringColorStyles = useRingColorStyles();

  const rootClasses = [rootClassName, size !== 32 && sizeStyles[size]];

  if (state.badge) {
    rootClasses.push(styles.badgeAlign, styles[state.badge.size || 'medium']);
  }

  if (size <= 24) {
    rootClasses.push(styles.textCaption2Strong);
  } else if (size <= 28) {
    rootClasses.push(styles.textCaption1Strong);
  } else if (size <= 40) {
    // Default text size included in useRootClassName
  } else if (size <= 56) {
    rootClasses.push(styles.textSubtitle2);
  } else if (size <= 96) {
    rootClasses.push(styles.textSubtitle1);
  } else {
    rootClasses.push(styles.textTitle3);
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
      rootClasses.push(styles.ring, ringColorStyles[color]);
      if (state.badge) {
        rootClasses.push(styles.ringBadgeCutout);
      }

      if (size <= 48) {
        rootClasses.push(styles.ringThick);
      } else if (size <= 64) {
        rootClasses.push(styles.ringThicker);
      } else {
        rootClasses.push(styles.ringThickest);
      }
    }

    if (activeAppearance === 'shadow' || activeAppearance === 'ring-shadow') {
      rootClasses.push(styles.shadow);
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
    state.badge.className = mergeClasses(avatarClassNames.badge, styles.badge, state.badge.className);
  }

  if (state.image) {
    state.image.className = mergeClasses(
      avatarClassNames.image,
      imageClassName,
      colorStyles[color],
      state.badge && styles.badgeCutout,
      state.image.className,
    );
  }

  if (state.initials) {
    state.initials.className = mergeClasses(
      avatarClassNames.initials,
      iconInitialsClassName,
      colorStyles[color],
      state.badge && styles.badgeCutout,
      state.initials.className,
    );
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
      iconInitialsClassName,
      iconSizeClass,
      colorStyles[color],
      state.badge && styles.badgeCutout,
      state.icon.className,
    );
  }

  return state;
};
