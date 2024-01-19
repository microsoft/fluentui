import { makeResetStyles, makeStaticStyles, makeStyles, mergeClasses } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import type { SpinnerState, SpinnerSlots } from './Spinner.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const spinnerClassNames: SlotClassNames<SpinnerSlots> = {
  root: 'fui-Spinner',
  spinner: 'fui-Spinner__spinner',
  label: 'fui-Spinner__label',
};

const vars = {
  angle1: '--fui-Spinner--angle1',
  angle2: '--fui-Spinner--angle2',
  strokeWidth: '--fui-Spinner--strokeWidth',
};

// Register the angle CSS variables so they can be used in animations.
// This isn't supported in all browsers, but the animations are designed to fall back gracefully when not supported.
const useStaticStyles = makeStaticStyles({
  [`@property ${vars.angle1}`]: {
    syntax: '"<angle>"',
    inherits: 'true',
    initialValue: '0deg',
  },
  [`@property ${vars.angle2}`]: {
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
  position: 'relative',
  borderRadius: tokens.borderRadiusCircular,

  color: tokens.colorBrandStroke1,
  backgroundColor: tokens.colorBrandStroke2Contrast,

  maskImage:
    `radial-gradient(closest-side, ` +
    `transparent calc(100% - var(${vars.strokeWidth}) - 1px), ` +
    `white       calc(100% - var(${vars.strokeWidth})))`,

  backgroundImage:
    `conic-gradient(` +
    `transparent var(${vars.angle1}), ` +
    `currentcolor var(${vars.angle1}) var(${vars.angle2}), ` +
    `transparent var(${vars.angle2}))`,

  '@media screen and (forced-colors: active)': {
    forcedColorAdjust: 'none',
    backgroundImage:
      `conic-gradient(` +
      `HighlightText var(${vars.angle1}), ` +
      `Highlight var(${vars.angle1}) var(${vars.angle2}), ` +
      `HighlightText var(${vars.angle2}))`,
  },

  animationDuration: '1.5s, 3s',
  animationIterationCount: 'infinite',
  animationTimingFunction: `${tokens.curveEasyEase}, linear`,
  animationName: [
    {
      '0%': {
        [vars.angle1]: '0deg',
        [vars.angle2]: '0deg',
      },
      '50%': {
        [vars.angle1]: '100deg',
        [vars.angle2]: '400deg',
      },
      '100%': {
        [vars.angle1]: '400deg',
        [vars.angle2]: '400deg',
      },
    },
    {
      '0%': {
        transform: 'rotate(0deg)',
      },
      '100%': {
        transform: 'rotate(360deg)',
      },
    },
  ],

  // Provide static fallback values for browsers that don't support animating CSS vars
  // The rotation transform animation will still play, so a static quarter-circle line will rotate
  [vars.angle1]: '0deg',
  [vars.angle2]: '90deg',

  '@media screen and (prefers-reduced-motion: reduce)': {
    animationDuration: '0.01ms',
    animationIterationCount: '1',
  },
});

const useSpinnerStyles = makeStyles({
  inverted: {
    color: tokens.colorNeutralStrokeOnBrand2,
    backgroundColor: tokens.colorNeutralStrokeAlpha2,
  },

  'extra-tiny': {
    width: '16px',
    height: '16px',
    [vars.strokeWidth]: tokens.strokeWidthThick,
  },

  tiny: {
    width: '20px',
    height: '20px',
    [vars.strokeWidth]: tokens.strokeWidthThick,
  },

  'extra-small': {
    width: '24px',
    height: '24px',
    [vars.strokeWidth]: tokens.strokeWidthThick,
  },

  small: {
    width: '28px',
    height: '28px',
    [vars.strokeWidth]: tokens.strokeWidthThick,
  },

  medium: {
    width: '32px',
    height: '32px',
    [vars.strokeWidth]: tokens.strokeWidthThicker,
  },

  large: {
    width: '36px',
    height: '36px',
    [vars.strokeWidth]: tokens.strokeWidthThicker,
  },

  'extra-large': {
    width: '40px',
    height: '40px',
    [vars.strokeWidth]: tokens.strokeWidthThicker,
  },

  huge: {
    width: '44px',
    height: '44px',
    [vars.strokeWidth]: tokens.strokeWidthThickest,
  },
});

const useLabelStyles = makeStyles({
  inverted: {
    color: tokens.colorNeutralForegroundStaticInverted,
  },

  'extra-tiny': {
    ...typographyStyles.body1,
  },

  tiny: {
    ...typographyStyles.body1,
  },

  'extra-small': {
    ...typographyStyles.body1,
  },

  small: {
    ...typographyStyles.body1,
  },

  medium: {
    ...typographyStyles.subtitle2,
  },

  large: {
    ...typographyStyles.subtitle2,
  },

  'extra-large': {
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
      labelStyles[size],
      appearance === 'inverted' && labelStyles.inverted,
      state.label.className,
    );
  }

  return state;
};
