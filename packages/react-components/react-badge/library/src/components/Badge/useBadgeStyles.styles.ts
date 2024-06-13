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
  borderRadius: `var(--ctrl-token-Badge-341, var(--semantic-token-Badge-342, ${tokens.borderRadiusCircular}))`,
  // Use a transparent stroke (rather than no border) so the border is visible in high contrast
  borderColor: `var(--ctrl-token-Badge-343, var(--semantic-token-Badge-344, ${tokens.colorTransparentStroke}))`,

  '::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderStyle: 'solid',
    borderColor: 'inherit',
    borderWidth: `var(--ctrl-token-Badge-345, var(--semantic-token-Badge-346, ${tokens.strokeWidthThin}))`,
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

  square: { borderRadius: `var(--ctrl-token-Badge-347, var(--semantic-token-Badge-348, ${tokens.borderRadiusNone}))` },
  rounded: { borderRadius: `var(--ctrl-token-Badge-349, var(--semantic-token-Badge-350, ${tokens.borderRadiusMedium}))` },
  roundedSmallToTiny: { borderRadius: `var(--ctrl-token-Badge-351, var(--semantic-token-Badge-352, ${tokens.borderRadiusSmall}))` },
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
    backgroundColor: `var(--ctrl-token-Badge-353, var(--semantic-token-Badge-354, ${tokens.colorBrandBackground}))`,
    color: `var(--ctrl-token-Badge-355, var(--semantic-token-Badge-356, ${tokens.colorNeutralForegroundOnBrand}))`,
  },
  'filled-danger': {
    backgroundColor: `var(--ctrl-token-Badge-357, var(--semantic-token-Badge-358, ${tokens.colorPaletteRedBackground3}))`,
    color: `var(--ctrl-token-Badge-359, var(--semantic-token-Badge-360, ${tokens.colorNeutralForegroundOnBrand}))`,
  },
  'filled-important': {
    backgroundColor: `var(--ctrl-token-Badge-361, var(--semantic-token-Badge-362, ${tokens.colorNeutralForeground1}))`,
    color: `var(--ctrl-token-Badge-363, var(--semantic-token-Badge-364, ${tokens.colorNeutralBackground1}))`,
  },
  'filled-informative': {
    backgroundColor: `var(--ctrl-token-Badge-365, var(--semantic-token-Badge-366, ${tokens.colorNeutralBackground5}))`,
    color: `var(--ctrl-token-Badge-367, var(--semantic-token-Badge-368, ${tokens.colorNeutralForeground3}))`,
  },
  'filled-severe': {
    backgroundColor: `var(--ctrl-token-Badge-369, var(--semantic-token-Badge-370, ${tokens.colorPaletteDarkOrangeBackground3}))`,
    color: `var(--ctrl-token-Badge-371, var(--semantic-token-Badge-372, ${tokens.colorNeutralForegroundOnBrand}))`,
  },
  'filled-subtle': {
    backgroundColor: `var(--ctrl-token-Badge-373, var(--semantic-token-Badge-374, ${tokens.colorNeutralBackground1}))`,
    color: `var(--ctrl-token-Badge-375, var(--semantic-token-Badge-376, ${tokens.colorNeutralForeground1}))`,
  },
  'filled-success': {
    backgroundColor: `var(--ctrl-token-Badge-377, var(--semantic-token-Badge-378, ${tokens.colorPaletteGreenBackground3}))`,
    color: `var(--ctrl-token-Badge-379, var(--semantic-token-Badge-380, ${tokens.colorNeutralForegroundOnBrand}))`,
  },
  'filled-warning': {
    backgroundColor: `var(--ctrl-token-Badge-381, var(--semantic-token-Badge-382, ${tokens.colorPaletteYellowBackground3}))`,
    color: `var(--ctrl-token-Badge-383, var(--semantic-token-Badge-384, ${tokens.colorNeutralForeground1Static}))`,
  },

  // appearance: ghost

  ghost: {
    // No shared colors between ghost appearances
  },
  'ghost-brand': {
    color: `var(--ctrl-token-Badge-385, var(--semantic-token-Badge-386, ${tokens.colorBrandForeground1}))`,
  },
  'ghost-danger': {
    color: `var(--ctrl-token-Badge-387, var(--semantic-token-Badge-388, ${tokens.colorPaletteRedForeground3}))`,
  },
  'ghost-important': {
    color: `var(--ctrl-token-Badge-389, var(--semantic-token-Badge-390, ${tokens.colorNeutralForeground1}))`,
  },
  'ghost-informative': {
    color: `var(--ctrl-token-Badge-391, var(--semantic-token-Badge-392, ${tokens.colorNeutralForeground3}))`,
  },
  'ghost-severe': {
    color: `var(--ctrl-token-Badge-393, var(--semantic-token-Badge-394, ${tokens.colorPaletteDarkOrangeForeground3}))`,
  },
  'ghost-subtle': {
    color: `var(--ctrl-token-Badge-395, var(--semantic-token-Badge-396, ${tokens.colorNeutralForegroundStaticInverted}))`,
  },
  'ghost-success': {
    color: `var(--ctrl-token-Badge-397, var(--semantic-token-Badge-398, ${tokens.colorPaletteGreenForeground3}))`,
  },
  'ghost-warning': {
    color: `var(--ctrl-token-Badge-399, var(--semantic-token-Badge-400, ${tokens.colorPaletteYellowForeground2}))`,
  },

  // appearance: outline

  outline: {
    ...shorthands.borderColor('currentColor'),
  },
  'outline-brand': {
    color: `var(--ctrl-token-Badge-401, var(--semantic-token-Badge-402, ${tokens.colorBrandForeground1}))`,
  },
  'outline-danger': {
    color: `var(--ctrl-token-Badge-403, var(--semantic-token-Badge-404, ${tokens.colorPaletteRedForeground3}))`,
    ...shorthands.borderColor(tokens.colorPaletteRedBorder2),
  },
  'outline-important': {
    color: `var(--ctrl-token-Badge-405, var(--semantic-token-Badge-406, ${tokens.colorNeutralForeground3}))`,
    ...shorthands.borderColor(tokens.colorNeutralStrokeAccessible),
  },
  'outline-informative': {
    color: `var(--ctrl-token-Badge-407, var(--semantic-token-Badge-408, ${tokens.colorNeutralForeground3}))`,
    ...shorthands.borderColor(tokens.colorNeutralStroke2),
  },
  'outline-severe': {
    color: `var(--ctrl-token-Badge-409, var(--semantic-token-Badge-410, ${tokens.colorPaletteDarkOrangeForeground3}))`,
  },
  'outline-subtle': {
    color: `var(--ctrl-token-Badge-411, var(--semantic-token-Badge-412, ${tokens.colorNeutralForegroundStaticInverted}))`,
  },
  'outline-success': {
    color: `var(--ctrl-token-Badge-413, var(--semantic-token-Badge-414, ${tokens.colorPaletteGreenForeground3}))`,
    ...shorthands.borderColor(tokens.colorPaletteGreenBorder2),
  },
  'outline-warning': {
    color: `var(--ctrl-token-Badge-415, var(--semantic-token-Badge-416, ${tokens.colorPaletteYellowForeground2}))`,
  },

  // appearance: tint

  tint: {
    // No shared colors between tint appearances
  },
  'tint-brand': {
    backgroundColor: `var(--ctrl-token-Badge-417, var(--semantic-token-Badge-418, ${tokens.colorBrandBackground2}))`,
    color: `var(--ctrl-token-Badge-419, var(--semantic-token-Badge-420, ${tokens.colorBrandForeground2}))`,
    ...shorthands.borderColor(tokens.colorBrandStroke2),
  },
  'tint-danger': {
    backgroundColor: `var(--ctrl-token-Badge-421, var(--semantic-token-Badge-422, ${tokens.colorPaletteRedBackground1}))`,
    color: `var(--ctrl-token-Badge-423, var(--semantic-token-Badge-424, ${tokens.colorPaletteRedForeground1}))`,
    ...shorthands.borderColor(tokens.colorPaletteRedBorder1),
  },
  'tint-important': {
    backgroundColor: `var(--ctrl-token-Badge-425, var(--semantic-token-Badge-426, ${tokens.colorNeutralForeground3}))`,
    color: `var(--ctrl-token-Badge-427, var(--semantic-token-Badge-428, ${tokens.colorNeutralBackground1}))`,
    ...shorthands.borderColor(tokens.colorTransparentStroke),
  },
  'tint-informative': {
    backgroundColor: `var(--ctrl-token-Badge-429, var(--semantic-token-Badge-430, ${tokens.colorNeutralBackground4}))`,
    color: `var(--ctrl-token-Badge-431, var(--semantic-token-Badge-432, ${tokens.colorNeutralForeground3}))`,
    ...shorthands.borderColor(tokens.colorNeutralStroke2),
  },
  'tint-severe': {
    backgroundColor: `var(--ctrl-token-Badge-433, var(--semantic-token-Badge-434, ${tokens.colorPaletteDarkOrangeBackground1}))`,
    color: `var(--ctrl-token-Badge-435, var(--semantic-token-Badge-436, ${tokens.colorPaletteDarkOrangeForeground1}))`,
    ...shorthands.borderColor(tokens.colorPaletteDarkOrangeBorder1),
  },
  'tint-subtle': {
    backgroundColor: `var(--ctrl-token-Badge-437, var(--semantic-token-Badge-438, ${tokens.colorNeutralBackground1}))`,
    color: `var(--ctrl-token-Badge-439, var(--semantic-token-Badge-440, ${tokens.colorNeutralForeground3}))`,
    ...shorthands.borderColor(tokens.colorNeutralStroke2),
  },
  'tint-success': {
    backgroundColor: `var(--ctrl-token-Badge-441, var(--semantic-token-Badge-442, ${tokens.colorPaletteGreenBackground1}))`,
    color: `var(--ctrl-token-Badge-443, var(--semantic-token-Badge-444, ${tokens.colorPaletteGreenForeground1}))`,
    ...shorthands.borderColor(tokens.colorPaletteGreenBorder1),
  },
  'tint-warning': {
    backgroundColor: `var(--ctrl-token-Badge-445, var(--semantic-token-Badge-446, ${tokens.colorPaletteYellowBackground1}))`,
    color: `var(--ctrl-token-Badge-447, var(--semantic-token-Badge-448, ${tokens.colorPaletteYellowForeground1}))`,
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
