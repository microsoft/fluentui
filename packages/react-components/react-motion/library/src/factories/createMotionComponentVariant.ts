import type { MotionParam, AtomMotionFn } from '../types';
import { MOTION_DEFINITION, createMotionComponent, MotionComponent } from './createMotionComponent';

/**
 * @internal
 *
 * Create a variant function that wraps a motion function to customize it.
 * The new motion function has the supplied variant params as defaults,
 * but these can still be overridden by runtime params when the new function is called.
 */
export function createMotionFnVariant<MotionParams extends Record<string, MotionParam> = {}>(
  motionFn: AtomMotionFn<MotionParams>,
  variantParams: Partial<MotionParams>,
): typeof motionFn {
  const variantFn: typeof motionFn = runtimeParams => motionFn({ ...variantParams, ...runtimeParams });
  return variantFn;
}

/**
 * Create a new motion component based on another motion component,
 * using the provided variant parameters as defaults.
 *
 * @param component - A component created by `createMotionComponent`.
 * @param variantParams - An object containing the variant parameters to be used as defaults.
 * The variant parameters should match the type of the component's motion parameters.
 * @returns A new motion component that uses the provided variant parameters as defaults.
 * The new component can still accept runtime parameters that override the defaults.
 */
export function createMotionComponentVariant<MotionParams extends Record<string, MotionParam> = {}>(
  component: MotionComponent<MotionParams>,
  variantParams: Partial<MotionParams>,
): MotionComponent<MotionParams> {
  const originalFn = component[MOTION_DEFINITION];
  // The variant params become new defaults, but they can still be overridden by runtime params.
  const variantFn = createMotionFnVariant(originalFn, variantParams);
  return createMotionComponent(variantFn);
}
