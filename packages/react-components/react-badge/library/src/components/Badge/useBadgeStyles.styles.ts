import { shorthands, makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import type { BadgeSlots, BadgeState } from './Badge.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const badgeClassNames: SlotClassNames<BadgeSlots> = {
  root: 'fui-Badge',
  icon: 'fui-Badge__icon',
};

// The text content of the badge has additional horizontal padding, but there is no `text` slot to add that padding to.
// Instead, add extra padding to the root, and a negative margin on the icon to "remove" the extra padding on the icon.
const textPadding = tokens.spacingHorizontalXXS;

const useRootClassName = makeResetStyles({
  display: 'inline-flex',
  boxSizing: 'border-box',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  ...typographyStyles.caption1Strong,
  height: '20px',
  width: '20px',
  minWidth: 'max-content',
  padding: `0 calc(${tokens.spacingHorizontalXS} + ${textPadding})`,
  borderRadius: `var(--341, var(--342, ${tokens.borderRadiusCircular}))`,
  // Use a transparent stroke (rather than no border) so the border is visible in high contrast
  borderColor: `var(--343, var(--344, ${tokens.colorTransparentStroke}))`,

  '::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderStyle: 'solid',
    borderColor: 'inherit',
    borderWidth: `var(--345, var(--346, ${tokens.strokeWidthThin}))`,
    borderRadius: 'inherit',
  },
});

const useRootStyles = makeStyles({
  fontSmallToTiny: {
    ...typographyStyles.caption2Strong,
  },

  // size

  tiny: {
    width: '6px',
    height: '6px',
    fontSize: '4px',
    lineHeight: '4px',
    minWidth: 'unset',
    padding: 'unset',
  },
  'extra-small': {
    width: '10px',
    height: '10px',
    fontSize: '6px',
    lineHeight: '6px',
    minWidth: 'unset',
    padding: 'unset',
  },
  small: {
    width: '16px',
    height: '16px',
    padding: `0 calc(${tokens.spacingHorizontalXXS} + ${textPadding})`,
  },
  medium: {
    // Set by useRootClassName
  },
  large: {
    width: '24px',
    height: '24px',
    padding: `0 calc(${tokens.spacingHorizontalXS} + ${textPadding})`,
  },
  'extra-large': {
    width: '32px',
    height: '32px',
    padding: `0 calc(${tokens.spacingHorizontalSNudge} + ${textPadding})`,
  },

  // shape

  square: { borderRadius: `var(--347, var(--348, ${tokens.borderRadiusNone}))` },
  rounded: {
    borderRadius: `var(--349, var(--350, ${tokens.borderRadiusMedium}))`,
  },
  roundedSmallToTiny: {
    borderRadius: `var(--351, var(--352, ${tokens.borderRadiusSmall}))`,
  },
  circular: {
    // Set by useRootClassName
  },
  // hide the boder when appearance is "ghost"

  borderGhost: {
    // The border is applied in an ::after pseudo-element because it should not affect layout.
    // The padding and size of the badge should be the same regardless of whether or not it has a border.
    '::after': {
      display: 'none',
    },
  },

  // appearance: filled

  filled: {
    // Set by useRootClassName
  },
  'filled-brand': {
    backgroundColor: `var(--353, var(--354, ${tokens.colorBrandBackground}))`,
    color: `var(--355, var(--356, ${tokens.colorNeutralForegroundOnBrand}))`,
  },
  'filled-danger': {
    backgroundColor: `var(--357, var(--358, ${tokens.colorPaletteRedBackground3}))`,
    color: `var(--359, var(--360, ${tokens.colorNeutralForegroundOnBrand}))`,
  },
  'filled-important': {
    backgroundColor: `var(--361, var(--362, ${tokens.colorNeutralForeground1}))`,
    color: `var(--363, var(--364, ${tokens.colorNeutralBackground1}))`,
  },
  'filled-informative': {
    backgroundColor: `var(--365, var(--366, ${tokens.colorNeutralBackground5}))`,
    color: `var(--367, var(--368, ${tokens.colorNeutralForeground3}))`,
  },
  'filled-severe': {
    backgroundColor: `var(--369, var(--370, ${tokens.colorPaletteDarkOrangeBackground3}))`,
    color: `var(--371, var(--372, ${tokens.colorNeutralForegroundOnBrand}))`,
  },
  'filled-subtle': {
    backgroundColor: `var(--373, var(--374, ${tokens.colorNeutralBackground1}))`,
    color: `var(--375, var(--376, ${tokens.colorNeutralForeground1}))`,
  },
  'filled-success': {
    backgroundColor: `var(--377, var(--378, ${tokens.colorPaletteGreenBackground3}))`,
    color: `var(--379, var(--380, ${tokens.colorNeutralForegroundOnBrand}))`,
  },
  'filled-warning': {
    backgroundColor: `var(--381, var(--382, ${tokens.colorPaletteYellowBackground3}))`,
    color: `var(--383, var(--384, ${tokens.colorNeutralForeground1Static}))`,
  },

  // appearance: ghost

  ghost: {
    // No shared colors between ghost appearances
  },
  'ghost-brand': {
    color: `var(--385, var(--386, ${tokens.colorBrandForeground1}))`,
  },
  'ghost-danger': {
    color: `var(--387, var(--388, ${tokens.colorPaletteRedForeground3}))`,
  },
  'ghost-important': {
    color: `var(--389, var(--390, ${tokens.colorNeutralForeground1}))`,
  },
  'ghost-informative': {
    color: `var(--391, var(--392, ${tokens.colorNeutralForeground3}))`,
  },
  'ghost-severe': {
    color: `var(--393, var(--394, ${tokens.colorPaletteDarkOrangeForeground3}))`,
  },
  'ghost-subtle': {
    color: `var(--395, var(--396, ${tokens.colorNeutralForegroundStaticInverted}))`,
  },
  'ghost-success': {
    color: `var(--397, var(--398, ${tokens.colorPaletteGreenForeground3}))`,
  },
  'ghost-warning': {
    color: `var(--399, var(--400, ${tokens.colorPaletteYellowForeground2}))`,
  },

  // appearance: outline

  outline: {
    ...shorthands.borderColor('currentColor'),
  },
  'outline-brand': {
    color: `var(--401, var(--402, ${tokens.colorBrandForeground1}))`,
  },
  'outline-danger': {
    color: `var(--403, var(--404, ${tokens.colorPaletteRedForeground3}))`,
    ...shorthands.borderColor(tokens.colorPaletteRedBorder2),
  },
  'outline-important': {
    color: `var(--405, var(--406, ${tokens.colorNeutralForeground3}))`,
    ...shorthands.borderColor(tokens.colorNeutralStrokeAccessible),
  },
  'outline-informative': {
    color: `var(--407, var(--408, ${tokens.colorNeutralForeground3}))`,
    ...shorthands.borderColor(tokens.colorNeutralStroke2),
  },
  'outline-severe': {
    color: `var(--409, var(--410, ${tokens.colorPaletteDarkOrangeForeground3}))`,
  },
  'outline-subtle': {
    color: `var(--411, var(--412, ${tokens.colorNeutralForegroundStaticInverted}))`,
  },
  'outline-success': {
    color: `var(--413, var(--414, ${tokens.colorPaletteGreenForeground3}))`,
    ...shorthands.borderColor(tokens.colorPaletteGreenBorder2),
  },
  'outline-warning': {
    color: `var(--415, var(--416, ${tokens.colorPaletteYellowForeground2}))`,
  },

  // appearance: tint

  tint: {
    // No shared colors between tint appearances
  },
  'tint-brand': {
    backgroundColor: `var(--417, var(--418, ${tokens.colorBrandBackground2}))`,
    color: `var(--419, var(--420, ${tokens.colorBrandForeground2}))`,
    ...shorthands.borderColor(tokens.colorBrandStroke2),
  },
  'tint-danger': {
    backgroundColor: `var(--421, var(--422, ${tokens.colorPaletteRedBackground1}))`,
    color: `var(--423, var(--424, ${tokens.colorPaletteRedForeground1}))`,
    ...shorthands.borderColor(tokens.colorPaletteRedBorder1),
  },
  'tint-important': {
    backgroundColor: `var(--425, var(--426, ${tokens.colorNeutralForeground3}))`,
    color: `var(--427, var(--428, ${tokens.colorNeutralBackground1}))`,
    ...shorthands.borderColor(tokens.colorTransparentStroke),
  },
  'tint-informative': {
    backgroundColor: `var(--429, var(--430, ${tokens.colorNeutralBackground4}))`,
    color: `var(--431, var(--432, ${tokens.colorNeutralForeground3}))`,
    ...shorthands.borderColor(tokens.colorNeutralStroke2),
  },
  'tint-severe': {
    backgroundColor: `var(--433, var(--434, ${tokens.colorPaletteDarkOrangeBackground1}))`,
    color: `var(--435, var(--436, ${tokens.colorPaletteDarkOrangeForeground1}))`,
    ...shorthands.borderColor(tokens.colorPaletteDarkOrangeBorder1),
  },
  'tint-subtle': {
    backgroundColor: `var(--437, var(--438, ${tokens.colorNeutralBackground1}))`,
    color: `var(--439, var(--440, ${tokens.colorNeutralForeground3}))`,
    ...shorthands.borderColor(tokens.colorNeutralStroke2),
  },
  'tint-success': {
    backgroundColor: `var(--441, var(--442, ${tokens.colorPaletteGreenBackground1}))`,
    color: `var(--443, var(--444, ${tokens.colorPaletteGreenForeground1}))`,
    ...shorthands.borderColor(tokens.colorPaletteGreenBorder1),
  },
  'tint-warning': {
    backgroundColor: `var(--445, var(--446, ${tokens.colorPaletteYellowBackground1}))`,
    color: `var(--447, var(--448, ${tokens.colorPaletteYellowForeground1}))`,
    ...shorthands.borderColor(tokens.colorPaletteYellowBorder1),
  },
});

const useIconRootClassName = makeResetStyles({
  display: 'flex',
  lineHeight: '1',
  margin: `0 calc(-1 * ${textPadding})`, // Remove text padding added to root
  fontSize: '12px',
});

const useIconStyles = makeStyles({
  beforeText: {
    marginRight: `calc(${tokens.spacingHorizontalXXS} + ${textPadding})`,
  },
  afterText: {
    marginLeft: `calc(${tokens.spacingHorizontalXXS} + ${textPadding})`,
  },

  beforeTextXL: {
    marginRight: `calc(${tokens.spacingHorizontalXS} + ${textPadding})`,
  },
  afterTextXL: {
    marginLeft: `calc(${tokens.spacingHorizontalXS} + ${textPadding})`,
  },

  // size

  tiny: {
    fontSize: '6px',
  },
  'extra-small': {
    fontSize: '10px',
  },
  small: {
    fontSize: '12px',
  },
  medium: {
    // Set by useIconRootClassName
  },
  large: {
    fontSize: '16px',
  },
  'extra-large': {
    fontSize: '20px',
  },
});

/**
 * Applies style classnames to slots
 */
export const useBadgeStyles_unstable = (state: BadgeState): BadgeState => {
  'use no memo';

  const rootClassName = useRootClassName();
  const rootStyles = useRootStyles();

  const smallToTiny = state.size === 'small' || state.size === 'extra-small' || state.size === 'tiny';

  state.root.className = mergeClasses(
    badgeClassNames.root,
    rootClassName,
    smallToTiny && rootStyles.fontSmallToTiny,
    rootStyles[state.size],
    rootStyles[state.shape],
    state.shape === 'rounded' && smallToTiny && rootStyles.roundedSmallToTiny,
    state.appearance === 'ghost' && rootStyles.borderGhost,
    rootStyles[state.appearance],
    rootStyles[`${state.appearance}-${state.color}` as const],
    state.root.className,
  );

  const iconRootClassName = useIconRootClassName();
  const iconStyles = useIconStyles();
  if (state.icon) {
    let iconPositionClass;
    if (state.root.children) {
      if (state.size === 'extra-large') {
        iconPositionClass = state.iconPosition === 'after' ? iconStyles.afterTextXL : iconStyles.beforeTextXL;
      } else {
        iconPositionClass = state.iconPosition === 'after' ? iconStyles.afterText : iconStyles.beforeText;
      }
    }

    state.icon.className = mergeClasses(
      badgeClassNames.icon,
      iconRootClassName,
      iconPositionClass,
      iconStyles[state.size],
      state.icon.className,
    );
  }

  return state;
};
