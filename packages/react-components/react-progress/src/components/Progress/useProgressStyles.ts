import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import type { ProgressState, ProgressSlots } from './Progress.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const progressClassNames: SlotClassNames<ProgressSlots> = {
  root: 'fui-Progress',
  indicator: 'fui-Progress__indicator',
  label: 'fui-Progress__label',
  description: 'fui-Progress__description',
};

// Internal variables
const progressBarColor = tokens.colorBrandStroke1;
const progressBarGradientColor = tokens.colorNeutralStrokeOnBrand2;

// Internal CSS vars
export const progressCssVars = {
  percentageCssVar: '--fui-Progress--percentage',
  transitionCssVar: '--fui-Progress--transition',
};

const IndeterminateProgress = {
  '0%': {
    left: '-30%',
  },
  '100%': {
    left: '100%',
  },
};
const bar = '2px';

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
    display: 'block',
    alignItems: 'center',
    justifyContent: 'center',
    ...shorthands.gap('8px 0px'),
  },
});

/**
 * Styles for the title
 */
const useLabelStyles = makeStyles({
  default: {
    ...typographyStyles.subtitle2,
  },
});

/**
 * Styles for the description
 */
const useDescriptionStyles = makeStyles({
  default: {
    ...typographyStyles.body1,
    fontSize: '12px',
  },
});

/**
 * Styles for the progress bar
 */
const useIndicatorStyles = makeStyles({
  determinate: {
    width: '100%',
    ['& > div.fui-Progress__Container']: {
      position: 'relative',
      ...shorthands.overflow('hidden'),
      height: bar,
      ...shorthands.padding('8px'),

      ['& > div.fui-Progress__Track']: {
        position: 'absolute',
        width: '100%',
        height: bar,
        backgroundColor: tokens.colorNeutralBackground1,

        '@media screen and (forced-colors: active)': {
          ...shorthands.borderBottom('1px', 'solid', 'CanvasText'),
        },
      },

      ['& > div.fui-Progress__Bar']: {
        backgroundColor: progressBarColor,
        height: bar,
        position: 'absolute',
        width: `var(${progressCssVars.percentageCssVar})`,
        transitionProperty: `var(${progressCssVars.transitionCssVar})`,

        '@media screen and (forced-colors: active)': {
          backgroundColor: 'Highlight',
        },
      },
    },
  },
  indeterminateLTR: {
    width: '100%',
    ['& > div.fui-Progress__Container']: {
      position: 'relative',
      ...shorthands.overflow('hidden'),
      height: bar,
      ...shorthands.padding('8px'),

      ['& > div.fui-Progress__Track']: {
        position: 'absolute',
        width: '100%',
        height: bar,
        backgroundColor: tokens.colorNeutralBackground1,

        '@media (forced-colors: active)': {
          ...shorthands.borderBottom('1px', 'solid', 'CanvasText'),
        },
      },

      ['& > div.fui-Progress__Bar']: {
        height: bar,
        position: 'absolute',
        width: 0,
        transitionProperty: 'width .3s ease',
        minWidth: '33%',
        backgroundImage: `linear-gradient(
          to right,
          ${progressBarGradientColor} 0%,
          ${progressBarColor} 50%,
          ${progressBarGradientColor} 100%
        )`,
        animationName: IndeterminateProgress,
        animationDuration: '3s',
        animationIterationCount: 'infinite',

        '@media (forced-colors: active)': {
          backgroundColor: 'Highlight',
        },
      },
    },
  },
  indeterminateRTL: {
    width: '100%',
    ['& > div.fui-Progress__Container']: {
      position: 'relative',
      ...shorthands.overflow('hidden'),
      height: bar,
      ...shorthands.padding('8px'),

      ['& > div.fui-Progress__Track']: {
        position: 'absolute',
        width: '100%',
        height: bar,
        backgroundColor: tokens.colorNeutralBackground1,

        '@media screen and (forced-colors: active)': {
          ...shorthands.borderBottom('1px', 'solid', 'CanvasText'),
        },
      },

      ['& > div.fui-Progress__Bar']: {
        height: bar,
        position: 'absolute',
        width: 0,
        transitionProperty: 'width .3s ease',
        minWidth: '33%',
        backgroundImage: `linear-gradient(
          to left,
          ${progressBarGradientColor} 0%,
          ${progressBarColor} 50%,
          ${progressBarGradientColor} 100%
        )`,
        animationName: IndeterminateProgressRTL,
        animationDuration: '3s',
        animationIterationCount: 'infinite',

        '@media screen and (forced-colors: active)': {
          backgroundColor: 'Highlight',
        },
      },
    },
  },
});

/**
 * Apply styling to the Progress slots based on the state
 */
export const useProgressStyles_unstable = (state: ProgressState): ProgressState => {
  const { percentComplete } = state;
  const rootStyles = useRootStyles();
  const indicatorStyles = useIndicatorStyles();
  const labelStyles = useLabelStyles();
  const descriptionStyles = useDescriptionStyles();
  const { dir } = useFluent();

  state.root.className = mergeClasses(progressClassNames.root, rootStyles.root, state.root.className);

  // Determinate indicator when percentComplete is defined
  if (state.indicator && !!percentComplete) {
    state.indicator.className = mergeClasses(
      progressClassNames.indicator,
      percentComplete < 0 && dir === 'ltr' && indicatorStyles.indeterminateLTR,
      percentComplete < 0 && dir === 'rtl' && indicatorStyles.indeterminateRTL,
      percentComplete >= 0 && indicatorStyles.determinate,
      state.indicator.className,
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
