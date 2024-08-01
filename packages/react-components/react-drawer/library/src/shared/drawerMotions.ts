import { createPresenceComponent, motionTokens } from '@fluentui/react-motion';
import { tokens } from '@fluentui/react-theme';

import type { DrawerBaseProps } from './DrawerBase.types';
import { drawerCSSVars } from './useDrawerBaseStyles.styles';

export type DrawerMotionParams = Required<Pick<DrawerBaseProps, 'size' | 'position'>>;
export type OverlayDrawerSurfaceMotionParams = Required<Pick<DrawerBaseProps, 'size'>>;

const durations: Record<NonNullable<DrawerBaseProps['size']>, number> = {
  small: motionTokens.durationGentle,
  medium: motionTokens.durationSlow,
  large: motionTokens.durationSlower,
  full: motionTokens.durationUltraSlow,
};

/**
 * @internal
 */
export const InlineDrawerMotion = createPresenceComponent<DrawerMotionParams>(({ position, size }) => {
  const keyframes: Keyframe[] = [
    {
      ...(position === 'start' && {
        transform: `translate3d(calc(var(${drawerCSSVars.drawerSizeVar}) * -1), 0, 0)`,
      }),
      ...(position === 'end' && {
        transform: `translate3d(var(${drawerCSSVars.drawerSizeVar}), 0, 0)`,
      }),
      ...(position === 'bottom' && {
        transform: `translate3d(0, var(${drawerCSSVars.drawerSizeVar}), 0)`,
      }),

      opacity: 0,
    },
    { transform: 'translate3d(0, 0, 0)', opacity: 1 },
  ];
  const duration = durations[size];

  return {
    enter: {
      keyframes,
      duration,
      easing: motionTokens.curveDecelerateMid,
    },
    exit: {
      keyframes: [...keyframes].reverse(),
      duration,
      easing: motionTokens.curveAccelerateMin,
    },
  };
});

/**
 * @internal
 */
export const OverlayDrawerMotion = createPresenceComponent<DrawerMotionParams>(({ position, size }) => {
  const keyframes: Keyframe[] = [
    {
      ...(position === 'start' && {
        transform: `translate3D(calc(var(${drawerCSSVars.drawerSizeVar}) * -1), 0, 0)`,
      }),
      ...(position === 'end' && {
        transform: `translate3d(calc(var(${drawerCSSVars.drawerSizeVar}) * 1), 0, 0)`,
      }),
      ...(position === 'bottom' && {
        transform: `translate3d(0, calc(var(${drawerCSSVars.drawerSizeVar}) * 1), 0)`,
      }),

      boxShadow: `0px ${tokens.colorTransparentBackground}`,
      opacity: 0,
    },
    {
      transform: 'translate3d(0, 0, 0)',
      boxShadow: tokens.shadow64,
      opacity: 1,
    },
  ];
  const duration = durations[size];

  return {
    enter: {
      keyframes,
      duration,
      easing: motionTokens.curveDecelerateMid,
    },
    exit: {
      keyframes: [...keyframes].reverse(),
      duration,
      easing: motionTokens.curveAccelerateMin,
    },
  };
});

/**
 * @internal
 */
export const OverlaySurfaceBackdropMotion = createPresenceComponent(({ size }: OverlayDrawerSurfaceMotionParams) => {
  const keyframes = [{ opacity: 0 }, { opacity: 1 }];
  const duration = durations[size];

  return {
    enter: {
      keyframes,
      easing: motionTokens.curveLinear,
      duration,
    },
    exit: {
      keyframes: [...keyframes].reverse(),
      easing: motionTokens.curveLinear,
      duration,
    },
  };
});
