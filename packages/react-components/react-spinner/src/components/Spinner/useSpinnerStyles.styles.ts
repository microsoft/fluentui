import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import type { SpinnerState, SpinnerSlots } from './Spinner.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const spinnerClassNames: SlotClassNames<SpinnerSlots> = {
  root: 'fui-Spinner',
  spinner: 'fui-Spinner__spinner',
  label: 'fui-Spinner__label',
};

/*
 * TODO: Update with proper tokens when added
 * Radii for the Spinner circles
 */
const rValues = {
  extraTiny: '7px',
  tiny: '9px',
  extraSmall: '11px',
  small: '13px',
  medium: '14.5px',
  large: '16.5px',
  extraLarge: '18.5px',
  huge: '20px',
};

/*
 * TODO: Update with proper tokens when added
 * Sizes for the Spinner
 */
const spinnnerSizes = {
  extraTiny: '16px',
  tiny: '20px',
  extraSmall: '24px',
  small: '28px',
  medium: '32px',
  large: '36px',
  extraLarge: '40px',
  huge: '44px',
};

/*
 * TODO: Update with proper tokens when added
 * Animation for Spinner
 */
const spinnerAnimation = {
  container: {
    animationDuration: '3s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
    backgroundColor: 'transparent',
  },
};

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: '0',
    ...shorthands.gap('8px'),
  },

  horizontal: {
    flexDirection: 'row',
  },

  vertical: {
    flexDirection: 'column',
  },
});

const useLoaderStyles = makeStyles({
  // global SVG class
  spinnerSVG: {
    ':focus': {
      ...shorthands.outline('3px', 'solid', 'transparent'),
    },
    ['& > svg']: {
      animationName: {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
      },
      ...spinnerAnimation.container,

      '@media screen and (prefers-reduced-motion: reduce)': {
        animationDuration: '0.01ms',
        animationIterationCount: '1',
      },
    },
    ['& > svg > circle']: {
      cx: '50%',
      cy: '50%',
      fill: 'none',
    },
  },

  'extra-tiny': {
    ['& > svg']: {
      height: spinnnerSizes.extraTiny,
      width: spinnnerSizes.extraTiny,
    },
    ['& > svg > circle']: {
      strokeWidth: tokens.strokeWidthThick,
      r: rValues.extraTiny,
    },
  },

  tiny: {
    ['& > svg']: {
      height: spinnnerSizes.tiny,
      width: spinnnerSizes.tiny,
    },
    ['& > svg > circle']: {
      strokeWidth: tokens.strokeWidthThick,
      r: rValues.tiny,
    },
  },

  'extra-small': {
    ['& > svg']: {
      height: spinnnerSizes.extraSmall,
      width: spinnnerSizes.extraSmall,
    },
    ['& > svg > circle']: {
      strokeWidth: tokens.strokeWidthThick,
      r: rValues.extraSmall,
    },
  },

  small: {
    ['& > svg']: {
      height: spinnnerSizes.small,
      width: spinnnerSizes.small,
    },
    ['& > svg > circle']: {
      strokeWidth: tokens.strokeWidthThick,
      r: rValues.small,
    },
  },

  medium: {
    ['& > svg']: {
      height: spinnnerSizes.medium,
      width: spinnnerSizes.medium,
    },
    ['& > svg > circle']: {
      strokeWidth: tokens.strokeWidthThicker,
      r: rValues.medium,
    },
  },

  large: {
    ['& > svg']: {
      height: spinnnerSizes.large,
      width: spinnnerSizes.large,
    },
    ['& > svg > circle']: {
      strokeWidth: tokens.strokeWidthThicker,
      r: rValues.large,
    },
  },

  'extra-large': {
    ['& > svg']: {
      height: spinnnerSizes.extraLarge,
      width: spinnnerSizes.extraLarge,
    },
    ['& > svg > circle']: {
      strokeWidth: tokens.strokeWidthThicker,
      r: rValues.extraLarge,
    },
  },

  huge: {
    ['& > svg']: {
      height: spinnnerSizes.huge,
      width: spinnnerSizes.huge,
    },
    ['& > svg > circle']: {
      strokeWidth: tokens.strokeWidthThickest,
      r: rValues.huge,
    },
  },
});

const useTrackStyles = makeStyles({
  inverted: {
    ['& > svg > circle.fui-Spinner__Tail']: {
      stroke: tokens.colorNeutralStrokeOnBrand2,
      animationName: {
        '0%': {
          strokeDasharray: '1,150',
          strokeDashoffset: '0',
        },

        '50%': {
          strokeDasharray: '90,150',
          strokeDashoffset: '-35',
        },

        '100%': {
          strokeDasharray: '90,150',
          strokeDashoffset: '-124',
        },
      },
      animationDuration: '1.5s',
      animationIterationCount: 'infinite',
      animationTimingFunction: tokens.curveEasyEase,
      strokeLinecap: 'round',
      transform: 'rotate(-90deg)',
      transformOrigin: '50% 50%',

      '@media screen and (prefers-reduced-motion: reduce)': {
        animationDuration: '0.01ms',
        animationIterationCount: '1',
      },
    },

    ['& > svg > circle.fui-Spinner__Track']: {
      stroke: 'rgba(255, 255, 255, 0.2)', // this is whiteAlpha[20] but that token is not exported
    },
  },
  primary: {
    ['& > svg > circle.fui-Spinner__Tail']: {
      stroke: tokens.colorBrandStroke1,
      '@media screen and (forced-colors: active)': {
        stroke: tokens.colorNeutralStrokeOnBrand2,
      },
      animationName: {
        '0%': {
          strokeDasharray: '1,150',
          strokeDashoffset: '0',
        },

        '50%': {
          strokeDasharray: '90,150',
          strokeDashoffset: '-35',
        },

        '100%': {
          strokeDasharray: '90,150',
          strokeDashoffset: '-124',
        },
      },
      animationDuration: '1.5s',
      animationIterationCount: 'infinite',
      animationTimingFunction: tokens.curveEasyEase,
      strokeLinecap: 'round',
      transform: 'rotate(-90deg)',
      transformOrigin: '50% 50%',
      '@media screen and (prefers-reduced-motion: reduce)': {
        animationDuration: '0.01ms',
        animationIterationCount: '1',
      },
    },
    ['& > svg > circle.fui-Spinner__Track']: {
      stroke: tokens.colorBrandStroke2Contrast,
      '@media screen and (forced-colors: active)': {
        stroke: tokens.colorNeutralBackgroundInverted,
      },
    },
  },
});

const useLabelStyles = makeStyles({
  // style for label
  inverted: {
    color: 'rgba(255, 255, 255, 1)', // This is white alpha but the token is not exported
  },

  primary: {}, // no change

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
  const { labelPosition, size, appearance = 'primary' } = state;
  const rootStyles = useRootStyles();
  const spinnerStyles = useLoaderStyles();
  const labelStyles = useLabelStyles();
  const trackStyles = useTrackStyles();

  state.root.className = mergeClasses(
    spinnerClassNames.root,
    rootStyles.root,
    (labelPosition === 'above' || labelPosition === 'below') && rootStyles.vertical,
    (labelPosition === 'before' || labelPosition === 'after') && rootStyles.horizontal,
    state.root.className,
  );
  if (state.spinner) {
    state.spinner.className = mergeClasses(
      spinnerClassNames.spinner,
      spinnerStyles.spinnerSVG,
      spinnerStyles[size],
      trackStyles[appearance],
      state.spinner.className,
    );
  }
  if (state.label) {
    state.label.className = mergeClasses(
      spinnerClassNames.label,
      labelStyles[size],
      labelStyles[appearance],
      state.label.className,
    );
  }

  return state;
};
