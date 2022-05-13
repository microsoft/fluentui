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
  tiny: '9',
  extraSmall: '11',
  small: '13',
  medium: '14.5',
  large: '16.5',
  extraLarge: '18.5',
  huge: '20',
};

/*
 * TODO: Update with proper tokens when added
 * Sizes for the Spinner
 */
const spinnnerSizes = {
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
    ':focus-visible': {
      outlineStyle: '3px solid transparent',
    },
    ['& > svg']: {
      animationName: {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
      },
      ...spinnerAnimation.container,
    },
    ['& > svg > circle']: {
      cx: '50%',
      cy: '50%',
      fill: 'none',
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

  extraSmall: {
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

  extraLarge: {
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
      animationTimingFunction: 'cubic-bezier(0.33,0,0.67,1)',
      strokeLinecap: 'round',
      transform: 'rotate(-90deg)',
      transformOrigin: '50% 50%',
    },

    ['& > svg > circle.fui-Spinner__Track']: {
      stroke: tokens.colorNeutralBackgroundInverted,
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
      animationTimingFunction: 'cubic-bezier(0.33,0,0.67,1)',
      strokeLinecap: 'round',
      transform: 'rotate(-90deg)',
      transformOrigin: '50% 50%',
    },
    ['& > svg > circle.fui-Spinner__Track']: {
      stroke: tokens.colorNeutralBackground4,
      '@media screen and (forced-colors: active)': {
        stroke: tokens.colorNeutralBackgroundInverted,
      },
    },
  },
});

const useLabelStyles = makeStyles({
  // style for label

  tiny: {
    ...typographyStyles.body1,
  },

  extraSmall: {
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

  extraLarge: {
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
  const { labelPosition, size = 'medium' } = state;
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
  if (state.spinner && state.appearance) {
    state.spinner.className = mergeClasses(
      spinnerClassNames.spinner,
      spinnerStyles.spinnerSVG,
      size === 'extra-small' && spinnerStyles.extraSmall,
      size === 'extra-large' && spinnerStyles.extraLarge,
      size !== 'extra-large' && size !== 'extra-small' && spinnerStyles[size],
      trackStyles[state.appearance],
      state.spinner.className,
    );
  }
  if (state.label) {
    state.label.className = mergeClasses(
      spinnerClassNames.label,
      size === 'extra-small' && labelStyles.extraSmall,
      size === 'extra-large' && labelStyles.extraLarge,
      size !== 'extra-large' && size !== 'extra-small' && labelStyles[size],
      state.label.className,
    );
  }

  return state;
};
