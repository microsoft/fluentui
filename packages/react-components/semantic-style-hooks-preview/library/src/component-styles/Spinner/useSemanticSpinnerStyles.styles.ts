import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { tokens } from '@fluentui/react-theme';
import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { spinnerClassNames, type SpinnerState } from '@fluentui/react-spinner';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

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
  gap: semanticTokens.gapInsideCtrlToLabel,
  overflow: 'hidden', // prevents height changes from rotating children
});

const useRootStyles = makeStyles({
  vertical: {
    flexDirection: 'column',
  },
});

const useSpinnerBaseClassName = makeResetStyles({
  position: 'relative',
  flexShrink: 0,

  // Use a mask to create the ring shape of the spinner.
  maskImage:
    `radial-gradient(closest-side, ` +
    `transparent calc(100% - var(${vars.strokeWidth}) - 1px), ` +
    `white calc(100% - var(${vars.strokeWidth})) calc(100% - 1px), ` +
    `transparent 100%)`,

  backgroundColor: semanticTokens._ctrlSpinnerBackgroundEmpty,

  color: semanticTokens._ctrlSpinnerBackgroundFilled,
  '@media screen and (forced-colors: active)': {
    backgroundColor: 'HighlightText',
    color: 'Highlight',
    forcedColorAdjust: 'none',
  },

  animationDuration: '1.5s',
  animationIterationCount: 'infinite',
  animationTimingFunction: 'linear',
  animationName: {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },

  '@media screen and (prefers-reduced-motion: reduce)': {
    animationDuration: '1.8s',
  },
});

// The spinner tail is rendered using two 135deg arc segments, behind a 105deg arc mask.
// The segments are rotated out from behind the mask to expand the visible arc from
// 30deg (min) to 255deg (max), and then back behind the mask again to shrink the arc.
// The tail and spinner itself also have 360deg rotation animations for the spin.
const useSpinnerTailBaseClassName = makeResetStyles({
  position: 'absolute',
  display: 'block',
  width: '100%',
  height: '100%',
  maskImage: 'conic-gradient(transparent 105deg, white 105deg)',

  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    display: 'block',
    width: '100%',
    height: '100%',
    animation: 'inherit',
    backgroundImage: 'conic-gradient(currentcolor 135deg, transparent 135deg)',
  },

  animationDuration: '1.5s',
  animationIterationCount: 'infinite',
  animationTimingFunction: tokens.curveEasyEase,
  animationName: {
    '0%': { transform: 'rotate(-135deg)' },
    '50%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(225deg)' },
  },
  '&::before': {
    animationName: {
      '0%': { transform: 'rotate(0deg)' },
      '50%': { transform: 'rotate(105deg)' },
      '100%': { transform: 'rotate(0deg)' },
    },
  },
  '&::after': {
    animationName: {
      '0%': { transform: 'rotate(0deg)' },
      '50%': { transform: 'rotate(225deg)' },
      '100%': { transform: 'rotate(0deg)' },
    },
  },
  '@media screen and (prefers-reduced-motion: reduce)': {
    animationIterationCount: '0',
    backgroundImage: 'conic-gradient(transparent 120deg, currentcolor 360deg)',
    '&::before, &::after': {
      content: 'none',
    },
  },
});

const useSpinnerStyles = makeStyles({
  inverted: {
    backgroundColor: tokens.colorNeutralStrokeAlpha2,
    color: tokens.colorNeutralStrokeOnBrand2,
  },

  rtlTail: {
    maskImage: 'conic-gradient(white 255deg, transparent 255deg)',
    '&::before, &::after': {
      backgroundImage: 'conic-gradient(transparent 225deg, currentcolor 225deg)',
    },
    '@media screen and (prefers-reduced-motion: reduce)': {
      backgroundImage: 'conic-gradient(currentcolor 0deg, transparent 240deg)',
    },
  },

  'extra-tiny': {
    height: '16px',
    width: '16px',
    [vars.strokeWidth]: semanticTokens._ctrlSpinnerStrokeSmWidth,
  },

  tiny: {
    height: '20px',
    width: '20px',
    [vars.strokeWidth]: semanticTokens._ctrlSpinnerStrokeSmWidth,
  },

  'extra-small': {
    height: '24px',
    width: '24px',
    [vars.strokeWidth]: semanticTokens._ctrlSpinnerStrokeSmWidth,
  },

  small: {
    height: '28px',
    width: '28px',
    [vars.strokeWidth]: semanticTokens._ctrlSpinnerStrokeSmWidth,
  },

  medium: {
    height: '32px',
    width: '32px',
    [vars.strokeWidth]: semanticTokens.ctrlSpinnerStrokeWidth,
  },

  large: {
    height: '36px',
    width: '36px',
    [vars.strokeWidth]: semanticTokens.ctrlSpinnerStrokeWidth,
  },

  'extra-large': {
    height: '40px',
    width: '40px',
    [vars.strokeWidth]: semanticTokens.ctrlSpinnerStrokeWidth,
  },

  huge: {
    height: '44px',
    width: '44px',
    [vars.strokeWidth]: semanticTokens._ctrlSpinnerStrokeLgWidth,
  },
});

const useLabelStyles = makeStyles({
  default: {
    color: semanticTokens.foregroundContentNeutralPrimary,
    fontFamily: semanticTokens.textStyleDefaultRegularFontFamily,
    fontWeight: semanticTokens.textStyleDefaultRegularWeight,
  },
  inverted: {
    color: tokens.colorNeutralForegroundStaticInverted,
  },

  'extra-tiny': {
    fontSize: semanticTokens.textGlobalBody3FontSize,
    lineHeight: semanticTokens.textGlobalBody3LineHeight,
  },

  tiny: {
    fontSize: semanticTokens.textGlobalBody3FontSize,
    lineHeight: semanticTokens.textGlobalBody3LineHeight,
  },

  'extra-small': {
    fontSize: semanticTokens.textGlobalBody3FontSize,
    lineHeight: semanticTokens.textGlobalBody3LineHeight,
  },

  small: {
    fontSize: semanticTokens.textGlobalBody3FontSize,
    lineHeight: semanticTokens.textGlobalBody3LineHeight,
  },

  medium: {
    fontSize: semanticTokens._ctrlSpinnerItemBodyFontSize,
    fontWeight: semanticTokens._ctrlSpinnerTextStyleRegularWeight,
    lineHeight: semanticTokens._ctrlSpinnerItemBodyLineHeight,
  },

  large: {
    fontSize: semanticTokens.textRampLgItemBodyFontSize,
    fontWeight: semanticTokens.textStyleDefaultHeaderWeight,
    lineHeight: semanticTokens.textRampLgItemBodyLineHeight,
  },

  'extra-large': {
    fontSize: semanticTokens.textRampLgItemBodyFontSize,
    fontWeight: semanticTokens.textStyleDefaultHeaderWeight,
    lineHeight: semanticTokens.textRampLgItemBodyLineHeight,
  },

  huge: {
    fontSize: semanticTokens.textGlobalBody1FontSize,
    fontWeight: semanticTokens.textStyleDefaultHeaderWeight,
    lineHeight: semanticTokens.textGlobalBody1LineHeight,
  },
});

/**
 * Apply styling to the Spinner slots based on the state
 */
export const useSemanticSpinnerStyles = (_state: unknown): SpinnerState => {
  'use no memo';

  const state = _state as SpinnerState;

  const { labelPosition, size, appearance } = state;
  const { dir } = useFluent();

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
    getSlotClassNameProp_unstable(state.root),
  );
  if (state.spinner) {
    state.spinner.className = mergeClasses(
      spinnerClassNames.spinner,
      spinnerBaseClassName,
      spinnerStyles[size],
      appearance === 'inverted' && spinnerStyles.inverted,
      state.spinner.className,
      getSlotClassNameProp_unstable(state.spinner),
    );
  }
  if (state.spinnerTail) {
    state.spinnerTail.className = mergeClasses(
      spinnerClassNames.spinnerTail,
      spinnerTailBaseClassName,
      dir === 'rtl' && spinnerStyles.rtlTail,
      state.spinnerTail.className,
      getSlotClassNameProp_unstable(state.spinnerTail),
    );
  }
  if (state.label) {
    state.label.className = mergeClasses(
      spinnerClassNames.label,
      labelStyles.default,
      labelStyles[size],
      appearance === 'inverted' && labelStyles.inverted,
      state.label.className,
      getSlotClassNameProp_unstable(state.label),
    );
  }

  return state;
};
