export { motionTokens, durations, curves } from './motions/motionTokens';

export {
  createMotionComponent,
  type MotionComponentProps,
  type MotionComponent,
} from './factories/createMotionComponent';
export { createMotionComponentVariant } from './factories/createMotionComponentVariant';
export {
  createPresenceComponent,
  type PresenceComponentProps,
  type PresenceComponent,
} from './factories/createPresenceComponent';
export { createPresenceComponentVariant } from './factories/createPresenceComponentVariant';

export { PresenceGroup } from './components/PresenceGroup';

export { presenceMotionSlot, type PresenceMotionSlotProps } from './slots/presenceMotionSlot';

export {
  PresenceGroupChildProvider,
  usePresenceGroupChildContext,
  type PresenceGroupChildContextValue,
} from './contexts/PresenceGroupChildContext';

export type {
  AtomMotion,
  AtomMotionFn,
  PresenceMotion,
  PresenceMotionFn,
  PresenceDirection,
  MotionImperativeRef,
  MotionParam,
} from './types';

export { MotionBehaviourProvider } from './contexts/MotionBehaviourContext';
