import { createPresenceComponent, motionTokens } from '@fluentui/react-motion';
import { tokens } from '@fluentui/react-theme';

import type { DrawerBaseProps } from './DrawerBase.types';
import { drawerCSSVars } from './useDrawerBaseStyles.styles';

const durations: Record<NonNullable<DrawerBaseProps['size']>, number> = {
  small: motionTokens.durationGentle,
  medium: motionTokens.durationSlow,
  large: motionTokens.durationSlower,
  full: motionTokens.durationUltraSlow,
};

type DrawerMotionParams = Required<Pick<DrawerBaseProps, 'size' | 'position'>>;

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
