import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import type { ProgressState, ProgressSlots } from './Progress.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const progressClassNames: SlotClassNames<ProgressSlots> = {
  root: 'fui-Progress',
  bar: 'fui-Progress__bar',
};

// If the percentComplete is near 0, don't animate it.
// This prevents animations on reset to 0 scenarios.
const ZERO_THRESHOLD = 0.01;

const barThicknessValues = {
  medium: '2px',
  large: '4px',
};

const indeterminateProgress = {
  '0%': {
    left: '0%',
  },
  '100%': {
    left: '100%',
  },
};
const indeterminateProgressRTL = {
  '100%': {
    right: '-100%',
  },
  '0%': {
    right: '100%',
  },
};

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  root: {
    display: 'block',
    backgroundColor: tokens.colorNeutralBackground6,
    justifySelf: 'stretch',
    ...shorthands.overflow('hidden'),

    '@media screen and (forced-colors: active)': {
      ...shorthands.borderBottom('1px', 'solid', 'CanvasText'),
    },
  },
  rounded: {
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  rectangular: {
    ...shorthands.borderRadius(tokens.borderRadiusNone),
  },
  medium: {
    height: barThicknessValues.medium,
  },
  large: {
    height: barThicknessValues.large,
  },
});

/**
 * Styles for the progress bar
 */
const useBarStyles = makeStyles({
  base: {
    backgroundColor: tokens.colorCompoundBrandBackground,

    '@media screen and (forced-colors: active)': {
      backgroundColor: 'Highlight',
    },
    ...shorthands.borderRadius('inherit'),
  },
  medium: {
    height: barThicknessValues.medium,
  },
  large: {
    height: barThicknessValues.large,
  },
  nonZeroDeterminate: {
    transitionProperty: 'width',
    transitionDuration: '0.3s',
    transitionTimingFunction: 'ease',
  },
  indeterminate: {
    maxWidth: '33%',
    position: 'relative',
    backgroundImage: `linear-gradient(
      to right,
      ${tokens.colorNeutralBackground6} 0%,
      ${tokens.colorTransparentBackground} 50%,
      ${tokens.colorNeutralBackground6} 100%
    )`,
    animationName: indeterminateProgress,
    animationDuration: '3s',
    animationIterationCount: 'infinite',
  },

  rtl: {
    animationName: indeterminateProgressRTL,
  },

  error: {
    backgroundColor: tokens.colorPaletteRedForeground1,
  },
  warning: {
    backgroundColor: tokens.colorPaletteDarkOrangeForeground1,
  },
  success: {
    backgroundColor: tokens.colorPaletteGreenForeground1,
  },
});

/**
 * Apply styling to the Progress slots based on the state
 */
export const useProgressStyles_unstable = (state: ProgressState): ProgressState => {
  const { max, shape, thickness, validationState, value } = state;
  const rootStyles = useRootStyles();
  const barStyles = useBarStyles();
  const { dir } = useFluent();

  state.root.className = mergeClasses(
    progressClassNames.root,
    rootStyles.root,
    rootStyles[shape],
    rootStyles[thickness],
    state.root.className,
  );

  if (state.bar) {
    state.bar.className = mergeClasses(
      progressClassNames.bar,
      barStyles.base,
      value === undefined && barStyles.indeterminate,
      value === undefined && dir === 'rtl' && barStyles.rtl,
      barStyles[thickness],
      value !== undefined && value > ZERO_THRESHOLD && barStyles.nonZeroDeterminate,
      validationState && barStyles[validationState],
      state.bar.className,
    );
  }

  if (state.bar && value !== undefined) {
    state.bar.style = {
      width: Math.min(100, Math.max(0, (value / max) * 100)) + '%',
      ...state.bar.style,
    };
  }

  return state;
};
