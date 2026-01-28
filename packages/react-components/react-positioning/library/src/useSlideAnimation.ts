'use client';

import * as React from 'react';
import { motionTokens, useAnimateAtoms, useIsReducedMotion } from '@fluentui/react-motion';
import { slideAtom, fadeAtom } from '@fluentui/react-motion-components-preview';
import { DATA_POSITIONING_PLACEMENT, POSITIONING_END_EVENT } from './constants';
import { getSlideOffsets } from './getSlideOffsets';
import type { PositioningPlacement } from './types';

/**
 * Parameters for the useSlideAnimation hook.
 */
export type UseSlideAnimationParams = {
  /**
   * The slide distance value (with units).
   * @default '10px'
   */
  distance?: string;

  /**
   * The duration of the animation in milliseconds.
   * @default motionTokens.durationSlower
   */
  duration?: number;

  /**
   * The easing curve for the animation.
   * @default motionTokens.curveDecelerateMid
   */
  easing?: string;

  /**
   * Whether to also animate opacity alongside the slide.
   * @default true
   */
  animateOpacity?: boolean;
};

/**
 * A React hook that provides imperative slide animation for positioned elements.
 *
 * This hook returns a callback ref that:
 * 1. Sets initial opacity to 0 to hide the element before positioning
 * 2. Listens for the `fui-positioningend` event
 * 3. Reads `data-popper-placement` to determine animation direction
 * 4. Triggers a WAAPI slide animation imperatively (no React re-renders)
 *
 * @example
 * ```tsx
 * const slideRef = useSlideAnimation({ distance: '10px' });
 * const mergedRef = useMergedRefs(containerRef, slideRef);
 *
 * return <div ref={mergedRef}>...</div>;
 * ```
 */
export function useSlideAnimation(params: UseSlideAnimationParams = {}): React.RefCallback<HTMLElement> {
  const {
    distance = '10px',
    duration = motionTokens.durationSlower,
    easing = motionTokens.curveDecelerateMid,
    animateOpacity = true,
  } = params;

  const animateAtoms = useAnimateAtoms();
  const isReducedMotion = useIsReducedMotion();
  const animationRef = React.useRef<ReturnType<typeof animateAtoms> | null>(null);

  // Cleanup function to cancel any running animations
  const cleanup = React.useCallback(() => {
    if (animationRef.current) {
      animationRef.current.cancel();
      animationRef.current.dispose();
      animationRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  React.useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const callbackRef = React.useCallback(
    (element: HTMLElement | null) => {
      // Cleanup previous animations when element changes
      cleanup();

      if (!element) {
        return;
      }

      // Hide element initially (before positioning is ready)
      element.style.opacity = '0';

      const handlePositioningEnd = () => {
        const placement = element.getAttribute(DATA_POSITIONING_PLACEMENT) as PositioningPlacement | null;
        const offsets = getSlideOffsets({ placement, distance });

        // Generate atoms for the animation
        const atoms = [
          slideAtom({
            direction: 'enter',
            duration,
            easing,
            outX: offsets.x,
            outY: offsets.y,
          }),
        ];

        if (animateOpacity) {
          atoms.push(
            fadeAtom({
              direction: 'enter',
              duration,
              easing,
            }),
          );
        } else {
          // If not animating opacity, immediately show the element
          element.style.opacity = '';
        }

        // Run the animation using useAnimateAtoms
        animationRef.current = animateAtoms(element, atoms, { isReducedMotion: isReducedMotion() });
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
    [animateAtoms, animateOpacity, cleanup, distance, duration, easing, isReducedMotion],
  );

  return callbackRef;
}
