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
const progressBarColorPrimary = tokens.colorCompoundBrandBackground;
const progressBarGradientColorPrimary = tokens.colorNeutralBackground6;

const progressTrackColor = tokens.colorNeutralBackground6;

const progressBarColorInverted = tokens.colorNeutralBackgroundInverted;
const progressBarGradientColorInverted = tokens.colorNeutralStrokeOnBrand2;

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
  determinateDefault: {
    width: '100%',
    ['& > div.fui-Progress__Container']: {
      position: 'relative',
      ...shorthands.overflow('hidden'),
      height: barThicknessValues.default,
      ...shorthands.padding('8px'),

      ['& > div.fui-Progress__Track']: {
        position: 'absolute',
        width: '100%',
        height: barThicknessValues.default,
        backgroundColor: progressTrackColor,

        '@media screen and (forced-colors: active)': {
          ...shorthands.borderBottom('1px', 'solid', 'CanvasText'),
        },
      },

      ['& > div.fui-Progress__Bar']: {
        backgroundColor: progressBarColorPrimary,
        height: barThicknessValues.default,
        position: 'absolute',
        width: `var(${progressCssVars.percentageCssVar})`,
        transitionProperty: `var(${progressCssVars.transitionCssVar})`,

        '@media screen and (forced-colors: active)': {
          backgroundColor: 'Highlight',
        },
      },
    },
  },
  determinateLarge: {
    width: '100%',
    ['& > div.fui-Progress__Container']: {
      position: 'relative',
      ...shorthands.overflow('hidden'),
      height: barThicknessValues.large,
      ...shorthands.padding('8px'),

      ['& > div.fui-Progress__Track']: {
        position: 'absolute',
        width: '100%',
        height: barThicknessValues.large,
        backgroundColor: progressTrackColor,

        '@media screen and (forced-colors: active)': {
          ...shorthands.borderBottom('1px', 'solid', 'CanvasText'),
        },
      },

      ['& > div.fui-Progress__Bar']: {
        backgroundColor: progressBarColorPrimary,
        height: barThicknessValues.large,
        position: 'absolute',
        width: `var(${progressCssVars.percentageCssVar})`,
        transitionProperty: `var(${progressCssVars.transitionCssVar})`,

        '@media screen and (forced-colors: active)': {
          backgroundColor: 'Highlight',
        },
      },
    },
  },
  indeterminateLTRDefault: {
    width: '100%',
    ['& > div.fui-Progress__Container']: {
      position: 'relative',
      ...shorthands.overflow('hidden'),
      height: barThicknessValues.default,
      ...shorthands.padding('8px'),

      ['& > div.fui-Progress__Track']: {
        position: 'absolute',
        width: '100%',
        height: barThicknessValues.default,
        backgroundColor: progressTrackColor,

        '@media (forced-colors: active)': {
          ...shorthands.borderBottom('1px', 'solid', 'CanvasText'),
        },
      },

      ['& > div.fui-Progress__Bar']: {
        height: barThicknessValues.default,
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
  indeterminateLTRLarge: {
    width: '100%',
    ['& > div.fui-Progress__Container']: {
      position: 'relative',
      ...shorthands.overflow('hidden'),
      height: barThicknessValues.large,
      ...shorthands.padding('8px'),

      ['& > div.fui-Progress__Track']: {
        position: 'absolute',
        width: '100%',
        height: barThicknessValues.large,
        backgroundColor: progressTrackColor,

        '@media (forced-colors: active)': {
          ...shorthands.borderBottom('1px', 'solid', 'CanvasText'),
        },
      },

      ['& > div.fui-Progress__Bar']: {
        height: barThicknessValues.large,
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
  indeterminateRTLDefault: {
    width: '100%',
    ['& > div.fui-Progress__Container']: {
      position: 'relative',
      ...shorthands.overflow('hidden'),
      height: barThicknessValues.default,
      ...shorthands.padding('8px'),

      ['& > div.fui-Progress__Track']: {
        position: 'absolute',
        width: '100%',
        height: barThicknessValues.default,
        backgroundColor: progressTrackColor,

        '@media screen and (forced-colors: active)': {
          ...shorthands.borderBottom('1px', 'solid', 'CanvasText'),
        },
      },

      ['& > div.fui-Progress__Bar']: {
        height: barThicknessValues.default,
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
  indeterminateRTLLarge: {
    width: '100%',
    ['& > div.fui-Progress__Container']: {
      position: 'relative',
      ...shorthands.overflow('hidden'),
      height: barThicknessValues.large,
      ...shorthands.padding('8px'),

      ['& > div.fui-Progress__Track']: {
        position: 'absolute',
        width: '100%',
        height: barThicknessValues.large,
        backgroundColor: progressTrackColor,

        '@media screen and (forced-colors: active)': {
          ...shorthands.borderBottom('1px', 'solid', 'CanvasText'),
        },
      },

      ['& > div.fui-Progress__Bar']: {
        height: barThicknessValues.large,
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
  determinateDefault: {
    width: '100%',
    ['& > div.fui-Progress__Container']: {
      position: 'relative',
      ...shorthands.overflow('hidden'),
      height: barThicknessValues.default,
      ...shorthands.padding('8px'),

      ['& > div.fui-Progress__Track']: {
        position: 'absolute',
        width: '100%',
        height: barThicknessValues.default,
        backgroundColor: progressTrackColor,

        '@media screen and (forced-colors: active)': {
          ...shorthands.borderBottom('1px', 'solid', 'CanvasText'),
        },
      },

      ['& > div.fui-Progress__Bar']: {
        backgroundColor: progressBarColorInverted,
        height: barThicknessValues.default,
        position: 'absolute',
        width: `var(${progressCssVars.percentageCssVar})`,
        transitionProperty: `var(${progressCssVars.transitionCssVar})`,

        '@media screen and (forced-colors: active)': {
          backgroundColor: 'Highlight',
        },
      },
    },
  },
  determinateLarge: {
    width: '100%',
    ['& > div.fui-Progress__Container']: {
      position: 'relative',
      ...shorthands.overflow('hidden'),
      height: barThicknessValues.large,
      ...shorthands.padding('8px'),

      ['& > div.fui-Progress__Track']: {
        position: 'absolute',
        width: '100%',
        height: barThicknessValues.large,
        backgroundColor: progressTrackColor,

        '@media screen and (forced-colors: active)': {
          ...shorthands.borderBottom('1px', 'solid', 'CanvasText'),
        },
      },

      ['& > div.fui-Progress__Bar']: {
        backgroundColor: progressBarColorInverted,
        height: barThicknessValues.large,
        position: 'absolute',
        width: `var(${progressCssVars.percentageCssVar})`,
        transitionProperty: `var(${progressCssVars.transitionCssVar})`,

        '@media screen and (forced-colors: active)': {
          backgroundColor: 'Highlight',
        },
      },
    },
  },
  indeterminateLTRDefault: {
    width: '100%',
    ['& > div.fui-Progress__Container']: {
      position: 'relative',
      ...shorthands.overflow('hidden'),
      height: barThicknessValues.default,
      ...shorthands.padding('8px'),

      ['& > div.fui-Progress__Track']: {
        position: 'absolute',
        width: '100%',
        height: barThicknessValues.default,
        backgroundColor: progressTrackColor,

        '@media (forced-colors: active)': {
          ...shorthands.borderBottom('1px', 'solid', 'CanvasText'),
        },
      },

      ['& > div.fui-Progress__Bar']: {
        height: barThicknessValues.default,
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
  indeterminateLTRLarge: {
    width: '100%',
    ['& > div.fui-Progress__Container']: {
      position: 'relative',
      ...shorthands.overflow('hidden'),
      height: barThicknessValues.large,
      ...shorthands.padding('8px'),

      ['& > div.fui-Progress__Track']: {
        position: 'absolute',
        width: '100%',
        height: barThicknessValues.large,
        backgroundColor: progressTrackColor,

        '@media (forced-colors: active)': {
          ...shorthands.borderBottom('1px', 'solid', 'CanvasText'),
        },
      },

      ['& > div.fui-Progress__Bar']: {
        height: barThicknessValues.large,
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
  indeterminateRTLDefault: {
    width: '100%',
    ['& > div.fui-Progress__Container']: {
      position: 'relative',
      ...shorthands.overflow('hidden'),
      height: barThicknessValues.default,
      ...shorthands.padding('8px'),

      ['& > div.fui-Progress__Track']: {
        position: 'absolute',
        width: '100%',
        height: barThicknessValues.default,
        backgroundColor: progressTrackColor,

        '@media screen and (forced-colors: active)': {
          ...shorthands.borderBottom('1px', 'solid', 'CanvasText'),
        },
      },

      ['& > div.fui-Progress__Bar']: {
        height: barThicknessValues.default,
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
  indeterminateRTLLarge: {
    width: '100%',
    ['& > div.fui-Progress__Container']: {
      position: 'relative',
      ...shorthands.overflow('hidden'),
      height: barThicknessValues.large,
      ...shorthands.padding('8px'),

      ['& > div.fui-Progress__Track']: {
        position: 'absolute',
        width: '100%',
        height: barThicknessValues.large,
        backgroundColor: progressTrackColor,

        '@media screen and (forced-colors: active)': {
          ...shorthands.borderBottom('1px', 'solid', 'CanvasText'),
        },
      },

      ['& > div.fui-Progress__Bar']: {
        height: barThicknessValues.large,
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
  const { appearance, determinate = false, barThickness = 'default' } = state;
  const rootStyles = useRootStyles();
  const indicatorStylesPrimary = useIndicatorStylesPrimary();
  const indicatorStylesInverted = useIndicatorStylesInverted();
  const labelStyles = useLabelStyles();
  const descriptionStyles = useDescriptionStyles();
  const { dir } = useFluent();

  state.root.className = mergeClasses(progressClassNames.root, rootStyles.root, state.root.className);

  // Determinate indicator when determinate is defined
  if (state.indicator) {
    state.indicator.className = mergeClasses(
      progressClassNames.indicator,
      appearance === 'primary' &&
        !determinate &&
        dir === 'ltr' &&
        barThickness === 'default' &&
        indicatorStylesPrimary.indeterminateLTRDefault,
      appearance === 'primary' &&
        !determinate &&
        dir === 'ltr' &&
        barThickness === 'large' &&
        indicatorStylesPrimary.indeterminateLTRLarge,
      appearance === 'primary' &&
        !determinate &&
        dir === 'rtl' &&
        barThickness === 'default' &&
        indicatorStylesPrimary.indeterminateRTLDefault,
      appearance === 'primary' &&
        !determinate &&
        dir === 'rtl' &&
        barThickness === 'large' &&
        indicatorStylesPrimary.indeterminateRTLLarge,
      appearance === 'primary' &&
        determinate &&
        barThickness === 'default' &&
        indicatorStylesPrimary.determinateDefault,
      appearance === 'primary' && determinate && barThickness === 'large' && indicatorStylesPrimary.determinateLarge,
      appearance === 'inverted' &&
        !determinate &&
        dir === 'ltr' &&
        barThickness === 'default' &&
        indicatorStylesInverted.indeterminateLTRDefault,
      appearance === 'inverted' &&
        !determinate &&
        dir === 'ltr' &&
        barThickness === 'large' &&
        indicatorStylesInverted.indeterminateLTRLarge,
      appearance === 'inverted' &&
        !determinate &&
        dir === 'rtl' &&
        barThickness === 'default' &&
        indicatorStylesInverted.indeterminateRTLDefault,
      appearance === 'inverted' &&
        !determinate &&
        dir === 'rtl' &&
        barThickness === 'large' &&
        indicatorStylesInverted.indeterminateRTLLarge,
      appearance === 'inverted' &&
        determinate &&
        barThickness === 'default' &&
        indicatorStylesInverted.determinateDefault,
      appearance === 'inverted' && determinate && barThickness === 'large' && indicatorStylesInverted.determinateLarge,
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
