import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import { shorthands, makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ButtonSlots, ButtonState } from './Button.types';

export const buttonClassNames: SlotClassNames<ButtonSlots> = {
  root: 'fui-Button',
  icon: 'fui-Button__icon',
};

const iconSpacingVar = '--fui-Button__icon--spacing';

const buttonSpacingSmall = '3px';
const buttonSpacingMedium = '5px';

const useRootStyles = makeStyles({
  // Base styles
  base: {
    alignItems: 'center',
    boxSizing: 'border-box',
    display: 'inline-flex',
    justifyContent: 'center',
    textDecorationLine: 'none',
    verticalAlign: 'middle',

    ...shorthands.margin(0),

    ...shorthands.overflow('hidden'),

    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke1),

    fontFamily: tokens.fontFamilyBase,

    outlineStyle: 'none',

    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      ...shorthands.borderColor(tokens.colorNeutralStroke1Hover),
      color: tokens.colorNeutralForeground1Hover,

      cursor: 'pointer',

      [`& .${iconFilledClassName}`]: {
        display: 'inline',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
    },

    ':hover:active': {
      backgroundColor: tokens.colorNeutralBackground1Pressed,
      ...shorthands.borderColor(tokens.colorNeutralStroke1Pressed),
      color: tokens.colorNeutralForeground1Pressed,

      outlineStyle: 'none',

      [`& .${iconFilledClassName}`]: {
        display: 'inline',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
    },
  },

  // Transition styles
  transition: {
    transitionDuration: '100ms',
    transitionProperty: 'background, border, color',
    transitionTimingFunction: 'cubic-bezier(0.33, 0, 0.67, 1)',

    '@media screen and (prefers-reduced-motion: reduce)': {
      transitionDuration: '0.01ms',
    },
  },

  // High contrast styles
  highContrast: {
    '@media (forced-colors: active)': {
      ':focus': {
        ...shorthands.borderColor('ButtonText'),
      },

      ':hover': {
        backgroundColor: 'HighlightText',
        ...shorthands.borderColor('Highlight'),
        color: 'Highlight',
        forcedColorAdjust: 'none',
      },

      ':hover:active': {
        backgroundColor: 'HighlightText',
        ...shorthands.borderColor('Highlight'),
        color: 'Highlight',
        forcedColorAdjust: 'none',
      },
    },
  },

  // Appearance variations
  outline: {
    backgroundColor: tokens.colorTransparentBackground,

    ':hover': {
      backgroundColor: tokens.colorTransparentBackgroundHover,
    },

    ':hover:active': {
      backgroundColor: tokens.colorTransparentBackgroundPressed,
    },
  },
  primary: {
    backgroundColor: tokens.colorBrandBackground,
    ...shorthands.borderColor('transparent'),
    color: tokens.colorNeutralForegroundOnBrand,

    ':hover': {
      backgroundColor: tokens.colorBrandBackgroundHover,
      ...shorthands.borderColor('transparent'),
      color: tokens.colorNeutralForegroundOnBrand,
    },

    ':hover:active': {
      backgroundColor: tokens.colorBrandBackgroundPressed,
      ...shorthands.borderColor('transparent'),
      color: tokens.colorNeutralForegroundOnBrand,
    },
  },
  secondary: {
    /* The secondary styles are exactly the same as the base styles. */
  },
  subtle: {
    backgroundColor: tokens.colorSubtleBackground,
    ...shorthands.borderColor('transparent'),
    color: tokens.colorNeutralForeground2,

    ':hover': {
      backgroundColor: tokens.colorSubtleBackgroundHover,
      ...shorthands.borderColor('transparent'),
      color: tokens.colorNeutralForeground2Hover,
    },

    ':hover:active': {
      backgroundColor: tokens.colorSubtleBackgroundPressed,
      ...shorthands.borderColor('transparent'),
      color: tokens.colorNeutralForeground2Pressed,
    },
  },
  transparent: {
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.borderColor('transparent'),
    color: tokens.colorNeutralForeground2,

    ':hover': {
      backgroundColor: tokens.colorTransparentBackgroundHover,
      ...shorthands.borderColor('transparent'),
      color: tokens.colorNeutralForeground2BrandHover,
    },

    ':hover:active': {
      backgroundColor: tokens.colorTransparentBackgroundPressed,
      ...shorthands.borderColor('transparent'),
      color: tokens.colorNeutralForeground2BrandPressed,
    },
  },

  // Shape variations
  circular: {
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
  },
  rounded: {
    /* The borderRadius rounded styles are handled in the size variations */
  },
  square: {
    ...shorthands.borderRadius(tokens.borderRadiusNone),
  },

  // Size variations
  small: {
    ...shorthands.padding(buttonSpacingSmall, tokens.spacingHorizontalS),

    minWidth: '64px',

    ...shorthands.borderRadius(buttonSpacingSmall),

    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightRegular,
    lineHeight: tokens.lineHeightBase200,
  },
  medium: {
    ...shorthands.padding(buttonSpacingMedium, tokens.spacingHorizontalM),

    minWidth: '96px',

    ...shorthands.borderRadius(tokens.borderRadiusMedium),

    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase300,
  },
  large: {
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalL),

    minWidth: '96px',

    ...shorthands.borderRadius(tokens.borderRadiusMedium),

    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase400,
  },
});

const useRootDisabledStyles = makeStyles({
  // Base styles
  base: {
    backgroundColor: tokens.colorNeutralBackgroundDisabled,
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    color: tokens.colorNeutralForegroundDisabled,

    cursor: 'not-allowed',

    ':hover': {
      backgroundColor: tokens.colorNeutralBackgroundDisabled,
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
      color: tokens.colorNeutralForegroundDisabled,

      cursor: 'not-allowed',

      [`& .${iconFilledClassName}`]: {
        display: 'none',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'inline',
      },
    },

    ':hover:active': {
      backgroundColor: tokens.colorNeutralBackgroundDisabled,
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
      color: tokens.colorNeutralForegroundDisabled,

      cursor: 'not-allowed',

      [`& .${iconFilledClassName}`]: {
        display: 'none',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'inline',
      },
    },
  },

  // High contrast styles
  highContrast: {
    '@media (forced-colors: active)': {
      ...shorthands.borderColor('GrayText'),
      color: 'GrayText',

      ':focus': {
        ...shorthands.borderColor('GrayText'),
      },

      ':hover': {
        ...shorthands.borderColor('GrayText'),
        color: 'GrayText',
      },

      ':hover:active': {
        ...shorthands.borderColor('GrayText'),
        color: 'GrayText',
      },
    },
  },

  // Appearance variations
  outline: {
    backgroundColor: tokens.colorTransparentBackground,

    ':hover': {
      backgroundColor: tokens.colorTransparentBackground,
    },

    ':hover:active': {
      backgroundColor: tokens.colorTransparentBackground,
    },
  },
  primary: {
    ...shorthands.borderColor('transparent'),

    ':hover': {
      ...shorthands.borderColor('transparent'),
    },

    ':hover:active': {
      ...shorthands.borderColor('transparent'),
    },
  },
  secondary: {
    /* The secondary styles are exactly the same as the base styles. */
  },
  subtle: {
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.borderColor('transparent'),

    ':hover': {
      backgroundColor: tokens.colorTransparentBackground,
      ...shorthands.borderColor('transparent'),
    },

    ':hover:active': {
      backgroundColor: tokens.colorTransparentBackground,
      ...shorthands.borderColor('transparent'),
    },
  },
  transparent: {
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.borderColor('transparent'),

    ':hover': {
      backgroundColor: tokens.colorTransparentBackground,
      ...shorthands.borderColor('transparent'),
    },

    ':hover:active': {
      backgroundColor: tokens.colorTransparentBackground,
      ...shorthands.borderColor('transparent'),
    },
  },
});

const useRootFocusStyles = makeStyles({
  base: createCustomFocusIndicatorStyle({
    ...shorthands.borderColor(tokens.colorTransparentStroke),
    outlineColor: tokens.colorTransparentStroke,
    outlineWidth: tokens.strokeWidthThick,
    outlineStyle: 'solid',
    boxShadow: `
      ${tokens.shadow4},
      0 0 0 2px ${tokens.colorStrokeFocus2}
    `,
    zIndex: 1,
  }),

  // Shape variations
  circular: createCustomFocusIndicatorStyle({
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
  }),
  rounded: {
    /* The rounded styles are exactly the same as the base styles. */
  },
  square: createCustomFocusIndicatorStyle({
    ...shorthands.borderRadius(tokens.borderRadiusNone),
  }),

  // Primary styles
  primary: createCustomFocusIndicatorStyle({
    ...shorthands.borderColor(tokens.colorNeutralForegroundOnBrand),
    boxShadow: `${tokens.shadow2}, 0 0 0 2px ${tokens.colorStrokeFocus2}`,
  }),

  // Size variations
  small: createCustomFocusIndicatorStyle({
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
  }),
  medium: createCustomFocusIndicatorStyle({
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  }),
  large: createCustomFocusIndicatorStyle({
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
  }),
});

const useRootIconOnlyStyles = makeStyles({
  // Size variations
  small: {
    ...shorthands.padding(tokens.spacingHorizontalXS),

    minWidth: '28px',
    maxWidth: '28px',
  },
  medium: {
    ...shorthands.padding(tokens.spacingHorizontalXS),

    minWidth: '32px',
    maxWidth: '32px',
  },
  large: {
    ...shorthands.padding(tokens.spacingHorizontalSNudge),

    minWidth: '40px',
    maxWidth: '40px',
  },
});

const useIconStyles = makeStyles({
  // Base styles
  base: {
    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
  },

  // Size variations
  small: {
    fontSize: '20px',
    height: '20px',
    width: '20px',

    [iconSpacingVar]: tokens.spacingHorizontalXS,
  },
  medium: {
    fontSize: '20px',
    height: '20px',
    width: '20px',

    [iconSpacingVar]: tokens.spacingHorizontalSNudge,
  },
  large: {
    fontSize: '24px',
    height: '24px',
    width: '24px',

    [iconSpacingVar]: tokens.spacingHorizontalSNudge,
  },

  // Appearance variations
  subtle: {
    ':hover': {
      color: tokens.colorNeutralForeground2BrandHover,
    },

    ':hover:active': {
      color: tokens.colorNeutralForeground2BrandPressed,
    },
  },

  // Icon position variations
  before: {
    marginRight: `var(${iconSpacingVar})`,
  },
  after: {
    marginLeft: `var(${iconSpacingVar})`,
  },
});

export const useButtonStyles_unstable = (state: ButtonState): ButtonState => {
  const rootStyles = useRootStyles();
  const rootDisabledStyles = useRootDisabledStyles();
  const rootFocusStyles = useRootFocusStyles();
  const rootIconOnlyStyles = useRootIconOnlyStyles();
  const iconStyles = useIconStyles();

  const { appearance, disabled, disabledFocusable, iconOnly, iconPosition, shape, size } = state;

  state.root.className = mergeClasses(
    buttonClassNames.root,

    // Root styles
    rootStyles.base,
    rootStyles.transition,
    rootStyles.highContrast,
    appearance && rootStyles[appearance],
    rootStyles[size],
    rootStyles[shape],

    // Disabled styles
    (disabled || disabledFocusable) && rootDisabledStyles.base,
    (disabled || disabledFocusable) && rootDisabledStyles.highContrast,
    appearance && (disabled || disabledFocusable) && rootDisabledStyles[appearance],

    // Focus styles
    rootFocusStyles.base,
    appearance === 'primary' && rootFocusStyles.primary,
    rootFocusStyles[size],
    rootFocusStyles[shape],

    // Icon-only styles
    iconOnly && rootIconOnlyStyles[size],

    // User provided class name
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      buttonClassNames.icon,
      iconStyles.base,
      state.root.children !== undefined && state.root.children !== null && iconStyles[iconPosition],
      appearance === 'subtle' && iconStyles.subtle,
      iconStyles[size],
      state.icon.className,
    );
  }

  return state;
};
