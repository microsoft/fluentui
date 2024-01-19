import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import type { SpinnerSlots, SpinnerState } from './Spinner.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const spinnerClassNames: SlotClassNames<SpinnerSlots> = {
  root: 'fui-Spinner',
  spinner: 'fui-Spinner__spinner',
  spinnerTail: 'fui-Spinner__spinnerTail',
  label: 'fui-Spinner__label',
};

/**
 * CSS variables used internally by Spinner
 */
const vars = {
  strokeWidth: '--fui-Spinner--strokeWidth',
};

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
  boxShadow: `inset 0 0 0 var(${vars.strokeWidth}) currentcolor`,
  color: tokens.colorBrandStroke2Contrast,
  '@media screen and (forced-colors: active)': {
    color: 'HighlightText',
    forcedColorAdjust: 'none',
  },

  animationDuration: '3s',
  animationIterationCount: 'infinite',
  animationTimingFunction: 'linear',
  animationName: {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },

  '@media screen and (prefers-reduced-motion: reduce)': {
    animationDuration: '0.01ms',
    animationIterationCount: '1',
  },
});

const useSpinnerTailBaseClassName = makeResetStyles({
  position: 'absolute',
  width: '100%',
  height: '100%',
  borderRadius: 'inherit',
  maskImage: 'conic-gradient(white 240deg, transparent 240deg)',
  color: tokens.colorBrandStroke1,
  '@media screen and (forced-colors: active)': {
    color: 'Highlight',
    forcedColorAdjust: 'none',
  },

  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 'inherit',
    maskImage: 'conic-gradient(transparent 240deg, white 240deg)',
    boxShadow: `inset 0 0 0 var(${vars.strokeWidth}) currentcolor`,
    animation: 'inherit',
  },

  animationDuration: '1.5s',
  animationIterationCount: 'infinite',
  animationTimingFunction: tokens.curveEasyEase,

  animationName: {
    '0%': { transform: 'rotate(0deg)' },
    '40%, 50%': { transform: 'rotate(120deg)' },
    '85%, 100%': { transform: 'rotate(360deg)' },
  },
  '&::before': {
    animationName: {
      '0%': { transform: 'rotate(0deg)' },
      '40%, 50%': { transform: 'rotate(120deg)' },
      '85%, 100%': { transform: 'rotate(0deg)' },
    },
  },
  '&::after': {
    animationName: {
      '0%': { transform: 'rotate(0deg)' },
      '40%, 50%': { transform: 'rotate(240deg)' },
      '85%, 100%': { transform: 'rotate(0deg)' },
    },
  },

  '@media screen and (prefers-reduced-motion: reduce)': {
    animationDuration: '0.01ms',
    animationIterationCount: '1',
  },
});

const useSpinnerStyles = makeStyles({
  inverted: {
    color: tokens.colorNeutralStrokeAlpha2,
  },

  invertedTail: {
    color: tokens.colorNeutralStrokeOnBrand2,
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
    height: '32px',
    width: '32px',
    [vars.strokeWidth]: tokens.strokeWidthThicker,
  },

  large: {
    height: '36px',
    width: '36px',
    [vars.strokeWidth]: tokens.strokeWidthThicker,
  },

  'extra-large': {
    height: '40px',
    width: '40px',
    [vars.strokeWidth]: tokens.strokeWidthThicker,
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

  const rootBaseClassName = useRootBaseClassName();
  const rootStyles = useRootStyles();
  const spinnerBaseClassName = useSpinnerBaseClassName();
  const spinnerStyles = useSpinnerStyles();
  const spinnerTailBaseClassName = useSpinnerTailBaseClassName();
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
    state.spinnerTail.className = mergeClasses(
      spinnerClassNames.spinnerTail,
      spinnerTailBaseClassName,
      appearance === 'inverted' && spinnerStyles.invertedTail,
      state.spinnerTail.className,
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
