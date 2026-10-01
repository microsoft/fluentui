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
export { Stagger, type StaggerProps } from './choreography/Stagger';

// Motion Atoms
export { blurAtom } from './atoms/blur-atom';
// eslint-disable-next-line @typescript-eslint/no-deprecated -- Preserve the deprecated export for compatibility.
export { fade, fadeIn, fadeOut, fadeAtom, type FadeOptions, type FadePose } from './atoms/fade-atom';
export { rotateAtom } from './atoms/rotate-atom';
export { scaleAtom } from './atoms/scale-atom';
export {
  slide,
  slideIn,
  slideOut,
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- Preserve the deprecated export for compatibility.
  slideAtom,
  type SlidePose,
  type SlideOptions,
  type SlideInOptions,
  type SlideOutOptions,
} from './atoms/slide-atom';
export type { MotionTiming } from './types';
// TODO: consider whether to export some or all collapse atoms
