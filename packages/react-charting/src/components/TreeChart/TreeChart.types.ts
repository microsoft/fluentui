import { IStyle, ITheme } from '@fluentui/react/lib/Styling';
import { IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';

export interface ITreeChartDataPoint {
  name: string;
  subname: string;
  metric?: string | undefined;
  fill: string;
  children?: Array<ITreeChartDataPoint>;
}

export enum NodesComposition {
  long = 1,
  compact = 0,
}

export enum TreeTraverse {
  preOrder = 1,
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
  composition?: NodesComposition.long | NodesComposition.compact | undefined;
  /**
   * traversal order for tree chart, preOrder = 1, levelOrder = 0
   */
  treeTraversal?: TreeTraverse.preOrder | TreeTraverse.levelOrder;
  /**
   * Width of SVG tree chart
   * * @default 1200
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
  _width: number;
  _height: number;
}

export interface ITreeDataStructure {
  id: number;
  children: unknown;
  dataName: string;
  subName: string;
  metricName?: string | undefined;
  fill: string;
  x: number;
  y: number;
  parentID: number;
}

export interface ITreeStyleProps {
  theme: ITheme;
  className?: string;
}
export interface ITreeStyles {
  link: IStyle;
  rectNode: IStyle;
  rectText: IStyle;
  rectSubText: IStyle;
  rectMetricText: IStyle;
}
