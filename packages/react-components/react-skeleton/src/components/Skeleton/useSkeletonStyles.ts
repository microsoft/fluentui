import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SkeletonSlots, SkeletonState } from './Skeleton.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

export const skeletonClassNames: SlotClassNames<SkeletonSlots> = {
  root: 'fui-Skeleton',
};

const skeletonWaveAnimationRTL = {
  from: {
    backgroundPositionX: '300% /* @noflip */',
  },
  to: {
    backgroundPositionX: '0% /* @noflip */',
  },
};

const skeletonWaveAnimation = {
  from: {
    backgroundPositionX: '0% /* @noflip */',
  },
  to: {
    backgroundPositionX: '300% /* @noflip */',
  },
};

const skeletonPulseAnimation = {
  from: {
    opacity: '1',
  },
  to: {
    opacity: '0.4',
  },
};

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  root: {
    '& .fui-SkeletonItem': {
      position: 'relative',
      ...shorthands.overflow('hidden'),
      backgroundSize: '300% 100%',
      backgroundPositionX: 'center',
      backgroundPositionY: 'center',
      backgroundAttachment: 'fixed',
      animationIterationCount: 'infinite',
      animationDuration: '3s',
      animationTimingFunction: 'linear',
    },
  },
  wave: {
    '& .fui-SkeletonItem': {
      animationName: skeletonWaveAnimation,
      backgroundImage: `linear-gradient(
        to right,
        ${tokens.colorNeutralStencil1} 0%,
        ${tokens.colorNeutralStencil2} 50%,
        ${tokens.colorNeutralStencil1} 100%)`,
      '@media screen and (forced-colors: active)': {
        backgroundColor: `WindowText
        linear-gradient(
          to right,
          transparent 0%,
          Window 50%,
          transparent 100%)
        `,
      },
    },
  },
  waveRtl: {
    '& .fui-SkeletonItem': {
      animationName: skeletonWaveAnimationRTL,
      backgroundImage: `linear-gradient(
        to right,
        ${tokens.colorNeutralStencil1} 0%,
        ${tokens.colorNeutralStencil2} 50%,
        ${tokens.colorNeutralStencil1} 100%)`,
      '@media screen and (forced-colors: active)': {
        backgroundColor: `WindowText
        linear-gradient(
          to right,
          transparent 0%,
          Window 50%,
          transparent 100%)
        `,
      },
    },
  },
  pulse: {
    '& .fui-SkeletonItem': {
      animationName: skeletonPulseAnimation,
      backgroundColor: tokens.colorNeutralStencil1,
    },
  },
  translucent: {
    '& .fui-SkeletonItem': {
      backgroundImage: `linear-gradient(
        to right,
        ${tokens.colorNeutralStencil1Alpha} 0%,
        ${tokens.colorNeutralStencil2Alpha} 50%,
        ${tokens.colorNeutralStencil1Alpha} 100%)`,
    },
  },
  translucentPulse: {
    backgroundColor: tokens.colorNeutralStencil1Alpha,
  },
});

/**
 * Apply styling to the Skeleton slots based on the state
 */
export const useSkeletonStyles_unstable = (state: SkeletonState): SkeletonState => {
  const { animation, appearance } = state;
  const { dir } = useFluent();

  const rootStyles = useRootStyles();

  state.root.className = mergeClasses(
    skeletonClassNames.root,
    rootStyles.root,
    animation === 'wave' && rootStyles.wave,
    animation === 'wave' && dir === 'rtl' && rootStyles.waveRtl,
    animation === 'pulse' && rootStyles.pulse,
    appearance === 'translucent' && rootStyles.translucent,
    animation === 'pulse' && appearance === 'translucent' && rootStyles.translucentPulse,
    state.root.className,
  );

  return state;
};
