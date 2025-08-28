/* eslint-disable @typescript-eslint/naming-convention */
import { RenderFunction } from '../../utilities/index';
import {
  ChartProps,
  LineChartPoints,
  Margins,
  Basestate,
  RefArrayData,
  CustomizedCalloutData,
} from '../../types/index';
import { EventAnnotation } from '../../types/EventAnnotation';
import {
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
   * Define a custom callout renderer for a data point
   */
  onRenderCalloutPerDataPoint?: RenderFunction<CustomizedCalloutData>;

  /**
   * Define a custom callout renderer for a stack; default is to render per data point
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
