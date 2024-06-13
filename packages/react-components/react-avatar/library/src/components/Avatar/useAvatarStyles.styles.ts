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
  borderRadius: `var(--ctrl-token-Avatar-53, var(--semantic-token-Avatar-54, ${tokens.borderRadiusCircular}))`,
  fontFamily: `var(--ctrl-token-Avatar-55, var(--semantic-token-Avatar-56, ${tokens.fontFamilyBase}))`,
  fontWeight: `var(--ctrl-token-Avatar-57, var(--semantic-token-Avatar-58, ${tokens.fontWeightSemibold}))`,
  fontSize: `var(--ctrl-token-Avatar-59, var(--semantic-token-Avatar-60, ${tokens.fontSizeBase300}))`,
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
  textCaption2Strong: { fontSize: `var(--ctrl-token-Avatar-61, var(--semantic-token-Avatar-62, ${tokens.fontSizeBase100}))` },
  textCaption1Strong: { fontSize: `var(--ctrl-token-Avatar-63, var(--semantic-token-Avatar-64, ${tokens.fontSizeBase200}))` },
  textSubtitle2: { fontSize: `var(--ctrl-token-Avatar-65, var(--semantic-token-Avatar-66, ${tokens.fontSizeBase400}))` },
  textSubtitle1: { fontSize: `var(--ctrl-token-Avatar-67, var(--semantic-token-Avatar-68, ${tokens.fontSizeBase500}))` },
  textTitle3: { fontSize: `var(--ctrl-token-Avatar-69, var(--semantic-token-Avatar-70, ${tokens.fontSizeBase600}))` },

  squareSmall: { borderRadius: `var(--ctrl-token-Avatar-71, var(--semantic-token-Avatar-72, ${tokens.borderRadiusSmall}))` },
  squareMedium: { borderRadius: `var(--ctrl-token-Avatar-73, var(--semantic-token-Avatar-74, ${tokens.borderRadiusMedium}))` },
  squareLarge: { borderRadius: `var(--ctrl-token-Avatar-75, var(--semantic-token-Avatar-76, ${tokens.borderRadiusLarge}))` },
  squareXLarge: { borderRadius: `var(--ctrl-token-Avatar-77, var(--semantic-token-Avatar-78, ${tokens.borderRadiusXLarge}))` },

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
    [vars.ringWidth]: `var(--ctrl-token-Avatar-79, var(--semantic-token-Avatar-80, ${tokens.strokeWidthThick}))`,
  },
  ringThicker: {
    [vars.ringWidth]: `var(--ctrl-token-Avatar-81, var(--semantic-token-Avatar-82, ${tokens.strokeWidthThicker}))`,
  },
  ringThickest: {
    [vars.ringWidth]: `var(--ctrl-token-Avatar-83, var(--semantic-token-Avatar-84, ${tokens.strokeWidthThickest}))`,
  },

  shadow: {
    // Show the ::after pseudo-element, which is the shadow
    '::after': { content: '""' },
  },
  shadow4: {
    '::after': { boxShadow: `var(--ctrl-token-Avatar-85, var(--semantic-token-Avatar-86, ${tokens.shadow4}))` },
  },
  shadow8: {
    '::after': { boxShadow: `var(--ctrl-token-Avatar-87, var(--semantic-token-Avatar-88, ${tokens.shadow8}))` },
  },
  shadow16: {
    '::after': { boxShadow: `var(--ctrl-token-Avatar-89, var(--semantic-token-Avatar-90, ${tokens.shadow16}))` },
  },
  shadow28: {
    '::after': { boxShadow: `var(--ctrl-token-Avatar-91, var(--semantic-token-Avatar-92, ${tokens.shadow28}))` },
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
    [vars.badgeGap]: `var(--ctrl-token-Avatar-93, var(--semantic-token-Avatar-94, ${tokens.strokeWidthThin}))`,
  },
  'extra-small': {
    [vars.badgeRadius]: '5px',
    [vars.badgeGap]: `var(--ctrl-token-Avatar-95, var(--semantic-token-Avatar-96, ${tokens.strokeWidthThin}))`,
  },
  small: {
    [vars.badgeRadius]: '6px',
    [vars.badgeGap]: `var(--ctrl-token-Avatar-97, var(--semantic-token-Avatar-98, ${tokens.strokeWidthThin}))`,
  },
  medium: {
    [vars.badgeRadius]: '8px',
    [vars.badgeGap]: `var(--ctrl-token-Avatar-99, var(--semantic-token-Avatar-100, ${tokens.strokeWidthThin}))`,
  },
  large: {
    [vars.badgeRadius]: '10px',
    [vars.badgeGap]: `var(--ctrl-token-Avatar-101, var(--semantic-token-Avatar-102, ${tokens.strokeWidthThick}))`,
  },
  'extra-large': {
    [vars.badgeRadius]: '14px',
    [vars.badgeGap]: `var(--ctrl-token-Avatar-103, var(--semantic-token-Avatar-104, ${tokens.strokeWidthThick}))`,
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
    color: `var(--ctrl-token-Avatar-105, var(--semantic-token-Avatar-106, ${tokens.colorNeutralForeground3}))`,
    backgroundColor: `var(--ctrl-token-Avatar-107, var(--semantic-token-Avatar-108, ${tokens.colorNeutralBackground6}))`,
  },
  brand: {
    color: `var(--ctrl-token-Avatar-109, var(--semantic-token-Avatar-110, ${tokens.colorNeutralForegroundStaticInverted}))`,
    backgroundColor: `var(--ctrl-token-Avatar-111, var(--semantic-token-Avatar-112, ${tokens.colorBrandBackgroundStatic}))`,
  },
  'dark-red': {
    color: `var(--ctrl-token-Avatar-113, var(--semantic-token-Avatar-114, ${tokens.colorPaletteDarkRedForeground2}))`,
    backgroundColor: `var(--ctrl-token-Avatar-115, var(--semantic-token-Avatar-116, ${tokens.colorPaletteDarkRedBackground2}))`,
  },
  cranberry: {
    color: `var(--ctrl-token-Avatar-117, var(--semantic-token-Avatar-118, ${tokens.colorPaletteCranberryForeground2}))`,
    backgroundColor: `var(--ctrl-token-Avatar-119, var(--semantic-token-Avatar-120, ${tokens.colorPaletteCranberryBackground2}))`,
  },
  red: {
    color: `var(--ctrl-token-Avatar-121, var(--semantic-token-Avatar-122, ${tokens.colorPaletteRedForeground2}))`,
    backgroundColor: `var(--ctrl-token-Avatar-123, var(--semantic-token-Avatar-124, ${tokens.colorPaletteRedBackground2}))`,
  },
  pumpkin: {
    color: `var(--ctrl-token-Avatar-125, var(--semantic-token-Avatar-126, ${tokens.colorPalettePumpkinForeground2}))`,
    backgroundColor: `var(--ctrl-token-Avatar-127, var(--semantic-token-Avatar-128, ${tokens.colorPalettePumpkinBackground2}))`,
  },
  peach: {
    color: `var(--ctrl-token-Avatar-129, var(--semantic-token-Avatar-130, ${tokens.colorPalettePeachForeground2}))`,
    backgroundColor: `var(--ctrl-token-Avatar-131, var(--semantic-token-Avatar-132, ${tokens.colorPalettePeachBackground2}))`,
  },
  marigold: {
    color: `var(--ctrl-token-Avatar-133, var(--semantic-token-Avatar-134, ${tokens.colorPaletteMarigoldForeground2}))`,
    backgroundColor: `var(--ctrl-token-Avatar-135, var(--semantic-token-Avatar-136, ${tokens.colorPaletteMarigoldBackground2}))`,
  },
  gold: {
    color: `var(--ctrl-token-Avatar-137, var(--semantic-token-Avatar-138, ${tokens.colorPaletteGoldForeground2}))`,
    backgroundColor: `var(--ctrl-token-Avatar-139, var(--semantic-token-Avatar-140, ${tokens.colorPaletteGoldBackground2}))`,
  },
  brass: {
    color: `var(--ctrl-token-Avatar-141, var(--semantic-token-Avatar-142, ${tokens.colorPaletteBrassForeground2}))`,
    backgroundColor: `var(--ctrl-token-Avatar-143, var(--semantic-token-Avatar-144, ${tokens.colorPaletteBrassBackground2}))`,
  },
  brown: {
    color: `var(--ctrl-token-Avatar-145, var(--semantic-token-Avatar-146, ${tokens.colorPaletteBrownForeground2}))`,
    backgroundColor: `var(--ctrl-token-Avatar-147, var(--semantic-token-Avatar-148, ${tokens.colorPaletteBrownBackground2}))`,
  },
  forest: {
    color: `var(--ctrl-token-Avatar-149, var(--semantic-token-Avatar-150, ${tokens.colorPaletteForestForeground2}))`,
    backgroundColor: `var(--ctrl-token-Avatar-151, var(--semantic-token-Avatar-152, ${tokens.colorPaletteForestBackground2}))`,
  },
  seafoam: {
    color: `var(--ctrl-token-Avatar-153, var(--semantic-token-Avatar-154, ${tokens.colorPaletteSeafoamForeground2}))`,
    backgroundColor: `var(--ctrl-token-Avatar-155, var(--semantic-token-Avatar-156, ${tokens.colorPaletteSeafoamBackground2}))`,
  },
  'dark-green': {
    color: `var(--ctrl-token-Avatar-157, var(--semantic-token-Avatar-158, ${tokens.colorPaletteDarkGreenForeground2}))`,
    backgroundColor: `var(--ctrl-token-Avatar-159, var(--semantic-token-Avatar-160, ${tokens.colorPaletteDarkGreenBackground2}))`,
  },
  'light-teal': {
    color: `var(--ctrl-token-Avatar-161, var(--semantic-token-Avatar-162, ${tokens.colorPaletteLightTealForeground2}))`,
    backgroundColor: `var(--ctrl-token-Avatar-163, var(--semantic-token-Avatar-164, ${tokens.colorPaletteLightTealBackground2}))`,
  },
  teal: {
    color: `var(--ctrl-token-Avatar-165, var(--semantic-token-Avatar-166, ${tokens.colorPaletteTealForeground2}))`,
    backgroundColor: `var(--ctrl-token-Avatar-167, var(--semantic-token-Avatar-168, ${tokens.colorPaletteTealBackground2}))`,
  },
  steel: {
    color: `var(--ctrl-token-Avatar-169, var(--semantic-token-Avatar-170, ${tokens.colorPaletteSteelForeground2}))`,
    backgroundColor: `var(--ctrl-token-Avatar-171, var(--semantic-token-Avatar-172, ${tokens.colorPaletteSteelBackground2}))`,
  },
  blue: {
    color: `var(--ctrl-token-Avatar-173, var(--semantic-token-Avatar-174, ${tokens.colorPaletteBlueForeground2}))`,
    backgroundColor: `var(--ctrl-token-Avatar-175, var(--semantic-token-Avatar-176, ${tokens.colorPaletteBlueBackground2}))`,
  },
  'royal-blue': {
    color: `var(--ctrl-token-Avatar-177, var(--semantic-token-Avatar-178, ${tokens.colorPaletteRoyalBlueForeground2}))`,
    backgroundColor: `var(--ctrl-token-Avatar-179, var(--semantic-token-Avatar-180, ${tokens.colorPaletteRoyalBlueBackground2}))`,
  },
  cornflower: {
    color: `var(--ctrl-token-Avatar-181, var(--semantic-token-Avatar-182, ${tokens.colorPaletteCornflowerForeground2}))`,
    backgroundColor: `var(--ctrl-token-Avatar-183, var(--semantic-token-Avatar-184, ${tokens.colorPaletteCornflowerBackground2}))`,
  },
  navy: {
    color: `var(--ctrl-token-Avatar-185, var(--semantic-token-Avatar-186, ${tokens.colorPaletteNavyForeground2}))`,
    backgroundColor: `var(--ctrl-token-Avatar-187, var(--semantic-token-Avatar-188, ${tokens.colorPaletteNavyBackground2}))`,
  },
  lavender: {
    color: `var(--ctrl-token-Avatar-189, var(--semantic-token-Avatar-190, ${tokens.colorPaletteLavenderForeground2}))`,
    backgroundColor: `var(--ctrl-token-Avatar-191, var(--semantic-token-Avatar-192, ${tokens.colorPaletteLavenderBackground2}))`,
  },
  purple: {
    color: `var(--ctrl-token-Avatar-193, var(--semantic-token-Avatar-194, ${tokens.colorPalettePurpleForeground2}))`,
    backgroundColor: `var(--ctrl-token-Avatar-195, var(--semantic-token-Avatar-196, ${tokens.colorPalettePurpleBackground2}))`,
  },
  grape: {
    color: `var(--ctrl-token-Avatar-197, var(--semantic-token-Avatar-198, ${tokens.colorPaletteGrapeForeground2}))`,
    backgroundColor: `var(--ctrl-token-Avatar-199, var(--semantic-token-Avatar-200, ${tokens.colorPaletteGrapeBackground2}))`,
  },
  lilac: {
    color: `var(--ctrl-token-Avatar-201, var(--semantic-token-Avatar-202, ${tokens.colorPaletteLilacForeground2}))`,
    backgroundColor: `var(--ctrl-token-Avatar-203, var(--semantic-token-Avatar-204, ${tokens.colorPaletteLilacBackground2}))`,
  },
  pink: {
    color: `var(--ctrl-token-Avatar-205, var(--semantic-token-Avatar-206, ${tokens.colorPalettePinkForeground2}))`,
    backgroundColor: `var(--ctrl-token-Avatar-207, var(--semantic-token-Avatar-208, ${tokens.colorPalettePinkBackground2}))`,
  },
  magenta: {
    color: `var(--ctrl-token-Avatar-209, var(--semantic-token-Avatar-210, ${tokens.colorPaletteMagentaForeground2}))`,
    backgroundColor: `var(--ctrl-token-Avatar-211, var(--semantic-token-Avatar-212, ${tokens.colorPaletteMagentaBackground2}))`,
  },
  plum: {
    color: `var(--ctrl-token-Avatar-213, var(--semantic-token-Avatar-214, ${tokens.colorPalettePlumForeground2}))`,
    backgroundColor: `var(--ctrl-token-Avatar-215, var(--semantic-token-Avatar-216, ${tokens.colorPalettePlumBackground2}))`,
  },
  beige: {
    color: `var(--ctrl-token-Avatar-217, var(--semantic-token-Avatar-218, ${tokens.colorPaletteBeigeForeground2}))`,
    backgroundColor: `var(--ctrl-token-Avatar-219, var(--semantic-token-Avatar-220, ${tokens.colorPaletteBeigeBackground2}))`,
  },
  mink: {
    color: `var(--ctrl-token-Avatar-221, var(--semantic-token-Avatar-222, ${tokens.colorPaletteMinkForeground2}))`,
    backgroundColor: `var(--ctrl-token-Avatar-223, var(--semantic-token-Avatar-224, ${tokens.colorPaletteMinkBackground2}))`,
  },
  platinum: {
    color: `var(--ctrl-token-Avatar-225, var(--semantic-token-Avatar-226, ${tokens.colorPalettePlatinumForeground2}))`,
    backgroundColor: `var(--ctrl-token-Avatar-227, var(--semantic-token-Avatar-228, ${tokens.colorPalettePlatinumBackground2}))`,
  },
  anchor: {
    color: `var(--ctrl-token-Avatar-229, var(--semantic-token-Avatar-230, ${tokens.colorPaletteAnchorForeground2}))`,
    backgroundColor: `var(--ctrl-token-Avatar-231, var(--semantic-token-Avatar-232, ${tokens.colorPaletteAnchorBackground2}))`,
  },
});

const useRingColorStyles = makeStyles({
  neutral: {
    '::before': { color: `var(--ctrl-token-Avatar-233, var(--semantic-token-Avatar-234, ${tokens.colorBrandStroke1}))` },
  },
  brand: {
    '::before': { color: `var(--ctrl-token-Avatar-235, var(--semantic-token-Avatar-236, ${tokens.colorBrandStroke1}))` },
  },
  'dark-red': {
    '::before': { color: `var(--ctrl-token-Avatar-237, var(--semantic-token-Avatar-238, ${tokens.colorPaletteDarkRedBorderActive}))` },
  },
  cranberry: {
    '::before': { color: `var(--ctrl-token-Avatar-239, var(--semantic-token-Avatar-240, ${tokens.colorPaletteCranberryBorderActive}))` },
  },
  red: {
    '::before': { color: `var(--ctrl-token-Avatar-241, var(--semantic-token-Avatar-242, ${tokens.colorPaletteRedBorderActive}))` },
  },
  pumpkin: {
    '::before': { color: `var(--ctrl-token-Avatar-243, var(--semantic-token-Avatar-244, ${tokens.colorPalettePumpkinBorderActive}))` },
  },
  peach: {
    '::before': { color: `var(--ctrl-token-Avatar-245, var(--semantic-token-Avatar-246, ${tokens.colorPalettePeachBorderActive}))` },
  },
  marigold: {
    '::before': { color: `var(--ctrl-token-Avatar-247, var(--semantic-token-Avatar-248, ${tokens.colorPaletteMarigoldBorderActive}))` },
  },
  gold: {
    '::before': { color: `var(--ctrl-token-Avatar-249, var(--semantic-token-Avatar-250, ${tokens.colorPaletteGoldBorderActive}))` },
  },
  brass: {
    '::before': { color: `var(--ctrl-token-Avatar-251, var(--semantic-token-Avatar-252, ${tokens.colorPaletteBrassBorderActive}))` },
  },
  brown: {
    '::before': { color: `var(--ctrl-token-Avatar-253, var(--semantic-token-Avatar-254, ${tokens.colorPaletteBrownBorderActive}))` },
  },
  forest: {
    '::before': { color: `var(--ctrl-token-Avatar-255, var(--semantic-token-Avatar-256, ${tokens.colorPaletteForestBorderActive}))` },
  },
  seafoam: {
    '::before': { color: `var(--ctrl-token-Avatar-257, var(--semantic-token-Avatar-258, ${tokens.colorPaletteSeafoamBorderActive}))` },
  },
  'dark-green': {
    '::before': { color: `var(--ctrl-token-Avatar-259, var(--semantic-token-Avatar-260, ${tokens.colorPaletteDarkGreenBorderActive}))` },
  },
  'light-teal': {
    '::before': { color: `var(--ctrl-token-Avatar-261, var(--semantic-token-Avatar-262, ${tokens.colorPaletteLightTealBorderActive}))` },
  },
  teal: {
    '::before': { color: `var(--ctrl-token-Avatar-263, var(--semantic-token-Avatar-264, ${tokens.colorPaletteTealBorderActive}))` },
  },
  steel: {
    '::before': { color: `var(--ctrl-token-Avatar-265, var(--semantic-token-Avatar-266, ${tokens.colorPaletteSteelBorderActive}))` },
  },
  blue: {
    '::before': { color: `var(--ctrl-token-Avatar-267, var(--semantic-token-Avatar-268, ${tokens.colorPaletteBlueBorderActive}))` },
  },
  'royal-blue': {
    '::before': { color: `var(--ctrl-token-Avatar-269, var(--semantic-token-Avatar-270, ${tokens.colorPaletteRoyalBlueBorderActive}))` },
  },
  cornflower: {
    '::before': { color: `var(--ctrl-token-Avatar-271, var(--semantic-token-Avatar-272, ${tokens.colorPaletteCornflowerBorderActive}))` },
  },
  navy: {
    '::before': { color: `var(--ctrl-token-Avatar-273, var(--semantic-token-Avatar-274, ${tokens.colorPaletteNavyBorderActive}))` },
  },
  lavender: {
    '::before': { color: `var(--ctrl-token-Avatar-275, var(--semantic-token-Avatar-276, ${tokens.colorPaletteLavenderBorderActive}))` },
  },
  purple: {
    '::before': { color: `var(--ctrl-token-Avatar-277, var(--semantic-token-Avatar-278, ${tokens.colorPalettePurpleBorderActive}))` },
  },
  grape: {
    '::before': { color: `var(--ctrl-token-Avatar-279, var(--semantic-token-Avatar-280, ${tokens.colorPaletteGrapeBorderActive}))` },
  },
  lilac: {
    '::before': { color: `var(--ctrl-token-Avatar-281, var(--semantic-token-Avatar-282, ${tokens.colorPaletteLilacBorderActive}))` },
  },
  pink: {
    '::before': { color: `var(--ctrl-token-Avatar-283, var(--semantic-token-Avatar-284, ${tokens.colorPalettePinkBorderActive}))` },
  },
  magenta: {
    '::before': { color: `var(--ctrl-token-Avatar-285, var(--semantic-token-Avatar-286, ${tokens.colorPaletteMagentaBorderActive}))` },
  },
  plum: {
    '::before': { color: `var(--ctrl-token-Avatar-287, var(--semantic-token-Avatar-288, ${tokens.colorPalettePlumBorderActive}))` },
  },
  beige: {
    '::before': { color: `var(--ctrl-token-Avatar-289, var(--semantic-token-Avatar-290, ${tokens.colorPaletteBeigeBorderActive}))` },
  },
  mink: {
    '::before': { color: `var(--ctrl-token-Avatar-291, var(--semantic-token-Avatar-292, ${tokens.colorPaletteMinkBorderActive}))` },
  },
  platinum: {
    '::before': { color: `var(--ctrl-token-Avatar-293, var(--semantic-token-Avatar-294, ${tokens.colorPalettePlatinumBorderActive}))` },
  },
  anchor: {
    '::before': { color: `var(--ctrl-token-Avatar-295, var(--semantic-token-Avatar-296, ${tokens.colorPaletteAnchorBorderActive}))` },
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
