import type * as React from 'react';

export type DashboardGridPrintMode = 'flow' | 'exact';

export type DashboardGridGeometryRect = {
  column: number;
  row: number;
  columnSpan: number;
  rowSpan: number;
};

export type DashboardGridGeometryStyle = React.CSSProperties & {
  '--dashboard-grid-column'?: number;
  '--dashboard-grid-row'?: number;
  '--dashboard-grid-column-span'?: number;
  '--dashboard-grid-row-span'?: number;
  '--dashboard-grid-columns'?: number;
};

export type DashboardGridPrintGeometryStyle = React.CSSProperties & {
  '--dashboard-grid-print-width'?: string;
};

export const getDashboardGridGeometryStyle = (
  rect: DashboardGridGeometryRect,
  columns?: number,
): DashboardGridGeometryStyle => ({
  '--dashboard-grid-column': rect.column,
  '--dashboard-grid-row': rect.row,
  '--dashboard-grid-column-span': rect.columnSpan,
  '--dashboard-grid-row-span': rect.rowSpan,
  ...(columns === undefined ? {} : { '--dashboard-grid-columns': columns }),
});

export const getDashboardGridPrintGeometryStyle = (
  rect: DashboardGridGeometryRect,
  mode: DashboardGridPrintMode,
  columns: number,
): DashboardGridPrintGeometryStyle => {
  if (mode === 'flow') {
    return {
      '--dashboard-grid-print-width': `${(rect.columnSpan / Math.max(1, columns)) * 100}%`,
    };
  }

  return {
    gridColumnStart: rect.column + 1,
    gridColumnEnd: `span ${rect.columnSpan}`,
    gridRowStart: rect.row + 1,
    gridRowEnd: `span ${rect.rowSpan}`,
  };
};
