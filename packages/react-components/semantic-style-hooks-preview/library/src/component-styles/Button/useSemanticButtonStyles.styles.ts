'use client';

import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import { shorthands, makeStyles, makeResetStyles, mergeClasses } from '@griffel/react';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { buttonClassNames, type ButtonState } from '@fluentui/react-button';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

const iconSpacingVar = '--fui-Button__icon--spacing';

/* Local library nuance */
const buttonSpacingTopSmallWithIcon = `max(1px, calc(${semanticTokens.groupButtonSmallPaddingTop} - 2px))`;
const buttonSpacingBottomSmallWithIcon = `max(1px, calc(${semanticTokens.groupButtonSmallPaddingBottom} - 2px))`;
const buttonSpacingLargeBottomWithIcon = `max(0px, calc(${semanticTokens.groupButtonLargePaddingBottom} - 1px))`;
const buttonSpacingLargeTopWithIcon = `max(0px, calc(${semanticTokens.groupButtonLargePaddingTop} - 1px))`;

const paddingSmHorizontalNoIcon = `calc(${semanticTokens.groupButtonSmallPaddingHorizontal} + ${semanticTokens.groupButtonSmallTextPaddingHorizontal})`;
const paddingHorizontalNoIcon = `calc(${semanticTokens.groupButtonPaddingHorizontal} + ${semanticTokens.groupButtonTextPaddingHorizontal})`;
const paddingLgHorizontalNoIcon = `calc(${semanticTokens.groupButtonLargePaddingHorizontal} + ${semanticTokens.groupButtonTextPaddingHorizontal})`;

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
    backgroundColor: semanticTokens.groupButtonNeutralBackgroundHover,
    borderColor: semanticTokens.groupButtonNeutralStrokeHover,
    cursor: 'pointer',
  },

  ':hover:active': {
    backgroundColor: semanticTokens.groupButtonNeutralBackgroundPressed,
    borderColor: semanticTokens.groupButtonNeutralStrokePressed,
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
      border: `${semanticTokens.groupButtonStrokewidth} solid ${semanticTokens.groupButtonOutlineStrokeHover}`,
    },

    ':hover:active': {
      border: `${semanticTokens.groupButtonStrokewidth} solid ${semanticTokens.groupButtonOutlineStrokePressed}`,
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
      backgroundColor: semanticTokens.groupButtonPrimaryBackgroundHover,
      ...shorthands.borderColor(semanticTokens.groupButtonPrimaryStrokeHover),
    },

    ':hover:active': {
      backgroundColor: semanticTokens.groupButtonPrimaryBackgroundPressed,
      ...shorthands.borderColor(semanticTokens.groupButtonPrimaryStrokePressed),
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
    ...shorthands.borderColor(semanticTokens.groupButtonSubtleStroke),
    color: semanticTokens.groupButtonSubtleForeground,

    [`& .${buttonClassNames.icon}`]: {
      color: semanticTokens.groupButtonSubtleIconForeground,
    },

    ':hover': {
      backgroundColor: semanticTokens.groupButtonSubtleBackgroundHover,
      color: semanticTokens.groupButtonSubtleForegroundSelected,
      ...shorthands.borderColor(semanticTokens.groupButtonSubtleStroke),
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
      color: semanticTokens.groupButtonSubtleForegroundSelected,
      ...shorthands.borderColor(semanticTokens.groupButtonSubtleStroke),
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
    backgroundColor: semanticTokens.backgroundNeutralTransparent,
    ...shorthands.borderColor('transparent'),
    color: semanticTokens.groupButtonTransparentForeground,

    [`& .${buttonClassNames.icon}`]: {
      color: semanticTokens.groupButtonTransparentForeground,
    },

    ':hover': {
      backgroundColor: semanticTokens.backgroundNeutralTransparent,
      ...shorthands.borderColor('transparent'),
      // Transparent button uses the 'base' selected color for hover state
      color: semanticTokens.groupButtonTransparentForegroundSelected,
      [`& .${iconFilledClassName}`]: {
        display: 'inline',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
      [`& .${buttonClassNames.icon}`]: {
        // Transparent button uses the 'base' selected color for hover state
        color: semanticTokens.groupButtonTransparentForegroundSelected,
      },
    },

    ':hover:active': {
      backgroundColor: semanticTokens.backgroundNeutralTransparent,
      ...shorthands.borderColor('transparent'),
      // Transparent button uses the 'hover' lightness for pressed state
      color: semanticTokens.groupButtonTransparentForegroundHover,
      [`& .${iconFilledClassName}`]: {
        display: 'inline',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },

      [`& .${buttonClassNames.icon}`]: {
        // Transparent button uses the 'hover' lightness for pressed state
        color: semanticTokens.groupButtonTransparentForegroundHover,
      },
    },

    '@media (forced-colors: active)': {
      ':hover': {
        backgroundColor: semanticTokens.backgroundNeutralTransparent,
        color: 'Highlight',
      },
      ':hover:active': {
        backgroundColor: semanticTokens.backgroundNeutralTransparent,
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
    padding: `${semanticTokens.groupButtonSmallPaddingTop} ${semanticTokens.groupButtonSmallPaddingHorizontal} ${semanticTokens.groupButtonSmallPaddingBottom} ${semanticTokens.groupButtonSmallPaddingHorizontal}`, //3px

    fontSize: semanticTokens.groupButtonSmallFontsize,
    fontWeight: semanticTokens.groupButtonSmallFontweight,
    lineHeight: semanticTokens.groupButtonSmallLineheight,
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
    paddingLeft: semanticTokens.groupButtonPaddingHorizontal,
  },
  mediumWithIconAfter: {
    paddingRight: semanticTokens.groupButtonPaddingHorizontal,
    paddingLeft: paddingHorizontalNoIcon,
  },
  large: {
    minWidth: semanticTokens.groupButtonMinwidth,
    padding: `${semanticTokens.groupButtonLargePaddingTop} ${paddingLgHorizontalNoIcon} ${semanticTokens.groupButtonLargePaddingBottom} ${paddingLgHorizontalNoIcon}`,
    fontSize: semanticTokens.groupButtonLargeFontsize,
    lineHeight: semanticTokens.groupButtonLargeLineheight,
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
    backgroundColor: semanticTokens.backgroundNeutralTransparent,
    ...shorthands.borderColor('transparent'),

    ':hover': {
      backgroundColor: semanticTokens.backgroundNeutralTransparent,
      ...shorthands.borderColor('transparent'),
    },

    ':hover:active': {
      backgroundColor: semanticTokens.backgroundNeutralTransparent,
      ...shorthands.borderColor('transparent'),
    },
  },
});

const useRootFocusStyles = makeStyles({
  base: {
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
  // Shape variations
  circular: createCustomFocusIndicatorStyle({ borderRadius: semanticTokens.cornerCircular }),
  rounded: {
    /* The rounded styles are exactly the same as the base styles. */
  },
  square: createCustomFocusIndicatorStyle({ borderRadius: semanticTokens.cornerSquare }),
  // Primary styles
  primary: {},
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
    padding: `${semanticTokens.groupButtonSmallIcononlyPadding}`,
    minWidth: '24px',
    maxWidth: 'unset',
  },
  medium: {
    padding: `${semanticTokens.groupButtonIcononlyPadding}`,
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
    fontSize: semanticTokens.groupButtonIconSize,
    height: semanticTokens.groupButtonIconSize,
    width: semanticTokens.groupButtonIconSize,

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

export const useSemanticButtonStyles = (_state: unknown): ButtonState => {
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
    rootFocusStyles.base,
    rootFocusStyles[size],
    rootFocusStyles[shape],

    // Icon-only styles
    iconOnly && rootIconOnlyStyles[size],

    getSlotClassNameProp_unstable(state.root),
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      buttonClassNames.icon,
      iconBaseClassName,
      !!state.root.children && iconStyles[iconPosition],
      iconStyles[size],
      getSlotClassNameProp_unstable(state.icon),
    );
  }

  return state;
};
