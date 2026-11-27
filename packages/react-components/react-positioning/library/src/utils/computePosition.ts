import type {
  Alignment,
  Position,
  PositioningBoundary,
  PositioningOptions,
  PositioningPlacement,
  PositioningRect,
  Side,
  SideObject,
  Strategy,
  TargetElement,
} from '../types';
import { getBoundary } from './getBoundary';
import { toPhysicalPlacement } from './toPhysicalPlacement';
import { fromPhysicalPlacement } from './fromPhysicalPlacement';
import { getAutoSizeDimensions } from './normalizeAutoSize';
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
} from './domGeometry';

type Options = {
  placement?: PositioningPlacement;
  strategy: Strategy;
  options?: PositioningOptions;
  isRtl?: boolean;
  arrow?: HTMLElement | null;
};
type Axis = 'x' | 'y';
type Coords = Record<Axis, number>;
export type ComputePositionResult = Coords & {
  placement: PositioningPlacement;
  /** Arrow offset along the alignment axis, `undefined` without an arrow */
  arrow?: Partial<Coords>;
  /** The floating element is outside of the clipping boundary of the target, `false` without a layout viewport */
  escaped: boolean;
  /** The target is outside of its clipping boundary, `false` without a layout viewport */
  referenceHidden: boolean;
  /** The floating element crosses the top or bottom clipping edge */
  intersecting: boolean;
};

const TOP = 'top';
const RIGHT = 'right';
const BOTTOM = 'bottom';
const LEFT = 'left';
const START = 'start';
const END = 'end';
const SIDES: Side[] = [TOP, RIGHT, BOTTOM, LEFT];
const lengthOf = (axis: Axis) => (axis === 'x' ? 'width' : 'height');
const startOf = (axis: Axis) => (axis === 'x' ? LEFT : TOP);
const endOf = (axis: Axis) => (axis === 'x' ? RIGHT : BOTTOM);
const sides = (top: number, right: number, bottom: number, left: number): SideObject => ({ top, right, bottom, left });
const normalizePadding = (
  padding: NonNullable<PositioningOptions['overflowBoundaryPadding']>,
  isRtl: boolean,
): SideObject =>
  typeof padding === 'number'
    ? sides(padding, padding, padding, padding)
    : sides(
        padding.top ?? 0,
        padding[isRtl ? START : END] ?? 0,
        padding.bottom ?? 0,
        padding[isRtl ? END : START] ?? 0,
      );
const splitPlacement = (placement: PositioningPlacement) =>
  placement.split('-') as [Side, (typeof START | typeof END)?];
const alignmentAxis = (side: Side): Axis => (side === TOP || side === BOTTOM ? 'x' : 'y');

type FlipAttempt = [placement: PositioningPlacement, fitsSide: boolean, score: number];

/** Prefer the least alignment overflow among side fits, otherwise the least total overflow. The first tie wins. */
const bestFit = (
  previous: FlipAttempt | undefined,
  placement: PositioningPlacement,
  overflows: number[],
): FlipAttempt => {
  const fitsSide = overflows[0] <= 0;
  const score = fitsSide ? overflows[1] : overflows.reduce((sum, value) => sum + Math.max(0, value), 0);
  return !previous || (fitsSide !== previous[1] ? fitsSide : score < previous[2])
    ? [placement, fitsSide, score]
    : previous;
};

const clamp = (min: number, value: number, max: number) => Math.max(min, Math.min(value, max));
/**
 * Ordered bounds checks: unlike `clamp`, inverted bounds (e.g. an offset that pushes the floating element past the
 * target) resolve to `max` unless the value is below `min`.
 */
export const limit = (min: number, value: number, max: number): number =>
  value < min ? min : value > max ? max : value;
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
  { placement: initial = BOTTOM, strategy, options = {}, isRtl, arrow }: Options,
): Promise<ComputePositionResult> {
  const {
    autoSize: rawAutoSize,
    offset,
    matchTargetSize,
    coverTarget,
    pinned,
    flipBoundary,
    flipBoundaryPadding = 0,
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
  // Load-bearing: like Floating UI (awaits of the reset middleware, the floating dimensions and the offset parent),
  // reads the target three microtasks after the reset, so observers of these writes and of the manager's position
  // write, and updates they queue at most two microtasks later (e.g. React commits of updates made during a resize
  // event), move it first ("measures an auto-sized list after observers..." regressions). A run started within the
  // wait measures the auto-size styles of the previous one, like Floating UI. Later measurements are synchronous.
  await await await 0;
  const rtl = getStyle(container).direction === 'rtl';
  const referenceElement = 'nodeType' in target ? target : target.contextElement || getRoot(container);
  const clip = (element: Element, boundary?: PositioningBoundary | null) =>
    getClippingRect(
      element,
      getBoundary(container, boundary as PositioningBoundary) || 'clippingAncestors',
      getWindow(container),
      strategy,
    );
  // An explicit boundary clips the target, otherwise the clipping ancestors of the container are used
  const boundaryClip = (boundary?: PositioningBoundary | null) =>
    clip(boundary ? referenceElement : container, boundary);
  let flipClip!: PositioningRect;
  let shiftClip!: PositioningRect;
  let visibilityClip!: PositioningRect;
  const padding = normalizePadding(rawPadding, isRtl ?? false);
  const flipPadding = normalizePadding(flipBoundaryPadding, isRtl ?? false);
  /** How far the box (in container coordinates) overflows the bounds (in viewport coordinates) on each side */
  const overflow = (box: PositioningRect, bounds: PositioningRect, inset = sides(0, 0, 0, 0)) => {
    const result = {} as SideObject;
    for (const axis of ['x', 'y'] as const) {
      const length = lengthOf(axis);
      const axisScale = space.scale[axis];
      const origin = space[axis];
      result[startOf(axis)] = (bounds[axis] - (box[axis] * axisScale + origin) + inset[startOf(axis)]) / axisScale;
      result[endOf(axis)] =
        ((box[axis] + box[length]) * axisScale + origin - bounds[axis] - bounds[length] + inset[endOf(axis)]) /
        axisScale;
    }
    return result;
  };
  const [initialSide, initialAlign] = splitPlacement(initial);
  // Without fallbacks: the initial placement, the opposite alignment, the opposite side and both opposites
  const candidates = fallbackPositions.length
    ? [
        initial,
        ...fallbackPositions.map(shorthand => {
          const [position, align] = shorthand.split('-') as [Position, Alignment?];
          return toPhysicalPlacement(align, position, isRtl)!;
        }),
      ]
    : ([initialSide, SIDES[(SIDES.indexOf(initialSide) + 2) % 4]].flatMap(side =>
        initialAlign ? [`${side}-${initialAlign}`, `${side}-${initialAlign === START ? END : START}`] : [side],
      ) as PositioningPlacement[]);
  let space: ReturnType<typeof getCoordinateSpace>;
  /**
   * The reference and floating rects in the container's coordinate space. Resizing the container can move its
   * containing block and change the scrollbars of its ancestors, so the coordinate space and the clipping
   * rects are measured together with the rects.
   */
  const measure = (): [PositioningRect, PositioningRect] => {
    flipClip = boundaryClip(flipBoundary);
    // Without explicit boundaries flipping and shifting share one measurement
    shiftClip = flipBoundary || overflowBoundary ? boundaryClip(overflowBoundary) : flipClip;
    visibilityClip = clip(referenceElement);
    space = getCoordinateSpace(container, strategy);
    const { width, height } = getDimensions(container);
    return [getReferenceRect(target, referenceElement, container, space, strategy), rect(0, 0, width, height)];
  };
  let rects = measure();
  let candidateIndex = 0;
  let previousBest: FlipAttempt | undefined;
  let placement = initial;
  let matchWidth = matchTargetSize;
  let preserveCoordinates = false;
  let arrowData: Partial<Coords> | undefined;
  let intersectionOverflow!: SideObject;
  const coords = { x: 0, y: 0 };
  let delta: Coords = NO_OFFSET;

  // Size changes restart with fresh measurements; flips restart with a new candidate; only an arrow reset keeps coords.
  // Core accepts 51 resets (including the initial auto-size style reset), then runs one pass without restarting.
  for (let resetsLeft = autoSize.length ? 50 : 51; resetsLeft >= 0; resetsLeft--) {
    const [r, f] = rects;
    const [side, align] = splitPlacement(placement);
    // `main` is the alignment axis, `cross` is the axis that leads away from the target.
    const main = alignmentAxis(side);
    const cross = main === 'x' ? 'y' : 'x';
    const isStart = side === startOf(cross);
    const rtlAlignment = rtl && main === 'x';
    const alignsToStart = align === (rtlAlignment ? END : START);
    const mainLength = lengthOf(main);
    const crossLength = lengthOf(cross);
    const floatingRect = () => ({ ...f, ...coords });
    if (!preserveCoordinates) {
      const referenceHalf = r[mainLength] / 2;
      const floatingHalf = f[mainLength] / 2;
      coords[main] = r[main] + referenceHalf - floatingHalf;
      coords[cross] = r[cross] + (isStart ? -f[crossLength] : r[crossLength]);
      if (align) {
        coords[main] += (referenceHalf - floatingHalf) * (alignsToStart ? -1 : 1);
      }
    }
    preserveCoordinates = false;
    if (matchWidth && r.width !== f.width) {
      const property = '--fui-match-target-size';
      setStyle(property, px(r.width));
      if (!css.width) {
        css.width = `var(${property})`;
      }
      matchWidth = undefined;
      if (resetsLeft) {
        rects = measure();
        continue;
      }
    }

    if (offset) {
      const raw =
        typeof offset === 'function'
          ? offset({ positionedRect: f, targetRect: r, ...fromPhysicalPlacement(side, align) })
          : offset;
      const value = typeof raw === 'number' ? { mainAxis: raw } : raw;
      // Only an arrow adjustment can restart the pipeline after arrowData has been set.
      if (!arrowData) {
        delta = {
          [cross]: (value.mainAxis || 0) * (isStart ? -1 : 1),
          [main]: (value.crossAxis || 0) * (rtlAlignment ? -1 : 1),
        } as Coords;
        coords.x += delta.x;
        coords.y += delta.y;
      }
    }
    if (coverTarget) {
      coords[cross] += (isStart ? 1 : -1) * r[crossLength];
    }
    if (resetsLeft && !pinned && !arrowData) {
      const values = overflow(floatingRect(), flipClip, flipPadding);
      // The edge on the alignment axis that overflows first: the end edge for start alignment (logical in RTL),
      // the opposite one when the target is larger than the floating element
      const alignEnd = alignsToStart !== r[mainLength] > f[mainLength];
      const overflows = [
        values[side],
        values[(alignEnd ? endOf : startOf)(main)],
        values[(alignEnd ? startOf : endOf)(main)],
      ];
      if (overflows.some(value => value > 0)) {
        const best = bestFit(previousBest, placement, overflows);
        const next = candidates[candidateIndex + 1];
        // Only advancing to another candidate persists this attempt across subsequent resets.
        if (next) {
          previousBest = best;
          candidateIndex++;
        }
        if (next || best[0] !== placement) {
          placement = next || best[0];
          continue;
        }
      }
    }
    const shiftCross = disableTether ? disableTether === 'all' : shiftToCoverTarget;
    const values = overflow(floatingRect(), shiftClip, padding);
    shiftOverflow(coords, main, values);
    if (shiftCross) {
      shiftOverflow(coords, cross, values);
    }
    // Shifting on the cross axis, and disabling the tether on one axis, keep the floating element next to the target
    if (disableTether !== 'all' && (shiftCross || disableTether)) {
      coords[cross] = limit(
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
      if (resetsLeft && (f.width !== dimensions.width || f.height !== dimensions.height)) {
        rects = measure();
        continue;
      }
    }
    intersectionOverflow = overflow(floatingRect(), visibilityClip);
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
      const adjust = !arrowData && align && center !== arrowOffset && r[mainLength] / 2 - inset - arrowLength / 2 < 0;
      arrowData = { [main]: arrowOffset };
      if (adjust) {
        coords[main] += center - arrowOffset;
        preserveCoordinates = true;
      }
    }
    if (!preserveCoordinates) {
      break;
    }
  }
  const [reference, floating] = rects;
  // Only an arrow adjustment on the last permitted pass changes the coordinates between intersection and hide.
  const hideOverflow = preserveCoordinates
    ? overflow({ ...floating, ...coords }, visibilityClip)
    : intersectionOverflow;
  const { clientWidth, clientHeight } = getRoot(container);
  // Visibility can't be determined without a layout viewport (e.g. in jsdom)
  const isHidden = (values: SideObject, box: PositioningRect) =>
    !!(clientWidth || clientHeight) && SIDES.some((side, index) => values[side] >= box[index % 2 ? 'width' : 'height']);
  return {
    ...coords,
    placement,
    arrow: arrowData,
    referenceHidden: isHidden(overflow(reference, visibilityClip), reference),
    escaped: isHidden(hideOverflow, floating),
    intersecting: [intersectionOverflow.top, intersectionOverflow.bottom].some(
      value => value > 0 && value < floating.height,
    ),
  };
}
