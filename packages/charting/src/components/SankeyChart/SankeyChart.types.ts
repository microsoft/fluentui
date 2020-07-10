import { ITheme, IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';
import { IChartProps } from '../../types/IDataPoint';

export { IChartProps, IDataPoint, ISankeyChartData } from '../../types/IDataPoint';

export interface ISankeyChartProps {
  /**
   * Data to render in the chart.
   */
  data: IChartProps;

  /**
   * Width of the chart.
   */
  width?: number;

  /**
   * Height of the chart.
   */
  height?: number;

  /**
   * Additional CSS class(es) to apply to the SankeyChart.
   */
  className?: string;

  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<ISankeyChartStyleProps, ISankeyChartStyles>;

  /**
   * this prop takes its parent as a HTML element to define the width and height of the Sankey chart
   */
  parentRef?: HTMLElement | null;

  /**
   * should chart resize when parent resize.
   */
  shouldResize?: number;

  /**
   * Color for path
   */
  pathColor?: string;
}

export interface ISankeyChartStyleProps {
  theme: ITheme;
  className?: string;
  width: number;
  height: number;
  pathColor?: string;
}

export interface ISankeyChartStyles {
  /**
   *  Style for the root element.
   */
  root?: IStyle;

  /**
   *  Style for the nodes.
   */
  nodes?: IStyle;

  /**
   *  Style for the links.
   */
  links?: IStyle;
}
