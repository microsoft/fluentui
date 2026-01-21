import { motionTokens } from '@fluentui/react-motion';
import { Fade, Slide } from '@fluentui/react-motion-components-preview';
import * as React from 'react';
import { AnimationDirection } from '../Calendar';
import { JSXElement } from '@fluentui/react-utilities';

export const DirectionalSlide: React.FC<{
  duration?: number;
  easing?: string;
  animationDirection?: AnimationDirection;
  animateBackwards?: boolean;
  children: JSXElement;
}> = ({
  // Using durationSlower (400ms) as the closest token to the original 367ms
  duration = motionTokens.durationSlower,
  easing = motionTokens.curveDecelerateMax,
  animationDirection = AnimationDirection.Vertical,
  animateBackwards = false,
  children,
}) => {
  let outX = '0px';
  let outY = '0px';
  const distance = animateBackwards ? '-20px' : '20px';
  if (animationDirection === AnimationDirection.Horizontal) {
    outX = distance;
  } else {
    // default to vertical
    outY = distance;
  }
  return (
    <Slide.In duration={duration} easing={easing} outX={outX} outY={outY}>
      {children}
    </Slide.In>
  );
};

/**
 * A wrapper component that fades in its children when the navigationKey changes.
 * Used for header text that should fade when navigating between months/years.
 *
 * Note: Using motionTokens.durationGentle (250ms) which closely matches DURATION_2 (267ms).
 * The original EASING_FUNCTION_2 (cubic-bezier(.1,.25,.75,.9)) has no exact token equivalent,
 * using the default motion easing which provides a similar smooth fade effect.
 */
export const HeaderFade: React.FC<{
  /** Key that changes when navigation occurs, triggering the fade animation */
  navigationKey: string | number;
  children: JSXElement;
}> = ({ navigationKey, children }) => {
  return (
    <Fade.In key={navigationKey} duration={motionTokens.durationGentle}>
      {children}
    </Fade.In>
  );
};
