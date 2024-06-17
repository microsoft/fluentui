import { tokens } from '@fluentui/react-theme';
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
  borderRadius: `var(--53, var(--54, ${tokens.borderRadiusCircular}))`,
  fontFamily: `var(--55, var(--56, ${tokens.fontFamilyBase}))`,
  fontWeight: `var(--57, var(--58, ${tokens.fontWeightSemibold}))`,
  fontSize: `var(--59, var(--60, ${tokens.fontSizeBase300}))`,
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
    transitionTimingFunction: `${tokens.curveEasyEaseMax}, ${tokens.curveLinear}`,
    transitionDuration: `${tokens.durationUltraSlow}, ${tokens.durationSlower}`,
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
  border: `${tokens.strokeWidthThin} solid ${tokens.colorTransparentStroke}`,

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
  textCaption2Strong: {
    fontSize: `var(--61, var(--62, ${tokens.fontSizeBase100}))`,
  },
  textCaption1Strong: {
    fontSize: `var(--63, var(--64, ${tokens.fontSizeBase200}))`,
  },
  textSubtitle2: {
    fontSize: `var(--65, var(--66, ${tokens.fontSizeBase400}))`,
  },
  textSubtitle1: {
    fontSize: `var(--67, var(--68, ${tokens.fontSizeBase500}))`,
  },
  textTitle3: { fontSize: `var(--69, var(--70, ${tokens.fontSizeBase600}))` },

  squareSmall: {
    borderRadius: `var(--71, var(--72, ${tokens.borderRadiusSmall}))`,
  },
  squareMedium: {
    borderRadius: `var(--73, var(--74, ${tokens.borderRadiusMedium}))`,
  },
  squareLarge: {
    borderRadius: `var(--75, var(--76, ${tokens.borderRadiusLarge}))`,
  },
  squareXLarge: {
    borderRadius: `var(--77, var(--78, ${tokens.borderRadiusXLarge}))`,
  },

  activeOrInactive: {
    transform: 'perspective(1px)', // Work-around for text pixel snapping at the end of the animation
    transitionProperty: 'transform, opacity',
    transitionDuration: `${tokens.durationUltraSlow}, ${tokens.durationFaster}`,
    transitionTimingFunction: `${tokens.curveEasyEaseMax}, ${tokens.curveLinear}`,

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
    [vars.ringWidth]: `var(--79, var(--80, ${tokens.strokeWidthThick}))`,
  },
  ringThicker: {
    [vars.ringWidth]: `var(--81, var(--82, ${tokens.strokeWidthThicker}))`,
  },
  ringThickest: {
    [vars.ringWidth]: `var(--83, var(--84, ${tokens.strokeWidthThickest}))`,
  },

  shadow: {
    // Show the ::after pseudo-element, which is the shadow
    '::after': { content: '""' },
  },
  shadow4: {
    '::after': { boxShadow: `var(--85, var(--86, ${tokens.shadow4}))` },
  },
  shadow8: {
    '::after': { boxShadow: `var(--87, var(--88, ${tokens.shadow8}))` },
  },
  shadow16: {
    '::after': { boxShadow: `var(--89, var(--90, ${tokens.shadow16}))` },
  },
  shadow28: {
    '::after': { boxShadow: `var(--91, var(--92, ${tokens.shadow28}))` },
  },

  inactive: {
    opacity: '0.8',
    transform: 'scale(0.875)',
    transitionTimingFunction: `${tokens.curveDecelerateMin}, ${tokens.curveLinear}`,

    '::before,::after': {
      margin: 0,
      opacity: 0,
      transitionTimingFunction: `${tokens.curveDecelerateMin}, ${tokens.curveLinear}`,
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
    [vars.badgeGap]: `var(--93, var(--94, ${tokens.strokeWidthThin}))`,
  },
  'extra-small': {
    [vars.badgeRadius]: '5px',
    [vars.badgeGap]: `var(--95, var(--96, ${tokens.strokeWidthThin}))`,
  },
  small: {
    [vars.badgeRadius]: '6px',
    [vars.badgeGap]: `var(--97, var(--98, ${tokens.strokeWidthThin}))`,
  },
  medium: {
    [vars.badgeRadius]: '8px',
    [vars.badgeGap]: `var(--99, var(--100, ${tokens.strokeWidthThin}))`,
  },
  large: {
    [vars.badgeRadius]: '10px',
    [vars.badgeGap]: `var(--101, var(--102, ${tokens.strokeWidthThick}))`,
  },
  'extra-large': {
    [vars.badgeRadius]: '14px',
    [vars.badgeGap]: `var(--103, var(--104, ${tokens.strokeWidthThick}))`,
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
    color: `var(--105, var(--106, ${tokens.colorNeutralForeground3}))`,
    backgroundColor: `var(--107, var(--108, ${tokens.colorNeutralBackground6}))`,
  },
  brand: {
    color: `var(--109, var(--110, ${tokens.colorNeutralForegroundStaticInverted}))`,
    backgroundColor: `var(--111, var(--112, ${tokens.colorBrandBackgroundStatic}))`,
  },
  'dark-red': {
    color: `var(--113, var(--114, ${tokens.colorPaletteDarkRedForeground2}))`,
    backgroundColor: `var(--115, var(--116, ${tokens.colorPaletteDarkRedBackground2}))`,
  },
  cranberry: {
    color: `var(--117, var(--118, ${tokens.colorPaletteCranberryForeground2}))`,
    backgroundColor: `var(--119, var(--120, ${tokens.colorPaletteCranberryBackground2}))`,
  },
  red: {
    color: `var(--121, var(--122, ${tokens.colorPaletteRedForeground2}))`,
    backgroundColor: `var(--123, var(--124, ${tokens.colorPaletteRedBackground2}))`,
  },
  pumpkin: {
    color: `var(--125, var(--126, ${tokens.colorPalettePumpkinForeground2}))`,
    backgroundColor: `var(--127, var(--128, ${tokens.colorPalettePumpkinBackground2}))`,
  },
  peach: {
    color: `var(--129, var(--130, ${tokens.colorPalettePeachForeground2}))`,
    backgroundColor: `var(--131, var(--132, ${tokens.colorPalettePeachBackground2}))`,
  },
  marigold: {
    color: `var(--133, var(--134, ${tokens.colorPaletteMarigoldForeground2}))`,
    backgroundColor: `var(--135, var(--136, ${tokens.colorPaletteMarigoldBackground2}))`,
  },
  gold: {
    color: `var(--137, var(--138, ${tokens.colorPaletteGoldForeground2}))`,
    backgroundColor: `var(--139, var(--140, ${tokens.colorPaletteGoldBackground2}))`,
  },
  brass: {
    color: `var(--141, var(--142, ${tokens.colorPaletteBrassForeground2}))`,
    backgroundColor: `var(--143, var(--144, ${tokens.colorPaletteBrassBackground2}))`,
  },
  brown: {
    color: `var(--145, var(--146, ${tokens.colorPaletteBrownForeground2}))`,
    backgroundColor: `var(--147, var(--148, ${tokens.colorPaletteBrownBackground2}))`,
  },
  forest: {
    color: `var(--149, var(--150, ${tokens.colorPaletteForestForeground2}))`,
    backgroundColor: `var(--151, var(--152, ${tokens.colorPaletteForestBackground2}))`,
  },
  seafoam: {
    color: `var(--153, var(--154, ${tokens.colorPaletteSeafoamForeground2}))`,
    backgroundColor: `var(--155, var(--156, ${tokens.colorPaletteSeafoamBackground2}))`,
  },
  'dark-green': {
    color: `var(--157, var(--158, ${tokens.colorPaletteDarkGreenForeground2}))`,
    backgroundColor: `var(--159, var(--160, ${tokens.colorPaletteDarkGreenBackground2}))`,
  },
  'light-teal': {
    color: `var(--161, var(--162, ${tokens.colorPaletteLightTealForeground2}))`,
    backgroundColor: `var(--163, var(--164, ${tokens.colorPaletteLightTealBackground2}))`,
  },
  teal: {
    color: `var(--165, var(--166, ${tokens.colorPaletteTealForeground2}))`,
    backgroundColor: `var(--167, var(--168, ${tokens.colorPaletteTealBackground2}))`,
  },
  steel: {
    color: `var(--169, var(--170, ${tokens.colorPaletteSteelForeground2}))`,
    backgroundColor: `var(--171, var(--172, ${tokens.colorPaletteSteelBackground2}))`,
  },
  blue: {
    color: `var(--173, var(--174, ${tokens.colorPaletteBlueForeground2}))`,
    backgroundColor: `var(--175, var(--176, ${tokens.colorPaletteBlueBackground2}))`,
  },
  'royal-blue': {
    color: `var(--177, var(--178, ${tokens.colorPaletteRoyalBlueForeground2}))`,
    backgroundColor: `var(--179, var(--180, ${tokens.colorPaletteRoyalBlueBackground2}))`,
  },
  cornflower: {
    color: `var(--181, var(--182, ${tokens.colorPaletteCornflowerForeground2}))`,
    backgroundColor: `var(--183, var(--184, ${tokens.colorPaletteCornflowerBackground2}))`,
  },
  navy: {
    color: `var(--185, var(--186, ${tokens.colorPaletteNavyForeground2}))`,
    backgroundColor: `var(--187, var(--188, ${tokens.colorPaletteNavyBackground2}))`,
  },
  lavender: {
    color: `var(--189, var(--190, ${tokens.colorPaletteLavenderForeground2}))`,
    backgroundColor: `var(--191, var(--192, ${tokens.colorPaletteLavenderBackground2}))`,
  },
  purple: {
    color: `var(--193, var(--194, ${tokens.colorPalettePurpleForeground2}))`,
    backgroundColor: `var(--195, var(--196, ${tokens.colorPalettePurpleBackground2}))`,
  },
  grape: {
    color: `var(--197, var(--198, ${tokens.colorPaletteGrapeForeground2}))`,
    backgroundColor: `var(--199, var(--200, ${tokens.colorPaletteGrapeBackground2}))`,
  },
  lilac: {
    color: `var(--201, var(--202, ${tokens.colorPaletteLilacForeground2}))`,
    backgroundColor: `var(--203, var(--204, ${tokens.colorPaletteLilacBackground2}))`,
  },
  pink: {
    color: `var(--205, var(--206, ${tokens.colorPalettePinkForeground2}))`,
    backgroundColor: `var(--207, var(--208, ${tokens.colorPalettePinkBackground2}))`,
  },
  magenta: {
    color: `var(--209, var(--210, ${tokens.colorPaletteMagentaForeground2}))`,
    backgroundColor: `var(--211, var(--212, ${tokens.colorPaletteMagentaBackground2}))`,
  },
  plum: {
    color: `var(--213, var(--214, ${tokens.colorPalettePlumForeground2}))`,
    backgroundColor: `var(--215, var(--216, ${tokens.colorPalettePlumBackground2}))`,
  },
  beige: {
    color: `var(--217, var(--218, ${tokens.colorPaletteBeigeForeground2}))`,
    backgroundColor: `var(--219, var(--220, ${tokens.colorPaletteBeigeBackground2}))`,
  },
  mink: {
    color: `var(--221, var(--222, ${tokens.colorPaletteMinkForeground2}))`,
    backgroundColor: `var(--223, var(--224, ${tokens.colorPaletteMinkBackground2}))`,
  },
  platinum: {
    color: `var(--225, var(--226, ${tokens.colorPalettePlatinumForeground2}))`,
    backgroundColor: `var(--227, var(--228, ${tokens.colorPalettePlatinumBackground2}))`,
  },
  anchor: {
    color: `var(--229, var(--230, ${tokens.colorPaletteAnchorForeground2}))`,
    backgroundColor: `var(--231, var(--232, ${tokens.colorPaletteAnchorBackground2}))`,
  },
});

const useRingColorStyles = makeStyles({
  neutral: {
    '::before': {
      color: `var(--233, var(--234, ${tokens.colorBrandStroke1}))`,
    },
  },
  brand: {
    '::before': {
      color: `var(--235, var(--236, ${tokens.colorBrandStroke1}))`,
    },
  },
  'dark-red': {
    '::before': {
      color: `var(--237, var(--238, ${tokens.colorPaletteDarkRedBorderActive}))`,
    },
  },
  cranberry: {
    '::before': {
      color: `var(--239, var(--240, ${tokens.colorPaletteCranberryBorderActive}))`,
    },
  },
  red: {
    '::before': {
      color: `var(--241, var(--242, ${tokens.colorPaletteRedBorderActive}))`,
    },
  },
  pumpkin: {
    '::before': {
      color: `var(--243, var(--244, ${tokens.colorPalettePumpkinBorderActive}))`,
    },
  },
  peach: {
    '::before': {
      color: `var(--245, var(--246, ${tokens.colorPalettePeachBorderActive}))`,
    },
  },
  marigold: {
    '::before': {
      color: `var(--247, var(--248, ${tokens.colorPaletteMarigoldBorderActive}))`,
    },
  },
  gold: {
    '::before': {
      color: `var(--249, var(--250, ${tokens.colorPaletteGoldBorderActive}))`,
    },
  },
  brass: {
    '::before': {
      color: `var(--251, var(--252, ${tokens.colorPaletteBrassBorderActive}))`,
    },
  },
  brown: {
    '::before': {
      color: `var(--253, var(--254, ${tokens.colorPaletteBrownBorderActive}))`,
    },
  },
  forest: {
    '::before': {
      color: `var(--255, var(--256, ${tokens.colorPaletteForestBorderActive}))`,
    },
  },
  seafoam: {
    '::before': {
      color: `var(--257, var(--258, ${tokens.colorPaletteSeafoamBorderActive}))`,
    },
  },
  'dark-green': {
    '::before': {
      color: `var(--259, var(--260, ${tokens.colorPaletteDarkGreenBorderActive}))`,
    },
  },
  'light-teal': {
    '::before': {
      color: `var(--261, var(--262, ${tokens.colorPaletteLightTealBorderActive}))`,
    },
  },
  teal: {
    '::before': {
      color: `var(--263, var(--264, ${tokens.colorPaletteTealBorderActive}))`,
    },
  },
  steel: {
    '::before': {
      color: `var(--265, var(--266, ${tokens.colorPaletteSteelBorderActive}))`,
    },
  },
  blue: {
    '::before': {
      color: `var(--267, var(--268, ${tokens.colorPaletteBlueBorderActive}))`,
    },
  },
  'royal-blue': {
    '::before': {
      color: `var(--269, var(--270, ${tokens.colorPaletteRoyalBlueBorderActive}))`,
    },
  },
  cornflower: {
    '::before': {
      color: `var(--271, var(--272, ${tokens.colorPaletteCornflowerBorderActive}))`,
    },
  },
  navy: {
    '::before': {
      color: `var(--273, var(--274, ${tokens.colorPaletteNavyBorderActive}))`,
    },
  },
  lavender: {
    '::before': {
      color: `var(--275, var(--276, ${tokens.colorPaletteLavenderBorderActive}))`,
    },
  },
  purple: {
    '::before': {
      color: `var(--277, var(--278, ${tokens.colorPalettePurpleBorderActive}))`,
    },
  },
  grape: {
    '::before': {
      color: `var(--279, var(--280, ${tokens.colorPaletteGrapeBorderActive}))`,
    },
  },
  lilac: {
    '::before': {
      color: `var(--281, var(--282, ${tokens.colorPaletteLilacBorderActive}))`,
    },
  },
  pink: {
    '::before': {
      color: `var(--283, var(--284, ${tokens.colorPalettePinkBorderActive}))`,
    },
  },
  magenta: {
    '::before': {
      color: `var(--285, var(--286, ${tokens.colorPaletteMagentaBorderActive}))`,
    },
  },
  plum: {
    '::before': {
      color: `var(--287, var(--288, ${tokens.colorPalettePlumBorderActive}))`,
    },
  },
  beige: {
    '::before': {
      color: `var(--289, var(--290, ${tokens.colorPaletteBeigeBorderActive}))`,
    },
  },
  mink: {
    '::before': {
      color: `var(--291, var(--292, ${tokens.colorPaletteMinkBorderActive}))`,
    },
  },
  platinum: {
    '::before': {
      color: `var(--293, var(--294, ${tokens.colorPalettePlatinumBorderActive}))`,
    },
  },
  anchor: {
    '::before': {
      color: `var(--295, var(--296, ${tokens.colorPaletteAnchorBorderActive}))`,
    },
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
