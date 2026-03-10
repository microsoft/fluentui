import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { shorthands, makeStyles, mergeClasses } from '@griffel/react';
import { buttonClassNames } from '@fluentui/react-components';
import type { ButtonState } from '@fluentui/react-components';

// CAP spacing constants
const BORDER_WIDTH = tokens.strokeWidthThin;
const buttonSpacingSmall = `calc(${tokens.spacingVerticalSNudge} - ${BORDER_WIDTH})`;
const buttonSpacingMedium = `calc(${tokens.spacingVerticalS} - ${BORDER_WIDTH})`;
const buttonSpacingLarge = `calc(${tokens.spacingVerticalMNudge} - ${BORDER_WIDTH})`;

const displayInline = { display: 'inline' } as const;
const displayNone = { display: 'none' } as const;

const useBaseStyles = makeStyles({
  root: {
    minWidth: 'unset',

    [`:hover .${iconFilledClassName}`]: displayInline,
    [`:hover .${iconRegularClassName}`]: displayNone,
    [`:hover:active .${iconFilledClassName}`]: displayInline,
    [`:hover:active .${iconRegularClassName}`]: displayNone,
  },
});

const capFocusIndicator = {
  boxShadow: `
    0 0 0 ${tokens.strokeWidthThin} ${tokens.colorStrokeFocus2} inset,
    0 0 0 ${tokens.strokeWidthThick} ${tokens.colorStrokeFocus1} inset
  `,
};

// Shape styles: only restyle borderRadius + focus indicator per shape.
// circular and square keep their original Fluent radii — only rounded gets the CAP radius.
const useShapeStyles = makeStyles({
  rounded: {
    borderRadius: tokens.borderRadius2XLarge,
    ...createCustomFocusIndicatorStyle({
      borderRadius: tokens.borderRadius2XLarge,
      ...capFocusIndicator,
    }),
  },
  circular: {},
  square: {},
});

const useAppearanceStyles = makeStyles({
  outline: {
    ...shorthands.borderColor(tokens.colorNeutralStroke4),
    color: tokens.colorNeutralForeground3,

    ':hover': {
      ...shorthands.borderColor(tokens.colorNeutralStroke2),
      backgroundColor: tokens.colorNeutralBackground3Hover,
      color: tokens.colorNeutralForeground1Hover,
    },

    ':hover:active': {
      ...shorthands.borderColor(tokens.colorNeutralBackground3Pressed),
      backgroundColor: tokens.colorNeutralBackground3Pressed,
      color: tokens.colorNeutralForeground1Pressed,
    },
  },
  primary: {
    ...shorthands.borderColor(tokens.colorBrandBackground),

    ':hover': {
      ...shorthands.borderColor(tokens.colorBrandBackgroundHover),
    },

    ':hover:active': {
      ...shorthands.borderColor(tokens.colorBrandBackgroundPressed),
    },
  },
  secondary: {
    ...shorthands.borderColor(tokens.colorNeutralStroke4),
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground3,

    ':hover': {
      ...shorthands.borderColor(tokens.colorNeutralStroke2),
      backgroundColor: tokens.colorNeutralBackground3Hover,
      color: tokens.colorNeutralForeground1Hover,
    },

    ':hover:active': {
      ...shorthands.borderColor(tokens.colorNeutralBackground3Pressed),
      backgroundColor: tokens.colorNeutralBackground3Pressed,
      color: tokens.colorNeutralForeground1Pressed,
    },
  },
  subtle: {
    ...shorthands.borderColor(tokens.colorTransparentStroke),
    backgroundColor: tokens.colorTransparentBackground,
    color: tokens.colorNeutralForeground3,

    ':hover': {
      ...shorthands.borderColor(tokens.colorNeutralBackground3Hover),
      backgroundColor: tokens.colorNeutralBackground3Hover,
      color: tokens.colorNeutralForeground1,

      [`& .${buttonClassNames.icon}`]: {
        color: tokens.colorNeutralForeground1,
      },
    },

    ':hover:active': {
      backgroundColor: tokens.colorNeutralBackground1Pressed,
      color: tokens.colorNeutralForeground3Pressed,

      [`& .${buttonClassNames.icon}`]: {
        color: tokens.colorCompoundBrandForeground1Pressed,
      },
    },
  },
  transparent: {
    ...shorthands.borderColor(tokens.colorTransparentStroke),
    backgroundColor: tokens.colorTransparentBackground,
    color: tokens.colorNeutralForeground3,

    ':hover': {
      color: tokens.colorCompoundBrandForeground1Hover,
      ...shorthands.borderColor(tokens.colorTransparentStroke),
      backgroundColor: tokens.colorTransparentBackgroundHover,
    },

    ':hover:active': {
      color: tokens.colorCompoundBrandForeground1Pressed,
      ...shorthands.borderColor(tokens.colorTransparentStroke),
      backgroundColor: tokens.colorTransparentBackgroundHover,
    },
  },
  tint: {
    ...shorthands.borderColor(tokens.colorBrandStroke2),
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorCompoundBrandForeground1,

    ':hover': {
      ...shorthands.borderColor(tokens.colorBrandStroke2Hover),
      backgroundColor: tokens.colorBrandBackground2Hover,
      color: tokens.colorCompoundBrandForeground1Hover,
    },

    ':hover:active': {
      ...shorthands.borderColor(tokens.colorBrandStroke2Pressed),
      backgroundColor: tokens.colorBrandBackground2Pressed,
      color: tokens.colorCompoundBrandForeground1Pressed,
    },
  },
  outlineColor: {
    ...shorthands.borderColor(tokens.colorBrandStroke2),
    backgroundColor: 'transparent',
    color: tokens.colorCompoundBrandForeground1,

    ':hover': {
      ...shorthands.borderColor(tokens.colorBrandStroke2Hover),
      backgroundColor: tokens.colorBrandBackground2Hover,
      color: tokens.colorCompoundBrandForeground1Hover,
    },

    ':hover:active': {
      ...shorthands.borderColor(tokens.colorBrandStroke2Pressed),
      backgroundColor: tokens.colorBrandBackground2Pressed,
      color: tokens.colorCompoundBrandForeground1Pressed,
    },
  },
});

const useSizeSmallShapeStyles = makeStyles({
  rounded: {
    borderRadius: tokens.borderRadiusXLarge,
    ...createCustomFocusIndicatorStyle({
      borderRadius: tokens.borderRadiusXLarge,
      ...capFocusIndicator,
    }),
  },
  circular: {},
  square: {},
});

const useSizeStyles = makeStyles({
  small: {
    ...typographyStyles.caption1Strong,
    height: '28px',
    padding: `${buttonSpacingSmall} calc(${tokens.spacingHorizontalS} - ${BORDER_WIDTH})`,
  },
  medium: {
    height: '36px',
    padding: `${buttonSpacingMedium} calc(${tokens.spacingHorizontalM} - ${BORDER_WIDTH})`,
  },
  large: {
    ...typographyStyles.body1Strong,
    height: '44px',
    padding: `${buttonSpacingLarge} calc(${tokens.spacingHorizontalM} - ${BORDER_WIDTH})`,
  },
});

const useDisabledStyles = makeStyles({
  outline: {
    ...shorthands.borderColor(tokens.colorNeutralStroke4),
    backgroundColor: 'transparent',
    color: tokens.colorNeutralForegroundDisabled,

    ':hover': {
      ...shorthands.borderColor(tokens.colorNeutralStroke4),
      backgroundColor: 'transparent',
      color: tokens.colorNeutralForegroundDisabled,
    },

    ':hover:active': {
      ...shorthands.borderColor(tokens.colorNeutralStroke4),
      backgroundColor: 'transparent',
      color: tokens.colorNeutralForegroundDisabled,
    },
  },
  primary: {
    ...shorthands.borderColor(tokens.colorNeutralBackgroundDisabled),

    ':hover': {
      ...shorthands.borderColor(tokens.colorNeutralBackgroundDisabled),
    },

    ':hover:active': {
      ...shorthands.borderColor(tokens.colorNeutralBackgroundDisabled),
    },
  },
  secondary: {
    ...shorthands.borderColor(tokens.colorNeutralStroke4),
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForegroundDisabled,

    ':hover': {
      ...shorthands.borderColor(tokens.colorNeutralStroke4),
      backgroundColor: tokens.colorNeutralBackground3,
      color: tokens.colorNeutralForegroundDisabled,
    },

    ':hover:active': {
      ...shorthands.borderColor(tokens.colorNeutralStroke4),
      backgroundColor: tokens.colorNeutralBackground3,
      color: tokens.colorNeutralForegroundDisabled,
    },
  },
  subtle: {},
  transparent: {},
  tint: {
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    ':hover': {
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    },
    ':hover:active': {
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    },
  },
  outlineColor: {
    backgroundColor: 'transparent',
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    ':hover': {
      backgroundColor: 'transparent',
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    },
    ':hover:active': {
      backgroundColor: 'transparent',
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    },
  },
});

const useIconOnlyStyles = makeStyles({
  small: {
    padding: buttonSpacingSmall,
    minWidth: '28px',
    maxWidth: '28px',
  },
  medium: {
    padding: buttonSpacingMedium,
    minWidth: '36px',
    maxWidth: '36px',
  },
  large: {
    padding: buttonSpacingLarge,
    minWidth: '40px',
    maxWidth: '40px',
  },
});

const useIconSizeStyles = makeStyles({
  small: {
    fontSize: '16px',
    height: '16px',
    width: '16px',
  },
  medium: {},
  large: {
    fontSize: '20px',
    height: '20px',
    width: '20px',
  },
});

export const useCapButtonStyles = (state: ButtonState): ButtonState => {
  const baseStyles = useBaseStyles();
  const shapeStyles = useShapeStyles();
  const appearanceStyles = useAppearanceStyles();
  const sizeStyles = useSizeStyles();
  const sizeSmallShapeStyles = useSizeSmallShapeStyles();
  const disabledStyles = useDisabledStyles();
  const iconOnlyStyles = useIconOnlyStyles();
  const iconSizeStyles = useIconSizeStyles();

  const { appearance, disabled, disabledFocusable, iconOnly, shape, size } = state;

  state.root.className = mergeClasses(
    state.root.className,

    // CAP base overrides (minWidth, icon hover toggles)
    baseStyles.root,

    // Shape-aware borderRadius + focus indicator
    shapeStyles[shape],

    // Appearance overrides
    appearance && appearanceStyles[appearance],

    // Size overrides
    sizeStyles[size],
    // Small size has its own borderRadius for rounded shape
    size === 'small' && sizeSmallShapeStyles[shape],

    // Disabled appearance overrides
    appearance && (disabled || disabledFocusable) && disabledStyles[appearance],

    // Icon-only size overrides
    iconOnly && iconOnlyStyles[size],
  );

  if (state.icon) {
    state.icon.className = mergeClasses(state.icon.className, iconSizeStyles[size]);
  }
  return state;
};
