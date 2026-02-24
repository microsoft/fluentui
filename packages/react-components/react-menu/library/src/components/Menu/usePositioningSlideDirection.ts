'use client';

import * as React from 'react';
import { useEventCallback, isHTMLElement } from '@fluentui/react-utilities';
import type { PositioningProps } from '@fluentui/react-positioning';
import { slideDirectionVarX, slideDirectionVarY } from './MenuSurfaceMotion';

/**
 * Returns the slide direction unit vectors for a given Floating UI placement.
 * Values are -1, 0, or 1, representing the direction the element slides in from.
 */
export function getPlacementSlideDirections(placement: string): { x: number; y: number } {
  const side = placement.split('-')[0];
  // Default to sliding down from the top side
  let x = 0;
  let y = 1;

  if (side === 'right') {
    x = -1;
    y = 0;
  } else if (side === 'bottom') {
    x = 0;
    y = -1;
  } else if (side === 'left') {
    x = 1;
    y = 0;
  }

  return { x, y };
}

type UsePositioningSlideDirectionOptions = {
  /** The target window for CSS.registerProperty. */
  targetWindow: (Window & typeof globalThis) | null | undefined;
  /** The user's original onPositioningEnd callback, if any. */
  onPositioningEnd?: PositioningProps['onPositioningEnd'];
};

/**
 * A hook that manages CSS custom properties for slide direction based on positioning placement.
 *
 * It wraps the `onPositioningEnd` callback to set `--fui-positioning-slide-direction-x` and
 * `--fui-positioning-slide-direction-y` CSS custom properties on the positioned element,
 * and registers them via `CSS.registerProperty` for smooth animation interpolation.
 *
 * @returns The wrapped `onPositioningEnd` handler to pass to the positioning config.
 */
export function usePositioningSlideDirection(
  options: UsePositioningSlideDirectionOptions,
): NonNullable<PositioningProps['onPositioningEnd']> {
  const { targetWindow, onPositioningEnd } = options;

  const handlePositionEnd: NonNullable<PositioningProps['onPositioningEnd']> = useEventCallback(e => {
    onPositioningEnd?.(e);

    const element = e.target;
    const placement = e.detail.placement;

    if (!isHTMLElement(element)) {
      return;
    }

    const { x, y } = getPlacementSlideDirections(placement);

    element.style.setProperty(slideDirectionVarX, `${x}px`);
    element.style.setProperty(slideDirectionVarY, `${y}px`);
  });

  // Register the CSS custom properties so they can be interpolated during animations.
  // CSS.registerProperty is idempotent — the try/catch handles the case where
  // properties are already registered.
  React.useEffect(() => {
    const registerProperty =
      targetWindow?.CSS?.registerProperty ??
      (() => {
        // No-op if registerProperty is not supported
      });

    try {
      registerProperty({
        name: slideDirectionVarX,
        syntax: '<length>',
        inherits: false,
        initialValue: '0px',
      });
      registerProperty({
        name: slideDirectionVarY,
        syntax: '<length>',
        inherits: false,
        initialValue: '0px',
      });
    } catch (e) {
      // Ignore errors from registerProperty, which can occur if the properties are already registered
    }
  }, [targetWindow]);

  return handlePositionEnd;
}
