export { layer, cloneMotionToTargets, stagger, resolveChoreography } from './stagger';
export { createChoreographyComponent, createChoreographyPresenceComponent } from './createChoreographyComponent';
export { createStaggerComponent, createStaggerPresenceComponent } from './createStaggerComponent';
export type {
  MotionTarget,
  MotionLayer,
  MotionLayerOptions,
  StaggerOrder,
  StaggerOptions,
  StaggerMotion,
  ChoreographyItem,
  ChoreographyMotion,
  PresenceChoreographyMotion,
  TargetResolver,
  ResolveChoreographyOptions,
  ChoreographyMotionFn,
  PresenceChoreographyMotionFn,
  CreateChoreographyOptions,
  CreateChoreographyPresenceOptions,
  StaggerParams,
  StaggerPresenceParams,
  StaggerItemMotionFn,
  StaggerItemPresenceMotionFn,
  CreateStaggerOptions,
  CreateStaggerPresenceOptions,
} from './types';
