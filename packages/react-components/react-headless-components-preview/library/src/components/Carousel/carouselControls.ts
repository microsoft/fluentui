'use client';

import * as React from 'react';

type CarouselControlAction = 'autoplay' | 'previous' | 'next';

/**
 * Each carousel's own controls, keyed by the carousel's viewport ref (stable and unique per carousel).
 *
 * Controls register their forwarded DOM element, so ownership survives render callbacks that rewrite attributes,
 * portals and shadow roots, while a carousel nested in a slide registers its controls with itself only.
 */
const ownControls = new WeakMap<object, Map<Element, CarouselControlAction>>();

/** Ref that registers the element as `owner`'s `action` control while it is mounted. */
export function useCarouselControlRef<T extends Element>(
  owner: object,
  action: CarouselControlAction,
): React.RefCallback<T> {
  const node = React.useRef<T | null>(null);
  return React.useCallback(
    (element: T | null) => {
      const previous = node.current;
      if (previous && ownControls.get(owner)?.get(previous) === action) {
        ownControls.get(owner)?.delete(previous);
      }
      node.current = element;
      if (element) {
        let controls = ownControls.get(owner);
        if (!controls) {
          controls = new Map();
          ownControls.set(owner, controls);
        }
        controls.set(element, action);
      }
    },
    [owner, action],
  );
}

/** The action of `owner`'s own control that is or contains `target`; a nested carousel's controls are content. */
export function getOwnCarouselAction(
  owner: object,
  target: Node | null | undefined,
): CarouselControlAction | undefined {
  let found: CarouselControlAction | undefined;
  if (target) {
    ownControls.get(owner)?.forEach((action, control) => {
      if (!found && control.contains(target)) {
        found = action;
      }
    });
  }
  return found;
}
