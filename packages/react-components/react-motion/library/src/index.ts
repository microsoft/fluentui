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
export {
  createStateMotionComponent,
  type StateMotionComponent,
  type StateMotionComponentProps,
} from './factories/createStateMotionComponent';
export { createStateMotionController, type StateMotionControllerOptions } from './state/createStateMotionController';
export { useStateMotion } from './hooks/useStateMotion';

export { PresenceGroup } from './components/PresenceGroup';
export { MotionRefForwarder, MotionRefForwarderReset, useMotionForwardedRef } from './components/MotionRefForwarder';

export { motionSlot, type MotionSlotProps } from './slots/motionSlot';
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
  StateMotionAnimation,
  StateMotionAnimationSnapshot,
  StateMotionController,
  StateMotionDefinition,
  StateMotionEvent,
  StateMotionGraphDefinition,
  StateMotionKeyframe,
  StateMotionKeyframeReference,
  StateMotionMachineAnimation,
  StateMotionMachineDefinition,
  StateMotionMachineNode,
  StateMotionMachineTransition,
  StateMotionNode,
  StateMotionSkin,
  StateMotionSnapshot,
  StateMotionStateKeyframe,
  StateMotionStateName,
  StateMotionTransition,
  StateMotionTransitionMotionFn,
  StateMotionTransitionMotionFnParams,
} from './types';

export { MotionBehaviourProvider } from './contexts/MotionBehaviourContext';
