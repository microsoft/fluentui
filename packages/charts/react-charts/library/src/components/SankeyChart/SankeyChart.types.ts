import { RefObject } from 'react';
import { ChartPopoverProps } from '../CommonComponents/ChartPopover.types';
import { Chart, ChartProps } from '../../types/DataPoint';

export type { ChartProps, DataPoint, SankeyChartData } from '../../types/DataPoint';

/**
 * Sankey Chart properties
 * {@docCategory SankeyChart}
 */
export interface SankeyChartProps {
  /**
   * Data to render in the chart.
   */
  data: ChartProps;

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
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: SankeyChartStyles;

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
  strings?: SankeyChartStrings;

  /**
   * Localized strings to use for the chart's accessibility features.
   */
  accessibility?: SankeyChartAccessibilityProps;

  /**
   * Format node and link values.
   */
  formatNumberOptions?: Intl.NumberFormatOptions;

  /**
   * Prop to disable shrinking of the chart beyond a certain limit and enable scrolling when the chart overflows
   * @deprecated Use `reflowProps` instead.
   */
  enableReflow?: boolean;

  /**
   * Optional callback to access the Chart interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: RefObject<Chart>;

  /**
   * props for the callout in the chart
   */
  calloutProps?: ChartPopoverProps;

  /**
   * The prop used to define the culture to localize the numbers and date
   */
  culture?: string;

  /**
   * Props related to reflow behavior of the chart
   */
  reflowProps?: {
    /**
     * Determines the reflow behavior of the chart.
     * When set to `'min-width'`, the chart will not shrink below a certain width and will enable scrolling if it overflows.
     * @default 'none'
     */
    mode: 'none' | 'min-width';
  };
}

/**
 * Sankey Chart styles
 * {@docCategory SankeyChart}
 */
export interface SankeyChartStyles {
  /**
   *  Style for the root element.
   */
  root?: string;

  /**
   *  Style for the nodes.
   */
  nodes?: string;

  /**
   *  Style for the links.
   */
  links?: string;

  /**
   *  Style for the text inside node.
   */
  nodeTextContainer?: string;

  /**
   *  Style for the tooltip ,when user hover over the truncated node detail.
   */
  toolTip?: string;

  /**
   * Styles for the chart wrapper div
   */
  chartWrapper?: string;

  /**
   * Styles for the chart svg element
   */
  chart?: string;
}

/**
 * Set of strings which are used when rendering the chart.
 */
export interface SankeyChartStrings {
  /**
   * A value similar to "from \{0\}" where \{0\} is the name of the source node for a link.
   * This is shown in the `ChartHoverCard` when the user hovers the mouse over a link.
   */
  linkFrom?: string;
}

/**
 * Set of strings which are used when rendering accessibility information within the chart.
 */
export interface SankeyChartAccessibilityProps {
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
