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

// Internal CSS vars
export const progressCssVars = {
  percentageCssVar: '--fui-Progress--percentage',
  transitionCssVar: '--fui-Progress--transition',
};

const barThicknessValues = {
  default: '2px',
  large: '4px',
};

const IndeterminateProgress = {
  '0%': {
    left: '-30%',
  },
  '100%': {
    left: '100%',
  },
};

const IndeterminateProgressRTL = {
  '0%': {
    right: '-30%',
  },
  '100%': {
    right: '100%',
  },
};

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  root: {
    display: 'grid',
    ...shorthands.gap('8px', '0px'),
    width: '100%',
    ...shorthands.overflow('hidden'),
  },
});

/**
 * Styles for the title
 */
const useLabelStyles = makeStyles({
  default: {
    gridRowStart: '1',
    ...typographyStyles.body1,
    color: tokens.colorNeutralForeground1,
  },
});

/**
 * Styles for the description
 */
const useDescriptionStyles = makeStyles({
  default: {
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
  defaultHeight: {
    height: barThicknessValues.default,
  },
  largeHeight: {
    height: barThicknessValues.large,
  },
  determinate: {
    width: `var(${progressCssVars.percentageCssVar})`,
    transitionProperty: `var(${progressCssVars.transitionCssVar})`,
  },
  indeterminate: {
    width: 0,
    transitionProperty: 'width .3s ease',
    minWidth: '33%',
  },
  LTR: {
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

  RTL: {
    backgroundImage: `linear-gradient(
      to left,
      ${tokens.colorNeutralBackground6} 0%,
      ${tokens.colorCompoundBrandBackground} 50%,
      ${tokens.colorNeutralBackground6} 100%
    )`,
    animationName: IndeterminateProgressRTL,
    animationDuration: '3s',
    animationIterationCount: 'infinite',
  },
});

const useTrackStyles = makeStyles({
  base: {
    gridRowStart: '2',
    gridColumnStart: '1',
    width: '100%',
    backgroundColor: tokens.colorNeutralBackground6,

    '@media screen and (forced-colors: active)': {
      ...shorthands.borderBottom('1px', 'solid', 'CanvasText'),
    },
  },
  defaultHeight: {
    height: barThicknessValues.default,
  },
  largeHeight: {
    height: barThicknessValues.large,
  },
});

/**
 * Apply styling to the Progress slots based on the state
 */
export const useProgressStyles_unstable = (state: ProgressState): ProgressState => {
  const { determinate = false, barThickness = 'default' } = state;
  const rootStyles = useRootStyles();
  const barStyles = useBarStyles();
  const trackStyles = useTrackStyles();
  const labelStyles = useLabelStyles();
  const descriptionStyles = useDescriptionStyles();
  const { dir } = useFluent();

  state.root.className = mergeClasses(progressClassNames.root, rootStyles.root, state.root.className);

  // Determinate indicator when determinate is defined
  if (state.bar) {
    state.bar.className = mergeClasses(
      progressClassNames.bar,
      barStyles.base,
      !determinate && barStyles.indeterminate,
      !determinate && dir === 'ltr' && barStyles.LTR,
      !determinate && dir === 'rtl' && barStyles.RTL,
      barThickness === 'default' && barStyles.defaultHeight,
      barThickness === 'large' && barStyles.largeHeight,
      determinate && barStyles.determinate,
      state.bar.className,
    );
  }

  if (state.track) {
    state.track.className = mergeClasses(
      progressClassNames.track,
      trackStyles.base,
      barThickness === 'default' && trackStyles.defaultHeight,
      barThickness === 'large' && trackStyles.largeHeight,
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
  return state;
};
