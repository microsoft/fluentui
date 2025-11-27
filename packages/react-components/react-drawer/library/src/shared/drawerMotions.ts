import { createPresenceComponent, motionTokens } from '@fluentui/react-motion';
import { tokens } from '@fluentui/react-theme';
import { ProviderContextValue_unstable as FluentProviderContextValue } from '@fluentui/react-shared-contexts';

import type { DrawerBaseProps } from './DrawerBase.types';
import { drawerCSSVars } from './useDrawerBaseStyles.styles';
import { fadeAtom } from '@fluentui/react-motion-components-preview';

export type DrawerMotionParams = Required<
  Pick<DrawerBaseProps, 'size' | 'position' | 'unmountOnClose'> & Pick<FluentProviderContextValue, 'dir'>
>;
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
export function getPositionTransform(
  position: DrawerBaseProps['position'],
  sizeVar: string,
  dir: FluentProviderContextValue['dir'],
): string {
  const leftToRightTransform = `translate3d(var(${sizeVar}), 0, 0)`;
  const rightToLeftTransform = `translate3d(calc(var(${sizeVar}) * -1), 0, 0)`;
  const bottomToTopTransform = `translate3d(0, var(${sizeVar}), 0)`;

  if (position === 'start') {
    return dir === 'ltr' ? rightToLeftTransform : leftToRightTransform;
  }

  if (position === 'end') {
    return dir === 'ltr' ? leftToRightTransform : rightToLeftTransform;
  }

  if (position === 'bottom') {
    return bottomToTopTransform;
  }

  return 'translate3d(0, 0, 0)';
}

/**
 * @internal
 */
export function getPositionProperty(
  position: DrawerBaseProps['position'],
  dir: FluentProviderContextValue['dir'],
): string {
  if (position === 'start') {
    return dir === 'ltr' ? 'marginLeft' : 'marginRight';
  }

  if (position === 'end') {
    return dir === 'ltr' ? 'marginRight' : 'marginLeft';
  }

  if (position === 'bottom') {
    return 'marginBottom';
  }

  return 'marginLeft';
}

/**
 * @internal
 */
export const InlineDrawerMotion = createPresenceComponent<DrawerMotionParams>(({ position, size, dir }) => {
  const keyframes: Keyframe[] = [
    {
      /**
       * TODO: Once the #31663 lands, we should update the RTL logic to use Motion APIs
       * The work will be done in the #32817
       */
      transform: getPositionTransform(position, drawerCSSVars.drawerSizeVar, dir),
      opacity: 0,
    },
    {
      transform: 'translate3d(0, 0, 0)',
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
export const OverlayDrawerMotion = createPresenceComponent<DrawerMotionParams>(({ position, size, dir }) => {
  const keyframes: Keyframe[] = [
    {
      /**
       * TODO: Once the #31663 lands, we should update the RTL logic to use Motion APIs
       * The work will be done in the #32817
       */
      transform: getPositionTransform(position, drawerCSSVars.drawerSizeVar, dir),
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
  const duration = durations[size];
  const easing = motionTokens.curveLinear;

  return {
    enter: fadeAtom({ direction: 'enter', duration, easing }),
    exit: fadeAtom({ direction: 'exit', duration, easing }),
  };
});
