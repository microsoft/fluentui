import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import * as semanticTokens from '@fluentui/semantic-tokens';
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
const boxShadowStrokeWidthThinMoz = `calc(${semanticTokens.strokewidthDefault} + 0.25px)`;

const useRootBaseClassName = makeResetStyles({
  alignItems: 'center',
  boxSizing: 'border-box',
  display: 'inline-flex',
  justifyContent: 'center',
  textDecorationLine: 'none',
  verticalAlign: 'middle',

  margin: 0,
  overflow: 'hidden',

  backgroundColor: semanticTokens.backgroundCtrlNeutralRest,
  color: semanticTokens.foregroundCtrlNeutralPrimaryRest,
  border: `${semanticTokens.strokewidthDefault} solid ${semanticTokens.strokeCtrlOnneutralRest}`,

  fontFamily: semanticTokens.textStyleDefaultRegularFontfamily,
  outlineStyle: 'none',

  ':hover': {
    backgroundColor: semanticTokens.backgroundCtrlNeutralHover,
    borderColor: semanticTokens.strokeCtrlOnneutralHover,
    color: semanticTokens.foregroundCtrlNeutralPrimaryHover,

    cursor: 'pointer',
  },

  ':hover:active': {
    backgroundColor: semanticTokens.backgroundCtrlNeutralPressed,
    borderColor: semanticTokens.strokeCtrlOnneutralPressed,
    color: semanticTokens.foregroundCtrlNeutralPrimaryPressed,

    outlineStyle: 'none',
  },

  padding: `${buttonSpacingMedium} ${semanticTokens.paddingCtrlTextside}`,
  minWidth: '96px',
  borderRadius: semanticTokens.cornerCtrlRest,

  fontSize: semanticTokens.textRampItembodyFontsize,
  fontWeight: semanticTokens.textCtrlButtonWeightDefault,
  lineHeight: semanticTokens.textRampItembodyLineheight,

  // Transition styles
  // TODO: Motion semantic tokens are still in definition phase, refactor these later
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
    borderColor: semanticTokens.ctrlFocusInnerStroke,
    borderRadius: semanticTokens.cornerCtrlRest,
    borderWidth: '1px',
    outline: `${semanticTokens.ctrlFocusOuterStrokewidth} solid ${semanticTokens.strokeLayer}`,
    boxShadow: `0 0 0 ${semanticTokens.strokewidthDefault} ${semanticTokens.ctrlFocusInnerStroke}
      inset
    `,
    zIndex: 1,
  }),

  // BUGFIX: Mozilla specific styles (Mozilla BugID: 1857642)
  '@supports (-moz-appearance:button)': {
    ...createCustomFocusIndicatorStyle({
      boxShadow: `0 0 0 ${boxShadowStrokeWidthThinMoz} ${semanticTokens.ctrlFocusInnerStroke}
      inset
    `,
    }),
  },
});

const useIconBaseClassName = makeResetStyles({
  alignItems: 'center',
  display: 'inline-flex',
  justifyContent: 'center',

  fontSize: semanticTokens.sizeCtrlIcon,
  height: semanticTokens.sizeCtrlIcon,
  width: semanticTokens.sizeCtrlIcon,

  [iconSpacingVar]: semanticTokens.gapInsideCtrlTosecondaryicon,
});

//background/ctrl/outline/hover colorTransparentBackground
// NULL/color
const useRootStyles = makeStyles({
  // Appearance variations
  outline: {
    backgroundColor: semanticTokens.backgroundCtrlOutlineRest,
    border: `${semanticTokens.strokewidthCtrlOutlineRest} solid ${semanticTokens.strokeCtrlOnoutlineRestStop2}`,

    ':hover': {
      backgroundColor: semanticTokens.backgroundCtrlOutlineHover,
      border: `${semanticTokens.strokewidthCtrlOutlineHover} solid ${semanticTokens.strokeCtrlOnoutlineHoverStop2}`,
    },

    ':hover:active': {
      backgroundColor: semanticTokens.backgroundCtrlOutlinePressed,
      border: `${semanticTokens.strokewidthCtrlOutlinePressed} solid ${semanticTokens.strokeCtrlOnoutlinePressedStop2}`,
    },
  },

  primary: {
    backgroundColor: semanticTokens.backgroundCtrlBrandRest,
    ...shorthands.borderColor(semanticTokens.strokeCtrlOnbrandRestStop2),
    color: semanticTokens.foregroundCtrlOnbrandRest,

    ':hover': {
      backgroundColor: semanticTokens.backgroundCtrlBrandHover,
      ...shorthands.borderColor(semanticTokens.strokeCtrlOnbrandHoverStop2),
      color: semanticTokens.foregroundCtrlOnbrandHover,
    },

    ':hover:active': {
      backgroundColor: semanticTokens.backgroundCtrlBrandPressed,
      ...shorthands.borderColor(semanticTokens.strokeCtrlOnbrandPressedStop2),
      color: semanticTokens.foregroundCtrlOnbrandPressed,
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
    backgroundColor: semanticTokens.backgroundCtrlSubtleRest,
    ...shorthands.borderColor('transparent'),
    color: semanticTokens.foregroundCtrlOnsubtleRest,

    ':hover': {
      backgroundColor: semanticTokens.backgroundCtrlSubtleHover,
      ...shorthands.borderColor('transparent'),
      color: semanticTokens.foregroundCtrlOnsubtleHover,
      [`& .${iconFilledClassName}`]: {
        display: 'inline',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
      [`& .${buttonClassNames.icon}`]: {
        color: semanticTokens.foregroundCtrlIconOnsubtleHover,
      },
    },

    ':hover:active': {
      backgroundColor: semanticTokens.backgroundCtrlSubtlePressed,
      ...shorthands.borderColor('transparent'),
      color: semanticTokens.foregroundCtrlOnsubtlePressed,
      [`& .${iconFilledClassName}`]: {
        display: 'inline',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
      [`& .${buttonClassNames.icon}`]: {
        color: semanticTokens.foregroundCtrlIconOnsubtlePressed,
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
    color: semanticTokens.foregroundCtrlOntransparentRest,

    ':hover': {
      backgroundColor: tokens.colorTransparentBackgroundHover,
      ...shorthands.borderColor('transparent'),
      color: semanticTokens.foregroundCtrlOntransparentHover,
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
      color: semanticTokens.foregroundCtrlOntransparentPressed,
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
  circular: { borderRadius: semanticTokens.cornerCircular },
  rounded: {
    /* The borderRadius rounded styles are handled in the size variations */
  },
  square: { borderRadius: semanticTokens.cornerZero },

  // Size variations
  small: {
    minWidth: '64px',
    padding: `${buttonSpacingSmall} ${semanticTokens.paddingCtrlSmHorizontalDefault}`,
    borderRadius: `var(${semanticTokens.cornerCtrlSmRest},${tokens.borderRadiusMedium})`,

    fontSize: semanticTokens.textRampSmItembodyFontsize,
    fontWeight: semanticTokens.textCtrlButtonWeightDefault,
    lineHeight: semanticTokens.textRampSmItembodyLineheight,
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
    padding: `${buttonSpacingLarge} ${semanticTokens.paddingCtrlLgHorizontalDefault}`,
    borderRadius: `var(${semanticTokens.cornerCtrlLgRest},${tokens.borderRadiusMedium})`,

    fontSize: semanticTokens.textRampLgItembodyFontsize,
    fontWeight: semanticTokens.textCtrlButtonWeightDefault,
    lineHeight: semanticTokens.textRampLgItembodyLineheight,
  },
  largeWithIcon: {
    paddingBottom: buttonSpacingLargeWithIcon,
    paddingTop: buttonSpacingLargeWithIcon,
  },
});

const useRootDisabledStyles = makeStyles({
  // Base styles
  base: {
    backgroundColor: semanticTokens.backgroundCtrlNeutralDisabled,
    ...shorthands.borderColor(semanticTokens.strokeCtrlOnbrandDisabledStop2),
    color: semanticTokens.foregroundCtrlNeutralPrimaryDisabled,
    cursor: 'not-allowed',
    [`& .${buttonClassNames.icon}`]: {
      color: semanticTokens.foregroundCtrlIconOnneutralDisabled,
    },

    ':hover': {
      backgroundColor: semanticTokens.backgroundCtrlNeutralDisabled,
      ...shorthands.borderColor(semanticTokens.strokeCtrlOnbrandDisabledStop2),
      color: semanticTokens.foregroundCtrlNeutralPrimaryDisabled,

      cursor: 'not-allowed',

      [`& .${iconFilledClassName}`]: {
        display: 'none',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'inline',
      },
      [`& .${buttonClassNames.icon}`]: {
        color: semanticTokens.foregroundCtrlIconOnneutralDisabled,
      },
    },

    ':hover:active': {
      backgroundColor: semanticTokens.backgroundCtrlNeutralDisabled,
      ...shorthands.borderColor(semanticTokens.strokeCtrlOnbrandDisabledStop2),
      color: semanticTokens.foregroundCtrlNeutralPrimaryDisabled,

      cursor: 'not-allowed',

      [`& .${iconFilledClassName}`]: {
        display: 'none',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'inline',
      },
      [`& .${buttonClassNames.icon}`]: {
        color: semanticTokens.foregroundCtrlIconOnneutralDisabled,
      },
    },
  },

  // High contrast styles
  highContrast: {
    '@media (forced-colors: active)': {
      backgroundColor: 'ButtonFace',
      ...shorthands.borderColor('GrayText'),
      color: 'GrayText',

      [`& .${buttonClassNames.icon}`]: {
        color: 'GrayText',
      },

      ':focus': {
        ...shorthands.borderColor('GrayText'),
      },

      ':hover': {
        backgroundColor: 'ButtonFace',
        ...shorthands.borderColor('GrayText'),
        color: 'GrayText',

        [`& .${buttonClassNames.icon}`]: {
          color: 'GrayText',
        },
      },

      ':hover:active': {
        backgroundColor: 'ButtonFace',
        ...shorthands.borderColor('GrayText'),
        color: 'GrayText',

        [`& .${buttonClassNames.icon}`]: {
          color: 'GrayText',
        },
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
    color: semanticTokens.foregroundCtrlNeutralSecondaryDisabled,
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
    [`& .${buttonClassNames.icon}`]: {
      color: semanticTokens.foregroundCtrlOntransparentDisabled,
    },
    color: semanticTokens.foregroundCtrlOntransparentDisabled,
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
  circular: createCustomFocusIndicatorStyle({ borderRadius: semanticTokens.cornerCircular }),
  rounded: {
    /* The rounded styles are exactly the same as the base styles. */
  },
  square: createCustomFocusIndicatorStyle({ borderRadius: semanticTokens.cornerZero }),
  // Primary styles
  primary: {
    ...createCustomFocusIndicatorStyle({
      ...shorthands.borderColor(semanticTokens.ctrlFocusInnerStroke),
      boxShadow: `${tokens.shadow2}, 0 0 0 ${semanticTokens.strokewidthDefault} ${semanticTokens.ctrlFocusInnerStroke} inset,  0 0 0 ${semanticTokens.ctrlFocusOuterStrokewidth} ${semanticTokens.strokeCtrlOnactivebrandRest} inset`,
      ':hover': {
        boxShadow: `${tokens.shadow2}, 0 0 0 ${semanticTokens.strokewidthDefault} ${semanticTokens.ctrlFocusInnerStroke} inset`,
        ...shorthands.borderColor(semanticTokens.strokeCtrlOnactivebrandHover),
      },
    }),

    // BUGFIX: Mozilla specific styles (Mozilla BugID: 1857642)
    '@supports (-moz-appearance:button)': {
      ...createCustomFocusIndicatorStyle({
        // TODO: Replace shadow2 with semantic shadow
        boxShadow: `${tokens.shadow2}, 0 0 0 ${boxShadowStrokeWidthThinMoz} ${semanticTokens.ctrlFocusInnerStroke} inset,  0 0 0 ${semanticTokens.ctrlFocusOuterStrokewidth} ${semanticTokens.strokeCtrlOnactivebrandRest} inset`,
        ':hover': {
          boxShadow: `${tokens.shadow2}, 0 0 0 ${boxShadowStrokeWidthThinMoz} ${semanticTokens.strokeCtrlOnactivebrandHover} inset`,
        },
      }),
    },
  },
  // Size variations
  small: createCustomFocusIndicatorStyle({
    borderRadius: `var(${semanticTokens.cornerCtrlSmRest},${tokens.borderRadiusSmall})`,
  }),
  medium: {
    /* defined in base styles */
  },
  // corner/ctrl-lg/rest - borderRadiusLarge
  large: createCustomFocusIndicatorStyle({
    borderRadius: `var(${semanticTokens.cornerCtrlLgRest},${tokens.borderRadiusLarge})`,
  }),
});

const useRootIconOnlyStyles = makeStyles({
  // Size variations
  small: {
    paddingHorizontal: semanticTokens.paddingCtrlSmHorizontalIcononly,
    paddingVertical: buttonSpacingSmallWithIcon,

    minWidth: '24px',
    maxWidth: '24px',
  },
  medium: {
    paddingHorizontal: semanticTokens.paddingCtrlHorizontalIcononly,
    paddingVertical: buttonSpacingMedium,
    minWidth: '32px',
    maxWidth: '32px',
  },
  large: {
    paddingHorizontal: semanticTokens.paddingCtrlLgHorizontalIcononly,
    paddingVertical: buttonSpacingLargeWithIcon,

    minWidth: '40px',
    maxWidth: '40px',
  },
});

const useIconStyles = makeStyles({
  // Size variations
  small: {
    fontSize: semanticTokens.sizeCtrlSmIcon,
    height: semanticTokens.sizeCtrlSmIcon,
    width: semanticTokens.sizeCtrlSmIcon,

    [iconSpacingVar]: tokens.spacingHorizontalXS,
  },
  medium: {
    /* defined in base styles */
  },
  large: {
    fontSize: semanticTokens.sizeCtrlLgIcon,
    height: semanticTokens.sizeCtrlLgIcon,
    width: semanticTokens.sizeCtrlLgIcon,

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
