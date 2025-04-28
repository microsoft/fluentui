import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import { shorthands, makeStyles, makeResetStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ButtonSlots, ButtonState } from './Button.types';
import * as semanticTokens from '@fluentui/semantic-tokens';

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

const paddingSmHorizontalNoIcon = `calc(${semanticTokens.paddingCtrlSmHorizontalDefault} + ${semanticTokens.paddingCtrlTextside})`;
const paddingHorizontalNoIcon = `calc(${semanticTokens.paddingCtrlHorizontalDefault} + ${semanticTokens.paddingCtrlTextside})`;
const paddingLgHorizontalNoIcon = `calc(${semanticTokens.paddingCtrlLgHorizontalDefault} + ${semanticTokens.paddingCtrlTextside})`;

/* Firefox has box shadow sizing issue at some zoom levels
 * this will ensure the inset boxShadow is always uniform
 * without affecting other browser platforms
 */
const boxShadowStrokeWidthThinMoz = `calc(${semanticTokens.ctrlFocusInnerStrokewidth} + 0.25px)`;

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

  padding: `${semanticTokens.paddingCtrlTexttop} ${paddingHorizontalNoIcon} ${semanticTokens.paddingCtrlTextbottom} ${paddingHorizontalNoIcon}`,
  minWidth: semanticTokens.sizeCtrlDefault,
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
    outline: `${semanticTokens.ctrlFocusOuterStrokewidth} solid ${semanticTokens.ctrlFocusOuterStroke}`,
    boxShadow: `0 0 0 ${semanticTokens.ctrlFocusInnerStrokewidth} ${semanticTokens.ctrlFocusInnerStroke}
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

  [iconSpacingVar]: `calc(${semanticTokens.gapInsideCtrlDefault} + ${semanticTokens.paddingCtrlTextside})`,
});

const useRootStyles = makeStyles({
  // Appearance variations
  outline: {
    backgroundColor: semanticTokens.backgroundCtrlOutlineRest,
    border: `${semanticTokens.strokewidthCtrlOutlineRest} solid ${semanticTokens.strokeCtrlOnoutlineRest}`,
    color: semanticTokens.foregroundCtrlOnoutlineRest,
    ':hover': {
      backgroundColor: semanticTokens.backgroundCtrlOutlineHover,
      border: `${semanticTokens.strokewidthCtrlOutlineHover} solid ${semanticTokens.strokeCtrlOnoutlineHover}`,
      color: semanticTokens.foregroundCtrlOnoutlineHover,
    },

    ':hover:active': {
      backgroundColor: semanticTokens.backgroundCtrlOutlinePressed,
      border: `${semanticTokens.strokewidthCtrlOutlinePressed} solid ${semanticTokens.strokeCtrlOnoutlinePressed}`,
      color: semanticTokens.foregroundCtrlOnoutlinePressed,
    },
  },

  primary: {
    backgroundColor: semanticTokens.backgroundCtrlBrandRest,
    ...shorthands.borderColor(semanticTokens.strokeCtrlOnbrandRest),
    color: semanticTokens.foregroundCtrlOnbrandRest,

    ':hover': {
      backgroundColor: semanticTokens.backgroundCtrlBrandHover,
      ...shorthands.borderColor(semanticTokens.strokeCtrlOnbrandHover),
      color: semanticTokens.foregroundCtrlOnbrandHover,
    },

    ':hover:active': {
      backgroundColor: semanticTokens.backgroundCtrlBrandPressed,
      ...shorthands.borderColor(semanticTokens.strokeCtrlOnbrandPressed),
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
    ...shorthands.borderColor(semanticTokens.strokeCtrlOnsubtleRest),
    color: semanticTokens.foregroundCtrlOnsubtleRest,
    [`& .${buttonClassNames.icon}`]: {
      color: semanticTokens.foregroundCtrlIconOnsubtleRest,
    },

    ':hover': {
      backgroundColor: semanticTokens.backgroundCtrlSubtleHover,
      ...shorthands.borderColor(semanticTokens.strokeCtrlOnsubtleHover),
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
      ...shorthands.borderColor(semanticTokens.strokeCtrlOnsubtlePressed),
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
    minWidth: semanticTokens.sizeCtrlSmDefault,
    padding: `${buttonSpacingSmall} ${paddingSmHorizontalNoIcon}`,
    borderRadius: semanticTokens.cornerCtrlSmRest,

    fontSize: semanticTokens.textRampSmItembodyFontsize,
    fontWeight: semanticTokens.textCtrlButtonWeightDefault,
    lineHeight: semanticTokens.textRampSmItembodyLineheight,
  },
  smallWithIcon: {
    paddingBottom: buttonSpacingSmallWithIcon,
    paddingTop: buttonSpacingSmallWithIcon,
  },
  smallWithIconBefore: {
    paddingRight: paddingSmHorizontalNoIcon,
    paddingLeft: semanticTokens.paddingCtrlSmHorizontalDefault,
  },
  smallWithIconAfter: {
    paddingRight: semanticTokens.paddingCtrlSmHorizontalDefault,
    paddingLeft: paddingSmHorizontalNoIcon,
  },
  medium: {
    /* defined in base styles */
  },
  mediumWithIconBefore: {
    paddingRight: paddingHorizontalNoIcon,
    paddingLeft: semanticTokens.paddingCtrlHorizontalDefault,
  },
  mediumWithIconAfter: {
    paddingRight: semanticTokens.paddingCtrlHorizontalDefault,
    paddingLeft: paddingHorizontalNoIcon,
  },
  large: {
    minWidth: semanticTokens.sizeCtrlLgDefault,
    padding: `${buttonSpacingLarge} ${paddingLgHorizontalNoIcon}`,
    borderRadius: semanticTokens.cornerCtrlLgRest,

    fontSize: semanticTokens.textRampLgItembodyFontsize,
    fontWeight: semanticTokens.textCtrlButtonWeightDefault,
    lineHeight: semanticTokens.textRampLgItembodyLineheight,
  },
  largeWithIcon: {
    paddingBottom: buttonSpacingLargeWithIcon,
    paddingTop: buttonSpacingLargeWithIcon,
  },
  largeWithIconBefore: {
    paddingRight: paddingLgHorizontalNoIcon,
    paddingLeft: semanticTokens.paddingCtrlLgHorizontalDefault,
  },
  largeWithIconAfter: {
    paddingRight: semanticTokens.paddingCtrlLgHorizontalDefault,
    paddingLeft: paddingLgHorizontalNoIcon,
  },
});

const useRootDisabledStyles = makeStyles({
  // Base styles
  base: {
    backgroundColor: semanticTokens.backgroundCtrlNeutralDisabled,
    ...shorthands.borderColor(semanticTokens.strokeCtrlOnneutralDisabled),
    color: semanticTokens.foregroundCtrlNeutralPrimaryDisabled,
    cursor: 'not-allowed',
    [`& .${buttonClassNames.icon}`]: {
      color: semanticTokens.foregroundCtrlIconOnneutralDisabled,
    },

    ':hover': {
      backgroundColor: semanticTokens.backgroundCtrlNeutralDisabled,
      ...shorthands.borderColor(semanticTokens.strokeCtrlOnneutralDisabled),
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
      ...shorthands.borderColor(semanticTokens.strokeCtrlOnneutralDisabled),
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
    color: semanticTokens.foregroundCtrlOnoutlineDisabled,
    ...shorthands.borderColor(semanticTokens.strokeCtrlOnoutlineDisabled),

    ':hover': {
      backgroundColor: tokens.colorTransparentBackground,
    },

    ':hover:active': {
      backgroundColor: tokens.colorTransparentBackground,
    },
  },
  primary: {
    ...shorthands.borderColor(semanticTokens.strokeCtrlOnbrandDisabled),

    ':hover': {
      ...shorthands.borderColor(semanticTokens.strokeCtrlOnbrandDisabled),
    },

    ':hover:active': {
      ...shorthands.borderColor(semanticTokens.strokeCtrlOnbrandDisabled),
    },
  },
  secondary: {
    color: semanticTokens.foregroundCtrlNeutralSecondaryDisabled,
  },
  subtle: {
    backgroundColor: semanticTokens.backgroundCtrlSubtleDisabled,
    color: semanticTokens.foregroundCtrlOnsubtleDisabled,
    ...shorthands.borderColor(semanticTokens.strokeCtrlOnsubtleDisabled),

    [`& .${buttonClassNames.icon}`]: {
      color: semanticTokens.foregroundCtrlIconOnsubtleDisabled,
    },
    ':hover': {
      backgroundColor: semanticTokens.backgroundCtrlSubtleDisabled,
      ...shorthands.borderColor(semanticTokens.strokeCtrlOnsubtleDisabled),
    },

    ':hover:active': {
      backgroundColor: semanticTokens.backgroundCtrlSubtleDisabled,
      ...shorthands.borderColor(semanticTokens.strokeCtrlOnsubtleDisabled),
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
      boxShadow: `${tokens.shadow2}, 0 0 0 ${semanticTokens.ctrlFocusInnerStrokewidth} ${semanticTokens.ctrlFocusInnerStroke} inset,  0 0 0 ${semanticTokens.ctrlFocusOuterStrokewidth} ${semanticTokens.strokeCtrlOnactivebrandRest} inset`,
      ':hover': {
        boxShadow: `${tokens.shadow2}, 0 0 0 ${semanticTokens.ctrlFocusInnerStrokewidth} ${semanticTokens.ctrlFocusInnerStroke} inset`,
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
    borderRadius: `calc(${semanticTokens.cornerCtrlSmRest} - ${semanticTokens.ctrlFocusOuterStrokewidth})`,
  }),
  medium: {
    /* defined in base styles */
  },
  large: createCustomFocusIndicatorStyle({
    borderRadius: `calc(${semanticTokens.cornerCtrlLgRest} + ${semanticTokens.ctrlFocusOuterStrokewidth})`,
  }),
});

const useRootIconOnlyStyles = makeStyles({
  // Size variations
  small: {
    padding: `${buttonSpacingSmallWithIcon} ${semanticTokens.paddingCtrlSmHorizontalIcononly}`,
    minWidth: '24px',
    maxWidth: '24px',
  },
  medium: {
    padding: `${buttonSpacingMedium} ${semanticTokens.paddingCtrlHorizontalIcononly}`,
    minWidth: '32px',
    maxWidth: '32px',
  },
  large: {
    padding: `${buttonSpacingLargeWithIcon} ${semanticTokens.paddingCtrlLgHorizontalIcononly}`,

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

    [iconSpacingVar]: `calc(${semanticTokens.gapInsideCtrlSmDefault} + ${semanticTokens.paddingCtrlTextside})`,
  },
  medium: {
    /* defined in base styles */
  },
  large: {
    fontSize: semanticTokens.sizeCtrlLgIcon,
    height: semanticTokens.sizeCtrlLgIcon,
    width: semanticTokens.sizeCtrlLgIcon,

    [iconSpacingVar]: `calc(${semanticTokens.gapInsideCtrlLgDefault} + ${semanticTokens.paddingCtrlTextside})`,
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
    icon && size === 'medium' && iconPosition === 'after' && rootStyles.mediumWithIconAfter,
    icon && size === 'medium' && iconPosition === 'before' && rootStyles.mediumWithIconBefore,
    icon && size === 'small' && rootStyles.smallWithIcon,
    icon && size === 'small' && iconPosition === 'after' && rootStyles.smallWithIconAfter,
    icon && size === 'small' && iconPosition === 'before' && rootStyles.smallWithIconBefore,
    icon && size === 'large' && rootStyles.largeWithIcon,
    icon && size === 'large' && iconPosition === 'after' && rootStyles.largeWithIconAfter,
    icon && size === 'large' && iconPosition === 'before' && rootStyles.largeWithIconBefore,
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
