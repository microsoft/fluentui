import { IStyle, ITheme } from '@fluentui/react/lib/Styling';
import { IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';
import { IMargins } from '../../types/index';

/**
 * {@docCategory TreeChart}
 */
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

/**
 * {@docCategory TreeChart}
 */
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

/**
 * {@docCategory TreeChart}
 */
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

/**
 * Tree Chart properties
 * {@docCategory TreeChart}
 */
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
   * Margins for the chart
   * @default `{ top: 30, bottom: 30, left: 50, right: 20 }`
   * To avoid edge cuttings to the chart, we recommend you use default values or greater then default values
   */
  margins?: IMargins;
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

/**
 * Tree Chart style properties
 * {@docCategory TreeChart}
 */
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

/**
 * Tree Chart styles
 * {@docCategory TreeChart}
 */
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
