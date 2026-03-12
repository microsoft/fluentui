'use client';

import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import type { SpinnerSlots, SpinnerState } from './Spinner.types';

export const spinnerClassNames: SlotClassNames<SpinnerSlots> = {
  root: 'fui-Spinner',
  spinner: 'fui-Spinner__spinner',
  spinnerTail: 'fui-Spinner__spinnerTail',
  label: 'fui-Spinner__label',
};

/**
 * @internal Class names for the tail arc span elements (replacing ::before/::after).
 */
export const spinnerTailArcClassNames = {
  arc: 'fui-Spinner__spinnerTailArc',
};

/**
 * CSS variables used internally by Spinner
 */
const vars = {
  strokeWidth: '--fui-Spinner--strokeWidth',
};

const useRootBaseClassName = makeResetStyles({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: '0',
  gap: '8px',
  overflow: 'hidden', // prevents height changes from rotating children
  minWidth: 'min-content',
});

const useRootStyles = makeStyles({
  vertical: {
    flexDirection: 'column',
  },
});

const useSpinnerBaseClassName = makeResetStyles({
  position: 'relative',
  flexShrink: 0,

  // Use a mask to create the ring shape of the spinner.
  maskImage:
    `radial-gradient(closest-side, ` +
    `transparent calc(100% - var(${vars.strokeWidth}) - 1px), ` +
    `white calc(100% - var(${vars.strokeWidth})) calc(100% - 1px), ` +
    `transparent 100%)`,

  backgroundColor: tokens.colorBrandStroke2Contrast,
  color: tokens.colorBrandStroke1,
  '@media screen and (forced-colors: active)': {
    backgroundColor: 'HighlightText',
    color: 'Highlight',
    forcedColorAdjust: 'none',
  },

  // CSS rotation animation removed — now handled by SpinnerRotation motion component in renderSpinner
});

// The spinner tail uses a 105deg arc mask with two arc segment child spans (replacing ::before/::after).
// The segments are rotated out from behind the mask to expand the visible arc from
// 30deg (min) to 255deg (max), and then back behind the mask again to shrink the arc.
// All animations (tail rotation + arc expand/collapse) are handled by WAAPI motion components.
const useSpinnerTailBaseClassName = makeResetStyles({
  position: 'absolute',
  display: 'block',
  width: '100%',
  height: '100%',
  maskImage: 'conic-gradient(transparent 105deg, white 105deg)',

  // CSS animations removed — now handled by SpinnerTailMotion in renderSpinner

  '@media screen and (prefers-reduced-motion: reduce)': {
    // Show a static arc directly on the tail element
    backgroundImage: 'conic-gradient(transparent 120deg, currentcolor 360deg)',
  },
});

// Styles for the arc span elements (replacing the ::before/::after pseudo-elements).
// Both arc elements share identical base styles; their different rotation animations
// are handled by SpinnerArcStartMotion and SpinnerArcEndMotion respectively.
const useSpinnerTailArcBaseClassName = makeResetStyles({
  position: 'absolute',
  display: 'block',
  width: '100%',
  height: '100%',
  backgroundImage: 'conic-gradient(currentcolor 135deg, transparent 135deg)',

  '@media screen and (prefers-reduced-motion: reduce)': {
    // Hide arc elements in reduced motion — static arc is shown on the tail container
    display: 'none',
  },
});

const useSpinnerStyles = makeStyles({
  inverted: {
    backgroundColor: tokens.colorNeutralStrokeAlpha2,
    color: tokens.colorNeutralStrokeOnBrand2,
  },

  rtlTail: {
    maskImage: 'conic-gradient(white 255deg, transparent 255deg)',
    '@media screen and (prefers-reduced-motion: reduce)': {
      backgroundImage: 'conic-gradient(currentcolor 0deg, transparent 240deg)',
    },
  },

  rtlTailArc: {
    backgroundImage: 'conic-gradient(transparent 225deg, currentcolor 225deg)',
  },

  'extra-tiny': {
    height: '16px',
    width: '16px',
    [vars.strokeWidth]: tokens.strokeWidthThick,
  },

  tiny: {
    height: '20px',
    width: '20px',
    [vars.strokeWidth]: tokens.strokeWidthThick,
  },

  'extra-small': {
    height: '24px',
    width: '24px',
    [vars.strokeWidth]: tokens.strokeWidthThick,
  },

  small: {
    height: '28px',
    width: '28px',
    [vars.strokeWidth]: tokens.strokeWidthThick,
  },

  medium: {
    height: '32px',
    width: '32px',
    [vars.strokeWidth]: tokens.strokeWidthThicker,
  },

  large: {
    height: '36px',
    width: '36px',
    [vars.strokeWidth]: tokens.strokeWidthThicker,
  },

  'extra-large': {
    height: '40px',
    width: '40px',
    [vars.strokeWidth]: tokens.strokeWidthThicker,
  },

  huge: {
    height: '44px',
    width: '44px',
    [vars.strokeWidth]: tokens.strokeWidthThickest,
  },
});

const useLabelStyles = makeStyles({
  inverted: {
    color: tokens.colorNeutralForegroundStaticInverted,
  },

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
  'use no memo';

  const { labelPosition, size, appearance } = state;
  const { dir } = useFluent();

  const rootBaseClassName = useRootBaseClassName();
  const rootStyles = useRootStyles();
  const spinnerBaseClassName = useSpinnerBaseClassName();
  const spinnerStyles = useSpinnerStyles();
  const spinnerTailBaseClassName = useSpinnerTailBaseClassName();
  const spinnerTailArcBaseClassName = useSpinnerTailArcBaseClassName();
  const labelStyles = useLabelStyles();

  state.root.className = mergeClasses(
    spinnerClassNames.root,
    rootBaseClassName,
    (labelPosition === 'above' || labelPosition === 'below') && rootStyles.vertical,
    state.root.className,
  );
  if (state.spinner) {
    state.spinner.className = mergeClasses(
      spinnerClassNames.spinner,
      spinnerBaseClassName,
      spinnerStyles[size],
      appearance === 'inverted' && spinnerStyles.inverted,
      state.spinner.className,
    );
  }
  if (state.spinnerTail) {
    state.spinnerTail.className = mergeClasses(
      spinnerClassNames.spinnerTail,
      spinnerTailBaseClassName,
      dir === 'rtl' && spinnerStyles.rtlTail,
      state.spinnerTail.className,
    );
  }

  // Set arc element classNames for use in renderSpinner
  state.tailArcClassName = mergeClasses(spinnerTailArcClassNames.arc, spinnerTailArcBaseClassName);
  state.tailArcRtlClassName = dir === 'rtl' ? spinnerStyles.rtlTailArc : undefined;

  if (state.label) {
    state.label.className = mergeClasses(
      spinnerClassNames.label,
      labelStyles[size],
      appearance === 'inverted' && labelStyles.inverted,
      state.label.className,
    );
  }

  return state;
};
