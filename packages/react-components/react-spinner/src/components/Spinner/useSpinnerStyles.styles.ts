import { makeResetStyles, makeStaticStyles, makeStyles, mergeClasses } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import type { SpinnerState, SpinnerSlots } from './Spinner.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const spinnerClassNames: SlotClassNames<SpinnerSlots> = {
  root: 'fui-Spinner',
  spinner: 'fui-Spinner__spinner',
  label: 'fui-Spinner__label',
};

// CSS variables used internally by Spinner
const vars = {
  tailStart: '--fui-Spinner--tailStart',
  tailEnd: '--fui-Spinner--tailEnd',
  strokeWidth: '--fui-Spinner--strokeWidth',
};

// Register the angle CSS variables so they can be used in animations.
// This isn't supported in all browsers, but the animations are designed to fall back gracefully when not supported.
const useStaticStyles = makeStaticStyles({
  [`@property ${vars.tailStart}`]: {
    syntax: '"<angle>"',
    inherits: 'true',
    initialValue: '0deg',
  },
  [`@property ${vars.tailEnd}`]: {
    syntax: '"<angle>"',
    inherits: 'true',
    initialValue: '0deg',
  },
});

const useRootBaseClassName = makeResetStyles({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: '0',
  gap: '8px',
});

const useRootStyles = makeStyles({
  vertical: {
    flexDirection: 'column',
  },
});

const useSpinnerBaseClassName = makeResetStyles({
  height: '32px',
  width: '32px',
  [vars.strokeWidth]: tokens.strokeWidthThicker,

  backgroundColor: tokens.colorBrandStroke2Contrast,
  color: tokens.colorBrandStroke1,

  '@media screen and (forced-colors: active)': {
    backgroundColor: 'HighlightText',
    color: 'Highlight',
    forcedColorAdjust: 'none',
  },

  // The spinner is a donut shape: make it circular with borderRadius and cut out the center with maskImage
  borderRadius: tokens.borderRadiusCircular,
  maskImage:
    `radial-gradient(closest-side, ` +
    `transparent calc(100% - var(${vars.strokeWidth}) - 1px), ` +
    `white       calc(100% - var(${vars.strokeWidth})))`,

  // This conic-gradient draws the spinner tail as a section between the tailStart and tailEnd angles
  backgroundImage:
    `conic-gradient(` +
    `transparent  var(${vars.tailStart}), ` +
    `currentcolor var(${vars.tailStart}) var(${vars.tailEnd}), ` +
    `transparent  var(${vars.tailEnd}))`,

  animationName: [
    // Animate the length of the spinner tail with a 1.5s easyEase animation
    {
      '0%': {
        [vars.tailStart]: '0deg',
        [vars.tailEnd]: '0deg',
      },
      '50%': {
        [vars.tailStart]: '100deg',
        [vars.tailEnd]: '400deg',
      },
      '100%': {
        [vars.tailStart]: '400deg',
        [vars.tailEnd]: '400deg',
      },
    },
    // Animate the rotation of the entire spinner with a 3s linear animation
    {
      '0%': {
        transform: 'rotate(0deg)',
      },
      '100%': {
        transform: 'rotate(360deg)',
      },
    },
  ],
  animationDuration: '1.5s, 3s',
  animationTimingFunction: `${tokens.curveEasyEase}, linear`,
  animationIterationCount: 'infinite',

  '@media screen and (prefers-reduced-motion: reduce)': {
    animationDuration: '0.01ms',
    animationIterationCount: '1',
  },

  // Provide static fallback values for browsers that don't support animating CSS vars
  // The rotation transform animation will still play, so a static quarter-circle line will rotate
  [vars.tailStart]: '0deg',
  [vars.tailEnd]: '90deg',
});

const useSpinnerStyles = makeStyles({
  inverted: {
    color: tokens.colorNeutralStrokeOnBrand2,
    backgroundColor: tokens.colorNeutralStrokeAlpha2,
  },

  'extra-tiny': {
    height: '16px',
    width: '16px',
    [vars.strokeWidth]: tokens.strokeWidthThick,
  },

  tiny: {
    height: '20px',
    width: '20px',
    [vars.strokeWidth]: tokens.strokeWidthThick,
  },

  'extra-small': {
    height: '24px',
    width: '24px',
    [vars.strokeWidth]: tokens.strokeWidthThick,
  },

  small: {
    height: '28px',
    width: '28px',
    [vars.strokeWidth]: tokens.strokeWidthThick,
  },

  medium: {
    // size and strokeWidth set in useSpinnerBaseClassName
  },

  large: {
    height: '36px',
    width: '36px',
    // strokeWidth set in useSpinnerBaseClassName
  },

  'extra-large': {
    height: '40px',
    width: '40px',
    // strokeWidth set in useSpinnerBaseClassName
  },

  huge: {
    height: '44px',
    width: '44px',
    [vars.strokeWidth]: tokens.strokeWidthThickest,
  },
});

const useLabelStyles = makeStyles({
  inverted: {
    color: tokens.colorNeutralForegroundStaticInverted,
  },

  mediumToExtraLarge: {
    ...typographyStyles.subtitle2,
  },

  huge: {
    ...typographyStyles.subtitle1,
  },
});

/**
 * Apply styling to the Spinner slots based on the state
 */
export const useSpinnerStyles_unstable = (state: SpinnerState): SpinnerState => {
  const { labelPosition, size, appearance } = state;

  useStaticStyles();
  const rootBaseClassName = useRootBaseClassName();
  const rootStyles = useRootStyles();
  const spinnerBaseClassName = useSpinnerBaseClassName();
  const spinnerStyles = useSpinnerStyles();
  const labelStyles = useLabelStyles();

  state.root.className = mergeClasses(
    spinnerClassNames.root,
    rootBaseClassName,
    (labelPosition === 'above' || labelPosition === 'below') && rootStyles.vertical,
    state.root.className,
  );
  if (state.spinner) {
    state.spinner.className = mergeClasses(
      spinnerClassNames.spinner,
      spinnerBaseClassName,
      spinnerStyles[size],
      appearance === 'inverted' && spinnerStyles.inverted,
      state.spinner.className,
    );
  }
  if (state.label) {
    state.label.className = mergeClasses(
      spinnerClassNames.label,
      (size === 'medium' || size === 'large' || size === 'extra-large') && labelStyles.mediumToExtraLarge,
      size === 'huge' && labelStyles.huge,
      appearance === 'inverted' && labelStyles.inverted,
      state.label.className,
    );
  }

  return state;
};
