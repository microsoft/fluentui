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
  /**
   * When this value changes, the slide animation replays from the start on the same DOM element
   * without remounting the subtree. Use this instead of a React `key` to retrigger the animation
   * on navigation, so focus and DOM identity are preserved during keyboard navigation.
   */
  replayKey?: string | number;
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
    replayKey,
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

  // `Slide.In` bakes `outY` into its atoms at mount and `replayKey` only replays them, so a
  // direction flip needs a remount. Same-direction navigations keep the key and reuse the DOM.
  const directionKey = animateBackwards ? 'back' : 'fwd';

  return (
    <Slide.In key={directionKey} duration={duration} easing={easing} outX={outX} outY={outY} replayKey={replayKey}>
      {childWithRef}
    </Slide.In>
  );
});

DirectionalSlide.displayName = 'DirectionalSlide';
