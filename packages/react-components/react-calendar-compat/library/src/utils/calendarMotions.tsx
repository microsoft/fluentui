'use client';

import { motionTokens, createMotionComponent } from '@fluentui/react-motion';
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

// One-way "out" motion for the day grid's transition (filler) rows. It mirrors the legacy CSS
// animation that combined a fade-out, a vertical slide, and a final height/width collapse
// (`TRANSITION_ROW_DISAPPEARANCE`). At rest the row is `position: absolute` with `height/width: 0`
// and `opacity: 0`; this motion temporarily expands it to full size, slides + fades it out, then
// collapses it back so it returns to its hidden resting state once the animation's forward fill
// is in effect.
const TransitionRowSlideOut = createMotionComponent(({ outY }: { outY: string }) => [
  {
    keyframes: [
      { opacity: 1, transform: 'translate3d(0, 0, 0)', height: '28px', width: '100%', overflow: 'visible' },
      {
        opacity: 0,
        transform: `translate3d(0, ${outY}, 0)`,
        height: '28px',
        width: '100%',
        overflow: 'visible',
        offset: 0.999,
      },
      { opacity: 0, transform: `translate3d(0, ${outY}, 0)`, height: '0px', width: '0px', overflow: 'hidden' },
    ],
    duration: motionTokens.durationSlower,
    easing: motionTokens.curveDecelerateMax,
  },
]);

export type DirectionalSlideOutProps = {
  /** Which transition row this wraps: the first (top) or last (bottom) filler row. */
  edge: 'first' | 'last';
  animationDirection?: AnimationDirection;
  animateBackwards?: boolean;
  /**
   * When this value changes, the slide-out animation replays from the start on the same DOM element
   * without remounting the subtree, matching {@link DirectionalSlide}.
   */
  replayKey?: string | number;
  children: JSXElement;
};

// `forwardRef` per the repo rule banning `React.FC`. Like `DirectionalSlide`, this wrapper renders
// no DOM of its own — the forwarded ref is cloned onto the child so callers get a ref to the actual
// `<tr>`, keeping the wrapper transparent for table semantics.
export const DirectionalSlideOut = React.forwardRef<HTMLElement, DirectionalSlideOutProps>((props, ref) => {
  const { edge, animationDirection = AnimationDirection.Vertical, animateBackwards, replayKey, children } = props;

  const child = React.Children.only(children) as React.ReactElement<{ ref?: React.Ref<HTMLElement> }>;
  const mergedRef = useMergedRefs(ref, getReactElementRef(child));
  const childWithRef = React.cloneElement(child, { ref: mergedRef });

  // The legacy animation only ran for vertical navigation, and only on the row matching the
  // navigation direction: the top (first) row slides up & out when navigating forward, the bottom
  // (last) row slides down & out when navigating backward. `animateBackwards === undefined` means no
  // navigation has happened yet, so nothing animates on initial mount (the row stays collapsed).
  const isVertical = animationDirection !== AnimationDirection.Horizontal;
  const shouldAnimate =
    isVertical && animateBackwards !== undefined && (edge === 'first' ? !animateBackwards : animateBackwards);

  if (!shouldAnimate) {
    return childWithRef;
  }

  // First (top) row slides up and out; last (bottom) row slides down and out.
  const outY = edge === 'first' ? '-20px' : '20px';

  return (
    <TransitionRowSlideOut outY={outY} replayKey={replayKey}>
      {childWithRef}
    </TransitionRowSlideOut>
  );
});

DirectionalSlideOut.displayName = 'DirectionalSlideOut';
