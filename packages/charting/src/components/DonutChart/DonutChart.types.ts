import { IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IRenderFunction, IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';
import { ICartesianChartProps, ICartesianChartStyleProps } from '../CommonComponents/index';
import { ICalloutProps } from 'office-ui-fabric-react/lib/Callout';
import { IChartProps, IChartDataPoint } from './index';

export interface IDonutChart {}

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
}

export interface IDonutChartStyleProps extends ICartesianChartStyleProps {}

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
