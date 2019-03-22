import { keyframes } from 'office-ui-fabric-react';
import { IRawStyle } from 'office-ui-fabric-react/lib/Styling';

// For testing purpose.  To be removed
const testTiming = 0;

const slideInTimingFunction = 'cubic-bezier(.33,0,0,1)';
const fadeInTimingFunction = 'cubic-bezier(.33,0,.14,1)';

const slideOutTimingFunction = 'cubic-bezier(.41,0,.67,1)';
const fadeOutTimingFunction = 'cubic-bezier(.01,0,.14,1)';

function _createAnimation(
  fadeNam: string,
  fadeTime: string,
  fadeFunc: string,
  fadeDelay: string,
  slideNam: string,
  slideTime: string,
  slideFunc: string,
  slideDelay: string
): IRawStyle {
  const retAnim = {
    animation: `${fadeNam} ${fadeTime} ${fadeFunc} ${fadeDelay} forwards, ${slideNam} ${slideTime} ${slideFunc} ${slideDelay} forwards`
  };

  return retAnim;
}

const SLIDE_UP_IN: string = _createSlideInY(790);
const SLIDE_UP_OUT: string = _createSlideOutY(-480);

const SLIDE_DOWN_IN: string = _createSlideInY(-480);
const SLIDE_DOWN_OUT: string = _createSlideOutY(790);

function _createSlideInY(fromY: number): string {
  return keyframes({
    from: { transform: `translateY(${fromY}px)` },
    to: { transform: `translateY(0)` }
    /*from: { transform: `translate3d(0,${fromY}px,0)` },
    to: { transform: `translate3d(0,0,0)` }*/
  });
}

function _createSlideOutY(toY: number): string {
  return keyframes({
    from: { transform: `translateY(0)` },
    to: { transform: `translateY(${toY}px)` }
    /*from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(0,${toY}px,0)` }*/
  });
}

const FADE_IN: string = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 }
});

const FADE_OUT: string = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 }
});

// Check why from 0x is not starting at correct position?
// Hence using slideUpOutKeyframes instead of "SLIDE_UP_OUT"
const slideUpOutKeyframes = keyframes({
  from: { transform: `translateY(-790px)` },
  to: { transform: `translateY(-1270px)` }
});

export const wizardAnimationDurationMilliSec = 667 + testTiming * 1000;

const titleInAnimDuration = (0.667 + testTiming).toString() + 's';
const titleDescInAnimDuration = (0.617 + testTiming).toString() + 's';
const contentInAnimDuration = (0.567 + testTiming).toString() + 's';

const titleInAnimDelay = '0s';
const titleDescInAnimDelay = '0.05s';
const contentInAnimDelay = '0.1s';

const titleFadeInAnimDelay = '.250s';
const titleDescFadeInAnimDelay = '0.200s';
const contentFadeInAnimDelay = '0.150s';

const titleOutAnimDuration = (0.567 + testTiming).toString() + 's';
const titleDescOutAnimDuration = (0.617 + testTiming).toString() + 's';
const contentOutAnimDuration = (0.667 + testTiming).toString() + 's';

const fadeAnimDuration = (0.417 + testTiming).toString() + 's';
const animationOutDelay = '0s';

/* Animation for Title */
export const titleSlideUpOutAnimation = _createAnimation(
  `${FADE_OUT}`,
  fadeAnimDuration,
  fadeOutTimingFunction,
  animationOutDelay,
  `${SLIDE_UP_OUT}`,
  titleOutAnimDuration,
  slideOutTimingFunction,
  animationOutDelay
);

export const titleSlideUpInAnimation = _createAnimation(
  `${FADE_IN}`,
  fadeAnimDuration,
  fadeInTimingFunction,
  titleFadeInAnimDelay,
  `${SLIDE_UP_IN}`,
  titleInAnimDuration,
  slideInTimingFunction,
  titleInAnimDelay
);

export const titleSlideDownOutAnimation = _createAnimation(
  `${FADE_OUT}`,
  fadeAnimDuration,
  fadeOutTimingFunction,
  animationOutDelay,
  `${SLIDE_DOWN_OUT}`,
  titleOutAnimDuration,
  slideOutTimingFunction,
  animationOutDelay
);

export const titleSlideDownInAnimation = _createAnimation(
  `${FADE_IN}`,
  fadeAnimDuration,
  fadeInTimingFunction,
  titleFadeInAnimDelay,
  `${SLIDE_DOWN_IN}`,
  titleInAnimDuration,
  slideInTimingFunction,
  titleInAnimDelay
);

/* Animation for Title description */
export const titleDescSlideUpOutAnimation = _createAnimation(
  `${FADE_OUT}`,
  fadeAnimDuration,
  fadeOutTimingFunction,
  animationOutDelay,
  `${SLIDE_UP_OUT}`,
  titleDescOutAnimDuration,
  slideOutTimingFunction,
  animationOutDelay
);

export const titleDescSlideUpInAnimation = _createAnimation(
  `${FADE_IN}`,
  fadeAnimDuration,
  fadeInTimingFunction,
  titleDescFadeInAnimDelay,
  `${SLIDE_UP_IN}`,
  titleDescInAnimDuration,
  slideInTimingFunction,
  titleDescInAnimDelay
);

export const titleDescSlideDownOutAnimation = _createAnimation(
  `${FADE_OUT}`,
  fadeAnimDuration,
  fadeOutTimingFunction,
  animationOutDelay,
  `${SLIDE_DOWN_OUT}`,
  titleDescOutAnimDuration,
  slideOutTimingFunction,
  animationOutDelay
);

export const titleDescSlideDownInAnimation = _createAnimation(
  `${FADE_IN}`,
  fadeAnimDuration,
  fadeInTimingFunction,
  titleDescFadeInAnimDelay,
  `${SLIDE_DOWN_IN}`,
  titleDescInAnimDuration,
  slideInTimingFunction,
  titleDescInAnimDelay
);

/* Animation for Content */
export const contentSlideUpOutAnimation = _createAnimation(
  `${FADE_OUT}`,
  fadeAnimDuration,
  fadeOutTimingFunction,
  animationOutDelay,
  slideUpOutKeyframes, // `${SLIDE_UP_OUT}`,
  contentOutAnimDuration,
  slideOutTimingFunction,
  animationOutDelay
);

export const contentSlideUpInAnimation = _createAnimation(
  `${FADE_IN}`,
  fadeAnimDuration,
  fadeInTimingFunction,
  contentFadeInAnimDelay,
  `${SLIDE_UP_IN}`,
  contentInAnimDuration,
  slideInTimingFunction,
  contentInAnimDelay
);

export const contentSlideDownOutAnimation = _createAnimation(
  `${FADE_OUT}`,
  fadeAnimDuration,
  fadeOutTimingFunction,
  animationOutDelay,
  `${SLIDE_DOWN_OUT}`,
  contentOutAnimDuration,
  slideOutTimingFunction,
  animationOutDelay
);

export const contentSlideDownInAnimation = _createAnimation(
  `${FADE_IN}`,
  fadeAnimDuration,
  fadeInTimingFunction,
  contentFadeInAnimDelay,
  `${SLIDE_DOWN_IN}`,
  contentInAnimDuration,
  slideInTimingFunction,
  contentInAnimDelay
);
