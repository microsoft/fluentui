import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';
import { Callout, DirectionalHint } from '@fluentui/react/lib/Callout';
import { IProcessedStyleSet, ITheme } from '@fluentui/react/lib/Styling';
import {
  IStyleFunctionOrObject,
  classNamesFunction,
  format,
  getId,
  getRTL,
  memoizeFunction,
} from '@fluentui/react/lib/Utilities';
import { sum as d3Sum } from 'd3-array';
import { SankeyGraph, SankeyLayout, sankey as d3Sankey, sankeyJustify, sankeyRight } from 'd3-sankey';
import { BaseType, Selection as D3Selection, select, selectAll } from 'd3-selection';
import { area as d3Area, curveBumpX as d3CurveBasis } from 'd3-shape';
import * as React from 'react';
import { IBasestate, SLink, SNode } from '../../types/IDataPoint';
import { ChartHoverCard } from '../../utilities/ChartHoverCard/ChartHoverCard';
import { IChartHoverCardProps } from '../../utilities/ChartHoverCard/ChartHoverCard.types';
import { IMargins } from '../../utilities/utilities';
import {
  ISankeyChartAccessibilityProps,
  ISankeyChartData,
  ISankeyChartProps,
  ISankeyChartStrings,
  ISankeyChartStyleProps,
  ISankeyChartStyles,
} from './SankeyChart.types';

const getClassNames = classNamesFunction<ISankeyChartStyleProps, ISankeyChartStyles>();
const PADDING_PERCENTAGE = 0.3;

type NodeId = number | string;
type ItemValues<T> = { [key: NodeId]: T };
type NodeValues = ItemValues<number>;
type LinkItemValues<T> = { [key: NodeId]: ItemValues<T> };
type LinkValues = LinkItemValues<number>;

type NodesInColumns = { [key: number]: SNode[] };
type NormalizedData = ISankeyChartData & {
  width: number;
  height: number;
};

type NormalizeDiagramFunction = (
  data: ISankeyChartData,
  containerWidth: number,
  containerHeight: number,
  colorsForNodes: string[] | undefined,
  borderColorsForNodes: string[] | undefined,
) => NormalizedData;

type NodeColors = { fillColor: string; borderColor: string };
type SankeyLayoutGenerator = SankeyLayout<SankeyGraph<{}, {}>, {}, {}>;

export interface ISankeyChartState extends IBasestate, IChartHoverCardProps {
  containerWidth: number;
  containerHeight: number;
  selectedState: boolean;
  selectedLinks: Set<Number>;
  selectedNodes: Set<Number>;
  selectedNode?: SNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refSelected?: any;
  selectedLink?: SLink;
  shouldOverflow: boolean;
}

const NON_SELECTED_NODE_AND_STREAM_COLOR: string = '#757575';
const DEFAULT_NODE_COLORS: NodeColors[] = [
  { fillColor: '#00758F', borderColor: '#002E39' },
  { fillColor: '#77004D', borderColor: '#43002C' },
  { fillColor: '#4F6BED', borderColor: '#3B52B4' },
  { fillColor: '#937600', borderColor: '#6D5700' },
  { fillColor: '#286EA8', borderColor: '#00457E' },
  { fillColor: '#A43FB1', borderColor: '#7C158A' },
  { fillColor: '#CC3595', borderColor: '#7F215D' },
  { fillColor: '#0E7878', borderColor: '#004E4E' },
  { fillColor: '#8764B8', borderColor: '#4B3867' },
  { fillColor: '#9C663F', borderColor: '#6D4123' },
];

const MIN_HEIGHT_FOR_DOUBLINE_TYPE = 36;
const MIN_HEIGHT_FOR_TYPE = 24;
const REST_STREAM_OPACITY: number = 1;
const NON_SELECTED_OPACITY: number = 1;
const SELECTED_STREAM_OPACITY: number = 0.3;
const NON_SELECTED_STREAM_BORDER_OPACITY: number = 0.5;
const DEFAULT_TEXT_COLOR: string = '#323130';
const NON_SELECTED_TEXT_COLOR: string = '#FFFFFF';
const NODE_WIDTH = 124;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getSelectedNodes(selectedLinks: Set<SLink>): any[] {
  const nodes: SNode[] = [];
  selectedLinks.forEach(link => {
    nodes.push(link.target as SNode);

    if (nodes.indexOf(link.source as SNode) === -1) {
      nodes.push(link.source as SNode);
    }
  });
  return nodes;
}

function getSelectedLinks(singleNode: SNode): Set<SLink> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-array-constructor
  const q: any = new Array<any>();
  const finalLinks: Set<SLink> = new Set<SLink>();

  singleNode.sourceLinks!.forEach((link: SLink) => {
    q.push(link);
    finalLinks.add(link);
  });

  while (q.length > 0) {
    const poppedLink: SLink = q.shift();
    const node: SNode = poppedLink.target as SNode;
    if (node && node.sourceLinks) {
      node.sourceLinks.forEach((link: SLink) => {
        finalLinks.add(link);
        q.push(link);
      });
    }
  }

  if (singleNode.targetLinks) {
    singleNode.targetLinks.forEach((link: SLink) => {
      q.push(link);
      finalLinks.add(link);
    });
  }

  while (q.length > 0) {
    const poppedLink: SLink = q.shift();
    const node: SNode = poppedLink.source as SNode;
    if (node && node.targetLinks) {
      node.targetLinks.forEach((link: SLink) => {
        finalLinks.add(link);
        q.push(link);
      });
    }
  }

  return finalLinks;
}

function getSelectedLinksforStreamHover(singleLink: SLink): {
  selectedLinks: Set<SLink>;
  selectedNodes: Set<SNode>;
} {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-array-constructor
  const q: any = new Array<any>();
  const finalLinks: Set<SLink> = new Set<SLink>();
  const finalNodes: Set<SNode> = new Set<SNode>();

  q.push(singleLink.source);
  finalLinks.add(singleLink);
  while (q.length > 0) {
    const poppedNode: SNode = q.shift();
    finalNodes.add(poppedNode);
    if (poppedNode.targetLinks && poppedNode.targetLinks.length > 0) {
      poppedNode.targetLinks.forEach((link: SLink) => {
        q.push(link.source);
        finalLinks.add(link);
      });
    }
  }

  q.push(singleLink.target);

  while (q.length > 0) {
    const poppedNode: SNode = q.shift();
    finalNodes.add(poppedNode);
    if (poppedNode.sourceLinks && poppedNode.sourceLinks.length > 0) {
      poppedNode.sourceLinks.forEach((link: SLink) => {
        q.push(link.target);
        finalLinks.add(link);
      });
    }
  }

  return {
    selectedLinks: finalLinks,
    selectedNodes: finalNodes,
  };
}

/**
 * This is used to group nodes by column index.
 */
// This is exported for unit tests.
export function groupNodesByColumn(graph: ISankeyChartData) {
  const nodesInColumn: NodesInColumns = {};
  graph.nodes.forEach((node: SNode) => {
    const columnId = node.layer!;
    if (nodesInColumn[columnId]) {
      nodesInColumn[columnId].push(node);
    } else {
      nodesInColumn[columnId] = [node];
    }
  });
  return nodesInColumn;
}

/**
 * This is used to normalize the nodes value whose value is less than 1% of the total column value.
 */
function adjustOnePercentHeightNodes(
  nodesInColumn: NodesInColumns,
  computedNodes: NodeValues,
  originalLinks: LinkValues,
): void {
  const totalColumnValue = Object.values(nodesInColumn).map((column: SNode[]) => {
    return d3Sum(column, (node: SNode) => node.value);
  });
  totalColumnValue.forEach((columnValue: number, index: number) => {
    let totalPercentage = 0;
    const onePercent = 0.01 * columnValue;
    const columnNodes = nodesInColumn[index];
    columnNodes.forEach((node: SNode) => {
      const value = computedNodes[node.nodeId];
      const nodePercentage = (value / columnValue) * 100;
      node.actualValue = value;
      //if the value is less than 1% then we are making it as 1% of total .
      if (nodePercentage < 1) {
        node.value = onePercent;
        totalPercentage = totalPercentage + 1;
      } else {
        totalPercentage = totalPercentage + nodePercentage;
      }
    });
    //since we have adjusted the value to be 1% but we need to keep the sum of the percentage value under 100.
    const scalingRatio = totalPercentage !== 0 ? totalPercentage / 100 : 1;
    if (scalingRatio > 1) {
      // Loop through each node in that column and scale that node--and its incoming and outgoing links--by the
      // scaling ratio. We need the sankey diagram to re-layout the nodes and links after we do this.
      columnNodes.forEach((node: SNode) => {
        const normalized = (node.value = node.value! / scalingRatio);
        // Which Original Value? and Which Normalized Value is needed, here? The Node? The Link? Both?
        changeColumnValue(node, computedNodes[node.nodeId], normalized, originalLinks);
      });
    }
  });
}

/**
 * This is used for normalizing each link's value to reflect the normalized node value.
 */
function changeColumnValue(
  node: SNode,
  originalNodeValue: number,
  normalizedNodeValue: number,
  linkValues: LinkValues,
) {
  // For each link in the source and target, compute the proportion that this link contributes to the total
  // then adjust the link's value to reflect its proportion of the normalized node value.
  const updateLinkValue = (link: SLink) => {
    const value = linkValue(linkValues, link);
    link.unnormalizedValue = value;
    const linkRatio = value / originalNodeValue;
    link.value = Math.max(normalizedNodeValue * linkRatio, link.value);
  };
  node.sourceLinks!.forEach(updateLinkValue);
  node.targetLinks!.forEach(updateLinkValue);
}

/**
 * This is used for calculating the node non normalized value based on link non normalized value.
 * The links have the original weights. Computed nodes have the total weight of all incoming and outgoing links.
 */
function populateNodeActualValue(data: ISankeyChartData, computedNodes: NodeValues, originalLinks: LinkValues) {
  data.links.forEach((link: SLink) => {
    if (!link.unnormalizedValue) {
      link.unnormalizedValue = linkValue(originalLinks, link);
    }
  });
  data.nodes.forEach((node: SNode) => {
    node.actualValue = computedNodes[node.nodeId as NodeId];
  });
}

/**
 * This is used to introduce dynamic padding for cases where the number of nodes in a column is huge
 * so that we maintain a node to space ratio for such columns as if we fail to do so the
 * chart is devoid of nodes and only shows links.
 */
// This is exported for unit tests
export function adjustPadding(sankey: SankeyLayoutGenerator, height: number, nodesInColumn: NodesInColumns): void {
  let padding = sankey.nodePadding();
  const minPadding = PADDING_PERCENTAGE * height;
  Object.values(nodesInColumn).forEach((column: SNode[]) => {
    const totalPaddingInColumn = height - d3Sum(column, (node: SNode) => node.y1! - node.y0!);
    if (minPadding < totalPaddingInColumn) {
      // Here we are calculating the min of default and calculated padding, we will not increase the padding
      // in any scenario.
      padding = Math.min(padding, minPadding / (column.length - 1));
    }
  });
  sankey.nodePadding(padding);
}

function idFromNumberOrSNode(node: SNode | number): NodeId {
  if (typeof node === 'number') {
    return node;
  }
  return node.nodeId as NodeId;
}

/**
 * Duplicates the supplied chart data so that we do not alter the original.
 * @param data The data to duplicate.
 * @returns The duplicated data.
 */
function duplicateData(data: ISankeyChartData): ISankeyChartData {
  return {
    nodes: data.nodes.map(
      (node: SNode): SNode => ({
        ...node,
      }),
    ),
    links: data.links.map(
      (link: SLink): SLink => ({
        ...link,
      }),
    ),
  };
}

function valuesOfNodes(nodes: SNode[]): NodeValues {
  const result: NodeValues = {};
  nodes.forEach((node: SNode) => {
    result[node.nodeId as NodeId] = node.value!;
  });
  return result;
}

function valuesOfLinks(links: SLink[]): LinkValues {
  const result: LinkValues = {};
  links.forEach((link: SLink) => {
    const sourceId = idFromNumberOrSNode(link.source);
    let sourceToTarget = result[sourceId];
    if (!sourceToTarget) {
      sourceToTarget = {};
      result[sourceId] = sourceToTarget;
    }
    sourceToTarget[idFromNumberOrSNode(link.target)] = link.value;
  });
  return result;
}

function linkValue<T>(originalLinks: LinkItemValues<T>, link: SLink): T {
  return originalLinks[idFromNumberOrSNode(link.source)][idFromNumberOrSNode(link.target)];
}

// This is exported for unit tests.
export function preRenderLayout(
  margins: IMargins,
  containerWidth: number,
  containerHeight: number,
  isRtl: boolean,
): { sankey: SankeyLayoutGenerator; height: number; width: number } {
  const { left, right, top, bottom } = margins;
  const width = containerWidth - right!;
  const height = containerHeight - bottom! > 0 ? containerHeight - bottom! : 0;

  const sankey = d3Sankey()
    .nodeWidth(NODE_WIDTH)
    .extent([
      [left!, top!],
      [width - 1, height - 6],
    ])
    .nodeAlign(isRtl ? sankeyRight : sankeyJustify);

  return { sankey, height, width };
}

const elipsis = '...';

/**
 * This is used to assign node fillcolors and borderColor cyclically when the user doesnt
 * provide color to  individual node.
 */
function assignNodeColors(
  nodes: SNode[],
  colorsForNodes: string[] | undefined,
  borderColorsForNodes: string[] | undefined,
) {
  let colors: string[];
  let borders: string[];
  if (colorsForNodes && borderColorsForNodes) {
    colors = colorsForNodes;
    borders = borderColorsForNodes;
  } else {
    colors = DEFAULT_NODE_COLORS.map(color => color.fillColor);
    borders = DEFAULT_NODE_COLORS.map(color => color.borderColor);
  }
  let currentIndex = 0;
  nodes.forEach((node: SNode) => {
    if (!node.color && !node.borderColor) {
      node.color = colors[currentIndex];
      node.borderColor = borders[currentIndex];
    } else if (node.color && !node.borderColor) {
      node.borderColor = '#757575';
    } else if (node.borderColor && !node.color) {
      node.color = '#F5F5F5';
    }
    currentIndex = (currentIndex + 1) % colors.length;
  });
}

/**
 * Takes in the display name for the node and potentially returns a trimmed version of the name.
 * @param tspan the `tspan` element to use for text visual length measurement
 * @param text is the text which we will potentially truncate
 * @param rectangleWidth is the width of the rectangle which will contain the text
 * @param padding is the space we need to leave between the rect lines and other text
 * @returns the name to show on the node which might be the truncated `text` if the `text` is too long
 */
function truncateText(tspan: TSpanForTextMeasuring, text: string, rectangleWidth: number, padding: number) {
  // NOTE: This method is the most-expensive in terms of rerendering components.
  const textLengthForNodeName = rectangleWidth - padding; // This can likely be computed once and passed in.
  // The following `select` statement injects a `tempText` element into the DOM. This injection
  // (and subsequent removal) is causing a layout recalculation. This is a performance issue.
  // Note that this code will always inject a `tempText` element, but doesn't always remove it. This is a bug.
  if (fitsWithinNode(tspan, text, textLengthForNodeName)) {
    return text;
  }
  // Computing the size of elipsis is performed with each node. This should be computed once and used everywhere.
  // TODO: Compute the size of the elipsis once and use it everywhere.
  const elipsisLength = computeElipsisLength(tspan);
  let line: string = '';
  // Calculate how much of the original text to show.
  // TODO: The folllowing is O(n). We could use a binary search to make this faster: O(log(n)).
  for (let i = 0; i < text.length; i++) {
    line += text[i];
    tspan.text(line);
    const currentNode = tspan.node();
    if (currentNode !== null) {
      const w = currentNode!.getComputedTextLength();
      if (w >= textLengthForNodeName - elipsisLength) {
        line = line.slice(0, -1);
        line += elipsis;
        break;
      }
    }
  }
  tspan.text(null);
  return line;
}

type RenderedNodeAttributes = {
  readonly reactId: string;
  readonly gElementId: string;
  readonly name: string;
  readonly aria: string;
  readonly trimmed: boolean;
  readonly height: number;
  readonly weightOffset: number;
};

type RenderedLinkAttributes = {
  readonly reactId: string;
  readonly aria: string;
  readonly from: string;
};

type TSpanForTextMeasuring = D3Selection<SVGTSpanElement, unknown, HTMLElement, unknown>;

function fitsWithinNode(tspan: TSpanForTextMeasuring, text: string, textLengthForNodeName: number): boolean {
  const measurement = measureText(tspan, text);
  if (measurement === undefined) {
    return false;
  }
  return measurement <= textLengthForNodeName;
}

function measureText(tspan: TSpanForTextMeasuring, text: string | number): number | undefined {
  try {
    tspan.text(text);
    return tspan.node()?.getComputedTextLength();
  } finally {
    tspan.text(null);
  }
}

function computeElipsisLength(tspan: TSpanForTextMeasuring): number {
  const measurement = measureText(tspan, elipsis);
  return measurement === undefined ? 0 : measurement;
}

function computeLinkAttributes(
  links: SLink[],
  linkFrom: (node: SNode) => string,
  linkAriaLabel: (link: SLink) => string,
): LinkItemValues<RenderedLinkAttributes> {
  const result: LinkItemValues<RenderedLinkAttributes> = {};
  links.forEach((link: SLink) => {
    const sourceId = idFromNumberOrSNode(link.source);
    let sourceToTarget = result[sourceId];
    if (!sourceToTarget) {
      sourceToTarget = {};
      result[sourceId] = sourceToTarget;
    }
    sourceToTarget[idFromNumberOrSNode(link.target)] = {
      reactId: getId('link'),
      from: linkFrom(link.source as SNode),
      aria: linkAriaLabel(link),
    };
  });

  return result;
}

type ItemPositions = {
  readonly x0: number;
  readonly y0: number;
  readonly x1: number;
  readonly y1: number;
};

type SankeyLinkWithPositions = ItemPositions & {
  readonly source: ItemPositions;
  readonly target: ItemPositions;
  readonly width: number;
};

type AreaDataPoint = {
  readonly x: number;
  readonly y0: number;
  readonly y1: number;
};

const linkToDataPoints = (d: SankeyLinkWithPositions): [AreaDataPoint, AreaDataPoint] => {
  const halfWidth = d.width * 0.5;
  const y0 = d.y0;
  const y1 = d.y1;
  return [
    { x: d.source.x1, y0: y0 + halfWidth, y1: y0 - halfWidth },
    { x: d.target.x0, y0: y1 + halfWidth, y1: y1 - halfWidth },
  ];
};

const linkArea = d3Area<AreaDataPoint>()
  .x((p: AreaDataPoint) => p.x)
  .y0((p: AreaDataPoint) => p.y0)
  .y1((p: AreaDataPoint) => p.y1)
  .curve(d3CurveBasis);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TooltipDiv = D3Selection<BaseType, unknown, HTMLElement, any>;

function nodeTextColor(state: Readonly<ISankeyChartState>, singleNode: SNode): string {
  return !(
    !state.selectedState ||
    (state.selectedNodes.has(singleNode.index!) && state.selectedNode) ||
    !state.selectedNode
  )
    ? DEFAULT_TEXT_COLOR
    : NON_SELECTED_TEXT_COLOR;
}

type StringRenderer = {
  linkFrom: (node: SNode) => string;
};

type AccessibilityRenderer = {
  emptyAriaLabel: string;
  nodeAriaLabel: (node: SNode, weight: number) => string;
  linkAriaLabel: (link: SLink) => string;
};

// NOTE: To start employing React.useMemo properly, we need to convert this code from a React.Component
// to a function component. This will require a significant refactor of the code in this file.
// https://stackoverflow.com/questions/60223362/fast-way-to-convert-react-class-component-to-functional-component
// I am concerned that doing so would break this contract, making it difficult for consuming code.
export class SankeyChartBase extends React.Component<ISankeyChartProps, ISankeyChartState> {
  public static defaultProps: Partial<ISankeyChartProps> = {
    enableReflow: true,
  };

  private chartContainer: HTMLDivElement;
  private _reqID: number;
  private readonly _calloutId: string;
  private readonly _linkId: string;
  private readonly _chartId: string;
  private readonly _emptyChartId: string;
  private readonly _labelTooltipId: string;
  private readonly _margins: IMargins;
  private readonly _isRtl: boolean = getRTL();
  private _numColumns: number = 0;

  private readonly _computeClassNamesProps: (
    theme: ITheme,
    pathColor: string,
    className: string,
    containerWidth: number,
    containerHeight: number,
  ) => ISankeyChartStyleProps;
  private readonly _computeClassNames: (
    styles: IStyleFunctionOrObject<ISankeyChartStyleProps, ISankeyChartStyles>,
    classNamesProps: ISankeyChartStyleProps,
  ) => IProcessedStyleSet<ISankeyChartStyles>;
  private readonly _normalizeData: NormalizeDiagramFunction;
  private readonly _fetchTooltip: (classNames: IProcessedStyleSet<ISankeyChartStyles>) => TooltipDiv;
  private readonly _nodeAttributes: (
    nodes: SNode[],
    nodeAriaLabel: (node: SNode, weight: number) => string,
  ) => ItemValues<RenderedNodeAttributes>;
  private readonly _linkAttributes: (
    links: SLink[],
    linkFrom: (node: SNode) => string,
    linkAriaLabel: (link: SLink) => string,
  ) => LinkItemValues<RenderedLinkAttributes>;
  private readonly _fetchNodes: (
    classNames: IProcessedStyleSet<ISankeyChartStyles>,
    nodes: SNode[],
    nodeAttributes: ItemValues<RenderedNodeAttributes>,
    tooltipDiv: TooltipDiv,
  ) => React.ReactNode[] | undefined;
  private readonly _fetchLinks: (
    links: SLink[],
    linkAttributes: LinkItemValues<RenderedLinkAttributes>,
  ) => React.ReactNode[] | undefined;

  private readonly _strings: StringRenderer;
  private readonly _accessibility: AccessibilityRenderer;

  constructor(props: ISankeyChartProps) {
    super(props);
    this.state = {
      containerHeight: 468,
      containerWidth: 912,
      selectedState: false,
      selectedLinks: new Set<number>(),
      selectedNodes: new Set<number>(),
      shouldOverflow: false,
      isCalloutVisible: false,
    };
    this._calloutId = getId('callout');
    this._linkId = getId('link');
    this._chartId = getId('sankeyChart');
    this._emptyChartId = getId('_SankeyChart_empty');
    this._labelTooltipId = getId('tooltip');
    this._margins = { top: 36, right: 48, bottom: 32, left: 48 };
    // We memo-ize creation so that we only create a new object when any of the fields change.
    this._computeClassNamesProps = memoizeFunction(
      (
        theme: ITheme,
        pathColor: string,
        className: string,
        containerWidth: number,
        containerHeight: number,
      ): ISankeyChartStyleProps => ({
        theme: theme!,
        width: containerWidth,
        height: containerHeight,
        pathColor,
        className,
      }),
    );
    // `getClassNames` is memoized underneath, so it only recomputes when the `styles` or `classNamesProps` change.
    // We memoize `classNamesProps` so that we only create new class names when absolutely necessary,
    // and so that we can memoize the `_createNodes` method.
    this._computeClassNames = memoizeFunction(
      (
        styles: IStyleFunctionOrObject<ISankeyChartStyleProps, ISankeyChartStyles>,
        classNamesProps: ISankeyChartStyleProps,
      ) => getClassNames(styles, classNamesProps),
    );
    this._normalizeData = memoizeFunction(
      (
        data: ISankeyChartData,
        containerWidth: number,
        containerHeight: number,
        colorsForNodes: string[] | undefined,
        borderColorsForNodes: string[] | undefined,
      ) => this._normalizeSankeyData(data, containerWidth, containerHeight, colorsForNodes, borderColorsForNodes),
    );
    this._fetchTooltip = memoizeFunction((classNames: IProcessedStyleSet<ISankeyChartStyles>) =>
      this._labelTooltipDiv(classNames),
    );
    // Prepare the localization utilities
    this._strings = memoizeFunction((strings?: ISankeyChartStrings): StringRenderer => {
      const fromString = strings?.linkFrom || 'From {0}';
      // NOTE: The `node` parameter is the sankey-generated node on the link, and not the original `node` supplied
      // by the caller.
      return {
        linkFrom: (node: SNode) => format(fromString, node.name),
      };
    })(props.strings);
    this._accessibility = memoizeFunction((accessibility?: ISankeyChartAccessibilityProps): AccessibilityRenderer => {
      const linkString = accessibility?.linkAriaLabel || 'link from {0} to {1} with weight {2}';
      const nodeString = accessibility?.nodeAriaLabel || 'node {0} with weight {1}';
      return {
        emptyAriaLabel: accessibility?.emptyAriaLabel || 'Graph has no data to display',
        linkAriaLabel: (link: SLink) =>
          format(
            linkString,
            (link.source as SNode).name,
            (link.target as SNode).name,
            link.unnormalizedValue ? this._formatNumber(link.unnormalizedValue) : link.unnormalizedValue,
          ),
        nodeAriaLabel: (node: SNode, weight: number) => format(nodeString, node.name, this._formatNumber(weight)),
      };
    })(props.accessibility);
    // NOTE: Memoizing the `_createNodes` and `_createLinks` methods would break the hoverability of the chart
    // because the nodes are currently created differently based on the layout information. Hence why we do not
    // memoize these methods (but have stubs for memoizing as the `_fetchNodes` and `_fetchLinks` methods).
    this._nodeAttributes = memoizeFunction((nodes: SNode[], nodeAriaLabel: (node: SNode, weight: number) => string) =>
      this._computeNodeAttributes(nodes, nodeAriaLabel),
    );
    this._fetchNodes = (
      classNames: IProcessedStyleSet<ISankeyChartStyles>,
      nodes: SNode[],
      nodeAttributes: ItemValues<RenderedNodeAttributes>,
      tooltipDiv: TooltipDiv,
    ) => this._createNodes(classNames, nodes, nodeAttributes, tooltipDiv);
    this._linkAttributes = memoizeFunction(
      (links: SLink[], linkFrom: (node: SNode) => string, linkAriaLabel: (link: SLink) => string) =>
        computeLinkAttributes(links, linkFrom, linkAriaLabel),
    );
    this._fetchLinks = (links: SLink[], linkAttributes: LinkItemValues<RenderedLinkAttributes>) =>
      this._createLinks(links, linkAttributes);
    // Our shorter path to performance is to pre-compute the truncated labels of each node because
    // that should not change based on the position of the mouse. This is a shorter path becase the code which
    // computes the truncated labels creates and destroys a `tempText` element in the DOM. This is causing a
    // reflow and repaint of the entire chart. This is a performance issue, and so computing the truncated labels
    // once will help to mitigate this issue.
  }

  public componentDidMount(): void {
    this._fitParentContainer();
  }

  public componentDidUpdate(prevProps: ISankeyChartProps): void {
    if (prevProps.shouldResize !== this.props.shouldResize) {
      this._fitParentContainer();
    }
  }

  public componentWillUnmount(): void {
    cancelAnimationFrame(this._reqID);
  }

  public render(): React.ReactNode {
    if (!this._isChartEmpty()) {
      const { theme, className, styles, pathColor, colorsForNodes, borderColorsForNodes } = this.props;
      const state = this.state;
      const classNamesProps = this._computeClassNamesProps(
        theme!,
        pathColor!,
        className!,
        state.containerWidth,
        state.containerHeight,
      );
      const classNames: IProcessedStyleSet<ISankeyChartStyles> = this._computeClassNames(styles!, classNamesProps);

      // Compute the position of each node and link
      const { nodes, links, width, height } = this._normalizeData(
        this.props.data.SankeyChartData!,
        state.containerWidth,
        state.containerHeight,
        colorsForNodes,
        borderColorsForNodes,
      );

      // In FocusZone, the focus order is determined by the rendering order of the elements. We need to find
      // a rendering order such that the focus moves through the nodes and links in a logical sequence.
      // Rendering the nodes and links layer by layer in a vertical order seems to be the most effective solution
      // with FocusZone. Although this focus order may not be entirely logical, it ensures that the focus moves
      // sequentially and prevents links (especially skip layer links) from being rendered over the nodes.
      const nodeLinkDomOrderArray: { layer: number; type: string; index: number }[] = [];
      nodes.sort((a: SNode, b: SNode) => {
        if (a.x0 !== b.x0) {
          return a.x0! - b.x0!;
        }
        return a.y0! - b.y0!;
      });
      nodes.forEach((item: SNode, index) => {
        nodeLinkDomOrderArray.push({ layer: item.layer!, type: 'node', index });
      });
      links.sort((a: SLink, b: SLink) => {
        const asx0 = (a.source as SNode).x0;
        const bsx0 = (b.source as SNode).x0;
        if (asx0 !== bsx0) {
          return asx0! - bsx0!;
        }
        return a.y0! - b.y0!;
      });
      links.forEach((item: SLink, index) => {
        nodeLinkDomOrderArray.push({ layer: (item.source as SNode).layer!, type: 'link', index });
      });
      nodeLinkDomOrderArray.sort((a, b) => {
        if (a.layer !== b.layer) {
          return a.layer - b.layer;
        }

        if (a.type > b.type) {
          return -1;
        }
        if (a.type < b.type) {
          return 1;
        }
        return 0;
      });

      // NOTE: I don't love this approach to caching the "select" result. Is it still valid from render-to-render?
      // although local testing seems to indicate so, I do not trust that React will always support that instance.
      // It might be better to perform this `fetch` within the `_showTooltip` and `_hideTooltip` methods.
      const tooltipDiv = this._fetchTooltip(classNames);
      // Pre-compute some important attributes about nodes, specifically text
      const nodeAttributes = this._nodeAttributes(nodes, this._accessibility.nodeAriaLabel);
      // Build the nodes and links as rendered in the UX.
      const nodeData = this._fetchNodes(classNames, nodes, nodeAttributes, tooltipDiv);
      const linkAttributes = this._linkAttributes(links, this._strings.linkFrom, this._accessibility.linkAriaLabel);
      const linkData = this._fetchLinks(links, linkAttributes);

      const calloutProps = {
        isCalloutVisible: state.isCalloutVisible,
        directionalHint: DirectionalHint.topAutoEdge,
        id: `toolTip${this._calloutId}`,
        target: state.refSelected,
        color: state.color,
        XValue: state.xCalloutValue,
        YValue: state.yCalloutValue ? state.yCalloutValue : state.dataForHoverCard,
        descriptionMessage: state.descriptionMessage,
        isBeakVisible: false,
        gapSpace: 15,
        onDismiss: this._onCloseCallout,
        className: classNames.calloutContentRoot,
        preventDismissOnLostFocus: true,
      };
      return (
        <div
          className={classNames.root}
          role={'presentation'}
          ref={(rootElem: HTMLDivElement) => (this.chartContainer = rootElem)}
          onMouseLeave={this._onCloseCallout}
        >
          {/*
          - Horizontal navigation has been disabled because the nodes and links are rendered vertically,
          causing the left/right arrow keys to move focus up or down to the previous or next sibling element.
          - Bidirectional navigation has been disabled because it causes the up/down arrow keys to move the focus
          in a non-sequential and erratic manner within a 2D grid.
          */}
          <FocusZone direction={FocusZoneDirection.vertical} className={classNames.chartWrapper}>
            <svg width={width} height={height} id={this._chartId}>
              {nodeLinkDomOrderArray.map(item => {
                if (item.type === 'node') {
                  return (
                    <g key={nodes[item.index].nodeId} className={classNames.nodes}>
                      {nodeData![item.index]}
                    </g>
                  );
                } else {
                  return (
                    <g
                      key={`${(links[item.index].source as SNode).nodeId}-${
                        (links[item.index].target as SNode).nodeId
                      }`}
                      className={classNames.links}
                      strokeOpacity={1}
                    >
                      {linkData![item.index]}
                    </g>
                  );
                }
              })}
              {calloutProps.isCalloutVisible && (
                <Callout {...calloutProps}>
                  <ChartHoverCard
                    XValue={calloutProps.XValue}
                    YValue={calloutProps.YValue}
                    color={calloutProps.color}
                    descriptionMessage={calloutProps.descriptionMessage ? calloutProps.descriptionMessage : ''}
                  />
                </Callout>
              )}
            </svg>
          </FocusZone>
        </div>
      );
    }
    return (
      <div
        id={this._emptyChartId}
        role={'alert'}
        style={{ opacity: '0' }}
        aria-label={this._accessibility.emptyAriaLabel}
      />
    );
  }

  private _computeNodeAttributes(
    nodes: SNode[],
    nodeAriaLabel: (node: SNode, weight: number) => string,
  ): ItemValues<RenderedNodeAttributes> {
    const result: ItemValues<RenderedNodeAttributes> = {};
    const weightSpan = select('.nodeName').append('text').attr('class', 'tempText').append('tspan').text(null);
    const nameSpan = select('.nodeName')
      .append('text')
      .attr('class', 'tempText')
      .attr('font-size', '10')
      .append('tspan')
      .text(null);
    nodes.forEach((singleNode: SNode) => {
      const height = Math.max(singleNode.y1! - singleNode.y0!, 0);
      let padding = 8;
      let textLengthForNodeWeight = 0;

      const nodeValue = singleNode.actualValue!;
      // If the nodeWeight is in the same line as node description an extra padding
      // of 6 px is required between node description and node weight.
      if (height < MIN_HEIGHT_FOR_DOUBLINE_TYPE) {
        padding = padding + 6;
        // The following `select` statement injects a `tempText` element into the DOM. This injection
        // (and subsequent removal) is causing a layout recalculation. This is a performance issue.
        const measurement = measureText(weightSpan, this._formatNumber(nodeValue));
        if (measurement !== undefined) {
          textLengthForNodeWeight = measurement;
          padding = padding + textLengthForNodeWeight;
        }
      }
      // Since the total width of the node is 124 and we are giving margin of 8px from the left .
      // So the actual value on which it will be truncated is 124-8=116.
      const truncatedname: string = truncateText(nameSpan, singleNode.name, NODE_WIDTH - 8, padding);
      const isTruncated: boolean = truncatedname.slice(-3) === elipsis;
      result[singleNode.nodeId] = {
        reactId: getId('nodeBar'),
        gElementId: getId('nodeGElement'),
        name: truncatedname,
        aria: nodeAriaLabel(singleNode, nodeValue),
        trimmed: isTruncated,
        height,
        weightOffset: textLengthForNodeWeight,
      };
    });
    selectAll('.tempText').remove();
    return result;
  }

  private _linkCalloutAttributes(
    singleLink: SLink,
    from: string,
  ): IChartHoverCardProps & {
    selectedLink: SLink;
    isCalloutVisible: boolean;
    color: string;
    xCalloutValue: string;
    yCalloutValue: string;
    descriptionMessage: string;
  } {
    return {
      selectedLink: singleLink,
      isCalloutVisible: true,
      color: (singleLink.source as SNode).color!,
      xCalloutValue: (singleLink.target as SNode).name,
      yCalloutValue: this._formatNumber(singleLink.unnormalizedValue!),
      descriptionMessage: from,
    };
  }

  private _normalizeSankeyData(
    data: ISankeyChartData,
    containerWidth: number,
    containerHeight: number,
    colorsForNodes: string[] | undefined,
    borderColorsForNodes: string[] | undefined,
  ): NormalizedData {
    const { sankey, height, width } = preRenderLayout(this._margins, containerWidth, containerHeight, this._isRtl);
    // Clone the data before mutating it (via the SankeyLayoutGenerator) so that we don't mutate the original data.
    const transformed: ISankeyChartData = duplicateData(data);
    sankey(transformed);
    // NOTE: After the prior line, `transformed` is now a more-complex object than the incoming `ISankeyChartData`.
    // `transformed` should be cast to a more-specific type. This is a breaking change because we would be eliminating
    // fields from `ISankeyChartData` and putting those fields on a now-local type. But doing so makes it clearer what
    // the caller needs to supply and why. For example, the `actualValue` and `layer` fields of `ISNodeExtra` should
    // both be moved. Similarly for `unnormalizedValue` in `ISLinkExtra`.
    // `SankeyNodeMinimal` and `SankeyLinkMinimal` are both the types after `sankey(transformed)`, but have almost no
    // bearing on the data before `sankey(transformed)` (which is basically nodes with ids and names along with links
    // with source index, target index, and value).
    const nodesInColumn = groupNodesByColumn(transformed);
    this._numColumns = Object.keys(nodesInColumn).length;
    // Keep track of the original values of the links and their acccumulated values in the nodes
    // Setting these in external objects so they cannot be mutated by other code.
    // The IDs of nodes can be numbers or strings. But, the IDs of links are always the index into the "nodes" array.
    // After the sankey layout is computed, the each link's `source` and `target` will have the ID of the node in the
    // type originally specified in the Nodes array. Consequently, we get the values of those links after the sankey
    // transformation.
    const nodeValues = valuesOfNodes(transformed.nodes);
    const linkValues = valuesOfLinks(transformed.links);
    adjustOnePercentHeightNodes(nodesInColumn, nodeValues, linkValues);
    adjustPadding(sankey, height - 6, nodesInColumn);
    // `sankey` is called a second time, probably to re-layout the nodes with the one-percent adjusted weights.
    // NOTE: The second call to `sankey` is required to allow links to be hoverable.
    // Without the second call, the links are not hoverable.
    sankey(transformed);
    populateNodeActualValue(transformed, nodeValues, linkValues);
    assignNodeColors(transformed.nodes, colorsForNodes, borderColorsForNodes);
    return {
      width,
      height,
      nodes: transformed.nodes,
      links: transformed.links,
    };
  }

  private _labelTooltipDiv(classNames: IProcessedStyleSet<ISankeyChartStyles>): TooltipDiv {
    // find the tooltip div. If it doesn't exist, then create it.
    let tooltipDiv = select(`#${this._labelTooltipId}`);
    if (tooltipDiv.empty()) {
      tooltipDiv = select('body')
        .append('div')
        .attr('id', this._labelTooltipId)
        .attr('class', classNames.toolTip!)
        .style('opacity', 0);
    }
    // If the div exists, then `classNames` has changed; update the `class` on the `div`.
    tooltipDiv.attr('class', classNames.toolTip!);
    return tooltipDiv;
  }

  private _createLinks(
    dataLinks: SLink[],
    linkAttributes: LinkItemValues<RenderedLinkAttributes>,
  ): React.ReactNode[] | undefined {
    if (dataLinks) {
      const linkId = this._linkId;
      return dataLinks.map((singleLink: SLink, index: number): React.ReactNode => {
        const onMouseOut = () => {
          this._onStreamLeave(singleLink);
        };
        const { reactId, from, aria } = linkValue(linkAttributes, singleLink);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const dataPoints: Array<any> = linkToDataPoints(singleLink as unknown as SankeyLinkWithPositions);
        const key = `${linkId}-${index}`;
        const gradientId = `gradient-${key}`;
        const gradientUrl = `url(#${gradientId})`;
        const source = singleLink.source as SNode;
        const target = singleLink.target as SNode;
        // TODO: localize the aria-label string
        return (
          <g key={key}>
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0" stopColor={source.color} />
                <stop offset="100%" stopColor={target.color} />
              </linearGradient>
            </defs>
            <path
              d={linkArea(dataPoints)!}
              id={reactId}
              fill={this._fillStreamColors(singleLink, gradientUrl)}
              stroke={this._fillStreamBorder(singleLink, gradientUrl)}
              strokeWidth="2"
              strokeOpacity={this._getOpacityStreamBorder(singleLink)}
              onMouseOver={event => this._onStreamHover(event, singleLink, from)}
              onMouseOut={onMouseOut}
              onFocus={event => this._onFocusLink(event, singleLink, from)}
              onBlur={this._onBlur}
              fillOpacity={this._getOpacityStream(singleLink)}
              data-is-focusable={true}
              aria-label={aria}
              role="img"
            />
          </g>
        );
      });
    }
    return [];
  }

  private _createNodes(
    classNames: IProcessedStyleSet<ISankeyChartStyles>,
    dataNodes: SNode[],
    nodeAttributes: ItemValues<RenderedNodeAttributes>,
    tooltipDiv: TooltipDiv,
  ): React.ReactNode[] | undefined {
    if (dataNodes) {
      const state = this.state;
      const textAnchor = this._isRtl ? 'end' : 'start';
      return dataNodes.map((singleNode: SNode, index: number): React.ReactNode => {
        const onMouseOut = () => {
          this._onLeave(singleNode);
        };
        const {
          reactId: nodeId,
          gElementId,
          height,
          trimmed: isTruncated,
          name: truncatedName,
          weightOffset: textLengthForNodeWeight,
          aria,
        } = nodeAttributes[singleNode.nodeId];
        const tooTall = height > MIN_HEIGHT_FOR_DOUBLINE_TYPE;
        const { name, actualValue, x0, x1, y0 } = singleNode;
        const textColor = nodeTextColor(state, singleNode);
        return (
          <g key={index} id={gElementId}>
            <rect
              x={x0}
              y={y0}
              height={height}
              width={x1! - x0!}
              fill={this._fillNodeColors(singleNode)}
              id={nodeId}
              onMouseOver={this._onHover.bind(this, singleNode)}
              onMouseOut={onMouseOut}
              onFocus={this._onCloseCallout.bind(this)}
              stroke={this._fillNodeBorder(singleNode)}
              strokeWidth="2"
              opacity="1"
              data-is-focusable={true}
              aria-label={aria}
              role="img"
            />
            {height > MIN_HEIGHT_FOR_TYPE && (
              <g className={classNames.nodeTextContainer}>
                <g className="nodeName">
                  <text
                    id={`${nodeId}-name`}
                    x={x0}
                    y={y0}
                    dy={'1.2em'}
                    dx={'0.4em'}
                    textAnchor={textAnchor}
                    fontWeight="regular"
                    aria-hidden="true"
                    fill={textColor}
                    fontSize={10}
                    onMouseOver={this._showTooltip.bind(this, name, isTruncated, tooltipDiv)}
                    onMouseOut={this._hideTooltip.bind(this, tooltipDiv)}
                  >
                    {truncatedName}
                  </text>
                </g>

                <text
                  x={tooTall ? x0 : x1! - textLengthForNodeWeight - 8}
                  y={y0}
                  dy={tooTall ? '2em' : '1em'}
                  dx={tooTall ? '0.4em' : '0em'}
                  textAnchor={textAnchor}
                  fontWeight="bold"
                  aria-hidden="true"
                  fill={textColor}
                  fontSize={14}
                >
                  {actualValue ? this._formatNumber(actualValue) : actualValue}
                </text>
              </g>
            )}
          </g>
        );
      });
    }
  }

  private _onLeave(singleNode: SNode) {
    if (this.state.selectedState) {
      this.setState({
        selectedState: false,
        selectedNodes: new Set<number>(),
        selectedLinks: new Set<number>(),
        selectedNode: undefined,
      });
    }
  }

  private _onHover(singleNode: SNode, mouseEvent: React.MouseEvent<SVGElement>) {
    mouseEvent.persist();
    this._onCloseCallout();
    if (!this.state.selectedState) {
      const selectedLinks = getSelectedLinks(singleNode);
      const selectedNodes = getSelectedNodes(selectedLinks);
      selectedNodes.push(singleNode);
      this.setState({
        selectedState: true,
        selectedNodes: new Set<number>(Array.from(selectedNodes).map(node => node.index)),
        selectedLinks: new Set<number>(Array.from(selectedLinks).map(link => link.index!)),
        selectedNode: singleNode,
        refSelected: mouseEvent, //this._refArray.get(index),
        isCalloutVisible: singleNode.y1! - singleNode.y0! < MIN_HEIGHT_FOR_TYPE,
        color: singleNode.color,
        xCalloutValue: singleNode.name,
        yCalloutValue: this._formatNumber(singleNode.actualValue!),
      });
    }
  }

  private _formatNumber(value: number): string {
    return this.props.formatNumberOptions
      ? value.toLocaleString(undefined, this.props.formatNumberOptions)
      : value.toString();
  }

  private _onStreamHover(mouseEvent: React.MouseEvent<SVGElement>, singleLink: SLink, from: string) {
    mouseEvent.persist();
    this._onCloseCallout();
    if (!this.state.selectedState) {
      const { selectedLinks, selectedNodes } = getSelectedLinksforStreamHover(singleLink);
      this.setState({
        selectedState: true,
        selectedNodes: new Set<number>(Array.from(selectedNodes).map(node => node.index!)),
        selectedLinks: new Set<number>(Array.from(selectedLinks).map(link => link.index!)),
        refSelected: mouseEvent,
        ...this._linkCalloutAttributes(singleLink, from),
      });
    }
  }

  private _onStreamLeave(singleLink: SLink) {
    if (this.state.selectedState) {
      this.setState({
        selectedState: false,
        selectedNodes: new Set<number>(),
        selectedLinks: new Set<number>(),
        selectedLink: undefined,
      });
    }
  }

  private _onFocusLink(element: React.FocusEvent<SVGElement>, singleLink: SLink, from: string): void {
    // There is a big difference in how "Tab" and the "Arrow keys" are handled in this diagram.
    // In particular, I would expect the "Down" key to be like "Tab", but it jumps a little wildly. I'm not sure
    // if this behavior is an accessiblity violation, but it we might want to investigate it.
    element.persist();
    this._onCloseCallout();
    this.setState({
      refSelected: element.currentTarget,
      ...this._linkCalloutAttributes(singleLink, from),
    });
  }

  private _onCloseCallout = () => {
    this.setState({
      isCalloutVisible: false,
      refSelected: undefined,
      descriptionMessage: '',
    });
  };

  private _onBlur = (): void => {
    /**/
  };

  private _fillNodeColors = (singleNode: SNode): string | undefined => {
    const state = this.state;
    if (!state.selectedState) {
      return singleNode.color;
    } else {
      const selectedNode = state.selectedNode;
      if (selectedNode && state.selectedNodes.has(singleNode.index!)) {
        return selectedNode.color;
      } else if (!selectedNode) {
        return singleNode.color;
      }
    }
  };

  private _fillStreamColors(singleLink: SLink, gradientUrl: string): string | undefined {
    const state = this.state;
    if (state.selectedState && state.selectedLinks.has(singleLink.index!)) {
      const selectedNode = state.selectedNode;
      return selectedNode ? selectedNode.color : gradientUrl;
    }
  }

  private _fillStreamBorder(singleLink: SLink, gradientUrl: string): string {
    const state = this.state;
    if (!state.selectedState) {
      return NON_SELECTED_NODE_AND_STREAM_COLOR;
    } else {
      if (state.selectedLinks.has(singleLink.index!)) {
        const selectedNode = state.selectedNode;
        return selectedNode ? selectedNode.borderColor! : gradientUrl;
      }
      return NON_SELECTED_NODE_AND_STREAM_COLOR;
    }
  }

  private _fillNodeBorder = (singleNode: SNode): string => {
    const state = this.state;
    if (!state.selectedState) {
      return singleNode.borderColor!;
    } else {
      if (state.selectedNodes.has(singleNode.index!)) {
        const selectedNode = state.selectedNode;
        return selectedNode ? selectedNode.borderColor! : singleNode.borderColor!;
      }
      return singleNode.borderColor!;
    }
  };

  private _getOpacityStream(singleLink: SLink): number {
    const state = this.state;
    if (state.selectedState) {
      if (!state.selectedLinks.has(singleLink.index!)) {
        return NON_SELECTED_OPACITY;
      } else if (!state.selectedNode) {
        return SELECTED_STREAM_OPACITY;
      }
    }
    return REST_STREAM_OPACITY;
  }

  private _getOpacityStreamBorder(singleLink: SLink): number {
    const state = this.state;
    if (state.selectedState && !state.selectedLinks.has(singleLink.index!) && !state.selectedNode) {
      return NON_SELECTED_STREAM_BORDER_OPACITY;
    }

    return NON_SELECTED_OPACITY;
  }

  private _fitParentContainer(): void {
    const { containerWidth, containerHeight } = this.state;
    this._reqID = requestAnimationFrame(() => {
      // NOTE: Calls to this method trigger a re-render.
      const container = this.props.parentRef ? this.props.parentRef : this.chartContainer;
      const currentContainerWidth =
        container &&
        (this.props.enableReflow
          ? Math.max(container.getBoundingClientRect().width, this._calculateChartMinWidth())
          : container.getBoundingClientRect().width);
      const currentContainerHeight = container && container.getBoundingClientRect().height;
      const shouldResize = containerWidth !== currentContainerWidth || containerHeight !== currentContainerHeight;
      if (shouldResize) {
        this.setState({
          containerWidth: currentContainerWidth,
          containerHeight: currentContainerHeight,
        });
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _showTooltip(text: string, checkTrcuncated: boolean, div: any, evt: any) {
    if (checkTrcuncated) {
      //Fixing tooltip position by attaching it to the element rather than page
      div.style('opacity', 0.9);
      div
        .html(text)
        .style('left', evt.pageX + 'px')
        .style('top', evt.pageY - 28 + 'px');
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _hideTooltip(div: any) {
    div.style('opacity', 0);
  }

  private _isChartEmpty() {
    const sankeyChartData = this.props.data?.SankeyChartData;
    return !(sankeyChartData && sankeyChartData.nodes.length > 0 && sankeyChartData.links.length > 0);
  }

  private _calculateChartMinWidth = (): number => {
    return (
      this._margins.left! +
      this._margins.right! +
      // total width of all node columns
      this._numColumns * NODE_WIDTH +
      // minimum total width of all column gaps
      (this._numColumns - 1) * (NODE_WIDTH / 2)
    );
  };
}
