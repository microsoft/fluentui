import { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SpinButtonSlots, SpinButtonState } from './SpinButton.types';
import { tokens } from '@fluentui/react-theme';
import { useInputStyles_unstable } from '@fluentui/react-input';

export const spinButtonClassNames: SlotClassNames<SpinButtonSlots> = {
  root: 'fui-SpinButton',
  input: 'fui-SpinButton__input',
  incrementButton: 'fui-SpinButton__incrementButton',
  decrementButton: 'fui-SpinButton__decrementButton',
};

const spinButtonExtraClassNames = {
  buttonActive: 'fui-SpinButton__button_active',
};

// TODO(sharing) use theme values once available
const horizontalSpacing = {
  xs: '4px',
};

const useRootStyles = makeStyles({
  base: {
    display: 'inline-grid',
    gridTemplateColumns: `1fr 24px`,
    gridTemplateRows: '1fr 1fr',
    columnGap: horizontalSpacing.xs,
    rowGap: 0,
    paddingRight: 0,
    position: 'relative',
    // Remove the border styles from react-input
    ...shorthands.border('0'),
    isolation: 'isolate',

    // Apply border styles on the ::before pseudo element.
    // We cannot use ::after since react-input uses that
    // for the selector styles.
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
      ...shorthands.borderRadius(tokens.borderRadiusMedium),
      pointerEvents: 'none',
      zIndex: 10,
    },

    // TODO: change this to `::after`. Needs to be changed at the same time as react-input.
    ':after': {
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 20,
    },
  },

  outline: {
    '::before': {
      ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke1),
      borderBottomColor: tokens.colorNeutralStrokeAccessible,
    },
  },

  outlineInteractive: {
    ':hover': {
      '::before': {
        ...shorthands.borderColor(tokens.colorNeutralStroke1Hover),
        borderBottomColor: tokens.colorNeutralStrokeAccessibleHover,
      },
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
      ...shorthands.borderRadius(0), // corners look strange if rounded
      ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStrokeAccessible),
    },
  },

  underlineInteractive: {
    ':hover': {
      '::before': {
        borderBottomColor: tokens.colorNeutralStrokeAccessibleHover,
      },
    },
    // DO NOT add a space between the selectors! It changes the behavior of make-styles.
    ':active,:focus-within': {
      '::before': {
        borderBottomColor: tokens.colorNeutralStrokeAccessiblePressed,
      },
    },
  },

  filled: {
    '::before': {
      ...shorthands.border('1px', 'solid', tokens.colorTransparentStroke),
    },
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

  disabled: {
    '::before': {
      ...shorthands.border('1px', 'solid', tokens.colorNeutralStrokeDisabled),
      ...shorthands.borderRadius(tokens.borderRadiusMedium), // because underline doesn't usually have a radius
      '@media (forced-colors: active)': {
        ...shorthands.borderColor('GrayText'),
      },
    },
  },
});

const useInputStyles = makeStyles({
  base: {
    gridColumnStart: '1',
    gridColumnEnd: '2',
    gridRowStart: '1',
    gridRowEnd: '3',
    ...shorthands.padding(0),
  },
});

const useButtonStyles = makeStyles({
  base: {
    display: 'inline-flex',
    width: '24px',
    alignItems: 'center',
    justifyContent: 'center',
    ...shorthands.border(0),
    position: 'absolute',

    outlineStyle: 'none',
    height: '100%',

    ':hover': {
      cursor: 'pointer',
    },

    ':active': {
      outlineStyle: 'none',
    },

    ':disabled': {
      cursor: 'not-allowed',
    },
  },

  incrementButton: {
    gridColumnStart: '2',
    gridColumnEnd: '3',
    gridRowStart: '1',
    gridRowEnd: '2',
    ...shorthands.borderRadius(0, tokens.borderRadiusMedium, 0, 0),
  },

  // TODO: revisit these padding numbers for aligning the icon.
  // Padding values aren't perfect.
  // The icon doesn't align perfectly with the Figma designs.
  // It's set in a 16x16px square but the artwork is inset from that
  // so I've had to compute the numbers by handle.
  // Additionally the design uses fractional values so these are
  // rounded to the nearest integer.
  incrementButtonSmall: {
    ...shorthands.padding('3px', '5px', '0px', '5px'),
  },

  incrementButtonMedium: {
    ...shorthands.padding('4px', '5px', '1px', '5px'),
  },

  decrementButton: {
    gridColumnStart: '2',
    gridColumnEnd: '3',
    gridRowStart: '2',
    gridRowEnd: '3',
    ...shorthands.borderRadius(0, 0, tokens.borderRadiusMedium, 0),
  },

  decrementButtonSmall: {
    ...shorthands.padding('0px', '5px', '3px', '5px'),
  },

  decrementButtonMedium: {
    ...shorthands.padding('1px', '5px', '4px', '5px'),
  },

  outline: {
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

  // These designs are not yet finalized so this is copy-paste for the "outline"
  // appearance.
  underline: {
    backgroundColor: 'transparent',
    color: tokens.colorNeutralForeground3,
    ...shorthands.borderRadius(0),
    ':enabled': {
      ':hover': {
        color: tokens.colorNeutralForeground3Hover,
        backgroundColor: tokens.colorSubtleBackgroundHover,
      },
      [`:active,&.${spinButtonExtraClassNames.buttonActive}`]: {
        color: tokens.colorNeutralForeground3Pressed,
        backgroundColor: tokens.colorSubtleBackgroundPressed,
      },
    },
    ':disabled': {
      color: tokens.colorNeutralForegroundDisabled,
    },
  },
  filledDarker: {
    backgroundColor: 'transparent',
    color: tokens.colorNeutralForeground3,

    ':enabled': {
      ':hover': {
        color: tokens.colorNeutralForeground3BrandHover,
        backgroundColor: tokens.colorSubtleBackgroundHover,
      },
      [`:active,&.${spinButtonExtraClassNames.buttonActive}`]: {
        color: tokens.colorNeutralForeground3BrandPressed,
        backgroundColor: tokens.colorSubtleBackgroundPressed,
      },
    },
    ':disabled': {
      color: tokens.colorNeutralForegroundDisabled,
    },
  },
  filledLighter: {
    color: tokens.colorNeutralForeground3,
    backgroundColor: 'transparent',

    ':hover': {
      color: tokens.colorNeutralForeground3BrandHover,
      backgroundColor: tokens.colorSubtleBackgroundHover,
    },
    [`:active,&.${spinButtonExtraClassNames.buttonActive}`]: {
      color: tokens.colorNeutralForeground3BrandPressed,
      backgroundColor: tokens.colorSubtleBackgroundPressed,
    },
    ':disabled': {
      color: tokens.colorNeutralForegroundDisabled,
    },
  },

  filledIncrement: {
    clipPath: `inset(1px 1px 0 0 round 0 ${tokens.borderRadiusMedium} 0 0)`,
  },

  filledDecrement: {
    clipPath: `inset(0 1px 1px 0 round 0 0 ${tokens.borderRadiusMedium} 0)`,
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

  filledDarker: {
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

  filledLighter: {
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
  const { appearance, atBound, size } = state;
  const disabled = state.input.disabled;
  const filled = appearance.startsWith('filled');

  const rootStyles = useRootStyles();
  const buttonStyles = useButtonStyles();
  const buttonDisabledStyles = useButtonDisabledStyles();
  const inputStyles = useInputStyles();

  // Grab the root className here so we can be sure to merge is last
  const rootClassName = state.root.className;
  state.root.className = undefined;
  // Reuse react-input's styles without re-using the Input component.
  useInputStyles_unstable({
    size,
    appearance,
    input: state.input,
    root: state.root,
    components: {
      root: 'span',
      input: 'input',
      contentBefore: 'span',
      contentAfter: 'span',
    },
  });

  state.root.className = mergeClasses(
    state.root.className, // Get the classes from useInputStyles_unstable
    spinButtonClassNames.root,
    rootStyles.base,
    appearance === 'outline' && rootStyles.outline,
    appearance === 'underline' && rootStyles.underline,
    !disabled && appearance === 'outline' && rootStyles.outlineInteractive,
    !disabled && appearance === 'underline' && rootStyles.underlineInteractive,
    !disabled && filled && rootStyles.filledInteractive,
    disabled && rootStyles.disabled,
    rootClassName, // Make sure any original class name is applied last
  );

  state.incrementButton.className = mergeClasses(
    spinButtonClassNames.incrementButton,
    state.spinState === 'up' && `${spinButtonExtraClassNames.buttonActive}`,
    buttonStyles.base,
    buttonStyles.incrementButton,
    buttonStyles[appearance],
    filled && buttonStyles.filledIncrement,
    size === 'small' ? buttonStyles.incrementButtonSmall : buttonStyles.incrementButtonMedium,
    (atBound === 'max' || atBound === 'both') && buttonDisabledStyles.base,
    (atBound === 'max' || atBound === 'both') && buttonDisabledStyles[appearance],
    state.incrementButton.className,
  );
  state.decrementButton.className = mergeClasses(
    spinButtonClassNames.decrementButton,
    state.spinState === 'down' && `${spinButtonExtraClassNames.buttonActive}`,
    buttonStyles.base,
    buttonStyles.decrementButton,
    buttonStyles[appearance],
    filled && buttonStyles.filledDecrement,
    size === 'small' ? buttonStyles.decrementButtonSmall : buttonStyles.decrementButtonMedium,
    (atBound === 'min' || atBound === 'both') && buttonDisabledStyles.base,
    (atBound === 'min' || atBound === 'both') && buttonDisabledStyles[appearance],
    state.decrementButton.className,
  );

  state.input.className = mergeClasses(spinButtonClassNames.input, state.input.className, inputStyles.base);

  return state;
};
