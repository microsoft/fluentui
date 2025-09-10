import type { MotionParam, PresenceMotionFn } from '../types';
import { PRESENCE_MOTION_DEFINITION, createPresenceComponent, PresenceComponent } from './createPresenceComponent';

/**
 * @internal
 *
 * Create a variant function that wraps a presence function to customize it.
 * The new presence function has the supplied variant params as defaults,
 * but these can still be overridden by runtime params when the new function is called.
 */
export function createPresenceFnVariant<MotionParams extends Record<string, MotionParam> = {}>(
  presenceFn: PresenceMotionFn<MotionParams>,
  variantParams: Partial<MotionParams>,
): typeof presenceFn {
  const variantFn: typeof presenceFn = runtimeParams => presenceFn({ ...variantParams, ...runtimeParams });
  return variantFn;
}

/**
 * Create a new presence component based on another presence component,
 * using the provided variant parameters as defaults.
 *
 * @param component - A component created by `createPresenceComponent`.
 * @param variantParams - An object containing the variant parameters to be used as defaults.
 * The variant parameters should match the type of the component's motion parameters.
 * @returns A new presence component that uses the provided variant parameters as defaults.
 * The new component can still accept runtime parameters that override the defaults.
 */
export function createPresenceComponentVariant<MotionParams extends Record<string, MotionParam> = {}>(
  component: PresenceComponent<MotionParams>,
  variantParams: Partial<MotionParams>,
): PresenceComponent<MotionParams> {
  const originalFn = component[PRESENCE_MOTION_DEFINITION];
  // The variant params become new defaults, but they can still be overridden by runtime params.
  const variantFn = createPresenceFnVariant(originalFn, variantParams);
  return createPresenceComponent(variantFn);
}
