'use client';

import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import type { LogicalAlignment, Position } from './types';
import { ALIGNMENTS, POSITIONS } from './constants';
import { getPlacementString } from './utils/placement';

const PLACEMENT_TOLERANCE = 2;

const closeTo = (a: number, b: number): boolean => Math.abs(a - b) <= PLACEMENT_TOLERANCE;

function detectPosition(surfaceRect: DOMRect, targetRect: DOMRect): Position | null {
  if (surfaceRect.bottom <= targetRect.top + PLACEMENT_TOLERANCE) {
    return POSITIONS.above;
  }

  if (surfaceRect.top >= targetRect.bottom - PLACEMENT_TOLERANCE) {
    return POSITIONS.below;
  }

  if (surfaceRect.right <= targetRect.left + PLACEMENT_TOLERANCE) {
    return POSITIONS.before;
  }

  if (surfaceRect.left >= targetRect.right - PLACEMENT_TOLERANCE) {
    return POSITIONS.after;
  }

  return null;
}

function detectAlign(position: Position, surfaceRect: DOMRect, targetRect: DOMRect): LogicalAlignment {
  const isBlockMain = position === POSITIONS.above || position === POSITIONS.below;

  const startAligned = isBlockMain
    ? closeTo(surfaceRect.left, targetRect.left)
    : closeTo(surfaceRect.top, targetRect.top);

  if (startAligned) {
    return ALIGNMENTS.start;
  }

  const endAligned = isBlockMain
    ? closeTo(surfaceRect.right, targetRect.right)
    : closeTo(surfaceRect.bottom, targetRect.bottom);

  if (endAligned) {
    return ALIGNMENTS.end;
  }

  return ALIGNMENTS.center;
}

/**
 * Pure-observation hook: reads the rendered rects of the surface and anchor
 * and mirrors the resolved placement into the surface's `data-placement`
 * attribute. This keeps the attribute in sync with the browser's decision
 * after native flip fires (scroll, resize, ResizeObserver tick).
 *
 */
export function usePlacementObserver(
  containerEl: HTMLElement | null,
  targetEl: HTMLElement | null,
  targetDocument: Document | undefined,
  disabled = false,
): void {
  useIsomorphicLayoutEffect(() => {
    if (disabled || !containerEl || !targetEl) {
      return;
    }

    const win = targetDocument?.defaultView;

    if (!win) {
      return;
    }

    const update = () => {
      const surfaceRect = containerEl.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();
      const position = detectPosition(surfaceRect, targetRect);

      if (!position) {
        return;
      }

      const align = detectAlign(position, surfaceRect, targetRect);
      const next = getPlacementString(position, align);

      if (containerEl.getAttribute('data-placement') !== next) {
        containerEl.setAttribute('data-placement', next);
      }
    };

    update();

    const ResizeObserverCtor = win.ResizeObserver;
    const observer = ResizeObserverCtor ? new ResizeObserverCtor(update) : null;
    observer?.observe(containerEl);
    observer?.observe(targetEl);
    win.addEventListener('scroll', update, true);
    win.addEventListener('resize', update);

    return () => {
      observer?.disconnect();
      win.removeEventListener('scroll', update, true);
      win.removeEventListener('resize', update);
    };
  }, [containerEl, targetEl, targetDocument, disabled]);
}
