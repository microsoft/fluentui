import { SlotClassNames } from '@fluentui/react-utilities';
import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SpinButtonSlots, SpinButtonState } from './SpinButton.types';
import { tokens, typographyStyles } from '@fluentui/react-theme';

export const spinButtonClassNames: SlotClassNames<SpinButtonSlots> = {
  root: 'fui-SpinButton',
  input: 'fui-SpinButton__input',
  incrementButton: 'fui-SpinButton__incrementButton',
  decrementButton: 'fui-SpinButton__decrementButton',
};

const spinButtonExtraClassNames = {
  buttonActive: 'fui-SpinButton__button_active',
};

const fieldHeights = {
  small: '24px',
  medium: '32px',
};

const useRootClassName = makeResetStyles({
  display: 'inline-grid',
  gridTemplateColumns: `1fr 24px`,
  gridTemplateRows: '1fr 1fr',
  columnGap: tokens.spacingHorizontalXS,
  rowGap: 0,
  position: 'relative',
  isolation: 'isolate',

  backgroundColor: tokens.colorNeutralBackground1,
  minHeight: fieldHeights.medium,
  padding: `0 0 0 ${tokens.spacingHorizontalMNudge}`,
  borderRadius: tokens.borderRadiusMedium,

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
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderBottomColor: tokens.colorNeutralStrokeAccessible,
    borderRadius: tokens.borderRadiusMedium,
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
    height: `max(2px, ${tokens.borderRadiusMedium})`,
    borderBottomLeftRadius: tokens.borderRadiusMedium,
    borderBottomRightRadius: tokens.borderRadiusMedium,

    // Flat 2px border:
    // By default borderBottom will cause little "horns" on the ends. The clipPath trims them off.
    // (This could be done without trimming using `background: linear-gradient(...)`, but using
    // borderBottom makes it easier for people to override the color if needed.)
    borderBottom: `2px solid ${tokens.colorCompoundBrandStroke}`,
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
    ...typographyStyles.caption1,
    paddingLeft: tokens.spacingHorizontalS,
  },

  medium: {
    // set by useRootClassName
  },

  outline: {
    // set by useRootClassName
  },

  outlineInteractive: {
    ':hover::before': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Hover),
      borderBottomColor: tokens.colorNeutralStrokeAccessibleHover,
    },
    // DO NOT add a space between the selectors! It changes the behavior of make-styles.
    ':active,:focus-within': {
      '::before': {
        ...shorthands.borderColor(tokens.colorNeutralStroke1Pressed),
        borderBottomColor: tokens.colorNeutralStrokeAccessiblePressed,
      },
    },
  },

  underline: {
    '::before': {
      ...shorthands.borderWidth(0, 0, '1px', 0),
      borderRadius: tokens.borderRadiusNone, // corners look strange if rounded
    },
  },

  underlineInteractive: {
    ':hover::before': {
      borderBottomColor: tokens.colorNeutralStrokeAccessibleHover,
    },
    // DO NOT add a space between the selectors! It changes the behavior of make-styles.
    ':active,:focus-within': {
      '::before': {
        borderBottomColor: tokens.colorNeutralStrokeAccessiblePressed,
      },
    },
    '::after': {
      borderRadius: tokens.borderRadiusNone, // remove rounded corners from focus underline
    },
  },

  filled: {
    '::before': {
      border: `1px solid ${tokens.colorTransparentStroke}`,
    },
  },

  'filled-darker': {
    backgroundColor: tokens.colorNeutralBackground3,
  },
  'filled-lighter': {
    backgroundColor: tokens.colorNeutralBackground1,
  },

  filledInteractive: {
    // DO NOT add a space between the selectors! It changes the behavior of make-styles.
    ':hover,:focus-within': {
      '::before': {
        // also handles pressed border color (:active)
        ...shorthands.borderColor(tokens.colorTransparentStrokeInteractive),
      },
    },
  },

  invalid: {
    ':not(:focus-within),:hover:not(:focus-within)': {
      '::before': {
        ...shorthands.borderColor(tokens.colorPaletteRedBorder2),
      },
    },
  },

  disabled: {
    cursor: 'not-allowed',
    backgroundColor: tokens.colorTransparentBackground,
    '::before': {
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),

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
  color: tokens.colorNeutralForeground1,
  // Use literal "transparent" (not from the theme) to always let the color from the root show through
  backgroundColor: 'transparent',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  lineHeight: 'inherit',
  width: '100%',

  '::placeholder': {
    color: tokens.colorNeutralForeground4,
    opacity: 1, // browser style override
  },
});

const useInputStyles = makeStyles({
  disabled: {
    color: tokens.colorNeutralForegroundDisabled,
    cursor: 'not-allowed',
    backgroundColor: tokens.colorTransparentBackground,
    '::placeholder': {
      color: tokens.colorNeutralForegroundDisabled,
    },
  },
});

const useBaseButtonClassName = makeResetStyles({
  display: 'inline-flex',
  width: '24px',
  alignItems: 'center',
  justifyContent: 'center',
  border: '0',
  position: 'absolute',

  outlineStyle: 'none',
  height: '16px',

  // Use literal "transparent" (not from the theme) to always let the color from the root show through
  backgroundColor: 'transparent',
  color: tokens.colorNeutralForeground3,

  // common button layout
  gridColumnStart: '2',
  borderRadius: '0',
  padding: '0 5px 0 5px',

  ':active': {
    outlineStyle: 'none',
  },

  ':enabled': {
    ':hover': {
      cursor: 'pointer',
      color: tokens.colorNeutralForeground3Hover,
      backgroundColor: tokens.colorSubtleBackgroundHover,
    },
    ':active': {
      color: tokens.colorNeutralForeground3Pressed,
      backgroundColor: tokens.colorSubtleBackgroundPressed,
    },
    [`&.${spinButtonExtraClassNames.buttonActive}`]: {
      color: tokens.colorNeutralForeground3Pressed,
      backgroundColor: tokens.colorSubtleBackgroundPressed,
    },
  },

  ':disabled': {
    cursor: 'not-allowed',
    color: tokens.colorNeutralForegroundDisabled,
  },
});

const useButtonStyles = makeStyles({
  increment: {
    gridRowStart: '1',
    borderTopRightRadius: tokens.borderRadiusMedium,
    paddingTop: '4px',
    paddingBottom: '1px',
  },
  decrement: {
    gridRowStart: '2',
    borderBottomRightRadius: tokens.borderRadiusMedium,
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
    color: tokens.colorNeutralForeground3,
    ':enabled': {
      ':hover': {
        color: tokens.colorNeutralForeground3Hover,
        backgroundColor: tokens.colorSubtleBackgroundHover,
      },
      ':active': {
        color: tokens.colorNeutralForeground3Pressed,
        backgroundColor: tokens.colorSubtleBackgroundPressed,
      },
      [`&.${spinButtonExtraClassNames.buttonActive}`]: {
        color: tokens.colorNeutralForeground3Pressed,
        backgroundColor: tokens.colorSubtleBackgroundPressed,
      },
    },
    ':disabled': {
      color: tokens.colorNeutralForegroundDisabled,
    },
  },
  'filled-darker': {
    backgroundColor: 'transparent',
    color: tokens.colorNeutralForeground3,

    ':enabled': {
      ':hover': {
        color: tokens.colorNeutralForeground3Hover,
        backgroundColor: tokens.colorNeutralBackground3Hover,
      },
      ':active': {
        color: tokens.colorNeutralForeground3Pressed,
        backgroundColor: tokens.colorNeutralBackground3Pressed,
      },
      [`&.${spinButtonExtraClassNames.buttonActive}`]: {
        color: tokens.colorNeutralForeground3Pressed,
        backgroundColor: tokens.colorNeutralBackground3Pressed,
      },
    },
    ':disabled': {
      color: tokens.colorNeutralForegroundDisabled,
    },
  },
  'filled-lighter': {
    backgroundColor: 'transparent',
    color: tokens.colorNeutralForeground3,

    ':enabled': {
      ':hover': {
        color: tokens.colorNeutralForeground3Hover,
        backgroundColor: tokens.colorNeutralBackground1Hover,
      },
      [`:active,&.${spinButtonExtraClassNames.buttonActive}`]: {
        color: tokens.colorNeutralForeground3Pressed,
        backgroundColor: tokens.colorNeutralBackground1Pressed,
      },
    },
    ':disabled': {
      color: tokens.colorNeutralForegroundDisabled,
    },
  },
});

// Cannot just disable button as they need to remain
// exposed to ATs like screen readers.
const useButtonDisabledStyles = makeStyles({
  base: {
    cursor: 'not-allowed',

    ':hover': {
      cursor: 'not-allowed',
    },
  },

  outline: {
    color: tokens.colorNeutralForegroundDisabled,
    ':enabled': {
      ':hover': {
        color: tokens.colorNeutralForegroundDisabled,
        backgroundColor: 'transparent',
      },
      ':active': {
        color: tokens.colorNeutralForegroundDisabled,
        backgroundColor: 'transparent',
      },
      [`&.${spinButtonExtraClassNames.buttonActive}`]: {
        color: tokens.colorNeutralForegroundDisabled,
        backgroundColor: 'transparent',
      },
    },
  },

  underline: {
    color: tokens.colorNeutralForegroundDisabled,
    ':enabled': {
      ':hover': {
        color: tokens.colorNeutralForegroundDisabled,
        backgroundColor: 'transparent',
      },
      ':active': {
        color: tokens.colorNeutralForegroundDisabled,
        backgroundColor: 'transparent',
      },
      [`&.${spinButtonExtraClassNames.buttonActive}`]: {
        color: tokens.colorNeutralForegroundDisabled,
        backgroundColor: 'transparent',
      },
    },
  },

  'filled-darker': {
    color: tokens.colorNeutralForegroundDisabled,
    ':enabled': {
      ':hover': {
        color: tokens.colorNeutralForegroundDisabled,
        backgroundColor: 'transparent',
      },
      ':active': {
        color: tokens.colorNeutralForegroundDisabled,
        backgroundColor: 'transparent',
      },
      [`&.${spinButtonExtraClassNames.buttonActive}`]: {
        color: tokens.colorNeutralForegroundDisabled,
        backgroundColor: 'transparent',
      },
    },
  },

  'filled-lighter': {
    color: tokens.colorNeutralForegroundDisabled,
    ':enabled': {
      ':hover': {
        color: tokens.colorNeutralForegroundDisabled,
        backgroundColor: 'transparent',
      },
      ':active': {
        color: tokens.colorNeutralForegroundDisabled,
        backgroundColor: 'transparent',
      },
      [`&.${spinButtonExtraClassNames.buttonActive}`]: {
        color: tokens.colorNeutralForegroundDisabled,
        backgroundColor: 'transparent',
      },
    },
  },
});

/**
 * Apply styling to the SpinButton slots based on the state
 */
export const useSpinButtonStyles_unstable = (state: SpinButtonState): SpinButtonState => {
  'use no memo';

  const { appearance, atBound, spinState, size } = state;
  const disabled = state.input.disabled;
  const invalid = `${state.input['aria-invalid']}` === 'true';
  const filled = appearance.startsWith('filled');

  const rootStyles = useRootStyles();
  const buttonStyles = useButtonStyles();
  const buttonDisabledStyles = useButtonDisabledStyles();
  const inputStyles = useInputStyles();

  state.root.className = mergeClasses(
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
    state.root.className,
  );

  state.incrementButton.className = mergeClasses(
    spinButtonClassNames.incrementButton,
    spinState === 'up' && `${spinButtonExtraClassNames.buttonActive}`,
    useBaseButtonClassName(),
    buttonStyles.increment,
    buttonStyles[appearance],
    size === 'small' && buttonStyles.incrementButtonSmall,
    (atBound === 'max' || atBound === 'both') && buttonDisabledStyles.base,
    (atBound === 'max' || atBound === 'both') && buttonDisabledStyles[appearance],
    state.incrementButton.className,
  );
  state.decrementButton.className = mergeClasses(
    spinButtonClassNames.decrementButton,
    spinState === 'down' && `${spinButtonExtraClassNames.buttonActive}`,
    useBaseButtonClassName(),
    buttonStyles.decrement,
    buttonStyles[appearance],
    size === 'small' && buttonStyles.decrementButtonSmall,
    (atBound === 'min' || atBound === 'both') && buttonDisabledStyles.base,
    (atBound === 'min' || atBound === 'both') && buttonDisabledStyles[appearance],
    state.decrementButton.className,
  );

  state.input.className = mergeClasses(
    spinButtonClassNames.input,
    useInputClassName(),
    disabled && inputStyles.disabled,
    state.input.className,
  );

  return state;
};
