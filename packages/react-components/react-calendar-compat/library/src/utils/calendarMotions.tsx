import { motionTokens } from '@fluentui/react-motion';
import { Slide } from '@fluentui/react-motion-components-preview';
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
