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

const readAnchorNames = (element: HTMLElement): string[] =>
  element.style
    .getPropertyValue('anchor-name')
    .split(',')
    .map(name => name.trim())
    .filter(Boolean);

const PLACEMENT_TOLERANCE = 2;

const closeTo = (a: number, b: number) => Math.abs(a - b) <= PLACEMENT_TOLERANCE;

function detectPosition(surfaceRect: DOMRect, targetRect: DOMRect, isRtl: boolean) {
  if (surfaceRect.width === 0 && surfaceRect.height === 0) {
    return null;
  }

  if (surfaceRect.bottom <= targetRect.top + PLACEMENT_TOLERANCE) {
    return POSITIONS.above;
  }
  if (surfaceRect.top >= targetRect.bottom - PLACEMENT_TOLERANCE) {
    return POSITIONS.below;
  }
  if (surfaceRect.right <= targetRect.left + PLACEMENT_TOLERANCE) {
    return isRtl ? POSITIONS.after : POSITIONS.before;
  }
  if (surfaceRect.left >= targetRect.right - PLACEMENT_TOLERANCE) {
    return isRtl ? POSITIONS.before : POSITIONS.after;
  }
  return null;
}

function detectAlign(
  position: 'above' | 'below' | 'before' | 'after',
  surfaceRect: DOMRect,
  targetRect: DOMRect,
  isRtl: boolean,
): LogicalAlignment {
  const isBlockMain = position === POSITIONS.above || position === POSITIONS.below;
  const startAligned = isBlockMain
    ? closeTo(isRtl ? surfaceRect.right : surfaceRect.left, isRtl ? targetRect.right : targetRect.left)
    : closeTo(surfaceRect.top, targetRect.top);

  if (startAligned) {
    return ALIGNMENTS.start;
  }

  const endAligned = isBlockMain
    ? closeTo(isRtl ? surfaceRect.left : surfaceRect.right, isRtl ? targetRect.left : targetRect.right)
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
] as const;

const ARROW_PROPS = ['position', 'position-anchor', 'top', 'right', 'bottom', 'left', 'translate'] as const;

type StyleSnapshot = Array<{ property: string; value: string; priority: string }>;

function captureStyles(element: HTMLElement, properties: readonly string[]): StyleSnapshot {
  return properties.map(property => ({
    property,
    value: element.style.getPropertyValue(property),
    priority: element.style.getPropertyPriority(property),
  }));
}

function restoreStyles(element: HTMLElement, snapshot: StyleSnapshot): void {
  for (const { property, value, priority } of snapshot) {
    if (value) {
      element.style.setProperty(property, value, priority);
    } else {
      element.style.removeProperty(property);
    }
  }
}

export interface ApplyAnchorPositioningArgs {
  target: HTMLElement;
  container: HTMLElement;
  arrow: HTMLElement | null;
  anchorName: string;
  options: PositioningProps;
  targetDocument: Document | undefined;
  isRtl: boolean;
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
  isRtl,
}: ApplyAnchorPositioningArgs): () => void {
  const align = normalizeAlign(options.align ?? ALIGNMENTS.center);
  const position = options.position ?? POSITIONS.above;
  const { mainAxis, crossAxis } = resolveOffset(options.offset);
  const coverAlignment = options.coverTarget ? getCoverSelfAlignment(position, align) : null;
  const positionArea = POSITION_AREA_MAP[position][align];
  const placement = getPlacementString(position, align);
  const fallbackAreas = (options.fallbackPositions ?? []).map(shorthandToPositionArea);
  const strategy = options.strategy ?? 'absolute';
  const containerStyles = captureStyles(container, ANCHOR_PROPS);
  const arrowStyles = arrow ? captureStyles(arrow, ARROW_PROPS) : null;
  const previousPlacement = container.getAttribute('data-placement');

  // Anchor name on the target.
  const anchorNames = readAnchorNames(target);
  if (!anchorNames.includes(anchorName)) {
    target.style.setProperty('anchor-name', [...anchorNames, anchorName].join(', '));
  }

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

  // Position the arrow (if any) at the popover edge nearest the trigger,
  // centered on the trigger's cross-axis. The arrow becomes a CSS-anchored
  // element pointing at the same trigger, so `anchor(center)` resolves to the
  // trigger's center coordinate translated into the popover's containing
  // block.
  if (arrow) {
    applyArrowAnchor(arrow, anchorName, position, isRtl);
  }

  // Mirror the browser-resolved placement into data-placement after flip fires.
  // This runs after the initial arrow styles so its synchronous first update
  // can immediately correct an arrow that the browser has already flipped.
  const observerCleanup = observePlacement(
    container,
    target,
    arrow,
    anchorName,
    targetDocument,
    !!options.coverTarget,
    isRtl,
  );

  return () => {
    observerCleanup();
    const remainingAnchorNames = readAnchorNames(target).filter(name => name !== anchorName);
    if (remainingAnchorNames.length > 0) {
      target.style.setProperty('anchor-name', remainingAnchorNames.join(', '));
    } else {
      target.style.removeProperty('anchor-name');
    }
    if (previousPlacement === null) {
      container.removeAttribute('data-placement');
    } else {
      container.setAttribute('data-placement', previousPlacement);
    }
    restoreStyles(container, containerStyles);
    if (arrow && arrowStyles) {
      restoreStyles(arrow, arrowStyles);
    }
  };
}

function applyArrowAnchor(
  arrow: HTMLElement,
  anchorName: string,
  position: 'above' | 'below' | 'before' | 'after',
  isRtl: boolean,
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
      arrow.style.setProperty(isRtl ? 'left' : 'right', '0');
      arrow.style.setProperty('top', 'anchor(center)');
      arrow.style.setProperty('translate', `${isRtl ? '-50%' : '50%'} -50%`);
      break;
    case POSITIONS.after:
      arrow.style.setProperty(isRtl ? 'right' : 'left', '0');
      arrow.style.setProperty('top', 'anchor(center)');
      arrow.style.setProperty('translate', `${isRtl ? '50%' : '-50%'} -50%`);
      break;
  }
}

function observePlacement(
  container: HTMLElement,
  target: HTMLElement,
  arrow: HTMLElement | null,
  anchorName: string,
  targetDocument: Document | undefined,
  disabled: boolean,
  isRtl: boolean,
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
    const detectedPosition = detectPosition(surfaceRect, targetRect, isRtl);
    if (!detectedPosition) {
      return;
    }
    const detectedAlign = detectAlign(detectedPosition, surfaceRect, targetRect, isRtl);
    const next = getPlacementString(detectedPosition, detectedAlign);
    if (container.getAttribute('data-placement') !== next) {
      container.setAttribute('data-placement', next);
      if (arrow) {
        applyArrowAnchor(arrow, anchorName, detectedPosition, isRtl);
      }
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
