import { PresenceMotion, PresenceMotionFn } from '@fluentui/react-motion';
import { PresenceOverride, MotionParam } from '../types';

export const overridePresenceMotion = <MotionParams extends Record<string, MotionParam> = {}>(
  motion: PresenceMotion | PresenceMotionFn<MotionParams>,
  override: PresenceOverride,
): PresenceMotionFn<MotionParams> => {
  return (...args) => {
    const presenceMotion = typeof motion === 'function' ? motion(...args) : motion;
    const { enter, exit } = presenceMotion;

    return {
      enter: { ...enter, ...override.all, ...override.enter },
      exit: { ...exit, ...override.all, ...override.exit },
    };
  };
};
