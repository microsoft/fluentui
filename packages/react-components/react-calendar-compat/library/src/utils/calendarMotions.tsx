'use client';

import { motionTokens, createMotionComponent } from '@fluentui/react-motion';
import { Slide, fadeAtom, slideAtom } from '@fluentui/react-motion-components-preview';
import * as React from 'react';
import { getReactElementRef, useMergedRefs } from '@fluentui/react-utilities';
import { AnimationDirection } from '../Calendar';
import type { JSXElement } from '@fluentui/react-utilities';

// Distance the rows travel as they slide in/out. Shared so the enter and exit motions stay in sync.
const SLIDE_DISTANCE = '20px';

// Clones the single child with a ref that merges the forwarded ref and the child's own ref. Lets the
// `DirectionalSlideIn`/`DirectionalSlideOut` wrappers render no DOM of their own while still exposing a
// ref to the actual child element (e.g. the `<tr>`), keeping them transparent for table semantics.
function useChildWithMergedRef(children: JSXElement, ref: React.Ref<HTMLElement>) {
  const child = React.Children.only(children) as React.ReactElement<{ ref?: React.Ref<HTMLElement> }>;
  const mergedRef = useMergedRefs(ref, getReactElementRef(child));
  return React.cloneElement(child, { ref: mergedRef });
}

export type DirectionalSlideInProps = {
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
// `<tr>`/`<div role="row">`, keeping `DirectionalSlideIn` transparent.
export const DirectionalSlideIn = React.forwardRef<HTMLElement, DirectionalSlideInProps>((props, ref) => {
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
  const distance = animateBackwards ? `-${SLIDE_DISTANCE}` : SLIDE_DISTANCE;
  if (animationDirection === AnimationDirection.Horizontal) {
    outX = distance;
  } else {
    outY = distance;
  }

  // `Slide.In`'s `useChildElement` will further merge its motion ref on top.
  const childWithRef = useChildWithMergedRef(children, ref);

  // `Slide.In` bakes `outY` into its atoms at mount and `replayKey` only replays them, so a
  // direction flip needs a remount. Same-direction navigations keep the key and reuse the DOM.
  const directionKey = animateBackwards ? 'back' : 'fwd';

  return (
    <Slide.In key={directionKey} duration={duration} easing={easing} outX={outX} outY={outY} replayKey={replayKey}>
      {childWithRef}
    </Slide.In>
  );
});

DirectionalSlideIn.displayName = 'DirectionalSlideIn';

// One-way "out" motion for the day grid's transition (filler) rows. It fades and slides the row
// out in the navigation direction (the top row slides up, the bottom row slides down). The row is
// `position: absolute` and `opacity: 0` at rest, so the motion's forwards fill leaves it back at its
// hidden resting state once it finishes. Composed from Fluent's `fadeAtom` + `slideAtom` so it stays
// consistent with the rest of the motion system; there is no size animation, because the row is
// overlaid out of flow and hidden via opacity (not by collapsing its box).
const TransitionRowSlideOut = createMotionComponent(({ outY }: { outY: string }) => {
  const duration = motionTokens.durationSlower;
  const easing = motionTokens.curveDecelerateMax;
  return [fadeAtom({ direction: 'exit', duration, easing }), slideAtom({ direction: 'exit', duration, easing, outY })];
});

export type DirectionalSlideOutProps = {
  /** Which transition row this wraps: the first (top) or last (bottom) filler row. */
  edge: 'first' | 'last';
  animationDirection?: AnimationDirection;
  animateBackwards?: boolean;
  /**
   * When this value changes, the slide-out animation replays from the start on the same DOM element
   * without remounting the subtree, matching {@link DirectionalSlideIn}.
   */
  replayKey?: string | number;
  children: JSXElement;
};

// `forwardRef` per the repo rule banning `React.FC`. Like `DirectionalSlideIn`, this wrapper renders
// no DOM of its own — the forwarded ref is cloned onto the child so callers get a ref to the actual
// `<tr>`, keeping the wrapper transparent for table semantics.
export const DirectionalSlideOut = React.forwardRef<HTMLElement, DirectionalSlideOutProps>((props, ref) => {
  const { edge, animationDirection = AnimationDirection.Vertical, animateBackwards, replayKey, children } = props;

  const childWithRef = useChildWithMergedRef(children, ref);

  // The legacy animation only ran for vertical navigation, and only on the row matching the
  // navigation direction: the top (first) row slides up & out when navigating forward, the bottom
  // (last) row slides down & out when navigating backward. `animateBackwards === undefined` means no
  // navigation has happened yet, so nothing animates on initial mount (the row stays hidden at rest).
  const isVertical = animationDirection !== AnimationDirection.Horizontal;
  const shouldAnimate =
    isVertical && animateBackwards !== undefined && (edge === 'first' ? !animateBackwards : animateBackwards);

  if (!shouldAnimate) {
    return childWithRef;
  }

  // First (top) row slides up and out; last (bottom) row slides down and out.
  const outY = edge === 'first' ? `-${SLIDE_DISTANCE}` : SLIDE_DISTANCE;

  return (
    <TransitionRowSlideOut outY={outY} replayKey={replayKey}>
      {childWithRef}
    </TransitionRowSlideOut>
  );
});

DirectionalSlideOut.displayName = 'DirectionalSlideOut';
