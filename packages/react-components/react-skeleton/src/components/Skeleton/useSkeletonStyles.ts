import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import type { SkeletonSlots, SkeletonState } from './Skeleton.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const skeletonClassNames: SlotClassNames<SkeletonSlots> = {
  root: 'fui-Skeleton',
  wrapper: 'fui-Skeleton__wrapper',
  gradient: 'fui-Skeleton__gradient',
  data: 'fui-Skeleton__data',
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
  '0%': {
    transform: `opacity(1)`,
  },
  '50%': {
    transform: `opacity(0.4)`,
  },
  '100%': {
    transform: `opacity(1)`,
  },
};

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  root: {
    position: 'relative',
    height: 'auto',
  },
});

/**
 * Styles for the wrapper slot
 */
const useWrapperStyles = makeStyles({
  base: {
    position: 'relative',
    ...shorthands.overflow('hidden'),
    transform: 'translateZ(0)',
    backgroundColor: tokens.colorNeutralStencil1,
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
      0 0 / 90% 100%
      no-repeat`,
    },
  },
});

/**
 * Styles for the gradient slot
 */
const useGradientStyles = makeStyles({
  base: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: `tokens.colorNeutralStencil1
                  linear-gradient(
                    to right,
                    ${tokens.colorNeutralStencil1} 0%,
                    ${tokens.colorNeutralStencil2} 50%,
                    ${tokens.colorNeutralStencil1} 100%)
                  0 0 / 90% 100%
                  no-repeat`,
    animationDuration: '2s',
    animationTimingFunction: 'ease-in-out',
    animationDirection: 'normal',
    animationIterationCount: 'infinite',
  },

  wave: {
    animationName: skeletonWaveAnimation,
  },

  rtlWave: {
    backgroundColor: `tokens.colorNeutralStencil1
    linear-gradient(
      to left,
      ${tokens.colorNeutralStencil1} %,
      ${tokens.colorNeutralStencil2} 50%,
      ${tokens.colorNeutralStencil1} 100%)
    0 0 / 90% 100%
    no-repeat`,
    animationName: skeletonWaveAnimationRTL,
  },

  pulse: {
    animationName: skeletonPulseAnimation,
  },
});

/**
 * Styling for the data slot
 */
const useDataStyles = makeStyles({
  base: {
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    opacity: '0',
    backgroundColor: 'transparent',
    ...shorthands.border('none'),
    transitionProperty: 'opacity',
    transitionDuration: '0.3s',
    transitionTimingFunction: 'ease',
  },

  loaded: {
    opacity: '1',
    position: 'static',
  },
});

/**
 * Apply styling to the Skeleton slots based on the state
 */
export const useSkeletonStyles_unstable = (state: SkeletonState): SkeletonState => {
  const { isDataLoaded, animation } = state;

  const rootStyles = useRootStyles();
  const wrapperStyles = useWrapperStyles();
  const gradientStyles = useGradientStyles();
  const dataStyles = useDataStyles();
  const { dir } = useFluent();

  state.root.className = mergeClasses(skeletonClassNames.root, rootStyles.root, state.root.className);

  state.wrapper.className = mergeClasses(skeletonClassNames.wrapper, wrapperStyles.base, state.wrapper.className);

  state.gradient.className = mergeClasses(
    skeletonClassNames.gradient,
    gradientStyles.base,
    dir === 'ltr' && animation === 'wave' && gradientStyles.wave,
    dir === 'rtl' && animation === 'wave' && gradientStyles.rtlWave,
    animation === 'pulse' && gradientStyles.pulse,
    skeletonClassNames.gradient,
  );

  if (state.data) {
    state.data.className = mergeClasses(
      skeletonClassNames.data,
      dataStyles.base,
      isDataLoaded && dataStyles.loaded,
      skeletonClassNames.data,
    );
  }

  return state;
};
