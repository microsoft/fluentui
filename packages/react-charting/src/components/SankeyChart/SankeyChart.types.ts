import { ITheme, IStyle } from '@fluentui/react/lib/Styling';
import { IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';
import { IChartProps } from '../../types/IDataPoint';

export type { IChartProps, IDataPoint, ISankeyChartData } from '../../types/IDataPoint';

/**
 * Sankey Chart properties
 * {@docCategory SankeyChart}
 */
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

  /**
   * Colors for nodes
   */
  colorsForNodes?: string[];

  /**
   * Colors for nodes border
   */
  borderColorsForNodes?: string[];
}

/**
 * Sankey Chart style properties
 * {@docCategory SankeyChart}
 */
export interface ISankeyChartStyleProps {
  theme: ITheme;
  className?: string;
  width: number;
  height: number;
  pathColor?: string;
}

/**
 * Sankey Chart styles
 * {@docCategory SankeyChart}
 */
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

  /**
   *  Style for the text inside node.
   */
  nodeTextContainer?: IStyle;

  /**
   *  Style for the tooltip ,when user hover over the truncated node detail.
   */
  toolTip?: IStyle;

  /**
   *  Style for the tooltip ,when user hover over the truncated node detail.
   */

  calloutContentRoot?: IStyle;
}
