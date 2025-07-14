import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { spinButtonClassNames, type SpinButtonState } from '@fluentui/react-spinbutton';
import { tokens } from '@fluentui/react-theme';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import * as semanticTokens from '@fluentui/semantic-tokens';

const spinButtonExtraClassNames = {
  buttonActive: 'fui-SpinButton__button_active',
};

const fieldHeights = {
  small: semanticTokens._ctrlSpinButtonSizeSmDefault,
  medium: semanticTokens._ctrlSpinButtonSizeDefault,
};

const useRootClassName = makeResetStyles({
  display: 'inline-grid',
  gridTemplateColumns: `1fr 24px`,
  gridTemplateRows: '1fr 1fr',
  columnGap: semanticTokens.gapInsideCtrlSmDefault,
  rowGap: 0,
  position: 'relative',
  isolation: 'isolate',
  verticalAlign: 'middle',

  backgroundColor: semanticTokens.ctrlInputBackgroundRest,
  minHeight: fieldHeights.medium,
  padding: `0 0 0 ${semanticTokens._ctrlSpinButtonPaddingHorizontal}`,
  borderRadius: semanticTokens.cornerCtrlRest,

  // Apply border styles on the ::before pseudo element.
  // We cannot use ::after since that is used for selection.
  // Using the pseudo element allows us to place the border
  // above content in the component which ensures the buttons
  // line up visually with the border as expected. Without this
  // there is a bit of a gap which can become very noticeable
  // at high zoom or when OS zoom levels are not divisible by 2
  // (e.g., 150% on Windows in Firefox)
  // This is most noticeable on the "outline" appearance which is
  // also the default so it feels worth the extra ceremony to get right.
  '::before': {
    content: '""',
    boxSizing: 'border-box',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    pointerEvents: 'none',
    zIndex: 10,
    border: `${semanticTokens.ctrlInputStrokeWidthRest} solid ${semanticTokens.ctrlInputStrokeRest}`,
    borderBottomColor: semanticTokens.ctrlInputBottomLineStrokeRest,
    borderBottomWidth: semanticTokens.ctrlInputBottomLineStrokeWidthRest,
    borderRadius: semanticTokens.cornerCtrlRest,
  },

  '::after': {
    boxSizing: 'border-box',
    content: '""',
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 20,

    // Maintaining the correct corner radius:
    // Use the whole border-radius as the height and only put radii on the bottom corners.
    // (Otherwise the radius would be automatically reduced to fit available space.)
    // max() ensures the focus border still shows up even if someone sets tokens.borderRadiusMedium to 0.
    height: `max(2px, ${semanticTokens.cornerCtrlPressed})`,
    borderBottomLeftRadius: semanticTokens.cornerCtrlPressed,
    borderBottomRightRadius: semanticTokens.cornerCtrlPressed,

    // Flat 2px border:
    // By default borderBottom will cause little "horns" on the ends. The clipPath trims them off.
    // (This could be done without trimming using `background: linear-gradient(...)`, but using
    // borderBottom makes it easier for people to override the color if needed.)
    borderBottom: `2px solid ${semanticTokens.ctrlInputBottomLineStrokeSelected}`,
    clipPath: 'inset(calc(100% - 2px) 0 0 0)',

    // Animation for focus OUT
    transform: 'scaleX(0)',
    transitionProperty: 'transform',
    transitionDuration: tokens.durationUltraFast,
    transitionDelay: tokens.curveAccelerateMid,

    '@media screen and (prefers-reduced-motion: reduce)': {
      transitionDuration: '0.01ms',
      transitionDelay: '0.01ms',
    },
  },

  ':focus-within::after': {
    // Animation for focus IN
    transform: 'scaleX(1)',
    transitionProperty: 'transform',
    transitionDuration: tokens.durationNormal,
    transitionDelay: tokens.curveDecelerateMid,

    '@media screen and (prefers-reduced-motion: reduce)': {
      transitionDuration: '0.01ms',
      transitionDelay: '0.01ms',
    },
  },
  ':focus-within:active::after': {
    // This is if the user clicks the field again while it's already focused
    borderBottomColor: tokens.colorCompoundBrandStrokePressed,
  },
  ':focus-within': {
    outline: '2px solid transparent',
  },
});

const useRootStyles = makeStyles({
  small: {
    minHeight: fieldHeights.small,
    fontFamily: semanticTokens.textStyleDefaultRegularFontFamily,
    fontSize: semanticTokens.textRampSmItemBodyFontSize,
    fontWeight: semanticTokens.textStyleDefaultRegularWeight,
    lineHeight: semanticTokens.textRampSmItemBodyLineHeight,
    paddingLeft: semanticTokens.paddingCtrlSmHorizontalDefault,
  },

  medium: {
    // set by useRootClassName
  },

  outline: {
    // set by useRootClassName
  },

  outlineInteractive: {
    ':hover::before': {
      ...shorthands.borderColor(semanticTokens.ctrlInputStrokeHover),
      borderBottomColor: semanticTokens.ctrlInputBottomLineStrokeHover,
    },
    // DO NOT add a space between the selectors! It changes the behavior of make-styles.
    ':active,:focus-within': {
      '::before': {
        ...shorthands.borderColor(semanticTokens.ctrlInputStrokePressed),
        borderBottomColor: semanticTokens.ctrlInputBottomLineStrokePressed,
      },
    },
  },

  underline: {
    '::before': {
      ...shorthands.borderWidth(0, 0, '1px', 0),
      borderRadius: semanticTokens.cornerZero, // corners look strange if rounded
    },
  },

  underlineInteractive: {
    ':hover::before': {
      borderBottomColor: semanticTokens.ctrlInputBottomLineStrokeHover,
    },
    // DO NOT add a space between the selectors! It changes the behavior of make-styles.
    ':active,:focus-within': {
      '::before': {
        borderBottomColor: semanticTokens.ctrlInputBottomLineStrokePressed,
      },
    },
    '::after': {
      borderRadius: semanticTokens.cornerZero, // remove rounded corners from focus underline
    },
  },

  filled: {
    '::before': {
      border: `1px solid ${semanticTokens.strokeLayer}`,
    },
  },

  'filled-darker': {
    backgroundColor: semanticTokens.strokeFlyout,
  },
  'filled-lighter': {
    backgroundColor: semanticTokens.backgroundCtrlNeutralRest,
  },

  filledInteractive: {
    // DO NOT add a space between the selectors! It changes the behavior of make-styles.
    ':hover,:focus-within': {
      '::before': {
        // also handles pressed border color (:active)
        ...shorthands.borderColor(semanticTokens.strokeCtrlOnActiveBrandPressed),
      },
    },
  },

  invalid: {
    ':not(:focus-within),:hover:not(:focus-within)': {
      '::before': {
        ...shorthands.borderColor(semanticTokens.ctrlInputBackgroundError),
      },
    },
  },

  disabled: {
    cursor: 'not-allowed',
    backgroundColor: semanticTokens._ctrlSpinButtonBackgroundDisabled,
    '::before': {
      ...shorthands.borderColor(semanticTokens.ctrlInputStrokeDisabled),

      '@media (forced-colors: active)': {
        ...shorthands.borderColor('GrayText'),
      },
    },
  },
});

const useInputClassName = makeResetStyles({
  gridColumnStart: '1',
  gridColumnEnd: '2',
  gridRowStart: '1',
  gridRowEnd: '3',
  outlineStyle: 'none',
  border: '0',
  padding: '0',
  color: semanticTokens.foregroundCtrlNeutralPrimaryRest,
  // Use literal "transparent" (not from the theme) to always let the color from the root show through
  backgroundColor: 'transparent',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  lineHeight: 'inherit',
  width: '100%',

  '::placeholder': {
    color: semanticTokens._ctrlSpinButtonNeutralSecondaryRest,

    opacity: 1, // browser style override
  },
});

const useInputStyles = makeStyles({
  disabled: {
    color: semanticTokens.foregroundCtrlNeutralSecondaryDisabled,

    cursor: 'not-allowed',
    backgroundColor: semanticTokens.ctrlChoiceBaseBackgroundDisabled,

    '::placeholder': {
      color: semanticTokens.foregroundCtrlNeutralSecondaryDisabled,
    },
  },
});

const useBaseButtonClassName = makeResetStyles({
  display: 'inline-flex',
  width: semanticTokens._ctrlSpinButtonSizeSmDefault,
  alignItems: 'center',
  justifyContent: 'center',
  border: '0',
  position: 'absolute',

  outlineStyle: 'none',
  height: semanticTokens._ctrlSpinButtonSizeIconSecondary,

  // Use literal "transparent" (not from the theme) to always let the color from the root show through
  backgroundColor: 'transparent',
  color: semanticTokens._ctrlSpinButtonOnSubtleRest,

  // common button layout
  gridColumnStart: '2',
  borderRadius: '0',
  padding: `0 ${semanticTokens._ctrlSpinButtonPaddingSmHorizontal}`,

  ':active': {
    outlineStyle: 'none',
  },

  ':enabled': {
    ':hover': {
      cursor: 'pointer',
      color: semanticTokens._ctrlSpinButtonForegroundOnSubtleHover,
      backgroundColor: semanticTokens.backgroundCtrlSubtleHover,
    },
    ':active': {
      color: semanticTokens._ctrlSpinButtonForegroundOnSubtlePressed,
      backgroundColor: semanticTokens.backgroundCtrlSubtlePressed,
    },
    [`&.${spinButtonExtraClassNames.buttonActive}`]: {
      color: semanticTokens._ctrlSpinButtonForegroundOnSubtlePressed,
      backgroundColor: semanticTokens.backgroundCtrlSubtlePressed,
    },
  },

  ':disabled': {
    cursor: 'not-allowed',
    color: semanticTokens.foregroundCtrlOnSubtleDisabled,
  },
});

const useButtonStyles = makeStyles({
  increment: {
    gridRowStart: '1',
    borderTopRightRadius: semanticTokens.cornerCtrlSmRest,
    paddingTop: '4px',
    paddingBottom: '1px',
  },
  decrement: {
    gridRowStart: '2',
    borderBottomRightRadius: semanticTokens.cornerCtrlSmRest,
    paddingTop: '1px',
    paddingBottom: '4px',
  },
  // Padding values numbers don't align with design specs
  // but visually the padding aligns.
  // The icons are set in a 16x16px square but the artwork is inset from that
  // so these padding values are computed by hand.
  // Additionally the design uses fractional values so these are
  // rounded to the nearest integer.
  incrementButtonSmall: {
    padding: '3px 6px 0px 4px',
    height: '12px',
  },

  decrementButtonSmall: {
    padding: '0px 6px 3px 4px',
    height: '12px',
  },

  outline: {
    // set by useButtonClassName
  },

  underline: {
    backgroundColor: 'transparent',
    color: semanticTokens._ctrlSpinButtonOnSubtleRest,
    ':enabled': {
      ':hover': {
        color: semanticTokens._ctrlSpinButtonForegroundOnSubtleHover,
        backgroundColor: semanticTokens.backgroundCtrlSubtleHover,
      },
      ':active': {
        color: semanticTokens._ctrlSpinButtonForegroundOnSubtlePressed,
        backgroundColor: semanticTokens.backgroundCtrlSubtlePressed,
      },
      [`&.${spinButtonExtraClassNames.buttonActive}`]: {
        color: semanticTokens._ctrlSpinButtonForegroundOnSubtlePressed,
        backgroundColor: semanticTokens.backgroundCtrlSubtlePressed,
      },
    },
    ':disabled': {
      color: semanticTokens.foregroundCtrlOnSubtleDisabled,
    },
  },
  'filled-darker': {
    backgroundColor: 'transparent',
    color: semanticTokens._ctrlSpinButtonOnSubtleRest,

    ':enabled': {
      ':hover': {
        color: semanticTokens._ctrlSpinButtonForegroundOnSubtleHover,
        backgroundColor: tokens.colorNeutralBackground3Hover,
      },
      ':active': {
        color: semanticTokens._ctrlSpinButtonForegroundOnSubtlePressed,
        backgroundColor: tokens.colorNeutralBackground3Pressed,
      },
      [`&.${spinButtonExtraClassNames.buttonActive}`]: {
        color: semanticTokens._ctrlSpinButtonForegroundOnSubtlePressed,
        backgroundColor: tokens.colorNeutralBackground3Pressed,
      },
    },
    ':disabled': {
      color: semanticTokens.foregroundCtrlOnSubtleDisabled,
    },
  },
  'filled-lighter': {
    backgroundColor: 'transparent',
    color: semanticTokens._ctrlSpinButtonOnSubtleRest,

    ':enabled': {
      ':hover': {
        color: semanticTokens._ctrlSpinButtonForegroundOnSubtleHover,
        backgroundColor: semanticTokens.backgroundCtrlNeutralHover,
      },
      [`:active,&.${spinButtonExtraClassNames.buttonActive}`]: {
        color: semanticTokens._ctrlSpinButtonForegroundOnSubtlePressed,
        backgroundColor: semanticTokens.backgroundCtrlNeutralPressed,
      },
    },
    ':disabled': {
      color: semanticTokens.foregroundCtrlOnSubtleDisabled,
    },
  },
});

/**
 * Apply styling to the SpinButton slots based on the state
 */
export const useSemanticSpinButtonStyles = (_state: unknown): SpinButtonState => {
  'use no memo';

  const state = _state as SpinButtonState;

  const { appearance, spinState, size } = state;
  const disabled = state.input.disabled;
  const invalid = `${state.input['aria-invalid']}` === 'true';
  const filled = appearance.startsWith('filled');

  const rootStyles = useRootStyles();
  const buttonStyles = useButtonStyles();
  const inputStyles = useInputStyles();

  state.root.className = mergeClasses(
    state.root.className,
    spinButtonClassNames.root,
    useRootClassName(),
    rootStyles[size],
    rootStyles[appearance],
    filled && rootStyles.filled,
    !disabled && appearance === 'outline' && rootStyles.outlineInteractive,
    !disabled && appearance === 'underline' && rootStyles.underlineInteractive,
    !disabled && filled && rootStyles.filledInteractive,
    !disabled && invalid && rootStyles.invalid,
    disabled && rootStyles.disabled,
    getSlotClassNameProp_unstable(state.root),
  );

  state.incrementButton.className = mergeClasses(
    state.incrementButton.className,
    spinButtonClassNames.incrementButton,
    spinState === 'up' && `${spinButtonExtraClassNames.buttonActive}`,
    useBaseButtonClassName(),
    buttonStyles.increment,
    buttonStyles[appearance],
    size === 'small' && buttonStyles.incrementButtonSmall,
    getSlotClassNameProp_unstable(state.incrementButton),
  );
  state.decrementButton.className = mergeClasses(
    state.decrementButton.className,
    spinButtonClassNames.decrementButton,
    spinState === 'down' && `${spinButtonExtraClassNames.buttonActive}`,
    useBaseButtonClassName(),
    buttonStyles.decrement,
    buttonStyles[appearance],
    size === 'small' && buttonStyles.decrementButtonSmall,
    getSlotClassNameProp_unstable(state.decrementButton),
  );

  state.input.className = mergeClasses(
    state.input.className,
    spinButtonClassNames.input,
    useInputClassName(),
    disabled && inputStyles.disabled,
    getSlotClassNameProp_unstable(state.input),
  );

  return state;
};
