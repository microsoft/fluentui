import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SkeletonSlots, SkeletonState } from './Skeleton.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

export const skeletonClassNames: SlotClassNames<SkeletonSlots> = {
  root: 'fui-Skeleton',
};

export const skeletonGroupClassName = 'fui-Skeleton-Group';

const BACKGROUND_OFF_SCREEN_POSITION = '100%';

// const skeletonWaveAnimation = {
//   '0%': {
//     transform: `translateX(-${BACKGROUND_OFF_SCREEN_POSITION})`,
//   },
//   '100%': {
//     transform: `translateX(${BACKGROUND_OFF_SCREEN_POSITION})`,
//   },
// };
const skeletonWaveAnimation = {
  from: {
    backgroundPositionX: '300%',
  },
  to: {
    backgroundPositionX: '0%',
  },
};

const skeletonWaveAnimationRTL = {
  '100%': {
    transform: `translateX(-${BACKGROUND_OFF_SCREEN_POSITION})`,
  },
  '0%': {
    transform: `translateX(${BACKGROUND_OFF_SCREEN_POSITION})`,
  },
};

const skeletonPulseAnimation = {
  // '0%': { transform: `opacity(1)` },
  // '30%': { transform: `scale(1)` },
  // '50%': { transform: `opacity(0.4)` },
  // '50%': { transform: `scale(1)` },
  // '60%': { transform: `scale(1)` },
  // '70%': { transform: `scale(1.03)` },
  // '80%': { transform: `scale(1)` },
  // '100%': { transform: `opacity(1)` },
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
    '& > .fui-Skeleton-Line': {
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
      animationDuration: '2s',
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

    '& > .fui-Skeleton-Circle': {
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
      animationDuration: '2s',
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

    [`& > .${skeletonGroupClassName}`]: {
      '& > .fui-Skeleton-Line': {
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
        animationDuration: '2s',
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

      '& > .fui-Skeleton-Circle': {
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
        animationDuration: '2s',
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
  },
  wave: {
    [`& > .${skeletonGroupClassName}`]: {
      '& > .fui-Skeleton-Line': {
        animationName: skeletonWaveAnimation,
      },

      '& > .fui-Skeleton-Circle': {
        animationName: skeletonWaveAnimation,
      },
    },

    '& > .fui-Skeleton-Line': {
      animationName: skeletonWaveAnimation,
    },

    '& > .fui-Skeleton-Circle': {
      animationName: skeletonWaveAnimation,
    },
  },
  waveRtl: {
    [`& > .${skeletonGroupClassName}`]: {
      '& > .fui-Skeleton-Line': {
        animationName: skeletonWaveAnimationRTL,
      },

      '& > .fui-Skeleton-Circle': {
        animationName: skeletonWaveAnimationRTL,
      },
    },

    '& > .fui-Skeleton-Line': {
      animationName: skeletonWaveAnimationRTL,
    },

    '& > .fui-Skeleton-Circle': {
      animationName: skeletonWaveAnimationRTL,
    },
  },
  pulse: {
    [`& > .${skeletonGroupClassName}`]: {
      '& > .fui-Skeleton-Line': {
        animationName: skeletonPulseAnimation,
        animationDuration: '2s',
        backgroundColor: tokens.colorNeutralStencil1,
      },

      '& > .fui-Skeleton-Circle': {
        animationName: skeletonPulseAnimation,
        animationDuration: '2s',
        backgroundColor: tokens.colorNeutralStencil1,
      },
    },

    '& > .fui-Skeleton-Line': {
      animationName: skeletonPulseAnimation,
      animationDuration: '2s',
      backgroundColor: tokens.colorNeutralStencil1,
    },

    '& > .fui-Skeleton-Circle': {
      animationName: skeletonPulseAnimation,
      animationDuration: '2s',
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
