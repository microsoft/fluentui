import type { Position } from '@fluentui/react-positioning';
import { ALIGNMENTS, POSITIONS } from '../constants';
import type { LogicalAlignment } from '../types';

export interface FallbackRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface FallbackPlacement {
  position: Position;
  align: LogicalAlignment;
}

export interface FallbackInput {
  /** Rect of the anchor, in the same coordinate space as `bounds` */
  anchor: FallbackRect;
  /** Rect of the containing block of the positioned element */
  bounds: FallbackRect;
  width: number;
  height: number;
  /** Direction of the containing block */
  rtl: boolean;
  placement: FallbackPlacement;
  /** Placements to try when `placement` doesn't fit, `undefined` uses the default fallbacks of CSS (`flip-block`, `flip-inline`, ...) */
  fallbacks?: FallbackPlacement[];
  pinned?: boolean;
  coverTarget?: boolean;
  /** Margin on the block axis (physical `top` and `bottom`) and on the inline axis (`left` and `right`) */
  marginBlock: number;
  marginInline: number;
}

export interface FallbackOutput extends FallbackPlacement {
  left: number;
  top: number;
}

type Region = [start: number, end: number];

/** One physical axis (`x` or `y`) of the anchor, the containing block and the box */
interface Axis {
  anchorStart: number;
  anchorSize: number;
  anchorEnd: number;
  /** The containing block */
  bounds: Region;
  /** The grid of `position-area` is extended when the anchor sticks out of the containing block */
  extended: Region;
  size: number;
  margin: number;
}

const createAxis = (
  anchorStart: number,
  anchorSize: number,
  start: number,
  size: number,
  boxSize: number,
  margin: number,
): Axis => {
  const end = start + size;
  const anchorEnd = anchorStart + anchorSize;

  return {
    anchorStart,
    anchorSize,
    anchorEnd,
    bounds: [start, end],
    extended: [Math.min(start, anchorStart), Math.max(end, anchorEnd)],
    size: boxSize,
    margin,
  };
};

const flipAlign = (align: LogicalAlignment): LogicalAlignment =>
  align === ALIGNMENTS.start ? ALIGNMENTS.end : align === ALIGNMENTS.end ? ALIGNMENTS.start : align;

const isBlockAxis = (position: Position): boolean => position === POSITIONS.above || position === POSITIONS.below;

/** `position-try-fallbacks: flip-block` */
const flipBlock = ({ position, align }: FallbackPlacement): FallbackPlacement => ({
  position: position === POSITIONS.above ? POSITIONS.below : position === POSITIONS.below ? POSITIONS.above : position,
  align: isBlockAxis(position) ? align : flipAlign(align),
});

/** `position-try-fallbacks: flip-inline` */
const flipInline = ({ position, align }: FallbackPlacement): FallbackPlacement => ({
  position:
    position === POSITIONS.before ? POSITIONS.after : position === POSITIONS.after ? POSITIONS.before : position,
  align: isBlockAxis(position) ? flipAlign(align) : align,
});

const clamp = (value: number, [start, end]: Region, size: number): number =>
  Math.min(Math.max(value, start), end - size);

/**
 * `anchor-center`: centers on the anchor and keeps the box inside the region when it fits. When it doesn't fit the box
 * is kept inside the containing block instead (it can't overflow its start, and it's aligned to the start when it is larger).
 */
const anchorCenter = ({ anchorStart, anchorSize, size, margin, extended }: Axis, region: Region): number => {
  const outer = size + 2 * margin;
  const centered = anchorStart + anchorSize / 2 - outer / 2;
  const fitsRegion = outer <= region[1] - region[0];

  return (
    (fitsRegion || outer <= extended[1] - extended[0]
      ? clamp(centered, fitsRegion ? region : extended, outer)
      : extended[0]) + margin
  );
};

/**
 * Position on the axis of the position (`above`, `before`, ...): next to the anchor, `low` is the side before the anchor.
 */
function placeMain(axis: Axis, low: boolean, centerSelf: boolean): { start: number; area: Region } {
  const { anchorStart, anchorEnd, bounds, extended, size, margin } = axis;
  const area: Region = low ? [bounds[0], anchorStart] : [anchorEnd, bounds[1]];

  return {
    area,
    start: centerSelf
      ? anchorCenter(axis, low ? [extended[0], anchorStart] : [anchorEnd, extended[1]])
      : low
      ? anchorStart - margin - size
      : anchorEnd + margin,
  };
}

/**
 * Position on the other axis, aligned to the `low` or `high` edge of the anchor or centered.
 */
function placeCross(axis: Axis, to: 'low' | 'high' | 'center', centerSelf: boolean): { start: number; area: Region } {
  const { anchorStart, anchorSize, anchorEnd, bounds, extended, size, margin } = axis;

  if (to === 'center') {
    return {
      area: bounds,
      start: centerSelf ? anchorCenter(axis, extended) : anchorStart + anchorSize / 2 - size / 2,
    };
  }

  const area: Region = to === 'low' ? [anchorStart, bounds[1]] : [bounds[0], anchorEnd];

  return {
    area,
    // `place-self: anchor-center` also centers the aligned areas
    start: centerSelf ? anchorCenter(axis, area) : to === 'low' ? anchorStart + margin : anchorEnd - margin - size,
  };
}

/**
 * Safe alignment: the box doesn't overflow the containing block when it fits inside it.
 */
const keepInside = ({ extended, size, margin }: Axis, start: number): number => {
  const outer = size + 2 * margin;
  return outer <= extended[1] - extended[0]
    ? clamp(start - margin, extended, outer) + margin
    : Math.max(start, extended[0] + margin);
};

const fitsInside = ({ start, area, size, margin }: { start: number; area: Region; size: number; margin: number }) =>
  start - margin >= area[0] - 0.01 && start + size + margin <= area[1] + 0.01;

function place(
  x: Axis,
  y: Axis,
  { position, align }: FallbackPlacement,
  rtl: boolean,
  centerSelf: boolean,
): { left: number; top: number; fits: boolean } {
  const blockMain = isBlockAxis(position);
  // `low` is the left or top side
  const low = blockMain ? position === POSITIONS.above : (position === POSITIONS.before) !== rtl;
  const main = blockMain ? placeMain(y, low, centerSelf) : placeMain(x, low, centerSelf);
  // Left and right are the physical sides, `start` of the inline axis is on the right for `rtl`
  const cross = blockMain
    ? placeCross(
        x,
        align === ALIGNMENTS.center ? 'center' : (align === ALIGNMENTS.start) !== rtl ? 'low' : 'high',
        centerSelf,
      )
    : placeCross(y, align === ALIGNMENTS.center ? 'center' : align === ALIGNMENTS.start ? 'low' : 'high', centerSelf);

  const [mainAxis, crossAxis] = blockMain ? [y, x] : [x, y];
  main.start = keepInside(mainAxis, main.start);
  cross.start = keepInside(crossAxis, cross.start);
  const fits =
    fitsInside({ ...main, size: mainAxis.size, margin: mainAxis.margin }) &&
    fitsInside({ ...cross, size: crossAxis.size, margin: crossAxis.margin });

  return blockMain ? { left: cross.start, top: main.start, fits } : { left: main.start, top: cross.start, fits };
}

/**
 * Cover the target: the box is aligned inside the anchor and kept inside the containing block.
 */
function placeOverTarget(x: Axis, y: Axis, { position, align }: FallbackPlacement, rtl: boolean) {
  const alignInside = ({ anchorStart, anchorSize, size, margin, extended }: Axis, to: LogicalAlignment) => {
    const start =
      to === ALIGNMENTS.start
        ? anchorStart + margin
        : to === ALIGNMENTS.end
        ? anchorStart + anchorSize - margin - size
        : anchorStart + anchorSize / 2 - size / 2;
    const outer = size + 2 * margin;

    return outer <= extended[1] - extended[0] ? clamp(start - margin, extended, outer) + margin : start;
  };
  const blockMain = isBlockAxis(position);
  // Left and right are the physical sides, `start` of the inline axis is on the right for `rtl`
  const inline =
    align === ALIGNMENTS.center ? align : (align === ALIGNMENTS.start) !== rtl ? ALIGNMENTS.start : ALIGNMENTS.end;

  return {
    left: alignInside(
      x,
      blockMain ? inline : (position === POSITIONS.before) !== rtl ? ALIGNMENTS.end : ALIGNMENTS.start,
    ),
    top: alignInside(y, blockMain ? (position === POSITIONS.above ? ALIGNMENTS.end : ALIGNMENTS.start) : align),
  };
}

/**
 * Computes the position of an element the way CSS anchor positioning (`position-area` + `position-try-fallbacks`) does,
 * it's used when the browser doesn't support it.
 */
export function computeFallbackPosition(input: FallbackInput): FallbackOutput {
  const { anchor, bounds, width, height, rtl, placement, fallbacks, pinned, coverTarget, marginBlock, marginInline } =
    input;
  const x = createAxis(anchor.left, anchor.width, bounds.left, bounds.width, width, marginInline);
  const y = createAxis(anchor.top, anchor.height, bounds.top, bounds.height, height, marginBlock);

  if (coverTarget) {
    return { ...placement, ...placeOverTarget(x, y, placement, rtl) };
  }

  // Only the requested placement is centered on the anchor on both axes (`place-self: anchor-center`)
  const centerSelf = placement.align === ALIGNMENTS.center;
  const candidates = pinned
    ? [placement]
    : [placement, ...(fallbacks ?? [flipBlock(placement), flipInline(placement), flipInline(flipBlock(placement))])];

  let first: FallbackOutput | undefined;

  for (const candidate of candidates) {
    const { left, top, fits } = place(x, y, candidate, rtl, centerSelf);
    const output = { ...candidate, left, top };
    first ??= output;

    if (fits) {
      return output;
    }
  }

  // Nothing fits, CSS keeps the requested placement
  return first as FallbackOutput;
}
