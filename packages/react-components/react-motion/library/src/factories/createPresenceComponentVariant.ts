import { PresenceComponent, createPresenceComponent } from './createPresenceComponent';
import { MotionParam, PresenceOverride, PresenceMotion, PresenceMotionFn } from '../types';
import { overridePresenceMotion } from './overridePresenceMotion';

// This function overloading simplifies the type-safe flow of:
// - motion object in   => motion object out
// - motion function in => motion function out

// This overload is for when the motion definition is an object.
export function createPresenceComponentVariant(
  component: PresenceComponent<{}, PresenceMotion>,
  override: PresenceOverride<{}>,
): PresenceComponent<{}, PresenceMotion>;

// This overload is for when the motion definition is a function.
export function createPresenceComponentVariant<
  MotionParams extends Record<string, MotionParam>,
  MotionDefinition extends PresenceMotionFn<MotionParams>,
>(
  component: PresenceComponent<MotionParams, PresenceMotionFn<MotionParams>>,
  override: PresenceOverride<MotionParams>,
): PresenceComponent<MotionParams, PresenceMotionFn<MotionParams>>;

// This function is the implementation of the overloads.
export function createPresenceComponentVariant<
  MotionParams extends Record<string, MotionParam>,
  MotionDefinition extends PresenceMotion | PresenceMotionFn<MotionParams>,
>(component: PresenceComponent<MotionParams, MotionDefinition>, override: PresenceOverride<MotionParams>): unknown {
  return createPresenceComponent(overridePresenceMotion(component.motionDefinition, override));
}
