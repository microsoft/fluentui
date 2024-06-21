import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import { shorthands, makeStyles, makeResetStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ButtonSlots, ButtonState } from './Button.types';

export const buttonClassNames: SlotClassNames<ButtonSlots> = {
  root: 'fui-Button',
  icon: 'fui-Button__icon',
};

const iconSpacingVar = '--fui-Button__icon--spacing';

const buttonSpacingSmall = '3px';
const buttonSpacingSmallWithIcon = '1px';
const buttonSpacingMedium = '5px';
const buttonSpacingLarge = '8px';
const buttonSpacingLargeWithIcon = '7px';

/* Firefox has box shadow sizing issue at some zoom levels
 * this will ensure the inset boxShadow is always uniform
 * without affecting other browser platforms
 */
const boxShadowStrokeWidthThinMoz = `calc(${tokens.strokeWidthThin} + 0.25px)`;

const useRootBaseClassName = makeResetStyles({
  alignItems: 'center',
  boxSizing: 'border-box',
  display: 'inline-flex',
  justifyContent: 'center',
  textDecorationLine: 'none',
  verticalAlign: 'middle',

  margin: 0,
  overflow: 'hidden',

  backgroundColor: tokens.colorNeutralBackground1,
  color: tokens.colorNeutralForeground1,
  border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,

  fontFamily: tokens.fontFamilyBase,
  outlineStyle: 'none',

  ':hover': {
    backgroundColor: tokens.colorNeutralBackground1Hover,
    borderColor: tokens.colorNeutralStroke1Hover,
    color: tokens.colorNeutralForeground1Hover,

    cursor: 'pointer',
  },

  ':hover:active': {
    backgroundColor: tokens.colorNeutralBackground1Pressed,
    borderColor: tokens.colorNeutralStroke1Pressed,
    color: tokens.colorNeutralForeground1Pressed,

    outlineStyle: 'none',
  },

  padding: `${buttonSpacingMedium} ${tokens.spacingHorizontalM}`,
  minWidth: '96px',
  borderRadius: tokens.borderRadiusMedium,

  fontSize: tokens.fontSizeBase300,
  fontWeight: tokens.fontWeightSemibold,
  lineHeight: tokens.lineHeightBase300,

  // Transition styles

  transitionDuration: tokens.durationFaster,
  transitionProperty: 'background, border, color',
  transitionTimingFunction: tokens.curveEasyEase,

  '@media screen and (prefers-reduced-motion: reduce)': {
    transitionDuration: '0.01ms',
  },

  // High contrast styles

  '@media (forced-colors: active)': {
    ':focus': {
      borderColor: 'ButtonText',
    },

    ':hover': {
      backgroundColor: 'HighlightText',
      borderColor: 'Highlight',
      color: 'Highlight',
      forcedColorAdjust: 'none',
    },

    ':hover:active': {
      backgroundColor: 'HighlightText',
      borderColor: 'Highlight',
      color: 'Highlight',
      forcedColorAdjust: 'none',
    },
  },

  // Focus styles

  ...createCustomFocusIndicatorStyle({
    borderColor: tokens.colorStrokeFocus2,
    borderRadius: tokens.borderRadiusMedium,
    borderWidth: '1px',
    outline: `${tokens.strokeWidthThick} solid ${tokens.colorTransparentStroke}`,
    boxShadow: `0 0 0 ${tokens.strokeWidthThin} ${tokens.colorStrokeFocus2}
      inset
    `,
    zIndex: 1,
  }),

  // BUGFIX: Mozilla specific styles (Mozilla BugID: 1857642)
  '@supports (-moz-appearance:button)': {
    ...createCustomFocusIndicatorStyle({
      boxShadow: `0 0 0 ${boxShadowStrokeWidthThinMoz} ${tokens.colorStrokeFocus2}
      inset
    `,
    }),
  },
});

const useIconBaseClassName = makeResetStyles({
  alignItems: 'center',
  display: 'inline-flex',
  justifyContent: 'center',

  fontSize: '20px',
  height: '20px',
  width: '20px',

  [iconSpacingVar]: tokens.spacingHorizontalSNudge,
});

const useRootStyles = makeStyles({
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

    '@media (forced-colors: active)': {
      backgroundColor: 'Highlight',
      ...shorthands.borderColor('HighlightText'),
      color: 'HighlightText',
      forcedColorAdjust: 'none',

      ':hover': {
        backgroundColor: 'HighlightText',
        ...shorthands.borderColor('Highlight'),
        color: 'Highlight',
      },

      ':hover:active': {
        backgroundColor: 'HighlightText',
        ...shorthands.borderColor('Highlight'),
        color: 'Highlight',
      },
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
      [`& .${iconFilledClassName}`]: {
        display: 'inline',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
      [`& .${buttonClassNames.icon}`]: {
        color: tokens.colorNeutralForeground2BrandHover,
      },
    },

    ':hover:active': {
      backgroundColor: tokens.colorSubtleBackgroundPressed,
      ...shorthands.borderColor('transparent'),
      color: tokens.colorNeutralForeground2Pressed,
      [`& .${iconFilledClassName}`]: {
        display: 'inline',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
      [`& .${buttonClassNames.icon}`]: {
        color: tokens.colorNeutralForeground2BrandPressed,
      },
    },

    '@media (forced-colors: active)': {
      ':hover': {
        color: 'Highlight',

        [`& .${buttonClassNames.icon}`]: {
          color: 'Highlight',
        },
      },
      ':hover:active': {
        color: 'Highlight',

        [`& .${buttonClassNames.icon}`]: {
          color: 'Highlight',
        },
      },
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
      [`& .${iconFilledClassName}`]: {
        display: 'inline',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
    },

    ':hover:active': {
      backgroundColor: tokens.colorTransparentBackgroundPressed,
      ...shorthands.borderColor('transparent'),
      color: tokens.colorNeutralForeground2BrandPressed,
      [`& .${iconFilledClassName}`]: {
        display: 'inline',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
    },

    '@media (forced-colors: active)': {
      ':hover': {
        backgroundColor: tokens.colorTransparentBackground,
        color: 'Highlight',
      },
      ':hover:active': {
        backgroundColor: tokens.colorTransparentBackground,
        color: 'Highlight',
      },
    },
  },

  // Shape variations
  circular: { borderRadius: tokens.borderRadiusCircular },
  rounded: {
    /* The borderRadius rounded styles are handled in the size variations */
  },
  square: { borderRadius: tokens.borderRadiusNone },

  // Size variations
  small: {
    minWidth: '64px',
    padding: `${buttonSpacingSmall} ${tokens.spacingHorizontalS}`,
    borderRadius: tokens.borderRadiusMedium,

    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightRegular,
    lineHeight: tokens.lineHeightBase200,
  },
  smallWithIcon: {
    paddingBottom: buttonSpacingSmallWithIcon,
    paddingTop: buttonSpacingSmallWithIcon,
  },
  medium: {
    /* defined in base styles */
  },
  large: {
    minWidth: '96px',
    padding: `${buttonSpacingLarge} ${tokens.spacingHorizontalL}`,
    borderRadius: tokens.borderRadiusMedium,

    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase400,
  },
  largeWithIcon: {
    paddingBottom: buttonSpacingLargeWithIcon,
    paddingTop: buttonSpacingLargeWithIcon,
  },
});

const useRootDisabledStyles = makeStyles({
  // Base styles
  base: {
    backgroundColor: tokens.colorNeutralBackgroundDisabled,
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    color: tokens.colorNeutralForegroundDisabled,

    cursor: 'not-allowed',
    [`& .${buttonClassNames.icon}`]: {
      color: tokens.colorNeutralForegroundDisabled,
    },

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
      [`& .${buttonClassNames.icon}`]: {
        color: tokens.colorNeutralForegroundDisabled,
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
      [`& .${buttonClassNames.icon}`]: {
        color: tokens.colorNeutralForegroundDisabled,
      },
    },
  },

  // High contrast styles
  highContrast: {
    '@media (forced-colors: active)': {
      backgroundColor: 'ButtonFace',
      ...shorthands.borderColor('GrayText'),
      color: 'GrayText',

      ':focus': {
        ...shorthands.borderColor('GrayText'),
      },

      ':hover': {
        backgroundColor: 'ButtonFace',
        ...shorthands.borderColor('GrayText'),
        color: 'GrayText',
      },

      ':hover:active': {
        backgroundColor: 'ButtonFace',
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
  // Shape variations
  circular: createCustomFocusIndicatorStyle({ borderRadius: tokens.borderRadiusCircular }),
  rounded: {
    /* The rounded styles are exactly the same as the base styles. */
  },
  square: createCustomFocusIndicatorStyle({ borderRadius: tokens.borderRadiusNone }),

  // Primary styles
  primary: {
    ...createCustomFocusIndicatorStyle({
      ...shorthands.borderColor(tokens.colorStrokeFocus2),
      boxShadow: `${tokens.shadow2}, 0 0 0 ${tokens.strokeWidthThin} ${tokens.colorStrokeFocus2} inset,  0 0 0 ${tokens.strokeWidthThick} ${tokens.colorNeutralForegroundOnBrand} inset`,
      ':hover': {
        boxShadow: `${tokens.shadow2}, 0 0 0 ${tokens.strokeWidthThin} ${tokens.colorStrokeFocus2} inset`,
        ...shorthands.borderColor(tokens.colorStrokeFocus2),
      },
    }),

    // BUGFIX: Mozilla specific styles (Mozilla BugID: 1857642)
    '@supports (-moz-appearance:button)': {
      ...createCustomFocusIndicatorStyle({
        boxShadow: `${tokens.shadow2}, 0 0 0 ${boxShadowStrokeWidthThinMoz} ${tokens.colorStrokeFocus2} inset,  0 0 0 ${tokens.strokeWidthThick} ${tokens.colorNeutralForegroundOnBrand} inset`,
        ':hover': {
          boxShadow: `${tokens.shadow2}, 0 0 0 ${boxShadowStrokeWidthThinMoz} ${tokens.colorStrokeFocus2} inset`,
        },
      }),
    },
  },

  // Size variations
  small: createCustomFocusIndicatorStyle({ borderRadius: tokens.borderRadiusSmall }),
  medium: {
    /* defined in base styles */
  },
  large: createCustomFocusIndicatorStyle({ borderRadius: tokens.borderRadiusLarge }),
});

const useRootIconOnlyStyles = makeStyles({
  // Size variations
  small: {
    padding: buttonSpacingSmallWithIcon,

    minWidth: '24px',
    maxWidth: '24px',
  },
  medium: {
    padding: buttonSpacingMedium,

    minWidth: '32px',
    maxWidth: '32px',
  },
  large: {
    padding: buttonSpacingLargeWithIcon,

    minWidth: '40px',
    maxWidth: '40px',
  },
});

const useIconStyles = makeStyles({
  // Size variations
  small: {
    fontSize: '20px',
    height: '20px',
    width: '20px',

    [iconSpacingVar]: tokens.spacingHorizontalXS,
  },
  medium: {
    /* defined in base styles */
  },
  large: {
    fontSize: '24px',
    height: '24px',
    width: '24px',

    [iconSpacingVar]: tokens.spacingHorizontalSNudge,
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
  'use no memo';

  const rootBaseClassName = useRootBaseClassName();
  const iconBaseClassName = useIconBaseClassName();

  const rootStyles = useRootStyles();
  const rootDisabledStyles = useRootDisabledStyles();
  const rootFocusStyles = useRootFocusStyles();
  const rootIconOnlyStyles = useRootIconOnlyStyles();
  const iconStyles = useIconStyles();

  const { appearance, disabled, disabledFocusable, icon, iconOnly, iconPosition, shape, size } = state;

  state.root.className = mergeClasses(
    buttonClassNames.root,
    rootBaseClassName,

    appearance && rootStyles[appearance],

    rootStyles[size],
    icon && size === 'small' && rootStyles.smallWithIcon,
    icon && size === 'large' && rootStyles.largeWithIcon,
    rootStyles[shape],

    // Disabled styles
    (disabled || disabledFocusable) && rootDisabledStyles.base,
    (disabled || disabledFocusable) && rootDisabledStyles.highContrast,
    appearance && (disabled || disabledFocusable) && rootDisabledStyles[appearance],

    // Focus styles
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
      iconBaseClassName,
      !!state.root.children && iconStyles[iconPosition],
      iconStyles[size],
      state.icon.className,
    );
  }

  return state;
};
