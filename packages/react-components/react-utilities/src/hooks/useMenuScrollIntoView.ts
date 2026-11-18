'use client';

import * as React from 'react';

type ParentMenu = {
  parentRef: React.RefObject<HTMLElement | null>;
  triggerRef: React.RefObject<HTMLElement | null>;
};

const parents = new WeakMap<HTMLElement, ParentMenu>();
const options: ScrollIntoViewOptions & { container: 'nearest' } = {
  block: 'nearest',
  inline: 'nearest',
  behavior: 'instant',
  container: 'nearest',
};

/**
 * Reveals owned focus and logical ancestor menu invokers after size or viewport changes.
 * The ownership callback must be stable and return null for focus owned by another surface.
 * Consumers retain responsibility for sizing and positioning. Browsers without support for
 * `container: 'nearest'` may also scroll enclosing containers.
 */
export const useMenuScrollIntoView_unstable = (
  open: boolean,
  triggerRef: React.RefObject<HTMLElement | null>,
  parentRef: React.RefObject<HTMLElement | null>,
  getOwnedActive: (surface: HTMLElement) => Element | null,
): React.RefCallback<HTMLElement> => {
  const [surface, setSurface] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    const ownerWindow = surface?.ownerDocument.defaultView;
    if (!open || !surface || !ownerWindow) {
      return;
    }

    // Keep live refs: React can replace an invoker without closing its submenu.
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

      const ancestors: { parent: HTMLElement; trigger: HTMLElement | null }[] = [];
      const visited = new Set([surface]);
      let relation = parents.get(surface);
      while (relation) {
        const ancestor = relation.parentRef.current;
        const trigger = relation.triggerRef.current;
        if (!ancestor?.isConnected || visited.has(ancestor)) {
          break;
        }
        visited.add(ancestor);
        ancestors.unshift({ parent: ancestor, trigger: trigger?.isConnected ? trigger : null });
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

      const active = getOwnedActive(surface);
      if (!active) {
        return;
      }

      // Portalled submenus have logical ancestors outside their DOM scroll chain.
      for (const ancestor of ancestors) {
        ancestor.trigger?.scrollIntoView(options);
      }
      active.scrollIntoView(options);
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
  }, [open, surface, parentRef, triggerRef, getOwnedActive]);

  return setSurface;
};
