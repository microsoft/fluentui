import type { ComputePositionReturn, ElementRects, Padding, Placement, Rect, Side, Strategy } from '@floating-ui/dom';
import type { Alignment, Position, PositioningBoundary, PositioningOptions, TargetElement } from '../types';
import { fromFloatingUIPlacement, getBoundary, toFloatingUIPadding, toFloatingUIPlacement } from '../utils';
import { getAutoSizeDimensions } from '../utils/normalizeAutoSize';
import { getClippingRect, getCoordinateSpace, getDimensions, getElementRects, getOffsetParent } from './platform';

type Options = {
  placement?: Placement;
  strategy: Strategy;
  positioningOptions?: PositioningOptions;
  isRtl?: boolean;
  arrow?: HTMLElement | null;
};
const opposite: Record<Side, Side> = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };
const sideOf = (placement: Placement) => placement.split('-')[0] as Side;
const alignOf = (placement: Placement) => placement.split('-')[1];
const vertical = (placement: Placement) => /^(top|bottom)/.test(placement);
const clamp = (min: number, value: number, max: number) => Math.max(min, Math.min(value, max));
const paddingOf = (padding: Padding = 0) =>
  typeof padding === 'number'
    ? { top: padding, right: padding, bottom: padding, left: padding }
    : { top: 0, right: 0, bottom: 0, left: 0, ...padding };

function coordinates({ reference: r, floating: f }: ElementRects, placement: Placement, rtl: boolean) {
  const side = sideOf(placement);
  const coords = { x: r.x + r.width / 2 - f.width / 2, y: r.y + r.height / 2 - f.height / 2 };
  if (side === 'top') {
    coords.y = r.y - f.height;
  } else if (side === 'bottom') {
    coords.y = r.y + r.height;
  } else {
    coords.x = side === 'left' ? r.x - f.width : r.x + r.width;
  }
  const axis = vertical(placement) ? 'x' : 'y';
  const length = axis === 'x' ? 'width' : 'height';
  if (alignOf(placement)) {
    coords[axis] +=
      (r[length] / 2 - f[length] / 2) * (rtl && axis === 'x' ? -1 : 1) * (alignOf(placement) === 'start' ? -1 : 1);
  }
  return coords;
}

/**
 * Fluent-specific pipeline. Measurements and all coordinates use the floating
 * containing block's CSS pixels; clipping rectangles use viewport pixels.
 */
export async function computePosition(
  target: TargetElement,
  container: HTMLElement,
  { placement: initial = 'bottom', strategy, positioningOptions: options = {}, isRtl = false, arrow }: Options,
): Promise<ComputePositionReturn> {
  const {
    autoSize: rawAutoSize,
    offset,
    matchTargetSize,
    coverTarget,
    pinned,
    flipBoundary,
    overflowBoundary,
    overflowBoundaryPadding,
    fallbackPositions,
    arrowPadding = 0,
    shiftToCoverTarget,
    unstable_disableTether: disableTether,
  } = options;
  const css = container.style;
  const autoSize = getAutoSizeDimensions(rawAutoSize);
  for (const dimension of autoSize) {
    css.removeProperty('box-sizing');
    css.removeProperty(`max-${dimension}`);
    css.removeProperty(dimension);
  }
  const {
    x: originX,
    y: originY,
    scale: { x: scaleX, y: scaleY },
  } = getCoordinateSpace(container, strategy);
  const rtl = container.ownerDocument.defaultView!.getComputedStyle(container).direction === 'rtl';
  const referenceElement =
    'nodeType' in target ? target : target.contextElement || container.ownerDocument.documentElement;
  const clip = (element: Element, boundary?: PositioningBoundary) =>
    getClippingRect(element, getBoundary(container, boundary) || 'clippingAncestors');
  const flipClip = clip(flipBoundary ? referenceElement : container, flipBoundary || undefined);
  const shiftClip = clip(overflowBoundary ? referenceElement : container, overflowBoundary || undefined);
  const visibilityClip = clip(referenceElement);
  const padding = paddingOf(toFloatingUIPadding(overflowBoundaryPadding || 0, isRtl));
  const overflow = (rect: Rect, bounds: Rect, inset = paddingOf()) => ({
    top: (bounds.y - (rect.y * scaleY + originY) + inset.top) / scaleY,
    bottom: ((rect.y + rect.height) * scaleY + originY - bounds.y - bounds.height + inset.bottom) / scaleY,
    left: (bounds.x - (rect.x * scaleX + originX) + inset.left) / scaleX,
    right: ((rect.x + rect.width) * scaleX + originX - bounds.x - bounds.width + inset.right) / scaleX,
  });
  const oppositePlacement = (p: Placement): Placement =>
    p.replace(/top|bottom|left|right/, side => opposite[side as Side]) as Placement;
  const oppositeAlignment = (p: Placement) =>
    p.replace(/start|end/, value => (value === 'start' ? 'end' : 'start')) as Placement;
  const fallbacks = (fallbackPositions || []).map(shorthand => {
    const [position, align] = shorthand.split('-') as [Position, Alignment?];
    return toFloatingUIPlacement(align, position, isRtl)!;
  });
  const candidates = [
    initial,
    ...(fallbacks.length
      ? fallbacks
      : alignOf(initial)
      ? [oppositeAlignment(initial), oppositePlacement(initial), oppositeAlignment(oppositePlacement(initial))]
      : [oppositePlacement(initial)]),
  ];
  const attempts: [placement: Placement, overflows: number[]][] = [];
  let candidateIndex = 0;
  let placement = initial;
  let matchAttempt = false;
  let arrowAdjusted = false;
  let arrowData: { x?: number; y?: number; centerOffset: number } = { centerOffset: 0 };
  let coords = { x: 0, y: 0 };
  const measure = () => getElementRects({ reference: target, floating: container, strategy });
  let rects = measure();
  let preserveCoordinates = false;
  let delta = { x: 0, y: 0 };

  for (let attempt = 0; attempt <= 50; attempt++) {
    const { reference: r, floating: f } = rects;
    const isVertical = vertical(placement);
    const side = sideOf(placement);
    const align = alignOf(placement);
    const main = isVertical ? 'x' : 'y';
    const cross = main === 'x' ? 'y' : 'x';
    if (!preserveCoordinates) {
      coords = coordinates(rects, placement, rtl);
    }
    preserveCoordinates = false;
    if (matchTargetSize && r.width !== f.width && !matchAttempt) {
      css.setProperty('--fui-match-target-size', `${r.width}px`);
      if (!css.width) {
        css.width = 'var(--fui-match-target-size)';
      }
      matchAttempt = true;
      rects = measure();
      continue;
    }

    if (offset) {
      const { position, alignment } = fromFloatingUIPlacement(placement);
      const raw =
        typeof offset === 'function' ? offset({ positionedRect: f, targetRect: r, position, alignment }) : offset;
      const value = typeof raw === 'number' ? { mainAxis: raw } : raw;
      const mainOffset = (value.mainAxis || 0) * (/^(top|left)/.test(placement) ? -1 : 1);
      const crossOffset = (value.crossAxis || 0) * (rtl && isVertical ? -1 : 1);
      if (!arrowAdjusted) {
        delta = { x: isVertical ? crossOffset : mainOffset, y: isVertical ? mainOffset : crossOffset };
        coords.x += delta.x;
        coords.y += delta.y;
      }
    }
    if (coverTarget) {
      coords[cross] += (side === 'top' || side === 'left' ? 1 : -1) * r[isVertical ? 'height' : 'width'];
    }
    if (!pinned && !arrowAdjusted) {
      const values = overflow({ ...f, ...coords }, flipClip);
      const length = isVertical ? 'width' : 'height';
      let alignSide: Side = isVertical
        ? align === (rtl ? 'end' : 'start')
          ? 'right'
          : 'left'
        : align === 'start'
        ? 'bottom'
        : 'top';
      if (r[length] > f[length]) {
        alignSide = opposite[alignSide];
      }
      const overflows = [values[side], values[alignSide], values[opposite[alignSide]]];
      attempts.push([placement, overflows]);
      if (overflows.some(value => value > 0)) {
        const next = candidates[++candidateIndex];
        if (next) {
          placement = next;
          continue;
        }
        const fitting = attempts.filter(item => item[1][0] <= 0).sort((a, b) => a[1][1] - b[1][1]);
        const score = (overflowsToScore: number[]) =>
          overflowsToScore.reduce((sum, value) => sum + Math.max(0, value), 0);
        const best = (fitting[0] || attempts.slice().sort((a, b) => score(a[1]) - score(b[1]))[0])[0];
        if (best !== placement) {
          placement = best;
          continue;
        }
      }
    }
    const values = overflow({ ...f, ...coords }, shiftClip, padding);
    const shiftCross = disableTether ? disableTether === 'all' : !!shiftToCoverTarget;
    coords[main] = clamp(
      coords[main] + values[main === 'x' ? 'left' : 'top'],
      coords[main],
      coords[main] - values[main === 'x' ? 'right' : 'bottom'],
    );
    if (shiftCross) {
      coords[cross] = clamp(
        coords[cross] + values[cross === 'x' ? 'left' : 'top'],
        coords[cross],
        coords[cross] - values[cross === 'x' ? 'right' : 'bottom'],
      );
      if (disableTether !== 'all') {
        const length = cross === 'x' ? 'width' : 'height';
        const origin = side === 'top' || side === 'left';
        coords[cross] = clamp(
          r[cross] - f[length] + (origin ? delta[cross] : 0),
          coords[cross],
          r[cross] + r[length] + (origin ? 0 : delta[cross]),
        );
      }
    }
    if (autoSize.length) {
      const available = overflow({ ...f, ...coords }, shiftClip, padding);
      const maxWidth = Math.max(0, f.width - available.left - available.right);
      const maxHeight = Math.max(0, f.height - available.top - available.bottom);
      const widthSide = isVertical ? (align === (rtl ? 'start' : 'end') ? 'left' : 'right') : side;
      const heightSide = isVertical ? side : align === 'end' ? 'top' : 'bottom';
      const width = Math.max(
        0,
        main === 'x' || shiftCross ? maxWidth : Math.min(f.width - available[widthSide], maxWidth),
      );
      const height = Math.max(
        0,
        main === 'y' || shiftCross ? maxHeight : Math.min(f.height - available[heightSide], maxHeight),
      );
      for (const dimension of autoSize) {
        const size = dimension === 'width' ? width : height;
        css.setProperty('box-sizing', 'border-box');
        css.setProperty(`max-${dimension}`, `${size}px`);
        if (f[dimension] > size) {
          css.setProperty(dimension, `${size}px`);
          const property = `overflow-${dimension === 'width' ? 'x' : 'y'}`;
          if (!css.getPropertyValue(property)) {
            css.setProperty(property, 'auto');
          }
        }
      }
      const dimensions = getDimensions(container);
      if (f.width !== dimensions.width || f.height !== dimensions.height) {
        rects = measure();
        continue;
      }
    }
    if (arrow) {
      const length = main === 'x' ? 'width' : 'height';
      const client = main === 'x' ? 'clientWidth' : 'clientHeight';
      const dimensions = getDimensions(arrow);
      const parent = getOffsetParent(arrow);
      const clientSize = parent?.[client] || container[client] || f[length];
      const largest = clientSize / 2 - dimensions[length] / 2 - 1;
      const inset = Math.min(arrowPadding, largest);
      const max = clientSize - dimensions[length] - inset;
      const startDiff = coords[main] - r[main];
      const endDiff = r[length] + r[main] - coords[main] - f[length];
      const center = clientSize / 2 - dimensions[length] / 2 + endDiff / 2 - startDiff / 2;
      const arrowOffset = clamp(inset, center, max);
      arrowData = { [main]: arrowOffset, centerOffset: center - arrowOffset };
      if (!arrowAdjusted && align && center !== arrowOffset && r[length] / 2 - inset - dimensions[length] / 2 < 0) {
        coords[main] += center - arrowOffset;
        arrowAdjusted = true;
        preserveCoordinates = true;
        continue;
      }
    }
    break;
  }
  const floatingOverflow = overflow({ ...rects.floating, ...coords }, visibilityClip);
  const referenceOverflow = overflow(rects.reference, visibilityClip);
  const isHidden = (values: Record<Side, number>, rect: Rect) =>
    (Object.keys(opposite) as Side[]).some(
      side => values[side] >= (/top|bottom/.test(side) ? rect.height : rect.width),
    );
  return {
    ...coords,
    placement,
    strategy,
    middlewareData: {
      arrow: arrowData,
      hide: {
        referenceHidden: isHidden(referenceOverflow, rects.reference),
        escaped: isHidden(floatingOverflow, rects.floating),
      },
      intersectionObserver: {
        intersecting:
          (floatingOverflow.top > 0 && floatingOverflow.top < rects.floating.height) ||
          (floatingOverflow.bottom > 0 && floatingOverflow.bottom < rects.floating.height),
      },
    },
  };
}
