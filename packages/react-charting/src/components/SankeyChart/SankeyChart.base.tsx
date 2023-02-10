import * as React from 'react';
import { classNamesFunction, getId, getRTL, memoizeFunction } from '@fluentui/react/lib/Utilities';
import { ISankeyChartData, ISankeyChartProps, ISankeyChartStyleProps, ISankeyChartStyles } from './SankeyChart.types';
import { IProcessedStyleSet } from '@fluentui/react/lib/Styling';
import * as d3Sankey from 'd3-sankey';
import { area as d3Area, curveBumpX as d3CurveBasis } from 'd3-shape';
import { sum as d3Sum } from 'd3-array';
import { ChartHoverCard, IBasestate, IChartHoverCardProps, SLink, SNode } from '../../index';
import { Callout, DirectionalHint } from '@fluentui/react/lib/Callout';
import { select, selectAll } from 'd3-selection';
import { FocusZone, FocusZoneDirection, FocusZoneTabbableElements } from '@fluentui/react-focus';
import { IMargins } from '../../utilities/utilities';

const getClassNames = classNamesFunction<ISankeyChartStyleProps, ISankeyChartStyles>();
const PADDING_PERCENTAGE = 0.3;

type NodesInColumns = { [key: number]: SNode[] };
type NodeColors = { fillColor: string; borderColor: string };

export interface ISankeyChartState extends IBasestate, IChartHoverCardProps {
  containerWidth: number;
  containerHeight: number;
  selectedState: boolean;
  selectedLinks: Set<Number>;
  selectedNodes: Set<Number>;
  selectedNode?: SNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refSelected?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export class SankeyChartBase extends React.Component<ISankeyChartProps, ISankeyChartState> {
  private _classNames: IProcessedStyleSet<ISankeyChartStyles>;
  private chartContainer: HTMLDivElement;
  private _reqID: number;
  private _calloutId: string;
  private _linkId: string;
  private _nodesInColumn: NodesInColumns;
  private _sankey: d3Sankey.SankeyLayout<d3Sankey.SankeyGraph<{}, {}>, {}, {}>;
  private _margins: IMargins;
  private _isRtl: boolean = getRTL();
  private _normalizeData: (data: ISankeyChartData) => void;

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
    this._preRenderLayout();
    this._normalizeData = memoizeFunction((data: ISankeyChartData) => this._normalizeSankeyData(data));
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
    const { theme, className, styles, pathColor } = this.props;
    this._classNames = getClassNames(styles!, {
      theme: theme!,
      width: this.state.containerWidth,
      height: this.state.containerHeight,
      pathColor,
      className,
    });
    // We are using the this._margins.left and this._margins.top in sankey extent while constructing the layout
    const { height, width } = this._preRenderLayout();
    this._normalizeData(this.props.data.SankeyChartData!);
    let nodePadding = 8;
    nodePadding = this._adjustPadding(this._sankey, height - 6, this._nodesInColumn);

    this._sankey.nodePadding(nodePadding);
    this._sankey(this.props.data.SankeyChartData!);
    this._populateNodeActualValue(this.props.data.SankeyChartData!);
    this._assignNodeColors();
    const nodeData = this._createNodes(width);
    const linkData = this._createLinks();
    const calloutProps = {
      isCalloutVisible: this.state.isCalloutVisible,
      directionalHint: DirectionalHint.topAutoEdge,
      id: `toolTip${this._calloutId}`,
      target: this.state.refSelected,
      color: this.state.color,
      XValue: this.state.xCalloutValue,
      YValue: this.state.yCalloutValue ? this.state.yCalloutValue : this.state.dataForHoverCard,
      descriptionMessage: this.state.descriptionMessage,
      isBeakVisible: false,
      gapSpace: 15,
      onDismiss: this._onCloseCallout,
      className: this._classNames.calloutContentRoot,
      preventDismissOnLostFocus: true,
    };
    return (
      <div
        className={this._classNames.root}
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
            <g className={this._classNames.links} strokeOpacity={1}>
              {linkData}
            </g>
            <g className={this._classNames.nodes}>{nodeData}</g>
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

  private _preRenderLayout(): { height: number; width: number } {
    const width = this.state.containerWidth - this._margins.right!;
    const height =
      this.state.containerHeight - this._margins.bottom! > 0 ? this.state.containerHeight - this._margins.bottom! : 0;

    this._sankey = d3Sankey
      .sankey()
      .nodeWidth(124)
      .extent([
        [this._margins.left!, this._margins.top!],
        [width - 1, height - 6],
      ])
      .nodeAlign(this._isRtl ? d3Sankey.sankeyRight : d3Sankey.sankeyJustify);

    return { height, width };
  }

  /**
   * This is used for calculating the node non normalized value based on link non normalized value.
   *
   */
  private _populateNodeActualValue(data: ISankeyChartData) {
    data.links.forEach((link: SLink) => {
      if (!link.unnormalizedValue) {
        link.unnormalizedValue = link.value;
      }
    });
    data.nodes.forEach((node: SNode) => {
      node.actualValue = Math.max(
        d3Sum(node.sourceLinks!, (link: SLink) => link.unnormalizedValue),
        d3Sum(node.targetLinks!, (link: SLink) => link.unnormalizedValue),
      );
    });
  }

  private _normalizeSankeyData(data: ISankeyChartData): void {
    this._nodesInColumn = this._populateNodeInColumns(data, this._sankey);
    this._adjustOnePercentHeightNodes(this._nodesInColumn);
  }
  /**
   *
   * This is used to group nodes by column index.
   */
  private _populateNodeInColumns(
    graph: ISankeyChartData,
    sankey: d3Sankey.SankeyLayout<d3Sankey.SankeyGraph<{}, {}>, {}, {}>,
  ) {
    sankey(graph);
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
   *
   */
  private _adjustOnePercentHeightNodes(nodesInColumn: NodesInColumns) {
    const totalColumnValue = Object.values(nodesInColumn).map((column: SNode[]) => {
      return d3Sum(column, (node: SNode) => node.value);
    });
    totalColumnValue.forEach((columnValue: number, index: number) => {
      let totalPercentage = 0;
      nodesInColumn[index].forEach((node: SNode) => {
        const nodePercentage = (node.value! / columnValue) * 100;
        node.actualValue = node.value;
        //if the value is less than 1% then we are making it as 1% of total .
        if (nodePercentage < 1) {
          node.value = 0.01 * columnValue;
          totalPercentage = totalPercentage + 1;
        } else {
          totalPercentage = totalPercentage + nodePercentage;
        }
      });
      //since we have adjusted the value to be 1% but we need to keep the sum of the percentage value under 100.
      const scalingRatio = totalPercentage !== 0 ? totalPercentage / 100 : 1;
      if (scalingRatio > 1) {
        nodesInColumn[index].forEach((node: SNode) => {
          node.value = node.value! / scalingRatio;
          this._changeColumnValue(node, node.actualValue!, node.value);
        });
      }
    });
  }

  /**
   *
   * This is used for normalizing each links value for reflecting the normalized node value.
   */
  private _changeColumnValue(node: SNode, originalValue: number, normalizedValue: number) {
    node.sourceLinks!.forEach((link: SLink) => {
      link.unnormalizedValue = link.value;
      const linkRatio = link.value / originalValue;
      link.value = normalizedValue * linkRatio;
    });
    node.targetLinks!.forEach((link: SLink) => {
      link.unnormalizedValue = link.value;
      const linkRatio = link.value / originalValue;
      link.value = normalizedValue * linkRatio;
    });
  }

  /**
   *
   * This is used to introduce dynamic padding for cases where the number of nodes in a column is huge
   * so that we maintain a node to space ratio for such columns as if we fail to do so the
   * chart is devoid of nodes and only shows links.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _adjustPadding(sankey: any, height: number, nodesInColumn: NodesInColumns) {
    let padding = this._sankey.nodePadding();
    Object.values(nodesInColumn).forEach((column: SNode[]) => {
      const minPadding = PADDING_PERCENTAGE * height;
      const toatlPaddingInColumn = height - d3Sum(column, (node: SNode) => node.y1! - node.y0!);
      if (minPadding < toatlPaddingInColumn) {
        //Here we are calculating the min of default and calculated padding, we will not increase the padding
        //in any scenario.
        padding = Math.min(padding, minPadding / (column.length - 1));
      }
    });
    return padding;
  }

  private _createLinks(): React.ReactNode[] | undefined {
    const links: React.ReactNode[] = [];

    if (this.props.data.SankeyChartData) {
      this.props.data.SankeyChartData.links.forEach((singleLink: SLink, index: number) => {
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
        const gradientUrl = `url(#gradient-${this._linkId}-${index})`;
        const link = (
          <g key={`${this._linkId}-${index}`}>
            <defs>
              <linearGradient id={`gradient-${this._linkId}-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
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
              aria-label={
                'link from' +
                (singleLink.source as SNode).name +
                'to' +
                (singleLink.target as SNode).name +
                'with weight' +
                singleLink!.unnormalizedValue
              }
              role="img"
            />
          </g>
        );
        links.push(link);
      });
    }
    return links;
  }

  private _createNodes(width: number): React.ReactNode[] | undefined {
    const nodes: React.ReactNode[] = [];

    if (this.props.data.SankeyChartData) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.props.data.SankeyChartData.nodes.forEach((singleNode: SNode, index: number) => {
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
        const div = select('body')
          .append('div')
          .attr('id', id)
          .attr('class', this._classNames.toolTip!)
          .style('opacity', 0);
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
              aria-label={'node' + `${singleNode.name}` + 'with weight' + `${singleNode.actualValue}`}
              role="img"
            />
            {singleNode.y1! - singleNode.y0! > MIN_HEIGHT_FOR_TYPE && (
              <g className={this._classNames.nodeTextContainer}>
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
                        !this.state.selectedState ||
                        (this.state.selectedState &&
                          this.state.selectedNodes.has(singleNode.index!) &&
                          this.state.selectedNode) ||
                        (this.state.selectedState && !this.state.selectedNode)
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
                      !this.state.selectedState ||
                      (this.state.selectedState &&
                        this.state.selectedNodes.has(singleNode.index!) &&
                        this.state.selectedNode) ||
                      (this.state.selectedState && !this.state.selectedNode)
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _onHover(singleNode: SNode, mouseEvent: React.MouseEvent<SVGElement>) {
    mouseEvent.persist();
    this._onCloseCallout();
    if (!this.state.selectedState) {
      const selectedLinks = this._getSelectedLinks(singleNode);
      const selectedNodes = this._getSelectedNodes(selectedLinks);
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
        yCalloutValue: (singleNode.actualValue! as any) as string,
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _onStreamHover(singleLink: SLink, mouseEvent: React.MouseEvent<SVGElement>) {
    mouseEvent.persist();
    this._onCloseCallout();
    if (!this.state.selectedState) {
      const { selectedLinks, selectedNodes } = this._getSelectedLinksforStreamHover(singleLink);
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
        descriptionMessage: 'from ' + (singleLink.source as SNode).name,
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
      yCalloutValue: ((singleLink.source as SNode).actualValue! as any) as string,
      descriptionMessage: 'from ' + (singleLink.source as SNode).name,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _fillNodeColors = (singleNode: SNode): string | undefined => {
    if (!this.state.selectedState) {
      return singleNode.color;
    } else if (this.state.selectedState && this.state.selectedNodes.has(singleNode.index!) && this.state.selectedNode) {
      return this.state.selectedNode.color;
    } else if (this.state.selectedState && !this.state.selectedNode) {
      return singleNode.color;
    }
  };

  /**
   * This is used to assign node fillcolors and borderColor cyclically when the user doesnt
   * provide color to  individual node.
   */
  private _assignNodeColors() {
    let colors: string[];
    let borders: string[];
    if (this.props.colorsForNodes && this.props.borderColorsForNodes) {
      colors = this.props.colorsForNodes;
      borders = this.props.borderColorsForNodes;
    } else {
      colors = DEFAULT_NODE_COLORS.map(color => color.fillColor);
      borders = DEFAULT_NODE_COLORS.map(color => color.borderColor);
    }
    let currentIndex = 0;
    this.props.data.SankeyChartData!.nodes.forEach((node: SNode) => {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _fillStreamColors(singleLink: SLink, gradientUrl: string): string | undefined {
    if (this.state.selectedState && this.state.selectedLinks.has(singleLink.index!) && this.state.selectedNode) {
      return this.state.selectedNode.color;
    } else if (this.state.selectedState && this.state.selectedLinks.has(singleLink.index!)) {
      return gradientUrl;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _fillStreamBorder(singleLink: SLink, gradientUrl: string): string {
    if (!this.state.selectedState) {
      return NON_SELECTED_NODE_AND_STREAM_COLOR;
    } else if (this.state.selectedState && this.state.selectedLinks.has(singleLink.index!) && this.state.selectedNode) {
      return this.state.selectedNode.borderColor!;
    } else if (this.state.selectedState && this.state.selectedLinks.has(singleLink.index!)) {
      return gradientUrl;
    }
    return NON_SELECTED_NODE_AND_STREAM_COLOR;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _fillNodeBorder = (singleNode: SNode): string => {
    if (!this.state.selectedState) {
      return singleNode.borderColor!;
    } else if (this.state.selectedState && this.state.selectedNodes.has(singleNode.index!) && this.state.selectedNode) {
      return this.state.selectedNode.borderColor!;
    } else if (this.state.selectedState && this.state.selectedNodes.has(singleNode.index!)) {
      return singleNode.borderColor!;
    }
    return singleNode.borderColor!;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _getSelectedNodes(selectedLinks: Set<SLink>): any[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nodes: SNode[] = [];
    selectedLinks.forEach(link => {
      nodes.push(link.target as SNode);

      if (nodes.indexOf(link.source as SNode) === -1) {
        nodes.push(link.source as SNode);
      }
    });
    return nodes;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _getSelectedLinks(singleNode: SNode): Set<SLink> {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _getSelectedLinksforStreamHover(singleLink: SLink): { selectedLinks: Set<SLink>; selectedNodes: Set<SNode> } {
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

  private _getOpacityStream(singleLink: SLink): number {
    if (this.state.selectedState) {
      if (!this.state.selectedLinks.has(singleLink.index!)) {
        return NON_SELECTED_OPACITY;
      } else if (
        this.state.selectedState &&
        this.state.selectedLinks.has(singleLink.index!) &&
        !this.state.selectedNode
      ) {
        return SELECTED_STREAM_OPACITY;
      }
    }
    return REST_STREAM_OPACITY;
  }

  private _getOpacityStreamBorder(singleLink: SLink): number {
    if (this.state.selectedState && !this.state.selectedLinks.has(singleLink.index!) && !this.state.selectedNode) {
      return NON_SELECTED_STREAM_BORDER_OPACITY;
    }

    return NON_SELECTED_OPACITY;
  }

  private _fitParentContainer(): void {
    const { containerWidth, containerHeight } = this.state;
    this._reqID = requestAnimationFrame(() => {
      const container = this.props.parentRef ? this.props.parentRef : this.chartContainer;
      const currentContainerWidth = container.getBoundingClientRect().width;
      const currentContainerHeight = container.getBoundingClientRect().height;
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
   *
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
}
