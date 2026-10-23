import type { LineChartPlotContext, LineChartRect } from './LineChartScene.types';

/**
 * A keyed interval in one numeric or Date x-value family. Dates are captured by value.
 * {@docCategory ChartData}
 */
export interface LineChartAnnotationInterval {
  readonly key: string;
  readonly start: number | Date;
  readonly end: number | Date;
}

/**
 * Explicit logical endpoint semantics, independent of projection and calendar conventions.
 * {@docCategory LineChart}
 */
export interface LineChartAnnotationIntervalOptions {
  readonly bounds: 'closed' | 'half-open';
}

/**
 * One non-overpainted portion of projected interval coverage in root SVG coordinates.
 * Membership describes visual coverage, not logical membership at an inspected x value.
 * {@docCategory ChartData}
 */
export interface LineChartResolvedAnnotationIntervalRegion {
  readonly key: string;
  readonly intervalKeys: readonly string[];
  readonly rect: LineChartRect;
}

/**
 * A connected logical-overlap component of currently visible intervals.
 * Its key depends only on member keys; members retain their original input order.
 * {@docCategory ChartData}
 */
export interface LineChartResolvedAnnotationIntervalGroup {
  readonly key: string;
  readonly intervalKeys: readonly string[];
  readonly rect: LineChartRect;
}

/**
 * Immutable projected coverage and logical groups for the current plot projection.
 * {@docCategory ChartData}
 */
export interface LineChartAnnotationIntervalLayout {
  readonly regions: readonly LineChartResolvedAnnotationIntervalRegion[];
  readonly groups: readonly LineChartResolvedAnnotationIntervalGroup[];
}

/**
 * Captured interval coverage with allocation-free inspection and cached frame projection.
 * {@docCategory LineChart}
 */
export interface LineChartAnnotationIntervalModel {
  /** Returns exact logical membership in input order; unsupported x values return an empty array. */
  getActiveKeys(x: number | Date): readonly string[];
  /**
   * Projects with the current plot. pointWidth must be finite and positive, in root SVG units,
   * and expands included point intersections after clipping. Visual expansion never changes logical membership.
   * Half-open empty source intervals and wholly collapsed half-open projections have no painted coverage.
   * Unchanged projectX identity, plot rectangle values, x family and pointWidth reuse the layout.
   */
  getLayout(plot: LineChartPlotContext, pointWidth: number): LineChartAnnotationIntervalLayout;
}
