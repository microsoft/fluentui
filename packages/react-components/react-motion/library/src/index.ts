export { motionTokens, durations, curves } from './motions/motionTokens';

export { createMotionComponent, type MotionComponentProps } from './factories/createMotionComponent';
export {
  createPresenceComponent,
  type PresenceComponentProps,
  type PresenceComponent,
} from './factories/createPresenceComponent';
export { createPresenceComponentVariant } from './factories/createPresenceComponentVariant';

export { PresenceGroup } from './components/PresenceGroup';

export type {
  AtomMotion,
  AtomMotionFn,
  PresenceMotion,
  PresenceMotionFn,
  PresenceDirection,
  MotionImperativeRef,
} from './types';
