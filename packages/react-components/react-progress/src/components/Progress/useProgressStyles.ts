import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import type { ProgressState, ProgressSlots } from './Progress.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const progressClassNames: SlotClassNames<ProgressSlots> = {
  root: 'fui-Progress',
  bar: 'fui-Progress__bar',
  track: 'fui-Progress__track',
  label: 'fui-Progress__label',
  description: 'fui-Progress__description',
};

// If the percentComplete is near 0, don't animate it.
// This prevents animations on reset to 0 scenarios.
const ZERO_THRESHOLD = 0.01;

// Internal CSS vars
export const progressCssVars = {
  percentageCssVar: '--fui-Progress--percentage',
  transitionCssVar: '--fui-Progress--transition',
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
    display: 'grid',
    ...shorthands.gap('8px', '0px'),
    ...shorthands.overflow('hidden'),
  },
});

/**
 * Styles for the title
 */
const useLabelStyles = makeStyles({
  base: {
    gridRowStart: '1',
    ...typographyStyles.body1,
    color: tokens.colorNeutralForeground1,
  },
});

/**
 * Styles for the description
 */
const useDescriptionStyles = makeStyles({
  base: {
    gridRowStart: '3',
    ...typographyStyles.caption1,
    color: tokens.colorNeutralForeground2,
  },
});

/**
 * Styles for the progress bar
 */
const useBarStyles = makeStyles({
  base: {
    gridColumnStart: '1',
    gridRowStart: '2',
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
  },
  ltr: {
    position: 'relative',
    backgroundImage: `linear-gradient(
      to right,
      ${tokens.colorNeutralBackground6} 0%,
      ${tokens.colorCompoundBrandBackground} 50%,
      ${tokens.colorNeutralBackground6} 100%
    )`,
    animationName: IndeterminateProgress,
    animationDuration: '3s',
    animationIterationCount: 'infinite',
  },

  rtl: {
    animationDirection: 'reverse',
  },
});

const useTrackStyles = makeStyles({
  base: {
    gridRowStart: '2',
    gridColumnStart: '1',
    backgroundColor: tokens.colorNeutralBackground6,

    '@media screen and (forced-colors: active)': {
      ...shorthands.borderBottom('1px', 'solid', 'CanvasText'),
    },
  },
  medium: {
    height: barThicknessValues.medium,
  },
  large: {
    height: barThicknessValues.large,
  },
});

/**
 * Apply styling to the Progress slots based on the state
 */
export const useProgressStyles_unstable = (state: ProgressState): ProgressState => {
  const { indeterminate, thickness, percentComplete } = state;
  const rootStyles = useRootStyles();
  const barStyles = useBarStyles();
  const trackStyles = useTrackStyles();
  const labelStyles = useLabelStyles();
  const descriptionStyles = useDescriptionStyles();
  const { dir } = useFluent();

  const valuePercent = !indeterminate ? Math.min(100, Math.max(0, percentComplete * 100)) : undefined;
  const progressBarStyles = {
    [`${progressCssVars.percentageCssVar}`]: !indeterminate ? valuePercent + '%' : undefined,
  };

  state.root.className = mergeClasses(progressClassNames.root, rootStyles.root, state.root.className);

  if (state.bar) {
    state.bar.className = mergeClasses(
      progressClassNames.bar,
      barStyles.base,
      indeterminate && barStyles.indeterminate,
      indeterminate && barStyles[dir],
      barStyles[thickness],
      !indeterminate && barStyles.determinate,
      !indeterminate && percentComplete > ZERO_THRESHOLD && barStyles.nonZeroDeterminate,
      state.bar.className,
    );
  }

  if (state.track) {
    state.track.className = mergeClasses(
      progressClassNames.track,
      trackStyles.base,
      trackStyles[thickness],
      state.track.className,
    );
  }

  if (state.label) {
    state.label.className = mergeClasses(progressClassNames.label, labelStyles.default, state.label.className);
  }

  if (state.description) {
    state.description.className = mergeClasses(
      progressClassNames.description,
      descriptionStyles.default,
      state.description.className,
    );
  }

  if (state.bar && !indeterminate) {
    state.bar.style = {
      [progressCssVars.percentageCssVar]:  Math.min(100, Math.max(0, percentComplete * 100)) + '%',
      ...state.bar.style,
    };
  }

  return state;
};
