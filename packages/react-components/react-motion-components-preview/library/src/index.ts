export {
  Collapse,
  CollapseSnappy,
  CollapseRelaxed,
  CollapseDelayed,
  type CollapseParams,
  type CollapseDurations,
} from './components/Collapse';
export { Fade, FadeSnappy, FadeRelaxed, type FadeParams } from './components/Fade';
export { Scale, ScaleSnappy, ScaleRelaxed, type ScaleParams } from './components/Scale';
export { Slide, SlideSnappy, SlideRelaxed, type SlideParams } from './components/Slide';
export { Blur, type BlurParams } from './components/Blur';
export { Rotate, type RotateParams } from './components/Rotate';

// Choreography, Sequence & Stagger
export {
  hold,
  sequence,
  layer,
  cloneMotionToTargets,
  stagger,
  resolveChoreography,
  createChoreographyComponent,
  createChoreographyPresenceComponent,
  createSequenceComponent,
  createStaggerComponent,
  createStaggerPresenceComponent,
  type MotionTarget,
  type MotionLayer,
  type MotionLayerOptions,
  type HoldMotion,
  type SequenceOptions,
  type SequenceMotion,
  type StaggerOrder,
  type StaggerOptions,
  type StaggerMotion,
  type ChoreographyItem,
  type ChoreographyMotion,
  type PresenceChoreographyMotion,
  type TargetResolver,
  type ResolveChoreographyOptions,
  type ChoreographyMotionFn,
  type PresenceChoreographyMotionFn,
  type CreateChoreographyOptions,
  type CreateChoreographyPresenceOptions,
  type SequenceParams,
  type SequenceMotionFn,
  type CreateSequenceOptions,
  type StaggerParams,
  type StaggerPresenceParams,
  type StaggerItemMotionFn,
  type StaggerItemPresenceMotionFn,
  type CreateStaggerOptions,
  type CreateStaggerPresenceOptions,
} from './choreography';

// Motion Atoms
export {
  blur,
  blurIn,
  blurOut,
  type BlurPose,
  type BlurOptions,
  type BlurInOptions,
  type BlurOutOptions,
} from './atoms/blur-atom';
export {
  fade,
  fadeIn,
  fadeOut,
  type FadeInOptions,
  type FadeOptions,
  type FadeOutOptions,
  type FadePose,
} from './atoms/fade-atom';
export {
  rotate,
  rotateIn,
  rotateOut,
  type RotateAxis,
  type RotatePose,
  type RotateOptions,
  type RotateInOptions,
  type RotateOutOptions,
} from './atoms/rotate-atom';
export {
  scale,
  scaleIn,
  scaleOut,
  type ScaleInOptions,
  type ScaleOptions,
  type ScaleOutOptions,
  type ScalePose,
} from './atoms/scale-atom';
export {
  slide,
  slideIn,
  slideOut,
  type SlidePose,
  type SlideOptions,
  type SlideInOptions,
  type SlideOutOptions,
} from './atoms/slide-atom';
export type { MotionTiming } from './types';
// TODO: consider whether to export some or all collapse atoms
