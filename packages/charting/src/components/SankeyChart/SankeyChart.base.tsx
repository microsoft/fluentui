import * as React from 'react';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { ISankeyChartProps, ISankeyChartStyleProps, ISankeyChartStyles } from './SankeyChart.types';
import { IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling';
import * as d3Sankey from 'd3-sankey';
const getClassNames = classNamesFunction<ISankeyChartStyleProps, ISankeyChartStyles>();

export class SankeyChartBase extends React.Component<
  ISankeyChartProps,
  {
    containerWidth: number;
    containerHeight: number;
  }
> {
  private _classNames: IProcessedStyleSet<ISankeyChartStyles>;
  private chartContainer: HTMLDivElement;
  private _reqID: number;
  constructor(props: ISankeyChartProps) {
    super(props);
    this.state = {
      containerHeight: 0,
      containerWidth: 0,
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
  public render(): JSX.Element {
    const { theme, className, styles } = this.props;
    this._classNames = getClassNames(styles!, {
      theme: theme!,
      width: this.state.containerWidth,
      height: this.state.containerHeight,
      className,
    });
    const margin = { top: 10, right: 0, bottom: 10, left: 0 };
    const width = this.state.containerWidth - margin.left - margin.right;
    const height = this.state.containerHeight - margin.top - margin.bottom;

    const sankey = d3Sankey
      .sankey()
      .nodeWidth(5)
      .nodePadding(6)
      .extent([
        [1, 1],
        [width - 1, height - 6],
      ]);

    sankey(this.props.data.SankeyChartData!);
    const nodeData = this._createNodes(width);
    const linkData = this._createLinks();
    console.log(this.props.width);
    return (
      <div
        className={this._classNames.root}
        role={'presentation'}
        ref={(rootElem: HTMLDivElement) => (this.chartContainer = rootElem)}
      >
        <svg width={width} height={height} id="sankey">
          <g className={this._classNames.nodes}>{nodeData}</g>
          <g className={this._classNames.links} fill={'none'} stroke={'#000'} strokeOpacity={0.2}>
            {linkData}
          </g>
        </svg>
      </div>
    );
  }

  // tslint:disable-next-line:no-any
  private _createLinks(): JSX.Element[] | undefined {
    const links: JSX.Element[] = [];
    if (this.props.data.SankeyChartData) {
      // tslint:disable-next-line:no-any
      this.props.data.SankeyChartData.links.map((singleLink: any) => {
        const path = d3Sankey.sankeyLinkHorizontal();
        const pathValue = path(singleLink);
        const link = (
          <path d={pathValue ? pathValue : undefined} strokeWidth={Math.max(1, singleLink.width)}>
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

  private _createNodes(width: number): JSX.Element[] | undefined {
    const nodes: JSX.Element[] = [];
    if (this.props.data.SankeyChartData) {
      // tslint:disable-next-line:no-any
      this.props.data.SankeyChartData.nodes.map((singleNode: any) => {
        const node = (
          <g id={'nodeGElement'}>
            <rect
              x={singleNode.x0}
              y={singleNode.y0}
              height={singleNode.y1 - singleNode.y0}
              width={singleNode.x1 - singleNode.x0}
              fill={singleNode.color}
            />
            <text
              x={singleNode.x0 < width / 2 ? singleNode.x1 + 6 : singleNode.x0 - 6}
              y={(singleNode.y1 + singleNode.y0) / 2}
              dy={'0.35em'}
              textAnchor={singleNode.x0 < width / 2 ? 'start' : 'end'}
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
