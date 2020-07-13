import * as React from 'react';
import { classNamesFunction, getId } from 'office-ui-fabric-react/lib/Utilities';
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
      .nodeWidth(5)
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
        // eslint-disable-next-line react/jsx-no-bind
        ref={(rootElem: HTMLDivElement) => (this.chartContainer = rootElem)}
      >
        <svg width={width} height={height} id={getId('sankeyChart')}>
          <g className={this._classNames.nodes}>{nodeData}</g>
          <g className={this._classNames.links} strokeOpacity={0.2}>
            {linkData}
          </g>
        </svg>
      </div>
    );
  }

  private _createLinks(): JSX.Element[] | undefined {
    const links: JSX.Element[] = [];
    if (this.props.data.SankeyChartData) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.props.data.SankeyChartData.links.forEach((singleLink: any, index: number) => {
        const path = d3Sankey.sankeyLinkHorizontal();
        const pathValue = path(singleLink);
        const link = (
          <path
            key={index}
            d={pathValue ? pathValue : undefined}
            strokeWidth={Math.max(1, singleLink.width)}
            id={getId('link')}
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

  private _createNodes(width: number): JSX.Element[] | undefined {
    const nodes: JSX.Element[] = [];
    if (this.props.data.SankeyChartData) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.props.data.SankeyChartData.nodes.forEach((singleNode: any, index: number) => {
        const height = singleNode.y1 - singleNode.y0 > 0 ? singleNode.y1 - singleNode.y0 : 0;
        const node = (
          <g id={getId('nodeGElement')} key={index}>
            <rect
              x={singleNode.x0}
              y={singleNode.y0}
              height={height}
              width={singleNode.x1 - singleNode.x0}
              fill={singleNode.color}
              id={getId('nodeBar')}
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
