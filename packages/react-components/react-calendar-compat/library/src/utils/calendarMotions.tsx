'use client';

import { motionTokens } from '@fluentui/react-motion';
import { Slide } from '@fluentui/react-motion-components-preview';
import * as React from 'react';
import { getReactElementRef, useMergedRefs } from '@fluentui/react-utilities';
import { AnimationDirection } from '../Calendar';
import type { JSXElement } from '@fluentui/react-utilities';

export type DirectionalSlideProps = {
  duration?: number;
  easing?: string;
  animationDirection?: AnimationDirection;
  animateBackwards?: boolean;
  children: JSXElement;
};

// `forwardRef` per the repo rule banning `React.FC`. This wrapper renders no DOM of its own,
// so the forwarded ref is cloned onto the child below — callers get a ref to the actual
// `<tr>`/`<div role="row">`, keeping `DirectionalSlide` transparent.
export const DirectionalSlide = React.forwardRef<HTMLElement, DirectionalSlideProps>((props, ref) => {
  const {
    // Using durationSlower (400ms) as the closest token to the original 367ms
    duration = motionTokens.durationSlower,
    easing = motionTokens.curveDecelerateMax,
    animationDirection = AnimationDirection.Vertical,
    animateBackwards = false,
    children,
  } = props;

  let outX = '0px';
  let outY = '0px';
  const distance = animateBackwards ? '-20px' : '20px';
  if (animationDirection === AnimationDirection.Horizontal) {
    outX = distance;
  } else {
    outY = distance;
  }

  // Merge the forwarded ref with the child's own ref (preserving any caller-supplied ref on the
  // child element). `Slide.In`'s `useChildElement` will further merge its motion ref on top.
  const child = React.Children.only(children) as React.ReactElement<{ ref?: React.Ref<HTMLElement> }>;
  const mergedRef = useMergedRefs(ref, getReactElementRef(child));
  const childWithRef = React.cloneElement(child, { ref: mergedRef });

  return (
    <Slide.In duration={duration} easing={easing} outX={outX} outY={outY}>
      {childWithRef}
    </Slide.In>
  );
});

DirectionalSlide.displayName = 'DirectionalSlide';
