import { IRenderFunction, IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';
import {
  IChartProps,
  ILineChartPoints,
  IMargins,
  IBasestate,
  IRefArrayData,
  ICustomizedCalloutData,
} from '../../types/index';
import { IEventAnnotation } from '../../types/IEventAnnotation';
import {
  ICartesianChartProps,
  ICartesianChartStyleProps,
  ICartesianChartStyles,
  IChildProps,
} from '../CommonComponents/index';

export type { IChildProps, ILineChartPoints, IMargins, IBasestate, IRefArrayData };

/**
 * Line Chart properties
 * {@docCategory LineChart}
 */
export interface ILineChartProps extends ICartesianChartProps {
  /**
   * Data to render in the chart.
   */
  data: IChartProps;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<ILineChartStyleProps, ILineChartStyles>;

  /**
   * Show event annotation
   */
  eventAnnotationProps?: IEventsAnnotationProps;

  /**
   * Define a custom callout renderer for a data point
   */
  onRenderCalloutPerDataPoint?: IRenderFunction<ICustomizedCalloutData>;

  /**
   * Define a custom callout renderer for a stack; default is to render per data point
   */
  onRenderCalloutPerStack?: IRenderFunction<ICustomizedCalloutData>;

  /**
   * Callback for getting callout description message
   */
  getCalloutDescriptionMessage?: (calloutDataProps: ICustomizedCalloutData) => string | undefined;

  /*
   * Color fill bars for the chart,
   */
  colorFillBars?: IColorFillBarsProps[];

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
}

/**
 * {@docCategory LineChart}
 */
export interface IEventsAnnotationProps {
  events: IEventAnnotation[];
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
export interface ILineChartStyles extends ICartesianChartStyles {}

/**
 * Line Chart style properties
 * {@docCategory LineChart}
 */
export interface ILineChartStyleProps extends ICartesianChartStyleProps {}

/**
 * {@docCategory LineChart}
 */
export interface IColorFillBarsProps {
  legend: string;
  color: string;
  data: IColorFillBarData[];
  applyPattern?: boolean;
  onLegendClick?: (selectedLegend: string | string[] | null) => void | undefined;
}

/**
 * {@docCategory LineChart}
 */
export interface IColorFillBarData {
  startX: number | Date;
  endX: number | Date;
}
