import { scaleAnimations } from './scale';
import { fadeInOutAnimations as fadeAnimations } from './fade';
import { slideAnimations } from './slide';

export const animations = {
  ...fadeAnimations,
  ...scaleAnimations,
  ...slideAnimations,
  'carousel-slide-to-next-enter': slideAnimations.slideLeftEnterNormal,
  'carousel-slide-to-previous-enter': slideAnimations.slideRightEnterNormal,
  'popup-show': fadeAnimations.fadeEnterUltraFast,
  'popup-hide': fadeAnimations.fadeExitUltraFast,
};
