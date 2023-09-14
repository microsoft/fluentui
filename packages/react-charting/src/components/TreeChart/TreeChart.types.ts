import { IStyle, ITheme } from '@fluentui/react/lib/Styling';
import { IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';

export interface ITreeChartDataPoint {
  /**
   * Node main text
   */
  name: string;
  /**
   * Subtext value (optional)
   */
  subname?: string;
  /**
   * Bodytext value (optional)
   */
  bodytext?: string;
  /**
   * Metric text value (optional)
   */
  metric?: string;
  /**
   * Color of the rectangular box
   */
  fill: string;
  /**
   * Recursive datastructure for child node object
   */
  children?: Array<ITreeChartDataPoint>;
}

export enum NodesComposition {
  /**
   * NodeComposition enum val for long: number = 1
   */
  long = 1,
  /**
   * NodeComposition enum val for compact: number = 0
   */
  compact = 0,
}

export enum TreeTraverse {
  /**
   * TreeTraverse enum val for preOrder: number = 1
   */
  preOrder = 1,
  /**
   * TreeTraverse enum val for levelOrder: number = 0
   */
  levelOrder = 0,
}

export interface ITreeProps {
  /**
   * An object of chart data points for the Tree chart
   */
  treeData: ITreeChartDataPoint;
  /**
   * compostion for three layer chart, long: composition = 1; compact: composition = 0
   */
  composition?: NodesComposition.long | NodesComposition.compact;
  /**
   * Node Width Size for the Tree Layout
   * * @default 75
   */
  layoutWidth?: number;
  /**
   * traversal order for tree chart, preOrder = 1, levelOrder = 0
   */
  treeTraversal?: TreeTraverse.preOrder | TreeTraverse.levelOrder;
  /**
   * Width of SVG tree chart
   * * @default 1500
   */
  width?: number;
  /**
   * Height of SVG tree chart
   * * @default 700
   */
  height?: number;
  /**
   * Margin for the SVG tree chart
   */
  marign?: { left: number; right: number; top: number; bottom: number };
  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<ITreeStyleProps, ITreeStyles>;
  /**
   * Additional CSS class(es) to apply to the TreeChart.
   */
  className?: string;
  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;
}
export interface ITreeState {
  /**
   * Width of SVG tree chart
   * * @default 1500
   */
  _width: number;
  /**
   * Height of SVG tree chart
   * * @default 700
   */
  _height: number;
  /**
   * Layout Width of SVG tree chart
   * * @default 75
   */
  _layoutWidth?: number;
}

export interface ITreeDataStructure {
  /**
   * Node id of each node
   */
  id: number;
  /**
   * Children node object
   */
  children: Array<ITreeDataStructure>;
  /**
   * Node main text
   */
  dataName: string;
  /**
   * Subtext value (optional)
   */
  subName?: string;
  /**
   * Bodytext value (optional)
   */
  bodyText?: string;
  /**
   * Metric text value (optional)
   */
  metricName?: string;
  /**
   * Color of the rectangular box
   */
  fill: string;
  /**
   * X-coordindate of node
   */
  x: number;
  /**
   * Y-coordindate of node
   */
  y: number;
  /**
   * Node id of each node's parent
   */
  parentID: number;
}

export interface ITreeStyleProps {
  /**
   * Theme (provided through customization.)
   */
  theme: ITheme;
  /**
   * Additional CSS class(es) to apply to the TreeChart.
   */
  className?: string;
}
export interface ITreeStyles {
  /**
   *  Style for the root element.
   */
  root: IStyle;
  /**
   *  Style for the Link/Path element.
   */
  link: IStyle;
  /**
   *  Style for rectangular Node
   */
  rectNode: IStyle;
  /**
   *  Style for the node main Text
   */
  rectText: IStyle;
  /**
   *  Style for the node sub Text
   */
  rectSubText: IStyle;
  /**
   *  Style for the node body Text
   */
  rectBodyText: IStyle;
  /**
   *  Style for the node metric value Text
   */
  rectMetricText: IStyle;
}
