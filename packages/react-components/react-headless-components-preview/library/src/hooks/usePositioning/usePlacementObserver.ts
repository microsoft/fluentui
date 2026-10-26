'use client';

import { useIsomorphicLayoutEffect, useEventCallback } from '@fluentui/react-utilities';
import * as React from 'react';
import { computePosition } from './utils';

/**
 * Mirrors the placement that the browser actually resolves for an
 * anchored element into its `data-placement` attribute. Useful when CSS
 * `position-try-fallbacks` flips the surface after a layout shift, scroll,
 * or content reflow — consumers can style the surface (arrows, animations)
 * via `[data-placement^="above"]` and friends and stay in sync.
 *
 */
export function usePlacementObserver(
  containerEl: HTMLElement | null,
  targetEl: HTMLElement | null,
  targetDocument: Document | undefined,
  disabled: boolean,
  updateSize: () => Element | null,
): () => void {
  const observed = React.useRef<{ observer?: ResizeObserver; parent: Element | null }>({ parent: null });
  const update = useEventCallback(() => {
    const parent = updateSize();
    if (!containerEl || !targetEl || disabled) {
      return;
    }
    if (parent !== observed.current.parent) {
      if (observed.current.parent) {
        observed.current.observer?.unobserve(observed.current.parent);
      }
      if (parent) {
        observed.current.observer?.observe(parent);
      }
      observed.current.parent = parent;
    }

    const result = computePosition(targetEl, containerEl);
    if (!result || !containerEl.offsetHeight) {
      return;
    }

    if (containerEl.getAttribute('data-placement') !== result.placement) {
      containerEl.setAttribute('data-placement', result.placement);
    }
  });

  useIsomorphicLayoutEffect(() => {
    update();
  });

  useIsomorphicLayoutEffect(() => {
    const win = targetDocument?.defaultView;
    if (disabled || !containerEl || !targetEl || !win) {
      return;
    }

    let frame = 0;
    const scheduleUpdate = () => {
      win.cancelAnimationFrame(frame);
      frame = win.requestAnimationFrame(update);
    };
    const resizeObserver = win.ResizeObserver ? new win.ResizeObserver(scheduleUpdate) : undefined;
    observed.current = { observer: resizeObserver, parent: null };

    resizeObserver?.observe(containerEl);
    resizeObserver?.observe(targetEl);

    const eventTargets = [win, win.visualViewport];
    const events = ['resize', 'scroll'];
    const options = { capture: true, passive: true };
    const listen = (method: 'addEventListener' | 'removeEventListener') => {
      for (const eventTarget of eventTargets) {
        for (const event of events) {
          eventTarget?.[method](event, scheduleUpdate, options);
        }
      }
    };
    listen('addEventListener');
    update();

    return () => {
      resizeObserver?.disconnect();
      win.cancelAnimationFrame(frame);
      observed.current = { parent: null };
      listen('removeEventListener');
    };
  }, [containerEl, targetEl, targetDocument, disabled, update]);

  return update;
}
