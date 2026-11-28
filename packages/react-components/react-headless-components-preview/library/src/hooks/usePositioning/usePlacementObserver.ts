'use client';

import * as React from 'react';
import { useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import type { UsePositioningOptions } from './types';
import { ABOVE, AFTER, BEFORE, BELOW, CENTER, END, START } from './constants';
import { applyVisibility, getPlacementString, isRendered, updatePlacementAttribute } from './utils';
import { normalizeAlign } from './utils/placement';

type PlacementObserverOptions = Pick<
  UsePositioningOptions,
  | 'coverTarget'
  | 'disableUpdateOnResize'
  | 'position'
  | 'align'
  | 'offset'
  | 'pinned'
  | 'fallbackPositions'
  | 'strategy'
  | 'matchTargetSize'
>;

/**
 * Mirrors CSS's resolved placement and visibility into the positioning attributes and completion event.
 * Hidden (unrendered) surfaces retain only size/intersection observers; scroll/resize listeners resume on layout.
 * Pass null elements to stop observing.
 */
export function usePlacementObserver(
  containerEl: HTMLElement | null,
  targetEl: HTMLElement | null,
  options: PlacementObserverOptions,
): () => void {
  const {
    coverTarget = false,
    disableUpdateOnResize,
    position = ABOVE,
    align: alignInput = CENTER,
    offset,
    pinned = false,
    strategy = 'fixed',
    matchTargetSize,
  } = options;
  const align = normalizeAlign(alignInput);
  const mainAxis = typeof offset === 'number' ? offset : (typeof offset === 'object' && offset?.mainAxis) || 0;
  const crossAxis = (typeof offset === 'object' && offset?.crossAxis) || 0;
  const fallbackPositions = options.fallbackPositions?.join(',') ?? '';
  const scheduleRef = React.useRef<(() => void) | null>(null);

  const update = useEventCallback(() => {
    const win = containerEl?.ownerDocument.defaultView;
    if (!containerEl || !targetEl || !win || !isRendered(containerEl) || !isRendered(targetEl)) {
      return;
    }

    const rtl = win.getComputedStyle(containerEl).direction === 'rtl';
    // Geometry is physical, but the configured block alignment is logical. Overlap (including coverTarget and
    // negative offsets) can't determine a side: use the resolved configuration for completion in that case.
    const physicalAlign =
      rtl && (position === ABOVE || position === BELOW) && align !== CENTER ? (align === START ? END : START) : align;
    const physicalPosition =
      rtl && (position === BEFORE || position === AFTER) ? (position === BEFORE ? AFTER : BEFORE) : position;
    const placement = (!coverTarget && updatePlacementAttribute(targetEl, containerEl)) || {
      position: physicalPosition,
      align: physicalAlign,
      placement: getPlacementString(physicalPosition, physicalAlign),
    };

    applyVisibility(containerEl, targetEl, placement, rtl);
  });

  useIsomorphicLayoutEffect(() => {
    const win = containerEl?.ownerDocument.defaultView;
    if (!containerEl || !targetEl || !win) {
      return;
    }

    let listening = false;
    let active = true;
    let pending = false;
    const stopListening = () => {
      if (listening) {
        listening = false;
        win.removeEventListener('scroll', debouncedUpdate, { capture: true });
        win.removeEventListener('resize', debouncedUpdate);
      }
    };
    const debouncedUpdate = () => {
      if (!pending) {
        pending = true;
        Promise.resolve().then(() => {
          pending = false;
          if (!active) {
            return;
          }
          if (isRendered(containerEl)) {
            update();
          } else {
            stopListening();
          }
        });
      }
    };
    const sync = () => {
      if (isRendered(containerEl)) {
        if (!listening) {
          listening = true;
          win.addEventListener('scroll', debouncedUpdate, { capture: true, passive: true });
          win.addEventListener('resize', debouncedUpdate);
        }
        debouncedUpdate();
      } else {
        stopListening();
      }
    };
    const resizeObserver = disableUpdateOnResize || !win.ResizeObserver ? null : new win.ResizeObserver(sync);
    resizeObserver?.observe(containerEl, { box: 'border-box' });
    resizeObserver?.observe(targetEl);
    const intersectionObserver = win.IntersectionObserver ? new win.IntersectionObserver(sync) : null;
    intersectionObserver?.observe(containerEl);
    scheduleRef.current = sync;
    sync();

    return () => {
      scheduleRef.current = null;
      active = false;
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      stopListening();
    };
  }, [containerEl, targetEl, disableUpdateOnResize, update]);

  // Option-only changes don't notify observers. Reuse the existing queue rather than recreating observers
  // (which send initial notifications), and measure after later layout effects have applied the CSS.
  useIsomorphicLayoutEffect(() => {
    scheduleRef.current?.();
  }, [
    containerEl,
    targetEl,
    position,
    align,
    coverTarget,
    mainAxis,
    crossAxis,
    pinned,
    fallbackPositions,
    strategy,
    matchTargetSize,
  ]);

  return update;
}
