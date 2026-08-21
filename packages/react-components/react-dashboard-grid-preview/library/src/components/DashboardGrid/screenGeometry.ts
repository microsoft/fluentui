import type * as React from 'react';
import type { DashboardGridCellMetrics, DashboardGridRect } from '../../engine';

/** Creates absolute screen geometry from resolved grid cells. */
export const getDashboardGridScreenGeometryStyle = (
  rect: DashboardGridRect,
  metrics: DashboardGridCellMetrics,
  columns: number,
  fallbackRowHeight: number,
): React.CSSProperties => {
  if (metrics.columnWidth > 0) {
    return {
      insetInlineStart: rect.column * metrics.columnWidth + metrics.gapLeft,
      top: rect.row * metrics.rowHeight + metrics.gapTop,
      width:
        rect.columnSpan * metrics.columnWidth - metrics.gapLeft - metrics.gapRight,
      height: rect.rowSpan * metrics.rowHeight - metrics.gapTop - metrics.gapBottom,
    };
  }

  return {
    insetInlineStart: `${(rect.column / Math.max(1, columns)) * 100}%`,
    top: rect.row * fallbackRowHeight,
    width: `${(rect.columnSpan / Math.max(1, columns)) * 100}%`,
    height: rect.rowSpan * fallbackRowHeight,
  };
};

/** Returns the positioned surface height for a resolved row count. */
export const getDashboardGridSurfaceBlockSize = (
  rows: number,
  metrics: DashboardGridCellMetrics,
  fallbackRowHeight: number,
): number => Math.max(0, rows) * (metrics.rowHeight > 0 ? metrics.rowHeight : fallbackRowHeight);
