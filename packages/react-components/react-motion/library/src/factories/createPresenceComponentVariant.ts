import { PresenceComponent, createPresenceComponent } from './createPresenceComponent';
import { PresenceOverride } from '../types';
import { overridePresenceMotion } from './overridePresenceMotion';

export const createPresenceComponentVariant = <T extends PresenceComponent>(component: T, override: PresenceOverride) =>
  createPresenceComponent(overridePresenceMotion(component.motionDefinition, override));
