import type { Placement, Rect, Side, SideObject, Strategy } from '@floating-ui/dom';
import type { Alignment, Position, PositioningBoundary, PositioningOptions, TargetElement } from '../types';
import { getBoundary, toFloatingUIPlacement } from '../utils';
import { toPositioningValues } from '../utils/fromFloatingUIPlacement';
import { getAutoSizeDimensions } from '../utils/normalizeAutoSize';
import {
  getClippingRect,
  getCoordinateSpace,
  getDimensions,
  getOffsetParent,
  getReferenceRect,
  getRoot,
  getStyle,
  getWindow,
  NO_OFFSET,
  px,
  rect,
} from './platform';

type Options = {
  placement?: Placement;
  strategy: Strategy;
  options?: PositioningOptions;
  isRtl?: boolean;
  arrow?: HTMLElement | null;
};
type Axis = 'x' | 'y';
type Coords = Record<Axis, number>;
export type ComputePositionResult = Coords & {
  placement: Placement;
  /** Arrow offset along the alignment axis, `undefined` without an arrow */
  arrow?: Partial<Coords>;
  /** The floating element is outside of the clipping boundary of the target, `false` without a layout viewport */
  escaped: boolean;
  /** The target is outside of its clipping boundary, `false` without a layout viewport */
  referenceHidden: boolean;
  /** The floating element crosses the top or bottom clipping edge */
  intersecting: boolean;
};

const SIDES: Side[] = ['top', 'right', 'bottom', 'left'];
const lengthOf = (axis: Axis) => (axis === 'x' ? 'width' : 'height');
const startOf = (axis: Axis) => (axis === 'x' ? 'left' : 'top');
const endOf = (axis: Axis) => (axis === 'x' ? 'right' : 'bottom');
const sides = (top: number, right: number, bottom: number, left: number): SideObject => ({ top, right, bottom, left });
const clamp = (min: number, value: number, max: number) => Math.max(min, Math.min(value, max));
/** Moves the coordinate on the axis by the least amount that removes the overflow */
const shiftOverflow = (coords: Coords, axis: Axis, overflow: SideObject) =>
  (coords[axis] = clamp(coords[axis] + overflow[startOf(axis)], coords[axis], coords[axis] - overflow[endOf(axis)]));

/**
 * Fluent-specific pipeline. Measurements and all coordinates use the floating
 * containing block's CSS pixels; clipping rectangles use viewport pixels.
 */
export async function computePosition(
  target: TargetElement,
  container: HTMLElement,
  { placement: initial = 'bottom', strategy, options = {}, isRtl = false, arrow }: Options,
): Promise<ComputePositionResult> {
  const {
    autoSize: rawAutoSize,
    offset,
    matchTargetSize,
    coverTarget,
    pinned,
    flipBoundary,
    overflowBoundary,
    overflowBoundaryPadding: rawPadding = 0,
    fallbackPositions = [],
    arrowPadding = 0,
    shiftToCoverTarget,
    unstable_disableTether: disableTether,
  } = options;
  const css = container.style;
  // An empty value removes the property
  const setStyle = (property: string, value = '') => css.setProperty(property, value);
  const autoSize = getAutoSizeDimensions(rawAutoSize);
  for (const dimension of autoSize) {
    setStyle('box-sizing');
    setStyle(`max-${dimension}`);
    setStyle(dimension);
  }
  const rtl = getStyle(container).direction === 'rtl';
  const referenceElement = 'nodeType' in target ? target : target.contextElement || getRoot(container);
  const clip = (element: Element, boundary?: PositioningBoundary) =>
    getClippingRect(element, getBoundary(container, boundary) || 'clippingAncestors', getWindow(container), strategy);
  // Without explicit boundaries flipping and shifting share the clipping ancestors of the container
  let containerClip: Rect | undefined;
  const boundaryClip = (boundary?: PositioningBoundary | null) =>
    boundary ? clip(referenceElement, boundary) : (containerClip ||= clip(container));
  const flipClip = boundaryClip(flipBoundary);
  const shiftClip = boundaryClip(overflowBoundary);
  const visibilityClip = clip(referenceElement);
  const padding =
    typeof rawPadding === 'number'
      ? sides(rawPadding, rawPadding, rawPadding, rawPadding)
      : sides(
          rawPadding.top || 0,
          rawPadding[isRtl ? 'start' : 'end'] || 0,
          rawPadding.bottom || 0,
          rawPadding[isRtl ? 'end' : 'start'] || 0,
        );
  /** How far the box (in container coordinates) overflows the bounds (in viewport coordinates) on each side */
  const overflow = (box: Rect, bounds: Rect, inset = sides(0, 0, 0, 0)) => {
    const result = { ...inset };
    for (const axis of ['x', 'y'] as const) {
      const length = lengthOf(axis);
      const axisScale = scale[axis];
      const origin = initialSpace[axis];
      result[startOf(axis)] = (bounds[axis] - (box[axis] * axisScale + origin) + inset[startOf(axis)]) / axisScale;
      result[endOf(axis)] =
        ((box[axis] + box[length]) * axisScale + origin - bounds[axis] - bounds[length] + inset[endOf(axis)]) /
        axisScale;
    }
    return result;
  };
  const [initialSide, initialAlign] = initial.split('-') as [Side, string?];
  // Without fallbacks: the initial placement, the opposite alignment, the opposite side and both opposites
  const candidates = fallbackPositions.length
    ? [
        initial,
        ...fallbackPositions.map(shorthand => {
          const [position, align] = shorthand.split('-') as [Position, Alignment?];
          return toFloatingUIPlacement(align, position, isRtl)!;
        }),
      ]
    : ([initialSide, SIDES[(SIDES.indexOf(initialSide) + 2) % 4]].flatMap(side =>
        initialAlign ? [`${side}-${initialAlign}`, `${side}-${initialAlign === 'start' ? 'end' : 'start'}`] : [side],
      ) as Placement[]);
  const attempts: [placement: Placement, overflows: number[]][] = [];
  let space: ReturnType<typeof getCoordinateSpace>;
  /** The reference and floating rects in the container's coordinate space */
  const measure = (): [Rect, Rect] => {
    space = getCoordinateSpace(container, strategy);
    const { width, height } = getDimensions(container);
    return [getReferenceRect(target, referenceElement, container, space, strategy), rect(0, 0, width, height)];
  };
  let rects = measure();
  // Overflow is always measured in the initial coordinate space
  const initialSpace = space!;
  const { scale } = initialSpace;
  let candidateIndex = 0;
  let placement = initial;
  let matchAttempt = false;
  let arrowAdjusted = false;
  let preserveCoordinates = false;
  let arrowData: Partial<Coords> | undefined;
  let coords!: Coords;
  let delta: Coords = NO_OFFSET;

  for (let attempt = 0; attempt <= 50; attempt++) {
    const [r, f] = rects;
    const [side, align] = placement.split('-') as [Side, string?];
    const isVertical = side === 'top' || side === 'bottom';
    const isStart = side === 'top' || side === 'left';
    // `main` is the alignment axis, `cross` is the axis that leads away from the target
    const main: Axis = isVertical ? 'x' : 'y';
    const cross: Axis = isVertical ? 'y' : 'x';
    const mainLength = lengthOf(main);
    const crossLength = lengthOf(cross);
    const floatingRect = () => ({ ...f, ...coords });
    if (!preserveCoordinates) {
      coords = { x: r.x + r.width / 2 - f.width / 2, y: r.y + r.height / 2 - f.height / 2 };
      coords[cross] = isStart ? r[cross] - f[crossLength] : r[cross] + r[crossLength];
      if (align) {
        coords[main] +=
          (r[mainLength] / 2 - f[mainLength] / 2) * (rtl && isVertical ? -1 : 1) * (align === 'start' ? -1 : 1);
      }
    }
    preserveCoordinates = false;
    if (matchTargetSize && r.width !== f.width && !matchAttempt) {
      const property = '--fui-match-target-size';
      setStyle(property, px(r.width));
      if (!css.width) {
        css.width = `var(${property})`;
      }
      matchAttempt = true;
      rects = measure();
      continue;
    }

    if (offset) {
      const raw =
        typeof offset === 'function'
          ? offset({ positionedRect: f, targetRect: r, ...toPositioningValues(side, align) })
          : offset;
      const value = typeof raw === 'number' ? { mainAxis: raw } : raw;
      if (!arrowAdjusted) {
        delta = {
          [cross]: (value.mainAxis || 0) * (isStart ? -1 : 1),
          [main]: (value.crossAxis || 0) * (rtl && isVertical ? -1 : 1),
        } as Coords;
        coords.x += delta.x;
        coords.y += delta.y;
      }
    }
    if (coverTarget) {
      coords[cross] += (isStart ? 1 : -1) * r[crossLength];
    }
    if (!pinned && !arrowAdjusted) {
      const values = overflow(floatingRect(), flipClip);
      // The edge on the alignment axis that overflows first: the end edge for start alignment (logical in RTL),
      // the opposite one when the target is larger than the floating element
      const alignEnd = (align === (rtl && isVertical ? 'end' : 'start')) !== r[mainLength] > f[mainLength];
      const overflows = [
        values[side],
        values[(alignEnd ? endOf : startOf)(main)],
        values[(alignEnd ? startOf : endOf)(main)],
      ];
      attempts.push([placement, overflows]);
      if (overflows.some(value => value > 0)) {
        const next = candidates[++candidateIndex];
        if (next) {
          placement = next;
          continue;
        }
        const score = (scores: number[]) => scores.reduce((sum, value) => sum + Math.max(0, value), 0);
        const best = (attempts.filter(item => item[1][0] <= 0).sort((a, b) => a[1][1] - b[1][1])[0] ||
          attempts.slice().sort((a, b) => score(a[1]) - score(b[1]))[0])[0];
        if (best !== placement) {
          placement = best;
          continue;
        }
      }
    }
    const shiftCross = disableTether ? disableTether === 'all' : !!shiftToCoverTarget;
    const values = overflow(floatingRect(), shiftClip, padding);
    shiftOverflow(coords, main, values);
    if (shiftCross) {
      shiftOverflow(coords, cross, values);
    }
    // Shifting on the cross axis, and disabling the tether on one axis, keep the floating element next to the target
    if (disableTether !== 'all' && (shiftCross || disableTether)) {
      coords[cross] = clamp(
        r[cross] - f[crossLength] + (isStart ? delta[cross] : 0),
        coords[cross],
        r[cross] + r[crossLength] + (isStart ? 0 : delta[cross]),
      );
    }
    if (autoSize.length) {
      const available = overflow(floatingRect(), shiftClip, padding);
      for (const dimension of autoSize) {
        const axis = dimension === 'width' ? 'x' : 'y';
        const max = f[dimension] - available[startOf(axis)] - available[endOf(axis)];
        // Shifting on an axis makes the whole boundary available, otherwise the side facing away from the target
        const size = axis === main || shiftCross ? max : Math.min(f[dimension] - available[side], max);
        setStyle('box-sizing', 'border-box');
        setStyle(`max-${dimension}`, px(size));
        if (f[dimension] > size) {
          setStyle(dimension, px(size));
          const property = `overflow-${axis}`;
          if (!css.getPropertyValue(property)) {
            setStyle(property, 'auto');
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
      const client = main === 'x' ? 'clientWidth' : 'clientHeight';
      const arrowLength = getDimensions(arrow)[mainLength];
      const parent = getOffsetParent(arrow);
      const clientSize = (parent && parent[client]) || container[client] || f[mainLength];
      const inset = Math.min(arrowPadding, clientSize / 2 - arrowLength / 2 - 1);
      const startDiff = coords[main] - r[main];
      const endDiff = r[mainLength] + r[main] - coords[main] - f[mainLength];
      const center = clientSize / 2 - arrowLength / 2 + endDiff / 2 - startDiff / 2;
      const arrowOffset = clamp(inset, center, clientSize - arrowLength - inset);
      arrowData = { [main]: arrowOffset };
      if (!arrowAdjusted && align && center !== arrowOffset && r[mainLength] / 2 - inset - arrowLength / 2 < 0) {
        coords[main] += center - arrowOffset;
        arrowAdjusted = preserveCoordinates = true;
        continue;
      }
    }
    break;
  }
  const [reference, floating] = rects;
  const floatingOverflow = overflow({ ...floating, ...coords }, visibilityClip);
  const { clientWidth, clientHeight } = getRoot(container);
  // Visibility can't be determined without a layout viewport (e.g. in jsdom)
  const isHidden = (values: SideObject, box: Rect) =>
    !!(clientWidth || clientHeight) && SIDES.some((side, index) => values[side] >= box[index % 2 ? 'width' : 'height']);
  return {
    ...coords,
    placement,
    arrow: arrowData,
    referenceHidden: isHidden(overflow(reference, visibilityClip), reference),
    escaped: isHidden(floatingOverflow, floating),
    intersecting: [floatingOverflow.top, floatingOverflow.bottom].some(value => value > 0 && value < floating.height),
  };
}
