import type { RenderFunction } from '../../utilities/index';
import type {
  ChartProps,
  LineChartPoints,
  Margins,
  Basestate,
  RefArrayData,
  CustomizedCalloutData,
  FocusRestorePolicy,
} from '../../types/index';
import type { EventAnnotation } from '../../types/EventAnnotation';
import type {
  CartesianChartProps,
  CartesianChartStyleProps,
  CartesianChartStyles,
  ChildProps,
} from '../CommonComponents/index';

export type { ChildProps, LineChartPoints, Margins, Basestate, RefArrayData };

/**
 * Line Chart properties
 * {@docCategory LineChart}
 */
export interface LineChartProps extends CartesianChartProps {
  /**
   * Data to render in the chart.
   */
  data: ChartProps;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: LineChartStyles;

  /**
   * Show event annotation
   */
  eventAnnotationProps?: EventsAnnotationProps;

  /**
   * Define a custom callout renderer for a data point.
   * Data updates refresh the payload without forcing an open custom callout to remount.
   * With isCalloutForStack=false, hovering supplies only the hovered point, even when legends or x-values repeat.
   */
  onRenderCalloutPerDataPoint?: RenderFunction<CustomizedCalloutData>;

  /**
   * Define a custom callout renderer for a stack; default is to render per data point.
   * Data updates refresh the payload without forcing an open custom callout to remount.
   */
  onRenderCalloutPerStack?: RenderFunction<CustomizedCalloutData>;

  /**
   * Callback for getting callout description message
   */
  getCalloutDescriptionMessage?: (calloutDataProps: CustomizedCalloutData) => string | undefined;

  /*
   * Color fill bars for the chart,
   */
  colorFillBars?: ColorFillBarsProps[];

  /**
   * if this is set to true, then for each line there will be a unique shape assigned to the point,
   * there are total 8 shapes which are as follow circle, square, triangele, diamond, pyramid,
   *  hexagon, pentagon and octagon, which will get assigned as respectively, if there are more
   * than 8 lines in the line chart then it will again start from cicle to octagon.
   * setting this flag to true will also change the behavior of the points, like for a
   * line, last point shape and first point shape will be visible all the times, and all
   * other points will get enlarge only when hovered over them
   * if set to false default shape will be circle, with the existing behavior
   * @default false
   */
  allowMultipleShapesForPoints?: boolean;

  /*
   * Optimize line chart rendering for large data set. If this prop is enabled, line chart
   * can easily render over 10K datapoints with multiple lines smoothly.
   * This rendering mechanism does not support gaps in lines.
   */
  optimizeLargeData?: boolean;

  /**
   * The prop used to define the culture to localized the numbers
   */
  culture?: string;

  /**
   * @default false
   * The prop used to enable the perf optimization
   */
  enablePerfOptimization?: boolean;

  /**
   * To enable callout for individual line or complete stack.
   * @default true
   * @type \{boolean \}
   */
  isCalloutForStack?: boolean;

  /**
   * Focus policy for data/color content changes. Defaults to 'preserve', which leaves
   * deliberate external focus alone. Use 'reset' to return focus from outside the chart,
   * or 'none' to disable automatic restoration. Changing this prop alone does not move focus.
   */
  focusRestorePolicy?: FocusRestorePolicy;

  /**
   * Point to focus on a data/color content change when focusRestorePolicy is 'reset'.
   * When omitted, resets use the previously focused point. 'preserve' always retains that point.
   * Indices are zero-based positions in the current data.lineChartData and its series' data array,
   * before legend filtering. Reordering data changes which series or point occupies a position.
   * Callback-only changes do not restore focus.
   * Missing, unplottable, and non-tabbable targets are skipped, leaving focus unchanged.
   * Simultaneous data and controlled legend updates use the updated legend selection.
   * Optimized mounting defers the reset until the chart's scales and elements are ready.
   * For path-rendered lines without markers, focus moves to the line and its callout shows this point.
   */
  focusOnReset?: {
    lineIndex: number;
    pointIndex: number;
  };
}

/**
 * {@docCategory LineChart}
 */
export interface EventsAnnotationProps {
  events: EventAnnotation[];
  strokeColor?: string;
  labelColor?: string;
  labelHeight?: number;
  labelWidth?: number;
  mergedLabel: (count: number) => string;
}

/**
 * Line Chart styles
 * {@docCategory LineChart}
 */
export interface LineChartStyles extends CartesianChartStyles {
  /**
   * styles for line border
   */
  lineBorder?: string;

  /**
   * styles for marker label
   */
  markerLabel?: string;
}

/**
 * Line Chart style properties
 * {@docCategory LineChart}
 */
export interface LineChartStyleProps extends CartesianChartStyleProps {}

/**
 * {@docCategory LineChart}
 */
export interface ColorFillBarsProps {
  legend: string;
  color: string;
  data: ColorFillBarData[];
  applyPattern?: boolean;
  onLegendClick?: (selectedLegend: string | string[] | null) => void | undefined;
}

/**
 * {@docCategory LineChart}
 */
export interface ColorFillBarData {
  startX: number | Date;
  endX: number | Date;
}
