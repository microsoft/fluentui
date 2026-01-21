'use client';

import * as React from 'react';
import { Slide, SlideParams } from '@fluentui/react-motion-components-preview';
import { motionTokens } from '@fluentui/react-motion';
import { useMergedRefs } from '@fluentui/react-utilities';
import { DATA_POSITIONING_PLACEMENT, POSITIONING_END_EVENT } from './constants';
import { getSlideOffsets } from './getSlideOffsets';
import type { PositioningPlacement } from './types';

/**
 * Parameters for the PositioningSlide motion component.
 */
export type PositioningSlideParams = Pick<SlideParams, 'duration' | 'easing' | 'animateOpacity'> & {
  /**
   * The slide distance value (with units).
   */
  distance: string;

  /**
   * A React element that will be cloned and will have motion effects applied to it.
   * Must support ref forwarding.
   */
  children: React.ReactElement<{ ref?: React.Ref<HTMLElement>; style?: React.CSSProperties }>;
};

/**
 * A React component that applies positioning-aware slide-in transitions to its children.
 *
 * This component waits for the `fui-positioningend` event before starting the animation,
 * ensuring that the `data-popper-placement` DOM attribute is set by the positioning system.
 * It then renders `Slide.In` with the correct offsets based on the placement.
 *
 * This avoids the performance overhead of tracking placement in React state.
 *
 * @example
 * ```tsx
 * import { PositioningSlide } from '@fluentui/react-positioning';
 *
 * <PositioningSlide distance="10px">
 *   <PopoverSurface />
 * </PositioningSlide>
 * ```
 */
export const PositioningSlide: React.FC<PositioningSlideParams> = props => {
  const {
    distance,
    duration = motionTokens.durationSlower,
    easing = motionTokens.curveDecelerateMid,
    animateOpacity = true,
    children,
  } = props;

  const [offsets, setOffsets] = React.useState<{ x: string; y: string } | null>(null);

  // Callback ref that sets up the positioning end listener
  // This runs synchronously during commit, before positioning runs
  const callbackRef = React.useCallback(
    (element: HTMLElement | null) => {
      if (!element) {
        return;
      }

      const handlePositioningEnd = () => {
        const placement = element.getAttribute(DATA_POSITIONING_PLACEMENT) as PositioningPlacement | null;
        setOffsets(getSlideOffsets({ placement, distance }));
      };

      // Check if placement is already set (e.g., on re-mount)
      const existingPlacement = element.getAttribute(DATA_POSITIONING_PLACEMENT);
      if (existingPlacement) {
        handlePositioningEnd();
      } else {
        // Wait for positioning to complete
        element.addEventListener(POSITIONING_END_EVENT, handlePositioningEnd, { once: true });
      }
    },
    [distance],
  );

  // IMPORTANT: Merge our ref with the existing ref from children (e.g., positioning containerRef)
  // so we don't break the positioning system
  const existingRef = children.props.ref;
  const mergedRef = useMergedRefs(callbackRef, existingRef);

  // Once we have offsets, render Slide.In - it handles cloning and refs internally
  if (offsets !== null) {
    return (
      <Slide.In duration={duration} easing={easing} outX={offsets.x} outY={offsets.y} animateOpacity={animateOpacity}>
        {children}
      </Slide.In>
    );
  }

  // Before positioning is ready, render child with merged ref and hidden
  return React.cloneElement(children, {
    ref: mergedRef,
    style: { ...children.props.style, opacity: 0 },
  });
};
