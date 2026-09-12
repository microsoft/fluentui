import type { DashboardGridCellMetrics, DashboardGridPixelRect, DashboardGridRect } from './DashboardGridEngine.types';
import type { InternalRect } from './internalTypes';

export const sameInternalRect = (a: InternalRect, b: InternalRect): boolean =>
  a.x === b.x && a.y === b.y && a.w === b.w && a.h === b.h;

export const sameRect = (a: DashboardGridRect, b: DashboardGridRect): boolean =>
  a.column === b.column && a.row === b.row && a.columnSpan === b.columnSpan && a.rowSpan === b.rowSpan;

export const intersects = (a: InternalRect, b: InternalRect): boolean =>
  !(a.y >= b.y + b.h || a.y + a.h <= b.y || a.x + a.w <= b.x || a.x >= b.x + b.w);

export const touches = (a: InternalRect, b: InternalRect): boolean =>
  intersects(a, {
    x: b.x - 0.5,
    y: b.y - 0.5,
    w: b.w + 1,
    h: b.h + 1,
  });

export const overlapArea = (a: InternalRect, b: InternalRect): number => {
  const left = Math.max(a.x, b.x);
  const right = Math.min(a.x + a.w, b.x + b.w);
  const top = Math.max(a.y, b.y);
  const bottom = Math.min(a.y + a.h, b.y + b.h);

  if (right <= left || bottom <= top) {
    return 0;
  }

  return (right - left) * (bottom - top);
};

export const pixelOverlapArea = (a: DashboardGridPixelRect, b: DashboardGridPixelRect): number => {
  const left = Math.max(a.x, b.x);
  const right = Math.min(a.x + a.width, b.x + b.width);
  const top = Math.max(a.y, b.y);
  const bottom = Math.min(a.y + a.height, b.y + b.height);

  if (right <= left || bottom <= top) {
    return 0;
  }

  return (right - left) * (bottom - top);
};

export const rectArea = (rect: InternalRect): number => rect.w * rect.h;

export const pixelRectArea = (rect: DashboardGridPixelRect): number => rect.width * rect.height;

export const toPublicRect = (rect: InternalRect): DashboardGridRect =>
  Object.freeze({
    column: rect.x,
    row: rect.y,
    columnSpan: rect.w,
    rowSpan: rect.h,
  });

export const toInternalRect = (rect: DashboardGridRect): InternalRect => ({
  x: rect.column,
  y: rect.row,
  w: rect.columnSpan,
  h: rect.rowSpan,
});

export const toPixelRect = (rect: InternalRect, metrics: DashboardGridCellMetrics): DashboardGridPixelRect =>
  Object.freeze({
    x: rect.x * metrics.columnWidth + metrics.gapLeft,
    y: rect.y * metrics.rowHeight + metrics.gapTop,
    width: Math.max(0, rect.w * metrics.columnWidth - metrics.gapLeft - metrics.gapRight),
    height: Math.max(0, rect.h * metrics.rowHeight - metrics.gapTop - metrics.gapBottom),
  });

export const sweepPixelRect = (
  origin: DashboardGridPixelRect,
  current: DashboardGridPixelRect,
): DashboardGridPixelRect => {
  const left = Math.min(origin.x, current.x);
  const top = Math.min(origin.y, current.y);
  const right = Math.max(origin.x + origin.width, current.x + current.width);
  const bottom = Math.max(origin.y + origin.height, current.y + current.height);

  return Object.freeze({
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
  });
};

export const directionalCoverage = (
  origin: DashboardGridPixelRect,
  current: DashboardGridPixelRect,
  target: DashboardGridPixelRect,
): number => {
  const sweep = sweepPixelRect(origin, current);
  let vertical = Number.POSITIVE_INFINITY;
  let horizontal = Number.POSITIVE_INFINITY;

  if (origin.y < target.y) {
    vertical = (sweep.y + sweep.height - target.y) / target.height;
  } else if (origin.y + origin.height > target.y + target.height) {
    vertical = (target.y + target.height - sweep.y) / target.height;
  }

  if (origin.x < target.x) {
    horizontal = (sweep.x + sweep.width - target.x) / target.width;
  } else if (origin.x + origin.width > target.x + target.width) {
    horizontal = (target.x + target.width - sweep.x) / target.width;
  }

  const coverage = Math.min(horizontal, vertical);
  if (!Number.isFinite(coverage)) {
    return 1;
  }

  return Math.max(0, Math.min(1, coverage));
};

export const nestingCoverage = (active: DashboardGridPixelRect, target: DashboardGridPixelRect): number => {
  const smallerArea = Math.min(pixelRectArea(active), pixelRectArea(target));
  return smallerArea <= 0 ? 0 : pixelOverlapArea(active, target) / smallerArea;
};
