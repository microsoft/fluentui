import { RenderFunction } from '../../utilities/index';
import {
  ChartProps,
  RefArrayData,
  Basestate,
  LineChartDataPoint,
  LineChartPoints,
  CustomizedCalloutData,
  Margins,
} from '../../types/index';
import {
  CartesianChartStyles,
  CartesianChartStyleProps,
  CartesianChartProps,
  ChildProps,
} from '../CommonComponents/CartesianChart.types';

export type { ChildProps, RefArrayData, Basestate, LineChartDataPoint, LineChartPoints, Margins };

/**
 * Area Chart properties.
 * {@docCategory AreaChart}
 */
export interface AreaChartProps extends CartesianChartProps {
  /**
   * Data to render in the chart.
   */
  data: ChartProps;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: CartesianChartStyles;

  /**
   * Define a custom callout renderer for a data point
   */
  onRenderCalloutPerDataPoint?: RenderFunction<CustomizedCalloutData>;

  /**
   * Define a custom callout renderer for a stack; default is to render per data point
   */
  onRenderCalloutPerStack?: RenderFunction<CustomizedCalloutData>;

  /**
   * The prop used to define the culture to localized the numbers
   */
  culture?: string;

  /**
   * @default false
   * The prop used to enable the perf optimization
   */
  enablePerfOptimization?: boolean;

  /*
   * Optimize area chart rendering for large data set.
   */
  optimizeLargeData?: boolean;

  /**
   * @default false
   * The prop used to enable gradient fill color for the chart.
   */
  enableGradient?: boolean;

  /**
   * @default tonexty
   * The prop used to define the Y axis mode (tonexty or tozeroy)
   */
  mode?: 'tozeroy' | 'tonexty';
}

/**
 * Area Chart styles
 * {@docCategory AreaChart}
 */
export interface AreaChartStyles extends CartesianChartStyles {}

/**
 * Area Chart style properties
 * {@docCategory AreaChart}
 */
export interface AreaChartStyleProps extends CartesianChartStyleProps {}
