export { motionTokens, durations, curves } from './motions/motionTokens';

export { createMotionComponent, type MotionComponentProps } from './factories/createMotionComponent';
export {
  createPresenceComponent,
  type PresenceComponentProps,
  type PresenceComponent,
} from './factories/createPresenceComponent';
export { createPresenceComponentVariant } from './factories/createPresenceComponentVariant';

export { PresenceGroup } from './components/PresenceGroup';

export { presenceMotionSlot, type PresenceMotionSlotProps } from './slots/presenceMotionSlot';

export type {
  AtomMotion,
  AtomMotionFn,
  PresenceMotion,
  PresenceMotionCreator,
  PresenceMotionFn,
  PresenceMotionFnCreator,
  PresenceParams,
  PresenceDirection,
  MotionImperativeRef,
} from './types';

export { MotionBehaviourProvider } from './contexts/MotionBehaviourContext';
