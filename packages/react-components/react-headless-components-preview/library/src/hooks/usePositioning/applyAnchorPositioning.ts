import type { PositioningProps } from '@fluentui/react-positioning';
import { ALIGNMENTS, POSITIONS, POSITION_AREA_MAP } from './constants';
import {
  applyOffset,
  getCoverSelfAlignment,
  getPlacementString,
  resolveOffset,
  shorthandToPositionArea,
} from './utils';
import { normalizeAlign } from './utils/placement';
import type { LogicalAlignment } from './types';

// alert('Anchor Positioning');

const DEFAULT_FLIP = ['flip-block', 'flip-inline', 'flip-block flip-inline'];

const PLACEMENT_TOLERANCE = 2;

const closeTo = (a: number, b: number) => Math.abs(a - b) <= PLACEMENT_TOLERANCE;

function detectPosition(surfaceRect: DOMRect, targetRect: DOMRect) {
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

function detectAlign(
  position: 'above' | 'below' | 'before' | 'after',
  surfaceRect: DOMRect,
  targetRect: DOMRect,
): LogicalAlignment {
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

const ANCHOR_PROPS = [
  'position',
  'inset',
  'margin',
  'margin-block-start',
  'margin-block-end',
  'margin-inline-start',
  'margin-inline-end',
  'width',
  'position-anchor',
  'position-area',
  'place-self',
  'align-self',
  'justify-self',
  'position-try-fallbacks',
  'visibility',
] as const;

const ARROW_PROPS = ['position', 'position-anchor', 'top', 'right', 'bottom', 'left', 'translate'] as const;

export interface ApplyAnchorPositioningArgs {
  target: HTMLElement;
  container: HTMLElement;
  arrow: HTMLElement | null;
  anchorName: string;
  options: PositioningProps;
  targetDocument: Document | undefined;
}

/**
 * Applies CSS Anchor Positioning to the container, anchoring it to the target.
 * All work is imperative — no React. Returns a cleanup that reverses every
 * style mutation and removes any subscribed observers.
 */
export function applyAnchorPositioning({
  target,
  container,
  arrow,
  anchorName,
  options,
  targetDocument,
}: ApplyAnchorPositioningArgs): () => void {
  const align = normalizeAlign(options.align ?? ALIGNMENTS.center);
  const position = options.position ?? POSITIONS.above;
  const { mainAxis, crossAxis } = resolveOffset(options.offset);
  const coverAlignment = options.coverTarget ? getCoverSelfAlignment(position, align) : null;
  const positionArea = POSITION_AREA_MAP[position][align];
  const placement = getPlacementString(position, align);
  const fallbackAreas = (options.fallbackPositions ?? []).map(shorthandToPositionArea);
  const strategy = options.strategy ?? 'absolute';

  // Anchor name on the target.
  target.style.setProperty('anchor-name', anchorName);

  // Container styles.
  container.style.setProperty('position', strategy);
  container.style.setProperty('inset', 'auto');
  container.style.setProperty('margin', '0');

  applyOffset(container, position, mainAxis, crossAxis);

  if (options.matchTargetSize === 'width') {
    container.style.setProperty('width', 'anchor-size(width)');
  } else {
    container.style.removeProperty('width');
  }

  container.style.setProperty('position-anchor', anchorName);
  container.setAttribute('data-placement', placement);

  if (coverAlignment) {
    container.style.setProperty('position-area', 'center');
    container.style.setProperty('align-self', coverAlignment.alignSelf);
    container.style.setProperty('justify-self', coverAlignment.justifySelf);
    container.style.removeProperty('position-try-fallbacks');
  } else {
    container.style.setProperty('position-area', positionArea);

    // Workaround for https://crbug.com/438334710: Chromium (<=130-ish) doesn't
    // apply implicit `anchor-center` self-alignment for single-keyword
    // `position-area` values.
    if (align === ALIGNMENTS.center) {
      container.style.setProperty('place-self', 'anchor-center');
    } else {
      container.style.removeProperty('place-self');
      container.style.removeProperty('align-self');
      container.style.removeProperty('justify-self');
    }

    if (options.pinned) {
      container.style.removeProperty('position-try-fallbacks');
    } else if (fallbackAreas.length > 0) {
      container.style.setProperty('position-try-fallbacks', fallbackAreas.join(', '));
    } else {
      container.style.setProperty('position-try-fallbacks', DEFAULT_FLIP.join(', '));
    }
  }

  // Mirror the browser-resolved placement into data-placement after flip fires.
  const observerCleanup = observePlacement(container, target, targetDocument, !!options.coverTarget);

  // Position the arrow (if any) at the popover edge nearest the trigger,
  // centered on the trigger's cross-axis. The arrow becomes a CSS-anchored
  // element pointing at the same trigger, so `anchor(center)` resolves to the
  // trigger's center coordinate translated into the popover's containing
  // block.
  if (arrow) {
    applyArrowAnchor(arrow, anchorName, position);
  }

  // Reveal the container — `usePositioning` hid it before scheduling this
  // helper to avoid a flash at the default location while the chunk loaded.
  // CSS Anchor Positioning resolves before the next paint, so by the time
  // this line runs the anchored position is already what the browser will
  // render.
  container.style.removeProperty('visibility');

  return () => {
    observerCleanup();
    target.style.removeProperty('anchor-name');
    container.removeAttribute('data-placement');
    for (const prop of ANCHOR_PROPS) {
      container.style.removeProperty(prop);
    }
    if (arrow) {
      for (const prop of ARROW_PROPS) {
        arrow.style.removeProperty(prop);
      }
    }
  };
}

function applyArrowAnchor(
  arrow: HTMLElement,
  anchorName: string,
  position: 'above' | 'below' | 'before' | 'after',
): void {
  arrow.style.setProperty('position', 'absolute');
  arrow.style.setProperty('position-anchor', anchorName);

  // Reset any leftover edge offsets from a previous placement.
  arrow.style.removeProperty('top');
  arrow.style.removeProperty('right');
  arrow.style.removeProperty('bottom');
  arrow.style.removeProperty('left');

  switch (position) {
    case POSITIONS.above:
      arrow.style.setProperty('bottom', '0');
      arrow.style.setProperty('left', 'anchor(center)');
      arrow.style.setProperty('translate', '-50% 50%');
      break;
    case POSITIONS.below:
      arrow.style.setProperty('top', '0');
      arrow.style.setProperty('left', 'anchor(center)');
      arrow.style.setProperty('translate', '-50% -50%');
      break;
    case POSITIONS.before:
      arrow.style.setProperty('right', '0');
      arrow.style.setProperty('top', 'anchor(center)');
      arrow.style.setProperty('translate', '50% -50%');
      break;
    case POSITIONS.after:
      arrow.style.setProperty('left', '0');
      arrow.style.setProperty('top', 'anchor(center)');
      arrow.style.setProperty('translate', '-50% -50%');
      break;
  }
}

function observePlacement(
  container: HTMLElement,
  target: HTMLElement,
  targetDocument: Document | undefined,
  disabled: boolean,
): () => void {
  if (disabled) {
    return () => undefined;
  }

  const win = targetDocument?.defaultView;
  if (!win) {
    return () => undefined;
  }

  const update = () => {
    const surfaceRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const detectedPosition = detectPosition(surfaceRect, targetRect);
    if (!detectedPosition) {
      return;
    }
    const detectedAlign = detectAlign(detectedPosition, surfaceRect, targetRect);
    const next = getPlacementString(detectedPosition, detectedAlign);
    if (container.getAttribute('data-placement') !== next) {
      container.setAttribute('data-placement', next);
    }
  };

  update();

  const ResizeObserverCtor = win.ResizeObserver;
  const observer = ResizeObserverCtor ? new ResizeObserverCtor(update) : null;
  observer?.observe(container);
  observer?.observe(target);
  win.addEventListener('scroll', update, true);
  win.addEventListener('resize', update);

  return () => {
    observer?.disconnect();
    win.removeEventListener('scroll', update, true);
    win.removeEventListener('resize', update);
  };
}
