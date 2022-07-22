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
const progressBarColorPrimary = tokens.colorBrandStroke1;
const progressBarGradientColorPrimary = tokens.colorNeutralStrokeOnBrand2;

const progressTrackColor = tokens.colorNeutralBackground1;

const progressBarColorInverted = tokens.colorNeutralBackgroundInverted;
const progressBarGradientColorInverted = tokens.colorNeutralStrokeOnBrand2;

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
const useIndicatorStylesPrimary = makeStyles({
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
        backgroundColor: progressTrackColor,

        '@media screen and (forced-colors: active)': {
          ...shorthands.borderBottom('1px', 'solid', 'CanvasText'),
        },
      },

      ['& > div.fui-Progress__Bar']: {
        backgroundColor: progressBarColorPrimary,
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
        backgroundColor: progressTrackColor,

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
          ${progressBarGradientColorPrimary} 0%,
          ${progressBarColorPrimary} 50%,
          ${progressBarGradientColorPrimary} 100%
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
        backgroundColor: progressTrackColor,

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
          ${progressBarGradientColorPrimary} 0%,
          ${progressBarColorPrimary} 50%,
          ${progressBarGradientColorPrimary} 100%
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

const useIndicatorStylesInverted = makeStyles({
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
        backgroundColor: progressTrackColor,

        '@media screen and (forced-colors: active)': {
          ...shorthands.borderBottom('1px', 'solid', 'CanvasText'),
        },
      },

      ['& > div.fui-Progress__Bar']: {
        backgroundColor: progressBarColorInverted,
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
        backgroundColor: progressTrackColor,

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
          ${progressBarGradientColorInverted} 0%,
          ${progressBarColorInverted} 50%,
          ${progressBarGradientColorInverted} 100%
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
        backgroundColor: progressTrackColor,

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
          ${progressBarGradientColorInverted} 0%,
          ${progressBarColorInverted} 50%,
          ${progressBarGradientColorInverted} 100%
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
  const { appearance, percentComplete } = state;
  const rootStyles = useRootStyles();
  const indicatorStylesPrimary = useIndicatorStylesPrimary();
  const indicatorStylesInverted = useIndicatorStylesInverted();
  const labelStyles = useLabelStyles();
  const descriptionStyles = useDescriptionStyles();
  const { dir } = useFluent();

  state.root.className = mergeClasses(progressClassNames.root, rootStyles.root, state.root.className);

  // Determinate indicator when percentComplete is defined
  if (state.indicator && !!percentComplete) {
    state.indicator.className = mergeClasses(
      progressClassNames.indicator,
      appearance === 'primary' && percentComplete < 0 && dir === 'ltr' && indicatorStylesPrimary.indeterminateLTR,
      appearance === 'primary' && percentComplete < 0 && dir === 'rtl' && indicatorStylesPrimary.indeterminateRTL,
      appearance === 'primary' && percentComplete >= 0 && indicatorStylesPrimary.determinate,
      appearance === 'inverted' && percentComplete < 0 && dir === 'ltr' && indicatorStylesInverted.indeterminateLTR,
      appearance === 'inverted' && percentComplete < 0 && dir === 'rtl' && indicatorStylesInverted.indeterminateRTL,
      appearance === 'inverted' && percentComplete >= 0 && indicatorStylesInverted.determinate,
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
