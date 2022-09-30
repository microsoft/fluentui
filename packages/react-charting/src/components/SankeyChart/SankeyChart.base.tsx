/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { classNamesFunction, getId } from '@fluentui/react/lib/Utilities';
import { ISankeyChartProps, ISankeyChartStyleProps, ISankeyChartStyles } from './SankeyChart.types';
import { IProcessedStyleSet } from '@fluentui/react/lib/Styling';
import * as d3Sankey from 'd3-sankey';
import { area as d3Area, curveBumpX as d3CurveBasis } from 'd3-shape';
import { sum as d3Sum } from 'd3-array';

// import { scaleLinear as d3ScaleLinear } from 'd3-scale';
// import { sum as d3Sum, min as d3Min } from 'd3-array';
// import { SNode } from '../HorizontalBarChart/index';
const getClassNames = classNamesFunction<ISankeyChartStyleProps, ISankeyChartStyles>();
const SPACE_TO_NODE_RATIO = 0.4;

//type  SankeyNodeMappedData = { [key: number]: SNode[] };
type NodesInColumns = { [key: number]: any[] };

interface ISankeyChartState {
  containerWidth: number;
  containerHeight: number;
  selectedState: boolean;
  selectedLinks: any[];
  selectedNodes: any[];
  selectedNode?: any;
  appliedHeightChange: boolean;
}

const REST_NODE_OPACITY: number = 1;
const REST_STREAM_OPACITY: number = 0.5;
const NON_SELECTED_OPACITY: number = 0.7;
//const NON_SELECTED_NODE_LABEL_OPACITY: number = 0.6;
const SELECTED_STREAM_OPACITY: number = 0.8;
//const SELECTED_NODE_WIDTH: number = 100;
const NON_SLECTED_NODE_AND_STREAM_COLOR: string = '#323130';

export class SankeyChartBase extends React.Component<ISankeyChartProps, ISankeyChartState> {
  private _classNames: IProcessedStyleSet<ISankeyChartStyles>;
  private chartContainer: HTMLDivElement;
  private _reqID: number;
  private _nodePadding: number;
  private _nodesInColumn: NodesInColumns = {};
  constructor(props: ISankeyChartProps) {
    super(props);
    this.state = {
      containerHeight: 312,
      containerWidth: 912,
      selectedState: false,
      selectedLinks: [],
      selectedNodes: [],
      appliedHeightChange: false,
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
    const width = this.state.containerWidth - margin.left - margin.right;
    const height =
      this.state.containerHeight - margin.top - margin.bottom > 0
        ? this.state.containerHeight - margin.top - margin.bottom
        : 0;
    //const medianNodeValue=
    // const flowMin: number = d3Min(this.props.data.SankeyChartData!.links, (link: any) => link.value as number)!;
    // const flowSum: number = d3Sum(this.props.data.SankeyChartData!.links, (link: any) => link.value as number)!;
    // if (flowSum > 112) {
    //   const scale = d3ScaleLinear().domain([flowMin, flowSum]).range([0, 112]);
    //   this.props.data.SankeyChartData!.links.forEach((singleLink: any, index: number) => {
    //     const normalizedValue = scale(singleLink.value);
    //     singleLink.originalValue = singleLink.value;
    //     singleLink.value = normalizedValue;
    //   });
    // }
    const sankey = d3Sankey
      .sankey()
      .nodeWidth(124)
      .extent([
        [1, 1],
        [width - 1, height - 6],
      ]);

    this._populateNodeInColumns(sankey);
    if (!this.state.appliedHeightChange) {
      this._adjustOnePercentHeightNodes(sankey);
      this._nodePadding = this._adjustPadding(sankey, height);
      this.setState({
        appliedHeightChange: true,
      });
    }
    sankey.nodePadding(this._nodePadding);
    sankey(this.props.data.SankeyChartData!);

    // arrangeNodesWithMinHeight();
    const nodeData = this._createNodes(width);
    const linkData = this._createLinks();
    return (
      <div
        className={this._classNames.root}
        role={'presentation'}
        ref={(rootElem: HTMLDivElement) => (this.chartContainer = rootElem)}
      >
        <svg width={width} height={height} id={getId('sankeyChart')}>
          <g className={this._classNames.links} strokeOpacity={0.2}>
            {linkData}
          </g>
          <g className={this._classNames.nodes}>{nodeData}</g>
        </svg>
      </div>
    );
  }
  private _populateNodeInColumns(sankey: d3Sankey.SankeyLayout<d3Sankey.SankeyGraph<{}, {}>, {}, {}>) {
    const graph = { ...this.props.data.SankeyChartData! };
    sankey(graph);
    graph.nodes.forEach((node: any) => {
      const columnId = node.layer;
      if (this._nodesInColumn[columnId]) {
        this._nodesInColumn[columnId].push(node);
      } else {
        this._nodesInColumn[columnId] = [node];
      }
    });
  }
  private _adjustOnePercentHeightNodes(sankey: d3Sankey.SankeyLayout<d3Sankey.SankeyGraph<{}, {}>, {}, {}>) {
    const totalColumnValue = Object.values(this._nodesInColumn).map((column: any[]) => {
      return d3Sum(column, (node: any) => node.value);
    });
    totalColumnValue.forEach((columnValue: number, index: number) => {
      let totalPercentage = 0;
      this._nodesInColumn[index].forEach((node: any) => {
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
        this._nodesInColumn[index].forEach((node: any) => {
          node.value = node.value / scalingRatio;
          this._changeColumnValue(node, node.actualValue, node.value);
        });
      }
    });
  }
  private _changeColumnValue(node: any, originalValue: number, increasedValue: number) {
    node.sourceLinks.forEach((link: any) => {
      const linkRatio = link.value / originalValue;
      link.value = increasedValue * linkRatio;
    });
    node.targetLinks.forEach((link: any) => {
      const linkRatio = link.value / originalValue;
      link.value = increasedValue * linkRatio;
    });
  }
  private _adjustPadding(sankey: any, height: number) {
    let padding = sankey.nodePadding();
    Object.values(this._nodesInColumn).forEach((column: any[]) => {
      const minPadding = SPACE_TO_NODE_RATIO * height;
      const nodePadding = height - (column.length - 1) * padding;
      if (minPadding > nodePadding) {
        padding = Math.min(padding, (height - minPadding) / (column.length - 1));
      }
    });
    //sankey.nodePadding(padding);
    //sankey(graph);
    return padding;
  }

  private _createLinks(): React.ReactNode[] | undefined {
    const links: React.ReactNode[] = [];
    if (this.props.data.SankeyChartData) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.props.data.SankeyChartData.links.forEach((singleLink: any, index: number) => {
        //const path = d3Sankey.sankeyLinkHorizontal();
        const onHoverHandler = () => {
          this._onStreamHover(singleLink);
        };
        const onMouseOut = () => {
          this._onStreamLeave(singleLink);
        };
        //const pathValue = path(singleLink);

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
              //fill="grey"
              // fill={`url(#gradient-${index})`}
              // fill={
              //   this.state.selectedState &&
              //   this.state.selectedLinks.indexOf(singleLink) !== -1 &&
              //   this.state.selectedNode
              //     ? this.state.selectedNode.color
              //     : `url(#gradient-${index})`
              // }
              fill={this._fillStreamColors(singleLink, gradientUrl)}
              // stroke={
              //   this.state.selectedState &&
              //   this.state.selectedLinks.indexOf(singleLink) !== -1 &&
              //   this.state.selectedNode
              //     ? this.state.selectedNode.color
              //     : `url(#gradient-${index})`
              // }
              stroke={this._fillStreamBorder(singleLink, gradientUrl)}
              strokeWidth="2"
              onMouseOver={onHoverHandler}
              onMouseOut={onMouseOut}
              opacity={this._getOpacityStream(singleLink)}
            >
              <title>
                <text>{singleLink.source.name + ' → ' + singleLink.target.name + '\n' + singleLink.value}</text>
              </title>
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
        const onHoverHandler = () => {
          this._onHover(singleNode);
        };
        const onMouseOut = () => {
          this._onLeave(singleNode);
        };
        // const fillNodeColor = () =>{
        //    return this._fillNodeColors(singleNode);
        // };
        const height = singleNode.y1 - singleNode.y0 > 0 ? singleNode.y1 - singleNode.y0 : 0;
        // const singleNodeValue = Math.max(
        //   d3Sum(singleNode.sourceLinks, (link: any) => link.originalValue),
        //   d3Sum(singleNode.targetLinks, (link: any) => link.originalValue),
        // );

        const node = (
          <g id={getId('nodeGElement')} key={index}>
            <rect
              x={singleNode.x0}
              y={singleNode.y0}
              height={height}
              width={singleNode.x1 - singleNode.x0}
              //fill={singleNode.color}
              // fill={
              //   this.state.selectedState &&
              //   this.state.selectedNodes.indexOf(singleNode) !== -1 &&
              //   this.state.selectedNode
              //     ? this.state.selectedNode.color
              //     : 'rgb(255,255,255)'
              // }
              fill={this._fillNodeColors(singleNode)}
              id={getId('nodeBar')}
              onMouseOver={onHoverHandler}
              onMouseOut={onMouseOut}
              //stroke={singleNode.color}
              stroke={this._fillNodeBorder(singleNode)}
              strokeWidth="2"
              opacity={this._getOpacityNode(singleNode)}
            />
            <text
              x={singleNode.x0}
              y={singleNode.y0}
              dy={'1.2em'}
              dx={'0.4em'}
              textAnchor="start"
              fontStyle="bold"
              // opacity={this._getOpacityNodeLabel(singleNode)}
            >
              {singleNode.name}
            </text>
            <text
              x={singleNode.x0}
              y={singleNode.y0}
              dy={'2.4em'}
              dx={'0.4em'}
              textAnchor="start"
              fontWeight={12}
              fontStyle="bold"
              //opacity={this._getOpacityNodeLabel(singleNode)}
            >
              {singleNode.value}
            </text>
            <title>
              <text>{singleNode.name + '\n' + singleNode.value}</text>
            </title>
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
  private _onHover(singleNode: any) {
    if (!this.state.selectedState) {
      const selectedLinks = this._getSelectedLinks(singleNode);
      const selectedNodes = this._getSelectedNodes(selectedLinks);
      selectedNodes.push(singleNode);
      this.setState({
        selectedState: true,
        selectedNodes: selectedNodes,
        selectedLinks: selectedLinks,
        selectedNode: singleNode,
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _onStreamHover(singleLink: any) {
    if (!this.state.selectedState) {
      //const selectedNodes = this._getSelectedNodes([singleLink]);
      const { selectedLinks, selectedNodes } = this._getSelectedLinksforStreamHover(singleLink);
      this.setState({
        selectedState: true,
        selectedNodes: selectedNodes,
        //selectedLinks: [singleLink],
        selectedLinks: selectedLinks,
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
      return 'rgb(255,255,255)';
    } else if (
      this.state.selectedState &&
      this.state.selectedNodes.indexOf(singleNode) !== -1 &&
      this.state.selectedNode
    ) {
      return this.state.selectedNode.color;
    } else if (this.state.selectedState && this.state.selectedNodes.indexOf(singleNode) !== -1) {
      return singleNode.color;
    }
    return 'rgb(255,255,255)';
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _fillStreamColors(singleLink: any, gradientUrl: string): string {
    if (!this.state.selectedState) {
      return gradientUrl;
    } else if (
      this.state.selectedState &&
      this.state.selectedLinks.indexOf(singleLink) !== -1 &&
      this.state.selectedNode
    ) {
      return this.state.selectedNode.color;
    } else if (this.state.selectedState && this.state.selectedLinks.indexOf(singleLink) !== -1) {
      return gradientUrl;
    }
    return 'rgb(255,255,255)';
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _fillStreamBorder(singleLink: any, gradientUrl: string): string {
    if (!this.state.selectedState) {
      return gradientUrl;
    } else if (
      this.state.selectedState &&
      this.state.selectedLinks.indexOf(singleLink) !== -1 &&
      this.state.selectedNode
    ) {
      return this.state.selectedNode.color;
    } else if (this.state.selectedState && this.state.selectedLinks.indexOf(singleLink) !== -1) {
      return gradientUrl;
    }
    return NON_SLECTED_NODE_AND_STREAM_COLOR;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _fillNodeBorder(singleNode: any): string {
    if (!this.state.selectedState) {
      return singleNode.color;
    } else if (
      this.state.selectedState &&
      this.state.selectedNodes.indexOf(singleNode) !== -1 &&
      this.state.selectedNode
    ) {
      return this.state.selectedNode.color;
    } else if (this.state.selectedState && this.state.selectedNodes.indexOf(singleNode) !== -1) {
      return singleNode.color;
    }
    return NON_SLECTED_NODE_AND_STREAM_COLOR;
  }

  // private _reflectingNodeDetails(singleNode: any): string {
  //   if (singleNode.height < '24') {
  //     return singleNode.name + '\n' + singleNode.value;
  //   }
  //   return '';
  // }

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
    //let links: any = [];
    // const nodes: any = [];
    // nodes.push(singleNode);
    // finalLinks.push(singleNode.sourceLinks);
    // //links.push(singleNode.sourceLinks);
    // //let iteratorForLinks: number = 0;

    // // while (iteratorForLinks < links.length) {
    // //   // if (nodes.indexOf(link.target) === -1) {
    // //   nodes.push(links[iteratorForLinks].target);
    // //   //if (link.target.sourceLinks) {
    // //   const tempNode: any = links[iteratorForLinks].target;

    // //   links = links.concat(tempNode.sourceLinks);
    // //   iteratorForLinks++;
    // // }

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

    // return singleNode.sourceLinks;
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _getOpacityStream(singleLink: any): number {
    if (this.state.selectedState) {
      if (this.state.selectedLinks.indexOf(singleLink) === -1) {
        return NON_SELECTED_OPACITY;
      } else {
        return SELECTED_STREAM_OPACITY;
      }
    }
    return REST_STREAM_OPACITY;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _getOpacityNode(singleNode: any): number {
    if (this.state.selectedState && this.state.selectedNodes.indexOf(singleNode) === -1) {
      return NON_SELECTED_OPACITY;
    } else {
      return REST_NODE_OPACITY;
    }
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
}

// function arrangeNodesWithMinHeight() {
//  const sankeyNodes:SNode[]=[];

//  this.props.data.SankeyChartData.nodes.forEach((singleNode: any) => {
//       sankeyNodes.push(singleNode,singleNode.x0);
// });
// const groupedNodes: SankeyNodeMappedData = {};
// this.props.data.SankeyChartData.nodes.forEach((item: SNode) => {
//   const checkNodePresence: number = item.x0!;

//   if (groupedNodes[checkNodePresence]) {
//     groupedNodes[checkNodePresence] = [...groupedNodes[checkNodePresence], item];
//   } else {
//     groupedNodes[checkNodePresence] = [item];
//   }
// });

// Object.keys(groupedNodes).forEach(item:number) =>{
//   groupedNodes[item].sort()
// }
// }
