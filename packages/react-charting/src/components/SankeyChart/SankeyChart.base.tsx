import * as React from 'react';
import { classNamesFunction, getId } from '@fluentui/react/lib/Utilities';
import { ISankeyChartProps, ISankeyChartStyleProps, ISankeyChartStyles } from './SankeyChart.types';
import { IProcessedStyleSet } from '@fluentui/react/lib/Styling';
import * as d3Sankey from 'd3-sankey';
const getClassNames = classNamesFunction<ISankeyChartStyleProps, ISankeyChartStyles>();

/*eslint-disable @typescript-eslint/no-explicit-any */
interface ISankeyChartState {
  containerWidth: number;
  containerHeight: number;
  selectedState: boolean;
  selectedLinks: any[];
  selectedNodes: any[];
  selectedNode?: any;
}
/*eslint-disable @typescript-eslint/no-explicit-any */

const restNodeOpacity: number = 1;
const restStreamOpacity: number = 0.6;
const nonSelectedOpacity: number = 0.2;
const nonSelectedNodeLabelOpacity: number = 0.6;
const selectedStreamOpacity: number = 0.8;
const selectedNodeWidth: number = 6;

export class SankeyChartBase extends React.Component<ISankeyChartProps, ISankeyChartState> {
  private _classNames: IProcessedStyleSet<ISankeyChartStyles>;
  private chartContainer: HTMLDivElement;
  private _reqID: number;

  constructor(props: ISankeyChartProps) {
    super(props);
    this.state = {
      containerHeight: 0,
      containerWidth: 0,
      selectedState: false,
      selectedLinks: [],
      selectedNodes: [],
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
    const margin = { top: 10, right: 0, bottom: 10, left: 0 };
    const width = this.state.containerWidth - margin.left - margin.right;
    const height =
      this.state.containerHeight - margin.top - margin.bottom > 0
        ? this.state.containerHeight - margin.top - margin.bottom
        : 0;

    const sankey = d3Sankey
      .sankey()
      .nodeWidth(4)
      .nodePadding(6)
      .extent([
        [1, 1],
        [width - 1, height - 6],
      ]);

    sankey(this.props.data.SankeyChartData!);
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

  private _createLinks(): React.ReactNode[] | undefined {
    const links: React.ReactNode[] = [];
    if (this.props.data.SankeyChartData) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.props.data.SankeyChartData.links.forEach((singleLink: any, index: number) => {
        const path = d3Sankey.sankeyLinkHorizontal();
        const onHoverHandler = () => {
          this._onStreamHover(singleLink);
        };
        const onMouseOut = () => {
          this._onStreamLeave(singleLink);
        };
        const pathValue = path(singleLink);
        const link = (
          <path
            key={index}
            d={pathValue ? pathValue : undefined}
            strokeWidth={Math.max(1, singleLink.width)}
            id={getId('link')}
            stroke={
              this.state.selectedState && this.state.selectedLinks.indexOf(singleLink) !== -1
                ? this.state.selectedNode.color
                : singleLink.color
            }
            onMouseOver={onHoverHandler}
            onMouseOut={onMouseOut}
            opacity={this._getOpacityStream(singleLink)}
          >
            <title>
              <text>{singleLink.source.name + ' → ' + singleLink.target.name + '\n' + singleLink.value}</text>
            </title>
          </path>
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
        const height = singleNode.y1 - singleNode.y0 > 0 ? singleNode.y1 - singleNode.y0 : 0;
        const node = (
          <g id={getId('nodeGElement')} key={index}>
            <rect
              x={singleNode.x0}
              y={singleNode.y0}
              height={height}
              width={
                this.state.selectedState && this.state.selectedNodes.indexOf(singleNode) !== -1
                  ? selectedNodeWidth
                  : singleNode.x1 - singleNode.x0
              }
              fill={singleNode.color}
              id={getId('nodeBar')}
              onMouseOver={onHoverHandler}
              onMouseOut={onMouseOut}
              opacity={this._getOpacityNode(singleNode)}
            />
            <text
              x={singleNode.x0 < width / 2 ? singleNode.x1 + 6 : singleNode.x0 - 6}
              y={(singleNode.y1 + singleNode.y0) / 2}
              dy={'0.35em'}
              textAnchor={singleNode.x0 < width / 2 ? 'start' : 'end'}
              opacity={this._getOpacityNodeLabel(singleNode)}
            >
              {singleNode.name}
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
  private _getOpacityNode(singleNode: any): number {
    if (this.state.selectedState && this.state.selectedNodes.indexOf(singleNode) === -1) {
      return nonSelectedOpacity;
    } else {
      return restNodeOpacity;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _getOpacityNodeLabel(singleNode: any): number {
    if (this.state.selectedState) {
      if (this.state.selectedNodes.indexOf(singleNode) === -1) {
        return nonSelectedNodeLabelOpacity;
      } else {
        return restNodeOpacity;
      }
    }
    return restNodeOpacity;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _getOpacityStream(singleLink: any): number {
    if (this.state.selectedState) {
      if (this.state.selectedLinks.indexOf(singleLink) === -1) {
        return nonSelectedOpacity;
      } else {
        return selectedStreamOpacity;
      }
    }
    return restStreamOpacity;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _onLeave(singleNode: any) {
    if (this.state.selectedState) {
      this.setState({
        selectedState: false,
        selectedNodes: [],
        selectedLinks: [],
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
      const selectedNodes = this._getSelectedNodes([singleLink]);
      this.setState({
        selectedState: true,
        selectedNodes: selectedNodes,
        selectedLinks: [singleLink],
        selectedNode: singleLink.source,
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
    return singleNode.sourceLinks;
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
