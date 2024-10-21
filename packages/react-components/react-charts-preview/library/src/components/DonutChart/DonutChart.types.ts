import { CartesianChartProps, CartesianChartStyleProps } from '../CommonComponents/index';
import { ChartProps, ChartDataPoint } from './index';
import { ChartPopoverProps } from '../CommonComponents/ChartPopover.types';

/**
 * Donut Chart properties.
 * {@docCategory DonutChart}
 */
export interface DonutChartProps extends CartesianChartProps {
  /**
   * Data to render in the chart.
   */
  data?: ChartProps;

  /**
   * inner radius for donut size
   */
  innerRadius?: number;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: DonutChartStyles;

  /**
   * props for inside donut value
   */
  valueInsideDonut?: string | number;

  /**
   * Define a custom callout renderer for a data point
   */
  onRenderCalloutPerDataPoint?: (dataPointCalloutProps: ChartDataPoint) => JSX.Element | undefined;

  /**
   * Define a custom callout props override
   */
  customProps?: (dataPointCalloutProps: ChartDataPoint) => ChartPopoverProps;

  /**
   * props for the callout in the chart
   */
  calloutProps?: ChartPopoverProps;

  /**
   * The prop used to define the culture to localized the numbers
   */
  culture?: string;

  /**
   * Prop to show the arc labels in percentage format
   * @default false
   */
  showLabelsInPercent?: boolean;

  /**
   * Prop to hide the arc labels
   * @default true
   */
  hideLabels?: boolean;
}

/**
 * Donut Chart style properties
 * {@docCategory DonutChart}
 */
export interface DonutChartStyleProps extends CartesianChartStyleProps {}

/**
 * Donut Chart styles
 * {@docCategory DonutChart}
 */
export interface DonutChartStyles {
  /**
   *  Style for the root element.
   */
  root?: string;

  /**
   * Style for the chart.
   */
  chart?: string;
  /**
   * Style for the legend container.
   */
  legendContainer: string;

  /**
   * Styles for the chart wrapper div
   */
  chartWrapper?: string;
}
