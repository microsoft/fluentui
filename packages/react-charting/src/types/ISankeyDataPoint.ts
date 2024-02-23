import { SankeyLink, SankeyNode } from 'd3-sankey';

/**
 * {@docCategory IChartProps}
 */
export interface IChartPropsSankey {
  /**
   * chart title for the chart
   */
  chartTitle?: string;
  /**
   * data for the points in the line chart
   */
  SankeyChartData?: ISankeyChartData;
}

/**
 * {@docCategory IChartData}
 */
export interface ISankeyChartData {
  nodes: SNode[];
  links: SLink[];
}

interface ISNodeExtra {
  /**
   * A unique identifier for this node.
   */
  nodeId: number | string;
  /**
   * The display name for this node in the UX.
   */
  name: string;
  color?: string;
  borderColor?: string;
  actualValue?: number;
  layer?: number;
}

interface ISLinkExtra {
  /**
   * The index within `ISankeyChartData.nodes` of the source node.
   */
  source: number;
  /**
   * The index within `ISankeyChartData.nodes` of the target node.
   */
  target: number;
  /**
   * The weight of this link between the two nodes.
   */
  value: number;
  unnormalizedValue?: number;
}

export type SNode = SankeyNode<ISNodeExtra, ISLinkExtra>;
export type SLink = SankeyLink<ISNodeExtra, ISLinkExtra>;
