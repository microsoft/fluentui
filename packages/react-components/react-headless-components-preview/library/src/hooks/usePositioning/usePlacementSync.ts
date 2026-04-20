'use client';

import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import type { Position, Alignment } from './types';
import { ALIGNMENTS, POSITIONS } from './constants';
import { FLIP_POSITION_MAP, POSITION_AREA_MAP } from './constants';
import { getPlacementString } from './placement';

const PLACEMENT_TOLERANCE = 2;

const closeTo = (a: number, b: number) => Math.abs(a - b) <= PLACEMENT_TOLERANCE;

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

function detectAlign(position: Position, surfaceRect: DOMRect, targetRect: DOMRect): Alignment {
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

function detectActualPlacement(
  surfaceRect: DOMRect,
  targetRect: DOMRect,
): { position: Position; align: Alignment } | null {
  const position = detectPosition(surfaceRect, targetRect);
  if (!position) {
    return null;
  }
  return { position, align: detectAlign(position, surfaceRect, targetRect) };
}

function decideFlip(
  requested: Position,
  surfaceRect: DOMRect,
  targetRect: DOMRect,
  win: Window,
  mainOffset: number,
): Position {
  const isBlockMain = requested === POSITIONS.above || requested === POSITIONS.below;

  if (isBlockMain) {
    const needed = surfaceRect.height + mainOffset;
    const spaceBelow = win.innerHeight - targetRect.bottom;
    const spaceAbove = targetRect.top;
    const preferSpace = requested === POSITIONS.below ? spaceBelow : spaceAbove;
    const otherSpace = requested === POSITIONS.below ? spaceAbove : spaceBelow;
    return preferSpace < needed && otherSpace > preferSpace ? FLIP_POSITION_MAP[requested] : requested;
  }

  const needed = surfaceRect.width + mainOffset;
  const spaceAfter = win.innerWidth - targetRect.right;
  const spaceBefore = targetRect.left;
  const preferSpace = requested === POSITIONS.after ? spaceAfter : spaceBefore;
  const otherSpace = requested === POSITIONS.after ? spaceBefore : spaceAfter;
  return preferSpace < needed && otherSpace > preferSpace ? FLIP_POSITION_MAP[requested] : requested;
}

export type UsePlacementSyncOptions = {
  containerEl: HTMLElement | null;
  targetEl: HTMLElement | null;
  coverTarget: boolean;
  pinned: boolean;
  useCssFallbacks: boolean;
  position: Position;
  align: Alignment;
  mainOffset: number;
  targetDocument: Document | undefined;
};

export function usePlacementSync({
  containerEl,
  targetEl,
  coverTarget,
  pinned,
  useCssFallbacks,
  position,
  align,
  mainOffset,
  targetDocument,
}: UsePlacementSyncOptions): void {
  useIsomorphicLayoutEffect(() => {
    if (!containerEl || !targetEl || coverTarget) {
      return;
    }

    const win = targetDocument?.defaultView;

    if (!win) {
      return;
    }

    const update = () => {
      if (!pinned && !useCssFallbacks) {
        const effective = decideFlip(
          position,
          containerEl.getBoundingClientRect(),
          targetEl.getBoundingClientRect(),
          win,
          mainOffset,
        );

        const nextArea = POSITION_AREA_MAP[effective][align];

        if (containerEl.style.getPropertyValue('position-area') !== nextArea) {
          containerEl.style.setProperty('position-area', nextArea);
        }
      }

      const actual = detectActualPlacement(containerEl.getBoundingClientRect(), targetEl.getBoundingClientRect());

      if (!actual) {
        return;
      }

      const next = getPlacementString(actual.position, actual.align);

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
  }, [containerEl, targetEl, coverTarget, pinned, useCssFallbacks, position, align, mainOffset, targetDocument]);
}
