import type { MotionParam, PresenceDirection, PresenceMotionFn } from '../types';
import { MOTION_DEFINITION, createPresenceComponent, PresenceComponent } from './createPresenceComponent';

/**
 * @internal
 */
type PresenceOverrideFields = {
  duration: KeyframeEffectOptions['duration'];
  easing: KeyframeEffectOptions['easing'];
};

/**
 * @internal
 *
 * Override properties for presence transitions.
 *
 * @example <caption>Override duration for all transitions</caption>
 * ```
 * const override: PresenceOverride = {
 *  all: { duration: 1000 },
 * };
 * ```
 *
 * @example <caption>Override easing for exit transition</caption>
 * ```
 * const override: PresenceOverride = {
 *  exit: { easing: 'ease-out' },
 * };
 * ```
 */
type PresenceOverride = Partial<Record<PresenceDirection | 'all', Partial<PresenceOverrideFields>>>;

/**
 * @internal
 */
export function overridePresenceMotion<MotionParams extends Record<string, MotionParam> = {}>(
  presenceMotion: PresenceMotionFn<MotionParams>,
  override: PresenceOverride,
): PresenceMotionFn<MotionParams> {
  return (...args: Parameters<PresenceMotionFn<MotionParams>>) => {
    const { enter, exit } = presenceMotion(...args);

    return {
      enter: { ...enter, ...override.all, ...override.enter },
      exit: { ...exit, ...override.all, ...override.exit },
    };
  };
}

export function createPresenceComponentVariant<MotionParams extends Record<string, MotionParam> = {}>(
  component: PresenceComponent<MotionParams>,
  override: PresenceOverride,
): PresenceComponent<MotionParams> {
  return createPresenceComponent(overridePresenceMotion(component[MOTION_DEFINITION], override));
}
