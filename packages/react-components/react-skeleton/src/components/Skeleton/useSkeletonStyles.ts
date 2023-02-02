import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SkeletonSlots, SkeletonState } from './Skeleton.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

export const skeletonClassNames: SlotClassNames<SkeletonSlots> = {
  root: 'fui-Skeleton',
};

export const skeletonGroupClassName = 'fui-Skeleton-Group';

const skeletonWaveAnimation = {
  from: {
    backgroundPositionX: '300%',
  },
  to: {
    backgroundPositionX: '0%',
  },
};

const skeletonWaveAnimationRTL = {
  from: {
    backgroundPositionX: '0%',
  },
  to: {
    backgroundPositionX: '300%',
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
    '& [class^= "fui-Skeleton-"]': {
      position: 'relative',
      height: 'auto',
      ...shorthands.overflow('hidden'),
      ...shorthands.margin('5px'),
      backgroundImage: `linear-gradient(
        to right,
        ${tokens.colorNeutralStencil1} 0%,
        ${tokens.colorNeutralStencil2} 50%,
        ${tokens.colorNeutralStencil1} 100%)`,
      backgroundSize: '300% 100%',
      backgroundPositionX: 'center',
      backgroundPositionY: 'center',
      backgroundAttachment: 'fixed',
      animationIterationCount: 'infinite',
      animationDuration: '3s',
      animationTimingFunction: 'linear',

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
  wave: {
    '& [class^= "fui-Skeleton-"]': {
      animationName: skeletonWaveAnimation,
    },
  },
  waveRtl: {
    '& [class^= "fui-Skeleton-"]': {
      animationName: skeletonWaveAnimationRTL,
    },
  },
  pulse: {
    '& [class^= "fui-Skeleton-"]': {
      animationName: skeletonPulseAnimation,
      backgroundColor: tokens.colorNeutralStencil1,
    },
  },
});

/**
 * Apply styling to the Skeleton slots based on the state
 */
export const useSkeletonStyles_unstable = (state: SkeletonState): SkeletonState => {
  const { animation } = state;
  const { dir } = useFluent();

  const rootStyles = useRootStyles();

  state.root.className = mergeClasses(
    skeletonClassNames.root,
    rootStyles.root,
    animation === 'wave' && rootStyles.wave,
    animation === 'wave' && dir === 'rtl' && rootStyles.waveRtl,
    animation === 'pulse' && rootStyles.pulse,
    state.root.className,
  );

  return state;
};
