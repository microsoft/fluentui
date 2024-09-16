import { IRenderFunction, IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';
import {
  IChartProps,
  IRefArrayData,
  IBasestate,
  ILineChartDataPoint,
  ILineChartPoints,
  ICustomizedCalloutData,
  IMargins,
} from '../../types/index';
import {
  ICartesianChartStyles,
  ICartesianChartStyleProps,
  ICartesianChartProps,
  IChildProps,
} from '../CommonComponents/CartesianChart.types';

export type { IChildProps, IRefArrayData, IBasestate, ILineChartDataPoint, ILineChartPoints, IMargins };

/**
 * Area Chart properties.
 * {@docCategory AreaChart}
 */
export interface IAreaChartProps extends ICartesianChartProps {
  /**
   * Data to render in the chart.
   */
  data: IChartProps;

  /**
   * This prop is used to draw Y axis grid lines on the chart. Default value will be false
   * @deprecated now lines are shown by default
   * no need to use this prop
   */
  showYAxisGridLines?: boolean;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<ICartesianChartStyleProps, ICartesianChartStyles>;

  /**
   * Define a custom callout renderer for a data point
   */
  onRenderCalloutPerDataPoint?: IRenderFunction<ICustomizedCalloutData>;

  /**
   * Define a custom callout renderer for a stack; default is to render per data point
   */
  onRenderCalloutPerStack?: IRenderFunction<ICustomizedCalloutData>;

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
}

/**
 * Area Chart styles
 * {@docCategory AreaChart}
 */
export interface IAreaChartStyles extends ICartesianChartStyles {}

/**
 * Area Chart style properties
 * {@docCategory AreaChart}
 */
export interface IAreaChartStyleProps extends ICartesianChartStyleProps {}
