import { ChartProps } from './index';
import { CartesianChartStyleProps } from '../CommonComponents/index';

export interface SparklineStyleProps extends CartesianChartStyleProps {}

/**
 * Sparkline properties
 * {@docCategory SparklineChart}
 */
export interface SparklineProps extends React.RefAttributes<HTMLDivElement> {
  /**
   * An array of chart data points for the Sparkline chart
   */
  data?: ChartProps;

  /**
   * Width of chart
   * * @default 80
   */
  width?: number;

  /**
   * Height of chart
   * @default 20
   */
  height?: number;

  /**
   * Width of value text
   * * @default 80
   */
  valueTextWidth?: number;

  /**
   * Additional CSS class(es) to apply to the SparklineChart.
   */
  className?: string;

  /**
   * The prop used to define the culture to localized the numbers
   */
  culture?: string;

  /**
   * Prop used to determine whether to show the legend or not
   */
  showLegend?: boolean;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: SparklineStyles;
}

/**
 * Sparkline styles
 * {@docCategory SparklineChart}
 */
export interface SparklineStyles {
  inlineBlock?: string;
  valueText?: string;
}
