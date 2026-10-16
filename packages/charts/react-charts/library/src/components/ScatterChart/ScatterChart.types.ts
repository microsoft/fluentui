import type { RenderFunction } from '../../utilities/index';
import type { JSXElement } from '@fluentui/react-utilities';
import type {
  ChartProps,
  LineChartPoints,
  Margins,
  Basestate,
  RefArrayData,
  CustomizedCalloutData,
  ScatterChartDataPoint,
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
   * Render a custom callout with all values at the hovered or focused x coordinate.
   * Returning null falls back to the default content, preserving the legacy behavior.
   */
  onRenderCalloutPerDataPoint?: RenderFunction<CustomizedCalloutData>;

  /**
   * Render a custom callout for all points at the hovered or focused x coordinate.
   * Takes precedence over onRenderCalloutPerDataPoint when both are supplied.
   * Returning null falls back to the default content without invoking
   * onRenderCalloutPerDataPoint.
   */
  onRenderCalloutPerStack?: RenderFunction<CustomizedCalloutData>;

  /**
   * Render a custom callout for the original hovered or focused data point.
   * Takes precedence over the legacy all-values renderers. Returning null hides
   * the callout; returning undefined falls back to the default content.
   */
  onRenderCalloutPerPoint?: (point?: ScatterChartDataPoint) => JSXElement | null | undefined;

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
