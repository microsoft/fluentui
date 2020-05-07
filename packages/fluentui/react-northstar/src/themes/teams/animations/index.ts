import scaleAnimations from './scale';
import fadeAnimations from './fade';
import slideAnimations from './slide';

export default {
  ...fadeAnimations,
  ...scaleAnimations,
  ...slideAnimations,
  'carousel-slide-to-next-enter': slideAnimations.slideLeftEnterNormal,
  'carousel-slide-to-next-exit': slideAnimations.slideLeftExitNormal,
  'carousel-slide-to-previous-enter': slideAnimations.slideRightEnterNormal,
  'carousel-slide-to-previous-exit': slideAnimations.slideRightExitNormal,
};
