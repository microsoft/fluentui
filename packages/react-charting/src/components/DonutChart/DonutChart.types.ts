import { IStyle } from '@fluentui/react/lib/Styling';
import { IRenderFunction, IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';
import { ICartesianChartProps, ICartesianChartStyleProps } from '../CommonComponents/index';
import { ICalloutProps } from '@fluentui/react/lib/Callout';
import { IChartProps, IChartDataPoint } from './index';

export interface IDonutChart {}

/**
 * Donut Chart properties.
 * {@docCategory DonutChart}
 */
export interface IDonutChartProps extends ICartesianChartProps {
  /**
   * Data to render in the chart.
   */
  data?: IChartProps;

  /**
   * inner radius for donut size
   */
  innerRadius?: number;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IDonutChartStyleProps, IDonutChartStyles>;

  /**
   * props for inside donut value
   */
  valueInsideDonut?: string | number;

  /**
   * Define a custom callout renderer for a data point
   */
  onRenderCalloutPerDataPoint?: IRenderFunction<IChartDataPoint>;

  /**
   * props for the callout in the chart
   */
  calloutProps?: Partial<ICalloutProps>;

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
export interface IDonutChartStyleProps extends ICartesianChartStyleProps {}

/**
 * Donut Chart styles
 * {@docCategory DonutChart}
 */
export interface IDonutChartStyles {
  /**
   *  Style for the root element.
   */
  root?: IStyle;

  /**
   * Style for the chart.
   */
  chart?: IStyle;
  /**
   * Style for the legend container.
   */
  legendContainer: IStyle;
}
