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
export interface ScatterChartProps extends CartesianChartProps {
  /**
   * Data to render in the chart.
   */
  data: ChartProps;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: ScatterChartStyles;

  /**
   * Define a custom callout renderer for a data point
   */
  onRenderCalloutPerDataPoint?: RenderFunction<CustomizedCalloutData>;

  /**
   * Callback for getting callout description message
   */
  getCalloutDescriptionMessage?: (calloutDataProps: CustomizedCalloutData) => string | undefined;

  /**
   * The prop used to define the culture to localized the numbers
   */
  culture?: string;

  /**
   * The prop used to define the y axis labels tooltip visibility
   */
  showYAxisLablesTooltip?: boolean;
}

/**
 * Scatter Chart styles
 * {@docCategory ScatterChart}
 */
export interface ScatterChartStyles extends CartesianChartStyles {
  /**
   * Style for the marker label
   */
  markerLabel?: string;
}

/**
 * Scatter Chart style properties
 * {@docCategory ScatterChart}
 */
export interface ScatterChartStyleProps extends CartesianChartStyleProps {}
