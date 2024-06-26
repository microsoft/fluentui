import { PresenceComponent, createPresenceComponent } from './createPresenceComponent';
import { MotionParam, PresenceOverride, PresenceMotion, PresenceMotionFn } from '../types';
import { overridePresenceMotion } from './overridePresenceMotion';

export const createPresenceComponentVariant = <
  MotionParams extends Record<string, MotionParam>,
  MotionDefinition extends PresenceMotion | PresenceMotionFn<MotionParams>,
>(
  component: PresenceComponent<MotionParams, MotionDefinition>,
  override: PresenceOverride<MotionParams>,
) =>
  // overridePresenceMotion always returns a function, so type the createPresenceComponent generic to the function
  createPresenceComponent<MotionParams, PresenceMotionFn<MotionParams>>(
    overridePresenceMotion<MotionParams>(component.motionDefinition, override),
  );
