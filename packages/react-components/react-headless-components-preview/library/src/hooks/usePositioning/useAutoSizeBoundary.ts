'use client';

import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import type { Position, Alignment, PositioningProps } from './types';
import { ALIGNMENTS, POSITIONS } from './constants';
import { resolveElementRef } from './resolvers';

/**
 * Breathing-room buffer (px) subtracted when computing autoSize so the
 * surface never touches the boundary edge. Matches the default `padding` on
 * floating-ui's `shift()` middleware and canonical v9's Popover. Consumers
 * who need a different inset can layer their own `max-width` / `max-height`
 * / `padding` on the surface — the value this hook writes is a ceiling.
 */
const GAP = 8;

function computeAvailableHeight(
  position: Position,
  align: Alignment,
  boundaryRect: DOMRect,
  triggerRect: DOMRect,
): number {
  if (position === POSITIONS.above) {
    return triggerRect.top - boundaryRect.top - GAP;
  }
  if (position === POSITIONS.below) {
    return boundaryRect.bottom - triggerRect.bottom - GAP;
  }

  if (align === ALIGNMENTS.start) {
    return boundaryRect.bottom - triggerRect.top - GAP;
  }

  if (align === ALIGNMENTS.end) {
    return triggerRect.bottom - boundaryRect.top - GAP;
  }

  return boundaryRect.height - GAP * 2;
}

function computeAvailableWidth(
  position: Position,
  align: Alignment,
  boundaryRect: DOMRect,
  triggerRect: DOMRect,
): number {
  if (position === POSITIONS.before) {
    return triggerRect.left - boundaryRect.left - GAP;
  }

  if (position === POSITIONS.after) {
    return boundaryRect.right - triggerRect.right - GAP;
  }

  if (align === ALIGNMENTS.start) {
    return boundaryRect.right - triggerRect.left - GAP;
  }

  if (align === ALIGNMENTS.end) {
    return triggerRect.right - boundaryRect.left - GAP;
  }

  return boundaryRect.width - GAP * 2;
}

export type UseAutoSizeBoundaryOptions = {
  autoSize: PositioningProps['autoSize'];
  overflowBoundary: PositioningProps['overflowBoundary'];
  containerEl: HTMLElement | null;
  targetEl: HTMLElement | null;
  position: Position;
  align: Alignment;
  targetDocument: Document | undefined;
};

/**
 * When `autoSize` is combined with an `overflowBoundary`, size the surface
 * against the boundary's rect rather than the viewport. The CSS-based
 * `applyAutoSize` runs first (and handles the no-boundary case); this effect
 * overrides `max-width` / `max-height` with boundary-aware values and keeps
 * them in sync via a `ResizeObserver`.
 */
export function useAutoSizeBoundary({
  autoSize,
  overflowBoundary,
  containerEl,
  targetEl,
  position,
  align,
  targetDocument,
}: UseAutoSizeBoundaryOptions): void {
  useIsomorphicLayoutEffect(() => {
    if (!autoSize || !containerEl || !targetEl) {
      return;
    }
    const boundary = resolveElementRef(overflowBoundary);
    const ResizeObserverCtor = targetDocument?.defaultView?.ResizeObserver;
    if (!boundary || !ResizeObserverCtor) {
      return;
    }

    const applyHeight = autoSize === true || autoSize === 'height';
    const applyWidth = autoSize === true || autoSize === 'width';
    const surface = containerEl;

    const apply = () => {
      const boundaryRect = boundary.getBoundingClientRect();
      const triggerRect = targetEl.getBoundingClientRect();
      if (applyHeight) {
        const available = computeAvailableHeight(position, align, boundaryRect, triggerRect);
        surface.style.maxHeight = `${Math.max(0, available)}px`;
      }
      if (applyWidth) {
        const available = computeAvailableWidth(position, align, boundaryRect, triggerRect);
        surface.style.maxWidth = `${Math.max(0, available)}px`;
      }
    };

    apply();

    const observer = new ResizeObserverCtor(apply);
    observer.observe(boundary);
    observer.observe(targetEl);
    return () => observer.disconnect();
  }, [autoSize, overflowBoundary, containerEl, targetEl, position, align, targetDocument]);
}
