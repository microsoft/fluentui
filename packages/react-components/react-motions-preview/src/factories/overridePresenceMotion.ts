import { PresenceMotion, PresenceMotionFn } from '../types';
import { PresenceOverride } from '../types';

export const overridePresenceMotion = (
  motion: PresenceMotion | PresenceMotionFn,
  override: PresenceOverride,
): PresenceMotionFn => {
  return (...args) => {
    const presenceMotion = typeof motion === 'function' ? motion(...args) : motion;
    const { enter, exit } = presenceMotion;

    return {
      enter: { ...enter, ...override.all, ...override.enter },
      exit: { ...exit, ...override.all, ...override.exit },
    };
  };
};
