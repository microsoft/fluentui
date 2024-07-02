import { PresenceComponent, createPresenceComponent } from './createPresenceComponent';
import { MotionParam, PresenceOverride } from '../types';
import { overridePresenceMotion } from './overridePresenceMotion';

export function createPresenceComponentVariant<MotionParams extends Record<string, MotionParam> = {}>(
  component: PresenceComponent<MotionParams>,
  override: PresenceOverride<MotionParams>,
): PresenceComponent<MotionParams> {
  return createPresenceComponent(overridePresenceMotion(component.motionDefinition, override));
}
