import type { Position } from '@fluentui/react-positioning';
import { ABOVE, AFTER, BEFORE, BELOW, CENTER, END, START } from '../constants';
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

export type FallbackInput = [
  /** Rect of the anchor, in the same coordinate space as `bounds` */
  anchor: FallbackRect,
  /** Rect of the containing block of the positioned element, the box is kept inside of it */
  bounds: FallbackRect,
  width: number,
  height: number,
  /** Direction of the containing block */
  rtl: boolean,
  placement: FallbackPlacement,
  /** Margin on the block axis (physical `top` and `bottom`) */
  marginBlock: number,
  /** Margin on the inline axis (physical `left` and `right`) */
  marginInline: number,
  /** Rect used to know if a placement fits, defaults to `bounds` */
  flipBounds?: FallbackRect,
  /** Placements to try when `placement` doesn't fit, `undefined` uses the default CSS fallbacks */
  fallbacks?: FallbackPlacement[],
  pinned?: boolean,
  coverTarget?: boolean,
  /** Margins that depend on the placement, replacing `marginBlock` and `marginInline` */
  getMargins?: (placement: FallbackPlacement) => [marginBlock: number, marginInline: number],
];

export interface FallbackOutput extends FallbackPlacement {
  left: number;
  top: number;
}

type Region = [start: number, end: number];

/** One physical axis (`x` or `y`) of the anchor, the containing block and the box */
type Axis = [
  anchorStart: number,
  anchorSize: number,
  anchorEnd: number,
  bounds: Region,
  flipBounds: Region,
  extended: Region,
  size: number,
  margin: number,
];

const createAxis = (
  anchorStart: number,
  anchorSize: number,
  start: number,
  size: number,
  flipStart: number,
  flipSize: number,
  boxSize: number,
  margin: number,
): Axis => {
  const end = start + size;
  const anchorEnd = anchorStart + anchorSize;

  return [
    anchorStart,
    anchorSize,
    anchorEnd,
    [start, end],
    [flipStart, flipStart + flipSize],
    [Math.min(start, anchorStart), Math.max(end, anchorEnd)],
    boxSize,
    margin,
  ];
};

const isBlockAxis = (position: Position): boolean => position === ABOVE || position === BELOW;

const flipPlacement = ({ position, align }: FallbackPlacement, block: boolean): FallbackPlacement => {
  const flippedAlign = align === START ? END : align === END ? START : align;

  return {
    position: block
      ? position === ABOVE
        ? BELOW
        : position === BELOW
        ? ABOVE
        : position
      : position === BEFORE
      ? AFTER
      : position === AFTER
      ? BEFORE
      : position,
    align: isBlockAxis(position) === block ? align : flippedAlign,
  };
};

const clamp = (value: number, [start, end]: Region, size: number): number =>
  Math.min(Math.max(value, start), end - size);

/**
 * `anchor-center`: centers on the anchor and keeps the box inside the region when it fits. When it doesn't fit the box
 * is kept inside the containing block instead (it can't overflow its start, and it's aligned to the start when it is larger).
 */
const anchorCenter = ([anchorStart, anchorSize, , , , extended, size, margin]: Axis, region: Region): number => {
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
function placeMain(axis: Axis, low: boolean, centerSelf: boolean): [start: number, area: Region] {
  const [anchorStart, , anchorEnd, , flipBounds, extended, size, margin] = axis;
  const area: Region = low ? [flipBounds[0], anchorStart] : [anchorEnd, flipBounds[1]];

  return [
    centerSelf
      ? anchorCenter(axis, low ? [extended[0], anchorStart] : [anchorEnd, extended[1]])
      : low
      ? anchorStart - margin - size
      : anchorEnd + margin,
    area,
  ];
}

/**
 * Position on the other axis, aligned to the `low` or `high` edge of the anchor or centered.
 */
function placeCross(axis: Axis, to: 'low' | 'high' | 'center', centerSelf: boolean): [start: number, area: Region] {
  const [anchorStart, anchorSize, anchorEnd, , flipBounds, extended, size, margin] = axis;

  if (to === 'center') {
    return [centerSelf ? anchorCenter(axis, extended) : anchorStart + anchorSize / 2 - size / 2, flipBounds];
  }

  const area: Region = to === 'low' ? [anchorStart, flipBounds[1]] : [flipBounds[0], anchorEnd];

  return [
    // `place-self: anchor-center` also centers the aligned areas
    centerSelf ? anchorCenter(axis, area) : to === 'low' ? anchorStart + margin : anchorEnd - margin - size,
    area,
  ];
}

/**
 * Safe alignment: the box doesn't overflow the containing block when it fits inside it.
 */
const keepInside = ([, , , , , extended, size, margin]: Axis, start: number): number => {
  const outer = size + 2 * margin;
  return outer <= extended[1] - extended[0]
    ? clamp(start - margin, extended, outer) + margin
    : Math.max(start, extended[0] + margin);
};

const fitsInside = (start: number, area: Region, [, , , , , , size, margin]: Axis) =>
  start - margin >= area[0] - 0.01 && start + size + margin <= area[1] + 0.01;

function place(
  x: Axis,
  y: Axis,
  { position, align }: FallbackPlacement,
  rtl: boolean,
  centerSelf: boolean,
): [left: number, top: number, fits: boolean] {
  const blockMain = isBlockAxis(position);
  // `low` is the left or top side
  const low = blockMain ? position === ABOVE : (position === BEFORE) !== rtl;
  const mainAxis = blockMain ? y : x;
  const crossAxis = blockMain ? x : y;
  const main = placeMain(mainAxis, low, centerSelf);
  // Left and right are the physical sides, `start` of the inline axis is on the right for `rtl`
  const cross = blockMain
    ? placeCross(crossAxis, align === CENTER ? 'center' : (align === START) !== rtl ? 'low' : 'high', centerSelf)
    : placeCross(crossAxis, align === CENTER ? 'center' : align === START ? 'low' : 'high', centerSelf);

  main[0] = keepInside(mainAxis, main[0]);
  cross[0] = keepInside(crossAxis, cross[0]);
  const fits = fitsInside(main[0], main[1], mainAxis) && fitsInside(cross[0], cross[1], crossAxis);

  return blockMain ? [cross[0], main[0], fits] : [main[0], cross[0], fits];
}

/**
 * Cover the target: the box is aligned inside the anchor and kept inside the containing block.
 */
function placeOverTarget(x: Axis, y: Axis, { position, align }: FallbackPlacement, rtl: boolean) {
  const alignInside = ([anchorStart, anchorSize, , , , extended, size, margin]: Axis, to: LogicalAlignment) => {
    const start =
      to === START
        ? anchorStart + margin
        : to === END
        ? anchorStart + anchorSize - margin - size
        : anchorStart + anchorSize / 2 - size / 2;
    const outer = size + 2 * margin;

    return outer <= extended[1] - extended[0] ? clamp(start - margin, extended, outer) + margin : start;
  };
  const blockMain = isBlockAxis(position);
  // Left and right are the physical sides, `start` of the inline axis is on the right for `rtl`
  const inline = align === CENTER ? align : (align === START) !== rtl ? START : END;

  return [
    alignInside(x, blockMain ? inline : (position === BEFORE) !== rtl ? END : START),
    alignInside(y, blockMain ? (position === ABOVE ? END : START) : align),
  ] as const;
}

/**
 * Computes the position of an element the way CSS anchor positioning (`position-area` + `position-try-fallbacks`) does,
 * it's used when the browser doesn't support it.
 */
export function computeFallbackPosition(input: FallbackInput): FallbackOutput {
  const [
    anchor,
    bounds,
    width,
    height,
    rtl,
    placement,
    marginBlock,
    marginInline,
    flipBounds,
    fallbacks,
    pinned,
    coverTarget,
    getMargins,
  ] = input;
  const flip = flipBounds ?? bounds;
  const createAxes = ([blockMargin, inlineMargin] = [marginBlock, marginInline]) => [
    createAxis(anchor.left, anchor.width, bounds.left, bounds.width, flip.left, flip.width, width, inlineMargin),
    createAxis(anchor.top, anchor.height, bounds.top, bounds.height, flip.top, flip.height, height, blockMargin),
  ];

  if (coverTarget) {
    const [x, y] = createAxes(getMargins?.(placement));
    const [left, top] = placeOverTarget(x, y, placement, rtl);
    return { ...placement, left, top };
  }

  // Only the requested placement is centered on the anchor on both axes (`place-self: anchor-center`)
  const centerSelf = placement.align === CENTER;
  const candidates = pinned
    ? [placement]
    : [
        placement,
        ...(fallbacks ?? [
          flipPlacement(placement, true),
          flipPlacement(placement, false),
          flipPlacement(flipPlacement(placement, true), false),
        ]),
      ];

  let first: FallbackOutput | undefined;

  for (const candidate of candidates) {
    const [x, y] = createAxes(getMargins?.(candidate));
    const [left, top, fits] = place(x, y, candidate, rtl, centerSelf);
    const output = { ...candidate, left, top };
    first ??= output;

    if (fits) {
      return output;
    }
  }

  // Nothing fits, CSS keeps the requested placement
  return first as FallbackOutput;
}
