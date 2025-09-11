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
  // The DURATION_3 constant is a string in seconds, but WAAPI expects a number in ms
  duration = 367,
  easing = motionTokens.curveDecelerateMax,
  animationDirection = AnimationDirection.Vertical,
  animateBackwards = false,
  children,
}) => {
  let fromX = '0px';
  let fromY = '0px';
  if (animationDirection === AnimationDirection.Horizontal) {
    fromX = animateBackwards ? '-20px' : '20px';
  } else {
    // default to vertical
    fromY = animateBackwards ? '-20px' : '20px';
  }
  return <Slide.In {...{ duration, easing, fromX, fromY }}>{children}</Slide.In>;
};
