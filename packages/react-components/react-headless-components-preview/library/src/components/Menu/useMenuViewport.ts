'use client';

import * as React from 'react';
import { getActiveElement } from '../../hooks/top-layer/utils';

type ParentMenu = {
  parentRef: React.RefObject<HTMLElement | null>;
  triggerRef: React.RefObject<HTMLElement | null>;
};

// Keep refs rather than elements: React can replace an invoker while its submenu stays open.
const parents = new WeakMap<HTMLElement, ParentMenu>();

const revealWithin = (surface: HTMLElement, target: Element) => {
  const bounds = surface.getBoundingClientRect();
  const item = target.getBoundingClientRect();
  const top = bounds.top + surface.clientTop;
  const bottom = top + surface.clientHeight;
  const left = bounds.left + surface.clientLeft;
  const right = left + surface.clientWidth;

  if (item.top < top) {
    surface.scrollTop += item.top - top;
  } else if (item.bottom > bottom) {
    // Align oversized items at the start rather than alternating between their two edges.
    surface.scrollTop += Math.min(item.top - top, item.bottom - bottom);
  }

  // Physical deltas also support negative scrollLeft in RTL and vertical writing modes.
  if (item.left < left && item.right < right) {
    surface.scrollLeft += Math.max(item.left - left, item.right - right);
  } else if (item.right > right && item.left > left) {
    surface.scrollLeft += Math.min(item.left - left, item.right - right);
  }
};

export const useMenuViewport = (
  open: boolean,
  triggerRef: React.RefObject<HTMLElement | null>,
  parentRef: React.RefObject<HTMLElement | null>,
): React.RefCallback<HTMLElement> => {
  const [surface, setSurface] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    const ownerWindow = surface?.ownerDocument.defaultView;
    if (!open || !surface || !ownerWindow) {
      return;
    }

    parents.set(surface, { parentRef, triggerRef });
    const observedAncestors = new Set<HTMLElement>();
    let frame: number | undefined;
    let disposed = false;
    let previousWidth = ownerWindow.innerWidth;
    let previousHeight = ownerWindow.innerHeight;

    const reconcile = () => {
      frame = undefined;
      if (disposed || !surface.isConnected) {
        return;
      }

      const ancestors: { parent: HTMLElement; trigger: HTMLElement }[] = [];
      const visited = new Set([surface]);
      let relation = parents.get(surface);
      while (relation) {
        const ancestor = relation.parentRef.current;
        const trigger = relation.triggerRef.current;
        if (!ancestor?.isConnected || !trigger?.isConnected || visited.has(ancestor)) {
          break;
        }
        visited.add(ancestor);
        ancestors.unshift({ parent: ancestor, trigger });
        relation = parents.get(ancestor);
      }

      const currentAncestors = new Set(ancestors.map(ancestor => ancestor.parent));
      let changed = false;
      for (const ancestor of observedAncestors) {
        if (!currentAncestors.has(ancestor)) {
          observer?.unobserve(ancestor);
          ancestor.removeEventListener('scroll', schedule);
          observedAncestors.delete(ancestor);
          changed = true;
        }
      }
      for (const ancestor of currentAncestors) {
        if (!observedAncestors.has(ancestor)) {
          observer?.observe(ancestor);
          ancestor.addEventListener('scroll', schedule);
          observedAncestors.add(ancestor);
          changed = true;
        }
      }
      if (changed) {
        previousDimensions = dimensions();
      }

      const active = getActiveElement(surface);
      if (!active || !surface.contains(active) || active.closest('[popover]') !== surface) {
        return;
      }

      for (const ancestor of ancestors) {
        revealWithin(ancestor.parent, ancestor.trigger);
      }
      revealWithin(surface, active);
    };

    const schedule = () => {
      if (!disposed) {
        frame ??= ownerWindow.requestAnimationFrame(reconcile);
      }
    };

    const resize = () => {
      const growing = ownerWindow.innerHeight > previousHeight && ownerWindow.innerWidth >= previousWidth;
      previousHeight = ownerWindow.innerHeight;
      previousWidth = ownerWindow.innerWidth;
      if (!growing) {
        schedule();
      }
    };

    const dimensions = () =>
      [surface, ...observedAncestors].flatMap(element => [element.clientWidth, element.clientHeight]);
    let previousDimensions = dimensions();
    const observedResize = () => {
      const current = dimensions();
      const growing =
        current.every((value, index) => value >= previousDimensions[index]) &&
        current.some((value, index) => index % 2 === 1 && value > previousDimensions[index]);
      previousDimensions = current;
      if (!growing) {
        schedule();
      }
    };

    const observer = ownerWindow.ResizeObserver ? new ownerWindow.ResizeObserver(observedResize) : undefined;
    observer?.observe(surface);
    surface.addEventListener('focusin', schedule);
    ownerWindow.addEventListener('resize', resize);
    ownerWindow.visualViewport?.addEventListener('resize', schedule);
    ownerWindow.visualViewport?.addEventListener('scroll', schedule);
    schedule();

    return () => {
      disposed = true;
      parents.delete(surface);
      observer?.disconnect();
      for (const ancestor of observedAncestors) {
        ancestor.removeEventListener('scroll', schedule);
      }
      surface.removeEventListener('focusin', schedule);
      ownerWindow.removeEventListener('resize', resize);
      ownerWindow.visualViewport?.removeEventListener('resize', schedule);
      ownerWindow.visualViewport?.removeEventListener('scroll', schedule);
      if (frame !== undefined) {
        ownerWindow.cancelAnimationFrame(frame);
      }
    };
  }, [open, surface, parentRef, triggerRef]);

  return setSurface;
};
