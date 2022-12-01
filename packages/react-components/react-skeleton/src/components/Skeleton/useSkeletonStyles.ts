import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import type { SkeletonSlots, SkeletonState } from './Skeleton.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const skeletonClassNames: SlotClassNames<SkeletonSlots> = {
  root: 'fui-Skeleton',
  gradient: 'fui-Skeleton__gradient',
};

const BACKGROUND_OFF_SCREEN_POSITION = '100%';

const skeletonWaveAnimation = {
  '0%': {
    transform: `translateX(-${BACKGROUND_OFF_SCREEN_POSITION})`,
  },
  '100%': {
    transform: `translateX(${BACKGROUND_OFF_SCREEN_POSITION})`,
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
  '0%': { transform: `scale(1)` },
  '30%': { transform: `scale(1)` },
  '40%': { transform: `scale(1.05)` },
  '50%': { transform: `scale(1)` },
  '60%': { transform: `scale(1)` },
  '70%': { transform: `scale(1.03)` },
  '80%': { transform: `scale(1)` },
  '100%': { transform: `scale(1)` },
};

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  root: {
    position: 'relative',
    height: 'auto',
    ...shorthands.overflow('hidden'),
    transform: 'translateZ(0)',
    backgroundColor: tokens.colorNeutralStencil2,
    transitionProperty: 'opacity',
    transitionDuration: '0.3s',
    transitionTimingFunction: 'ease',

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

  pulse: {
    animationDuration: '2s',
    animationTimingFunction: 'ease-in-out',
    animationDirection: 'normal',
    animationIterationCount: 'infinite',
    animationName: skeletonPulseAnimation,
  },
});

/**
 * Styles for the gradient slot
 */
const useGradientStyles = makeStyles({
  base: {
    position: 'absolute',
    opacity: '30%',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `
                  linear-gradient(
                    to right,
                    ${tokens.colorNeutralStencil2} 0%,
                    ${tokens.colorNeutralStencil1} 50%,
                    ${tokens.colorNeutralStencil2} 100%)
                  `,
    animationDuration: '2s',
    animationTimingFunction: 'ease-in-out',
    animationDirection: 'normal',
    animationIterationCount: 'infinite',
  },

  wave: {
    animationName: skeletonWaveAnimation,
  },

  rtlWave: {
    backgroundImage: `
    linear-gradient(
      to left,
      ${tokens.colorNeutralStencil1} 0%,
      ${tokens.colorNeutralStencil2} 50%,
      ${tokens.colorNeutralStencil1} 100%)
   `,
    animationName: skeletonWaveAnimationRTL,
  },
});

/**
 * Apply styling to the Skeleton slots based on the state
 */
export const useSkeletonStyles_unstable = (state: SkeletonState): SkeletonState => {
  const { animation } = state;

  const rootStyles = useRootStyles();
  const gradientStyles = useGradientStyles();
  const { dir } = useFluent();

  state.root.className = mergeClasses(
    skeletonClassNames.root,
    rootStyles.root,
    animation === 'pulse' && rootStyles.pulse,
    state.root.className,
  );

  if (state.gradient) {
    state.gradient.className = mergeClasses(
      skeletonClassNames.gradient,
      gradientStyles.base,
      dir === 'ltr' && animation === 'wave' && gradientStyles.wave,
      dir === 'rtl' && animation === 'wave' && gradientStyles.rtlWave,
      skeletonClassNames.gradient,
    );
  }

  return state;
};
