import * as React from 'react';
import {
  useSpinButton_unstable,
  renderSpinButton_unstable,
  ForwardRefComponent,
  SpinButtonProps,
  SpinButtonState,
  makeStyles,
  mergeClasses,
  shorthands,
  spinButtonClassNames,
  tokens,
  useInputStyles_unstable,
} from '@fluentui/react-components';
import { ReactSelectorTreeComponentRenderer } from '../../../shared/react/types';

const spinButtonExtraClassNames = {
  buttonActive: 'fui-SpinButton__button_active',
};

const useRootStyles = makeStyles({
  base: {
    display: 'inline-grid',
    gridTemplateColumns: `1fr 24px`,
    gridTemplateRows: '1fr 1fr',
    columnGap: tokens.spacingHorizontalXS,
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

    '::after': {
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
    '@media (forced-colors: active)': {
      ...shorthands.borderColor('GrayText'),
    },
  },

  outlineDisabled: {
    '::before': {
      ...shorthands.border('1px', 'solid', tokens.colorNeutralStrokeDisabled),
      ...shorthands.borderRadius(tokens.borderRadiusMedium), // because underline doesn't usually have a radius
    },
  },

  underlineDisabled: {
    '::before': {
      ...shorthands.borderBottom('1px', 'solid', tokens.colorTransparentStrokeDisabled),
    },
  },

  filledDisabled: {
    '::before': {
      ...shorthands.border('1px', 'solid', tokens.colorTransparentStrokeDisabled),
    },
  },
});

const useInputStyles = makeStyles({
  base: {
    gridColumnStart: '1',
    gridColumnEnd: '2',
    gridRowStart: '1',
    gridRowEnd: '3',
    outlineStyle: 'none',
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

    ':enabled:hover': {
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
  const { appearance, atBound, spinState, size } = state;
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
    filled && rootStyles.filled,
    !disabled && appearance === 'outline' && rootStyles.outlineInteractive,
    !disabled && appearance === 'underline' && rootStyles.underlineInteractive,
    !disabled && filled && rootStyles.filledInteractive,
    disabled && rootStyles.disabled,
    disabled && appearance === 'outline' && rootStyles.outlineDisabled,
    disabled && appearance === 'underline' && rootStyles.underlineDisabled,
    disabled && filled && rootStyles.filledDisabled,
    rootClassName, // Make sure any original class name is applied last
  );

  state.incrementButton.className = mergeClasses(
    spinButtonClassNames.incrementButton,
    spinState === 'up' && `${spinButtonExtraClassNames.buttonActive}`,
    buttonStyles.base,
    buttonStyles.incrementButton,
    buttonStyles[appearance],
    size === 'small' ? buttonStyles.incrementButtonSmall : buttonStyles.incrementButtonMedium,
    (atBound === 'max' || atBound === 'both') && buttonDisabledStyles.base,
    (atBound === 'max' || atBound === 'both') && buttonDisabledStyles[appearance],
    state.incrementButton.className,
  );
  state.decrementButton.className = mergeClasses(
    spinButtonClassNames.decrementButton,
    spinState === 'down' && `${spinButtonExtraClassNames.buttonActive}`,
    buttonStyles.base,
    buttonStyles.decrementButton,
    buttonStyles[appearance],
    size === 'small' ? buttonStyles.decrementButtonSmall : buttonStyles.decrementButtonMedium,
    (atBound === 'min' || atBound === 'both') && buttonDisabledStyles.base,
    (atBound === 'min' || atBound === 'both') && buttonDisabledStyles[appearance],
    state.decrementButton.className,
  );

  state.input.className = mergeClasses(spinButtonClassNames.input, state.input.className, inputStyles.base);

  return state;
};

const SpinButtonNoPseudos: ForwardRefComponent<SpinButtonProps> = React.forwardRef((props, ref) => {
  const state = useSpinButton_unstable(props, ref);

  useSpinButtonStyles_unstable(state);

  return renderSpinButton_unstable(state);
}) as ForwardRefComponent<SpinButtonProps>;

const componentRenderer: ReactSelectorTreeComponentRenderer = (node, depth, index) => {
  return <SpinButtonNoPseudos value={0} displayValue={`${node.value.name}, ${index}`} />;
};

export default componentRenderer;
