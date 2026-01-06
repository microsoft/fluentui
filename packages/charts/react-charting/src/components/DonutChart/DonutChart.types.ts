import { IStyle } from '@fluentui/react/lib/Styling';
import { IRefObject, IRenderFunction, IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';
import { ICartesianChartProps, ICartesianChartStyleProps } from '../CommonComponents/index';
import { ICalloutProps } from '@fluentui/react/lib/Callout';
import { IChartProps, IChartDataPoint, IChart } from './index';

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

  /**
   * Prop to enable the gradient in the chart
   * @default false
   */
  enableGradient?: boolean;

  /**
   * Prop to enable the round corners in the chart
   * @default false
   */
  roundCorners?: boolean;

  /**
   * Optional callback to access the IChart interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IChart>;

  /**
   * Rendering order of the legend
   * @default 'default'
   * 'default' - as per data provided
   * 'sorted' - in descending order of value
   */
  order?: 'default' | 'sorted';
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

  /**
   * styles for axis annotation
   */
  axisAnnotation?: IStyle;

  /**
   * Styles for the chart wrapper div
   */
  chartWrapper?: IStyle;
}
