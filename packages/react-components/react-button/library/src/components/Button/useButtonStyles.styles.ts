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

const paddingSmHorizontalNoIcon = `calc(${semanticTokens.paddingCtrlSmHorizontalDefault} + ${semanticTokens.paddingCtrlTextSide})`;
const paddingHorizontalNoIcon = `calc(${semanticTokens.paddingCtrlHorizontalDefault} + ${semanticTokens.paddingCtrlTextSide})`;
const paddingLgHorizontalNoIcon = `calc(${semanticTokens.paddingCtrlLgHorizontalDefault} + ${semanticTokens.paddingCtrlTextSide})`;

/* Firefox has box shadow sizing issue at some zoom levels
 * this will ensure the inset boxShadow is always uniform
 * without affecting other browser platforms
 */
const boxShadowStrokeWidthThinMoz = `calc(${semanticTokens.ctrlFocusInnerStrokeWidth} + 0.25px)`;

const minButtonWidth = `max(${semanticTokens.sizeCtrlDefault}, 96px)`;
const minButtonSmWidth = `max(${semanticTokens.sizeCtrlSmDefault}, 64px)`;
const minButtonLgWidth = `max(${semanticTokens.sizeCtrlLgDefault}, 96px)`;

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
  border: `${semanticTokens.strokeWidthDefault} solid ${semanticTokens.strokeCtrlOnNeutralRest}`,

  fontFamily: semanticTokens.textStyleDefaultRegularFontFamily,
  outlineStyle: 'none',

  ':hover': {
    backgroundColor: semanticTokens.backgroundCtrlNeutralHover,
    borderColor: semanticTokens.strokeCtrlOnNeutralHover,
    color: semanticTokens.foregroundCtrlNeutralPrimaryHover,

    cursor: 'pointer',
  },

  ':hover:active': {
    backgroundColor: semanticTokens.backgroundCtrlNeutralPressed,
    borderColor: semanticTokens.strokeCtrlOnNeutralPressed,
    color: semanticTokens.foregroundCtrlNeutralPrimaryPressed,

    outlineStyle: 'none',
  },

  padding: `${semanticTokens.paddingCtrlTextTop} ${paddingHorizontalNoIcon} ${semanticTokens.paddingCtrlTextBottom} ${paddingHorizontalNoIcon}`,
  minWidth: minButtonWidth,
  borderRadius: semanticTokens.cornerCtrlRest,

  fontSize: semanticTokens.textRampItemBodyFontSize,
  fontWeight: semanticTokens.textCtrlButtonWeightDefault,
  lineHeight: semanticTokens.textRampItemBodyLineHeight,

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
    outline: `${semanticTokens.ctrlFocusOuterStrokeWidth} solid ${semanticTokens.ctrlFocusOuterStroke}`,
    boxShadow: `0 0 0 ${semanticTokens.ctrlFocusInnerStrokeWidth} ${semanticTokens.ctrlFocusInnerStroke}
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

  [iconSpacingVar]: `calc(${semanticTokens._ctrlButtonGapInsideDefault} + ${semanticTokens.paddingCtrlTextSide})`,
});

const useRootStyles = makeStyles({
  // Appearance variations
  outline: {
    backgroundColor: semanticTokens.backgroundCtrlOutlineRest,
    border: `${semanticTokens.strokeWidthCtrlOutlineRest} solid ${semanticTokens.strokeCtrlOnOutlineRest}`,
    color: semanticTokens.foregroundCtrlOnOutlineRest,
    ':hover': {
      backgroundColor: semanticTokens.backgroundCtrlOutlineHover,
      border: `${semanticTokens.strokeWidthCtrlOutlineHover} solid ${semanticTokens.strokeCtrlOnOutlineHover}`,
      color: semanticTokens.foregroundCtrlOnOutlineHover,
    },

    ':hover:active': {
      backgroundColor: semanticTokens.backgroundCtrlOutlinePressed,
      border: `${semanticTokens.strokeWidthCtrlOutlinePressed} solid ${semanticTokens.strokeCtrlOnOutlinePressed}`,
      color: semanticTokens.foregroundCtrlOnOutlinePressed,
    },
  },

  primary: {
    backgroundColor: semanticTokens.backgroundCtrlBrandRest,
    ...shorthands.borderColor(semanticTokens.strokeCtrlOnBrandRest),
    color: semanticTokens.foregroundCtrlOnBrandRest,

    ':hover': {
      backgroundColor: semanticTokens.backgroundCtrlBrandHover,
      ...shorthands.borderColor(semanticTokens.strokeCtrlOnBrandHover),
      color: semanticTokens.foregroundCtrlOnBrandHover,
    },

    ':hover:active': {
      backgroundColor: semanticTokens.backgroundCtrlBrandPressed,
      ...shorthands.borderColor(semanticTokens.strokeCtrlOnBrandPressed),
      color: semanticTokens.foregroundCtrlOnBrandPressed,
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
    ...shorthands.borderColor(semanticTokens.strokeCtrlOnSubtleRest),
    color: semanticTokens.foregroundCtrlOnSubtleRest,
    [`& .${buttonClassNames.icon}`]: {
      color: semanticTokens.foregroundCtrlIconOnSubtleRest,
    },

    ':hover': {
      backgroundColor: semanticTokens.backgroundCtrlSubtleHover,
      ...shorthands.borderColor(semanticTokens.strokeCtrlOnSubtleHover),
      color: semanticTokens.foregroundCtrlOnSubtleHover,
      [`& .${iconFilledClassName}`]: {
        display: 'inline',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
      [`& .${buttonClassNames.icon}`]: {
        color: semanticTokens.foregroundCtrlIconOnSubtleHover,
      },
    },

    ':hover:active': {
      backgroundColor: semanticTokens.backgroundCtrlSubtlePressed,
      ...shorthands.borderColor(semanticTokens.strokeCtrlOnSubtlePressed),
      color: semanticTokens.foregroundCtrlOnSubtlePressed,
      [`& .${iconFilledClassName}`]: {
        display: 'inline',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
      [`& .${buttonClassNames.icon}`]: {
        color: semanticTokens.foregroundCtrlIconOnSubtlePressed,
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
    color: semanticTokens.foregroundCtrlOnTransparentRest,

    ':hover': {
      backgroundColor: tokens.colorTransparentBackgroundHover,
      ...shorthands.borderColor('transparent'),
      color: semanticTokens.foregroundCtrlOnTransparentHover,
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
      color: semanticTokens.foregroundCtrlOnTransparentPressed,
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
    minWidth: minButtonSmWidth,
    padding: `${buttonSpacingSmall} ${paddingSmHorizontalNoIcon}`,
    borderRadius: semanticTokens.cornerCtrlSmRest,

    fontSize: semanticTokens.textRampSmItemBodyFontSize,
    fontWeight: semanticTokens.textCtrlButtonWeightDefault,
    lineHeight: semanticTokens.textRampSmItemBodyLineHeight,
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
    minWidth: minButtonLgWidth,
    padding: `${buttonSpacingLarge} ${paddingLgHorizontalNoIcon}`,
    borderRadius: semanticTokens.cornerCtrlLgRest,

    fontSize: semanticTokens.textRampLgItemBodyFontSize,
    fontWeight: semanticTokens.textCtrlButtonWeightDefault,
    lineHeight: semanticTokens.textRampLgItemBodyLineHeight,
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
    ...shorthands.borderColor(semanticTokens.strokeCtrlOnNeutralDisabled),
    color: semanticTokens.foregroundCtrlNeutralPrimaryDisabled,
    cursor: 'not-allowed',
    [`& .${buttonClassNames.icon}`]: {
      color: semanticTokens.foregroundCtrlIconOnNeutralDisabled,
    },

    ':hover': {
      backgroundColor: semanticTokens.backgroundCtrlNeutralDisabled,
      ...shorthands.borderColor(semanticTokens.strokeCtrlOnNeutralDisabled),
      color: semanticTokens.foregroundCtrlNeutralPrimaryDisabled,

      cursor: 'not-allowed',

      [`& .${iconFilledClassName}`]: {
        display: 'none',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'inline',
      },
      [`& .${buttonClassNames.icon}`]: {
        color: semanticTokens.foregroundCtrlIconOnNeutralDisabled,
      },
    },

    ':hover:active': {
      backgroundColor: semanticTokens.backgroundCtrlNeutralDisabled,
      ...shorthands.borderColor(semanticTokens.strokeCtrlOnNeutralDisabled),
      color: semanticTokens.foregroundCtrlNeutralPrimaryDisabled,

      cursor: 'not-allowed',

      [`& .${iconFilledClassName}`]: {
        display: 'none',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'inline',
      },
      [`& .${buttonClassNames.icon}`]: {
        color: semanticTokens.foregroundCtrlIconOnNeutralDisabled,
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
    color: semanticTokens.foregroundCtrlOnOutlineDisabled,
    ...shorthands.borderColor(semanticTokens.strokeCtrlOnOutlineDisabled),

    ':hover': {
      backgroundColor: tokens.colorTransparentBackground,
    },

    ':hover:active': {
      backgroundColor: tokens.colorTransparentBackground,
    },
  },
  primary: {
    ...shorthands.borderColor(semanticTokens.strokeCtrlOnBrandDisabled),

    ':hover': {
      ...shorthands.borderColor(semanticTokens.strokeCtrlOnBrandDisabled),
    },

    ':hover:active': {
      ...shorthands.borderColor(semanticTokens.strokeCtrlOnBrandDisabled),
    },
  },
  secondary: {
    color: semanticTokens.foregroundCtrlNeutralSecondaryDisabled,
  },
  subtle: {
    backgroundColor: semanticTokens.backgroundCtrlSubtleDisabled,
    color: semanticTokens.foregroundCtrlOnSubtleDisabled,
    ...shorthands.borderColor(semanticTokens.strokeCtrlOnSubtleDisabled),

    [`& .${buttonClassNames.icon}`]: {
      color: semanticTokens.foregroundCtrlIconOnSubtleDisabled,
    },
    ':hover': {
      backgroundColor: semanticTokens.backgroundCtrlSubtleDisabled,
      ...shorthands.borderColor(semanticTokens.strokeCtrlOnSubtleDisabled),
    },

    ':hover:active': {
      backgroundColor: semanticTokens.backgroundCtrlSubtleDisabled,
      ...shorthands.borderColor(semanticTokens.strokeCtrlOnSubtleDisabled),
    },
  },
  transparent: {
    [`& .${buttonClassNames.icon}`]: {
      color: semanticTokens.foregroundCtrlOnTransparentDisabled,
    },
    color: semanticTokens.foregroundCtrlOnTransparentDisabled,
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
      boxShadow: `${tokens.shadow2}, 0 0 0 ${semanticTokens.ctrlFocusInnerStrokeWidth} ${semanticTokens.ctrlFocusInnerStroke} inset,  0 0 0 ${semanticTokens.ctrlFocusOuterStrokeWidth} ${semanticTokens.strokeCtrlOnActiveBrandRest} inset`,
      ':hover': {
        boxShadow: `${tokens.shadow2}, 0 0 0 ${semanticTokens.ctrlFocusInnerStrokeWidth} ${semanticTokens.ctrlFocusInnerStroke} inset`,
        ...shorthands.borderColor(semanticTokens.strokeCtrlOnActiveBrandHover),
      },
    }),

    // BUGFIX: Mozilla specific styles (Mozilla BugID: 1857642)
    '@supports (-moz-appearance:button)': {
      ...createCustomFocusIndicatorStyle({
        // TODO: Replace shadow2 with semantic shadow
        boxShadow: `${tokens.shadow2}, 0 0 0 ${boxShadowStrokeWidthThinMoz} ${semanticTokens.ctrlFocusInnerStroke} inset,  0 0 0 ${semanticTokens.ctrlFocusOuterStrokeWidth} ${semanticTokens.strokeCtrlOnActiveBrandRest} inset`,
        ':hover': {
          boxShadow: `${tokens.shadow2}, 0 0 0 ${boxShadowStrokeWidthThinMoz} ${semanticTokens.strokeCtrlOnActiveBrandHover} inset`,
        },
      }),
    },
  },
  // Size variations
  small: createCustomFocusIndicatorStyle({
    borderRadius: `calc(${semanticTokens.cornerCtrlSmRest} - ${semanticTokens.ctrlFocusOuterStrokeWidth})`,
  }),
  medium: {
    /* defined in base styles */
  },
  large: createCustomFocusIndicatorStyle({
    borderRadius: `calc(${semanticTokens.cornerCtrlLgRest} + ${semanticTokens.ctrlFocusOuterStrokeWidth})`,
  }),
});

const useRootIconOnlyStyles = makeStyles({
  // Size variations
  small: {
    padding: `${buttonSpacingSmallWithIcon} ${semanticTokens.paddingCtrlSmHorizontalIconOnly}`,
    minWidth: '24px',
    maxWidth: '24px',
  },
  medium: {
    padding: `${buttonSpacingMedium} ${semanticTokens.paddingCtrlHorizontalIconOnly}`,
    minWidth: '32px',
    maxWidth: '32px',
  },
  large: {
    padding: `${buttonSpacingLargeWithIcon} ${semanticTokens.paddingCtrlLgHorizontalIconOnly}`,

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

    [iconSpacingVar]: `calc(${semanticTokens.gapInsideCtrlSmDefault} + ${semanticTokens.paddingCtrlTextSide})`,
  },
  medium: {
    /* defined in base styles */
  },
  large: {
    fontSize: semanticTokens.sizeCtrlLgIcon,
    height: semanticTokens.sizeCtrlLgIcon,
    width: semanticTokens.sizeCtrlLgIcon,

    [iconSpacingVar]: `calc(${semanticTokens.gapInsideCtrlLgDefault} + ${semanticTokens.paddingCtrlTextSide})`,
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
