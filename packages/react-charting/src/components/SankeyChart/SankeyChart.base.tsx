/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { classNamesFunction, getId } from '@fluentui/react/lib/Utilities';
import { ISankeyChartData, ISankeyChartProps, ISankeyChartStyleProps, ISankeyChartStyles } from './SankeyChart.types';
import { IProcessedStyleSet } from '@fluentui/react/lib/Styling';
import * as d3Sankey from 'd3-sankey';
import { area as d3Area, curveBumpX as d3CurveBasis } from 'd3-shape';
import { sum as d3Sum } from 'd3-array';
import { ChartHoverCard } from '../../index';
import { Callout, DirectionalHint } from '@fluentui/react/lib/Callout';
import { select } from 'd3-selection';

const getClassNames = classNamesFunction<ISankeyChartStyleProps, ISankeyChartStyles>();
const PADDING_PERCENTAGE = 0.3;

type NodesInColumns = { [key: number]: any[] };

interface ISankeyChartState {
  containerWidth: number;
  containerHeight: number;
  selectedState: boolean;
  selectedLinks: any[];
  selectedNodes: any[];
  selectedNode?: any;
  appliedHeightChange: boolean;
  nodeElement?: any;
  linkElement?: any;
  selectedLink?: any;
  textHover: boolean;
  shouldOverflow: boolean;
}

const INACTIVE_FILL_COLOR = '#F5F5F5';
const NON_SELECTED_NODE_AND_STREAM_COLOR: string = '#757575';
const DEFAULT_NODE_COLORS = [
  '#00758F',
  '#77004D',
  '#4F6BED',
  '#937600',
  '#286EA8',
  '#A43FB1',
  '#CC3595',
  '#0E7878',
  '#8764B8',
  '#9C663F',
];
const DEFAULT_NODE_BORDER_COLORS = [
  '#002E39',
  '#43002C',
  '#3B52B4',
  '#6D5700',
  '#00457E',
  '#7C158A',
  '#7F215D',
  '#004E4E',
  '#4B3867',
  '#6D4123',
];

const MIN_HEIGHT_FOR_DOUBLINE_TYPE = 45;
const MIN_HEIGHT_FOR_TYPE = 24;
const TEXT_FONTSIZE_SINGLELINE = 10;
const NODETEXT_FONTSIZE_DOUBLELINE = 14;
const NODEWEIGHT_FONTSIZE_SINGLELINE = 14;
const NODEWEIGHT_FONTSIZE_DOBLELINE = 20;

export class SankeyChartBase extends React.Component<ISankeyChartProps, ISankeyChartState> {
  private _classNames: IProcessedStyleSet<ISankeyChartStyles>;
  private chartContainer: HTMLDivElement;
  private _reqID: number;
  private _nodePadding: number = 8;

  constructor(props: ISankeyChartProps) {
    super(props);
    this.state = {
      containerHeight: 312,
      containerWidth: 912,
      selectedState: false,
      selectedLinks: [],
      selectedNodes: [],
      appliedHeightChange: false,
      textHover: false,
      shouldOverflow: false,
    };
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
      pathColor: pathColor,
      className,
    });
    const margin = { top: 36, right: 48, bottom: 32, left: 48 };
    const width = this.state.containerWidth - margin.right;
    const height = this.state.containerHeight - margin.bottom > 0 ? this.state.containerHeight - margin.bottom : 0;

    const sankey = d3Sankey
      .sankey()
      .nodeWidth(124)
      .extent([
        [margin.left, margin.top],
        [width - 1, height - 6],
      ]);

    const nodesInColumn: NodesInColumns = this._populateNodeInColumns(sankey);
    if (!this.state.appliedHeightChange) {
      this._adjustOnePercentHeightNodes(sankey, nodesInColumn);
      this._nodePadding = this._adjustPadding(sankey, height - 6, nodesInColumn);
      this.setState({
        appliedHeightChange: true,
      });
    }
    sankey.nodePadding(this._nodePadding);
    sankey(this.props.data.SankeyChartData!);
    this._populateNodeActualValue(this.props.data.SankeyChartData!);
    this._calculateTheTotalNodeValue(height - 6);
    this._assignNodeColors();
    const nodeData = this._createNodes(width);
    const linkData = this._createLinks();
    return (
      <>
        <div id="tooltip" className={this._classNames.toolTip} style={{ position: 'absolute', display: 'none' }} />
        <div
          className={this._classNames.root}
          role={'presentation'}
          ref={(rootElem: HTMLDivElement) => (this.chartContainer = rootElem)}
        >
          <svg width={width} height={height} id={getId('sankeyChart')}>
            <g className={this._classNames.links} strokeOpacity={1}>
              {linkData}
            </g>
            <g className={this._classNames.nodes}>{nodeData}</g>
          </svg>
        </div>
      </>
    );
  }

  /**
   *
   * This is used to calculate the total coloumn weight and also to group nodes by column index.
   */
  private _calculateTheTotalNodeValue(height: number) {
    const nodesColumn: NodesInColumns = {};
    this.props.data.SankeyChartData!.nodes.forEach((node: any) => {
      const columnId = node.layer;
      if (nodesColumn[columnId]) {
        nodesColumn[columnId].push(node);
      } else {
        nodesColumn[columnId] = [node];
      }
    });
    const totalColumnValue = Object.values(nodesColumn).map((column: any[]) => {
      return d3Sum(column, (node: any) => (node.y1 - node.y0 > 0 ? node.y1 - node.y0 : node.y0 - node.y1));
    });
    totalColumnValue.forEach((nodeHeight: number, index: number) => {
      const paddingpercentage = 100 - (nodeHeight / height) * 100;
      // eslint-disable-next-line no-console
      console.log(`PaddingPercentage for column "${index}" is "${paddingpercentage}"`);
    });
  }

  /**
   * This is used for calculating the node non normalized value based on link non normalized value.
   *
   */
  private _populateNodeActualValue(data: ISankeyChartData) {
    data.links.forEach((link: any) => {
      if (!link.originalValue) {
        link.originalValue = link.value;
      }
    });
    data.nodes.forEach((node: any) => {
      node.actualValue = Math.max(
        d3Sum(node.sourceLinks, (link: any) => link.originalValue),
        d3Sum(node.targetLinks, (link: any) => link.originalValue),
      );
    });
  }

  /**
   *
   * This is used to group nodes by column index.
   */
  private _populateNodeInColumns(sankey: d3Sankey.SankeyLayout<d3Sankey.SankeyGraph<{}, {}>, {}, {}>) {
    const graph = { ...this.props.data.SankeyChartData! };
    sankey(graph);
    const nodesInColumn: NodesInColumns = {};
    graph.nodes.forEach((node: any) => {
      const columnId = node.layer;
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
  private _adjustOnePercentHeightNodes(
    sankey: d3Sankey.SankeyLayout<d3Sankey.SankeyGraph<{}, {}>, {}, {}>,
    nodesInColumn: NodesInColumns,
  ) {
    const totalColumnValue = Object.values(nodesInColumn).map((column: any[]) => {
      return d3Sum(column, (node: any) => node.value);
    });
    totalColumnValue.forEach((columnValue: number, index: number) => {
      let totalPercentage = 0;
      nodesInColumn[index].forEach((node: any) => {
        const nodePercentage = (node.value / columnValue) * 100;
        node.actualValue = node.value;
        if (nodePercentage < 1) {
          node.value = 0.01 * columnValue;
          totalPercentage = totalPercentage + 1;
        } else {
          totalPercentage = totalPercentage + nodePercentage;
        }
      });
      const scalingRatio = totalPercentage !== 0 ? totalPercentage / 100 : 1;
      if (scalingRatio > 1) {
        nodesInColumn[index].forEach((node: any) => {
          node.value = node.value / scalingRatio;
          this._changeColumnValue(node, node.actualValue, node.value);
        });
      }
    });
  }

  /**
   *
   * This is used for normalizing each links value for reflecting the normalized node value.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _changeColumnValue(node: any, originalValue: number, increasedValue: number) {
    node.sourceLinks.forEach((link: any) => {
      link.originalValue = link.value;
      const linkRatio = link.value / originalValue;
      link.value = increasedValue * linkRatio;
    });
    node.targetLinks.forEach((link: any) => {
      link.originalValue = link.value;
      const linkRatio = link.value / originalValue;
      link.value = increasedValue * linkRatio;
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
    let padding = sankey.nodePadding();
    Object.values(nodesInColumn).forEach((column: any[]) => {
      const minPadding = PADDING_PERCENTAGE * height;
      const toatlPaddingInColumn =
        height - d3Sum(column, (node: any) => (node.y1 - node.y0 > 0 ? node.y1 - node.y0 : node.y0 - node.y1));
      if (minPadding < toatlPaddingInColumn) {
        padding = Math.min(padding, minPadding / (column.length - 1));
      }
    });
    return padding;
  }

  private _createLinks(): React.ReactNode[] | undefined {
    const links: React.ReactNode[] = [];
    const calloutProps = {
      isCalloutVisible: this.state.selectedState && !this.state.selectedNode,
      directionalHint: DirectionalHint.bottomCenter,
      id: `toolTip${getId('link')}`,
      target: this.state.linkElement,
      isBeakVisible: false,
      gapSpace: 15,
      onDismiss: this._onStreamLeave,
      preventDismissOnLostFocus: true,
    };
    if (this.props.data.SankeyChartData) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.props.data.SankeyChartData.links.forEach((singleLink: any, index: number) => {
        const onMouseOut = () => {
          this._onStreamLeave(singleLink);
        };

        const data = (d: any) => {
          return [
            { x: d.source.x1, y0: d.y0 + d.width / 2, y1: d.y0 - d.width / 2 },
            { x: d.target.x0, y0: d.y1 + d.width / 2, y1: d.y1 - d.width / 2 },
          ];
        };
        const dataPoints: Array<any> = data(singleLink);
        const linkArea = d3Area()
          .x((p: any) => p.x)
          .y0((p: any) => p.y0)
          .y1((p: any) => p.y1)
          .curve(d3CurveBasis);
        const gradientUrl = `url(#gradient-${index})`;
        const link = (
          <>
            <defs>
              <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0" stopColor={singleLink.source.color} />
                <stop offset="100%" stopColor={singleLink.target.color} />
              </linearGradient>
            </defs>
            <path
              key={index}
              d={linkArea(dataPoints)!}
              id={getId('link')}
              fill={this._fillStreamColors(singleLink, gradientUrl)}
              stroke={this._fillStreamBorder(singleLink, gradientUrl)}
              strokeWidth="2"
              onMouseOver={this._onStreamHover.bind(this, singleLink)}
              onMouseOut={onMouseOut}
              opacity="1"
            >
              {calloutProps.isCalloutVisible && (
                <Callout {...calloutProps}>
                  <ChartHoverCard
                    XValue={this.state.selectedLink!.target.name}
                    YValue={this.state.selectedLink!.originalValue}
                    color={this.state.selectedLink!.source.color}
                    descriptionMessage={'from ' + this.state.selectedLink.source.name}
                  />
                </Callout>
              )}
            </path>
          </>
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
      this.props.data.SankeyChartData.nodes.forEach((singleNode: any, index: number) => {
        const onMouseOut = () => {
          this._onLeave(singleNode);
        };
        const height = singleNode.y1 - singleNode.y0 > 0 ? singleNode.y1 - singleNode.y0 : 0;
        const calloutProps = {
          isCalloutVisible:
            this.state.selectedState &&
            this.state.selectedNode &&
            this.state.selectedNode!.y1 - this.state.selectedNode!.y0 < MIN_HEIGHT_FOR_TYPE,
          directionalHint: DirectionalHint.topAutoEdge,
          id: `toolTip${getId('nodeGElement')}`,
          target: this.state.nodeElement,
          isBeakVisible: false,
          gapSpace: 15,
          onDismiss: this._onLeave,
          preventDismissOnLostFocus: true,
        };
        const truncatedname: string = this._truncateText(singleNode.name, 124, 8);
        const isTruncated: boolean = truncatedname.slice(-4) === '... ';

        const node = (
          <g id={getId('nodeGElement')} key={index}>
            <rect
              x={singleNode.x0}
              y={singleNode.y0}
              height={height}
              width={singleNode.x1 - singleNode.x0}
              fill={this._fillNodeColors(singleNode)}
              id={getId('nodeBar')}
              onMouseOver={this._onHover.bind(this, singleNode)}
              onMouseOut={onMouseOut}
              stroke={this._fillNodeBorder(singleNode)}
              strokeWidth="2"
              opacity="1"
            />

            {calloutProps.isCalloutVisible && (
              <Callout {...calloutProps}>
                <ChartHoverCard
                  XValue={this.state.selectedNode!.name}
                  YValue={this.state.selectedNode!.actualValue}
                  color={this.state.selectedNode!.color}
                />
              </Callout>
            )}

            {singleNode.y1 - singleNode.y0 > MIN_HEIGHT_FOR_TYPE && (
              <g className={this._classNames.nodeTextContainer}>
                <g className="nodeName">
                  <text
                    x={singleNode.x0}
                    y={singleNode.y0}
                    dy={'1.2em'}
                    dx={'0.4em'}
                    textAnchor="start"
                    fontWeight="regular"
                    fill="black"
                    fontSize={
                      height > MIN_HEIGHT_FOR_DOUBLINE_TYPE ? NODETEXT_FONTSIZE_DOUBLELINE : TEXT_FONTSIZE_SINGLELINE
                    }
                    onMouseOver={this._showTooltip.bind(this, singleNode.name, isTruncated)}
                    onMouseOut={this._hideTooltip.bind(this)}
                  >
                    {truncatedname}
                  </text>
                </g>

                <text
                  x={singleNode.x0}
                  y={singleNode.y0}
                  dy={height > MIN_HEIGHT_FOR_DOUBLINE_TYPE ? '2em' : '1em'}
                  dx={height > MIN_HEIGHT_FOR_DOUBLINE_TYPE ? '0.4em' : '7em'}
                  textAnchor="start"
                  fontWeight="bold"
                  fontSize={
                    height > MIN_HEIGHT_FOR_DOUBLINE_TYPE
                      ? NODEWEIGHT_FONTSIZE_DOBLELINE
                      : NODEWEIGHT_FONTSIZE_SINGLELINE
                  }
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
  private _onLeave(singleNode: any) {
    if (this.state.selectedState) {
      this.setState({
        selectedState: false,
        selectedNodes: [],
        selectedLinks: [],
        selectedNode: null,
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _onHover(singleNode: any, mouseEvent: React.MouseEvent<SVGElement>) {
    mouseEvent.persist();
    if (!this.state.selectedState) {
      const selectedLinks = this._getSelectedLinks(singleNode);
      const selectedNodes = this._getSelectedNodes(selectedLinks);
      selectedNodes.push(singleNode);
      this.setState({
        selectedState: true,
        selectedNodes: selectedNodes,
        selectedLinks: selectedLinks,
        selectedNode: singleNode,
        nodeElement: mouseEvent,
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _onStreamHover(singleLink: any, mouseEvent: React.MouseEvent<SVGElement>) {
    mouseEvent.persist();
    if (!this.state.selectedState) {
      const { selectedLinks, selectedNodes } = this._getSelectedLinksforStreamHover(singleLink);
      this.setState({
        selectedState: true,
        selectedNodes: selectedNodes,
        selectedLinks: selectedLinks,
        linkElement: mouseEvent,
        selectedLink: singleLink,
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _onStreamLeave(singleLink: any) {
    if (this.state.selectedState) {
      this.setState({
        selectedState: false,
        selectedNodes: [],
        selectedLinks: [],
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _fillNodeColors(singleNode: any): string {
    if (!this.state.selectedState) {
      return singleNode.color;
    } else if (
      this.state.selectedState &&
      this.state.selectedNodes.indexOf(singleNode) !== -1 &&
      this.state.selectedNode
    ) {
      return this.state.selectedNode.color;
    } else if (this.state.selectedState && !this.state.selectedNode) {
      return singleNode.color;
    }
    return INACTIVE_FILL_COLOR;
  }

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
      colors = DEFAULT_NODE_COLORS;
      borders = DEFAULT_NODE_BORDER_COLORS;
    }
    let currentIndex = 0;
    this.props.data.SankeyChartData!.nodes.forEach((node: any) => {
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
  private _fillStreamColors(singleLink: any, gradientUrl: string): string {
    if (!this.state.selectedState) {
      return INACTIVE_FILL_COLOR;
    } else if (
      this.state.selectedState &&
      this.state.selectedLinks.indexOf(singleLink) !== -1 &&
      this.state.selectedNode
    ) {
      return this.state.selectedNode.color;
    } else if (this.state.selectedState && this.state.selectedLinks.indexOf(singleLink) !== -1) {
      return gradientUrl;
    }
    return INACTIVE_FILL_COLOR;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _fillStreamBorder(singleLink: any, gradientUrl: string): string {
    if (!this.state.selectedState) {
      return NON_SELECTED_NODE_AND_STREAM_COLOR;
    } else if (
      this.state.selectedState &&
      this.state.selectedLinks.indexOf(singleLink) !== -1 &&
      this.state.selectedNode
    ) {
      return NON_SELECTED_NODE_AND_STREAM_COLOR;
    } else if (this.state.selectedState && this.state.selectedLinks.indexOf(singleLink) !== -1) {
      return gradientUrl;
    }
    return NON_SELECTED_NODE_AND_STREAM_COLOR;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _fillNodeBorder(singleNode: any): string {
    if (!this.state.selectedState) {
      return singleNode.borderColor;
    } else if (
      this.state.selectedState &&
      this.state.selectedNodes.indexOf(singleNode) !== -1 &&
      this.state.selectedNode
    ) {
      return NON_SELECTED_NODE_AND_STREAM_COLOR;
    } else if (this.state.selectedState && this.state.selectedNodes.indexOf(singleNode) !== -1) {
      return singleNode.borderColor;
    }
    return singleNode.borderColor;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _getSelectedNodes(selectedLinks: any[]): any[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nodes: any = [];
    selectedLinks.forEach(link => {
      nodes.push(link.target);

      if (nodes.indexOf(link.source) === -1) {
        nodes.push(link.source);
      }
    });
    return nodes;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _getSelectedLinks(singleNode: any): any[] {
    // eslint-disable-next-line no-array-constructor
    const q: any = new Array<any>();
    const finalLinks: any = [];

    singleNode.sourceLinks.forEach((link: any) => {
      q.push(link);
      finalLinks.push(link);
    });

    while (q.length > 0) {
      const poppedLink: any = q.shift();
      const node: any = poppedLink.target;
      if (node && node.sourceLinks) {
        node.sourceLinks.forEach((link: any) => {
          finalLinks.push(link);
          q.push(link);
        });
      }
    }

    if (singleNode.targetLinks) {
      singleNode.targetLinks.forEach((link: any) => {
        q.push(link);
        finalLinks.push(link);
      });
    }

    while (q.length > 0) {
      const poppedLink: any = q.shift();
      const node: any = poppedLink.source;
      if (node && node.targetLinks) {
        node.targetLinks.forEach((link: any) => {
          finalLinks.push(link);
          q.push(link);
        });
      }
    }

    return finalLinks;
  }

  private _getSelectedLinksforStreamHover(singleLink: any): any {
    // eslint-disable-next-line no-array-constructor
    const q: any = new Array<any>();
    const finalLinks: any = [];
    const finalNodes: any = [];

    q.push(singleLink.source);
    finalLinks.push(singleLink);
    while (q.length > 0) {
      const poppedNode: any = q.shift();
      finalNodes.push(poppedNode);
      if (poppedNode.targetLinks && poppedNode.targetLinks.length > 0) {
        poppedNode.targetLinks.forEach((link: any) => {
          q.push(link.source);
          finalLinks.push(link);
        });
      }
    }

    q.push(singleLink.target);

    while (q.length > 0) {
      const poppedNode: any = q.shift();
      finalNodes.push(poppedNode);
      if (poppedNode.sourceLinks && poppedNode.sourceLinks.length > 0) {
        poppedNode.sourceLinks.forEach((link: any) => {
          q.push(link.target);
          finalLinks.push(link);
        });
      }
    }

    return {
      selectedLinks: finalLinks,
      selectedNodes: finalNodes,
    };
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

  private _truncateText(text: string, rectangleWidth: number, padding: number) {
    let truncatedText = '';
    const words = text.split(/\s+/).reverse();
    let word: string = '';
    const tspan = select('.nodeName').append('text').attr('class', 'tempText').append('tspan').text(null);

    const line: string[] = [];
    while ((word = words.pop()!)) {
      line.push(word);
      tspan.text(line.join(' ') + ' ');
      if (tspan.node() !== null) {
        const w = tspan.node()!.getComputedTextLength();
        if (w > 115) {
          line.pop();
          line.push('...');
          break;
        }
      }
    }
    let maxHeight: number = 12;
    truncatedText = line.join(' ') + ' ';
    tspan.selectAll('text').each(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const outerHTMLElement = document.getElementById('tempText') as any;
      const BoxCordinates = outerHTMLElement && outerHTMLElement.getBoundingClientRect();
      const boxHeight = BoxCordinates && BoxCordinates.height;
      if (boxHeight > maxHeight) {
        maxHeight = boxHeight;
      }
    });
    return truncatedText;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _showTooltip(text: string, checkTrcuncated: boolean, evt: any) {
    if (checkTrcuncated) {
      const tooltip = document.getElementById('tooltip')!;
      tooltip.innerHTML = text;
      tooltip.style.display = 'block';
      tooltip.style.left = evt.pageX + 'px';
      tooltip.style.top = evt.pageY - 28 + 'px';
    }
  }

  private _hideTooltip() {
    const tooltip = document.getElementById('tooltip')!;
    tooltip.style.display = 'none';
  }
}
