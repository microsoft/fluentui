import { FocusZone, FocusZoneDirection, FocusZoneTabbableElements } from '@fluentui/react-focus';
import { Callout, DirectionalHint } from '@fluentui/react/lib/Callout';
import { IProcessedStyleSet } from '@fluentui/react/lib/Styling';
import { classNamesFunction, format, getId, getRTL, memoizeFunction } from '@fluentui/react/lib/Utilities';
import { sum as d3Sum } from 'd3-array';
import { SankeyGraph, SankeyLayout, sankey as d3Sankey, sankeyJustify, sankeyRight } from 'd3-sankey';
import { select, selectAll } from 'd3-selection';
import { area as d3Area, curveBumpX as d3CurveBasis } from 'd3-shape';
import * as React from 'react';
import { IBasestate, SLink, SNode } from '../../types/IDataPoint';
import { ChartHoverCard } from '../../utilities/ChartHoverCard/ChartHoverCard';
import { IChartHoverCardProps } from '../../utilities/ChartHoverCard/ChartHoverCard.types';
import { IMargins } from '../../utilities/utilities';
import { ISankeyChartData, ISankeyChartProps, ISankeyChartStyleProps, ISankeyChartStyles } from './SankeyChart.types';

const getClassNames = classNamesFunction<ISankeyChartStyleProps, ISankeyChartStyles>();
const PADDING_PERCENTAGE = 0.3;

type NodeId = number | string;
type NodeValues = { [key: NodeId]: number };
type LinkValues = { [key: NodeId]: NodeValues };

type NodesInColumns = { [key: number]: SNode[] };
type NormalizedData = {
  width: number;
  height: number;
  data: ISankeyChartData;
};

type NormalizeFunction = (data: ISankeyChartData, containerWidth: number, containerHeight: number) => NormalizedData;

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

function getSelectedLinksforStreamHover(singleLink: SLink): { selectedLinks: Set<SLink>; selectedNodes: Set<SNode> } {
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

function linkValue(originalLinks: LinkValues, link: SLink): number {
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
    .nodeWidth(124)
    .extent([
      [left!, top!],
      [width - 1, height - 6],
    ])
    .nodeAlign(isRtl ? sankeyRight : sankeyJustify);

  return { sankey, height, width };
}

export class SankeyChartBase extends React.Component<ISankeyChartProps, ISankeyChartState> {
  private chartContainer: HTMLDivElement;
  private _reqID: number;
  private _calloutId: string;
  private _linkId: string;
  private _margins: IMargins;
  private _isRtl: boolean = getRTL();
  private _normalizeData: NormalizeFunction;
  private _emptyChartId: string;

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
    this._margins = { top: 36, right: 48, bottom: 32, left: 48 };
    this._normalizeData = memoizeFunction((data: ISankeyChartData, containerWidth: number, containerHeight: number) =>
      this._normalizeSankeyData(data, containerWidth, containerHeight),
    );
    this._emptyChartId = getId('_SankeyChart_empty');
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
      const { theme, className, styles, pathColor } = this.props;
      const state = this.state;
      const classNames: IProcessedStyleSet<ISankeyChartStyles> = getClassNames(styles!, {
        theme: theme!,
        width: state.containerWidth,
        height: state.containerHeight,
        pathColor,
        className,
      });

      const {
        data: sankeyChartData,
        width,
        height,
      } = this._normalizeData(this.props.data.SankeyChartData!, state.containerWidth, state.containerHeight);
      // NEXT: Move the following into _normalizeSankeyData to see if we can cache computation of
      // colors, nodes, and links.
      const dataNodes = sankeyChartData.nodes;
      this._assignNodeColors(dataNodes); // This can probably safely move.
      const nodeData = this._createNodes(classNames, dataNodes);
      const linkData = this._createLinks(sankeyChartData.links);

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
          <FocusZone
            direction={FocusZoneDirection.bidirectional}
            isCircularNavigation={true}
            handleTabKey={FocusZoneTabbableElements.all}
          >
            <svg width={width} height={height} id={getId('sankeyChart')}>
              <g className={classNames.links} strokeOpacity={1}>
                {linkData}
              </g>
              <g className={classNames.nodes}>{nodeData}</g>
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
        aria-label={this.props.strings.emptyAriaLabel}
      />
    );
  }

  private _normalizeSankeyData(
    data: ISankeyChartData,
    containerWidth: number,
    containerHeight: number,
  ): NormalizedData {
    const { sankey, height, width } = preRenderLayout(this._margins, containerWidth, containerHeight, this._isRtl);
    // Clone the data before mutating it (via the SankeyLayoutGenerator) so that we don't mutate the original data.
    const transformed: ISankeyChartData = duplicateData(data);
    sankey(transformed);
    const nodesInColumn = groupNodesByColumn(transformed);
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
    return {
      width,
      height,
      data: transformed,
    };
  }

  private _createLinks(dataLinks: SLink[]): React.ReactNode[] | undefined {
    const links: React.ReactNode[] = [];

    if (dataLinks) {
      const ariaLabelUnformatted = this.props.strings.linkAriaLabel;
      const linkId = this._linkId;
      dataLinks.forEach((singleLink: SLink, index: number) => {
        const onMouseOut = () => {
          this._onStreamLeave(singleLink);
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = (d: any) => {
          return [
            { x: d.source.x1, y0: d.y0 + d.width / 2, y1: d.y0 - d.width / 2 },
            { x: d.target.x0, y0: d.y1 + d.width / 2, y1: d.y1 - d.width / 2 },
          ];
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const dataPoints: Array<any> = data(singleLink);
        const linkArea = d3Area()
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .x((p: any) => p.x)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .y0((p: any) => p.y0)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .y1((p: any) => p.y1)
          .curve(d3CurveBasis);
        const gradientUrl = `url(#gradient-${linkId}-${index})`;
        const link = (
          <g key={`${linkId}-${index}`}>
            <defs>
              <linearGradient id={`gradient-${linkId}-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0" stopColor={(singleLink.source as SNode).color} />
                <stop offset="100%" stopColor={(singleLink.target as SNode).color} />
              </linearGradient>
            </defs>
            <path
              d={linkArea(dataPoints)!}
              id={getId('link')}
              fill={this._fillStreamColors(singleLink, gradientUrl)}
              stroke={this._fillStreamBorder(singleLink, gradientUrl)}
              strokeWidth="2"
              strokeOpacity={this._getOpacityStreamBorder(singleLink)}
              onMouseOver={this._onStreamHover.bind(this, singleLink)}
              onMouseOut={onMouseOut}
              onFocus={this._onFocusLink.bind(this, singleLink)}
              onBlur={this._onBlur}
              fillOpacity={this._getOpacityStream(singleLink)}
              data-is-focusable={true}
              aria-label={format(
                ariaLabelUnformatted,
                (singleLink.source as SNode).name,
                (singleLink.target as SNode).name,
                singleLink.unnormalizedValue,
              )}
              role="img"
            />
          </g>
        );
        links.push(link);
      });
    }
    return links;
  }

  private _createNodes(
    classNames: IProcessedStyleSet<ISankeyChartStyles>,
    dataNodes: SNode[],
  ): React.ReactNode[] | undefined {
    const nodes: React.ReactNode[] = [];

    if (dataNodes) {
      const state = this.state;
      const nodeAriaLabelUnformatted = this.props.strings.nodeAriaLabel;
      dataNodes.forEach((singleNode: SNode, index: number) => {
        const onMouseOut = () => {
          this._onLeave(singleNode);
        };
        const height = singleNode.y1! - singleNode.y0! > 0 ? singleNode.y1! - singleNode.y0! : 0;
        let padding = 8;
        let textLengthForNodeWeight = 0;

        // If the nodeWeight is in the same line as node description an extra padding
        // of 6 px is required between node description and node weight.
        if (height < MIN_HEIGHT_FOR_DOUBLINE_TYPE) {
          padding = padding + 6;
          const tspan = select('.nodeName').append('text').attr('class', 'tempText').append('tspan').text(null);
          tspan.text(singleNode.actualValue!);
          if (tspan.node() !== null) {
            textLengthForNodeWeight = tspan.node()!.getComputedTextLength();
            padding = padding + textLengthForNodeWeight;
          }
          tspan.text(null);
          selectAll('.tempText').remove();
        }
        // Since the total width of the node is 124 and we are giving margin of 8px from the left .
        //So the actual value on which it will be truncated is 124-8=116.
        const truncatedname: string = this._truncateText(singleNode.name, 116, padding);
        const isTruncated: boolean = truncatedname.slice(-3) === '...';
        const id = getId('tooltip');
        const div = select('body').append('div').attr('id', id).attr('class', classNames.toolTip!).style('opacity', 0);
        const nodeId = getId('nodeBar');
        const node = (
          <g key={index} id={getId('nodeGElement')}>
            <rect
              x={singleNode.x0}
              y={singleNode.y0}
              height={height}
              width={singleNode.x1! - singleNode.x0!}
              fill={this._fillNodeColors(singleNode)}
              id={nodeId}
              onMouseOver={this._onHover.bind(this, singleNode)}
              onMouseOut={onMouseOut}
              onFocus={this._onCloseCallout.bind(this)}
              stroke={this._fillNodeBorder(singleNode)}
              strokeWidth="2"
              opacity="1"
              data-is-focusable={true}
              aria-label={format(nodeAriaLabelUnformatted, singleNode.name, singleNode.actualValue)}
              role="img"
            />
            {singleNode.y1! - singleNode.y0! > MIN_HEIGHT_FOR_TYPE && (
              <g className={classNames.nodeTextContainer}>
                <g className="nodeName">
                  <text
                    id={`${nodeId}-name`}
                    x={singleNode.x0}
                    y={singleNode.y0}
                    dy={'1.2em'}
                    dx={'0.4em'}
                    textAnchor={this._isRtl ? 'end' : 'start'}
                    fontWeight="regular"
                    aria-hidden="true"
                    fill={
                      !(
                        !state.selectedState ||
                        (state.selectedState && state.selectedNodes.has(singleNode.index!) && state.selectedNode) ||
                        (state.selectedState && !state.selectedNode)
                      )
                        ? DEFAULT_TEXT_COLOR
                        : NON_SELECTED_TEXT_COLOR
                    }
                    fontSize={10}
                    onMouseOver={this._showTooltip.bind(this, singleNode.name, isTruncated, div)}
                    onMouseOut={this._hideTooltip.bind(this, div)}
                  >
                    {truncatedname}
                  </text>
                </g>

                <text
                  x={
                    height > MIN_HEIGHT_FOR_DOUBLINE_TYPE ? singleNode.x0 : singleNode.x1! - textLengthForNodeWeight - 8
                  }
                  y={singleNode.y0}
                  dy={height > MIN_HEIGHT_FOR_DOUBLINE_TYPE ? '2em' : '1em'}
                  dx={height > MIN_HEIGHT_FOR_DOUBLINE_TYPE ? '0.4em' : '0em'}
                  textAnchor={this._isRtl ? 'end' : 'start'}
                  fontWeight="bold"
                  aria-hidden="true"
                  fill={
                    !(
                      !state.selectedState ||
                      (state.selectedState && state.selectedNodes.has(singleNode.index!) && state.selectedNode) ||
                      (state.selectedState && !state.selectedNode)
                    )
                      ? DEFAULT_TEXT_COLOR
                      : NON_SELECTED_TEXT_COLOR
                  }
                  fontSize={14}
                >
                  {singleNode.actualValue}
                </text>
              </g>
            )}
          </g>
        );
        nodes.push(node);
      });
      return nodes;
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        yCalloutValue: singleNode.actualValue! as any as string,
      });
    }
  }

  private _onStreamHover(singleLink: SLink, mouseEvent: React.MouseEvent<SVGElement>) {
    mouseEvent.persist();
    this._onCloseCallout();
    if (!this.state.selectedState) {
      const { selectedLinks, selectedNodes } = getSelectedLinksforStreamHover(singleLink);
      this.setState({
        selectedState: true,
        selectedNodes: new Set<number>(Array.from(selectedNodes).map(node => node.index!)),
        selectedLinks: new Set<number>(Array.from(selectedLinks).map(link => link.index!)),
        refSelected: mouseEvent,
        selectedLink: singleLink,
        isCalloutVisible: true,
        color: (singleLink.source as SNode).color,
        xCalloutValue: (singleLink.target as SNode).name,
        yCalloutValue: singleLink.unnormalizedValue!.toString(),
        descriptionMessage: format(this.props.strings.linkFrom, (singleLink.source as SNode).name),
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

  private _onFocusLink(singleLink: SLink, element: React.FocusEvent<SVGElement>): void {
    element.persist();
    this._onCloseCallout();
    this.setState({
      refSelected: element.currentTarget,
      selectedLink: singleLink,
      isCalloutVisible: true,
      color: (singleLink.source as SNode).color,
      xCalloutValue: (singleLink.target as SNode).name,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      yCalloutValue: (singleLink.source as SNode).actualValue! as any as string,
      descriptionMessage: format(this.props.strings.linkFrom, (singleLink.source as SNode).name),
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
    } else if (state.selectedState && state.selectedNodes.has(singleNode.index!) && state.selectedNode) {
      return state.selectedNode.color;
    } else if (state.selectedState && !state.selectedNode) {
      return singleNode.color;
    }
  };

  /**
   * This is used to assign node fillcolors and borderColor cyclically when the user doesnt
   * provide color to  individual node.
   */
  private _assignNodeColors(nodes: SNode[]) {
    let colors: string[];
    let borders: string[];
    const { colorsForNodes, borderColorsForNodes } = this.props;
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

  private _fillStreamColors(singleLink: SLink, gradientUrl: string): string | undefined {
    const state = this.state;
    if (state.selectedState && state.selectedLinks.has(singleLink.index!) && state.selectedNode) {
      return state.selectedNode.color;
    } else if (state.selectedState && state.selectedLinks.has(singleLink.index!)) {
      return gradientUrl;
    }
  }

  private _fillStreamBorder(singleLink: SLink, gradientUrl: string): string {
    const state = this.state;
    if (!state.selectedState) {
      return NON_SELECTED_NODE_AND_STREAM_COLOR;
    } else if (state.selectedState && state.selectedLinks.has(singleLink.index!) && state.selectedNode) {
      return state.selectedNode.borderColor!;
    } else if (state.selectedState && state.selectedLinks.has(singleLink.index!)) {
      return gradientUrl;
    }
    return NON_SELECTED_NODE_AND_STREAM_COLOR;
  }

  private _fillNodeBorder = (singleNode: SNode): string => {
    const state = this.state;
    if (!state.selectedState) {
      return singleNode.borderColor!;
    } else if (state.selectedState && state.selectedNodes.has(singleNode.index!) && state.selectedNode) {
      return state.selectedNode.borderColor!;
    } else if (state.selectedState && state.selectedNodes.has(singleNode.index!)) {
      return singleNode.borderColor!;
    }
    return singleNode.borderColor!;
  };

  private _getOpacityStream(singleLink: SLink): number {
    const state = this.state;
    if (state.selectedState) {
      if (!state.selectedLinks.has(singleLink.index!)) {
        return NON_SELECTED_OPACITY;
      } else if (state.selectedLinks.has(singleLink.index!) && !state.selectedNode) {
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
      const currentContainerWidth = container && container.getBoundingClientRect().width;
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

  /**
   * @param text is the text which we are trying to truncate
   * @param rectangleWidth is the width of the rectangle which will contain the text
   * @param padding is the space we need to leave between the rect lines and other text
   * @param nodeWeight is the text if present needs to be accomodate in the same line as text.
   * @returns the truncated text , if truncated given the above parameters.
   */
  private _truncateText(text: string, rectangleWidth: number, padding: number) {
    const textLengthForNodeName = rectangleWidth - padding;
    let elipsisLength = 0;
    const tspan = select('.nodeName')
      .append('text')
      .attr('class', 'tempText')
      .attr('font-size', '10')
      .append('tspan')
      .text(null);
    tspan.text(text);
    if (tspan.node() !== null && tspan.node()!.getComputedTextLength() <= textLengthForNodeName) {
      return text;
    }
    tspan.text(null);
    tspan.text('...');
    if (tspan.node() !== null) {
      elipsisLength = tspan.node()!.getComputedTextLength();
    }
    tspan.text(null);
    let line: string = '';
    for (let i = 0; i < text.length; i++) {
      line += text[i];
      tspan.text(line);
      if (tspan.node() !== null) {
        const w = tspan.node()!.getComputedTextLength();
        if (w >= textLengthForNodeName - elipsisLength) {
          line = line.slice(0, -1);
          line += '...';
          break;
        }
      }
    }
    tspan.text(null);
    selectAll('.tempText').remove();
    return line;
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
}
