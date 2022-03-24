import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { SpinnerState, SpinnerSlots } from './Spinner.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const spinnerClassNames: SlotClassNames<SpinnerSlots> = {
  root: 'fui-Spinner',
  spinner: 'fui-Spinner__spinner',
  label: 'fui-Spinner__label',
};

// Sizes for the Spinner
const spinnnerSizes = {
  tiny: '20px',
  extraSmall: '24px',
  small: '28px',
  medium: '32px',
  large: '36px',
  extraLarge: '40px',
  huge: '44px',
};

// Stroke widths for the Spinner
const spinnerStrokeWidth = {
  sWidth: '2px',
  mWidth: '3px',
  lWidth: '4px',
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
    animationName: 'rotate',
    animationDuration: '3s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
    backgroundColor: 'transparent',
  },

  tiny: {
    height: spinnnerSizes.tiny,
    width: spinnnerSizes.tiny,
    strokeWidth: spinnerStrokeWidth.sWidth,
  },

  extraSmall: {
    height: spinnnerSizes.extraSmall,
    width: spinnnerSizes.extraSmall,
    strokeWidth: spinnerStrokeWidth.sWidth,
  },

  small: {
    height: spinnnerSizes.small,
    width: spinnnerSizes.small,
    strokeWidth: spinnerStrokeWidth.sWidth,
  },

  medium: {
    height: spinnnerSizes.medium,
    width: spinnnerSizes.medium,
    strokeWidth: spinnerStrokeWidth.mWidth,
  },

  large: {
    height: spinnnerSizes.large,
    width: spinnnerSizes.large,
    strokeWidth: spinnerStrokeWidth.mWidth,
  },

  extraLarge: {
    height: spinnnerSizes.extraLarge,
    width: spinnnerSizes.extraLarge,
    strokeWidth: spinnerStrokeWidth.mWidth,
  },

  huge: {
    height: spinnnerSizes.huge,
    width: spinnnerSizes.huge,
    strokeWidth: spinnerStrokeWidth.lWidth,
  },

  // global class for Spinner track
  spinnerTrack: {
    stroke: tokens.colorBrandStroke2,
  },

  // modifier class for Spinner track if appearance="inverted"
  spinnerTrackInverted: {
    stroke: 'rgba(255,255,255,0.2)',
  },

  // global Spinner trail class
  spinnerTail: {
    stroke: tokens.colorBrandStroke1,
    animationName: 'dash',
    animationDuration: '1.5s',
    animationIterationCount: 'infinite',
    // --easyEasy token
    animationTimingFunction: 'cubic-bezier(0.33,0,0.67,1)',
    zIndex: 999,
    strokeLinecap: 'round',
    transform: 'rotate(-90deg)',
    transformOrigin: '50% 50%',
  },
  // modifier class for Spinner trail

  spinnerTailInverted: {
    stroke: tokens.colorNeutralStrokeOnBrand2,
  },
});

const useLabelStyles = makeStyles({
  // style for label
  spinnerLabel: {
    color: tokens.colorNeutralForeground1,
  },

  spinnerLabelInverted: {
    color: tokens.colorNeutralStrokeOnBrand2,
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
      size === 'extra-small' && spinnerStyles.extraSmall,
      size === 'extra-large' && spinnerStyles.extraLarge,
      size !== 'extra-large' && size !== 'extra-small' && spinnerStyles[size],
      state.appearance === 'inverted' ? spinnerStyles.spinnerTrackInverted : spinnerStyles.spinnerTrack,
      state.appearance === 'inverted' ? spinnerStyles.spinnerTailInverted : spinnerStyles.spinnerTail,
    );
  }
  if (state.label) {
    state.label.className = mergeClasses(
      spinnerClassNames.label,
      state.appearance === 'inverted' ? labelStyles.spinnerLabelInverted : labelStyles.spinnerLabel,
    );
  }

  return state;
};
