import { IStyle, ITheme } from '@fluentui/react/lib/Styling';
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

  /**
   * Localized strings to show in the UX.
   */
  strings?: ISankeyChartStrings;

  /**
   * Localized strings to use for the chart's accessibility features.
   */
  accessibility?: ISankeyChartAccessibilityProps;

  /**
   * Format node and link values.
   */
  formatNumberOptions?: Intl.NumberFormatOptions;

  /**
   * Prop to disable shrinking of the chart beyond a certain limit and enable scrolling when the chart overflows
   * @default true
   */
  enableReflow?: boolean;
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

  /**
   * Styles for the chart wrapper div
   */
  chartWrapper?: IStyle;
}

/**
 * Set of strings which are used when rendering the chart.
 */
export interface ISankeyChartStrings {
  /**
   * A value similar to "from \{0\}" where \{0\} is the name of the source node for a link.
   * This is shown in the `ChartHoverCard` when the user hovers the mouse over a link.
   */
  linkFrom?: string;
}

/**
 * Set of strings which are used when rendering accessibility information within the chart.
 */
export interface ISankeyChartAccessibilityProps {
  /**
   * Aria label for when the chart is empty.
   */
  emptyAriaLabel?: string;
  /**
   * A value similar to "node \{0\} with weight \{1\}".
   * \{0\} is the name of the node.
   * \{1\} is the weight of the node (as computed by the sankey layout engine via the links to or from this node).
   */
  nodeAriaLabel?: string;
  /**
   * A value similar to "link from \{0\} to $\{1\} with weight $\{2\}".
   * \{0\} is the source node, \{1\} is the target node, and \{2\} is the value of the link.
   */
  linkAriaLabel?: string;
}
