'use client';

import * as React from 'react';
import { useEventCallback, isHTMLElement } from '@fluentui/react-utilities';
import type { PositioningProps } from './types';
import { POSITIONING_SLIDE_DIRECTION_VAR_X, POSITIONING_SLIDE_DIRECTION_VAR_Y } from './constants';

const registeredProperties = new WeakMap<Document, Set<string>>();
const slideDirectionProperties = [POSITIONING_SLIDE_DIRECTION_VAR_X, POSITIONING_SLIDE_DIRECTION_VAR_Y];

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
  /** The target document for CSS.registerProperty. */
  targetDocument: Document | undefined;
  /** The user's original onPositioningEnd callback, if any. */
  onPositioningEnd?: PositioningProps['onPositioningEnd'];
};

/**
 * A hook that manages CSS custom properties for slide direction based on positioning placement.
 *
 * It wraps the `onPositioningEnd` callback to set `--fui-positioning-slide-direction-x` and
 * `--fui-positioning-slide-direction-y` CSS custom properties on the positioned element,
 * and registers them via `CSS.registerProperty` to avoid properties propagation down to a DOM tree.
 *
 * @returns The wrapped `onPositioningEnd` handler to pass to the positioning config.
 */
export function usePositioningSlideDirection(
  options: UsePositioningSlideDirectionOptions,
): NonNullable<PositioningProps['onPositioningEnd']> {
  const { targetDocument, onPositioningEnd } = options;

  const handlePositionEnd: NonNullable<PositioningProps['onPositioningEnd']> = useEventCallback(e => {
    onPositioningEnd?.(e);

    const element = e.target;
    const placement = e.detail.placement;

    if (!isHTMLElement(element)) {
      return;
    }

    const { x, y } = getPlacementSlideDirections(placement);

    element.style.setProperty(POSITIONING_SLIDE_DIRECTION_VAR_X, `${x}px`);
    element.style.setProperty(POSITIONING_SLIDE_DIRECTION_VAR_Y, `${y}px`);
  });

  React.useEffect(() => {
    const css = targetDocument?.defaultView?.CSS;
    if (!targetDocument || !css?.registerProperty) {
      return;
    }
    let properties = registeredProperties.get(targetDocument);
    if (!properties) {
      properties = new Set<string>();
      registeredProperties.set(targetDocument, properties);
    }
    for (const name of slideDirectionProperties) {
      if (properties.has(name)) {
        continue;
      }
      try {
        css.registerProperty({ name, syntax: '<length>', inherits: false, initialValue: '0px' });
        properties.add(name);
      } catch (error) {
        if (error && typeof error === 'object' && 'name' in error && error.name === 'InvalidModificationError') {
          properties.add(name);
        }
      }
    }
  }, [targetDocument]);

  return handlePositionEnd;
}
