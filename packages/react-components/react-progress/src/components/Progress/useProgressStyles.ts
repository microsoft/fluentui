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

// Internal CSS vars
export const progressCssVars = {
  percentageCssVar: '--fui-Progress--percentage',
};

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

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  root: {
    display: 'block',
    //rowGap: '8px',
    ...shorthands.overflow('hidden'),
    backgroundColor: tokens.colorNeutralBackground6,

    '@media screen and (forced-colors: active)': {
      ...shorthands.borderBottom('1px', 'solid', 'CanvasText'),
    },
  },
  base: {
    //gridRowStart: '2',
    //gridColumnStart: '1',
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
  },
  medium: {
    height: barThicknessValues.medium,
  },
  large: {
    height: barThicknessValues.large,
  },
  determinate: {
    width: `var(${progressCssVars.percentageCssVar})`,
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
      ${tokens.colorCompoundBrandBackground} 50%,
      ${tokens.colorNeutralBackground6} 100%
    )`,
    animationName: indeterminateProgress,
    animationDuration: '3s',
    animationIterationCount: 'infinite',
  },

  rtl: {
    animationDirection: 'reverse',
  },
});

/**
 * Apply styling to the Progress slots based on the state
 */
export const useProgressStyles_unstable = (state: ProgressState): ProgressState => {
  const { max = 1.0, thickness, value } = state;
  const rootStyles = useRootStyles();
  const barStyles = useBarStyles();
  const { dir } = useFluent();

  state.root.className = mergeClasses(
    progressClassNames.root,
    rootStyles.root,
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
      !!value && barStyles.determinate,
      !!value && value > ZERO_THRESHOLD && barStyles.nonZeroDeterminate,
      state.bar.className,
    );
  }

  if (state.bar && !!value) {
    state.bar.style = {
      [progressCssVars.percentageCssVar]: value > max ? max + '%' : Math.min(100, Math.max(0, value * 100)) + '%',
      ...state.bar.style,
    };
  }

  return state;
};
