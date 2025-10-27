'use client';

import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import { shorthands, makeStyles, makeResetStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import * as semanticTokens from '@fluentui/semantic-tokens';
import type { ButtonSlots, ButtonState } from './Button.types';

export const buttonClassNames: SlotClassNames<ButtonSlots> = {
  root: 'fui-Button',
  icon: 'fui-Button__icon',
};

const iconSpacingVar = '--fui-Button__icon--spacing';

const buttonSpacingTopSmallWithIcon = `max(1px, calc(${semanticTokens.groupButtonSmallPaddingTop} - 2px))`;
const buttonSpacingBottomSmallWithIcon = `max(1px, calc(${semanticTokens.groupButtonSmallPaddingBottom} - 2px))`;
const buttonSpacingLargeBottomWithIcon = `max(0px, calc(${semanticTokens.groupButtonLargePaddingBottom} - 1px))`;
const buttonSpacingLargeTopWithIcon = `max(0px, calc(${semanticTokens.groupButtonLargePaddingTop} - 1px))`;

const paddingSmHorizontalNoIcon = `calc(${semanticTokens.groupButtonSmallPaddingHorizontal} + ${semanticTokens.groupButtonMediumTextPaddingHorizontal})`;
const paddingHorizontalNoIcon = `calc(${semanticTokens.groupButtonMediumPaddingHorizontal} + ${semanticTokens.groupButtonMediumTextPaddingHorizontal})`;
const paddingLgHorizontalNoIcon = `calc(${semanticTokens.groupButtonLargePaddingHorizontal} + ${semanticTokens.groupButtonMediumTextPaddingHorizontal})`;

/* Firefox has box shadow sizing issue at some zoom levels
 * this will ensure the inset boxShadow is always uniform
 * without affecting other browser platforms
 */
const boxShadowStrokeWidthThinMoz = `calc(${semanticTokens.groupFocusInnerStrokewidth} + 0.25px)`;

const useRootBaseClassName = makeResetStyles({
  alignItems: 'center',
  boxSizing: 'border-box',
  display: 'inline-flex',
  justifyContent: 'center',
  textDecorationLine: 'none',
  verticalAlign: 'middle',

  margin: 0,
  overflow: 'hidden',

  backgroundColor: semanticTokens.groupButtonNeutralBackground,
  color: semanticTokens.groupButtonNeutralTextForeground,
  border: `${semanticTokens.groupButtonStrokewidth} solid ${semanticTokens.groupButtonNeutralStroke}`,
  borderRadius: semanticTokens.groupButtonMediumCorner,

  fontFamily: semanticTokens.groupButtonTextFontfamily,
  outlineStyle: 'none',

  [`& .${buttonClassNames.icon}`]: {
    color: semanticTokens.groupButtonNeutralIconForeground,
  },

  ':hover': {
    backgroundColor: semanticTokens.groupButtonNeutralBackgroundHover,
    borderColor: semanticTokens.groupButtonNeutralStrokeHover,
    color: semanticTokens.groupButtonNeutralTextForegroundHover,
    cursor: 'pointer',
    borderRadius: semanticTokens.groupButtonMediumCornerHover,
    [`& .${buttonClassNames.icon}`]: {
      color: semanticTokens.groupButtonNeutralIconForegroundHover,
    },
  },

  ':hover:active': {
    backgroundColor: semanticTokens.groupButtonNeutralBackgroundPressed,
    borderColor: semanticTokens.groupButtonNeutralStrokePressed,
    color: semanticTokens.groupButtonNeutralTextForegroundPressed,
    borderRadius: semanticTokens.groupButtonMediumCornerPressed,
    outlineStyle: 'none',
    [`& .${buttonClassNames.icon}`]: {
      color: semanticTokens.groupButtonNeutralIconForegroundPressed,
    },
  },

  padding: `${semanticTokens.groupButtonMediumPaddingTop} ${paddingHorizontalNoIcon} ${semanticTokens.groupButtonMediumPaddingBottom} ${paddingHorizontalNoIcon}`,
  minWidth: semanticTokens.groupButtonMediumMinwidth,
  minHeight: semanticTokens.groupButtonMediumMinheight,

  fontSize: semanticTokens.groupButtonMediumTextFontsize,
  fontWeight: semanticTokens.groupButtonMediumTextFontweight,
  lineHeight: semanticTokens.groupButtonMediumTextLineheight,

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
    borderColor: semanticTokens.groupFocusInnerStroke,
    borderRadius: semanticTokens.groupButtonMediumCorner,
    borderWidth: '1px',
    outline: `${semanticTokens.groupFocusOuterStrokewidth} solid ${semanticTokens.groupFocusOuterStroke}`,
    boxShadow: `0 0 0 ${semanticTokens.groupFocusInnerStrokewidth} ${semanticTokens.groupFocusInnerStroke}
      inset
    `,
    zIndex: 1,
  }),

  // BUGFIX: Mozilla specific styles (Mozilla BugID: 1857642)
  '@supports (-moz-appearance:button)': {
    ...createCustomFocusIndicatorStyle({
      boxShadow: `0 0 0 ${boxShadowStrokeWidthThinMoz} ${semanticTokens.groupFocusInnerStroke}
      inset
    `,
    }),
  },
});

const useIconBaseClassName = makeResetStyles({
  alignItems: 'center',
  display: 'inline-flex',
  justifyContent: 'center',

  fontSize: semanticTokens.groupButtonMediumIconSize,
  height: semanticTokens.groupButtonMediumIconSize,
  width: semanticTokens.groupButtonMediumIconSize,

  [iconSpacingVar]: `calc(${semanticTokens.groupButtonMediumGap} + ${semanticTokens.groupButtonMediumTextPaddingHorizontal})`,
});

const useRootStyles = makeStyles({
  // Appearance variations
  outline: {
    backgroundColor: semanticTokens.groupButtonOutlineBackground,
    border: `${semanticTokens.groupButtonStrokewidth} solid ${semanticTokens.groupButtonOutlineStroke}`,
    color: semanticTokens.groupButtonOutlineTextForeground,

    [`& .${buttonClassNames.icon}`]: {
      color: semanticTokens.groupButtonOutlineIconForeground,
    },

    ':hover': {
      backgroundColor: semanticTokens.groupButtonOutlineBackgroundHover,
      border: `${semanticTokens.groupButtonStrokewidth} solid ${semanticTokens.groupButtonOutlineStrokeHover}`,
      color: semanticTokens.groupButtonOutlineTextForegroundHover,
      [`& .${buttonClassNames.icon}`]: {
        color: semanticTokens.groupButtonOutlineIconForegroundHover,
      },
    },

    ':hover:active': {
      backgroundColor: semanticTokens.groupButtonOutlineBackgroundPressed,
      border: `${semanticTokens.groupButtonStrokewidth} solid ${semanticTokens.groupButtonOutlineStrokePressed}`,
      color: semanticTokens.groupButtonOutlineTextForegroundPressed,
      [`& .${buttonClassNames.icon}`]: {
        color: semanticTokens.groupButtonOutlineIconForegroundPressed,
      },
    },
  },

  primary: {
    backgroundColor: semanticTokens.groupButtonPrimaryBackground,
    ...shorthands.borderColor(semanticTokens.groupButtonPrimaryStroke),
    color: semanticTokens.groupButtonPrimaryTextForeground,
    boxShadow: semanticTokens.groupButtonPrimaryShadow,

    [`& .${buttonClassNames.icon}`]: {
      color: semanticTokens.groupButtonPrimaryIconForegroundPressed,
    },

    ':hover': {
      backgroundColor: semanticTokens.groupButtonPrimaryBackgroundHover,
      ...shorthands.borderColor(semanticTokens.groupButtonPrimaryStrokeHover),
      color: semanticTokens.groupButtonPrimaryTextForegroundHover,
      [`& .${buttonClassNames.icon}`]: {
        color: semanticTokens.groupButtonPrimaryIconForegroundHover,
      },
    },

    ':hover:active': {
      backgroundColor: semanticTokens.groupButtonPrimaryBackgroundPressed,
      ...shorthands.borderColor(semanticTokens.groupButtonPrimaryStrokePressed),
      color: semanticTokens.groupButtonPrimaryTextForegroundPressed,
      [`& .${buttonClassNames.icon}`]: {
        color: semanticTokens.groupButtonPrimaryIconForegroundPressed,
      },
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
    boxShadow: semanticTokens.groupButtonNeutralShadow,
    /* Other than shadow, the secondary styles are exactly the same as the base styles. */
  },
  subtle: {
    backgroundColor: semanticTokens.groupButtonSubtleBackground,
    ...shorthands.borderColor(semanticTokens.groupButtonSubtleStroke),
    color: semanticTokens.groupButtonSubtleTextForeground,

    [`& .${buttonClassNames.icon}`]: {
      color: semanticTokens.groupButtonSubtleIconForeground,
    },

    ':hover': {
      backgroundColor: semanticTokens.groupButtonSubtleBackgroundHover,
      ...shorthands.borderColor(semanticTokens.groupButtonSubtleStrokeHover),
      color: semanticTokens.groupButtonSubtleTextForegroundHover,
      [`& .${iconFilledClassName}`]: {
        display: 'inline',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
      [`& .${buttonClassNames.icon}`]: {
        color: semanticTokens.groupButtonSubtleIconForegroundHover,
      },
    },

    ':hover:active': {
      backgroundColor: semanticTokens.groupButtonSubtleBackgroundPressed,
      ...shorthands.borderColor(semanticTokens.groupButtonSubtleStrokePressed),
      color: semanticTokens.groupButtonSubtleTextForegroundPressed,
      [`& .${iconFilledClassName}`]: {
        display: 'inline',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
      [`& .${buttonClassNames.icon}`]: {
        color: semanticTokens.groupButtonSubtleIconForegroundPressed,
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
    backgroundColor: semanticTokens.groupButtonTransparentBackground,
    ...shorthands.borderColor(semanticTokens.groupButtonTransparentStroke),
    color: semanticTokens.groupButtonTransparentTextForeground,

    [`& .${buttonClassNames.icon}`]: {
      color: semanticTokens.groupButtonTransparentIconForeground,
    },

    ':hover': {
      backgroundColor: semanticTokens.groupButtonTransparentBackgroundHover,
      ...shorthands.borderColor(semanticTokens.groupButtonTransparentStrokeHover),
      color: semanticTokens.groupButtonTransparentTextForegroundHover,
      [`& .${iconFilledClassName}`]: {
        display: 'inline',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
      [`& .${buttonClassNames.icon}`]: {
        color: semanticTokens.groupButtonTransparentIconForegroundHover,
      },
    },

    ':hover:active': {
      backgroundColor: semanticTokens.groupButtonTransparentBackgroundPressed,
      ...shorthands.borderColor(semanticTokens.groupButtonTransparentStrokePressed),
      color: semanticTokens.groupButtonTransparentTextForegroundPressed,
      [`& .${iconFilledClassName}`]: {
        display: 'inline',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },

      [`& .${buttonClassNames.icon}`]: {
        color: semanticTokens.groupButtonTransparentIconForegroundPressed,
      },
    },

    '@media (forced-colors: active)': {
      ':hover': {
        backgroundColor: semanticTokens.groupButtonTransparentBackground,
        color: 'Highlight',
      },
      ':hover:active': {
        backgroundColor: semanticTokens.groupButtonTransparentBackground,
        color: 'Highlight',
      },
    },
  },

  // Shape variations
  circular: {
    borderRadius: semanticTokens.cornerCircular,
    ':hover': { borderRadius: semanticTokens.cornerCircular },
    ':hover:active': { borderRadius: semanticTokens.cornerCircular },
  },
  rounded: {
    /* The borderRadius rounded styles are handled in the size variations */
  },
  square: {
    borderRadius: semanticTokens.cornerSquare,
    ':hover': { borderRadius: semanticTokens.cornerSquare },
    ':hover:active': { borderRadius: semanticTokens.cornerSquare },
  },

  // Size variations
  small: {
    minWidth: semanticTokens.groupButtonSmallMinwidth,
    minHeight: semanticTokens.groupButtonSmallMinheight,
    padding: `${semanticTokens.groupButtonSmallPaddingTop} ${paddingSmHorizontalNoIcon} ${semanticTokens.groupButtonSmallPaddingBottom} ${paddingSmHorizontalNoIcon}`, //3px
    borderRadius: semanticTokens.groupButtonSmallCorner,
    ':hover': {
      borderRadius: semanticTokens.groupButtonSmallCornerHover,
    },
    ':hover:active': {
      borderRadius: semanticTokens.groupButtonSmallCornerPressed,
    },

    fontSize: semanticTokens.groupButtonSmallTextFontsize,
    fontWeight: semanticTokens.groupButtonSmallTextFontweight,
    lineHeight: semanticTokens.groupButtonSmallTextLineheight,
  },
  smallWithIcon: {
    paddingBottom: buttonSpacingBottomSmallWithIcon,
    paddingTop: buttonSpacingTopSmallWithIcon,
  },
  smallWithIconBefore: {
    paddingRight: paddingSmHorizontalNoIcon,
    paddingLeft: semanticTokens.groupButtonSmallPaddingHorizontal,
  },
  smallWithIconAfter: {
    paddingRight: semanticTokens.groupButtonSmallPaddingHorizontal,
    paddingLeft: paddingSmHorizontalNoIcon,
  },
  medium: {
    /* defined in base styles */
  },
  mediumWithIconBefore: {
    paddingRight: paddingHorizontalNoIcon,
    paddingLeft: semanticTokens.groupButtonMediumPaddingHorizontal,
  },
  mediumWithIconAfter: {
    paddingRight: semanticTokens.groupButtonMediumPaddingHorizontal,
    paddingLeft: paddingHorizontalNoIcon,
  },
  large: {
    minWidth: semanticTokens.groupButtonLargeMinwidth,
    minHeight: semanticTokens.groupButtonLargeMinheight,
    padding: `${semanticTokens.groupButtonLargePaddingTop} ${paddingLgHorizontalNoIcon} ${semanticTokens.groupButtonLargePaddingBottom} ${paddingLgHorizontalNoIcon}`,
    borderRadius: semanticTokens.groupButtonLargeCorner,
    ':hover': {
      borderRadius: semanticTokens.groupButtonLargeCornerHover,
    },
    ':hover:active': {
      borderRadius: semanticTokens.groupButtonLargeCornerPressed,
    },

    fontSize: semanticTokens.groupButtonLargeTextFontsize,
    fontWeight: semanticTokens.groupButtonLargeTextFontweight,
    lineHeight: semanticTokens.groupButtonLargeTextLineheight,
  },
  largeWithIcon: {
    paddingBottom: buttonSpacingLargeBottomWithIcon,
    paddingTop: buttonSpacingLargeTopWithIcon,
  },
  largeWithIconBefore: {
    paddingRight: paddingLgHorizontalNoIcon,
    paddingLeft: semanticTokens.groupButtonLargePaddingHorizontal,
  },
  largeWithIconAfter: {
    paddingRight: semanticTokens.groupButtonLargePaddingHorizontal,
    paddingLeft: paddingLgHorizontalNoIcon,
  },
});

const useRootDisabledStyles = makeStyles({
  // Base styles
  base: {
    backgroundColor: semanticTokens.groupButtonNeutralBackgroundDisabled,
    ...shorthands.borderColor(semanticTokens.groupButtonNeutralStrokeDisabled),
    color: semanticTokens.groupButtonNeutralTextForegroundDisabled,
    borderRadius: semanticTokens.groupButtonMediumCornerDisabled,
    cursor: 'not-allowed',
    [`& .${buttonClassNames.icon}`]: {
      color: semanticTokens.groupButtonNeutralIconForegroundDisabled,
    },

    ':hover': {
      backgroundColor: semanticTokens.groupButtonNeutralBackgroundDisabled,
      ...shorthands.borderColor(semanticTokens.groupButtonNeutralStrokeDisabled),
      color: semanticTokens.groupButtonNeutralTextForegroundDisabled,
      borderRadius: semanticTokens.groupButtonMediumCornerDisabled,

      cursor: 'not-allowed',

      [`& .${iconFilledClassName}`]: {
        display: 'none',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'inline',
      },
      [`& .${buttonClassNames.icon}`]: {
        color: semanticTokens.groupButtonNeutralIconForegroundDisabled,
      },
    },

    ':hover:active': {
      backgroundColor: semanticTokens.groupButtonNeutralBackgroundDisabled,
      ...shorthands.borderColor(semanticTokens.groupButtonNeutralStrokeDisabled),
      color: semanticTokens.groupButtonNeutralTextForegroundDisabled,
      borderRadius: semanticTokens.groupButtonMediumCornerDisabled,

      cursor: 'not-allowed',

      [`& .${iconFilledClassName}`]: {
        display: 'none',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'inline',
      },
      [`& .${buttonClassNames.icon}`]: {
        color: semanticTokens.groupButtonNeutralIconForegroundDisabled,
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
    backgroundColor: semanticTokens.groupButtonOutlineBackgroundDisabled,
    color: semanticTokens.groupButtonOutlineTextForegroundDisabled,
    ...shorthands.borderColor(semanticTokens.groupButtonOutlineStrokeDisabled),

    [`& .${buttonClassNames.icon}`]: {
      color: semanticTokens.groupButtonOutlineIconForegroundDisabled,
    },
    ':hover': {
      backgroundColor: semanticTokens.groupButtonOutlineBackgroundDisabled,
      ...shorthands.borderWidth(semanticTokens.groupButtonOutlineStrokewidthHover),
      [`& .${buttonClassNames.icon}`]: {
        color: semanticTokens.groupButtonOutlineIconForegroundDisabled,
      },
    },

    ':hover:active': {
      backgroundColor: semanticTokens.groupButtonOutlineBackgroundDisabled,
      ...shorthands.borderWidth(semanticTokens.groupButtonOutlineStrokewidthPressed),
      [`& .${buttonClassNames.icon}`]: {
        color: semanticTokens.groupButtonOutlineIconForegroundDisabled,
      },
    },
  },
  primary: {
    backgroundColor: semanticTokens.groupButtonPrimaryBackgroundDisabled,
    color: semanticTokens.groupButtonPrimaryTextForegroundDisabled,
    boxShadow: semanticTokens.groupButtonPrimaryShadowDisabled,
    ...shorthands.borderColor(semanticTokens.groupButtonPrimaryStrokeDisabled),
    [`& .${buttonClassNames.icon}`]: {
      color: semanticTokens.groupButtonPrimaryIconForegroundDisabled,
    },

    ':hover': {
      ...shorthands.borderColor(semanticTokens.groupButtonPrimaryStrokeDisabled),
    },

    ':hover:active': {
      ...shorthands.borderColor(semanticTokens.groupButtonPrimaryStrokeDisabled),
    },
  },
  secondary: {
    color: semanticTokens.groupButtonNeutralTextForegroundDisabled,
    boxShadow: semanticTokens.groupButtonNeutralShadowDisabled,
    [`& .${buttonClassNames.icon}`]: {
      color: semanticTokens.groupButtonNeutralIconForegroundDisabled,
    },
  },
  subtle: {
    backgroundColor: semanticTokens.groupButtonSubtleBackgroundDisabled,
    color: semanticTokens.groupButtonSubtleTextForegroundDisabled,
    ...shorthands.borderColor(semanticTokens.groupButtonSubtleStrokeDisabled),

    [`& .${buttonClassNames.icon}`]: {
      color: semanticTokens.groupButtonSubtleIconForegroundDisabled,
    },
    ':hover': {
      backgroundColor: semanticTokens.groupButtonSubtleBackgroundDisabled,
      ...shorthands.borderColor(semanticTokens.groupButtonSubtleStrokeDisabled),
    },

    ':hover:active': {
      backgroundColor: semanticTokens.groupButtonSubtleBackgroundDisabled,
      ...shorthands.borderColor(semanticTokens.groupButtonSubtleStrokeDisabled),
    },
  },
  transparent: {
    [`& .${buttonClassNames.icon}`]: {
      color: semanticTokens.groupButtonTransparentIconForegroundDisabled,
    },
    color: semanticTokens.groupButtonTransparentTextForegroundDisabled,
    backgroundColor: semanticTokens.groupButtonTransparentBackgroundDisabled,
    ...shorthands.borderColor(semanticTokens.groupButtonTransparentStrokeDisabled),

    ':hover': {
      backgroundColor: semanticTokens.groupButtonTransparentBackgroundDisabled,
      ...shorthands.borderColor(semanticTokens.groupButtonTransparentStrokeDisabled),
    },

    ':hover:active': {
      backgroundColor: semanticTokens.groupButtonTransparentBackgroundDisabled,
      ...shorthands.borderColor(semanticTokens.groupButtonTransparentStrokeDisabled),
    },
  },
  small: {
    borderRadius: semanticTokens.groupButtonSmallCornerDisabled,
    ':hover': {
      borderRadius: semanticTokens.groupButtonSmallCornerDisabled,
    },
    ':hover:active': {
      borderRadius: semanticTokens.groupButtonSmallCornerDisabled,
    },
  },
  medium: {
    // Defined in base styles
  },
  large: {
    borderRadius: semanticTokens.groupButtonLargeCornerDisabled,
    ':hover': {
      borderRadius: semanticTokens.groupButtonLargeCornerDisabled,
    },
    ':hover:active': {
      borderRadius: semanticTokens.groupButtonLargeCornerDisabled,
    },
  },
});

const useRootFocusStyles = makeStyles({
  // Shape variations
  circular: createCustomFocusIndicatorStyle({ borderRadius: semanticTokens.cornerCircular }),
  rounded: {
    /* The rounded styles are exactly the same as the base styles. */
  },
  square: createCustomFocusIndicatorStyle({ borderRadius: semanticTokens.cornerSquare }),
  // Primary styles
  primary: {
    ...createCustomFocusIndicatorStyle({
      ...shorthands.borderColor(semanticTokens.groupFocusInnerStroke),
      boxShadow: `${semanticTokens.groupButtonPrimaryShadow}, ${tokens.shadow2}, 0 0 0 ${semanticTokens.groupFocusInnerStrokewidth} ${semanticTokens.groupFocusInnerStroke} inset,  0 0 0 ${semanticTokens.groupFocusOuterStrokewidth} ${semanticTokens.groupFocusOnbrandStroke} inset`,
      ':hover': {
        boxShadow: `${semanticTokens.groupButtonPrimaryShadow}, ${tokens.shadow2}, 0 0 0 ${semanticTokens.groupFocusOuterStrokewidth} ${semanticTokens.groupFocusInnerStroke} inset`,
        ...shorthands.borderColor(semanticTokens.groupFocusOnbrandStrokeHover),
      },
    }),

    // BUGFIX: Mozilla specific styles (Mozilla BugID: 1857642)
    '@supports (-moz-appearance:button)': {
      ...createCustomFocusIndicatorStyle({
        // TODO: Replace shadow2 with semantic shadow
        boxShadow: `${semanticTokens.groupButtonPrimaryShadow}, ${tokens.shadow2}, 0 0 0 ${boxShadowStrokeWidthThinMoz} ${semanticTokens.groupFocusInnerStroke} inset,  0 0 0 ${semanticTokens.groupFocusOuterStrokewidth} ${semanticTokens.groupFocusOnbrandStroke} inset`,
        ':hover': {
          boxShadow: `${semanticTokens.groupButtonPrimaryShadow}, ${tokens.shadow2}, 0 0 0 ${boxShadowStrokeWidthThinMoz} ${semanticTokens.groupFocusOnbrandStrokeHover} inset`,
        },
      }),
    },
  },
  primaryDisabled: {
    ...createCustomFocusIndicatorStyle({
      ...shorthands.borderColor(semanticTokens.groupFocusInnerStroke),
      boxShadow: `${semanticTokens.groupButtonPrimaryShadowDisabled}, ${tokens.shadow2}, 0 0 0 ${semanticTokens.groupFocusInnerStrokewidth} ${semanticTokens.groupFocusInnerStroke} inset,  0 0 0 ${semanticTokens.groupFocusOuterStrokewidth} ${semanticTokens.groupFocusOnbrandStroke} inset`,
      ':hover': {
        boxShadow: `${semanticTokens.groupButtonPrimaryShadowDisabled}, ${tokens.shadow2}, 0 0 0 ${semanticTokens.groupFocusOuterStrokewidth} ${semanticTokens.groupFocusInnerStroke} inset`,
        ...shorthands.borderColor(semanticTokens.groupFocusOnbrandStrokeHover),
      },
    }),

    // BUGFIX: Mozilla specific styles (Mozilla BugID: 1857642)
    '@supports (-moz-appearance:button)': {
      ...createCustomFocusIndicatorStyle({
        // TODO: Replace shadow2 with semantic shadow
        boxShadow: `${semanticTokens.groupButtonPrimaryShadowDisabled}, ${tokens.shadow2}, 0 0 0 ${boxShadowStrokeWidthThinMoz} ${semanticTokens.groupFocusInnerStroke} inset,  0 0 0 ${semanticTokens.groupFocusOuterStrokewidth} ${semanticTokens.groupFocusOnbrandStroke} inset`,
        ':hover': {
          boxShadow: `${semanticTokens.groupButtonPrimaryShadowDisabled}, ${tokens.shadow2}, 0 0 0 ${boxShadowStrokeWidthThinMoz} ${semanticTokens.groupFocusOnbrandStrokeHover} inset`,
        },
      }),
    },
  },
  secondary: {
    ...createCustomFocusIndicatorStyle({
      ...shorthands.borderColor(semanticTokens.groupFocusInnerStroke),
      borderRadius: semanticTokens.groupButtonMediumCorner,
      ...shorthands.borderWidth('1px'),
      outline: `${semanticTokens.groupFocusOuterStrokewidth} solid ${semanticTokens.groupFocusOuterStroke}`,
      boxShadow: `${semanticTokens.groupButtonNeutralShadow}, 0 0 0 ${semanticTokens.groupFocusInnerStrokewidth} ${semanticTokens.groupFocusInnerStroke}
      inset
    `,
      zIndex: 1,
    }),

    // BUGFIX: Mozilla specific styles (Mozilla BugID: 1857642)
    '@supports (-moz-appearance:button)': {
      ...createCustomFocusIndicatorStyle({
        boxShadow: `${semanticTokens.groupButtonNeutralShadow}, 0 0 0 ${boxShadowStrokeWidthThinMoz} ${semanticTokens.groupFocusInnerStroke}
      inset
    `,
      }),
    },
  },
  secondaryDisabled: {
    ...createCustomFocusIndicatorStyle({
      ...shorthands.borderColor(semanticTokens.groupFocusInnerStroke),
      borderRadius: semanticTokens.groupButtonMediumCorner,
      ...shorthands.borderWidth('1px'),
      outline: `${semanticTokens.groupFocusOuterStrokewidth} solid ${semanticTokens.groupFocusOuterStroke}`,
      boxShadow: `${semanticTokens.groupButtonNeutralShadowDisabled}, 0 0 0 ${semanticTokens.groupFocusInnerStrokewidth} ${semanticTokens.groupFocusInnerStroke}
      inset
    `,
      zIndex: 1,
    }),

    // BUGFIX: Mozilla specific styles (Mozilla BugID: 1857642)
    '@supports (-moz-appearance:button)': {
      ...createCustomFocusIndicatorStyle({
        boxShadow: `${semanticTokens.groupButtonNeutralShadowDisabled}, 0 0 0 ${boxShadowStrokeWidthThinMoz} ${semanticTokens.groupFocusInnerStroke}
      inset
    `,
      }),
    },
  },
  // Size variations
  small: createCustomFocusIndicatorStyle({
    borderRadius: `calc(${semanticTokens.groupButtonSmallCorner} - ${semanticTokens.groupFocusOuterStrokewidth})`,
  }),
  medium: {
    /* defined in base styles */
  },
  large: createCustomFocusIndicatorStyle({
    borderRadius: `calc(${semanticTokens.groupButtonLargeCorner} + ${semanticTokens.groupFocusOuterStrokewidth})`,
  }),
});

const useRootIconOnlyStyles = makeStyles({
  // Size variations
  small: {
    padding: `${semanticTokens.groupButtonSmallIcononlyPadding}`,
    minWidth: '24px',
    maxWidth: 'unset',
  },
  medium: {
    padding: `${semanticTokens.groupButtonMediumIcononlyPadding}`,
    minWidth: '32px',
    maxWidth: 'unset',
  },
  large: {
    padding: `${semanticTokens.groupButtonLargeIcononlyPadding}`,
    minWidth: '40px',
    maxWidth: 'unset',
  },
});

const useIconStyles = makeStyles({
  // Size variations
  small: {
    fontSize: semanticTokens.groupButtonSmallIconSize,
    height: semanticTokens.groupButtonSmallIconSize,
    width: semanticTokens.groupButtonSmallIconSize,

    [iconSpacingVar]: `calc(${semanticTokens.groupButtonSmallGap} + ${semanticTokens.groupButtonSmallTextPaddingHorizontal})`,
  },
  medium: {
    /* defined in base styles */
  },
  large: {
    fontSize: semanticTokens.groupButtonLargeIconSize,
    height: semanticTokens.groupButtonLargeIconSize,
    width: semanticTokens.groupButtonLargeIconSize,
    //spacingHorizontalSNudge
    [iconSpacingVar]: `calc(${semanticTokens.groupButtonLargeGap} + ${semanticTokens.groupButtonLargeTextPaddingHorizontal})`,
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
    (disabled || disabledFocusable) && rootDisabledStyles[size],
    (disabled || disabledFocusable) && rootDisabledStyles.highContrast,
    appearance && (disabled || disabledFocusable) && rootDisabledStyles[appearance],

    // Focus styles
    appearance === 'primary' && rootFocusStyles.primary,
    appearance === 'secondary' && rootFocusStyles.secondary,
    (disabled || disabledFocusable) && appearance === 'primary' && rootFocusStyles.primaryDisabled,
    (disabled || disabledFocusable) && appearance === 'secondary' && rootFocusStyles.secondaryDisabled,
    rootFocusStyles[size],
    rootFocusStyles[shape],

    // Icon-only styles
    iconOnly && rootIconOnlyStyles[size],

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
