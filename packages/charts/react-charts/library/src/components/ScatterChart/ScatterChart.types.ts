import type { RenderFunction } from '../../utilities/index';
import type {
  ChartProps,
  LineChartPoints,
  Margins,
  Basestate,
  RefArrayData,
  CustomizedCalloutData,
} from '../../types/index';
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
   * Render a custom callout for the hovered or focused data point. The input
   * contains the original x coordinate and one value matching the point's y
   * coordinate and series legend. Returning null hides the callout without
   * falling back to the default content.
   */
  onRenderCalloutPerDataPoint?: RenderFunction<CustomizedCalloutData>;

  /**
   * Render a custom callout for all points at the hovered or focused x coordinate.
   * Takes precedence over onRenderCalloutPerDataPoint when both are supplied.
   * Returning null hides the callout without invoking the point renderer or
   * falling back to the default content.
   */
  onRenderCalloutPerStack?: RenderFunction<CustomizedCalloutData>;

  /**
   * Callback for getting callout description message
   */
  getCalloutDescriptionMessage?: (calloutDataProps: CustomizedCalloutData) => string | undefined;

  /**
   * The prop used to define the culture to localized the numbers
   */
  culture?: string;
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
