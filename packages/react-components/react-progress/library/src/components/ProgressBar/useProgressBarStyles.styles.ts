import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { ProgressBarState, ProgressBarSlots } from './ProgressBar.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const progressBarClassNames: SlotClassNames<ProgressBarSlots> = {
  root: 'fui-ProgressBar',
  bar: 'fui-ProgressBar__bar',
};

// If the percentComplete is near 0, don't animate it.
// This prevents animations on reset to 0 scenarios.
const ZERO_THRESHOLD = 0.01;

const barThicknessValues = {
  medium: '2px',
  large: '4px',
};

const indeterminateProgressBar = {
  '0%': {
    left: '-33%', // matches indeterminate bar width
  },
  '100%': {
    left: '100%',
  },
};

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  root: {
    display: 'block',
    backgroundColor: tokens.colorNeutralBackground6,
    width: '100%',
    overflow: 'hidden',

    '@media screen and (forced-colors: active)': {
      backgroundColor: 'CanvasText',
    },
  },
  rounded: {
    borderRadius: tokens.borderRadiusMedium,
  },
  square: {
    borderRadius: tokens.borderRadiusNone,
  },
  medium: {
    height: barThicknessValues.medium,
  },
  large: {
    height: barThicknessValues.large,
  },
});

/**
 * Styles for the ProgressBar bar
 */
const useBarStyles = makeStyles({
  base: {
    '@media screen and (forced-colors: active)': {
      backgroundColor: 'Highlight',
    },
    borderRadius: 'inherit',
    height: '100%',
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
    animationName: indeterminateProgressBar,
    animationDuration: '3s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    '@media screen and (prefers-reduced-motion: reduce)': {
      animationDuration: '0.01ms',
      animationIterationCount: '1',
    },
  },

  brand: {
    backgroundColor: tokens.colorCompoundBrandBackground,
  },

  error: {
    backgroundColor: tokens.colorPaletteRedBackground3,
  },
  warning: {
    backgroundColor: tokens.colorPaletteDarkOrangeBackground3,
  },
  success: {
    backgroundColor: tokens.colorPaletteGreenBackground3,
  },
});

/**
 * Apply styling to the ProgressBar slots based on the state
 */
export const useProgressBarStyles_unstable = (state: ProgressBarState): ProgressBarState => {
  'use no memo';

  const { color, max, shape, thickness, value } = state;
  const rootStyles = useRootStyles();
  const barStyles = useBarStyles();

  state.root.className = mergeClasses(
    progressBarClassNames.root,
    rootStyles.root,
    rootStyles[shape],
    rootStyles[thickness],
    state.root.className,
  );

  if (state.bar) {
    state.bar.className = mergeClasses(
      progressBarClassNames.bar,
      barStyles.base,
      barStyles.brand,
      value === undefined && barStyles.indeterminate,
      value !== undefined && value > ZERO_THRESHOLD && barStyles.nonZeroDeterminate,
      color && value !== undefined && barStyles[color],
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
