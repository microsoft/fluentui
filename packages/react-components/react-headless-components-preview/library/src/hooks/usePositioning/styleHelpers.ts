import type { Position, Alignment, PositioningProps } from './types';
import { ALIGNMENTS, POSITIONS } from './constants';

/** Applies `offset` as logical margins on the side facing the trigger. */
export function applyOffsetStyles(node: HTMLElement, position: Position, mainAxis: number, crossAxis: number): void {
  if (mainAxis) {
    switch (position) {
      case POSITIONS.above:
        node.style.marginBlockEnd = `${mainAxis}px`;
        break;
      case POSITIONS.below:
        node.style.marginBlockStart = `${mainAxis}px`;
        break;
      case POSITIONS.before:
        node.style.marginInlineEnd = `${mainAxis}px`;
        break;
      case POSITIONS.after:
        node.style.marginInlineStart = `${mainAxis}px`;
        break;
    }
  }

  if (crossAxis) {
    switch (position) {
      case POSITIONS.above:
      case POSITIONS.below:
        node.style.marginInlineStart = `${crossAxis}px`;
        break;
      case POSITIONS.before:
      case POSITIONS.after:
        node.style.marginBlockStart = `${crossAxis}px`;
        break;
    }
  }
}

/**
 * Applies CSS-only `autoSize`: caps `max-width` / `max-height` to the viewport
 * minus an 8px gap. When an `overflowBoundary` is provided, the JS-based
 * `useAutoSizeBoundary` effect overrides these values with boundary-aware math.
 */
export function applyAutoSize(node: HTMLElement, autoSize: PositioningProps['autoSize'], position: Position): void {
  if (!autoSize) {
    return;
  }
  const enableHeight = autoSize === true || autoSize === 'height';
  const enableWidth = autoSize === true || autoSize === 'width';
  // Breathing-room buffer (px) so the surface never touches the viewport edge.
  // Consumers can shrink further via their own `max-width` / `max-height`.
  const gap = 8;

  if (enableHeight) {
    switch (position) {
      case POSITIONS.above:
        node.style.maxHeight = `calc(anchor(top) - ${gap}px)`;
        break;
      case POSITIONS.below:
        node.style.maxHeight = `calc(100dvh - anchor(bottom) - ${gap}px)`;
        break;
      case POSITIONS.before:
      case POSITIONS.after:
        node.style.maxHeight = `calc(100dvh - ${gap * 2}px)`;
        break;
    }
  }

  if (enableWidth) {
    switch (position) {
      case POSITIONS.before:
        node.style.maxWidth = `calc(anchor(left) - ${gap}px)`;
        break;
      case POSITIONS.after:
        node.style.maxWidth = `calc(100dvw - anchor(right) - ${gap}px)`;
        break;
      case POSITIONS.above:
      case POSITIONS.below:
        node.style.maxWidth = `calc(100dvw - ${gap * 2}px)`;
        break;
    }
  }
}

/**
 * Returns the `align-self` / `justify-self` values that make the surface
 * cover the target (overlap instead of sit beside it).
 */
export function getCoverSelfAlignment(
  position: Position,
  align: Alignment,
): { alignSelf: string; justifySelf: string } {
  if (position === POSITIONS.above) {
    return { alignSelf: ALIGNMENTS.end, justifySelf: align };
  }

  if (position === POSITIONS.below) {
    return { alignSelf: ALIGNMENTS.start, justifySelf: align };
  }

  if (position === POSITIONS.before) {
    return { alignSelf: align, justifySelf: ALIGNMENTS.end };
  }

  return { alignSelf: align, justifySelf: ALIGNMENTS.start };
}

/**
 * Writes `position-area` on the surface. For center alignment also sets
 * `justify-self/align-self: center` so the surface centers within the
 * anchor-sized cell — this is what lets the built-in `flip-block`/`flip-inline`
 * fallbacks natively flip the surface on overflow.
 */
export function applyPositionAreaStyles(
  node: HTMLElement,
  positionArea: string,
  position: Position,
  align: Alignment,
): void {
  node.style.setProperty('position-area', positionArea);
  node.style.removeProperty('top');
  node.style.removeProperty('bottom');
  node.style.removeProperty('left');
  node.style.removeProperty('right');

  if (align === ALIGNMENTS.center) {
    const isBlockMain = position === POSITIONS.above || position === POSITIONS.below;
    if (isBlockMain) {
      node.style.setProperty('justify-self', 'center');
      node.style.removeProperty('align-self');
    } else {
      node.style.setProperty('align-self', 'center');
      node.style.removeProperty('justify-self');
    }
  } else {
    node.style.removeProperty('justify-self');
    node.style.removeProperty('align-self');
  }
}
