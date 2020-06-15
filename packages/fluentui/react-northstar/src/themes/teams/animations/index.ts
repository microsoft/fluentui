import scaleAnimations from './scale';
import fadeAnimations from './fade';
import slideAnimations from './slide';

export default {
  ...fadeAnimations,
  ...scaleAnimations,
  ...slideAnimations,
  'carousel-slide-to-next-enter': slideAnimations.slideLeftEnterNormal,
  'carousel-slide-to-previous-enter': slideAnimations.slideRightEnterNormal,
  'popup-show': fadeAnimations.fadeEnterUltraFast,
  'popup-hide': fadeAnimations.fadeExitUltraFast,
};
