'use client';

import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import { shorthands, makeStyles, makeResetStyles, mergeClasses } from '@griffel/react';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { buttonClassNames, type ButtonState } from '@fluentui/react-button';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

const iconSpacingVar = '--fui-Button__icon--spacing';

/* ALGO TOKENS - These would be exported from the semantic-tokens library */
const groupButtonSmallPaddingTop = `calc(${semanticTokens.groupButtonPaddingTop} / 5 * 3)`;
const groupButtonSmallPaddingBottom = `calc(${semanticTokens.groupButtonPaddingBottom} / 5 * 3)`;
const groupButtonLargePaddingTop = `calc(${semanticTokens.groupButtonPaddingTop} / 5 * 8)`;
const groupButtonLargePaddingBottom = `calc(${semanticTokens.groupButtonPaddingBottom} / 5 * 8)`;
const groupButtonSmallPaddingHorizontal = `calc(${semanticTokens.groupButtonPaddingHorizontal} / 12 * 8)`;
const groupButtonLargePaddingHorizontal = `calc(${semanticTokens.groupButtonPaddingHorizontal} / 12 * 16)`;
const groupButtonSmallMinwidth = `calc(${semanticTokens.groupButtonMinwidth} / 3 * 2)`;
const groupButtonSmallFontsize = `calc(${semanticTokens.groupButtonFontsize} / 7 * 6)`;
const groupButtonSmallFontweight = `calc(${semanticTokens.groupButtonFontweight} / 3 * 2)`;
const groupButtonSmallLineheight = `calc(${semanticTokens.groupButtonLineheight} / 5 * 4)`;
const groupButtonLargeFontsize = `calc(${semanticTokens.groupButtonFontsize} / 7 * 8)`;
const groupButtonLargeLineheight = `calc(${semanticTokens.groupButtonLineheight} / 10 * 11)`;
const groupButtonSmallIcononlyPadding = `calc(${semanticTokens.groupButtonIcononlyPadding} / 5)`;
const groupButtonLargeIcononlyPadding = `calc(${semanticTokens.groupButtonIcononlyPadding} / 5 * 7)`;
const groupButtonSmallGap = `calc(${semanticTokens.groupButtonGap} / 3 * 2)`;
const groupButtonSmallTextPaddingHorizontal = `calc(${semanticTokens.groupButtonTextPaddingHorizontal} / 3 * 2)`;
const groupButtonLargeIconSize = `calc(${semanticTokens.groupButtonIconSize} / 5 * 6)`;

// Color
const groupButtonNeutralBackgroundHover = `hsl(from ${semanticTokens.groupButtonNeutralBackground} h s calc(l + ${semanticTokens.groupButtonLightnessHover}))`;
const groupButtonNeutralBackgroundPressed = `hsl(from ${semanticTokens.groupButtonNeutralBackground} h s calc(l + ${semanticTokens.groupButtonLightnessPressed}))`;
const groupButtonNeutralStrokeHover = `hsl(from ${semanticTokens.groupButtonNeutralStroke} h s calc(l + ${semanticTokens.groupButtonLightnessHover}))`;
const groupButtonNeutralStrokePressed = `hsl(from ${semanticTokens.groupButtonNeutralStroke} h s calc(l + ${semanticTokens.groupButtonLightnessPressed}))`;
const groupButtonOutlineStrokeHover = `hsl(from ${semanticTokens.groupButtonOutlineStroke} h s calc(l + ${semanticTokens.groupButtonLightnessHover}))`;
const groupButtonOutlineStrokePressed = `hsl(from ${semanticTokens.groupButtonOutlineStroke} h s calc(l + ${semanticTokens.groupButtonLightnessPressed}))`;
const groupButtonPrimaryBackgroundHover = `hsl(from ${semanticTokens.groupButtonPrimaryBackground} h s calc(l + ${semanticTokens.groupButtonLightnessHover}))`;
const groupButtonPrimaryStrokeHover = `hsl(from ${semanticTokens.groupButtonPrimaryStroke} h s calc(l + ${semanticTokens.groupButtonLightnessHover}))`;
const groupButtonPrimaryBackgroundPressed = `hsl(from ${semanticTokens.groupButtonPrimaryBackground} h s calc(l + ${semanticTokens.groupButtonLightnessPressed}))`;
const groupButtonPrimaryStrokePressed = `hsl(from ${semanticTokens.groupButtonPrimaryStroke} h s calc(l + ${semanticTokens.groupButtonLightnessPressed}))`;
const groupButtonSubtleForegroundPressed = `hsl(from ${semanticTokens.groupButtonSubtleForeground} h s calc(l + ${semanticTokens.groupButtonLightnessPressed}))`;
const groupButtonTransparentForegroundPressed = `hsl(from ${semanticTokens.groupButtonTransparentForegroundSelected} h s calc(l + ${semanticTokens.groupButtonLightnessHover}))`;

/* Local library nuance */
const buttonSpacingTopSmallWithIcon = `max(1px, calc(${groupButtonSmallPaddingTop} - 2px))`;
const buttonSpacingBottomSmallWithIcon = `max(1px, calc(${groupButtonSmallPaddingBottom} - 2px))`;
const buttonSpacingLargeBottomWithIcon = `max(0px, calc(${groupButtonLargePaddingBottom} - 1px))`;
const buttonSpacingLargeTopWithIcon = `max(0px, calc(${groupButtonLargePaddingTop} - 1px))`;

const paddingSmHorizontalNoIcon = `calc(${groupButtonSmallPaddingHorizontal} + ${groupButtonSmallTextPaddingHorizontal})`;
const paddingHorizontalNoIcon = `calc(${semanticTokens.groupButtonPaddingHorizontal} + ${semanticTokens.groupButtonTextPaddingHorizontal})`;
const paddingLgHorizontalNoIcon = `calc(${groupButtonLargePaddingHorizontal} + ${semanticTokens.groupButtonTextPaddingHorizontal})`;

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
  boxShadow: semanticTokens.groupButtonShadow,

  margin: 0,
  overflow: 'hidden',

  backgroundColor: semanticTokens.groupButtonNeutralBackground,
  color: semanticTokens.groupButtonNeutralForeground,
  border: `${semanticTokens.groupButtonStrokewidth} solid ${semanticTokens.groupButtonNeutralStroke}`,
  borderRadius: semanticTokens.groupButtonCorner,

  fontFamily: semanticTokens.groupButtonFontfamily,
  outlineStyle: 'none',

  [`& .${buttonClassNames.icon}`]: {
    color: semanticTokens.groupButtonNeutralIconForeground,
  },

  ':hover': {
    backgroundColor: groupButtonNeutralBackgroundHover,
    borderColor: groupButtonNeutralStrokeHover,
    cursor: 'pointer',
  },

  ':hover:active': {
    backgroundColor: groupButtonNeutralBackgroundPressed,
    borderColor: groupButtonNeutralStrokePressed,
    outlineStyle: 'none',
  },

  padding: `${semanticTokens.groupButtonPaddingTop} ${paddingHorizontalNoIcon} ${semanticTokens.groupButtonPaddingBottom} ${paddingHorizontalNoIcon}`,
  minWidth: semanticTokens.groupButtonMinwidth,

  fontSize: semanticTokens.groupButtonFontsize,
  fontWeight: semanticTokens.groupButtonFontweight,
  lineHeight: semanticTokens.groupButtonLineheight,

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
    borderRadius: semanticTokens.groupButtonCorner,
    borderWidth: '1px',
    outline: `${semanticTokens.groupFocusOuterStrokewidth} solid ${semanticTokens.groupFocusOuterStroke}`,
    boxShadow: `${semanticTokens.groupButtonShadow}, 0 0 0 ${semanticTokens.groupFocusInnerStrokewidth} ${semanticTokens.groupFocusInnerStroke}
      inset
    `,
    zIndex: 1,
  }),

  // BUGFIX: Mozilla specific styles (Mozilla BugID: 1857642)
  '@supports (-moz-appearance:button)': {
    ...createCustomFocusIndicatorStyle({
      boxShadow: `${semanticTokens.groupButtonShadow}, 0 0 0 ${boxShadowStrokeWidthThinMoz} ${semanticTokens.groupFocusInnerStroke}
      inset
    `,
    }),
  },
});

const useIconBaseClassName = makeResetStyles({
  alignItems: 'center',
  display: 'inline-flex',
  justifyContent: 'center',

  fontSize: semanticTokens.groupButtonIconSize,
  height: semanticTokens.groupButtonIconSize,
  width: semanticTokens.groupButtonIconSize,

  [iconSpacingVar]: `calc(${semanticTokens.groupButtonGap} + ${semanticTokens.groupButtonTextPaddingHorizontal})`,
});

const useRootStyles = makeStyles({
  // Appearance variations
  outline: {
    backgroundColor: semanticTokens.groupButtonOutlineBackground,
    border: `${semanticTokens.groupButtonStrokewidth} solid ${semanticTokens.groupButtonOutlineStroke}`,
    color: semanticTokens.groupButtonOutlineForeground,

    [`& .${buttonClassNames.icon}`]: {
      color: semanticTokens.groupButtonOutlineIconForeground,
    },

    ':hover': {
      border: `${semanticTokens.groupButtonStrokewidth} solid ${groupButtonOutlineStrokeHover}`,
    },

    ':hover:active': {
      border: `${semanticTokens.groupButtonStrokewidth} solid ${groupButtonOutlineStrokePressed}`,
    },
  },

  primary: {
    backgroundColor: semanticTokens.groupButtonPrimaryBackground,
    ...shorthands.borderColor(semanticTokens.groupButtonPrimaryStroke),
    color: semanticTokens.groupButtonPrimaryForeground,

    [`& .${buttonClassNames.icon}`]: {
      color: semanticTokens.groupButtonPrimaryIconForeground,
    },

    ':hover': {
      backgroundColor: groupButtonPrimaryBackgroundHover,
      ...shorthands.borderColor(groupButtonPrimaryStrokeHover),
    },

    ':hover:active': {
      backgroundColor: groupButtonPrimaryBackgroundPressed,
      ...shorthands.borderColor(groupButtonPrimaryStrokePressed),
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
    /* Other than shadow, the secondary styles are exactly the same as the base styles. */
  },
  subtle: {
    backgroundColor: semanticTokens.groupButtonSubtleBackground,
    ...shorthands.borderColor('transparent'),
    color: semanticTokens.groupButtonSubtleForeground,

    [`& .${buttonClassNames.icon}`]: {
      color: semanticTokens.groupButtonSubtleIconForeground,
    },

    ':hover': {
      backgroundColor: groupButtonNeutralBackgroundHover,
      [`& .${iconFilledClassName}`]: {
        display: 'inline',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
      [`& .${buttonClassNames.icon}`]: {
        color: semanticTokens.groupButtonPrimaryBackground,
      },
    },

    ':hover:active': {
      backgroundColor: groupButtonNeutralBackgroundPressed,
      color: groupButtonSubtleForegroundPressed,
      [`& .${iconFilledClassName}`]: {
        display: 'inline',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
      [`& .${buttonClassNames.icon}`]: {
        color: groupButtonPrimaryBackgroundHover,
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

    [`& .${buttonClassNames.icon}`]: {
      color: tokens.colorNeutralForeground2,
    },

    ':hover': {
      backgroundColor: tokens.colorTransparentBackground,
      ...shorthands.borderColor('transparent'),
      color: semanticTokens.groupButtonTransparentForegroundSelected,
      [`& .${iconFilledClassName}`]: {
        display: 'inline',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
      [`& .${buttonClassNames.icon}`]: {
        color: semanticTokens.groupButtonTransparentForegroundSelected,
      },
    },

    ':hover:active': {
      backgroundColor: tokens.colorTransparentBackground,
      ...shorthands.borderColor('transparent'),
      color: groupButtonTransparentForegroundPressed,
      [`& .${iconFilledClassName}`]: {
        display: 'inline',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },

      [`& .${buttonClassNames.icon}`]: {
        color: groupButtonTransparentForegroundPressed,
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
    minWidth: groupButtonSmallMinwidth,
    padding: `${groupButtonSmallPaddingTop} ${paddingSmHorizontalNoIcon} ${groupButtonSmallPaddingBottom} ${paddingSmHorizontalNoIcon}`, //3px

    fontSize: groupButtonSmallFontsize,
    fontWeight: groupButtonSmallFontweight,
    lineHeight: groupButtonSmallLineheight,
  },
  smallWithIcon: {
    paddingBottom: buttonSpacingBottomSmallWithIcon,
    paddingTop: buttonSpacingTopSmallWithIcon,
  },
  smallWithIconBefore: {
    paddingRight: paddingSmHorizontalNoIcon,
    paddingLeft: groupButtonSmallPaddingHorizontal,
  },
  smallWithIconAfter: {
    paddingRight: groupButtonSmallPaddingHorizontal,
    paddingLeft: paddingSmHorizontalNoIcon,
  },
  medium: {
    /* defined in base styles */
  },
  mediumWithIconBefore: {
    paddingRight: paddingHorizontalNoIcon,
    paddingLeft: semanticTokens.groupButtonPaddingHorizontal,
  },
  mediumWithIconAfter: {
    paddingRight: semanticTokens.groupButtonPaddingHorizontal,
    paddingLeft: paddingHorizontalNoIcon,
  },
  large: {
    minWidth: semanticTokens.groupButtonMinwidth,
    padding: `${groupButtonLargePaddingTop} ${paddingLgHorizontalNoIcon} ${groupButtonLargePaddingBottom} ${paddingLgHorizontalNoIcon}`,
    fontSize: groupButtonLargeFontsize,
    lineHeight: groupButtonLargeLineheight,
  },
  largeWithIcon: {
    paddingBottom: buttonSpacingLargeBottomWithIcon,
    paddingTop: buttonSpacingLargeTopWithIcon,
  },
  largeWithIconBefore: {
    paddingRight: paddingLgHorizontalNoIcon,
    paddingLeft: groupButtonLargePaddingHorizontal,
  },
  largeWithIconAfter: {
    paddingRight: groupButtonLargePaddingHorizontal,
    paddingLeft: paddingLgHorizontalNoIcon,
  },
});

const useRootDisabledStyles = makeStyles({
  // Base styles
  base: {
    backgroundColor: semanticTokens.groupButtonNeutralBackgroundDisabled,
    ...shorthands.borderColor(semanticTokens.groupButtonNeutralStrokeDisabled),
    color: semanticTokens.groupButtonNeutralForegroundDisabled,
    cursor: 'not-allowed',
    [`& .${buttonClassNames.icon}`]: {
      color: semanticTokens.groupButtonNeutralIconForegroundDisabled,
    },

    ':hover': {
      backgroundColor: semanticTokens.groupButtonNeutralBackgroundDisabled,
      ...shorthands.borderColor(semanticTokens.groupButtonNeutralStrokeDisabled),
      color: semanticTokens.groupButtonNeutralForegroundDisabled,

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
      color: semanticTokens.groupButtonNeutralForegroundDisabled,

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
    color: semanticTokens.groupButtonOutlineForegroundDisabled,
    ...shorthands.borderColor(semanticTokens.groupButtonOutlineStrokeDisabled),

    [`& .${buttonClassNames.icon}`]: {
      color: semanticTokens.groupButtonOutlineIconForegroundDisabled,
    },
    ':hover': {
      backgroundColor: semanticTokens.groupButtonOutlineBackgroundDisabled,
      [`& .${buttonClassNames.icon}`]: {
        color: semanticTokens.groupButtonOutlineIconForegroundDisabled,
      },
    },

    ':hover:active': {
      backgroundColor: semanticTokens.groupButtonOutlineBackgroundDisabled,
      [`& .${buttonClassNames.icon}`]: {
        color: semanticTokens.groupButtonOutlineIconForegroundDisabled,
      },
    },
  },
  primary: {
    backgroundColor: semanticTokens.groupButtonPrimaryBackgroundDisabled,
    color: semanticTokens.groupButtonPrimaryForegroundDisabled,
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
    color: semanticTokens.groupButtonNeutralForegroundDisabled,
    [`& .${buttonClassNames.icon}`]: {
      color: semanticTokens.groupButtonNeutralIconForegroundDisabled,
    },
  },
  subtle: {
    backgroundColor: semanticTokens.groupButtonSubtleBackgroundDisabled,
    color: semanticTokens.groupButtonSubtleForegroundDisabled,
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
      color: semanticTokens.groupButtonTransparentForegroundDisabled,
    },
    color: semanticTokens.groupButtonTransparentForegroundDisabled,
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
  square: createCustomFocusIndicatorStyle({ borderRadius: semanticTokens.cornerSquare }),
  // Primary styles
  primary: {
    ...createCustomFocusIndicatorStyle({
      ...shorthands.borderColor(semanticTokens.groupFocusInnerStroke),
      boxShadow: `${semanticTokens.groupButtonShadow}, ${tokens.shadow2}, 0 0 0 ${semanticTokens.groupFocusInnerStrokewidth} ${semanticTokens.groupFocusInnerStroke} inset,  0 0 0 ${semanticTokens.groupFocusOuterStrokewidth} ${semanticTokens.groupFocusOnbrandStroke} inset`,
      ':hover': {
        boxShadow: `${semanticTokens.groupButtonShadow}, ${tokens.shadow2}, 0 0 0 ${semanticTokens.groupFocusOuterStrokewidth} ${semanticTokens.groupFocusInnerStroke} inset`,
        ...shorthands.borderColor(semanticTokens.groupFocusOnbrandStrokeHover),
      },
    }),

    // BUGFIX: Mozilla specific styles (Mozilla BugID: 1857642)
    '@supports (-moz-appearance:button)': {
      ...createCustomFocusIndicatorStyle({
        // TODO: Replace shadow2 with semantic shadow
        boxShadow: `${semanticTokens.groupButtonShadow}, ${tokens.shadow2}, 0 0 0 ${boxShadowStrokeWidthThinMoz} ${semanticTokens.groupFocusInnerStroke} inset,  0 0 0 ${semanticTokens.groupFocusOuterStrokewidth} ${semanticTokens.groupFocusOnbrandStroke} inset`,
        ':hover': {
          boxShadow: `${semanticTokens.groupButtonShadow}, ${tokens.shadow2}, 0 0 0 ${boxShadowStrokeWidthThinMoz} ${semanticTokens.groupFocusOnbrandStrokeHover} inset`,
        },
      }),
    },
  },
  secondary: {
    // The secondary focus styles are exactly the same as the base styles.
  },
  // Size variations
  small: createCustomFocusIndicatorStyle({
    borderRadius: `calc(${semanticTokens.groupButtonCorner} - ${semanticTokens.groupFocusOuterStrokewidth})`,
  }),
  medium: {
    /* defined in base styles */
  },
  large: createCustomFocusIndicatorStyle({
    borderRadius: `calc(${semanticTokens.groupButtonCorner} + ${semanticTokens.groupFocusOuterStrokewidth})`,
  }),
});

const useRootIconOnlyStyles = makeStyles({
  // Size variations
  small: {
    padding: `${groupButtonSmallIcononlyPadding}`,
    minWidth: '24px',
    maxWidth: 'unset',
  },
  medium: {
    padding: `${semanticTokens.groupButtonIcononlyPadding}`,
    minWidth: '32px',
    maxWidth: 'unset',
  },
  large: {
    padding: `${groupButtonLargeIcononlyPadding}`,
    minWidth: '40px',
    maxWidth: 'unset',
  },
});

const useIconStyles = makeStyles({
  // Size variations
  small: {
    fontSize: semanticTokens.groupButtonIconSize,
    height: semanticTokens.groupButtonIconSize,
    width: semanticTokens.groupButtonIconSize,

    [iconSpacingVar]: `calc(${groupButtonSmallGap} + ${groupButtonSmallTextPaddingHorizontal})`,
  },
  medium: {
    /* defined in base styles */
  },
  large: {
    fontSize: groupButtonLargeIconSize,
    height: groupButtonLargeIconSize,
    width: groupButtonLargeIconSize,
    //spacingHorizontalSNudge
    [iconSpacingVar]: `calc(${semanticTokens.groupButtonGap} + ${semanticTokens.groupButtonTextPaddingHorizontal})`,
  },

  // Icon position variations
  before: {
    marginRight: `var(${iconSpacingVar})`,
  },
  after: {
    marginLeft: `var(${iconSpacingVar})`,
  },
});

export const useOptimizedSemanticButtonStyles = (_state: unknown): ButtonState => {
  'use no memo';

  const state = _state as ButtonState;

  const rootBaseClassName = useRootBaseClassName();
  const iconBaseClassName = useIconBaseClassName();

  const rootStyles = useRootStyles();
  const rootDisabledStyles = useRootDisabledStyles();
  const rootFocusStyles = useRootFocusStyles();
  const rootIconOnlyStyles = useRootIconOnlyStyles();
  const iconStyles = useIconStyles();

  const { appearance, disabled, disabledFocusable, icon, iconOnly, iconPosition, shape, size } = state;

  state.root.className = mergeClasses(
    state.root.className,
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
    appearance === 'secondary' && rootFocusStyles.secondary,
    rootFocusStyles[size],
    rootFocusStyles[shape],

    // Icon-only styles
    iconOnly && rootIconOnlyStyles[size],

    getSlotClassNameProp_unstable(state.root),
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      state.icon.className,
      buttonClassNames.icon,
      iconBaseClassName,
      !!state.root.children && iconStyles[iconPosition],
      iconStyles[size],
      getSlotClassNameProp_unstable(state.icon),
    );
  }

  return state;
};
