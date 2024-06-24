import { makeStyles, mergeClasses } from '@griffel/react';
import type { SkeletonItemSlots, SkeletonItemState } from './SkeletonItem.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { tokens } from '@fluentui/react-theme';

export const skeletonItemClassNames: SlotClassNames<SkeletonItemSlots> = {
  root: 'fui-SkeletonItem',
};

const skeletonWaveAnimation = {
  from: {
    backgroundPositionX: '300% /* @noflip */',
  },
  to: {
    backgroundPositionX: '0% /* @noflip */',
  },
};

const skeletonWaveAnimationRTL = {
  from: {
    backgroundPositionX: '0% /* @noflip */',
  },
  to: {
    backgroundPositionX: '300% /* @noflip */',
  },
};

const skeletonPulseAnimation = {
  '0%': {
    opacity: '1',
  },
  '50%': {
    opacity: '0.4',
  },
  '100%': {
    opacity: '1',
  },
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    position: 'relative',
    overflow: 'hidden',
    backgroundSize: '300% 100%',
    backgroundPositionX: 'center',
    backgroundPositionY: 'center',
    backgroundAttachment: 'fixed',
    animationIterationCount: 'infinite',
    animationDuration: '3s',
    animationTimingFunction: 'linear',
    '@media screen and (prefers-reduced-motion: reduce)': {
      animationDuration: '0.01ms',
      animationIterationCount: '1',
    },
  },
  wave: {
    animationName: skeletonWaveAnimation,
    backgroundImage: `linear-gradient(
      to right,
      ${tokens.colorNeutralStencil1} 0%,
      ${tokens.colorNeutralStencil2} 50%,
      ${tokens.colorNeutralStencil1} 100%)`,
    '@media screen and (forced-colors: active)': {
      backgroundColor: 'WindowText',
    },
  },
  waveRtl: {
    animationName: skeletonWaveAnimationRTL,
    backgroundImage: `linear-gradient(
      to right,
      ${tokens.colorNeutralStencil1} 0%,
      ${tokens.colorNeutralStencil2} 50%,
      ${tokens.colorNeutralStencil1} 100%)`,
    '@media screen and (forced-colors: active)': {
      backgroundColor: 'WindowText',
    },
  },
  pulse: {
    animationName: skeletonPulseAnimation,
    animationDuration: '1s',
    backgroundColor: tokens.colorNeutralStencil1,
  },
  translucent: {
    backgroundImage: `linear-gradient(
      to right,
      ${tokens.colorNeutralStencil1Alpha} 0%,
      ${tokens.colorNeutralStencil2Alpha} 50%,
      ${tokens.colorNeutralStencil1Alpha} 100%)`,
  },
  translucentPulse: {
    backgroundColor: tokens.colorNeutralStencil1Alpha,
  },
});

const useRectangleStyles = makeStyles({
  root: {
    width: '100%',
    borderRadius: '4px',
  },
  8: { height: '8px' },
  12: { height: '12px' },
  16: { height: '16px' },
  20: { height: '20px' },
  24: { height: '24px' },
  28: { height: '28px' },
  32: { height: '32px' },
  36: { height: '36px' },
  40: { height: '40px' },
  48: { height: '48px' },
  56: { height: '56px' },
  64: { height: '64px' },
  72: { height: '72px' },
  96: { height: '96px' },
  120: { height: '120px' },
  128: { height: '128px' },
});

const useSizeStyles = makeStyles({
  8: { width: '8px', height: '8px' },
  12: { width: '12px', height: '12px' },
  16: { width: '16px', height: '16px' },
  20: { width: '20px', height: '20px' },
  24: { width: '24px', height: '24px' },
  28: { width: '28px', height: '28px' },
  32: { width: '32px', height: '32px' },
  36: { width: '36px', height: '36px' },
  40: { width: '40px', height: '40px' },
  48: { width: '48px', height: '48px' },
  56: { width: '56px', height: '56px' },
  64: { width: '64px', height: '64px' },
  72: { width: '72px', height: '72px' },
  96: { width: '96px', height: '96px' },
  120: { width: '120px', height: '120px' },
  128: { width: '128px', height: '128px' },
});

const useCircleSizeStyles = makeStyles({
  root: {
    borderRadius: '50%',
  },
});

/**
 * Apply styling to the SkeletonItem slots based on the state
 */
export const useSkeletonItemStyles_unstable = (state: SkeletonItemState): SkeletonItemState => {
  'use no memo';

  const { animation, appearance, size, shape } = state;
  const { dir } = useFluent();

  const rootStyles = useStyles();
  const rectStyles = useRectangleStyles();
  const sizeStyles = useSizeStyles();
  const circleStyles = useCircleSizeStyles();

  state.root.className = mergeClasses(
    skeletonItemClassNames.root,
    rootStyles.root,
    animation === 'wave' && rootStyles.wave,
    animation === 'wave' && dir === 'rtl' && rootStyles.waveRtl,
    animation === 'pulse' && rootStyles.pulse,
    appearance === 'translucent' && rootStyles.translucent,
    animation === 'pulse' && appearance === 'translucent' && rootStyles.translucentPulse,
    shape === 'rectangle' && rectStyles.root,
    shape === 'rectangle' && rectStyles[size],
    shape === 'square' && sizeStyles[size],
    shape === 'circle' && circleStyles.root,
    shape === 'circle' && sizeStyles[size],
    state.root.className,
  );

  return state;
};
